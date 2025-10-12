# **🏥 | MedApp: Plataforma de Gestión Médica**

**MedApp** es una aplicación diseñada para asistir en la gestión de registros de pacientes y la organización de turnos en clínicas y consultorios. La plataforma se centra en proporcionar una herramienta que facilite los procesos administrativos cotidianos del profesional de la salud. Para ello, incorpora una interfaz clara y estructurada, orientada a las necesidades operativas de la consulta profesional.

---

## **✨ | Características**

 - **📋 Gestión de pacientes:** Crea, actualiza y elimina perfiles de pacientes de forma eficiente, manteniendo un registro médico organizado y accesible.
 - **📅 Organización de turnos médicos:** Programa, visualiza y gestiona todos los turnos médicos con facilidad.
 - **🌗 Modo oscuro/claro:** Alterna entre el Modo Oscuro y el Modo Claro para una visualización cómoda y personalizable, ajustándose a cualquier condición de luz y preferencia visual.
 - **📊 Panel de administración:** Navega con fluidez a través de las secciones clave: Inicio, Pacientes, Turnos y Configuración.
 - **💾 Persistencia de datos:** Toda la información queda permanentemente registrada en la base de datos, asegurando la integridad, disponibilidad y trazabilidad de los datos.
 - **📱 Diseño responsive:** Accede y utiliza la aplicación desde cualquier dispositivo (móvil, tablet o escritorio), garantizando una experiencia visual y funcional en cualquier tamaño de pantalla.
  
---

## 🚀 | Tecnologías:

- **FrontEnd:** [Next.js 15](https://nextjs.org/) + [React 19](https://react.dev/).
- **Base de datos:** [PostgreSQL](https://www.postgresql.org/) ➤ Hospedada en [Neon](https://neon.tech/).
- **Autenticación:** [Auth0](https://auth0.com/) + [NextAuth.js](https://next-auth.js.org/).
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/).
- **Despliegue:** [Vercel](https://vercel.com/).
- **BackEnd:** [tedelcopp/MedApp-BackEnd---Project](https://github.com/tedelcopp/MedApp-BackEnd---Project) ➤ Hospedado en [Render](https://render.com/).

---

## 🏗️ | **Arquitectura del proyecto**

- **Estructura Modular** | Carpetas organizadas bajo el directorio raíz **(app/)** que facilita un desarrollo más limpio, modular y escalable, siguiendo las convenciones modernas.
- **Configuración Centralizada** | Implementación de temas y estilos globales visibles en **global.css** y la configuración de **tailwind.config** para asegurar una experiencia visual uniforme y coherente.
---

## ⚙️ | **Instalación y Uso**

1. Clona este repositorio.
   ```bash
   git clone https://github.com/tedelcopp/MedApp-FrontEnd---Project.git
   ```
2. Navega al directorio del proyecto.
   ```bash
   cd MedApp-FrontEnd---Project
   ```
3. Instala las dependencias.
   ```bash
   npm install
   ```
4. **Configura las variables de entorno:** Crea un archivo llamado **`.env.local`** en la raíz del proyecto.

    ```bash
    DATABASE_URL="postgresql://user:password@host:port/database"
    AUTH0_SECRET="your_auth0_secret"
    AUTH0_BASE_URL="http://localhost:3000"
    AUTH0_ISSUER_BASE_URL="[https://your-domain.auth0.com](https://your-domain.auth0.com)"
    AUTH0_CLIENT_ID="your_client_id"
    AUTH0_CLIENT_SECRET="your_client_secret"
**Configura las variables de entorno:** Crea un archivo llamado **

- MASTER_USER=medapp@gmail.com
- MASTER_PASS=admin1234
    
    ```
5. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   ```
---
## 🚀 | **Acceso**

Podés ver la aplicación desplegada en: https://themedapp.vercel.app

---

## 🤝 **Contribuciones**

Toda colaboración de mejora es bienvenida. Si tenes ideas para mejorar el código actual, no dudes en escribirme.

---

## 📬 **Contacto**

Podés contactarme a través de mi [LinkedIn](https://www.linkedin.com/in/edelcopp/) o por correo electrónico a [tomas.edelcopp@gmail.com](mailto:tomas.edelcopp@gmail.com).

