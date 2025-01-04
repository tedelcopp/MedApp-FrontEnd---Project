"use client";
import { useState } from "react";

const Facturacion = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSessionCharge, setIsSessionCharge] = useState(false);
  const [facturas, setFacturas] = useState([
    {
      id: 1,
      paciente: "Juan Pérez",
      fecha: "2025-01-03",
      monto: 4500,
      estado: "Pendiente",
      sesiones: 0, 
    },
    {
      id: 2,
      paciente: "María López",
      fecha: "2025-01-01",
      monto: 6000,
      estado: "Pagado",
      sesiones: 1, 
    },
  ]);

  const handleNewFactura = () => {
    setIsSessionCharge(false);
    setShowModal(true);
  };

  const handleNewSessionCharge = () => {
    setIsSessionCharge(true);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const paciente = form.paciente.value;
    const monto = parseFloat(form.monto.value);
    const estado = form.estado.value; 

    const pacienteExistente = facturas.find((f) => f.paciente === paciente);

    let newFacturas;
    if (pacienteExistente) {
      newFacturas = facturas.map((factura) => {
        if (factura.paciente === paciente && estado === "Abonada") {
          factura.sesiones += 1;
        }
        return factura;
      });
    } else {
      newFacturas = [
        ...facturas,
        {
          id: facturas.length + 1,
          paciente,
          fecha: new Date().toISOString().split("T")[0], 
          monto,
          estado,
          sesiones: estado === "Abonada" ? 1 : 0, 
        },
      ];
    }

    setFacturas(newFacturas);
    setShowModal(false);
  };



  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8 text-black dark:text-white">
        Facturación y Pagos
      </h1>

      <div className="flex space-x-4 mb-4">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          title={`Cargar Factura`}
          onClick={handleNewFactura}
        >
          Cargar Factura
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2 text-center">Paciente</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Fecha</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Monto</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Estado</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Sesiones</th> {/* Nueva columna */}
              <th className="border border-gray-300 px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.paciente}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.fecha}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">${factura.monto}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.estado}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.sesiones}</td> {/* Sesiones */}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Enviar a WhatsApp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-lg font-bold mb-4">
              {isSessionCharge ? "Cobro de Sesión" : "Nueva Factura"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Paciente</label>
                <input
                  name="paciente"
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  placeholder="Nombre del paciente"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Monto</label>
                <input
                  name="monto"
                  type="number"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  placeholder="Monto en pesos"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                  name="estado"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Pagado">Pagado</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Cargar Factura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Facturacion;
