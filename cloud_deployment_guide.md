# Guía Completa de Despliegue en la Nube (Frontend + Backend)

¡Hola! Como experto *senior* en desarrollo fullstack, me alegra poder guiarte en este proceso. He revisado la estructura de tu proyecto en la carpeta `AA1` y he notado un detalle técnico muy importante antes de comenzar:

> [!WARNING]
> **Aclaración sobre tu Stack Tecnológico y Supabase**
>
> Tu backend actual está construido usando **Node.js, Express y Mongoose**. Mongoose es un ORM para **MongoDB** (una base de datos *NoSQL* o basada en documentos). 
> 
> Sin embargo, **Supabase** es principalmente una plataforma con una base de datos **PostgreSQL** (base de datos relacional *SQL*). Si mantienes tu código actual usando `mongoose`, **no podrás conectarlo a Supabase directamente**.

Para desplegar tu aplicación a la nube, tienes **dos caminos o estrategias principales**. Te explicaré ambas paso a paso para que elijas la que mejor se adapte a tus necesidades.

---

## Estrategia 1: El camino recomendado (Mantener tu código actual)

Ya que tienes el backend construido con MongoDB, mi recomendación como experto es **desplegar utilizando el ecosistema nativo de estas tecnologías**, lo cual te tomará muy poco tiempo y no requiere que reescribas tu código.

Usaremos tres servicios en la nube gratuitos:
1. **Frontend (React/Vite)** $\rightarrow$ **Vercel**
2. **Backend (Node/Express)** $\rightarrow$ **Render**
3. **Base de Datos (MongoDB)** $\rightarrow$ **MongoDB Atlas**

### Paso 1: Configurar la Base de Datos en MongoDB Atlas
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta gratuita.
2. Crea un nuevo **Cluster** (elige la capa gratuita M0).
3. En la pestaña **Database Access**, crea un usuario de base de datos y guarda muy bien la contraseña.
4. En **Network Access**, permite el acceso desde cualquier lugar añadiendo la IP `0.0.0.0/0` (esto es necesario para que el backend en la nube pueda conectarse).
5. Ve a "Databases", haz clic en **Connect** $\rightarrow$ **Connect your application** y copia tu URL de conexión (`mongodb+srv://...`).

### Paso 2: Preparar y Desplegar el Backend en Render
1. Sube tu carpeta `backend` o el proyecto entero a un repositorio en **GitHub**.
2. Ve a [Render.com](https://render.com/) y crea una cuenta.
3. Haz clic en **New** $\rightarrow$ **Web Service** y conecta tu cuenta de GitHub.
4. Selecciona tu repositorio. En la configuración, asegúrate de poner:
   - **Root Directory:** `backend` (o déjalo vacío si el repo solo tiene el backend).
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Configuración de Variables de Entorno (Environment Variables):**
   - Aquí debes agregar tu variable `PORT` (por ejemplo, `4000`).
   - Y tu variable de conexión a MongoDB (según tu `.env`, seguramente sea `MONGO_URI` o `DB_CONNECTION`). Pega aquí la URL que obtuviste en Atlas.
6. Haz clic en **Create Web Service**. ¡Espera unos minutos y Render te dará una URL en vivo (ej: `https://mi-api-peliculas.onrender.com`)!

### Paso 3: Adaptar y Desplegar el Frontend en Vercel
1. En tu código de React (`frontend`), **todas las peticiones** (fetch o axios) que apuntan a `http://localhost:4000/api/...` **deben actualizarse** para apuntar a la nueva URL que te dio Render. 
   - *Tip Pro:* Es mejor usar variables de entorno (ej: `VITE_API_URL`) para esto en lugar de quemar la URL en el código.
2. Sube estos cambios a tu repositorio en GitHub.
3. Ve a [Vercel](https://vercel.com/) y crea una cuenta gratuita.
4. Haz clic en **Add New...** $\rightarrow$ **Project** e importa tu repositorio de GitHub.
5. Vercel detectará automáticamente que usas **Vite**. Asegúrate de que el **Root Directory** sea `frontend`.
6. Haz clic en **Deploy**. 

¡Felicidades! Tienes tu aplicación fullstack completamente en vivo en la nube.

---

## Estrategia 2: Migrar a Supabase (El camino de la refactorización)

Si es un **requisito estricto** de tu proyecto (por ejemplo, de la universidad) utilizar **Supabase**, entonces debemos cambiar tu base de datos de MongoDB a PostgreSQL y reestructurar tu backend. 

> [!CAUTION]
> Esto requerirá programar y reescribir la lógica de tu carpeta `backend/controllers` y `backend/db`.

### Paso 1: Configurar Supabase
1. Ve a [Supabase](https://supabase.com/) e inicia sesión.
2. Crea un **Nuevo Proyecto**. Este proyecto vendrá con una base de datos PostgreSQL.
3. En el panel de Supabase (menú izquierdo), ve a **SQL Editor** y crea tus tablas usando SQL puro para tus entidades (directores, géneros, productoras, tipos, media). *Ya no existirán las "colecciones" de MongoDB, sino que trabajarás con Tablas relacionales.*

### Paso 2: Reescribir el Backend (Express)
En el backend, debemos deshacernos de Mongoose y conectar el cliente oficial de Supabase.

1. Abre la terminal en `AA1/backend` y desinstala mongoose, luego instala el cliente de Supabase:
   ```bash
   npm uninstall mongoose
   npm install @supabase/supabase-js
   ```

2. Toma las credenciales desde tu panel de configuración de Supabase (**Project Settings $\rightarrow$ API**), necesitarás el `Project URL` y la `anon public key`. Colócalos en tu archivo `.env`.

3. Reemplaza tu archivo de conexión `db-connection-mongo.js` por uno para Supabase:
   ```javascript
   // backend/db/db-supabase.js
   const { createClient } = require('@supabase/supabase-js');
   require('dotenv').config();

   const supabaseUrl = process.env.SUPABASE_URL;
   const supabaseKey = process.env.SUPABASE_KEY;
   
   const supabase = createClient(supabaseUrl, supabaseKey);
   module.exports = { supabase };
   ```

4. **Reescribir los Controladores:** Tendrás que ir a cada uno de tus controladores y cambiar las funciones de Mongoose por funciones de Supabase.
   - *Antes (MongoDB):* `const directores = await Director.find();`
   - *Después (Supabase):* `const { data: directores } = await supabase.from('directores').select('*');`

### Paso 3: Desplegar
Una vez refactorizado tu código y probado localmente, el despliegue es idéntico a la **Estrategia 1**:
- Tu base de datos ya está en la nube (la aloja Supabase).
- Alojas tu backend (Express) en **Render**.
- Alojas tu frontend (Vite) en **Vercel**.

---

### Resumen y Recomendación Final

Si tu objetivo es ver la aplicación funcionando rápidamente, te recomiendo enfáticamente optar por la **Estrategia 1**. Las plataformas Mongo, Render y Vercel son los estándares dorados para tu arquitectura actual (MERN Stack pero usando PostgreSQL/Mongo indistintamente en abstracción). 

¿Qué camino te gustaría tomar? Dime si decides irte por el camino actual con Render/Mongo o si prefieres que te ayude a reescribir partes del código para forzar la integración con Supabase. ¡Estoy aquí para ayudarte a codificar cualquiera que elijas!
