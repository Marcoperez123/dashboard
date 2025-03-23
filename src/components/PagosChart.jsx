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

const PagosChart = () => {
  const [labels, setLabels] = useState([]);
  const [dataPagos, setDataPagos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/pagos-por-mes")
      .then(response => {
        const nombreMes = (num) => {
            const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                           "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            return meses[num - 1]; // porque los índices van de 0 a 11
          };
          
          const meses = response.data.map(item => nombreMes(item.Mes));
        const pagos = response.data.map(item => parseFloat(item.total_pagado));
        setLabels(meses);
        setDataPagos(pagos);
      })
      .catch(error => console.error("Error al cargar pagos por mes:", error));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Pagado",
        data: dataPagos,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ maxWidth: "700px", marginTop: "2rem" }}>
      <h3>Pagos por Mes</h3>
      <Bar data={data} />
    </div>
  );
};

export default PagosChart;