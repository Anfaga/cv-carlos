# ========================================
# ALTERNATIVA: FORZAR TODO EN 1 PÁGINA
# ========================================

# Paquetes
if (!require("pagedown")) install.packages("pagedown")
if (!require("quarto")) install.packages("quarto")

library(pagedown)
library(quarto)

# 1. RENDERIZAR HTML
cat("📄 Renderizando HTML...\n")
quarto_render("index.qmd")
Sys.sleep(2)

# 2. CREAR PDF FORZADO A 1 PÁGINA
cat("🎨 Generando PDF escalado a 1 página...\n")

# Opciones agresivas para forzar 1 página
pagedown::chrome_print(
  input = "docs/index.html",
  output = "index.pdf",
  format = "pdf",
  options = list(
    paperWidth = 8.5,
    #paperHeight = 11,  # Tamaño carta
    paperHeight = 14,  # Tamaño oficio
    marginTop = 0.6,
    marginBottom = 0.4,
    marginLeft = 0.8,
    marginRight = 0.8,
    printBackground = TRUE,
    preferCSSPageSize = TRUE,
    scale = 0.75,  # Escalar al 65% para que quepa
    displayHeaderFooter = FALSE
  ),
  timeout = 120,
  extra_args = c("--disable-gpu", "--no-sandbox")
)

# 3. COPIAR
if (file.exists("index.pdf")) {
  file.copy("index.pdf", "docs/index.pdf", overwrite = TRUE)
  cat("✅ PDF generado (escalado al 65%)\n")
} else {
  cat("❌ Error\n")
}

cat("\n💡 Si está muy pequeño, aumenta 'scale' a 0.75 o 0.80\n")
cat("💡 Si no cabe, reduce 'scale' a 0.60 o 0.55\n")
