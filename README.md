# - Bienvenidos al respositorio de Tecla-Do Libre -

# By Brandon R. Contreras & Guilebaldo Munguia

A continuación encontraras una guía con los pasos a seguir para correr nuestro proyecto de manera local:

1. Descarga el repo en tu PC (.zip)
2. Extrae el proyecto de la carpeta .zip
3. Abre la carpeta del proyecto en visual studio
4. En la carpeta "back-end" genera un nuevo archivo ".ENV" e ingresa los siguientes valores:
---------------------------------------------------------------------------------------------
+   HOST = 'localhost'                                                                      
+   PORT = 3000                                                                             
+   urlCategoria = 'https://api.mercadolibre.com/sites/MLM/categories'                      
+   urlProducto = 'https://api.mercadolibre.com/sites/MLM/search?category='                 
+   urlBusqueda = 'https://api.mercadolibre.com/sites/MLM/search?q='                        
+   LISTABLANCA = ['http://localhost:5500','http://127.0.0.1','http://localhost:3000']         
-------------------------------------------------------------------------------------------
6. Con ayuda de la terminal accede a la ruta del backend  ({path}/back-end) y ejecuta el comando "npm i" para descargar todos los módulos necesarios
7. Para correr el back-end ejecuta el comando "npm run dev"
8. Para correr el front-ent, identifica el archivo index.html, presiona click derecho y da click en la Opción "Open with Live Server"
9. Listo! puedes interactuar con nuestra página en http://127.0.0.1:5500/Front/index.html y visualizar la documentación de nuestra API en 'http://localhost:3000/doc'



# Gracias!
