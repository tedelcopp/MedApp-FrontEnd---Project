"use client";

import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Shift {
  id: number;
  patient: string;
  date: string;
  time: string;
  note: string;
  phone?: string;
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Shifts = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newShift, setNewShift] = useState<Partial<Shift>>({});
  const [editingShiftId, setEditingShiftId] = useState<number | null>(null);
  const editSectionRef = useRef<HTMLDivElement>(null);

  const isEditing = editingShiftId !== null;
  const isFormValid = newShift.patient && newShift.date && newShift.time;

  useEffect(() => {
    if (!API_BASE_URL) {
        toast.error("Error: URL del Backend no definida. Revisa .env.");
        return;
    }

    const fetchShifts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/shifts`);
        if (!res.ok) throw new Error("Failed to fetch shifts");
        const data = await res.json();
        setShifts(data);
      } catch (error) {
        toast.error("Error al cargar los turnos");
      }
    };

    const fetchPatients = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/patients`);
        if (!res.ok) throw new Error("Failed to fetch patients");
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        toast.error("Error al cargar los pacientes");
      }
    };

    fetchShifts();
    fetchPatients();
  }, []);

  const handleAddOrUpdateShift = useCallback(async () => {
    if (!isFormValid || !API_BASE_URL) {
        toast.error("Por favor, completa todos los campos obligatorios o falta la URL del backend.");
        return;
    }

    if (isEditing) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/shifts/${editingShiftId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newShift),
        });
        if (!res.ok) throw new Error("Failed to update shift");
        const updatedShift = await res.json();
        setShifts(shifts.map((shift) => (shift.id === editingShiftId ? updatedShift : shift)));
        toast.success("Turno actualizado correctamente.");
      } catch (error) {
        toast.error("Error al actualizar el turno.");
      }
    } else {
      try {
        const res = await fetch(`${API_BASE_URL}/api/shifts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newShift),
        });
        if (!res.ok) throw new Error("Failed to add shift");
        const addedShift = await res.json();
        setShifts([...shifts, addedShift]);
        toast.success("Turno asignado exitosamente.");
      } catch (error) {
        toast.error("Error al asignar el turno.");
      }
    }

    setNewShift({});
    setEditingShiftId(null);
  }, [isEditing, newShift, shifts, isFormValid, editingShiftId]);

  const handleEditShift = useCallback(
    (id: number) => {
      setEditingShiftId(id);
      const shiftToEdit = shifts.find((shift) => shift.id === id);
      if (shiftToEdit) setNewShift({ ...shiftToEdit });
      editSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [shifts]
  );

  const handleDeleteShift = useCallback(
    async (id: number) => {
        if (!API_BASE_URL) return; 

      try {
        const res = await fetch(`${API_BASE_URL}/api/shifts/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete shift");
        setShifts(shifts.filter((shift) => shift.id !== id));
        toast("Turno eliminado correctamente.", { icon: "🗑️" });
      } catch (error) {
        toast.error("Error al eliminar el turno.");
      }
    },
    [shifts]
  );

  const appointmentList = useMemo(
    () =>
      shifts.map((shift) => (
        <li
          key={shift.id}
          className="p-4 border rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 flex flex-col gap-2"
        >
          <div className="text-sm md:text-base">
            <p>
              <strong><u>Paciente:</u></strong> {shift.patient}
            </p>
            <p>
              <strong><u>Fecha:</u></strong> {formatDate(shift.date)}
            </p>
            <p>
              <strong><u>Horario:</u></strong> {shift.time} hs
            </p>
            {shift.note && (
              <p>
                <strong>Nota:</strong> {shift.note}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <button
              onClick={() => handleEditShift(shift.id)}
              className="bg-yellow-500 text-white px-3 py-2 rounded w-full sm:w-auto"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteShift(shift.id)}
              className="bg-red-600 text-white px-3 py-2 rounded w-full sm:w-auto"
            >
              Eliminar
            </button>
          </div>
        </li>
      )),
    [shifts, handleEditShift, handleDeleteShift]
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center underline">Gestión de Turnos</h1>

      <div ref={editSectionRef} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full max-w-lg lg:max-w-2xl">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">{isEditing ? "Editar Turno" : "Nuevo Turno"}</h2>
        
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Paciente</label>
            <select
              className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 placeholder-gray-500 mt-1"
              value={newShift.patient || ""}
              onChange={(e) => setNewShift((prev) => ({ ...prev, patient: e.target.value }))}
            >
              <option value="" disabled>
                Selecciona un paciente
              </option>
              {patients.map((patient) => (
                <option key={patient.id} value={`${patient.firstName} ${patient.lastName}`}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
            <input 
              type="date" 
              className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 placeholder-gray-500 mt-1" 
              value={newShift.date || ""} 
              onChange={(e) => setNewShift((prev) => ({ ...prev, date: e.target.value }))} 
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Horario</label>
            <select 
              className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 placeholder-gray-500 mt-1" 
              value={newShift.time || ""} 
              onChange={(e) => setNewShift((prev) => ({ ...prev, time: e.target.value }))}
            >
              <option value="" disabled>
                Selecciona un horario
              </option>
              {[...Array(13)].map((_, i) => {
                const hour = 10 + i;
                return (
                  <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
            <input 
              type="text" 
              placeholder="Teléfono del Paciente | Opcional" 
              className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 placeholder-gray-500 mt-1" 
              value={newShift.phone || ""} 
              onChange={(e) => setNewShift((prev) => ({ ...prev, phone: e.target.value }))} 
            />
          </div>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nota</label>
            <textarea 
                placeholder="Nota | Opcional" 
                className="w-full p-2 border rounded-lg text-black dark:text-white dark:bg-gray-700 placeholder-gray-500 mt-1" 
                value={newShift.note || ""} 
                onChange={(e) => setNewShift((prev) => ({ ...prev, note: e.target.value }))} 
            />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAddOrUpdateShift}
            className={`px-4 py-2 rounded-lg w-full sm:w-auto ${isFormValid ? "bg-indigo-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
            disabled={!isFormValid}
          >
            {isEditing ? "Actualizar Turno" : "Guardar Turno"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center underline">Turnos Asignados</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">{appointmentList}</ul>
      </div>
    </div>
  );
};

export default Shifts;