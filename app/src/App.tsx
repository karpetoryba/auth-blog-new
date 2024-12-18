import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoutesWrapper from "./components/RoutesWrapper";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesWrapper />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
