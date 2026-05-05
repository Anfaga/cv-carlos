#!/usr/bin/env python3
"""
generar_pdf_hv.py
─────────────────
Genera el HTML optimizado para PDF de la HV de Carlos Falla.
Mismo patrón que generar_pdf.py del brochure BookFlow.

Uso:
    python generar_pdf_hv.py es
    python generar_pdf_hv.py en
    python generar_pdf_hv.py pt
    python generar_pdf_hv.py all     ← genera los 3 idiomas

Salida:
    docs/cv-print-{lang}.html   ← HTML listo para imprimir / chrome_print
"""

import sys
import os
import re
import yaml

try:
    from jinja2 import Environment, FileSystemLoader
except ImportError:
    print("ERROR: pip install jinja2")
    sys.exit(1)

# ── Configuración ─────────────────────────────────────────────
VALID_LANGS   = ("es", "en", "pt")
TEMPLATE_FILE = "pdf-template-hv.html"
script_dir    = os.path.dirname(os.path.abspath(__file__))


def fix_image_paths(data):
    """
    El HTML generado va a docs/; las imágenes están en images/ (raíz).
    Ajustamos todos los paths relativos a ../
    """
    # Foto de perfil
    if "personal" in data and "foto" in data["personal"]:
        foto = data["personal"]["foto"]
        if not foto.startswith(("http", "/")):
            data["personal"]["foto"] = "../" + foto

    # Iconos de intereses (son strings HTML: <img src="images/...">)
    for interes in data.get("intereses", []):
        icono_str = str(interes.get("icono", ""))
        match = re.search(r'src=["\']([^"\']+)["\']', icono_str)
        if match:
            src = match.group(1)
            interes["icono_src"] = ("../" + src) if not src.startswith(("http", "/")) else src
        else:
            interes["icono_src"] = ""

    return data


def build(lang):
    yaml_file  = os.path.join(script_dir, f"cv-data-{lang}.yml")
    trans_file = os.path.join(script_dir, "translations.yml")
    out_html   = os.path.join(script_dir, "docs", f"cv-print-{lang}.html")

    # Validar archivos fuente
    for f in (yaml_file, trans_file, os.path.join(script_dir, TEMPLATE_FILE)):
        if not os.path.exists(f):
            print(f"ERROR: No encontré {f}")
            return False

    os.makedirs(os.path.join(script_dir, "docs"), exist_ok=True)

    # Cargar datos
    with open(yaml_file,  "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    with open(trans_file, "r", encoding="utf-8") as f:
        translations = yaml.safe_load(f).get(lang, {})

    # Preprocesar paths de imágenes
    data = fix_image_paths(data)

    # Renderizar plantilla
    env      = Environment(loader=FileSystemLoader(script_dir), autoescape=False)
    template = env.get_template(TEMPLATE_FILE)
    html     = template.render(d=data, tr=translations, lang=lang)

    with open(out_html, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"  ✅ {lang.upper()} → {os.path.relpath(out_html)}")
    return True


# ── Main ──────────────────────────────────────────────────────
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python generar_pdf_hv.py [es|en|pt|all]")
        sys.exit(1)

    arg = sys.argv[1].lower()

    if arg == "all":
        langs = list(VALID_LANGS)
    elif arg in VALID_LANGS:
        langs = [arg]
    else:
        print(f"ERROR: Idioma '{arg}' no válido. Use: es, en, pt, all")
        sys.exit(1)

    print(f"\n📄 Generando HTML para PDF — HV Carlos Falla\n")
    ok = all(build(l) for l in langs)

    if ok:
        print("\n💡 Siguiente paso — convertir a PDF:")
        for l in langs:
            print(f"   pagedown::chrome_print('docs/cv-print-{l}.html', output='docs/index-{l}.pdf')")
        print()
    else:
        sys.exit(1)
