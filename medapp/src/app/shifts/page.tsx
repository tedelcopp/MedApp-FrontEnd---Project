"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface Shift {
  id: number;
  patient: string;
  date: string;
  time: string;
  note: string;
  phone?: string;
}

const Shifts = () => {
  const [shifts, setShifts] = useState<Shift[]>([
    { id: 1, patient: "María López", date: "2024-12-27", time: "10:30", note: "Revisar estudios", phone: "5491123456789" },
    { id: 2, patient: "Carlos Gómez", date: "2024-12-27", time: "11:15", note: "", phone: "5491198765432" },
    { id: 3, patient: "Ana Torres", date: "2024-12-28", time: "14:00", note: "", phone: "" }, // Sin teléfono
  ]);
  const [newShift, setNewShift] = useState<Partial<Shift>>({});
  const [editingShiftId, setEditingShiftId] = useState<number | null>(null);

  const currentDate = new Date().toISOString().split("T")[0];

  const handleAddShift = () => {
    if (!newShift.patient || !newShift.date || !newShift.time) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setShifts([
      ...shifts,
      { id: shifts.length + 1, patient: newShift.patient, date: newShift.date, time: newShift.time, note: newShift.note || "", phone: newShift.phone || "" },
    ]);
    setNewShift({});
    toast.success("Turno asignado exitosamente.");
  };

  const handleEditShift = (id: number) => {
    setEditingShiftId(id);
    const shiftToEdit = shifts.find((shift) => shift.id === id);
    if (shiftToEdit) setNewShift(shiftToEdit);
  };

  const handleUpdateShift = () => {
    setShifts(
      shifts.map((shift) =>
        shift.id === editingShiftId ? { ...shift, ...newShift } : shift
      )
    );
    setNewShift({});
    setEditingShiftId(null);
    toast.success("Turno actualizado correctamente.");
  };

  const handleDeleteShift = (id: number) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
    toast.success("Turno eliminado correctamente.");
  };

  const getWhatsAppLink = (phone: string, name: string) => {
    const message = `Hola ${name}, quisiera confirmarte tu turno agendado.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8">Gestión de Turnos</h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold mb-4 underline underline-offset-4">
          {editingShiftId ? "Editar Turno" : "Asignar Nuevo Turno"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del Paciente"
            className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black focus:outline-none text-center"
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, patient: e.target.value }))
            }
          />
          <input
            type="date"
            className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black focus:outline-none text-center"
            value={newShift.date || ""}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <input
            type="time"
             className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black focus:outline-none text-center"
            value={newShift.time || ""}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, time: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Teléfono del Paciente (opcional)"
           className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black focus:outline-none text-center"
            value={newShift.phone || ""}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
          <textarea
            placeholder="Nota (opcional)"
            className="w-full p-2 border rounded text-black placeholder-white dark:text-black dark:placeholder-black focus:outline-none text-center"
            value={newShift.note || ""}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, note: e.target.value }))
            }
          />
          <div className="flex justify-center items-center h-full">
            <button
              onClick={editingShiftId ? handleUpdateShift : handleAddShift}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {editingShiftId ? "Actualizar Turno" : "Guardar"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8">Turnos Asignados</h1>
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {shifts.map((shift) => (
            <li key={shift.id} className="flex justify-between items-center py-4">
              <div>
                <p>
                  • <strong>Paciente:</strong> {shift.patient}
                </p>
                <p>
                  • <strong>Fecha:</strong> {shift.date} - <strong>Hora:</strong> {shift.time}
                </p>
                {shift.note && <p>• <strong>Nota:</strong> {shift.note}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditShift(shift.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteShift(shift.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
                {shift.phone ? (
                  <a
                    href={getWhatsAppLink(shift.phone, shift.patient)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed"
                  >
                    WhatsApp
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shifts;
