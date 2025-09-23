# Wallbit Frontend Challenge

Este repositorio contiene mi solución al challenge de frontend de Wallbit, propuesto por [Goncy](https://github.com/goncy).

<a style='font-size: 16px;font-weight:bold' href="https://wallbit-challenge-delta.vercel.app/" target="_blank" rel="noopener noreferrer">✨ Demo ✨</a>

## Screenshot

![Captura de pantalla de la aplicación](/static/screenshoot.png)

## Requisitos

La API que nos dió nuestro cliente es: [Fake Store API](https://fakestoreapi.com/). El cliente nos dijo que su stack de frontend es React, que prefiere el challenge hecho con eso, pero está abierto a cualquier stack que quieras usar.

- [x] Podemos agregar productos al carrito.
- [x] Manejar errores que nos devuelva la API.
- [x] Mostrar una lista con los productos agregados incluyendo `title`, `price` e `image` del producto y la `cantidad` que el usuario agregó.

## Extras

- [x] El carrito se persiste al recargar la página.
- [x] Mostrar el total de productos agregados.
- [x] Mostrar el costo total del carrito.
- [x] Mostrar la fecha de creación del carrito.

## Enfoque y Decisiones Clave

Aproveché este challenge como una oportunidad para aprender **SvelteKit**, saliendo de mi zona de confort en React. Durante el desarrollo, tomé las siguientes decisiones:

- **Arquitectura de Componentes:** Busqué un equilibrio en la componentización. Creé componentes reutilizables de UI como `Button`, `Input` y `Card`. A a la vez dividí la página en componentes más pequeños por organización.

- **Feedback al Usuario:** Para mejorar la experiencia, implementé notificaciones (toasts) que dan feedback visual al agregar o eliminar productos. Para gestionarlas, **creé un `writable store` de Svelte**, lo que me permitió manejar su estado de forma global sin necesidad de librerías externas.

- **Diseño y Jerarquía Visual:** Utilicé una combinación de dos fuentes para organizar la información: **`Outfit`** para los títulos de sección y **`Plus Jakarta Sans`** para el resto de la interfaz, priorizando la legibilidad.

## Stack y Herramientas

- **Framework:** SvelteKit
- **Lenguajes:** TypeScript, HTML, CSS

## Para Correr el Proyecto Localmente

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/nicovio/wallbit-challenge.git
    cd wallbit-challenge
    ```

2.  **Establecer la versión de Node.js:**
    El proyecto incluye un archivo `.nvmrc`. Si tienes [nvm](https://github.com/nvm-sh/nvm) instalado, puedes usarlo con:

    ```bash
    nvm use
    ```

3.  **Instalar dependencias:**
    El gestor de paquetes recomendado es `pnpm`, pero puedes usar el que prefieras.

    ```bash
    pnpm install
    ```

    ```bash
    npm install
    ```

    ```bash
    yarn install
    ```

4.  **Ejecutar el servidor de desarrollo:**

    ```bash
    pnpm dev
    ```

    ```bash
    npm run dev
    ```

    ```bash
    yarn dev
    ```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

## Agradecimientos

- A **[Goncy](https://github.com/goncy)** por su contenido y por difundir este challenge.
