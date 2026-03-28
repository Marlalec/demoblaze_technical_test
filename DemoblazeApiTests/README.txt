Proyecto: DemoblazeApiTests
Descripción:
Automatización de pruebas API para los servicios Signup y Login de la plataforma Demoblaze usando Karate, Gradle y Java.

==================================================
1. REQUISITOS PREVIOS
==================================================

Para ejecutar este proyecto se requiere:

- Java 17 o superior
  Motivo: el proyecto está configurado para ejecutarse sobre una versión compatible con Gradle y las dependencias de prueba.

- Conexión a internet
  Se requiere para consumir los servicios:
  https://api.demoblaze.com/signup
  https://api.demoblaze.com/login

- IntelliJ IDEA o un IDE con soporte para Gradle
  Recomendado para ejecutar el runner del proyecto de forma directa.

Nota:
El proyecto incluye Gradle Wrapper, por lo tanto no es obligatorio tener Gradle instalado manualmente.

==================================================
2. TECNOLOGÍAS UTILIZADAS
==================================================

- Java 17+
- Gradle Wrapper
- Karate Framework
- JUnit
- Cucumber Report

==================================================
3. CONFIGURACIÓN DEL PROYECTO
==================================================

El proyecto incluye el wrapper de Gradle.

Archivos de referencia:
- gradlew
- gradlew.bat
- gradle/wrapper/gradle-wrapper.properties

La ejecución del proyecto se realiza desde el runner:

- src/test/java/karate/RunnerTest

Los escenarios automatizados se encuentran en:

- src/test/resources/karate/validate_signup.feature
- src/test/resources/karate/validate_login.feature

Los archivos de soporte utilizados durante la ejecución son:

- src/test/resources/karate-config.js
- src/test/resources/request/test-data.json

==================================================
4. PASOS PARA EJECUTAR EL PROYECTO
==================================================

Opción 1: Ejecutar desde IntelliJ IDEA

1. Abrir el proyecto en IntelliJ IDEA.
2. Esperar a que Gradle sincronice todas las dependencias.
3. Verificar que el JDK configurado para el proyecto sea Java 17 o superior.
4. Ubicar el runner del proyecto:
   RunnerTest
5. Ejecutar el runner desde IntelliJ como prueba.

==================================================
5. REPORTES
==================================================

El proyecto cuenta con evidencias de ejecuciones previas almacenadas en la carpeta:

- evidences/

Archivos disponibles:
- Cucumber Report.pdf
- Karate Report.pdf

Una vez finalizada la ejecución, La prueba genera el reporte de resultados. 

- target/cucumber-html-reports/
- target/karate-reports/