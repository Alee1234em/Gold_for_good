export type TipoRegistro = 'MEDICION_CONFIRMADA' | 'OBSERVACION_COMUNITARIA' | 'RESULTADO_LABORATORIO' | 'VACIO_INFORMACION';

export type ClasificacionEvidencia = 
  | 'CONTAMINACION_CONFIRMADA' 
  | 'SIN_EXCEDENCIA' 
  | 'BAJO_INVESTIGACION' 
  | 'SIN_INFORMACION';

export type EstadoValidacion = 
  | 'VALIDADO_CIENTIFICAMENTE' 
  | 'PENDIENTE_REVISION' 
  | 'OBSERVACION_COMUNITARIA_REGISTRADA' 
  | 'RECHAZADO';

export type MatrizMuestra = 
  | 'Cabello humano' 
  | 'Peces' 
  | 'Agua superficial' 
  | 'Sedimentos' 
  | 'Agua / Observación visual';

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface EstudioCientifico {
  id: string;
  titulo: string;
  autores: string;
  institucion: string;
  institucion_tipo: string;
  anio_publicacion: number;
  anio_muestreo: number;
  tipo_documento: string;
  resumen: string;
  cuenca: string;
  departamento: string;
  municipio: string;
  comunidad: string;
  coordenadas: Coordenadas;
  matriz: MatrizMuestra;
  especie: string;
  metodo_analisis: string;
  laboratorio: string;
  tamano_muestra: number;
  concentracion_media: number | null;
  concentracion_maxima: number | null;
  concentracion_minima: number | null;
  unidad: string;
  criterio_referencia: string;
  clasificacion_evidencia: ClasificacionEvidencia;
  estado_validacion: EstadoValidacion;
  tipo_registro: TipoRegistro;
  enlace_fuente: string;
  vacios_asociados?: string;
  citas_pagina?: {
    pagina: number;
    fragmento: string;
  }[];
}

export interface FiltrosObservatorio {
  departamento: string;
  municipio: string;
  cuenca: string;
  matriz: string;
  clasificacion: string;
  tipoRegistro: string;
  anioMin: number;
  anioMax: number;
  busqueda: string;
}

export interface EspeciePezInfo {
  nombreComun: string;
  nombreCientifico: string;
  nivelTrofico: 'Piscívoro (Carnívoro)' | 'Omnívoro' | 'Iliófago / Detritívoro';
  riesgoBioacumulacion: 'Muy Alto' | 'Medio' | 'Bajo';
  concentracionTipicaPpm: string;
  recomendacionConsumo: string;
  fuenteEstudio: string;
  cuencaReportada: string;
}
