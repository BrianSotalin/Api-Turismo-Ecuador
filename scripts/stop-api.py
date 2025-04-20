import subprocess

def stop_container():
    container_name = "node-api-turismo"
    try:
        subprocess.run(["docker", "stop", container_name], check=True)
        print(f"Contenedor '{container_name}' detenido correctamente.")
    except subprocess.CalledProcessError:
        print(f"No se pudo detener el contenedor '{container_name}'.")
        
if __name__ == "__main__":
    stop_container()
