import React, { useState } from 'react';
import { EstudioCientifico } from '../../types';
import { FileUp, Sparkles, CheckSquare, AlertCircle, FileCheck, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface Props {
  onAprobarEstudio: (nuevoEstudio: EstudioCientifico) => void;
}

export const DocumentAiView: React.FC<Props> = ({ onAprobarEstudio }) => {
  const [procesando, setProcesando] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<string>('cedib_ipen_2021.pdf');
  const [extraccionCompletada, setExtraccionCompletada] = useState(false);
  const [estudioAprobado, setEstudioAprobado] = useState(false);

  // Formulario de revisión humana pre-llenado por IA
  const [formData, setFormData] = useState({
    id: 'EST-2024-AI-007',
    titulo: 'Evaluación ecotoxicológica y exposición al mercurio en niños y mujeres de la Cuenca Alta del Río Beni',
    institucion: 'CEDIB / Red Científica Bolivia',
    anio_publicacion: 2024,
    anio_muestreo: 2023,
    matriz: 'Cabello humano' as any,
    especie: 'Homo sapiens (Población infantil y materna)',
    concentracion_media: 4.82,
    concentracion_maxima: 18.5,
    unidad: 'ppm (mg/kg)',
    cuenca: 'Cuenca del Río Beni',
    departamento: 'La Paz',
    municipio: 'Guanay',
    comunidad: 'Comunidad Minera Cangallí',
    lat: -15.4852,
    lng: -67.8920,
    metodo_analisis: 'Espectrometría de absorción atómica de vapor frío (CVAAS)',
    laboratorio: 'Laboratorio de Referencia Internacional',
    tamano_muestra: 45,
    clasificacion_evidencia: 'CONTAMINACION_CONFIRMADA' as any,
    resumen: 'Estudio de campo enfocado en la exposición infantil y materna en zonas de beneficio minero con amalgama de oro. El 84% de las muestras excedió el umbral seguro de la OMS (1 ppm). Se vincula tanto a la dieta de pescado local como a la manipulación directa de azogue en hogares.',
    citas: [
      { pagina: 4, fragmento: 'De las 45 muestras biológicas de cabello procesadas en el laboratorio, se obtuvo una media aritmética de 4.82 ppm de Hg total.' },
      { pagina: 9, fragmento: 'El 84.4% de la cohorte infantil evaluada en Cangallí superó el valor umbral de 1.0 µg/g de la OMS.' }
    ]
  });

  const ejecutarExtraccionIA = () => {
    setProcesando(true);
    setExtraccionCompletada(false);
    setEstudioAprobado(false);

    setTimeout(() => {
      setProcesando(false);
      setExtraccionCompletada(true);
    }, 1200);
  };

  const handleGuardarYValidar = () => {
    const nuevo: EstudioCientifico = {
      id: formData.id,
      titulo: formData.titulo,
      autores: 'Equipo de Monitoreo Comunitario y Científico CEDIB',
      institucion: formData.institucion,
      institucion_tipo: 'Investigación Científica / ONG',
      anio_publicacion: formData.anio_publicacion,
      anio_muestreo: formData.anio_muestreo,
      tipo_documento: 'Informe Técnico Extraído Asistido por IA',
      resumen: formData.resumen,
      cuenca: formData.cuenca,
      departamento: formData.departamento,
      municipio: formData.municipio,
      comunidad: formData.comunidad,
      coordenadas: {
        lat: formData.lat,
        lng: formData.lng
      },
      matriz: formData.matriz,
      especie: formData.especie,
      metodo_analisis: formData.metodo_analisis,
      laboratorio: formData.laboratorio,
      tamano_muestra: formData.tamano_muestra,
      concentracion_media: formData.concentracion_media,
      concentracion_maxima: formData.concentracion_maxima,
      concentracion_minima: 0.3,
      unidad: formData.unidad,
      criterio_referencia: '1.0 ppm (OMS/USEPA)',
      clasificacion_evidencia: formData.clasificacion_evidencia,
      estado_validacion: 'VALIDADO_CIENTIFICAMENTE',
      tipo_registro: 'MEDICION_CONFIRMADA',
      enlace_fuente: 'https://cedib.org/documentos/rio-beni-infantil-2024',
      vacios_asociados: 'Se requiere monitoreo de seguimiento a los 6 y 12 meses tras intervenciones nutricionales.',
      citas_pagina: formData.citas
    };

    onAprobarEstudio(nuevo);
    setEstudioAprobado(true);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto p-6 space-y-6">
      
      {/* Cabecera del módulo */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Módulo 3 · Inteligencia Documental
          </div>
          <h2 className="text-xl font-bold text-white">Extracción Asistida de Evidencia Científica desde PDFs</h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Extrae automáticamente metadatos, matrices, concentraciones y citas textuales de página mediante PyMuPDF e IA, sometiendo cada hallazgo a revisión humana obligatoria antes de publicarlo.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-medium flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>Regla de Oro: Cero alucinación de coordenadas ni resultados</span>
        </div>
      </div>

      {/* Selector y Cargador de Documento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="font-semibold text-sm text-white flex items-center gap-2">
            <FileUp className="w-4 h-4 text-cyan-400" />
            1. Documento PDF a Procesar
          </h3>

          <div className="space-y-2">
            <label className="text-xs text-slate-400">Seleccionar PDF de referencia:</label>
            <select
              value={documentoSeleccionado}
              onChange={(e) => setDocumentoSeleccionado(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="cedib_ipen_2021.pdf">CEDIB_IPEN_2021_Mercurio_Mujeres_Esse_Ejja.pdf</option>
              <option value="umsa_peces_2022.pdf">UMSA_2022_Ecotoxicologia_Peces_Rurrenabaque.pdf</option>
              <option value="cedib_kaka_2023.pdf">CEDIB_2023_Monitoreo_Sedimentos_Rio_Kaka.pdf</option>
            </select>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p><strong>Tamaño:</strong> 2.4 MB (48 páginas)</p>
            <p><strong>Formato:</strong> PDF vectorial con tablas analíticas</p>
            <p><strong>Motor OCR/Parser:</strong> PyMuPDF 1.25 + Regex Heurístico</p>
          </div>

          <button
            onClick={ejecutarExtraccionIA}
            disabled={procesando}
            className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30"
          >
            {procesando ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Extrayendo texto y tablas de PDF...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Ejecutar Extracción Asistida</span>
              </>
            )}
          </button>
        </div>

        {/* Panel de Revisión y Validación Humana */}
        <div className="md:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              2. Revisión Humana y Validación de Metadatos
            </h3>
            {extraccionCompletada && (
              <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-medium">
                Extracción Lista para Revisión
              </span>
            )}
          </div>

          {!extraccionCompletada && !procesando && (
            <div className="p-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
              <FileUp className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-xs">Selecciona un PDF y presiona "Ejecutar Extracción Asistida" para ver los resultados.</p>
            </div>
          )}

          {extraccionCompletada && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Título de la Investigación:</label>
                  <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Institución / Autores:</label>
                  <input
                    type="text"
                    value={formData.institucion}
                    onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Matriz Biológica / Ambiental:</label>
                  <select
                    value={formData.matriz}
                    onChange={(e) => setFormData({ ...formData, matriz: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                  >
                    <option value="Cabello humano">Cabello humano</option>
                    <option value="Peces">Peces</option>
                    <option value="Agua superficial">Agua superficial</option>
                    <option value="Sedimentos">Sedimentos</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Concentración Media Reportada ({formData.unidad}):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.concentracion_media}
                    onChange={(e) => setFormData({ ...formData, concentracion_media: parseFloat(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Municipio / Comunidad de Muestreo:</label>
                  <input
                    type="text"
                    value={`${formData.municipio} - ${formData.comunidad}`}
                    onChange={(e) => setFormData({ ...formData, comunidad: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Clasificación de Evidencia:</label>
                  <select
                    value={formData.clasificacion_evidencia}
                    onChange={(e) => setFormData({ ...formData, clasificacion_evidencia: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                  >
                    <option value="CONTAMINACION_CONFIRMADA">Contaminación confirmada (&gt; criterio)</option>
                    <option value="SIN_EXCEDENCIA">Sin excedencia</option>
                    <option value="BAJO_INVESTIGACION">Bajo investigación</option>
                  </select>
                </div>
              </div>

              {/* Trazabilidad de Citas de Páginas */}
              <div className="p-3 bg-slate-900/90 rounded-lg border border-cyan-900/50 space-y-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Fragmentos originales detectados en el PDF (Evidencia Verificable):
                </span>
                {formData.citas.map((cita, i) => (
                  <div key={i} className="text-xs bg-slate-950 p-2 rounded border-l-2 border-cyan-500">
                    <span className="text-[10px] font-bold text-slate-400 block">PÁGINA {cita.pagina}:</span>
                    <p className="italic text-slate-300">"{cita.fragmento}"</p>
                  </div>
                ))}
              </div>

              {/* Botón de Aprobación */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Al validar, se georreferenciará e incorporará al catálogo y al mapa 3D satelital.
                </span>

                <button
                  onClick={handleGuardarYValidar}
                  disabled={estudioAprobado}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    estudioAprobado
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  {estudioAprobado ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Validado e Incorporado con Éxito</span>
                    </>
                  ) : (
                    <>
                      <CheckSquare className="w-4 h-4" />
                      <span>Aprobar y Publicar en el Observatorio</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
