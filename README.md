# **🏥 | MedApp: Plataforma de Gestión Médica**

**MedApp** es una aplicación para facilitar la gestión de historiales médicos y citas en clínicas y consultorios. Su objetivo es optimizar la organización y la experiencia de los profesionales de la salud mediante una interfaz intuitiva y funcionalidades personalizables.

---

## **✨ Características:**

- **📋 Gestión de pacientes:** Crear, modificar y eliminar pacientes.
- **📅 Organización de turnos médicos:** Programación y visualización de citas.
- **🌗 Modo oscuro/claro:** Interfaz adaptable que mejora la usabilidad en diferentes entornos y preferencias del usuario.
- **📊 Panel de administración:** Navegación intuitiva con secciones clave como Inicio, Pacientes, Turnos y Configuración.
- **💾 Persistencia de datos:** Toda la información queda registrada en la base de datos, garantizando integridad y disponibilidad.
- **📱 Diseño responsive:** La aplicación se adapta a dispositivos móviles, tablets y pantallas de escritorio para una experiencia óptima en cualquier tamaño de pantalla.
---

## 🚀 Tecnologías:

- **Frontend:** [Next.js 15](https://nextjs.org/) + [React 19](https://react.dev/)
- **Backend:** [Express](https://expressjs.com/) + [Next API Routes](https://nextjs.org/docs/api-routes/introduction)
- **Base de datos:** [PostgreSQL](https://www.postgresql.org/) (hospedada en [Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Autenticación:** [Auth0](https://auth0.com/) + [NextAuth.js](https://next-auth.js.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [Headless UI](https://headlessui.dev/) + [Styled Components](https://styled-components.com/)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Despliegue:** [Vercel](https://vercel.com/)
- **Servidor y servicios auxiliares:** [Render](https://render.com/)

---

## **Arquitectura del proyecto**

- **Carpetas organizadas** | Basadas en `src` para un desarrollo más limpio y escalable.
- **Configuración personalizada** | Implementación de temas y estilos globales para una experiencia uniforme.
- 
---

## **Instalación y Uso**

1. Clona este repositorio.
   ```bash
   git clone https://github.com/tu-usuario/medapp.git
   ```
2. Navega al directorio del proyecto.
   ```bash
   cd medapp
   ```
3. Instala las dependencias.
   ```bash
   npm install
   ```
4. Configurar variables de entorno:
- DATABASE_URL="postgresql://user:password@host:port/database"
- AUTH0_SECRET="your_auth0_secret"
- AUTH0_BASE_URL="http://localhost:3000"
- AUTH0_ISSUER_BASE_URL="https://your-domain.auth0.com"
- AUTH0_CLIENT_ID="your_client_id"
- AUTH0_CLIENT_SECRET="your_client_secret"
   
5. Inicia el servidor de desarrollo.
   ```bash
   npm run dev
   ```
---

## **Contribuciones**

Toda colaboración de mejora es bienvenida. Si tenes ideas para mejorar el código actual, no dudes en escribirme.

---

## **Contacto**

Podés contactarme a través de mi [LinkedIn](https://www.linkedin.com/in/edelcopp/) o por correo electrónico a [tomas.edelcopp@gmail.com](mailto:tomas.edelcopp@gmail.com).

