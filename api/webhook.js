import { MercadoPagoConfig, Payment } from "mercadopago";
import { Resend } from "resend";

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom =
      process.env.RESEND_FROM || "Juli Tattoo <onboarding@resend.dev>";

    if (!accessToken) {
      return res.status(500).json({ error: "MP_ACCESS_TOKEN no configurado" });
    }

    if (!resendApiKey) {
      return res.status(500).json({ error: "RESEND_API_KEY no configurado" });
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
    const email = payment.payer?.email;

    console.log(`Pago ${paymentId} con estado ${status} para el email ${email}`);

    if (status !== "approved" || !email) {
      return res.status(200).json({
        received: true,
        ignored: true,
        paymentId,
        status,
        reason: "Payment not approved or missing payer email",
      });
    }

    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: resendFrom,
      to: [email],
      subject: "Pago aprobado",
      html: `
        <p>Hola!</p>
        <p>Gracias por tu compra en Juli Tattoo.</p>
        <p>Te confirmamos que tu pago fue aprobado.</p>
        <p>El envio se coordina directamente con el vendedor.</p>
      `,
    });

    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }

    console.log("Email enviado correctamente:", {
      paymentId,
      email,
      resendId: data?.id,
    });

    return res.status(200).json({
      received: true,
      paymentId,
      resendId: data?.id || null,
    });
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return res.status(500).json({
      error: error.message || "Error procesando webhook",
    });
  }
}
