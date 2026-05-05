# ========================================
# BUILD ALL CV VERSIONS (ALL LANGUAGES)
# ========================================
library(quarto)
library(pagedown)

languages <- c("es", "en", "pt")

cat("🌐 Building CV in", length(languages), "languages...\n\n")

# ========================================
# STEP 0: SETUP FLAGS DIRECTORY
# ========================================
cat("🏁 Setting up flags directory...\n")
if (!dir.exists("docs/images/flags")) {
  dir.create("docs/images/flags", recursive = TRUE)
}

flags <- c("COL.png", "USA.png", "BRA.png")
for (flag in flags) {
  src <- paste0("images/flags/", flag)
  dst <- paste0("docs/images/flags/", flag)
  if (file.exists(src)) {
    file.copy(src, dst, overwrite = TRUE)
    cat("  ✓ Copied", flag, "\n")
  } else {
    cat("  ⚠️  Warning:", flag, "not found\n")
  }
}
cat("\n")

# ========================================
# STEP 0.5: COPY index.html REDIRECT
# ========================================
cat("🔗 Copying index.html redirect...\n")
if (file.exists("index.html")) {
  file.copy("index.html", "docs/index.html", overwrite = TRUE)
  cat("  ✓ index.html copied to docs/\n")
} else {
  cat("  ⚠️  Warning: index.html not found\n")
}
cat("\n")

# ========================================
# STEP 1: RENDER HTML (Quarto → web)
# ========================================
for (lang in languages) {
  cat("📄 Rendering", toupper(lang), "HTML (Quarto)...\n")
  quarto_render(
    input       = "index.qmd",
    output_file = paste0("index-", lang, ".html"),
    execute_params = list(lang = lang)
  )
  cat("✅", toupper(lang), "HTML rendered\n\n")
}

# ========================================
# STEP 1.5: COPY NAVBAR JAVASCRIPT
# ========================================
cat("📋 Copying navbar-i18n.js...\n")
file.copy("navbar-i18n.js", "docs/navbar-i18n.js", overwrite = TRUE)
cat("✅ JavaScript copied\n\n")

# ========================================
# STEP 2: GENERATE PRINT HTML (Python + Jinja2)
# Misma lógica que generar_pdf.py del brochure BookFlow:
# python lee el YAML, renderiza el template y produce un HTML
# optimizado para una sola página.
# ========================================
cat("🐍 Generating print-optimized HTML via Python template...\n")

python_cmd <- if (.Platform$OS.type == "windows") "python" else "python3"
result <- system2(python_cmd, c("generar_pdf_hv.py", "all"), stdout = TRUE, stderr = TRUE)
cat(paste(result, collapse = "\n"), "\n\n")

if (!all(file.exists(paste0("docs/cv-print-", languages, ".html")))) {
  cat("⚠️  Some print HTML files missing — falling back to Quarto HTML for PDF\n\n")
  pdf_source <- "quarto"
} else {
  pdf_source <- "python"
  cat("✅ Print HTML generated for all languages\n\n")
}

# ========================================
# STEP 3: GENERATE PDFs
# ========================================
pdf_options <- list(
  paperWidth  = 8.5,
  paperHeight = 14,
  marginTop   = 0,
  marginBottom = 0,
  marginLeft  = 0,
  marginRight = 0,
  printBackground    = TRUE,
  preferCSSPageSize  = TRUE,
  scale              = 1.0,
  displayHeaderFooter = FALSE
)

for (lang in languages) {
  cat("🎨 Generating", toupper(lang), "PDF...\n")

  if (pdf_source == "python") {
    input_html <- paste0("docs/cv-print-", lang, ".html")
  } else {
    # fallback: usar el HTML de Quarto (escala reducida para que quepa)
    input_html <- paste0("docs/index-", lang, ".html")
    pdf_options$scale <- 0.80
    pdf_options$marginTop <- 0.05
    pdf_options$marginBottom <- 0.1
    pdf_options$marginLeft  <- 0.7
    pdf_options$marginRight <- 0.7
    pdf_options$preferCSSPageSize <- FALSE
  }

  pagedown::chrome_print(
    input   = input_html,
    output  = paste0("docs/index-", lang, ".pdf"),
    format  = "pdf",
    options = pdf_options,
    timeout = 120,
    extra_args = c("--disable-gpu", "--no-sandbox")
  )

  cat("✅", toupper(lang), "PDF generated\n\n")
}

# ========================================
# SUMMARY
# ========================================
cat("\n")
cat("========================================\n")
cat("✅ BUILD COMPLETE\n")
cat("========================================\n")
cat("PDF source:", pdf_source, "\n")
cat("Generated files:\n")
cat("  📄 docs/index.html (redirect)\n")
for (lang in languages) {
  cat("  📄 docs/index-", lang, ".html  (web)\n", sep = "")
  if (pdf_source == "python") {
    cat("  🖨️  docs/cv-print-", lang, ".html  (print template)\n", sep = "")
  }
  cat("  📑 docs/index-", lang, ".pdf\n", sep = "")
}
cat("  📜 docs/navbar-i18n.js\n")
cat("\n🚀 Ready to deploy to GitHub Pages!\n")
