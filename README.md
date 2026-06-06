# Innovatech Chile - Tienda de Alimentos para Perritos 🐶

Este proyecto consiste en una aplicación web empresarial totalmente contenedorizada utilizando una arquitectura de microservicios con **Docker** y **Docker Compose**. El ciclo de vida del software está automatizado mediante un pipeline de **CI/CD con GitHub Actions** y diseñado para su despliegue en la nube de **Amazon Web Services (AWS)** utilizando instancias **EC2** y **Amazon ECR**.

## 🏗️ Arquitectura del Sistema
El ecosistema se compone de tres capas desacopladas que interactúan de forma interna:
1. **Frontend**: Interfaz gráfica de usuario construida con HTML5, CSS3 y JavaScript nativo, montada sobre un servidor web **Nginx**.
2. **Backend**: API REST desarrollada en **Node.js** con **Express**, encargada de resolver el CRUD completo de productos (Listar, Agregar, Editar, Eliminar).
3. **Base de Datos**: Motor relacional **MySQL 8.0** encargado del almacenamiento persistente de los datos de inventario.

## 🔌 Asignación de Puertos y Servicios
* **Frontend**: Puerto `80` (Accesible localmente en `http://localhost`).
* **Backend**: Puerto `3001` (Endpoints disponibles bajo la ruta `/api/productos`).
* **Base de Datos**: Puerto interno `3306` (Mapeado externamente al puerto `3307` para desarrollo local).

## 🚀 Guía de Levantamiento en Entorno Local
Para clonar y levantar el ecosistema completo en segundos, asegúrese de tener Docker Desktop en ejecución y ejecute la siguiente secuencia de comandos en su terminal:

```bash
# 1. Descargar imágenes, construir y levantar el stack en segundo plano
docker-compose up --build -d

# 2. Verificar el estado correcto y salud de los 3 contenedores
docker-compose ps

# 3. Monitorear logs del sistema en tiempo real
docker-compose logs -f

# 4. Apagar los servicios y liberar memoria del sistema
docker-compose down
