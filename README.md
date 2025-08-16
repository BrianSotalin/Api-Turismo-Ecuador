# 🚀 Despliegue de API Node.js con Docker en AWS EC2 + GitHub Actions + Nginx + S3

Este proyecto muestra cómo desplegar una **API en Node.js** dentro de un contenedor **Docker** en **EC2** usando **GitHub Actions** para CI/CD. Además, se configura **Nginx como reverse proxy** para redirigir las rutas de la API y conectar la aplicación con una página estática alojada en **Amazon S3**.

---

## 📦 Arquitectura del Proyecto

- **API en Node.js** → Desplegada en un contenedor Docker en **EC2**  
- **Nginx** → Reverse proxy para enrutar tráfico hacia la API  
- **S3** → Bucket con página estática (landing / frontend)  
- **GitHub Actions** → Automatización de build, push y despliegue en EC2  


Usuario ──> Nginx (EC2) ──> API Node.js (Docker)
         │
         └──> Página estática (S3)

## ⚙️ Tecnologías
	•	Node.js → Backend API
	•	Docker → Contenerización de la aplicación
	•	Nginx → Reverse proxy
	•	Amazon EC2 → Servidor de despliegue
	•	Amazon S3 → Hosting de archivos estáticos
	•	GitHub Actions → CI/CD automatizado

⸻

## 🚀 Pasos de Despliegue

1️⃣ Configuración del proyecto
	•	Crear la API en Node.js
	•	Añadir un Dockerfile
	•	Añadir un docker-compose.yml (opcional si usas más servicios)

2️⃣ Configuración de EC2
	•	Crear una instancia EC2 (Ubuntu recomendado)
	•	Instalar Docker y Docker Compose
	•	Instalar Nginx

3️⃣ Configuración de Nginx

Archivo de ejemplo en /etc/nginx/sites-available/default:
server {
    listen 80;

    server_name tu-dominio.com;

    location /api/ {
        proxy_pass http://localhost:3000/;  # Puerto de tu contenedor Node
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass https://tu-bucket-s3.s3-website-region.amazonaws.com/;
    }
}
4️⃣ Configuración de GitHub Actions

Ejemplo de workflow .github/workflows/deploy.yml
name: Deploy to EC2

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout código
        uses: actions/checkout@v3

      - name: Build imagen Docker
        run: docker build -t mi-api-node .

      - name: Copiar archivos a EC2
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          source: "."
          target: "~/app"

      - name: Desplegar en EC2
        uses: appleboy/ssh-action@v0.1.7
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/app
            docker stop api || true
            docker rm api || true
            docker build -t mi-api-node .
            docker run -d -p 3000:3000 --name api mi-api-node
            sudo systemctl restart nginx
## 🔐 Variables de Entorno

Crear un archivo .env en el proyecto con las credenciales necesarias:
DB_HOST=xxx
DB_USER=xxx
DB_PASSWORD=xxx
DB_NAME=xxx
PORT=3000

En GitHub, configura en Settings > Secrets and variables > Actions:
	•	EC2_HOST → IP pública de la instancia
	•	EC2_SSH_KEY → Clave privada SSH de acceso a EC2

⸻


