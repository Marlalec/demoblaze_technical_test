Proyecto: PerformanceTest
Descripción:
Prueba de carga sobre el servicio de login utilizando K6, validando throughput, tiempo de respuesta y tasa de error mediante datos parametrizados desde archivo CSV.

==================================================
1. REQUISITOS PREVIOS
==================================================

Para ejecutar este proyecto se requiere:

- K6 versión v1.6.1
- Conexión a internet
  Se requiere para consumir el servicio:
  https://fakestoreapi.com/auth/login

- Sistema operativo Windows, Linux o MacOS

- IntelliJ IDEA o un editor de código (opcional)
  Recomendado para visualizar y modificar el script de prueba.

==================================================
2. TECNOLOGÍAS UTILIZADAS
==================================================

- K6
- JavaScript
- CSV

==================================================
3. CONFIGURACIÓN DEL PROYECTO
==================================================

El proyecto contiene la siguiente estructura:

PerformanceTest/
│
├── data/
│   └── users.csv
├── scripts/
│   └── LoginTest.js
├── results/
│
├── README.txt
└── conclusiones.txt

El script principal se encuentra en:

scripts/LoginTest.js

El archivo de datos utilizado es:

data/users.csv

==================================================
4. PASOS PARA EJECUTAR EL PROYECTO
==================================================

Opción 1: Ejecutar desde línea de comandos

1. Abrir una terminal CMD o PowerShell.
2. Ubicarse en la raíz del proyecto:
3. Ejecutar el siguiente comando:

   k6 run scripts/LoginTest.js

--------------------------------------------------

Opción 2: Ejecutar con generación de resultados

1. Abrir una terminal en la raíz del proyecto.
2. Ejecutar el siguiente comando:

   k6 run --out csv=results/results.csv scripts/LoginTest.js

--------------------------------------------------

Opción 3: Si se desea generar un reporte HTML más visual al finalizar la prueba, se debe ejecutar el proyecto con las variables de entorno correspondientes.

Ejemplo en CMD:

  set K6_WEB_DASHBOARD=true
  set K6_WEB_DASHBOARD_EXPORT=results\html-report.html
  k6 run scripts/LoginTest.js

Ejemplo en PowerShell:

  $env:K6_WEB_DASHBOARD="true"
  $env:K6_WEB_DASHBOARD_EXPORT="results\html-report.html"
  k6 run scripts/LoginTest.js

Archivo generado:

  - results/html-report.html

==================================================
5. REPORTES
==================================================

El proyecto genera resultados en la carpeta:

results/

Archivos disponibles:

- results/results.csv
- results/summary.json
- results/html-report.html

Una vez finalizada la ejecución, se pueden revisar los resultados generados para validar el comportamiento de la prueba.