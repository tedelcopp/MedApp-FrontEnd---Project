"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { ClipboardPlus, Trash2, FilePenLine } from "lucide-react";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dni: number;
  age: number;
  phone: string;
  comments?: string;
}

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3003/api/patients")
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

  // 🔹 Editar paciente
  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewing(false);
    setModalOpen(true);
  };

  // 🔹 Eliminar paciente
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3003/api/patients/${id}`, { method: "DELETE" });
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
      toast("Paciente eliminado", { icon: "🗑️" });
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  const handleSave = async () => {
    if (selectedPatient && selectedPatient.age >= 5) {
      try {
        const response = await fetch(`http://localhost:3003/api/patients${selectedPatient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedPatient),
        });

        if (!response.ok) throw new Error("Error actualizando paciente");

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
    setSelectedPatient({
      id: 0,  
      firstName: "",
      lastName: "",
      email: "",
      dni: 0, 
      age: 0,  
      phone: "",
      comments: "",
    });
  };
  
const handleSaveNewPatient = async () => {
  if (
    selectedPatient &&
    selectedPatient.firstName.trim() !== "" &&
    selectedPatient.lastName.trim() !== "" &&
    selectedPatient.dni > 0 &&  
    selectedPatient.phone.trim() !== ""
  ) {
    try {
      const response = await fetch("http://localhost:3003/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPatient),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al agregar paciente: ${errorMessage}`);
      }

      const newPatient = await response.json();
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
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8 text-black dark:text-white">
        Lista de Pacientes
      </h1>

      <div className="my-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            onClick={handleAddPatient}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            title="Nuevo paciente"
            aria-label="Registrar un nuevo paciente"
          >
            Nuevo Paciente
          </button>
          <input
            type="text"
            placeholder="Buscar paciente.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <table className="min-w-full table-auto mt-4 border-collapse bg-white dark:bg-gray-900 text-black dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Apellido</th>
            <th className="py-2 px-4 text-center">Edad</th>
            <th className="py-2 px-4 text-center">Teléfono</th>
            <th className="py-2 px-4 text-center">¿Comentarios?</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id} className="border-b">
              <td className="py-2 px-4 text-center">{patient.firstName}</td>
              <td className="py-2 px-4 text-center">{patient.lastName}</td>
              <td className="py-2 px-4 text-center">{patient.age}</td>
              <td className="py-2 px-4 text-center">{patient.phone}</td>
              <td className="py-2 px-4 text-center">
                {patient.comments ? "Sí" : "No"}
              </td>
              <td className="py-2 px-4 flex justify-center items-center space-x-2">
                <button
                  onClick={() => handleView(patient)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-500"
                  title="Ver info+ de paciente"
                  aria-label="Ver info+ de paciente"
               >
                  <ClipboardPlus size={18} />
                </button>
                <button
                  onClick={() => handleEdit(patient)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
                  title="Editar info+ de paciente"
                  aria-label="Editar info+ de paciente"
                >
                  <FilePenLine size={18} />
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                  title="Eliminar ficha de paciente"
                  aria-label="Eliminar ficha de paciente"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 p-6 text-black dark:text-white">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {newPatient
                ? "Agregar Paciente"
                : isViewing
                ? "Información del Paciente"
                : "Editar Paciente"}
            </h2>
            <div className="mb-4">
              <label className="block mb-2">Nombre</label>
              <input
                type="text"
                value={selectedPatient.firstName}
                onChange={(e) =>
                  !isViewing &&
                  setSelectedPatient((prev) =>
                    prev ? { ...prev, firstName: e.target.value } : null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                readOnly={isViewing}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Apellido</label>
              <input
                type="text"
                value={selectedPatient.lastName}
                onChange={(e) =>
                  !isViewing &&
                  setSelectedPatient((prev) =>
                    prev ? { ...prev, lastName: e.target.value } : null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                readOnly={isViewing}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Edad</label>
              <input
                type="number"
                value={selectedPatient?.age}
                onChange={(e) => {
                  const newAge = Math.max(parseInt(e.target.value, 10) || 5, 5);
                  setSelectedPatient((prev) =>
                    prev ? { ...prev, age: newAge } : null
                  );
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                readOnly={isViewing}
              />
            </div>
            <div className="mb-4">
  <label className="block mb-2">Teléfono</label>
  <PhoneInput
  country={"ar"}
  value={selectedPatient?.phone || ""}
  onChange={(phone) => {
    if (!isViewing) {
      setSelectedPatient((prev) => prev ? { ...prev, phone } : null);
    }
  }}
  inputStyle={{
    width: "100%",
    padding: "10px 10px 10px 50px",
    backgroundColor: "var(--tw-bg-opacity)",
    border: "1px solid #ccc",
    borderRadius: "4px",
  }}
  buttonStyle={{
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    backgroundColor: "transparent",
  }}
  containerStyle={{
    position: "relative",
    width: "100%",
  }}
  disabled={isViewing}
/>

</div>

            <div className="mb-4">
              <label className="block mb-2">Nota</label>
              <textarea
                value={selectedPatient.comments || ""}
                onChange={(e) =>
                  !isViewing &&
                  setSelectedPatient((prev) =>
                    prev ? { ...prev, comments: e.target.value } : null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                readOnly={isViewing}
              />
            </div>
            <div className="flex justify-end space-x-4">
              {/* Cancel Button */}
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                title="Cancelar"
              >
                Cancelar
              </button>

              <button
                onClick={newPatient ? handleSaveNewPatient : handleSave}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                title={newPatient ? "Guardar nuevo paciente" : "Guardar cambios"}
              >
                {newPatient ? "Guardar" : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default Patients;
