"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Factura {
  id: number;
  paciente: string;
  fecha: string;
  monto: number;
  estado: string;
  sesiones: number;
}

const Facturacion = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [facturas, setFacturas] = useState<Factura[]>([
    {
      id: 1,
      paciente: "Juan Pérez",
      fecha: "2025-01-03",
      monto: 4500,
      estado: "Pendiente",
      sesiones: 1,
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
    setModalType("newFactura");
    setShowModal(true);
  };

  const handlePatientHistory = (paciente: string) => {
    setSelectedPatient(paciente);
    setModalType("historial");
    setShowModal(true);
  };

  const handleSubmitFactura = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const paciente = (form.paciente as HTMLInputElement).value.trim();
    const monto = parseFloat((form.monto as HTMLInputElement).value);
    const estado = (form.estado as HTMLSelectElement).value;

    if (!paciente || !monto || !estado) {
      toast.error("Todos los campos deben ser completados.");
      return;
    }

    if (monto < 0) {
      toast.error("El monto no puede ser negativo.");
      return;
    }

    const pacienteExistente = facturas.find((f) => f.paciente === paciente);

    let newFacturas;
    if (pacienteExistente) {
      newFacturas = facturas.map((factura) => {
        if (factura.paciente === paciente) {
          return {
            ...factura,
            sesiones: factura.sesiones + 1,
          };
        }
        return factura;
      });
      toast.success(`La factura de ${paciente} ha sido cargada.`);
    } else {
      newFacturas = [
        ...facturas,
        {
          id: facturas.length + 1,
          paciente,
          fecha: new Date().toISOString().split("T")[0],
          monto,
          estado,
          sesiones: 1,
        },
      ];
      toast.success(`La factura de ${paciente} ha sido cargada.`);
    }

    setFacturas(newFacturas);
    setShowModal(false);
  };

  const filteredFacturas = facturas.filter((factura) =>
    factura.paciente.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8 text-black dark:text-white">
        Facturación y Pagos
      </h1>

      <div className="flex space-x-4 mb-4">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          onClick={handleNewFactura}
        >
          Cargar Factura
        </button>
        <input
          type="text"
          placeholder="Buscar por paciente"
          className="border border-gray-300 rounded px-4 py-2 w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2 text-center">Paciente</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Fecha</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Monto</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Estado</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Sesiones</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredFacturas.map((factura) => (
              <tr key={factura.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.paciente}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.fecha}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">${factura.monto}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.estado}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{factura.sesiones}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handlePatientHistory(factura.paciente)}
                  >
                    Historial Facturado
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
            {modalType === "newFactura" && (
              <>
                <h2 className="text-lg font-bold mb-4">Nueva Factura</h2>
                <form onSubmit={handleSubmitFactura}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Paciente</label>
                    <input
                      name="paciente"
                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 w-full"
                      placeholder="Nombre del paciente"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Monto</label>
                    <input
                      name="monto"
                      type="number"
                      className="border border-gray-300 rounded px-4 py-2 w-full"
                      placeholder="Monto en pesos"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <select
                      name="estado"
                      className="border border-gray-300 rounded px-4 py-2 w-full"
                      required
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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Cargar Factura
                    </button>
                  </div>
                </form>
              </>
            )}

            {modalType === "historial" && selectedPatient && (
              <>
                <h2 className="text-lg font-bold mb-4">Historial de {selectedPatient}</h2>
                <ul>
                  {facturas
                    .filter((factura) => factura.paciente === selectedPatient)
                    .map((factura) => (
                      <li key={factura.id} className="mb-2">
                        <strong>Fecha:</strong> {factura.fecha} | <strong>Monto:</strong> ${factura.monto} |{" "}
                        <strong>Estado:</strong> {factura.estado} | <strong>Sesiones:</strong> {factura.sesiones}
                      </li>
                    ))}
                </ul>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedPatient(null);
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Facturacion;
