# miveciapi

Api para la red social miveciapi

# Para ejecutarlo
1. Instalar todas las dependencias
    ```bash
    # with npm
    npm install
2. Open phpMyAdmin/ administrador de mysql, crear base de datos e importar la base de datos desde `db.sql`
3. Crear un `.env` y revisar el .env.example de referencia

  ```javascript
  NODE_ENV="development|test|production"
  API_PORT=YOUR_PORT
  JWT_SECRET="secret"
  MYSQL_HOST="host"
  MYSQL_USER="user"
  MYSQL_PASSWORD="password"
  MYSQL_DB="db"
  MYSQL_PORT="port mysql"
  MYSQL_TIMEOUT="timeout mysql"
  ```
5. Arrancar el servideo
  ```javascript
    npm run dev
   ```
5.  Ahora correr la aplicación
