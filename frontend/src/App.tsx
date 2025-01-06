import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Laptops from "./pages/Laptops";
import CreateLaptop from "./pages/CreateLaptop";
import LaptopDetail from "./pages/LaptopDetail";
import EditLaptop from "./pages/EditLaptop";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/laptops/:id" element={<LaptopDetail />} />
        <Route path="/create-laptop" element={<CreateLaptop />} />
        <Route path="/edit-laptop/:id" element={<EditLaptop />} />
      </Routes>
    </Router>
  );
}

export default App;