# ==========================================
# Multi-stage Build — Frontend Estático
# Etapa 1: builder  |  Etapa 2: producción
# ==========================================

# --- ETAPA 1: builder ---
# Usa node:alpine para preparar y aislar los assets estáticos.
# Separar esta etapa garantiza que herramientas de Node nunca
# lleguen a la imagen final de producción.
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar todos los archivos fuente del frontend
COPY index.html app.js ./

# Aquí se puede agregar: npm run build, minificación, lint, etc.
# Por ahora los archivos estáticos se entregan tal cual.

# --- ETAPA 2: producción ---
# La imagen final solo contiene Nginx y los assets copiados
# desde el stage builder. Sin Node, sin npm, sin código fuente.
FROM nginx:alpine AS production

# Copiar únicamente los assets preparados en la etapa anterior
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/app.js     /usr/share/nginx/html/

# Configuración personalizada del proxy inverso
COPY default.conf /etc/nginx/conf.d/default.conf

# Mínimo privilegio: Nginx corre como usuario 'nginx', no como root
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx \
        /var/run/nginx.pid \
        /var/cache/nginx \
        /var/log/nginx \
        /etc/nginx/conf.d

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]