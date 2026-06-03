import { Link } from "react-router-dom";
import Hero from "../components/layout/Hero";
import "../styles/Preguntas.css";

const Preguntas = () => {
  return (
    <div>
      <Hero title="Preguntas frecuentes" />
      <div className="container">
        <h2>Preguntas Frecuentes</h2>
        <strong>¿Cómo puedo reservar un turno?</strong>
        <p>
          Podés escribirme por mensaje privado contándome tu idea, tamaño
          aproximado y la zona del cuerpo donde iría el tatuaje. Si tenés
          imágenes de referencia, también podés enviarlas para ayudarme a
          interpretar mejor tu idea y el estilo que buscás. Las reservas se
          realizan con una seña del 30% del valor total del tattoo, mediante
          transferencia bancaria.{" "}
        </p>
        <strong>- ¿Cuánto me sale un tattoo? </strong>
        <p>
          El valor depende del tamaño, nivel de detalle, estilo y ubicación del
          tatuaje. Cada presupuesto se realiza de manera personalizada para
          poder darte un precio acorde a tu idea.
        </p>
        <strong>- Cuidados post-tattoo </strong>
        <p>
          Después de realizar el tatuaje te voy a explicar todos los cuidados
          necesarios para una buena cicatrización. También te voy a enviar una
          guía en PDF con toda la información detallada.
        </p>
        <strong>- ¿Trabajas con diseños personalizados? </strong>
        <p>
          Sí, todos los diseños se trabajan de manera personalizada en base a tu
          idea, referencias y estilo del tattoo. El diseño está incluido dentro
          del presupuesto del tatuaje. Para poder enfocarme completamente en
          cada proyecto y trabajar cada pieza con dedicación, los diseños no se
          envían antes del turno. Los vas a ver el día de la cita, donde también
          podremos hacer ajustes si es necesario para que el resultado final
          funcione perfecto en tu piel.
        </p>
        <strong>- ¿Qué pasa si necesito cancelar o reprogramar? </strong>
        <p>
          La seña funciona como reserva del turno y organización de agenda, por
          lo tanto no tiene devolución. Si necesitás reprogramar, podés hacerlo
          avisando con un mínimo de 48 hs de anticipación y la seña seguirá
          siendo válida para una nueva fecha. En caso de no asistir al turno o
          avisar fuera de ese plazo, será necesario abonar una nueva seña para
          reservar nuevamente. - Consejos antes de la sesión de tu tatuaje Para
          que la piel llegue en buenas condiciones al turno y el proceso sea más
          cómodo, te recomiendo: Mantener la piel bien hidratada los días
          previos. Tomar mucha agua. Exfoliar suavemente la zona unos días
          antes. Descansar bien la noche anterior. Comer antes de la sesión.
          Evitar llegar con la piel irritada, quemada por el sol o lastimada
          ayuda muchísimo a lograr un mejor resultado y una mejor cicatrización.
        </p>
      </div>
    </div>
  );
};

export default Preguntas;
