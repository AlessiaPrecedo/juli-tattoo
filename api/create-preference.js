import { MercadoPagoConfig, Preference } from "mercadopago";

function normalizeBaseUrl(url) {
  if (!url || typeof url !== "string") return null;

  const trimmedUrl = url.trim().replace(/\/+$/, "");

  if (!trimmedUrl) return null;
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
}

function getBaseUrl(req) {
  const configuredBaseUrl = normalizeBaseUrl(
    process.env.PUBLIC_BASE_URL ||
      process.env.APP_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL,
  );

  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;

  return normalizeBaseUrl(`${protocol}://${host}`);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({ error: "MP_ACCESS_TOKEN no configurado" });
    }

    const { cartItems = [], checkoutData = {} } = req.body || {};

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res
        .status(400)
        .json({ error: "No hay productos para crear la preferencia" });
    }

    const checkoutEmail = String(checkoutData.email || "").trim();

    if (!checkoutEmail) {
      return res.status(400).json({
        error: "Falta el email del checkout para crear la preferencia",
      });
    }

    const client = new MercadoPagoConfig({
      accessToken,
    });
    const preferenceClient = new Preference(client);
    const baseUrl = getBaseUrl(req);

    if (!baseUrl) {
      return res.status(500).json({
        error: "No se pudo resolver la URL base publica del proyecto",
      });
    }

    const items = cartItems.map((item) => ({
      title: [item.name, item.size].filter(Boolean).join(" - "),
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
      currency_id: "ARS",
    }));
    const productsSummary = cartItems
      .map((item) => {
        const quantity = Number(item.quantity || 0);
        const sizeLabel = item.size ? ` (${item.size})` : "";

        return `${item.name}${sizeLabel} x${quantity}`;
      })
      .join(" | ");
    const orderTotal = cartItems.reduce(
      (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );

    const preference = await preferenceClient.create({
      body: {
        items,
        payer: {
          email: checkoutEmail,
          name: String(checkoutData.nombre || "").trim() || undefined,
          surname: String(checkoutData.apellido || "").trim() || undefined,
        },
        metadata: {
          checkoutEmail,
          customerName: String(checkoutData.nombre || "").trim(),
          customerLastName: String(checkoutData.apellido || "").trim(),
          customerPhone: String(checkoutData.telefono || "").trim(),
          productsSummary,
          orderTotal,
        },
        notification_url: `${baseUrl}/api/webhook`,
        back_urls: {
          success: `${baseUrl}/gracias`,
          failure: `${baseUrl}/checkout`,
          pending: `${baseUrl}/checkout`,
        },
        auto_return: "approved",
      },
    });

    return res.status(200).json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
    });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({
      error: error.message || "Error creando preferencia",
    });
  }
}
