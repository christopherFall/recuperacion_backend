# Backend - Gestión de INSTRUCTORES SENA

Este proyecto implementa el backend del sistema de gestión de instructores SENA usando **AdonisJS 6**, con validaciones, relaciones y horario de clases dinámico por día.

## 🚀 Requisitos

- Node.js 18+
- MariaDB (o MySQL)
- Editor de código (VS Code recomendado)

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/recuperacion-backend.git
cd recuperacion-backend
npm install
cp .env.example .env
⚙️ Configura .env
Ajusta los datos de conexión a tu base de datos:

ini
Copiar
Editar
DB_CONNECTION = mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PASSWORD=tu_clave
DB_DATABASE=
🔧 Migraciones y seeders
bash
Copiar
Editar
node ace migration:run
node ace db:seed
Usa node ace migration:fresh --seed si quieres reiniciar todo.

🧪 Iniciar servidor de desarrollo
bash
Copiar
Editar
node ace serve --watch
Accede en: http://localhost:3333

🧑‍💻 Endpoints de referencia basados en especialistas
GET /especialistas → listar activos

POST /especialistas → crear

PATCH /especialistas/:id → actualizar

DELETE /especialistas/:id → soft delete

POST /especialistas/:id/restaurar → restaurar

GET /especialistas/inactivos → listar inactivos

POST /disponibilidades / DELETE /disponibilidades/:id

👨‍🎓 Autor
Christopher David Ramírez Pérez
SENA - Evaluación Técnica Fullstack Junior
TEMA: Instructores SENA
BASE DE REFERENCIA: Especialistas
