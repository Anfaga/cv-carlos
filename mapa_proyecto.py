from pathlib import Path
from typing import List, Set
 
def generar_arbol_directorios(
    ruta_inicial: str = ".",
    mostrar_archivos: bool = False,
    ignorar: Set[str] = None,
    max_profundidad: int = None
) -> str:
    """
    Genera un mapa visual de la estructura de directorios.
   
    Args:
        ruta_inicial: Ruta del directorio a mapear (por defecto el actual)
        mostrar_archivos: Si True, muestra también los archivos
        ignorar: Set de nombres de carpetas/archivos a ignorar
        max_profundidad: Profundidad máxima a explorar (None = sin límite)
   
    Returns:
        String con la representación visual del árbol
    """
    if ignorar is None:
        ignorar = {'.git', '__pycache__', 'node_modules', '.venv', 'venv', '.idea', '.vscode'}
   
    ruta = Path(ruta_inicial).resolve()
    lineas = [f"{ruta.name}/"]
   
    def _agregar_contenido(directorio: Path, prefijo: str = "", profundidad: int = 0):
        """Función recursiva para agregar contenido al árbol."""
        if max_profundidad is not None and profundidad >= max_profundidad:
            return
       
        try:
            # Obtener contenido del directorio
            contenido = sorted(directorio.iterdir(), key=lambda x: (not x.is_dir(), x.name.lower()))
           
            # Filtrar elementos ignorados
            contenido = [item for item in contenido if item.name not in ignorar]
           
            # Si no queremos archivos, filtrar solo directorios
            if not mostrar_archivos:
                contenido = [item for item in contenido if item.is_dir()]
           
            for idx, item in enumerate(contenido):
                es_ultimo = idx == len(contenido) - 1
               
                # Determinar los caracteres a usar
                if es_ultimo:
                    marcador = "└── "
                    extension = "    "
                else:
                    marcador = "├── "
                    extension = "│   "
               
                # Agregar la línea
                if item.is_dir():
                    lineas.append(f"{prefijo}{marcador}{item.name}/")
                    # Llamada recursiva para subdirectorios
                    _agregar_contenido(item, prefijo + extension, profundidad + 1)
                else:
                    lineas.append(f"{prefijo}{marcador}{item.name}")
       
        except PermissionError:
            lineas.append(f"{prefijo}[Permiso denegado]")
   
    _agregar_contenido(ruta)
    return "\n".join(lineas)
 
 
def guardar_mapa(ruta_salida: str = "estructura_proyecto.txt", **kwargs):
    """
    Genera y guarda el mapa del proyecto en un archivo.
   
    Args:
        ruta_salida: Nombre del archivo donde guardar el mapa
        **kwargs: Argumentos para generar_arbol_directorios()
    """
    mapa = generar_arbol_directorios(**kwargs)
   
    with open(ruta_salida, 'w', encoding='utf-8') as f:
        f.write(mapa)
   
    print(f"✓ Mapa guardado en: {ruta_salida}")
    return mapa
 
 
# ============== EJEMPLOS DE USO ==============
 
if __name__ == "__main__":
   
    # Ejemplo 1: Solo directorios (más limpio)
    print("=" * 60)
    print("ESTRUCTURA DEL PROYECTO (solo directorios)")
    print("=" * 60)
    mapa1 = generar_arbol_directorios(
        ruta_inicial=".",
        mostrar_archivos=False
    )
    print(mapa1)
   
    # Ejemplo 2: Con archivos
    print("\n" + "=" * 60)
    print("ESTRUCTURA COMPLETA (directorios y archivos)")
    print("=" * 60)
    mapa2 = generar_arbol_directorios(
        ruta_inicial=".",
        mostrar_archivos=True,
        max_profundidad=4  # Limitar profundidad para que no sea muy largo
    )
    print(mapa2)
   
    # Ejemplo 3: Guardar en archivo
    print("\n" + "=" * 60)
    print("GUARDANDO EN ARCHIVO...")
    print("=" * 60)
    guardar_mapa(
        ruta_salida="mapa_proyecto.txt",
        ruta_inicial=".",
        mostrar_archivos=False
    )
   
    # Ejemplo 4: Personalizado con carpetas específicas a ignorar
    print("\n" + "=" * 60)
    print("ESTRUCTURA PERSONALIZADA")
    print("=" * 60)
    mapa3 = generar_arbol_directorios(
        ruta_inicial=".",
        mostrar_archivos=False,
        ignorar={'.git', '__pycache__', 'tests', 'docs'}  # Ignorar carpetas específicas
    )
    print(mapa3)