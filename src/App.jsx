import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Production from './pages/Production';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Recording from './pages/production/Recording';
import ShiftwiseProduction from './pages/configurator/master/ShiftWiseProduction';
import WorkCenter from './pages/configurator/master/WorkCenter';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/production" element={<Production />} />
          <Route path="/production/recording" element={<Recording />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/config/master/shift-wise" element={<ShiftwiseProduction />} />
          <Route path="/config/master/workcenter" element={<WorkCenter />} />
        </Route>
      </Routes>
    </Router>
  );
}