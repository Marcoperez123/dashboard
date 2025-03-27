"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import PagosChart from "../components/PagosChart"
import PrestamosChart from "../components/PrestamosChart"
import PrestamosSucursalChart from "../components/PrestamosSucursalChart"
import PrestamosTipoSucursalChart from "../components/PrestamosTipoSucursalChart"
import PrestamosPorAnioChart from "../components/PrestamosPorAnioChart"
import PrestamosVsPagosChart from "../components/PrestamosVsPagosChart"
import TopDeudores from "../components/TopDeudores"
import "../styles/dashboard.css"

const Dashboard = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard-data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error al obtener datos del backend:", error))
  }, [])

  if (!data) return <p className="dashboard-container">Cargando datos...</p>

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Financiero</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Préstamos</h3>
          <p>${Number(data.total_prestamos).toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Total Pagos</h3>
          <p>${Number(data.total_pagos).toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Clientes</h3>
          <p>{data.total_clientes}</p>
        </div>
        <div className="summary-card">
          <h3>Sucursales</h3>
          <p>{data.total_sucursales}</p>
        </div>
      </div>

      {/* Primera fila: Gráficas de barras */}
      <div className="charts-row">
        <div className="chart-box">
          <PagosChart />
        </div>
        <div className="chart-box">
          <PrestamosVsPagosChart />
        </div>
      </div>

      {/* Segunda fila: Gráfica de pastel (más pequeña) y gráfica de barras */}
      <div className="charts-row">
        <div className="chart-box chart-small">
          <PrestamosChart />
        </div>
        <div className="chart-box chart-large">
          <PrestamosTipoSucursalChart />
        </div>
      </div>

      {/* Tercera fila: Dos gráficas de igual tamaño */}
      <div className="charts-row">
        <div className="chart-box">
          <PrestamosSucursalChart />
        </div>
        <div className="chart-box">
          <PrestamosPorAnioChart />
        </div>
      </div>

      <div className="table-box">
        <TopDeudores />
      </div>
    </div>
  )
}

export default Dashboard

