import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import Hero from "../components/layout/Hero";
import "../styles/Preguntas.css";

const faqs = [
  {
    icon: "ti-calendar-plus",
    question: "¿Cómo puedo reservar un turno?",
    answer: (
      <>
        <p>
          Podés escribirme por mensaje privado contándome tu idea, tamaño
          aproximado y la zona del cuerpo donde iría el tatuaje. Si tenés
          imágenes de referencia, también podés enviarlas para ayudarme a
          interpretar mejor tu idea y el estilo que buscás.
        </p>
        <p>
          Las reservas se realizan con una seña del{" "}
          <strong>30% del valor total</strong> del tattoo, mediante
          transferencia bancaria.
        </p>
      </>
    ),
  },

  {
    icon: "ti-coin",
    question: "¿Cuánto me sale un tattoo?",
    answer: (
      <p>
        El valor depende del tamaño, nivel de detalle, estilo y ubicación del
        tatuaje. Cada presupuesto se realiza de manera{" "}
        <strong>personalizada</strong> para poder darte un precio acorde a tu
        idea.
      </p>
    ),
  },
  {
    icon: "ti-heart-plus",
    question: "Cuidados post-tattoo",
    answer: (
      <p>
        Después de realizar el tatuaje te voy a explicar todos los cuidados
        necesarios para una buena cicatrización. También te voy a enviar una{" "}
        <strong>guía en PDF</strong> con toda la información detallada.
      </p>
    ),
  },
  {
    icon: "ti-palette",
    question: "¿Trabajás con diseños personalizados?",
    answer: (
      <>
        <p>
          Sí, todos los diseños se trabajan de manera personalizada en base a tu
          idea, referencias y estilo del tattoo. El diseño está{" "}
          <strong>incluido dentro del presupuesto</strong> del tatuaje.
        </p>
        <p>
          Para poder enfocarme completamente en cada proyecto, los diseños no se
          envían antes del turno. Los vas a ver el día de la cita, donde también
          podremos hacer ajustes si es necesario.
        </p>
      </>
    ),
  },
  {
    icon: "ti-calendar-x",
    question: "¿Qué pasa si necesito cancelar o reprogramar?",
    answer: (
      <>
        <p>
          La seña funciona como reserva del turno y no tiene devolución. Si
          necesitás reprogramar, podés hacerlo avisando con un mínimo de{" "}
          <strong>48 hs de anticipación</strong> y la seña seguirá siendo válida
          para una nueva fecha.
        </p>
        <p>
          En caso de no asistir o avisar fuera de ese plazo, será necesario
          abonar una nueva seña para reservar nuevamente.
        </p>
      </>
    ),
  },
  {
    icon: "ti-sparkles",
    question: "Consejos antes de tu sesión",
    answer: (
      <>
        <p>
          Para que la piel llegue en buenas condiciones y el proceso sea más
          cómodo, te recomiendo:
        </p>
        <ul>
          <li>Mantener la piel bien hidratada los días previos</li>
          <li>Tomar mucha agua</li>
          <li>Exfoliar suavemente la zona unos días antes</li>
          <li>Descansar bien la noche anterior</li>
          <li>Comer antes de la sesión</li>
          <li>
            Evitar llegar con la piel irritada o quemada por el sol, ayuda
            muchísimo a lograr un mejor resultado y una mejor cicatrización.
          </li>
        </ul>
      </>
    ),
  },
];

export default function FAQ() {
  const [open, setopen] = useState(0);
  const toggle = (i) => setopen(open === i ? 0 : i);

  return (
    <>
      <Hero />
      <div style={{ padding: "2rem 0" }}>
        <h2>
          <i className="ti ti-help-circle" />
          Preguntas frecuentes
        </h2>

        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="faq-item">
              <div className="faq-header" onClick={() => toggle(i)}>
                <div className={`faq-icon ${isOpen ? "open" : "closed"}`}>
                  <i className={`ti ${faq.icon}`} />
                </div>
                <p className="faq-q">{faq.question}</p>
                <i
                  className={`ti ti-chevron-down faq-chevron ${isOpen ? "open" : ""}`}
                />
              </div>
              {isOpen && <div className="faq-body">{faq.answer}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
}
