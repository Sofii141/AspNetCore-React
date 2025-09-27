# Stock Portfolio - Full-Stack CRUD con ASP.NET Core y React

Este proyecto es una aplicación web full-stack desarrollada como ejemplo funcional para demostrar la integración de un backend robusto en **ASP.NET Core** con un frontend interactivo en **React**. La aplicación permite la gestión de un portafolio de acciones, implementando operaciones CRUD completas y una gestión de roles para usuarios (Administrador vs. Usuario Normal).

Un objetivo central del proyecto fue modelar e implementar correctamente una **relación muchos-a-muchos** (Usuarios y Acciones a través de un Portafolio), demostrando el uso de Entity Framework Core para el mapeo de entidades y la ejecución de migraciones.


## Autores del Proyecto

-   Karold Dirley Delgado Arciniegas
-   Ana Sofia Arango Yanza
-   Juan David Moran Santiusty
-   Isabella Andrea Trochez Salazar

## Características Principales

-   **Autenticación y Autorización:** Sistema de registro y login basado en Tokens **JWT**.
-   **Gestión de Roles:** Flujos diferenciados para usuarios Administradores y usuarios normales.
-   **CRUD de Acciones:** Los administradores pueden Crear, Leer, Actualizar y Eliminar acciones del sistema.
-   **Gestión de Portafolio (Muchos-a-Muchos):** Los usuarios registrados pueden añadir o eliminar acciones de su portafolio personal.
-   **Comentarios en Acciones (Uno-a-Muchos):** Los usuarios pueden dejar comentarios en acciones específicas.
-   **Arquitectura Limpia (Onion):** El backend está estructurado en capas (Core, Application, Infrastructure, API) para una máxima separación de responsabilidades y mantenibilidad.
-   **Documentación de API:** La API está documentada y es comprobable a través de **Swagger**.

## Arquitectura del Proyecto

El proyecto sigue los principios de la Arquitectura Limpia (también conocida como Arquitectura Onion), separando el backend del frontend para un desarrollo desacoplado y escalable.

### **Backend (ASP.NET Core)**

La solución está dividida en cuatro proyectos para separar las responsabilidades:

-   `StockPortfolio.Core`: Contiene las entidades de dominio (las clases que representan nuestras tablas como `Stock`, `Comment`, `AppUser`). No depende de nada.
-   `StockPortfolio.Application`: Contiene la lógica de negocio, DTOs (Data Transfer Objects) y las interfaces de los repositorios. Depende de `Core`.
-   `StockPortfolio.Infrastructure`: Contiene las implementaciones concretas de las interfaces, como los repositorios que usan Entity Framework Core y la configuración de la base de datos. Depende de `Application` y `Core`.
-   `StockPortfolio.API`: Es la capa de presentación. Expone los endpoints REST, maneja las peticiones HTTP y la autenticación. Depende de `Application` e `Infrastructure`.

### **Frontend (React)**

Es una **Single Page Application (SPA)** desarrollada en React que consume los servicios expuestos por la Web API. Se encarga exclusivamente de la experiencia de usuario y la presentación de los datos.

## Tech Stack

| Área      | Tecnología                                                               |
| --------- | ------------------------------------------------------------------------ |
| **Backend**   | .NET 8, ASP.NET Core Web API, Entity Framework Core 8                    |
| **Frontend**  | React, JavaScript                                                        |
| **Base de Datos** | SQL Server                                                               |
| **Seguridad** | ASP.NET Core Identity, JWT (JSON Web Tokens)                             |
| **Pruebas API** | Swagger (OpenAPI), Archivo .http                                         |

## Guía de Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### **1. Requisitos Previos**

Asegúrate de tener instaladas las siguientes herramientas:

-   **Git:** Para clonar el repositorio.
-   **[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0):** Kit de desarrollo para el backend.
-   **[Visual Studio 2022](https://visualstudio.microsoft.com/vs/community/):** IDE recomendado para el backend (la edición Community es gratuita).
-   **[SQL Server Express Edition](https://www.microsoft.com/es-es/sql-server/sql-server-downloads):** Motor de base de datos.
-   **[SQL Server Management Studio (SSMS)](https://aka.ms/ssmsfullsetup):** Para gestionar la base de datos.
-   **[Node.js y npm](https://nodejs.org/):** Entorno de ejecución y gestor de paquetes para el frontend (se recomienda la versión LTS).
-   **[Visual Studio Code](https://code.visualstudio.com/):** Editor de código recomendado para el frontend.

### **2. Configuración del Backend**

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Abrir la Solución:**
    Abre el archivo `StockPortfolio.sln` con Visual Studio 2022.

3.  **Configurar la Cadena de Conexión:**
    En el Explorador de Soluciones, abre el archivo `appsettings.json` dentro del proyecto `StockPortfolio.API`. Asegúrate de que la cadena de conexión en `ConnectionStrings` apunte a tu instancia local de SQL Server. Por defecto, intentará conectarse a `(localdb)\mssqllocaldb`.

    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=stockDB;Trusted_Connection=True;TrustServerCertificate=True"
    }
    ```

4.  **Crear la Base de Datos con Migraciones:**
    -   En Visual Studio, ve a `Ver` > `Otras ventanas` > `Consola del Administrador de Paquetes`.
    -   Asegúrate de que el "Proyecto predeterminado" sea `StockPortfolio.Infrastructure`.
    -   Ejecuta el siguiente comando. Esto creará la base de datos `stockDB`, aplicará todas las tablas y poblará los datos iniciales (como el usuario administrador).
    ```powershell
    Update-Database
    ```

5.  **Ejecutar el Backend:**
    Presiona el botón verde de "Play" (o F5) en Visual Studio. Se abrirá una ventana del navegador con la interfaz de Swagger, mostrando todos los endpoints de la API. **Mantén este proceso en ejecución.**

### **3. Configuración del Frontend**

1.  **Abrir una Nueva Terminal:**
    Mantén la terminal del backend en ejecución. Abre una **nueva** terminal o CMD.

2.  **Navegar a la Carpeta del Proyecto:**
    ```bash
    cd ruta/a/tu-repositorio
    ```

3.  **Cambiar a la Rama del Frontend:**
    El código de React se encuentra en una rama separada. Ejecuta:
    ```bash
    git checkout frontend
    ```

4.  **Instalar Dependencias:**
    Descarga todas las librerías necesarias para el proyecto de React.
    ```bash
    npm install
    ```

5.  **Ejecutar el Frontend:**
    Inicia la aplicación de React.
    ```bash
    npm start
    ```
    Se abrirá automáticamente una nueva pestaña en tu navegador en `http://localhost:3000`.

## Uso de la Aplicación

¡Ya tienes el entorno completo funcionando!

-   **Registrar un usuario normal:** Ve a la página de registro y crea una cuenta (ej: `testuser` / `password123`). Serás redirigido al panel de búsqueda.
-   **Iniciar sesión como Administrador:** Cierra sesión y ve a la página de Login. Usa las credenciales creadas por la migración:
    -   **Usuario:** `admin`
    -   **Contraseña:** `password123`
-   Serás redirigido al panel de administración, donde podrás gestionar las acciones del sistema (CRUD).
---


