import React from 'react';
import { EstudioCientifico, FiltrosObservatorio } from '../../types';
import { Search, Download, Filter, FileText, ChevronRight, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface Props {
  estudios: EstudioCientifico[];
  filtros: FiltrosObservatorio;
  onFiltrosChange: (filtros: FiltrosObservatorio) => void;
  onSelectEstudio: (estudio: EstudioCientifico) => void;
}

export const StudyCatalogView: React.FC<Props> = ({
  estudios,
  filtros,
  onFiltrosChange,
  onSelectEstudio
}) => {
  const exportData = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(estudios, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mercurio_map_bolivia_estudios_${Date.now()}.json`;
      a.click();
    } else {
      const headers = ['ID', 'Titulo', 'Institucion', 'Anio_Pub', 'Cuenca', 'Matriz', 'Conc_Media', 'Unidad', 'Clasificacion', 'Fuente'];
      const rows = estudios.map(e => [
        `"${e.id}"`,
        `"${e.titulo.replace(/"/g, '""')}"`,
        `"${e.institucion}"`,
        e.anio_publicacion,
        `"${e.cuenca}"`,
        `"${e.matriz}"`,
        e.concentracion_media ?? '',
        `"${e.unidad}"`,
        `"${e.clasificacion_evidencia}"`,
        `"${e.enlace_fuente}"`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mercurio_map_bolivia_catalogo.csv`;
      a.click();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
      {/* Barra de control superior */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título, autor, comunidad, especie o institución..."
              value={filtros.busqueda}
              onChange={(e) => onFiltrosChange({ ...filtros, busqueda: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-cyan-400 text-slate-200"
            />
          </div>

          <select
            value={filtros.matriz}
            onChange={(e) => onFiltrosChange({ ...filtros, matriz: e.target.value })}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="">Todas las Matrices</option>
            <option value="Cabello humano">Cabello humano</option>
            <option value="Peces">Peces</option>
            <option value="Agua superficial">Agua superficial</option>
            <option value="Sedimentos">Sedimentos</option>
          </select>

          <select
            value={filtros.clasificacion}
            onChange={(e) => onFiltrosChange({ ...filtros, clasificacion: e.target.value })}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="">Toda Clasificación</option>
            <option value="CONTAMINACION_CONFIRMADA">Contaminación confirmada</option>
            <option value="SIN_EXCEDENCIA">Sin excedencia</option>
            <option value="BAJO_INVESTIGACION">Bajo investigación</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            Mostrando <strong>{estudios.length}</strong> investigaciones
          </span>
          <button
            onClick={() => exportData('csv')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            CSV
          </button>
          <button
            onClick={() => exportData('json')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            JSON
          </button>
        </div>
      </div>

      {/* Lista / Tabla de investigaciones */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {estudios.map((est) => {
          const isConfirmed = est.clasificacion_evidencia === 'CONTAMINACION_CONFIRMADA';
          const isNoExceed = est.clasificacion_evidencia === 'SIN_EXCEDENCIA';

          return (
            <div
              key={est.id}
              onClick={() => onSelectEstudio(est)}
              className="p-4 bg-slate-950/70 border border-slate-800 hover:border-cyan-500/60 rounded-xl cursor-pointer transition-all hover:shadow-xl hover:shadow-cyan-950/20 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                      {est.id}
                    </span>
                    <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {est.institucion} ({est.anio_publicacion})
                    </span>
                    <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      Cuenca: {est.cuenca}
                    </span>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                      isConfirmed
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                        : isNoExceed
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    }`}>
                      {isConfirmed && <AlertTriangle className="w-3 h-3" />}
                      {isNoExceed && <CheckCircle className="w-3 h-3" />}
                      {est.clasificacion_evidencia.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition">
                    {est.titulo}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {est.resumen}
                  </p>
                </div>

                {/* Métricas destacadas */}
                <div className="text-right shrink-0 min-w-[120px] p-2 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Matriz</span>
                  <span className="text-xs font-bold text-cyan-300 block">{est.matriz}</span>
                  <div className="mt-1">
                    <span className="text-[10px] text-slate-400 block">Concentración media</span>
                    <span className="text-sm font-bold font-mono text-white">
                      {est.concentracion_media !== null ? `${est.concentracion_media} ${est.unidad}` : 'No cuantif.'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Sitio: <strong className="text-slate-300">{est.comunidad} ({est.municipio})</strong></span>
                <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Ver Ficha Completa y Citas
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}

        {estudios.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm">No se encontraron investigaciones con los filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  );
};
