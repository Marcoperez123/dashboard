const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Configura tu base de datos aquí
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // pon tu contraseña si tiene
  database: 'dss_financiero'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
  } else {
    console.log('Conexión a MySQL exitosa.');
  }
});

app.get('/dashboard-data', (req, res) => {
    const query = `
    SELECT 
      COUNT(DISTINCT ClienteID) AS total_clientes,
      COUNT(DISTINCT SucursalID) AS total_sucursales,
      SUM(Monto) AS total_prestamos,
      SUM(MontoPagado) AS total_pagos
    FROM factprestamospagos;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error en la consulta:', err);
      res.status(500).json({ error: err.message }); // mostrar error real
    } else {
      res.json(results[0]);
    }
  });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});

app.get('/pagos-por-mes', (req, res) => {
    const query = `
      SELECT 
        dt.Mes,
        SUM(fp.MontoPagado) AS total_pagado
      FROM factprestamospagos fp
      JOIN dim_tiempo dt ON fp.TiempoID = dt.TiempoID
      GROUP BY dt.Mes
      ORDER BY dt.Mes ASC;
    `;
  
    db.query(query, (err, results) => {
        if (err) {
          console.error('❌ Error en la consulta:', err);
          res.status(500).json({ error: err.message }); // mostrar error real
        } else {
          res.json(results);
        }
      });
    });

    app.get('/prestamos-por-tipo', (req, res) => {
        const query = `
          SELECT 
            tp.Tipo AS tipo,
            SUM(fp.Monto) AS total
          FROM factprestamospagos fp
          JOIN dim_tipoprestamo tp ON fp.TipoPrestamoID = tp.TipoPrestamoID
          GROUP BY tp.Tipo
          ORDER BY total DESC;
        `;
      
        db.query(query, (err, results) => {
          if (err) {
            console.error("❌ Error en prestamos-por-tipo:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.json(results);
          }
        });
      });

      app.get('/top-deudores', (req, res) => {
        const query = `
          SELECT 
            c.Nombre,
            c.Apellido,
            SUM(fp.Monto) AS total_prestado,
            SUM(fp.MontoPagado) AS total_pagado,
            (SUM(fp.Monto) - SUM(fp.MontoPagado)) AS deuda
          FROM factprestamospagos fp
          JOIN dim_cliente c ON fp.ClienteID = c.ClienteID
          GROUP BY c.ClienteID
          HAVING deuda > 0
          ORDER BY deuda DESC
          LIMIT 5;
        `;
      
        db.query(query, (err, results) => {
          if (err) {
            console.error("❌ Error en top-deudores:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.json(results);
          }
        });
      });


      app.get('/prestamos-por-sucursal', (req, res) => {
        const query = `
          SELECT 
            s.NombreSucursal AS sucursal,
            SUM(fp.Monto) AS total
          FROM factprestamospagos fp
          JOIN dim_sucursal s ON fp.SucursalID = s.SucursalID
          GROUP BY s.NombreSucursal
          ORDER BY total DESC;
        `;
      
        db.query(query, (err, results) => {
          if (err) {
            console.error("❌ Error en prestamos-por-sucursal:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.json(results);
          }
        });
      });



      app.get('/prestamos-vs-pagos', (req, res) => {
        const query = `
          SELECT 
            dt.Mes,
            SUM(fp.Monto) AS total_prestado,
            SUM(fp.MontoPagado) AS total_pagado
          FROM factprestamospagos fp
          JOIN dim_tiempo dt ON fp.TiempoID = dt.TiempoID
          GROUP BY dt.Mes
          ORDER BY dt.Mes;
        `;
      
        db.query(query, (err, results) => {
          if (err) {
            console.error("❌ Error en prestamos-vs-pagos:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.json(results);
          }
        });
      });

      app.get('/prestamos-por-tipo-sucursal', (req, res) => {
        const query = `
          SELECT 
            tp.Tipo AS tipo,
            s.NombreSucursal AS sucursal,
            SUM(fp.Monto) AS total
          FROM factprestamospagos fp
          JOIN dim_tipoprestamo tp ON fp.TipoPrestamoID = tp.TipoPrestamoID
          JOIN dim_sucursal s ON fp.SucursalID = s.SucursalID
          GROUP BY tp.Tipo, s.NombreSucursal
          ORDER BY tp.Tipo, s.NombreSucursal;
        `;
      
        db.query(query, (err, results) => {
          if (err) {
            console.error("❌ Error en prestamos-por-tipo-sucursal:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.json(results);
          }
        });
      });

      app.get('/prestamos-por-anio', (req, res) => {
        const query = `
  SELECT 
    dt.Año AS anio,
    SUM(fp.Monto) AS total
  FROM factprestamospagos fp
  JOIN dim_tiempo dt ON fp.TiempoID = dt.TiempoID
  GROUP BY dt.Año
  ORDER BY dt.Año;
`;
      
        db.query(query, (err, results) => {
          if (err) {
            console.error("❌ Error en prestamos-por-anio:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.json(results);
          }
        });
      });