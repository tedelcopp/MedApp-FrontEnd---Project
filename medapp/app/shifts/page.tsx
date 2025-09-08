"use client";

import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
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
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [newShift, setNewShift] = useState<Partial<Shift>>({});
  const [editingShiftId, setEditingShiftId] = useState<number | null>(null);
  const editSectionRef = useRef<HTMLDivElement>(null);

  const isEditing = editingShiftId !== null;
  const isFormValid = newShift.patient && newShift.date && newShift.time;

useEffect(() => {
  fetch("http://localhost:3003/api/shifts")
    .then((res) => res.json())
    .then((data) => setShifts(data))
    .catch(() => toast.error("Error al cargar los turnos"));
}, []);

  const handleAddOrUpdateShift = useCallback(() => {
    if (!isFormValid) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (isEditing) {
      setShifts(shifts.map((shift) => (shift.id === editingShiftId ? { ...shift, ...newShift } : shift)));
      toast.success("Turno actualizado correctamente.");
    } else {
      setShifts([...shifts, { id: shifts.length + 1, patient: newShift.patient!, date: newShift.date!, time: newShift.time!, note: newShift.note || "", phone: newShift.phone || "" }]);
      toast.success("Turno asignado exitosamente.");
    }

    setNewShift({});
    setEditingShiftId(null);
  }, [isEditing, newShift, shifts, isFormValid, editingShiftId]);

  const handleEditShift = useCallback((id: number) => {
    setEditingShiftId(id);
    const shiftToEdit = shifts.find((shift) => shift.id === id);
    if (shiftToEdit) setNewShift({ ...shiftToEdit });
    editSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [shifts]);

  const handleDeleteShift = useCallback((id: number) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
      toast("Turno eliminado correctamente.", { icon: "🗑️" });
  }, [shifts]);

  const appointmentList = useMemo(() => shifts.map((shift) => (
    <li key={shift.id} className="p-4 border rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 flex flex-col gap-2">
      <div className="text-sm md:text-base">
        <p><strong>Paciente:</strong> {shift.patient}</p>
        <p><strong>Fecha:</strong> {shift.date} - <strong>Horario:</strong> {shift.time}</p>
        {shift.note && <p><strong>Nota:</strong> {shift.note}</p>}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <button onClick={() => handleEditShift(shift.id)} className="bg-yellow-500 text-white px-3 py-2 rounded w-full sm:w-auto">Editar</button>
        <button onClick={() => handleDeleteShift(shift.id)} className="bg-red-600 text-white px-3 py-2 rounded w-full sm:w-auto">Eliminar</button>
      </div>
    </li>
  )), [shifts, handleEditShift, handleDeleteShift]);

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center underline">Gestión de Turnos</h1>

      <div ref={editSectionRef} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full max-w-lg lg:max-w-xl">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">{isEditing ? "Editar Turno" : "Nuevo Turno"}</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Nombre del Paciente" className="w-full p-2 border rounded-lg text-black placeholder-gray-500" value={newShift.patient || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, patient: e.target.value }))} />
          <input type="date" className="w-full p-2 border rounded-lg text-black placeholder-gray-500" value={newShift.date || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, date: e.target.value }))} />
          
          <select className="w-full p-2 border rounded-lg text-black placeholder-gray-500" value={newShift.time || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, time: e.target.value }))}>
            <option value="" disabled>Selecciona un horario</option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>{`${i.toString().padStart(2, "0")}:00`}</option>
            ))}
          </select>

          <input type="text" placeholder="Teléfono del Paciente | Opcional" className="w-full p-2 border rounded-lg text-black placeholder-gray-500" value={newShift.phone || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, phone: e.target.value }))} />
          <textarea placeholder="Nota | Opcional" className="w-full p-2 border rounded-lg text-black placeholder-gray-500" value={newShift.note || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, note: e.target.value }))} />
          
          <div className="flex justify-center">
            <button onClick={handleAddOrUpdateShift} className={`px-4 py-2 rounded-lg w-full sm:w-auto ${isFormValid ? "bg-indigo-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`} disabled={!isFormValid}>
              {isEditing ? "Actualizar Turno" : "Guardar Turno"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center underline">Turnos Asignados</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{appointmentList}</ul>
      </div>
    </div>
  );
};

export default Shifts;
