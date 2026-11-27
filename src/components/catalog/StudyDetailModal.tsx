import React from 'react';
import { EstudioCientifico } from '../../types';
import { X, ExternalLink, FileText, CheckCircle, AlertTriangle, Building, MapPin, Calendar, Microscope, ShieldCheck, Info } from 'lucide-react';

interface Props {
  estudio: EstudioCientifico | null;
  onClose: () => void;
}

export const StudyDetailModal: React.FC<Props> = ({ estudio, onClose }) => {
  if (!estudio) return null;

  const isConfirmed = estudio.clasificacion_evidencia === 'CONTAMINACION_CONFIRMADA';
  const isNoExceed = estudio.clasificacion_evidencia === 'SIN_EXCEDENCIA';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl h-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-slide-left">
        
        {/* Cabecera */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                {estudio.id}
              </span>

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
                isConfirmed
                  ? 'bg-rose-950/90 text-rose-300 border border-rose-800'
                  : isNoExceed
                  ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950/90 text-amber-300 border border-amber-800'
              }`}>
                {isConfirmed && <AlertTriangle className="w-3.5 h-3.5" />}
                {isNoExceed && <CheckCircle className="w-3.5 h-3.5" />}
                {estudio.clasificacion_evidencia.replace('_', ' ')}
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                {estudio.tipo_registro.replace('_', ' ')}
              </span>
            </div>

            <h2 className="text-lg font-bold text-white leading-snug">
              {estudio.titulo}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
          
          {/* Metadatos institucionales y autores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-950/50 rounded-xl border border-slate-800/80">
            <div className="flex items-start gap-2.5">
              <Building className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-slate-400">Institución Responsable</p>
                <p className="font-semibold text-slate-200">{estudio.institucion}</p>
                <p className="text-[11px] text-slate-500">{estudio.institucion_tipo}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-slate-400">Temporalidad</p>
                <p className="font-semibold text-slate-200">Publicado: {estudio.anio_publicacion}</p>
                <p className="text-[11px] text-slate-400">Muestreo en campo: {estudio.anio_muestreo}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 col-span-full">
              <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-slate-400">Autores y Referencia</p>
                <p className="text-slate-300">{estudio.autores}</p>
              </div>
            </div>
          </div>

          {/* Ubicación y Cuenca Hidrográfica */}
          <div className="p-3.5 bg-slate-950/50 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
              <MapPin className="w-4 h-4" />
              Georreferenciación Verificada
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Cuenca Hidrográfica:</span>
                <span className="font-medium text-slate-200">{estudio.cuenca}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Departamento / Municipio:</span>
                <span className="font-medium text-slate-200">{estudio.departamento} / {estudio.municipio}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Comunidad / Sitio:</span>
                <span className="font-medium text-cyan-300">{estudio.comunidad}</span>
              </div>
              <div className="col-span-full font-mono text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                Coordenadas: Lat {estudio.coordenadas.lat}, Lng {estudio.coordenadas.lng}
              </div>
            </div>
          </div>

          {/* Resultados Analíticos de Laboratorio */}
          <div className="p-4 bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-cyan-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Microscope className="w-4 h-4" />
                Resultados Analíticos Cuantitativos
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                Muestra: {estudio.tamano_muestra} {estudio.tamano_muestra === 1 ? 'individuo/punto' : 'individuos'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Concentración Media</span>
                <span className="text-xl font-bold text-white font-mono">
                  {estudio.concentracion_media !== null ? estudio.concentracion_media : 'N/D'}
                </span>
                <span className="text-[10px] text-slate-400 block">{estudio.unidad}</span>
              </div>

              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Concentración Máxima</span>
                <span className="text-xl font-bold text-rose-400 font-mono">
                  {estudio.concentracion_maxima !== null ? estudio.concentracion_maxima : 'N/D'}
                </span>
                <span className="text-[10px] text-slate-400 block">{estudio.unidad}</span>
              </div>

              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Matriz Analizada</span>
                <span className="text-sm font-semibold text-cyan-300 block mt-1">
                  {estudio.matriz}
                </span>
                <span className="text-[10px] text-slate-400 truncate block">{estudio.especie}</span>
              </div>
            </div>

            <div className="text-xs space-y-1 pt-2 border-t border-slate-800/80 text-slate-300">
              <p><strong className="text-slate-400">Método de Laboratorio:</strong> {estudio.metodo_analisis}</p>
              <p><strong className="text-slate-400">Laboratorio:</strong> {estudio.laboratorio}</p>
              <p><strong className="text-slate-400">Criterio de Referencia Aplicado:</strong> {estudio.criterio_referencia}</p>
            </div>
          </div>

          {/* Resumen del Estudio */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resumen Científico</h4>
            <p className="text-xs leading-relaxed text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
              {estudio.resumen}
            </p>
          </div>

          {/* Citas de página y Trazabilidad Documental */}
          {estudio.citas_pagina && estudio.citas_pagina.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Trazabilidad Documental (Citas de Página)
              </h4>
              <div className="space-y-2">
                {estudio.citas_pagina.map((cita, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950/80 border-l-2 border-cyan-500 rounded-r-lg text-xs">
                    <span className="text-[10px] font-bold text-cyan-400 block mb-1">
                      PÁGINA {cita.pagina} DEL DOCUMENTO ORIGINAL:
                    </span>
                    <p className="italic text-slate-300 text-[11px] leading-relaxed">
                      "{cita.fragmento}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vacíos de Investigación Identificados */}
          {estudio.vacios_asociados && (
            <div className="p-3 bg-amber-950/30 border border-amber-900/60 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                <Info className="w-4 h-4 shrink-0" />
                Vacíos de Información & Recomendación
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {estudio.vacios_asociados}
              </p>
            </div>
          )}
        </div>

        {/* Pie de modal con enlace directo a la fuente oficial */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Estado: <strong className="text-emerald-300">{estudio.estado_validacion.replace('_', ' ')}</strong>
          </div>

          <a
            href={estudio.enlace_fuente}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-cyan-600/30"
          >
            <span>Ver Documento Fuente</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
