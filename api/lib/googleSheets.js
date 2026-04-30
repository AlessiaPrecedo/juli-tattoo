import { google } from "googleapis";

const SHEETS_SCOPE = ["https://www.googleapis.com/auth/spreadsheets"];
const DEFAULT_SHEET_NAME = "Pedidos";
const ORDER_HEADERS = [
  "fecha",
  "payment_id",
  "status",
  "nombre",
  "apellido",
  "telefono",
  "mail",
  "productos",
  "total",
];

function getSheetsConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || DEFAULT_SHEET_NAME;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID no configurado");
  }

  if (!clientEmail) {
    throw new Error("GOOGLE_SHEETS_CLIENT_EMAIL no configurado");
  }

  if (!privateKey) {
    throw new Error("GOOGLE_SHEETS_PRIVATE_KEY no configurado");
  }

  return {
    spreadsheetId,
    clientEmail,
    privateKey,
    sheetName,
  };
}

async function getSheetsClient() {
  const { clientEmail, privateKey } = getSheetsConfig();
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SHEETS_SCOPE,
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

function getSheetRange(sheetName, range) {
  return `${sheetName}!${range}`;
}

async function ensureHeaders(sheets, spreadsheetId, sheetName) {
  const headerRange = getSheetRange(sheetName, "A1:I1");
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  const existingHeaders = data.values?.[0] || [];
  const hasExpectedHeaders =
    existingHeaders.length === ORDER_HEADERS.length &&
    existingHeaders.every((value, index) => value === ORDER_HEADERS[index]);

  if (hasExpectedHeaders) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: headerRange,
    valueInputOption: "RAW",
    requestBody: {
      values: [ORDER_HEADERS],
    },
  });
}

async function paymentExists(sheets, spreadsheetId, sheetName, paymentId) {
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: getSheetRange(sheetName, "B:B"),
  });

  const values = data.values?.flat().filter(Boolean) || [];
  return values.includes(String(paymentId));
}

export async function appendOrderToSheet(order) {
  const { spreadsheetId, sheetName } = getSheetsConfig();
  const sheets = await getSheetsClient();

  await ensureHeaders(sheets, spreadsheetId, sheetName);

  if (await paymentExists(sheets, spreadsheetId, sheetName, order.paymentId)) {
    return {
      skipped: true,
      reason: "Payment already registered in sheet",
    };
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: getSheetRange(sheetName, "A:I"),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          order.date,
          order.paymentId,
          order.status,
          order.firstName,
          order.lastName,
          order.phone,
          order.email,
          order.products,
          order.total,
        ],
      ],
    },
  });

  return {
    skipped: false,
  };
}
