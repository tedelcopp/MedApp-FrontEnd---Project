"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Edit, Save } from "lucide-react";

const Settings = () => {
  const [userData, setUserData] = useState({
    nombre: "Dr. Juan Pérez",
    especializacion: "Especialista en Terapia Cognitiva",
    correo: "dr.juanperez@example.com",
    contraseña: "",
    avatar: "",
  });

  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) setUserData(JSON.parse(savedData));
  }, []);

  const handleEdit = (campo: string) => setEditingField(campo);

  const handleSaveChanges = (campo: string) => {
    toast.success(`Modificaste tu ${campo} con éxito!`);
    setEditingField(null);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const renderEditableField = (label: string, key: keyof typeof userData, type = "text") => (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">{label}</label>
      {editingField === key ? (
        <div className="flex items-center gap-3">
          <input
            type={type}
            autoFocus
            className="w-full max-w-[100%] p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-md 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
              placeholder:text-gray-500 dark:placeholder-gray-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            value={userData[key]}
            onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSaveChanges(key)}
          />
          <button
            onClick={() => handleSaveChanges(key)}
            className="text-green-600 dark:text-green-400 hover:underline transition-all duration-200 flex-shrink-0"
            title={`Guardar ${label}`}
            aria-label={`Guardar ${label}`}
          >
            <Save size={20} />
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-gray-900 dark:text-gray-300">{key === "contraseña" ? "********" : userData[key]}</span>
          <button
            onClick={() => handleEdit(key)}
            className="text-indigo-600 dark:text-indigo-400 hover:underline transition-all duration-200"
            title={`Editar ${label}`}
            aria-label={`Editar ${label}`}
          >
            <Edit size={20} />
          </button>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8">Configuración de Usuario</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl">
        <div className="space-y-6">
          {renderEditableField("Nombre", "nombre")}
          {renderEditableField("Especialización", "especializacion")}
          {renderEditableField("Correo Electrónico", "correo", "email")}
          {renderEditableField("Contraseña", "contraseña", "password")}
        </div>
      </div>
    </div>
  );
};

export default Settings;
