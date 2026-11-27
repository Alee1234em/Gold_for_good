import { EstudioCientifico, EspeciePezInfo } from '../types';

export const ESTUDIOS_INICIALES: EstudioCientifico[] = [
  {
    id: "EST-2021-001",
    titulo: "Niveles de mercurio en mujeres en edad fértil en comunidades indígenas Esse Ejja del Río Beni",
    autores: "IPEN, CEDIB, Bell, L., & Narvaez, C.",
    institucion: "IPEN / CEDIB",
    institucion_tipo: "ONG / Red Internacional",
    anio_publicacion: 2021,
    anio_muestreo: 2020,
    tipo_documento: "Informe de Investigación Científica",
    resumen: "Evaluación biomédica de concentración de mercurio total en muestras de cabello de 64 mujeres en edad fértil (18-44 años) de la comunidad indígena Esse Ejja (Eyiyo Quibo) en la cuenca del Río Beni. Los resultados mostraron que el 93% superó el umbral de referencia de la OMS/USEPA (1.0 ppm), con una media de 7.58 ppm y valores máximos de hasta 32.1 ppm vinculados a la alta dieta de pescado piscívoro.",
    cuenca: "Cuenca del Río Beni",
    departamento: "La Paz / Beni",
    municipio: "Rurrenabaque / San Buenaventura",
    comunidad: "Eyiyo Quibo",
    coordenadas: {
      lat: -14.4425,
      lng: -67.5283
    },
    matriz: "Cabello humano",
    especie: "Homo sapiens (Mujeres 18-44 años)",
    metodo_analisis: "Espectrometría de absorción atómica de vapor frío (CVAAS)",
    laboratorio: "Laboratorio Certificado IPEN / BRI (Biodiversity Research Institute)",
    tamano_muestra: 64,
    concentracion_media: 7.58,
    concentracion_maxima: 32.1,
    concentracion_minima: 0.42,
    unidad: "ppm (mg/kg)",
    criterio_referencia: "1.0 ppm (OMS / USEPA - umbral sin efecto adverso)",
    clasificacion_evidencia: "CONTAMINACION_CONFIRMADA",
    estado_validacion: "VALIDADO_CIENTIFICAMENTE",
    tipo_registro: "MEDICION_CONFIRMADA",
    enlace_fuente: "https://www.cedib.org/publicaciones/mercurio-mujeres-bolivia-ipen-cedib/",
    vacios_asociados: "Se requiere seguimiento longitudinal en niños menores de 5 años y monitoreo de correlación estacional en época de seca y lluvia.",
    citas_pagina: [
      { pagina: 14, fragmento: "La concentración media de Hg en cabello de la comunidad Esse Ejja fue de 7.58 ppm, 7 veces más alto que el umbral de referencia de 1.0 ppm." },
      { pagina: 18, fragmento: "El 93% de las participantes excedió el nivel de 1.0 ppm de mercurio." }
    ]
  },
  {
    id: "EST-2022-002",
    titulo: "Concentración de mercurio total en músculo de especies de peces comerciales consumidas en Rurrenabaque",
    autores: "Molina, C. I., UMSA Instituto de Ecología, & LCA-UMSA",
    institucion: "Universidad Mayor de San Andrés (UMSA)",
    institucion_tipo: "Universidad Pública",
    anio_publicacion: 2022,
    anio_muestreo: 2021,
    tipo_documento: "Artículo Científico en Revista Indexada",
    resumen: "Monitoreo ictiológico y ecotoxicológico de concentraciones de mercurio en 120 ejemplares de peces de 6 especies comerciales adquiridos en puestos de desembarco del Río Beni en Rurrenabaque. Especies carnívoras como el blanquillo (Calophysus macropterus) y surubí (Pseudoplatystoma punctifer) presentaron niveles promedio de 0.82 ppm y 0.61 ppm superando la norma OMS (0.5 ppm). Especies iliófagas como el sábalo (Prochilodus nigricans) presentaron 0.12 ppm (bajo la norma).",
    cuenca: "Cuenca del Río Beni",
    departamento: "Beni",
    municipio: "Rurrenabaque",
    comunidad: "Puerto Rurrenabaque",
    coordenadas: {
      lat: -14.4411,
      lng: -67.5319
    },
    matriz: "Peces",
    especie: "Calophysus macropterus (Blanquillo), Pseudoplatystoma (Surubí), Prochilodus (Sábalo)",
    metodo_analisis: "Espectrofotometría de Fluorescencia Atómica (AFS)",
    laboratorio: "Laboratorio de Calidad Ambiental (LCA-UMSA)",
    tamano_muestra: 120,
    concentracion_media: 0.52,
    concentracion_maxima: 1.45,
    concentracion_minima: 0.08,
    unidad: "mg/kg peso húmedo (ppm)",
    criterio_referencia: "0.5 mg/kg (OMS/FAO para consumo general)",
    clasificacion_evidencia: "CONTAMINACION_CONFIRMADA",
    estado_validacion: "VALIDADO_CIENTIFICAMENTE",
    tipo_registro: "MEDICION_CONFIRMADA",
    enlace_fuente: "https://ecologia.umsa.bo/investigaciones/mercurio-peces-rio-beni/",
    vacios_asociados: "Faltan estudios sobre la variabilidad según la talla del pez y análisis de metilmercurio fraccionado específico.",
    citas_pagina: [
      { pagina: 6, fragmento: "El blanquillo (Calophysus macropterus) presentó valores promedio de 0.82 ± 0.24 mg/kg, superando de forma estadísticamente significativa el límite permisible de la OMS." }
    ]
  },
  {
    id: "EST-2023-003",
    titulo: "Evaluación de la calidad de agua y sedimentos superficiales en zonas de minería aurífera aluvial del Río Kaka",
    autores: "Campanini, O., & Gandarillas, M. (CEDIB)",
    institucion: "CEDIB",
    institucion_tipo: "ONG de Investigación",
    anio_publicacion: 2023,
    anio_muestreo: 2022,
    tipo_documento: "Informe Técnico de Monitoreo",
    resumen: "Monitoreo geoambiental en 18 puntos sobre la confluencia de los ríos Mapiri y Aten (formación del Río Kaka, municipio de Guanay y Teoponte). Se detectaron concentraciones de Hg en sedimentos de lecho activo de hasta 0.48 mg/kg en zonas aledañas a operaciones con balsas 'draga dragón'. En agua superficial, la concentración fue en su mayoría inferior a 0.001 mg/L en aguas no estancadas pero con alta turbidez.",
    cuenca: "Cuenca del Río Beni (Subcuenca Kaka)",
    departamento: "La Paz",
    municipio: "Guanay / Teoponte",
    comunidad: "Guanay Centro / Playa Kaka",
    coordenadas: {
      lat: -15.4981,
      lng: -67.8814
    },
    matriz: "Sedimentos",
    especie: "Matriz abiótica (Lecho activo)",
    metodo_analisis: "ICP-MS / Absorción Atómica con Generador de Hidruros",
    laboratorio: "Instituto de Investigaciones Químicas (IIQ-UMSA)",
    tamano_muestra: 36,
    concentracion_media: 0.28,
    concentracion_maxima: 0.48,
    concentracion_minima: 0.05,
    unidad: "mg/kg",
    criterio_referencia: "Guía Canadiense CSQG sedimentos (0.17 mg/kg valor umbral TEL)",
    clasificacion_evidencia: "CONTAMINACION_CONFIRMADA",
    estado_validacion: "VALIDADO_CIENTIFICAMENTE",
    tipo_registro: "MEDICION_CONFIRMADA",
    enlace_fuente: "https://www.cedib.org/informes/impacto-minero-rio-kaka/",
    vacios_asociados: "Monitoreo insuficiente en época de crecidas; falta de datos sobre bioacumulación en macroinvertebrados bentónicos.",
    citas_pagina: [
      { pagina: 22, fragmento: "En el 72% de las muestras de sedimento tomadas aguas abajo de Guanay, la concentración de Hg superó el nivel TEL de 0.17 mg/kg." }
    ]
  },
  {
    id: "EST-2021-004",
    titulo: "Línea base de mercurio y metales pesados en las cabeceras prístinas de la Reserva de la Biosfera Pilón Lajas",
    autores: "WCS Bolivia, SERNAP, & LCA-UMSA",
    institucion: "WCS Bolivia / UMSA",
    institucion_tipo: "Cooperación / Academia",
    anio_publicacion: 2021,
    anio_muestreo: 2020,
    tipo_documento: "Informe de Monitoreo de Conservación",
    resumen: "Estudio de línea base en el Río Quiquibey dentro del área protegida Pilón Lajas, como cuenca testigo sin actividad minera directa. Muestras de agua superficial y peces iliófagos (sábalo y sábalo pintado). Todos los resultados en agua resultaron por debajo del límite de detección analítico (<0.0002 mg/L) y en peces los niveles fueron basales (<0.05 ppm).",
    cuenca: "Cuenca del Río Beni (Subcuenca Quiquibey)",
    departamento: "La Paz / Beni",
    municipio: "Rurrenabaque",
    comunidad: "Comunidad Tsimane Asunción del Quiquibey",
    coordenadas: {
      lat: -15.1205,
      lng: -67.1852
    },
    matriz: "Agua superficial",
    especie: "Prochilodus nigricans, Brycon amazonicus",
    metodo_analisis: "CVAAS (Vapor Frío)",
    laboratorio: "LCA-UMSA",
    tamano_muestra: 24,
    concentracion_media: 0.03,
    concentracion_maxima: 0.06,
    concentracion_minima: 0.01,
    unidad: "mg/kg",
    criterio_referencia: "0.5 mg/kg (Peces) / 0.001 mg/L (Agua)",
    clasificacion_evidencia: "SIN_EXCEDENCIA",
    estado_validacion: "VALIDADO_CIENTIFICAMENTE",
    tipo_registro: "MEDICION_CONFIRMADA",
    enlace_fuente: "https://bolivia.wcs.org/recursos/publicaciones/pilon-lajas-linea-base.aspx",
    vacios_asociados: "Área de referencia óptima (sitio prístino); requiere mediciones de control cada 2 años para prevenir avance de dragas.",
    citas_pagina: [
      { pagina: 9, fragmento: "Los valores obtenidos en el río Quiquibey reflejan condiciones hidroquímicas basales naturales sin alteración antrópica por mercurio." }
    ]
  },
  {
    id: "EST-2023-005",
    titulo: "Reporte de alerta comunitaria sobre turbidez y sospecha de sedimentos auríferos en el Río Mayaya",
    autores: "Central de Pueblos Indígenas de La Paz (CPILAP)",
    institucion: "CPILAP / Comunidad Local",
    institucion_tipo: "Organización Indígena",
    anio_publicacion: 2023,
    anio_muestreo: 2023,
    tipo_documento: "Ficha de Alerta Comunitaria Participativa",
    resumen: "Registro de alerta ciudadana sobre incremento inusual de sólidos suspendidos y muerte puntual de peces en la confluencia del Río Mayaya y Alto Beni. No cuenta con cromatografía ni absorción atómica de laboratorio aún, pero fue georreferenciada para priorizar toma de muestra oficial.",
    cuenca: "Cuenca del Río Beni (Alto Beni)",
    departamento: "La Paz",
    municipio: "Teoponte",
    comunidad: "Mayaya",
    coordenadas: {
      lat: -15.4219,
      lng: -67.7345
    },
    matriz: "Agua / Observación visual",
    especie: "No aplica",
    metodo_analisis: "Inspección de campo / Sensor de turbidez portátil",
    laboratorio: "Pendiente de análisis oficial de laboratorio",
    tamano_muestra: 1,
    concentracion_media: null,
    concentracion_maxima: null,
    concentracion_minima: null,
    unidad: "NTU (Turbidez: 145 NTU)",
    criterio_referencia: "5 NTU (Norma Agua Potable)",
    clasificacion_evidencia: "BAJO_INVESTIGACION",
    estado_validacion: "OBSERVACION_COMUNITARIA_REGISTRADA",
    tipo_registro: "OBSERVACION_COMUNITARIA",
    enlace_fuente: "https://cpilap.org.bo/alertas/mayaya-2023",
    vacios_asociados: "Zona prioritaria para envío urgente de equipo técnico para muestreo estandarizado de metales pesados."
  },
  {
    id: "EST-2024-006",
    titulo: "Evaluación preliminar de bioacumulación en cuenca baja del Río Madre de Dios (Riberalta)",
    autores: "Universidad Amazónica de Pando (UAP) & Hospital Materno Infantil Riberalta",
    institucion: "Universidad Amazónica de Pando",
    institucion_tipo: "Universidad Pública",
    anio_publicacion: 2024,
    anio_muestreo: 2023,
    tipo_documento: "Informe de Monitoreo Preliminar",
    resumen: "Estudio piloto en 30 muestras de cabello en población ribereña urbana y rural de Riberalta dedicada al comercio de castaña y pesca. Se evidenció un promedio de 2.1 ppm, con 68% de las muestras por encima del límite de la OMS (1 ppm).",
    cuenca: "Cuenca del Río Madre de Dios",
    departamento: "Beni",
    municipio: "Riberalta",
    comunidad: "Riberalta - Barrio Puerto Hamburgo",
    coordenadas: {
      lat: -10.9833,
      lng: -66.1000
    },
    matriz: "Cabello humano",
    especie: "Homo sapiens",
    metodo_analisis: "CVAAS",
    laboratorio: "Laboratorio UAP / Convenio Internacional",
    tamano_muestra: 30,
    concentracion_media: 2.1,
    concentracion_maxima: 8.4,
    concentracion_minima: 0.35,
    unidad: "ppm (mg/kg)",
    criterio_referencia: "1.0 ppm (OMS)",
    clasificacion_evidencia: "CONTAMINACION_CONFIRMADA",
    estado_validacion: "VALIDADO_CIENTIFICAMENTE",
    tipo_registro: "MEDICION_CONFIRMADA",
    enlace_fuente: "https://uap.edu.bo/investigacion/madre-de-dios-hg",
    vacios_asociados: "Se desconoce si el origen predominante es la minería local del río Madre de Dios o transporte aéreo/sedimentario de cuencas altas.",
    citas_pagina: [
      { pagina: 11, fragmento: "El promedio hallado en población no minera pero con dieta basada en pescado fue de 2.1 ppm de Hg total." }
    ]
  }
];

export const ESPECIES_PECES_GUIA: EspeciePezInfo[] = [
  {
    nombreComun: "Blanquillo / Mota",
    nombreCientifico: "Calophysus macropterus",
    nivelTrofico: "Piscívoro (Carnívoro)",
    riesgoBioacumulacion: "Muy Alto",
    concentracionTipicaPpm: "0.82 - 1.45 ppm (Supera norma OMS 0.5 ppm)",
    recomendacionConsumo: "Evitar el consumo frecuente, especialmente en mujeres embarazadas, lactantes y niños menores de 12 años. Pez carnívoro de fondo con máxima tasa de biomagnificación.",
    fuenteEstudio: "LCA-UMSA (2022) / Molina et al.",
    cuencaReportada: "Río Beni (Rurrenabaque y curso medio)"
  },
  {
    nombreComun: "Surubí / Pintado",
    nombreCientifico: "Pseudoplatystoma punctifer",
    nivelTrofico: "Piscívoro (Carnívoro)",
    riesgoBioacumulacion: "Muy Alto",
    concentracionTipicaPpm: "0.55 - 0.95 ppm (Supera o roza norma OMS)",
    recomendacionConsumo: "Consumo moderado a restringido (máximo 1 porción cada 15 días para adultos). Desaconsejado para embarazadas y niños.",
    fuenteEstudio: "UMSA Instituto de Ecología (2022)",
    cuencaReportada: "Río Beni, Río Mamoré, Río Madre de Dios"
  },
  {
    nombreComun: "Pacú",
    nombreCientifico: "Piaractus brachypomus",
    nivelTrofico: "Omnívoro",
    riesgoBioacumulacion: "Medio",
    concentracionTipicaPpm: "0.18 - 0.35 ppm (Dentro de la norma OMS)",
    recomendacionConsumo: "Consumo seguro moderado para adultos. Los ejemplares de mayor tamaño y edad acumulan más concentración que los juveniles.",
    fuenteEstudio: "Monitoreos Ictiológicos Amazonía Boliviana",
    cuencaReportada: "Río Beni y tributarios"
  },
  {
    nombreComun: "Tambaquí",
    nombreCientifico: "Colossoma macropomum",
    nivelTrofico: "Omnívoro",
    riesgoBioacumulacion: "Medio",
    concentracionTipicaPpm: "0.15 - 0.28 ppm (Bajo el umbral 0.5 ppm)",
    recomendacionConsumo: "Alternativa alimentaria más segura respecto a especies carnívoras como blanquillo y surubí.",
    fuenteEstudio: "Informes de Piscicultura y Monitoreo Ambiental",
    cuencaReportada: "Cuenca del Río Beni y Madre de Dios"
  },
  {
    nombreComun: "Sábalo",
    nombreCientifico: "Prochilodus nigricans",
    nivelTrofico: "Iliófago / Detritívoro",
    riesgoBioacumulacion: "Bajo",
    concentracionTipicaPpm: "0.05 - 0.14 ppm (Muy bajo, seguro)",
    recomendacionConsumo: "Especie recomendada para consumo nutricional. Al alimentarse de lodo perifítico y algas, tiene una tasa de bioacumulación significativamente menor.",
    fuenteEstudio: "WCS / LCA-UMSA (2021-2022)",
    cuencaReportada: "Río Beni, Quiquibey, Pilón Lajas"
  },
  {
    nombreComun: "Yatorana",
    nombreCientifico: "Brycon amazonicus",
    nivelTrofico: "Omnívoro",
    riesgoBioacumulacion: "Bajo",
    concentracionTipicaPpm: "0.08 - 0.20 ppm (Dentro de norma)",
    recomendacionConsumo: "Opción de consumo proteico seguro en comunidades indígenas ribereñas.",
    fuenteEstudio: "Monitoreo Reserva Pilón Lajas (2021)",
    cuencaReportada: "Cuencas de cabecera y tributarios del Río Beni"
  }
];

export const GEOJSON_CUENCA_PILOTO = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "CUENCA-BENI",
        "tipo": "cuenca_limite",
        "nombre": "Cuenca del Río Beni y Cabeceras Auríferas",
        "area_km2": 133000
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-68.50, -16.20],
            [-68.20, -15.80],
            [-68.40, -15.20],
            [-68.10, -14.60],
            [-67.80, -13.80],
            [-67.20, -13.20],
            [-66.40, -12.50],
            [-65.80, -11.80],
            [-65.30, -10.50],
            [-66.20, -10.60],
            [-67.00, -11.50],
            [-67.60, -12.80],
            [-67.90, -13.90],
            [-68.80, -14.30],
            [-69.10, -14.90],
            [-68.70, -15.70],
            [-68.50, -16.20]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "RIO-BENI",
        "nombre": "Río Beni (Curso Principal)",
        "tipo": "rio",
        "impacto": "ALTO"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-67.8814, -15.4981],
          [-67.7345, -15.4219],
          [-67.6500, -15.2500],
          [-67.5800, -14.9000],
          [-67.5319, -14.4411],
          [-67.5000, -13.9500],
          [-67.2000, -13.4000],
          [-66.8500, -12.8000],
          [-66.4000, -12.1000],
          [-65.8000, -11.2000],
          [-65.3800, -10.3500]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "RIO-KAKA",
        "nombre": "Río Kaka (Zona Minera Guanay/Teoponte)",
        "tipo": "rio",
        "impacto": "MUY_ALTO"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-68.2200, -15.3100],
          [-68.0500, -15.4000],
          [-67.8814, -15.4981],
          [-67.7345, -15.4219]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "RIO-QUIQUIBEY",
        "nombre": "Río Quiquibey (Área Prístina Pilón Lajas)",
        "tipo": "rio",
        "impacto": "PRISTINO"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-67.0500, -15.3500],
          [-67.1852, -15.1205],
          [-67.3500, -14.8500],
          [-67.5300, -14.5000]
        ]
      }
    }
  ]
};
