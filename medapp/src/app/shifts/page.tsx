"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
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
    { id: 1, patient: "María López", date: "2024-12-31", time: "10:30", note: "Revisar estudios", phone: "5491123456789" },
    { id: 2, patient: "Carlos Gómez", date: "2024-10-08", time: "11:15", note: "", phone: "5491198765432" },
    { id: 3, patient: "Ana Torres", date: "2024-02-13", time: "14:00", note: "", phone: "" }, 
  ]);
  const [newShift, setNewShift] = useState<Partial<Shift>>({});
  const [editingShiftId, setEditingShiftId] = useState<number | null>(null);
  const editSectionRef = useRef<HTMLDivElement>(null);

  const isEditing = editingShiftId !== null;
  const isFormValid = newShift.patient && newShift.date && newShift.time;

  const scrollToEditSection = useCallback(() => {
    if (editSectionRef.current) {
      editSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
      setShifts([
        ...shifts,
        { id: shifts.length + 1, patient: newShift.patient!, date: newShift.date!, time: newShift.time!, note: newShift.note || "", phone: newShift.phone || "" },
      ]);
      toast.success("Turno asignado exitosamente.");
    }

    setNewShift({});
    setEditingShiftId(null);
  }, [isEditing, newShift, shifts, isFormValid, editingShiftId]);

  const handleEditShift = useCallback((id: number) => {
    setEditingShiftId(id);
    const shiftToEdit = shifts.find((shift) => shift.id === id);
    if (shiftToEdit) setNewShift({ ...shiftToEdit });
    scrollToEditSection();
  }, [shifts, scrollToEditSection]);

  const handleDeleteShift = useCallback((id: number) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
    toast.success("Turno eliminado correctamente.");
  }, [shifts]);

  const getWhatsAppLink = useCallback((phone: string, name: string, date: string, time: string) => {
    const message = `Hola ${name}, espero que estés bien. Te recuerdo que tu turno está agendado para el ${date} a las ${time} hs. Nos vemos pronto!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, []);

  const appointmentList = useMemo(() => shifts.map((shift) => (
    <li key={shift.id} className="flex justify-between items-center py-4 border-b dark:border-gray-700">
      <div>
        <p>• <strong>Paciente:</strong> {shift.patient}</p>
        <p>• <strong>Fecha:</strong> {shift.date} - <strong>Horario:</strong> {shift.time}</p>
        {shift.note && <p>• <strong>Nota:</strong> {shift.note}</p>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => handleEditShift(shift.id)} 
        className="bg-yellow-500 text-white px-3 py-1 rounded"
        title="Editar turno"
        aria-label="Editar turno del paciente">
          Editar
          </button>
        <button onClick={() => handleDeleteShift(shift.id)} 
        className="bg-red-600 text-white px-3 py-1 rounded"  
        title="Eliminar turno"
        aria-label="Eliminar turno del paciente"
            >Eliminar
            </button>
        {shift.phone ? (
          <a href={getWhatsAppLink(shift.phone, shift.patient, shift.date, shift.time)} target="_blank" rel="noopener noreferrer"
            className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
            title="Comunicar vía WhatsApp"
            aria-label="Hablar con paciente por WhatsApp">
            WhatsApp
          </a>
        ) : (
          <button disabled className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed">WhatsApp</button>
        )}
      </div>
    </li>
  )), [shifts, handleEditShift, handleDeleteShift, getWhatsAppLink]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8">Gestión de Turnos</h1>

      <div ref={editSectionRef} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold mb-4 underline underline-offset-4">{isEditing ? "Editar Turno" : "Nuevo Turno"}</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Nombre del Paciente" className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black text-center"
            value={newShift.patient || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, patient: e.target.value }))} />
          <input type="date" className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black text-center"
            value={newShift.date || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, date: e.target.value }))} />
          <input type="time" className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black text-center"
            value={newShift.time || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, time: e.target.value }))} />
          <input type="text" placeholder="Teléfono del Paciente (opcional)" className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black text-center"
            value={newShift.phone || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, phone: e.target.value }))} />
          <textarea placeholder="Nota | Opcional " className="w-full p-2 border rounded text-black placeholder-black dark:text-black dark:placeholder-black text-center"
            value={newShift.note || ""} onChange={(e) => setNewShift((prev) => ({ ...prev, note: e.target.value }))} />
          <div className="flex justify-center">
            <button onClick={handleAddOrUpdateShift} className={`px-4 py-2 rounded ${isFormValid ? "bg-indigo-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`} disabled={!isFormValid}>
              {isEditing ? "Actualizar Turno" : "Guardar Turno"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8">Turnos Asignados</h1>
        <ul>{appointmentList}</ul>
      </div>
    </div>
  );
};

export default Shifts;
