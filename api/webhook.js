import { MercadoPagoConfig, Payment } from "mercadopago";
import { Resend } from "resend";

export default async function handler(req, res) {
  res.status(200).end();

  if (req.method !== "POST") return;
  try {
    const { type, data } = req.body || {};
    if (type !== "payment" || !data?.id) return;

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: data.id });

    const status = payment.status;
    const email = payment.payer?.email;

    console.log(`Pago ${data.id} con estado ${status} para el email ${email}`);

    if (status !== "approved" || !email) return;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "<onboarding@resend.dev>",
      to: email,
      subject: "¡Pago aprobado!",
      html: `<p>¡Hola!</p>
                <p>Gracias por tu compra en Juli Tattoo.</p>
                <p>Te recordamos que tu pago ha sido aprobado.</p>
                <p>Saludos,</p>
                <p>El equipo de Juli Tattoo</p>`,
    });
  } catch (error) {
    console.error("Error procesando webhook:", error);
  }
}
