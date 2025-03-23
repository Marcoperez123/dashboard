import { useEffect, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

const TopDeudores = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/top-deudores")
      .then(response => setData(response.data))
      .catch(error => console.error("Error al cargar top deudores:", error));
  }, []);

  const columns = [
    {
      header: "Cliente",
      accessorFn: row => `${row.Nombre} ${row.Apellido}`,
      id: "cliente",
    },
    {
      header: "Total Prestado",
      accessorKey: "total_prestado",
      cell: info => `$${Number(info.getValue()).toLocaleString()}`,
    },
    {
      header: "Total Pagado",
      accessorKey: "total_pagado",
      cell: info => `$${Number(info.getValue()).toLocaleString()}`,
    },
    {
      header: "Deuda",
      accessorKey: "deuda",
      cell: info => (
        <strong style={{ color: "crimson" }}>
          ${Number(info.getValue()).toLocaleString()}
        </strong>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Top 5 Deudores</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopDeudores;