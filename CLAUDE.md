## Estado del proyecto (.anfaga/estado.yml)

- Este archivo alimenta el tablero de Anfaga Analytics.
- Al cerrar un cambio que mueva el avance, actualiza `etapa`, `avance_etapa`, `tarea_actual` y `actualizado`, y proponlo junto con el cambio.
- Criterios de etapa: idea (solo concepto), diagnostico (levantamiento), propuesta (cotización), plan (plan de trabajo aprobado), diseno (arquitectura o andamiaje), desarrollo (construyendo funcionalidades), pruebas (completo, en ajustes, sin usuarios reales), produccion (primeros usuarios reales), operacion (uso estable, solo soporte).
- `avance_etapa` es el avance dentro de la etapa actual (0 a 100); al cambiar de etapa vuelve a empezar.
- No incluyas datos sensibles.
