import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Laptops from "@/pages/Laptops";
import LaptopDetail from "@/pages/LaptopDetail";
import CreateLaptop from "@/pages/CreateLaptop";
import EditLaptop from "@/pages/EditLaptop";
import Profile from "@/pages/Profile";
import Monitors from "@/pages/Monitors";
import MonitorDetail from "@/pages/MonitorDetail";
import EditMonitor from "@/pages/EditMonitor";
import Desktops from "@/pages/Desktops";
import DesktopDetail from "@/pages/DesktopDetail";
import EditDesktop from "@/pages/EditDesktop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/laptops/:id" element={<LaptopDetail />} />
        <Route path="/create-laptop" element={<CreateLaptop />} />
        <Route path="/edit-laptop/:id" element={<EditLaptop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/monitors" element={<Monitors />} />
        <Route path="/monitors/:id" element={<MonitorDetail />} />
        <Route path="/edit-monitor/:id" element={<EditMonitor />} />
        <Route path="/desktops" element={<Desktops />} />
        <Route path="/desktops/:id" element={<DesktopDetail />} />
        <Route path="/edit-desktop/:id" element={<EditDesktop />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;