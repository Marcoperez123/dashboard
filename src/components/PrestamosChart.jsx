import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PrestamosChart = () => {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/prestamos-por-tipo")
      .then(response => {
        const tipos = response.data.map(item => item.tipo);
        const montos = response.data.map(item => parseFloat(item.total));
        setLabels(tipos);
        setDataValues(montos);
      })
      .catch(error => console.error("Error al cargar préstamos por tipo:", error));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Prestado",
        data: dataValues,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "55%", marginTop: "2rem" }}>
      <h3>Préstamos por Tipo</h3>
      <Pie data={data} />
    </div>
  );
};

export default PrestamosChart;