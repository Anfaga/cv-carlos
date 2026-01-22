# 🚀 INICIO RÁPIDO - 5 MINUTOS

## ✅ PASO 1: Descargar el Proyecto

Ya tienes la carpeta `cv-carlos` descargada.

## ✅ PASO 2: Abrir en RStudio

1. **Haz doble click** en el archivo `cv-carlos.Rproj`
2. Esto abrirá RStudio con el proyecto cargado

## ✅ PASO 3: Instalar Dependencias de R (SOLO LA PRIMERA VEZ)

En la consola de R en RStudio, ejecuta:

```r
# Instalar paquetes necesarios
install.packages(c("yaml", "htmltools"))
```

## ✅ PASO 4: Ver tu CV en el Navegador

**Opción A - Desde RStudio (RECOMENDADO):**

1. Abre el archivo `index.qmd` en RStudio
2. Busca el botón **"Render"** en la parte superior del editor (o presiona `Ctrl+Shift+K`)
3. Tu CV se abrirá automáticamente en el navegador

**Opción B - Desde la Terminal de RStudio:**

En la terminal (pestaña "Terminal" en RStudio), ejecuta:

```bash
quarto preview
```

**Opción C - Usando el script (Windows):**

Haz doble click en `inicio-rapido.bat` y selecciona opción 1.

## ✅ PASO 5: Editar tu Información

**TODO se edita en el archivo `cv-data.yml`**

1. Abre `cv-data.yml` en RStudio
2. Edita cualquier sección (nombre, experiencia, skills, etc.)
3. **Guarda el archivo** (Ctrl+S)
4. Si tienes el preview activo, ¡verás los cambios inmediatamente!

### Ejemplo de Edición:

```yaml
# Cambiar tu email
personal:
  email: "tu-nuevo-email@gmail.com"

# Agregar un nuevo skill
skills:
  - "Tu nuevo skill aquí"
  - "Blockchain"
  - "Cloud Computing"

# Agregar nueva experiencia
experiencia:
  - cargo: "Mi Nuevo Cargo"
    empresa: "Mi Nueva Empresa"
    fecha: "Ene 2026 - Actualidad"
    color: "#1976D2"
```

## 📸 PASO 6: Cambiar tu Foto de Perfil

1. Coloca tu foto en la carpeta `images/`
2. Renómbrala como `carlos-profile.jpg` (o actualiza el nombre en `cv-data.yml`)

## 📄 PASO 7: Generar PDF

**Desde RStudio:**

1. Ve al menú: `File` → `Render`
2. Selecciona formato: `PDF`

**Desde la Terminal:**

```bash
quarto render --to pdf
```

**Nota:** Para PDF necesitas tener instalado:
- Chrome/Chromium (más fácil) O
- LaTeX/TinyTeX

Si no tienes ninguno, instala Chrome o ejecuta en R:

```r
quarto::quarto_install_tinytex()
```

## 🌐 PASO 8: Publicar en Internet (GitHub Pages)

### Opción Fácil (GitHub Desktop):

1. **Crea un repo en GitHub**
   - Ve a github.com
   - Click en "New repository"
   - Nombre: `cv-carlos` o `tu-usuario.github.io`

2. **Sube los archivos**
   - Usa GitHub Desktop
   - Arrastra la carpeta `cv-carlos`
   - Commit y Push

3. **Activa GitHub Pages**
   - En GitHub, ve a Settings → Pages
   - Source: Branch `main`, carpeta `/docs`
   - Save

¡Listo! Tu CV estará en: `https://tu-usuario.github.io/cv-carlos/`

### Opción Terminal (Git):

```bash
cd cv-carlos
git init
git add .
git commit -m "Mi CV inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cv-carlos.git
git push -u origin main
```

Luego activa Pages como arriba.

## 🎨 PERSONALIZACIÓN RÁPIDA

### Cambiar Colores:

Edita `custom.scss`:

```scss
$primary: #YOUR_COLOR;    // Color principal (ahora naranja #FF9800)
$secondary: #YOUR_COLOR;  // Color secundario (ahora cyan #00BCD4)
```

### Agregar Secciones:

Edita `index.qmd` y agrega HTML/Markdown donde quieras.

## ⚡ TIPS PRO

- **Preview en vivo**: `quarto preview` actualiza automáticamente al guardar
- **Solo datos**: Nunca toques `index.qmd` si solo cambias info personal
- **Versionado**: Usa Git para hacer backup de tu CV
- **Múltiples versiones**: Copia `cv-data.yml` → `cv-data-ingles.yml`, etc.

## 🆘 PROBLEMAS COMUNES

**Error: "yaml package not found"**
```r
install.packages("yaml")
```

**Error: "quarto not found"**
- Asegúrate de tener Quarto instalado: https://quarto.org/

**La foto no se ve**
- Verifica que la ruta sea correcta en `cv-data.yml`
- La foto debe estar en la carpeta `images/`

**El PDF no se genera**
- Instala TinyTeX: `quarto::quarto_install_tinytex()`
- O instala Chrome/Chromium

## 📞 SIGUIENTE PASO

**¿Ya viste tu CV?**

1. Abre `cv-carlos.Rproj`
2. Click en "Render" en RStudio
3. ¡Disfruta tu nuevo CV! 🎉

**¿Quieres mejorar el diseño?**

- Pídeme que agreguemos gráficos interactivos
- Pídeme que agreguemos un mapa de países
- Pídeme que agreguemos animaciones

---

**¡Tu CV profesional está a un click de distancia!**

Cualquier duda, vuelve a preguntar. 😊
