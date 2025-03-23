// src/pages/Dashboard.jsx
import SummaryCard from "components/SummaryCard";

const Dashboard = () => {
  // Estos valores luego los traerás de tu backend o base de datos
  const totalPrestamos = 2350000;
  const totalPagos = 1830000;
  const totalClientes = 154;
  const totalSucursales = 5;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard Financiero</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <SummaryCard title="Total Préstamos" value={`$${totalPrestamos}`} />
        <SummaryCard title="Total Pagos" value={`$${totalPagos}`} />
        <SummaryCard title="Clientes" value={totalClientes} />
        <SummaryCard title="Sucursales" value={totalSucursales} />
      </div>
    </div>
  );
};

export default Dashboard;