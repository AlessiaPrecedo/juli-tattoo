import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Galeria from "./pages/Galeria";
import Prints from "./pages/Prints";
import Preguntas from "./pages/Preguntas";
import "./styles/index.css";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/prints" element={<Prints />} />
      <Route path="/preguntas" element={<Preguntas />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
