"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Reports = () => {
  const nuevosPacientesData = [
    { Mes: "Enero", Cantidad: 5 },
    { Mes: "Febrero", Cantidad: 12 },
    { Mes: "Marzo", Cantidad: 8 },
    { Mes: "Abril", Cantidad: 15 },
    { Mes: "Mayo", Cantidad: 20 },
    { Mes: "Junio", Cantidad: 25 },
  ];

  const gananciasPerdidasData = [
    { Mes: "Enero", Ganancias: 1200, Pérdidas: 200 },
    { Mes: "Febrero", Ganancias: 1500, Pérdidas: 300 },
    { Mes: "Marzo", Ganancias: 1800, Pérdidas: 150 },
    { Mes: "Abril", Ganancias: 2000, Pérdidas: 400 },
    { Mes: "Mayo", Ganancias: 2200, Pérdidas: 250 },
    { Mes: "Junio", Ganancias: 2500, Pérdidas: 300 },
  ];

  const cumplimientoTurnosData = [
    { Nombre: "Cumplidos", Valor: 80 },
    { Nombre: "Cancelados", Valor: 20 },
  ];

  const proximosTurnosData = [
    { Día: "1", Turnos: 2 },
    { Día: "2", Turnos: 5 },
    { Día: "3", Turnos: 3 },
    { Día: "4", Turnos: 8 },
    { Día: "5", Turnos: 4 },
    { Día: "6", Turnos: 6 },
    { Día: "7", Turnos: 1 },
  ];

  const COLORS = ["#34D399", "#F87171"];

  const metrics = [
    { label: "Nuevos Pacientes Este Mes", value: 24 },
    { label: "Paciente Más Antiguo", value: "Juan Pérez (3 años)" },
    { label: "Ganancias De Este Mes", value: "$2,500" },
    { label: "Turnos Cancelados", value: "20" },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Reportes</h1>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold">{metric.label}</h3>
              <p className="text-xl font-bold text-indigo-600">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 underline underline-offset-4">Nuevos Pacientes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={nuevosPacientesData}>
                <XAxis dataKey="Mes" label={{ value: "Mes", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Cantidad", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Cantidad" stroke="#6366F1" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 underline underline-offset-4">Ganancias Y Pérdidas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gananciasPerdidasData}>
                <XAxis dataKey="Mes" label={{ value: "Mes", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Monto", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Ganancias" fill="#10B981" />
                <Bar dataKey="Pérdidas" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 underline underline-offset-4">Cumplimiento De Turnos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={cumplimientoTurnosData}
                  dataKey="Valor"
                  nameKey="Nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ Nombre, percent }) => `${Nombre} (${(percent * 100).toFixed(0)}%)`}
                >
                  {cumplimientoTurnosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 underline underline-offset-4">Turnos Agendados - Próximo Mes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={proximosTurnosData}>
                <XAxis dataKey="Día" label={{ value: "Día", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Cantidad", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Turnos" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
