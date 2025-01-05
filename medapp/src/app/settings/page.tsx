"use client";

import React, { useState } from "react";
import toast from "react-hot-toast"; 
import { Edit, Save } from "lucide-react"; 

const Settings = () => {
  const [nombre, setNombre] = useState("Dr. Juan Pérez");
  const [especializacion, setEspecializacion] = useState("Especialista en Terapia Cognitiva");
  const [correo, setCorreo] = useState("dr.juanperez@example.com");
  const [contraseña, setContraseña] = useState("");
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null); 
  const [modoEdicion, setModoEdicion] = useState({
    nombre: false,
    especializacion: false,
    correo: false,
    contraseña: false,
    avatar: false,
  });

  const handleEdit = (campo: string) => {
    setModoEdicion({ ...modoEdicion, [campo]: true });
  };

  const handleSaveChanges = (campo: string) => {
    console.log(`Cambio en ${campo}:`, { nombre, especializacion, correo, contraseña });
    toast.success(`Modificaste tu ${campo} con éxito!`);
    setModoEdicion({ ...modoEdicion, [campo]: false });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center underline underline-offset-8">Configuración de Usuario</h1>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8">

          <div className="flex items-center gap-4">
            {avatar ? (
              <img
                src={avatar as string}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-4 border-indigo-600 transform transition-all duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-lg">
                {nombre.charAt(0)}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="p-2 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-indigo-100"
              onChange={handleFileChange}
            />
            <button
              onClick={() => handleSaveChanges("avatar")}
              className="text-green-600 hover:underline transition-all duration-200 ml-4"
              title="Guardar Avatar"
            >
              <Save size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="nombre">Nombre</label>
            {!modoEdicion.nombre ? (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">{nombre}</span>
                <button
                  onClick={() => handleEdit("nombre")}
                  className="text-indigo-600 hover:underline transition-all duration-200"
                  title="Editar Nombre"
                >
                  <Edit size={20} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  id="nombre"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <button
                  onClick={() => handleSaveChanges("nombre")}
                  className="text-green-600 hover:underline transition-all duration-200"
                  title="Guardar Nombre"
                >
                  <Save size={20} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="especializacion">Especialización</label>
            {!modoEdicion.especializacion ? (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">{especializacion}</span>
                <button
                  onClick={() => handleEdit("especializacion")}
                  className="text-indigo-600 hover:underline transition-all duration-200"
                  title="Editar Especialización"
                >
                  <Edit size={20} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  id="especializacion"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={especializacion}
                  onChange={(e) => setEspecializacion(e.target.value)}
                />
                <button
                  onClick={() => handleSaveChanges("especializacion")}
                  className="text-green-600 hover:underline transition-all duration-200"
                  title="Guardar Especialización"
                >
                  <Save size={20} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="correo">Correo Electrónico</label>
            {!modoEdicion.correo ? (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">{correo}</span>
                <button
                  onClick={() => handleEdit("correo")}
                  className="text-indigo-600 hover:underline transition-all duration-200"
                  title="Editar Correo Electrónico"
                >
                  <Edit size={20} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="email"
                  id="correo"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <button
                  onClick={() => handleSaveChanges("correo")}
                  className="text-green-600 hover:underline transition-all duration-200"
                  title="Guardar Correo Electrónico"
                >
                  <Save size={20} />
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="contraseña">Contraseña</label>
            {!modoEdicion.contraseña ? (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">********</span>
                <button
                  onClick={() => handleEdit("contraseña")}
                  className="text-indigo-600 hover:underline transition-all duration-200"
                  title="Editar Contraseña"
                >
                  <Edit size={20} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="password"
                  id="contraseña"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  onClick={() => handleSaveChanges("contraseña")}
                  className="text-green-600 hover:underline transition-all duration-200"
                  title="Guardar Contraseña"
                >
                  <Save size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
