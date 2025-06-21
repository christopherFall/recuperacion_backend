# Backend - Gestión de Instructores SENA

Este proyecto implementa el backend para un sistema de gestión de instructores del SENA. Permite registrar instructores, asignarles áreas, gestionar sus horarios semanales y aplicar soft delete para inactivarlos sin eliminar registros permanentemente.

## 🛠 Tecnologías

- [AdonisJS v6](https://docs.adonisjs.com/)
- TypeScript
- MySQL
- VineJS (validaciones)
- Soft Deletes
- API RESTful

## 🚀 Instalación

1. **Clona el repositorio:**

```bash
git clone <url-del-repo>
cd backend-instructores
Instala las dependencias:

bash
Copiar
Editar
npm install
Configura el entorno:

Copia el archivo .env.example a .env:

bash
Copiar
Editar
cp .env.example .env
Edita las variables necesarias como la conexión a la base de datos:

ini
Copiar
Editar
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=instructores
Ejecuta las migraciones y seeders:

bash
Copiar
Editar
node ace migration:run
node ace db:seed
Puedes usar node ace migration:fresh --seed durante el desarrollo para reiniciar la base de datos.

Inicia el servidor:

bash
Copiar
Editar
npm run dev
Por defecto, el backend estará disponible en:
http://localhost:3333

📁 Estructura del Proyecto
bash
Copiar
Editar
├── app/
│   ├── controllers/     # Controladores HTTP
│   ├── models/          # Modelos ORM (Lucid)
│   └── validators/      # Validaciones con VineJS
├── database/
│   ├── migrations/      # Migraciones SQL
│   ├── seeders/         # Datos de prueba iniciales
│   └── factories/       # (opcional) Factories con datos fake
├── config/              # Configuración general
├── .env                 # Variables de entorno
├── adonisrc.ts          # Config principal de Adonis
└── tsconfig.json        # Config TypeScript
🔑 Funcionalidades principales
CRUD completo de Instructores

Asignación de áreas por instructor

Gestión de horarios semanales con días y horas de inicio/fin

Gestión de áreas (CRUD)

Visualización de instructores inactivos con opción de restaurar o eliminar

Validaciones con VineJS

Soft delete usando deleted_at

📬 Rutas API principales
Método	Endpoint	Descripción
GET	/instructores	Listar instructores paginados
POST	/instructores	Crear instructor
PUT	/instructores/:id	Actualizar instructor
DELETE	/instructores/:id	Inactivar (soft delete) instructor
GET	/areas	Listar áreas
POST	/areas	Crear área
PUT	/areas/:id	Actualizar área
DELETE	/areas/:id	Eliminar área

👤 Autor
Desarrollado por: Los Básicos
Contacto: [Tu correo o GitHub]

👨‍🎓 Autor
Christopher(Cristian) David Ramírez Pérez
SENA - Evaluación Técnica Fullstack Junior
TEMA: Instructores SENA
BASE DE REFERENCIA: Especialistas
