import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PrestamosTipoSucursalChart = () => {
  const [dataChart, setDataChart] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/prestamos-por-tipo-sucursal")
      .then(res => {
        const raw = res.data;

        // Obtener listas únicas
        const tipos = [...new Set(raw.map(item => item.tipo))];
        const sucursales = [...new Set(raw.map(item => item.sucursal))];

        // Preparar datasets
        const datasets = sucursales.map((sucursal, i) => ({
          label: sucursal,
          data: tipos.map(tipo => {
            const match = raw.find(
              r => r.tipo === tipo && r.sucursal === sucursal
            );
            return match ? parseFloat(match.total) : 0;
          }),
          backgroundColor: `hsl(${(i * 360) / sucursales.length}, 70%, 60%)`,
        }));

        setDataChart({
          labels: tipos,
          datasets,
        });
      })
      .catch(err => console.error("Error en prestamos por tipo y sucursal:", err));
  }, []);

  if (!dataChart) return <p>Cargando...</p>;

  return (
    <div style={{ width: "70%", marginTop: "2rem" }}>
      <h3>Préstamos por Tipo y Sucursal</h3>
      <Bar data={dataChart} />
    </div>
  );
};

export default PrestamosTipoSucursalChart;