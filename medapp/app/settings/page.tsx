"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Edit, Save } from "lucide-react";

const Settings = () => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState({
    nombre: session?.user?.name || "Nombre no disponible",
    especializacion: "Especialista en Terapia Cognitiva",
    correo: session?.user?.email || "Correo no disponible",
    contraseña: "",
    imagen: session?.user?.image || "",
  });
  
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleEdit = (campo: string) => setEditingField(campo);

  const handleSaveChanges = (campo: string) => {
    toast.success(`Modificaste tu ${campo} con éxito!`);
    setEditingField(null);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const renderEditableField = (label: string, key: keyof typeof userData, type = "text") => (
    <div className="flex flex-col gap-2">
      
      <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">{label}</label>
      {editingField === key ? (
        <div className="flex gap-3 w-full">
          
          <input
            type={type}
            autoFocus
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 
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
            <Save size={24} />
          </button>
        </div>
      ) : (
        
        <div className="flex justify-between items-center w-full">
          <span className="text-gray-900 dark:text-gray-300 break-words">{key === "contraseña" ? "********" : userData[key]}</span>
          <button
            onClick={() => handleEdit(key)}
            className="text-indigo-600 dark:text-indigo-400 hover:underline transition-all duration-200"
            title={`Editar ${label}`}
            aria-label={`Editar ${label}`}
          >
            <Edit size={24} />
          </button>
        </div>
      )}
    </div>
  );
  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center underline text-gray-900 dark:text-white">
        Configuración de Usuario
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8 max-w-lg md:max-w-2xl w-full mx-auto transition-all duration-300 hover:shadow-2xl">
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
