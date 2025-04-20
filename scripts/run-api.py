import subprocess

def start_container():
    container_name = "node-api-turismo"

    try:
        # Iniciar el contenedor si está detenido
        subprocess.run(["docker", "start", container_name], check=True)
        print(f"Contenedor '{container_name}' iniciado correctamente.")
    except subprocess.CalledProcessError:
        print(f"No se pudo iniciar el contenedor '{container_name}'.")

if __name__ == "__main__":
    start_container()
