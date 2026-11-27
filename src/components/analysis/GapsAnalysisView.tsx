import React from 'react';
import { EstudioCientifico } from '../../types';
import { AlertCircle, PieChart, Layers, HelpCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  estudios: EstudioCientifico[];
}

export const GapsAnalysisView: React.FC<Props> = ({ estudios }) => {
  // Conteo por matriz
  const conteoMatrices = estudios.reduce((acc, curr) => {
    acc[curr.matriz] = (acc[curr.matriz] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Cuencas con cobertura vs cuencas con vacío
  const cuencasEstudiadas = [
    { nombre: 'Cuenca del Río Beni (Curso Medio / Rurrenabaque)', estudios: 3, estado: 'Monitoreo Periódico' },
    { nombre: 'Subcuenca Río Kaka / Mapiri (Guanay, Teoponte)', estudios: 2, estado: 'Monitoreo Puntual' },
    { nombre: 'Cuenca del Río Madre de Dios (Riberalta)', estudios: 1, estado: 'Estudio Preliminar' }
  ];

  const vaciosPrioritarios = [
    {
      zona: 'Cuenca del Río Tuichi (Parque Nacional Madidi)',
      vacio: 'Ausencia total de monitoreos recientes de bioacumulación en ictiofauna nativa.',
      prioridad: 'Alta',
      recomendacion: 'Diseñar expedición de muestreo en peces carnívoros aguas abajo de zonas de concesión.'
    },
    {
      zona: 'Comunidades Tsimane del Río Maniqui (San Borja)',
      vacio: 'Falta de biomonitoreo en cabello y orina de mujeres gestantes y niños.',
      prioridad: 'Muy Alta',
      recomendacion: 'Articular con el Servicio Departamental de Salud (SEDES Beni) para toma de muestras voluntarias.'
    },
    {
      zona: 'Cuenca del Río Iténez / Guaporé',
      vacio: 'Sin datos geoquímicos estandarizados de sedimentos en lecho activo binacional.',
      prioridad: 'Media',
      recomendacion: 'Estudio coordinado interinstitucional entre UMSA y universidades brasileñas.'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto p-6 space-y-6">
      
      {/* Cabecera */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <PieChart className="w-4 h-4 text-cyan-400" />
            Módulo 4 · Análisis Geoespacial & Detección de Vacíos
          </div>
          <h2 className="text-xl font-bold text-white">Vacíos de Información Científica y Oportunidades de Monitoreo</h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Identifica qué cuencas, especies y matrices cuentan con evidencia sólida y en qué regiones críticas existe un vacío documental que requiere nuevos proyectos de investigación.
          </p>
        </div>

        <div className="p-3 bg-amber-950/60 border border-amber-900 rounded-xl text-xs text-amber-300 max-w-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span><strong>Principio metodológico:</strong> Un vacío de investigación no equivale a contaminación ni a seguridad ambiental. Indica necesidad de muestreo.</span>
        </div>
      </div>

      {/* Tarjetas de Cobertura de Matrices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(conteoMatrices).map(([matriz, count]) => (
          <div key={matriz} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">{matriz}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white font-mono">{count}</span>
              <span className="text-xs text-slate-400">{count === 1 ? 'estudio registrado' : 'estudios registrados'}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (count / estudios.length) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Grilla: Cuencas Monitoreadas vs Vacíos Críticos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cuencas con investigaciones registradas */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="font-semibold text-sm text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Cuencas con Evidencia Científica Registrada
          </h3>

          <div className="space-y-3">
            {cuencasEstudiadas.map((c, i) => (
              <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{c.nombre}</h4>
                  <span className="text-[11px] text-slate-400">Estado: {c.estado}</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded">
                  {c.estudios} estudios
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vacíos Críticos Identificados */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="font-semibold text-sm text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Vacíos de Investigación Críticos (Prioridades)
          </h3>

          <div className="space-y-3">
            {vaciosPrioritarios.map((v, i) => (
              <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200">{v.zona}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    v.prioridad === 'Muy Alta'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    Prioridad: {v.prioridad}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">{v.vacio}</p>
                <p className="text-[10px] text-cyan-400 mt-1">
                  <strong>Acción sugerida:</strong> {v.recomendacion}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
