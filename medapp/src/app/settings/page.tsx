"use client";

import React, { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("Dr. Juan Pérez");
  const [specialization, setSpecialization] = useState("Especialista en Terapia Cognitiva");
  const [email, setEmail] = useState("dr.juanperez@example.com");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null); // Para almacenar la imagen
  const [editMode, setEditMode] = useState({
    name: false,
    specialization: false,
    email: false,
    password: false,
    avatar: false
  });

  // Función para habilitar el modo de edición para un campo
  const handleEdit = (field: string) => {
    setEditMode({ ...editMode, [field]: true });
  };

  // Función para guardar cambios
  const handleSaveChanges = (field: string) => {
    console.log(`Cambio en ${field}:`, { name, specialization, email, password });
    alert(`Cambios en ${field} guardados con éxito.`);
    setEditMode({ ...editMode, [field]: false });
  };

  // Función para manejar la carga de la imagen de perfil
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Almacena la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Configuraciones del Usuario</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        {/* Foto de Usuario */}
        <div className="flex flex-col items-center mb-6">
          <label className="block text-sm font-medium mb-2">Foto de Perfil</label>
          <div className="flex items-center gap-4">
            {avatar ? (
              <img
                src={avatar as string}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full border-4 border-indigo-600"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-lg">
                {name.charAt(0)}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="p-2 border rounded-lg cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Configuración del Perfil */}
        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
            {!editMode.name ? (
              <div className="flex justify-between items-center">
                <span>{name}</span>
                <button
                  onClick={() => handleEdit("name")}
                  className="text-indigo-600 hover:underline"
                >
                  Modificar
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  onClick={() => handleSaveChanges("name")}
                  className="text-green-600 hover:underline"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>

          {/* Especialización */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="specialization">Especialización</label>
            {!editMode.specialization ? (
              <div className="flex justify-between items-center">
                <span>{specialization}</span>
                <button
                  onClick={() => handleEdit("specialization")}
                  className="text-indigo-600 hover:underline"
                >
                  Modificar
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  id="specialization"
                  className="w-full p-2 border rounded"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
                <button
                  onClick={() => handleSaveChanges("specialization")}
                  className="text-green-600 hover:underline"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Correo Electrónico</label>
            {!editMode.email ? (
              <div className="flex justify-between items-center">
                <span>{email}</span>
                <button
                  onClick={() => handleEdit("email")}
                  className="text-indigo-600 hover:underline"
                >
                  Modificar
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={() => handleSaveChanges("email")}
                  className="text-green-600 hover:underline"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</label>
            {!editMode.password ? (
              <div className="flex justify-between items-center">
                <span>********</span>
                <button
                  onClick={() => handleEdit("password")}
                  className="text-indigo-600 hover:underline"
                >
                  Modificar
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  onClick={() => handleSaveChanges("password")}
                  className="text-green-600 hover:underline"
                >
                  Guardar
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
