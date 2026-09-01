Tabla o entidad: plural y nombre culebra  ejemplo users, order_items

Model: es una instancia de la entidad es en singular, se inicia en mayùscula y pascal case ejemplo User OrderItem

Comtroladora: modeloController, Pascal case  ejemplo UserContoller, OrderItemControlle

Load  a file
https://programmingfields.com/file-upload-in-react-js-using-laravel-8-restful-api/

Publicar app
 
1. 🧹 Prepara tu aplicación local
Ejecuta npm run build para compilar los assets de React/Inertia.

Asegúrate de que .env tenga configuraciones para producción (por ejemplo, APP_ENV=production, APP_DEBUG=false).

Borra archivos innecesarios y limpia el proyecto.

2. 📦 Empaqueta tu proyecto
Comprime todo el proyecto en un .zip, excepto:

node_modules

vendor (puedes excluirlo si lo vas a instalar en el servidor)

3. 📁 Sube los archivos a tu hosting
Entra a tu cPanel y abre Administrador de archivos.

Ve a la carpeta public_html o crea una subcarpeta si quieres que esté en un subdominio.

Sube el .zip y extrae los archivos.

4. 🛠 Ajusta la estructura
Laravel espera que el contenido de la carpeta public sea el punto de entrada. En cPanel, public_html es ese punto. Así que:

Mueve el contenido de public/ a public_html/.

El resto del proyecto (app, routes, etc.) debe estar fuera de public_html, por seguridad. Puedes crear una carpeta arriba de public_html y mover todo ahí.

Luego, ajusta los paths en index.php dentro de public_html para que apunten correctamente a ../vendor/autoload.php y ../bootstrap/app.php.

5. ⚙️ Configura .env
Edita tu archivo .env con los datos del servidor:

env
APP_URL=https://tudominio.com
DB_HOST=localhost
DB_DATABASE=nombre_base_de_datos
DB_USERNAME=usuario
DB_PASSWORD=contraseña
6. 🧱 Instala dependencias
Usa Terminal de cPanel o SSH si está disponible.

Ejecuta:

bash
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
7. 🛡 Permisos
Asegúrate de que las carpetas storage/ y bootstrap/cache/ tengan permisos de escritura (755 o 775).

8. 🌐 Verifica que el dominio apunte correctamente
Si usas un subdominio o dominio personalizado, asegúrate de que esté apuntando a la carpeta correcta en cPanel.


1. 📁 Crea el subdirectorio
En Administrador de archivos de cPanel, ve a public_html.

Crea una carpeta llamada nc.

2. 📦 Sube tu proyecto
Sube tu proyecto Laravel (sin node_modules ni vendor) a una carpeta fuera de public_html, por ejemplo: laravel_nc.

Dentro de public_html/nc, copia solo el contenido de la carpeta public de Laravel.

3. 🛠 Ajusta index.php
Abre public_html/nc/index.php y modifica las rutas para que apunten al proyecto Laravel que está fuera de public_html. Ejemplo:

php
require __DIR__.'/../../laravel_nc/vendor/autoload.php';
$app = require_once __DIR__.'/../../laravel_nc/bootstrap/app.php';
Asegúrate de que las rutas reflejen correctamente la ubicación real de tu proyecto.

4. ⚙️ Configura .env
En la carpeta laravel_nc, edita .env:

env
APP_URL=https://tudominio.com/nc
5. 🧱 Instala dependencias
Usa la terminal de cPanel o SSH:

bash
cd ~/laravel_nc
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
6. 🧹 Compila los assets
En tu máquina local, ejecuta:

bash
npm run build
Sube el contenido de public/build a public_html/nc/build.

7. 🛡 Permisos
Asegúrate de que storage/ y bootstrap/cache/ tengan permisos de escritura (755 o 775).


email:  https://www.youtube.com/watch?v=_UTfxQFYih0
