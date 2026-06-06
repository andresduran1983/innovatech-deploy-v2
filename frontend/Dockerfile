# Etapa 1: Builder (Entorno temporal para preparar los archivos estáticos)
FROM alpine:latest AS builder
WORKDIR /app
# Copia todos los archivos locales del frontend dentro del contenedor temporal
COPY . .

# Etapa 2: Servidor definitivo de producción
FROM nginx:alpine
# Copia los archivos procesados en la etapa anterior directo a la ruta de Nginx
COPY --from=builder /app /usr/share/nginx/html

# Exponer el puerto estándar HTTP
EXPOSE 80

# Iniciar el servidor web
CMD ["nginx", "-g", "daemon off;"]