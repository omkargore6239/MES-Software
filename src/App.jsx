import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Recording from "./pages/production/Recording";
import ShiftwiseProduction from "./pages/configurator/master/ShiftWiseProduction";
import WorkCenter from "./pages/configurator/master/WorkCenter";
import OrderStatus from "./pages/planning/OrderStatus";
import UserMaster from "./security/UserMaster";
import RoleScreen from "./security/RoleScreen";
import UserTable from "./security/UserTable";
import RmInventory from "./pages/configurator/master/Inventory/RmInventory";
import ProductMaster from "./pages/configurator/master/ProductMaster";
import BomMaster from "./pages/configurator/master/BomMaster";
import MasterCode from "./pages/configurator/master/MasterCode";
import Inspection from "./Quality/Inspection";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check localStorage on first load
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Function to handle login and persist session
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Store login status
  };

  // ✅ Function to handle logout (optional)
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove login status
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Routes>
          <Route path="/" element={<Layout handleLogout={handleLogout} />}>
            <Route index element={<Dashboard />} />
            {/* Planning Routes */}
            <Route path="planning/OrderStatus" element={<OrderStatus />} />
            {/* Production Routes */}
            <Route path="production" element={<Production />} />
            <Route path="production/recording" element={<Recording />} />
            {/* Quality */}
            <Route path="inspection" element={<Inspection />} />
            <Route path="find clearance" element={<Inspection />} />
             {/* Inventory & Analytics */}
             <Route path="inventory" element={<Inventory />} />
            <Route path="analytics" element={<Analytics />} />
            {/* Configurator Master */}
            <Route path="config/master/shift-wise" element={<ShiftwiseProduction />} />
            <Route path="/config/master/inventory/RmInventory" element={<RmInventory />} />
            <Route path="config/master/workcenter" element={<WorkCenter />} />
            <Route path="/config/master/productmaster" element={<ProductMaster />} />
            <Route path="/config/master/bom" element={<BomMaster />} />
            <Route path="/config/master/mastercode" element={<MasterCode />}/>
            {/* Security Routes */}
            <Route path="security/user" element={<UserMaster />} />
            <Route path="security/role" element={<RoleScreen />} />
            <Route path="/security/userTable" element={<UserTable />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}
