"use client"
import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react'; 

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
}

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'John Doe', age: 30, phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', age: 25, phone: '098-765-4321' },
  ]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Lista de Pacientes</h1>
      
      <div className="my-4">
        <button
          onClick={() => console.log('Agregar paciente')}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Agregar Paciente
        </button>
      </div>

      <table className="min-w-full table-auto mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Edad</th>
            <th className="py-2 px-4">Teléfono</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b">
              <td className="py-2 px-4">{patient.name}</td>
              <td className="py-2 px-4">{patient.age}</td>
              <td className="py-2 px-4">{patient.phone}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(patient)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="text-red-600 hover:text-red-800"
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
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold">Editar Paciente</h2>
            <div className="mt-4">
              <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  defaultValue={selectedPatient.name}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700">Edad</label>
                <input
                  type="number"
                  defaultValue={selectedPatient.age}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="text"
                  defaultValue={selectedPatient.phone}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => console.log('Guardar cambios')}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
