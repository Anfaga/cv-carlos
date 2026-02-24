# ========================================
# BUILD ALL CV VERSIONS (ALL LANGUAGES)
# ========================================
library(quarto)
library(pagedown)

# Define available languages
languages <- c("es", "en", "pt")

cat("🌐 Building CV in", length(languages), "languages...\n\n")

# ========================================
# STEP 0: SETUP FLAGS DIRECTORY
# ========================================
cat("🏁 Setting up flags directory...\n")
if (!dir.exists("docs/images/flags")) {
  dir.create("docs/images/flags", recursive = TRUE)
  cat("  ✓ Created docs/images/flags/\n")
}

# Copy flag images
flags <- c("COL.png", "USA.png", "BRA.png")
for (flag in flags) {
  if (file.exists(paste0("images/flags/", flag))) {
    file.copy(
      paste0("images/flags/", flag),
      paste0("docs/images/flags/", flag),
      overwrite = TRUE
    )
    cat("  ✓ Copied", flag, "\n")
  } else {
    cat("  ⚠️ Warning:", flag, "not found in images/flags/\n")
  }
}
cat("\n")

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
# STEP 1.5: COPY NAVBAR JAVASCRIPT
# ========================================
cat("📋 Copying navbar internationalization script...\n")
file.copy("navbar-i18n.js", "docs/navbar-i18n.js", overwrite = TRUE)
cat("✅ JavaScript copied to docs/\n\n")

# ========================================
# STEP 2: GENERATE PDFs
# ========================================
for (lang in languages) {
  cat("🎨 Generating", toupper(lang), "PDF...\n")

  pagedown::chrome_print(
    input = paste0("docs/index-", lang, ".html"),
    output = paste0("docs/index-", lang, ".pdf"),
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

  cat("✅", toupper(lang), "PDF generated\n\n")
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
cat("  📜 docs/navbar-i18n.js\n")
cat("  🏁 docs/images/flags/ (", length(flags), " flags)\n", sep = "")
cat("\n")
cat("🌐 Available languages:", paste(toupper(languages), collapse = ", "), "\n")
cat("📱 Navbar features:\n")
cat("  ✓ Language-specific flag icons (16x16px)\n")
cat("  ✓ Dynamic navbar translation via JavaScript\n")
cat("  ✓ Language-specific PDF button\n")
cat("  ✓ Dropdown menu with other languages\n")
cat("\n🚀 Ready to deploy!\n")
