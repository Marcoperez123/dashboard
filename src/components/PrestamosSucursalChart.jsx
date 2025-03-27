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

const PrestamosSucursalChart = () => {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/prestamos-por-sucursal")
      .then(response => {
        const sucursales = response.data.map(item => item.sucursal);
        const montos = response.data.map(item => parseFloat(item.total));
        setLabels(sucursales);
        setDataValues(montos);
      })
      .catch(error => console.error("Error al cargar préstamos por sucursal:", error));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Prestado",
        data: dataValues,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "70%", marginTop: "2rem" }}>
      <h3>Préstamos por Sucursal</h3>
      <Bar data={data} />
    </div>
  );
};

export default PrestamosSucursalChart;