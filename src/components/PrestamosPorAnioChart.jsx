import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PrestamosPorAnioChart = () => {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/prestamos-por-anio")
      .then(response => {
        const anios = response.data.map(item => item.anio); // minúscula
        const montos = response.data.map(item => parseFloat(item.total));
        setLabels(anios);
        setDataValues(montos);
      })
      .catch(error => console.error("Error al cargar préstamos por año:", error));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Prestado por Año",
        data: dataValues,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        tension: 0.3
      }
    ]
  };

  return (
    <div style={{ maxWidth: "800px", marginTop: "2rem" }}>
      <h3>Préstamos por Año</h3>
      <Line data={data} />
    </div>
  );
};

export default PrestamosPorAnioChart;