# Blog Deportivo | Lucas Caudana

Este es un proyecto freelance de una aplicación web moderna y completa, desarrollada a medida para **Lucas Caudana**, un estudiante de periodismo deportivo. El objetivo era crear una plataforma personal, elegante y altamente funcional donde pudiera gestionar y presentar sus noticias de una manera visualmente impactante y dinámica.

---

## English Version

This is a freelance project for a modern and complete web application, custom-built for **Lucas Caudana**, a sports journalism student. The goal was to create a personal, elegant, and highly functional platform where he could manage and present his news articles in a visually stunning and dynamic way.

###  Key Features

*   **Complete News Management (CRUD):** A seamless interface to Create, Read, Update, and Delete news articles through intuitive modals.
*   **Rich Content:** Each article supports a title, a detailed description, image uploads directly from the user's computer, and a multi-category tagging system.
*   **Dynamic & Immersive Interface:**
    *   **3D Holo-Cards:** News cards feature a 3D parallax effect that reacts to the user's mouse movement, creating a sense of depth and interactivity.
    *   **Live "Aurora" Background:** A stunning, animated aurora borealis background made with pure CSS provides a constantly evolving and immersive visual environment.
    *   **Drag & Drop Reordering:** The user can intuitively reorder news articles by simply dragging and dropping them into a new position.
    *   **Fully Responsive Design:** The entire interface, including forms and modals, is perfectly adapted for mobile, tablet, and desktop screens.
    *   **Professional Loading Screen:** A custom animated loading screen ensures a smooth, high-end user experience during initial load and login transitions.
*   **Hybrid Data & Authentication System:**
    *   **Admin Mode:** Secure authentication via **Firebase Auth (Google Sign-In)**. All data is stored securely in a private **Firestore** collection, allowing the admin to access and manage content from any device.
    *   **Portfolio / Demo Mode:** For non-authenticated visitors, the application runs in a sandbox mode using the browser's **`localStorage`**. This allows anyone to test all functionalities without interfering with the real user's data.

###  Tech Stack & Dependencies

*   **Core:** React, JavaScript (ES6+)
*   **Backend & Database:** Firebase (Authentication, Firestore)
*   **Styling:** Custom CSS with CSS Variables, Flexbox, and CSS Columns (for the Masonry Layout). The base structure uses Bootstrap 5's grid system.
*   **Key Dependencies:**
    *   `react` & `react-dom`
    *   `firebase`
    *   `@hello-pangea/dnd` (for Drag & Drop functionality)
    *   `bootstrap`

---

## 🇪🇸 Versión en Español

Este es un proyecto freelance de una aplicación web moderna y completa, desarrollada a medida para **Lucas Caudana**, un estudiante de periodismo deportivo. El objetivo era crear una plataforma personal, elegante y altamente funcional donde pudiera gestionar y presentar sus noticias de una manera visualmente impactante y dinámica.

###  Características Principales

*   **Gestión Completa de Noticias (CRUD):** Una interfaz fluida para Crear, Leer, Actualizar y Eliminar noticias a través de modales intuitivos.
*   **Contenido Enriquecido:** Cada artículo soporta un título, una descripción detallada, la subida de imágenes directamente desde el ordenador del usuario y un sistema de etiquetado con múltiples categorías.
*   **Interfaz Dinámica e Inmersiva:**
    *   **Tarjetas Holográficas 3D:** Las tarjetas de noticias cuentan con un efecto de paralaje 3D que reacciona al movimiento del ratón, creando una sensación de profundidad e interactividad.
    *   **Fondo "Aurora" Vivo:** Un espectacular fondo animado de aurora boreal, creado con CSS puro, que proporciona un entorno visual en constante evolución.
    *   **Reordenamiento por Arrastre (Drag & Drop):** El usuario puede reordenar las noticias de forma intuitiva, simplemente arrastrándolas y soltándolas en su nueva posición.
    *   **Diseño Totalmente Responsivo:** Toda la interfaz, incluyendo formularios y modales, está perfectamente adaptada para pantallas de móvil, tablet y escritorio.
    *   **Pantalla de Carga Profesional:** Una pantalla de carga animada y personalizada que asegura una experiencia de usuario fluida y de alta gama durante la carga inicial y las transiciones.
*   **Sistema Híbrido de Datos y Autenticación:**
    *   **Modo Administrador:** Autenticación segura a través de **Firebase Auth (Inicio de sesión con Google)**. Todos los datos se almacenan de forma segura en una colección privada de **Firestore**, permitiendo al administrador acceder y gestionar el contenido desde cualquier dispositivo.
    *   **Modo Portafolio / Demostración:** Para los visitantes no autenticados, la aplicación se ejecuta en un modo "sandbox" utilizando el **`localStorage`** del navegador. Esto permite a cualquiera probar todas las funcionalidades sin interferir con los datos del usuario real.

### Tecnologías y Dependencias

*   **Core:** React, JavaScript (ES6+)
*   **Backend & Base de Datos:** Firebase (Authentication, Firestore)
*   **Estilos:** CSS personalizado con Variables CSS, Flexbox y CSS Columns (para el layout Masonry). La estructura base utiliza el sistema de grid de Bootstrap 5.
*   **Dependencias Clave:**
    *   `react` & `react-dom`
    *   `firebase`
    *   `@hello-pangea/dnd` (para la funcionalidad de arrastrar y soltar)
    *   `bootstrap`