Proyecto: DemoblazeSerenity
Descripción:
Automatización E2E del flujo de compra en la página Demoblaze usando Serenity BDD, Screenplay, Gradle y Java.

==================================================
1. REQUISITOS PREVIOS
==================================================

Para ejecutar este proyecto se requiere:

- Java 17 o superior
  Motivo: el proyecto usa records, por lo tanto necesita una versión compatible con esta característica.

- Google Chrome instalado

- Conexión a internet
  Se requiere para acceder al sitio:
  https://www.demoblaze.com/

Nota:
El proyecto incluye Gradle Wrapper, por lo tanto no es obligatorio tener Gradle instalado manualmente.

==================================================
2. TECNOLOGÍAS UTILIZADAS
==================================================

- Java 17+
- Gradle Wrapper
- Serenity BDD
- Screenplay Pattern
- Cucumber
- JUnit Platform

==================================================
3. CONFIGURACIÓN DEL PROYECTO
==================================================

El proyecto incluye el wrapper de Gradle.

Archivo de referencia:
gradle/wrapper/gradle-wrapper.properties

Versión configurada:
- Gradle 9.0.0

==================================================
4. PASOS PARA EJECUTAR EL PROYECTO
==================================================

Opción 1: Ejecutar desde IntelliJ IDEA

1. Abrir el proyecto en IntelliJ IDEA.
2. Esperar a que Gradle sincronice todas las dependencias.
3. Verificar que el JDK configurado para el proyecto sea Java 17 o superior.
4. Ubicar el runner del escenario:
   SuccessfullyPurchaseRunner
5. Ejecutar el runner desde IntelliJ.

Opción 2: Ejecutar desde línea de comandos en Windows

1. Abrir una terminal en la raíz del proyecto.
2. Ejecutar el siguiente comando:

   gradlew.bat clean test aggregate

==================================================
5. REPORTES
==================================================

Una vez finalizada la ejecución, Serenity genera el reporte de resultados.

- target/site/serenity/

Revisar la carpeta generada después de la ejecución para validar:
- resultado del escenario
- evidencias
- detalle de pasos ejecutados

==================================================
6. CONSIDERACIONES
==================================================

- Validar que el navegador Chrome esté instalado correctamente.
- Validar que la versión de Java sea 17 o superior.
- No cerrar manualmente el navegador durante la ejecución.
- Si Gradle no descarga dependencias al primer intento, volver a ejecutar el comando.
- Si se ejecuta desde IntelliJ, confirmar que el proyecto use el JDK correcto.