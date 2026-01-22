# 🎯 CV Carlos A. Falla G. - Proyecto Quarto

Este es tu CV interactivo construido con Quarto. Puede exportarse a HTML, PDF y más.

## 📁 Estructura del Proyecto

```
cv-carlos/
├── _quarto.yml          # Configuración del proyecto
├── index.qmd            # Archivo principal del CV
├── cv-data.yml          # TODOS tus datos (aquí editas)
├── styles.css           # Estilos CSS personalizados
├── custom.scss          # Tema personalizado
├── images/              # Carpeta para imágenes
│   └── carlos-profile.jpg
└── docs/                # Carpeta de salida (se genera automáticamente)
```

## 🚀 Cómo Usar

### 1️⃣ **Ver el CV en tu navegador (Preview)**

Abre RStudio, abre el proyecto y ejecuta:

```r
quarto::quarto_preview()
```

O desde la terminal:

```bash
cd /ruta/a/cv-carlos
quarto preview
```

Esto abrirá tu navegador con el CV en vivo. ¡Los cambios se actualizan automáticamente!

### 2️⃣ **Generar HTML final**

```bash
quarto render
```

El archivo HTML estará en la carpeta `docs/index.html`

### 3️⃣ **Generar PDF**

Para generar PDF, necesitas agregar esto al `index.qmd`:

```yaml
format:
  html: default
  pdf: 
    documentclass: article
    geometry: margin=0.5in
```

Luego ejecuta:

```bash
quarto render index.qmd --to pdf
```

## ✏️ Cómo Actualizar tu Información

**TODO se edita en el archivo `cv-data.yml`**. No necesitas tocar código.

### Ejemplos:

**Agregar nueva experiencia:**

```yaml
experiencia:
  - cargo: "Nuevo Cargo"
    empresa: "Nueva Empresa"
    fecha: "Ene 2026 - Actualidad"
    color: "#1976D2"
  # ... resto de experiencias
```

**Actualizar skills:**

```yaml
skills:
  - "Tu nuevo skill"
  - "Otro skill"
```

**Cambiar foto de perfil:**

1. Coloca tu foto en la carpeta `images/`
2. Actualiza en `cv-data.yml`:

```yaml
personal:
  foto: "images/tu-nueva-foto.jpg"
```

## 🌐 Publicar en GitHub Pages (GRATIS)

### Paso 1: Sube a GitHub

```bash
cd cv-carlos
git init
git add .
git commit -m "Mi CV en Quarto"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cv-carlos.git
git push -u origin main
```

### Paso 2: Activa GitHub Pages

1. Ve a Settings → Pages
2. Source: selecciona "main" branch
3. Folder: selecciona "/docs"
4. Save

Tu CV estará en: `https://TU-USUARIO.github.io/cv-carlos/`

## 🎨 Personalización Avanzada

### Cambiar colores:

Edita `custom.scss`:

```scss
$primary: #FF9800;    // Color naranja principal
$secondary: #00BCD4;  // Color teal/cyan
```

### Agregar más secciones:

Edita `index.qmd` y agrega tu contenido en HTML/Markdown.

## 📦 Dependencias de R

Asegúrate de tener instalado:

```r
install.packages(c("yaml", "htmltools"))
```

## 💡 Tips

- **Preview en tiempo real**: Usa `quarto preview` mientras editas
- **Datos centralizados**: Todo en `cv-data.yml` = fácil de mantener
- **Exportar PDF**: Usa `quarto render --to pdf` (requiere LaTeX o Chromium)
- **Responsive**: El diseño se adapta automáticamente a móviles

## 🆘 Troubleshooting

**Problema**: No se ve la foto de perfil
- **Solución**: Verifica que la ruta en `cv-data.yml` sea correcta

**Problema**: Error al renderizar
- **Solución**: Verifica que `yaml` y `htmltools` estén instalados

**Problema**: El PDF no se ve igual que el HTML
- **Solución**: El PDF tiene limitaciones. Usa el HTML para la web y genera PDF específico

## 📞 Soporte

Si tienes dudas, revisa la documentación oficial de Quarto:
https://quarto.org/docs/guide/

---

**¡Tu CV está listo! 🎉**

Actualiza `cv-data.yml` y ejecuta `quarto render` para ver los cambios.
