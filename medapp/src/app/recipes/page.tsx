"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

const generateRecetaPDF = (
  nombre: string,
  obraSocial: string,
  numeroSocio: string,
  medicamentos: string,
  profesional: string
) => {
  const doc = new jsPDF();

  // Agregar imagen de encabezado
  const imgData = "data:image/jpeg;base64,[base64_image_data]";
  doc.addImage(imgData, "JPEG", 10, 10, 50, 20);

  doc.setFontSize(16);
  doc.text("Receta Médica", 105, 40, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Nombre del Paciente: ${nombre}`, 10, 60);
  doc.text(`Obra Social: ${obraSocial}`, 10, 70);
  doc.text(`Número de Socio: ${numeroSocio}`, 10, 80);
  doc.text(`Medicamentos:`, 10, 90);
  doc.text(medicamentos, 10, 100);

  // Firma al final
  doc.text(`Firma del Profesional: ${profesional}`, 10, 140);
  doc.line(10, 145, 100, 145);

  doc.save("receta.pdf");
};

const generateCertificadoPDF = (
  nombre: string,
  obraSocial: string,
  numeroSocio: string,
  motivo: string,
  profesional: string
) => {
  const doc = new jsPDF();

  // Agregar imagen de encabezado
  const imgData = "data:image/jpeg;base64,[base64_image_data]";
  doc.addImage(imgData, "JPEG", 10, 10, 50, 20);

  doc.setFontSize(16);
  doc.text("Certificado Médico", 105, 40, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Nombre del Paciente: ${nombre}`, 10, 60);
  doc.text(`Obra Social: ${obraSocial}`, 10, 70);
  doc.text(`Número de Socio: ${numeroSocio}`, 10, 80);
  doc.text(`Motivo del Certificado:`, 10, 90);
  doc.text(motivo, 10, 100);

  // Firma al final
  doc.text(`Firma del Profesional: ${profesional}`, 10, 140);
  doc.line(10, 145, 100, 145);

  doc.save("certificado.pdf");
};

const RecipesPage = () => {
  const [activeTab, setActiveTab] = useState<"recetas" | "certificados">("recetas");
  const [nombre, setNombre] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [numeroSocio, setNumeroSocio] = useState("");
  const [medicamentos, setMedicamentos] = useState("");
  const [motivo, setMotivo] = useState("");
  const [profesional, setProfesional] = useState("");

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Recetas y Certificados</h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "recetas" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("recetas")}
          >
            Recetas
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "certificados" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("certificados")}
          >
            Certificados
          </button>
        </div>

        {/* Tabs content */}
        <div>
          {activeTab === "recetas" ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Generar Receta Médica</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  generateRecetaPDF(nombre, obraSocial, numeroSocio, medicamentos, profesional);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del Paciente</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Obra Social</label>
                  <input
                    type="text"
                    value={obraSocial}
                    onChange={(e) => setObraSocial(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Número de Socio</label>
                  <input
                    type="text"
                    value={numeroSocio}
                    onChange={(e) => setNumeroSocio(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Medicamentos</label>
                  <textarea
                    value={medicamentos}
                    onChange={(e) => setMedicamentos(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Profesional Responsable</label>
                  <input
                    type="text"
                    value={profesional}
                    onChange={(e) => setProfesional(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Generar Receta PDF
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-4">Generar Certificado Médico</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  generateCertificadoPDF(nombre, obraSocial, numeroSocio, motivo, profesional);
                }}
                className="space-y-4"
              >
                {/* Formulario similar */}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
