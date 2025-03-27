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

const PrestamosVsPagosChart = () => {
  const [labels, setLabels] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/prestamos-vs-pagos")
      .then(response => {
        const nombreMes = (num) => {
          const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
          return meses[num - 1];
        };

        const meses = response.data.map(item => nombreMes(item.Mes));
        const totalPrestado = response.data.map(item => parseFloat(item.total_prestado));
        const totalPagado = response.data.map(item => parseFloat(item.total_pagado));

        setLabels(meses);
        setPrestamos(totalPrestado);
        setPagos(totalPagado);
      })
      .catch(error => console.error("Error al cargar prestamos-vs-pagos:", error));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Prestado",
        data: prestamos,
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      },
      {
        label: "Total Pagado",
        data: pagos,
        backgroundColor: "rgba(255, 206, 86, 0.6)"
      }
    ]
  };

  return (
    <div style={{ width: "70%", marginTop: "2rem" }}>
      <h3>Préstamos vs Pagos por Mes</h3>
      <Bar data={data} />
    </div>
  );
};

export default PrestamosVsPagosChart;