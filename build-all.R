# ========================================
# BUILD ALL CV VERSIONS (ALL LANGUAGES)
# ========================================
library(quarto)
library(pagedown)

# Define available languages
languages <- c("es", "en", "pt")

# Translation for navbar
nav_labels <- list(
  es = list(download = "Descargar PDF", other = c("EN", "PT")),
  en = list(download = "Download PDF", other = c("ES", "PT")),
  pt = list(download = "Baixar PDF", other = c("ES", "EN"))
)

cat("🌐 Building CV in", length(languages), "languages...\n\n")

# ========================================
# STEP 1: RENDER HTML FOR EACH LANGUAGE
# ========================================
for (lang in languages) {
  cat("📄 Rendering", toupper(lang), "version...\n")
  
  # Render with language parameter
  quarto_render(
    input = "index.qmd",
    output_file = paste0("index-", lang, ".html"),
    execute_params = list(lang = lang)
  )
  
  cat("✅", toupper(lang), "HTML rendered\n\n")
}

# ========================================
# STEP 2: GENERATE PDFs
# ========================================
for (lang in languages) {
  cat("🎨 Generating", toupper(lang), "PDF...\n")
  
  pagedown::chrome_print(
    input = paste0("docs/index-", lang, ".html"),
    output = paste0("index-", lang, ".pdf"),
    format = "pdf",
    options = list(
      paperWidth = 8.5,
      paperHeight = 14,
      marginTop = 0.05,
      marginBottom = 0.1,
      marginLeft = 0.7,
      marginRight = 0.7,
      printBackground = TRUE,
      preferCSSPageSize = FALSE,
      scale = 0.80,
      displayHeaderFooter = FALSE
    ),
    timeout = 120,
    extra_args = c("--disable-gpu", "--no-sandbox")
  )
  
  # Copy to docs
  if (file.exists(paste0("index-", lang, ".pdf"))) {
    file.copy(
      paste0("index-", lang, ".pdf"),
      paste0("docs/index-", lang, ".pdf"),
      overwrite = TRUE
    )
    cat("✅", toupper(lang), "PDF generated\n\n")
  }
}

# ========================================
# SUMMARY
# ========================================
cat("\n")
cat("========================================\n")
cat("✅ BUILD COMPLETE\n")
cat("========================================\n")
cat("Generated files:\n")
for (lang in languages) {
  cat("  📄 docs/index-", lang, ".html\n", sep = "")
  cat("  📑 docs/index-", lang, ".pdf\n", sep = "")
}
cat("\n")
cat("🌐 Available languages:", paste(toupper(languages), collapse = ", "), "\n")
cat("🚀 Ready to deploy!\n")
