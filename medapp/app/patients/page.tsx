"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { ClipboardPlus, Trash2, FilePenLine } from "lucide-react";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dni: number;
  age: number;
  phone: string;
}

// NOTA: Se usa un valor por defecto seguro si la variable de entorno no está definida
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/patients`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          console.error("❌ La API no devolvió un array:", data);
          setPatients([]);
        }
      })
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewing(true);
    setModalOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewing(false);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    // Usaremos una confirmación de UI personalizada en un entorno real
    if (!window.confirm(`¿Está seguro de que desea eliminar al paciente con ID ${id}?`)) {
        return;
    }
    
    try {
      await fetch(`${API_URL}/api/patients/${id}`, { method: "DELETE" });
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
      toast("Paciente eliminado", { icon: "🗑️" });
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      toast.error("Error al eliminar paciente");
    }
  };

  const handleSave = async () => {
    if (selectedPatient && selectedPatient.age >= 5) {
      try {
        const response = await fetch(`${API_URL}/api/patients/${selectedPatient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedPatient),
        });

        if (!response.ok) throw new Error("Error actualizando paciente");

        // Actualizar el estado con el paciente modificado
        setPatients((prev) =>
          prev.map((patient) => (patient.id === selectedPatient.id ? selectedPatient : patient))
        );

        toast.success("Guardado correctamente");
        closeModal();
      } catch (error) {
        console.error("Error al actualizar paciente:", error);
        toast.error("Error al guardar cambios");
      }
    } else {
      toast.error("La edad debe ser al menos 5");
    }
  };

  const handleAddPatient = () => {
    setModalOpen(true);
    setNewPatient(true);
    setIsViewing(false);
    // Inicializamos el ID en 0. Este ID NO debe enviarse en la solicitud POST.
    setSelectedPatient({
      id: 0, 
      firstName: "",
      lastName: "",
      email: "",
      dni: 0,
      age: 0,
      phone: "",
    });
  };

  const handleSaveNewPatient = async () => {
    if (
      selectedPatient &&
      selectedPatient.firstName.trim() !== "" &&
      selectedPatient.lastName.trim() !== "" &&
      selectedPatient.dni > 0 &&
      selectedPatient.phone.trim() !== "" &&
      selectedPatient.email.trim() !== ""
    ) {
      try {
        // CORRECCIÓN CLAVE: Creamos un nuevo objeto SÓLO con las propiedades de datos,
        // excluyendo el campo 'id' (que es 0) para que el backend asigne uno nuevo.
        const { id, ...patientDataToSend } = selectedPatient;
        
        const response = await fetch(`${API_URL}/api/patients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientDataToSend), // Enviamos el objeto sin 'id'
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error al agregar paciente: ${errorMessage}`);
        }

        const newPatient = await response.json();
        // El nuevo paciente (newPatient) ya debe contener el ID asignado por el backend
        setPatients((prev) => [...prev, newPatient]);
        toast.success("Paciente agregado con éxito");
        closeModal();
      } catch (error) {
        console.error("Error al agregar paciente:", error);
        toast.error("Error al agregar paciente");
      }
    } else {
      toast.error("Todos los campos son obligatorios.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
    setNewPatient(false);
    setIsViewing(false);
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(patient.dni).includes(searchTerm)
  );

  // Componente de Input Reutilizable para el Modal
  const ModalInput = ({ label, type = "text", value, onChange, readOnly = false, placeholder = "" }) => (
    <div className="mb-2">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border ${readOnly ? 'bg-gray-100 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-700'} border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-black dark:text-white`}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
  );


  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
        Registro de Pacientes
      </h1>

      <div className="my-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <button
          onClick={handleAddPatient}
          className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-500/50"
          title="Nuevo paciente"
          aria-label="Registrar un nuevo paciente"
        >
          Registrar Nuevo Paciente
        </button>
        <input
          type="text"
          placeholder="Buscar por Nombre, Apellido o DNI..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        />
      </div>

      <div className="max-w-6xl mx-auto overflow-x-auto shadow-xl rounded-xl">
        <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700/80 text-left uppercase text-sm">
              <th className="py-3 px-4 text-center font-bold">Nombre</th>
              <th className="py-3 px-4 text-center font-bold">Apellido</th>
              <th className="py-3 px-4 text-center font-bold hidden md:table-cell">Email</th>
              <th className="py-3 px-4 text-center font-bold">DNI</th>
              <th className="py-3 px-4 text-center font-bold hidden sm:table-cell">Edad</th>
              <th className="py-3 px-4 text-center font-bold hidden lg:table-cell">Teléfono</th>
              <th className="py-3 px-4 text-center font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              // Usamos el ID asignado por la BD como key
              <tr key={patient.id} 
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-150">
                <td className="py-3 px-4 text-center">{patient.firstName}</td>
                <td className="py-3 px-4 text-center">{patient.lastName}</td>
                <td className="py-3 px-4 text-center hidden md:table-cell truncate max-w-xs">{patient.email}</td>
                <td className="py-3 px-4 text-center">{patient.dni}</td>
                <td className="py-3 px-4 text-center hidden sm:table-cell">{patient.age}</td>
                <td className="py-3 px-4 text-center hidden lg:table-cell">{patient.phone}</td>
                <td className="py-3 px-4 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleView(patient)}
                    className="text-green-600 dark:text-green-400 p-1 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition"
                    title="Ver información"
                  >
                    <ClipboardPlus size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(patient)}
                    className="text-blue-600 dark:text-blue-400 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                    title="Editar información"
                  >
                    <FilePenLine size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-600 dark:text-red-400 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition"
                    title="Eliminar paciente"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-8 text-black dark:text-white transform transition-all scale-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
              {newPatient
                ? "Agregar Nuevo Paciente"
                : isViewing
                ? "Información del Paciente"
                : "Editar Paciente"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Nombre */}
              <ModalInput 
                label="Nombre"
                value={selectedPatient.firstName}
                onChange={(e) =>
                  !isViewing && setSelectedPatient((prev) => prev ? { ...prev, firstName: e.target.value } : null)
                }
                readOnly={isViewing}
              />

              {/* Apellido */}
              <ModalInput 
                label="Apellido"
                value={selectedPatient.lastName}
                onChange={(e) =>
                  !isViewing && setSelectedPatient((prev) => prev ? { ...prev, lastName: e.target.value } : null)
                }
                readOnly={isViewing}
              />
              
              {/* Email */}
              <ModalInput 
                label="Email"
                type="email"
                value={selectedPatient.email}
                onChange={(e) =>
                  !isViewing && setSelectedPatient((prev) => prev ? { ...prev, email: e.target.value } : null)
                }
                readOnly={isViewing}
              />

              {/* DNI */}
              <ModalInput 
                label="DNI"
                type="number"
                value={selectedPatient.dni || ''}
                onChange={(e) =>
                  !isViewing && setSelectedPatient((prev) => prev ? { ...prev, dni: Number(e.target.value) } : null)
                }
                readOnly={isViewing}
              />

              {/* Edad */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Edad (Mínimo 5)</label>
                <input
                  type="number"
                  value={selectedPatient?.age || ''}
                  onChange={(e) => {
                    // Solo actualizamos si no estamos viendo (readOnly)
                    if (!isViewing) {
                        const newAge = Math.max(parseInt(e.target.value, 10) || 0, 0);
                        setSelectedPatient((prev) => prev ? { ...prev, age: newAge } : null);
                    }
                  }}
                  className={`w-full px-3 py-2 border ${isViewing ? 'bg-gray-100 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-700'} border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-black dark:text-white`}
                  readOnly={isViewing}
                />
              </div>
              
              {/* Teléfono (Reemplazo de PhoneInput) */}
              <ModalInput 
                label="Teléfono"
                type="tel"
                value={selectedPatient?.phone || ""}
                onChange={(e) => 
                  !isViewing && setSelectedPatient((prev) => prev ? { ...prev, phone: e.target.value } : null)
                }
                readOnly={isViewing}
                placeholder="Ej: +54 9 11 1234 5678"
              />

            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 shadow-md"
                title="Cerrar modal"
              >
                Cerrar
              </button>

              {/* Botones de acción (Guardar/Editar) */}
              {!isViewing && (
                <button
                  onClick={newPatient ? handleSaveNewPatient : handleSave}
                  className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md shadow-indigo-500/50"
                  title={newPatient ? "Guardar nuevo paciente" : "Guardar cambios"}
                >
                  {newPatient ? "Guardar" : "Guardar cambios"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
