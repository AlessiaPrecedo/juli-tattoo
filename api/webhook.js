import { MercadoPagoConfig, Payment } from "mercadopago";
import { appendOrderToSheet } from "./lib/googleSheets.js";

function extractIdFromResource(resource) {
  if (typeof resource !== "string" || resource.length === 0) return null;

  const normalized = resource.split("?")[0];
  const parts = normalized.split("/").filter(Boolean);

  return parts.length > 0 ? parts[parts.length - 1] : null;
}

function getNotificationType(body, query) {
  if (body?.type) return body.type;
  if (body?.topic) return body.topic;
  if (query?.type) return query.type;
  if (query?.topic) return query.topic;

  if (typeof body?.action === "string" && body.action.startsWith("payment.")) {
    return "payment";
  }

  return null;
}

function getPaymentId(body, query) {
  const candidates = [
    body?.data?.id,
    body?.["data.id"],
    query?.["data.id"],
    query?.id,
    extractIdFromResource(body?.resource),
    extractIdFromResource(query?.resource),
  ];

  const paymentId = candidates.find((candidate) => candidate != null);
  return paymentId ? String(paymentId) : null;
}

function getMetadataValue(metadata, key) {
  const value = metadata?.[key];
  return typeof value === "string" ? value.trim() : value;
}

function getBuyerOrderData(payment) {
  const metadata = payment?.metadata || {};
  const additionalInfoPayer =
    payment?.additional_info?.payer || payment?.order?.additional_info?.payer;
  const firstName =
    additionalInfoPayer?.first_name ||
    getMetadataValue(metadata, "customerName") ||
    "";
  const lastName =
    additionalInfoPayer?.last_name ||
    getMetadataValue(metadata, "customerLastName") ||
    "";
  const phone =
    additionalInfoPayer?.phone?.number ||
    getMetadataValue(metadata, "customerPhone") ||
    "";
  const email =
    additionalInfoPayer?.email ||
    getMetadataValue(metadata, "checkoutEmail") ||
    payment?.payer?.email ||
    "";
  const products =
    getMetadataValue(metadata, "productsSummary") ||
    payment?.additional_info?.items
      ?.map((item) => `${item.title} x${item.quantity}`)
      .join(" | ") ||
    "";
  const total = Number(metadata?.orderTotal || payment?.transaction_amount || 0);

  return {
    firstName,
    lastName,
    phone,
    email,
    products,
    total,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({ error: "MP_ACCESS_TOKEN no configurado" });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const query = req.query && typeof req.query === "object" ? req.query : {};
    const notificationType = getNotificationType(body, query);
    const paymentId = getPaymentId(body, query);

    console.log("Webhook recibido:", {
      body,
      query,
      notificationType,
      paymentId,
    });

    if (notificationType !== "payment" || !paymentId) {
      return res.status(200).json({
        received: true,
        ignored: true,
        reason: "Not a payment notification",
      });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: paymentId });

    const status = payment.status;
    const orderData = getBuyerOrderData(payment);

    console.log(`Pago ${paymentId} con estado ${status}`, {
      metadata: payment.metadata,
      payer: payment.payer,
      transactionAmount: payment.transaction_amount,
    });

    if (status !== "approved") {
      return res.status(200).json({
        received: true,
        ignored: true,
        paymentId,
        status,
        reason: "Payment not approved",
      });
    }

    const sheetResult = await appendOrderToSheet({
      date: new Date().toISOString(),
      paymentId,
      status,
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      phone: orderData.phone,
      email: orderData.email,
      products: orderData.products,
      total: orderData.total,
    });

    console.log("Pago aprobado registrado para Google Sheets:", {
      paymentId,
      status,
      sheetSkipped: sheetResult.skipped,
      checkoutEmail: orderData.email || null,
      transactionAmount: orderData.total,
    });

    return res.status(200).json({
      received: true,
      paymentId,
      status,
      approved: true,
      sheetSkipped: sheetResult.skipped,
    });
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return res.status(500).json({
      error: error.message || "Error procesando webhook",
    });
  }
}
