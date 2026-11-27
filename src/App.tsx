import React, { useState, useEffect } from 'react';
import { ESTUDIOS_INICIALES } from './data/initialData';
import { db } from './db/offlineDb';
import { EstudioCientifico, FiltrosObservatorio } from './types';
import { Satellite3DMap } from './components/map/Satellite3DMap';
import { StudyDetailModal } from './components/catalog/StudyDetailModal';
import { StudyCatalogView } from './components/catalog/StudyCatalogView';
import { DocumentAiView } from './components/doc-ai/DocumentAiView';
import { GapsAnalysisView } from './components/analysis/GapsAnalysisView';
import { FoodSafetyView } from './components/food-safety/FoodSafetyView';
import { OfflineSyncView } from './components/offline/OfflineSyncView';
import { 
  Globe2, 
  BookOpen, 
  Sparkles, 
  PieChart, 
  Fish, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  Database,
  Layers
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mapa' | 'catalogo' | 'doc-ai' | 'vacios' | 'peces' | 'offline'>('mapa');
  const [estudios, setEstudios] = useState<EstudioCientifico[]>(ESTUDIOS_INICIALES);
  const [estudioSeleccionado, setEstudioSeleccionado] = useState<EstudioCientifico | null>(null);
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  const [filtros, setFiltros] = useState<FiltrosObservatorio>({
    departamento: '',
    municipio: '',
    cuenca: '',
    matriz: '',
    clasificacion: '',
    tipoRegistro: '',
    anioMin: 2018,
    anioMax: 2025,
    busqueda: ''
  });

  // Escuchar estado online/offline
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Inicializar IndexedDB con estudios iniciales si está vacío
    db.estudios.count().then(count => {
      if (count === 0) {
        db.estudios.bulkAdd(ESTUDIOS_INICIALES);
      }
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Filtrado de estudios reactivo
  const estudiosFiltrados = estudios.filter((e) => {
    if (filtros.matriz && e.matriz !== filtros.matriz) return false;
    if (filtros.clasificacion && e.clasificacion_evidencia !== filtros.clasificacion) return false;
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      const match = 
        e.titulo.toLowerCase().includes(q) ||
        e.autores.toLowerCase().includes(q) ||
        e.institucion.toLowerCase().includes(q) ||
        e.comunidad.toLowerCase().includes(q) ||
        e.municipio.toLowerCase().includes(q) ||
        e.especie.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Handler para agregar un estudio aprobado por el revisor humano en el módulo Doc-AI
  const handleAprobarEstudio = (nuevoEstudio: EstudioCientifico) => {
    setEstudios(prev => [nuevoEstudio, ...prev]);
    db.estudios.put(nuevoEstudio);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Barra de Navegación Superior */}
      <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-black text-lg">
            Hg
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-white uppercase">
                Mercurio Map Bolivia
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                Subdesafío 3.3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Observatorio Geoespacial Inteligente · Cuenca Piloto Río Beni
            </p>
          </div>
        </div>

        {/* Pestañas de navegación central */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('mapa')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'mapa'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            Visor Satelital 3D
          </button>

          <button
            onClick={() => setActiveTab('catalogo')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'catalogo'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Catálogo Científico
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full font-mono text-cyan-300">
              {estudios.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('doc-ai')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'doc-ai'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            IA Documental
          </button>

          <button
            onClick={() => setActiveTab('vacios')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'vacios'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            Vacíos de Evidencia
          </button>

          <button
            onClick={() => setActiveTab('peces')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'peces'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Fish className="w-3.5 h-3.5" />
            Peces & Salud
          </button>

          <button
            onClick={() => setActiveTab('offline')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'offline'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Modo Rural Offline
          </button>
        </nav>

        {/* Indicadores de Estado y Cuenca */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
            online
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
              : 'bg-rose-950/60 border-rose-800 text-rose-400'
          }`}>
            {online ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{online ? 'En línea' : 'Offline'}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Datos Verificados</span>
          </div>
        </div>
      </header>

      {/* Navegación móvil inferior */}
      <div className="lg:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800 py-2 px-1 text-[10px] z-20 shrink-0">
        <button
          onClick={() => setActiveTab('mapa')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'mapa' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Globe2 className="w-4 h-4" />
          <span>Mapa 3D</span>
        </button>
        <button
          onClick={() => setActiveTab('catalogo')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'catalogo' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Catálogo</span>
        </button>
        <button
          onClick={() => setActiveTab('doc-ai')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'doc-ai' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>IA Docs</span>
        </button>
        <button
          onClick={() => setActiveTab('vacios')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'vacios' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <PieChart className="w-4 h-4" />
          <span>Vacíos</span>
        </button>
        <button
          onClick={() => setActiveTab('peces')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'peces' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Fish className="w-4 h-4" />
          <span>Peces/Salud</span>
        </button>
        <button
          onClick={() => setActiveTab('offline')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'offline' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Database className="w-4 h-4" />
          <span>Offline</span>
        </button>
      </div>

      {/* Área Principal de Contenido */}
      <main className="flex-1 relative overflow-hidden">
        {activeTab === 'mapa' && (
          <Satellite3DMap
            estudios={estudiosFiltrados}
            estudioSeleccionado={estudioSeleccionado}
            onSelectEstudio={setEstudioSeleccionado}
          />
        )}

        {activeTab === 'catalogo' && (
          <StudyCatalogView
            estudios={estudiosFiltrados}
            filtros={filtros}
            onFiltrosChange={setFiltros}
            onSelectEstudio={(e) => {
              setEstudioSeleccionado(e);
              setActiveTab('mapa');
            }}
          />
        )}

        {activeTab === 'doc-ai' && (
          <DocumentAiView
            onAprobarEstudio={(nuevo) => {
              handleAprobarEstudio(nuevo);
              setActiveTab('mapa');
              setEstudioSeleccionado(nuevo);
            }}
          />
        )}

        {activeTab === 'vacios' && (
          <GapsAnalysisView estudios={estudios} />
        )}

        {activeTab === 'peces' && (
          <FoodSafetyView />
        )}

        {activeTab === 'offline' && (
          <OfflineSyncView estudios={estudios} />
        )}

        {/* Modal de Detalle de Ficha Científica */}
        <StudyDetailModal
          estudio={estudioSeleccionado}
          onClose={() => setEstudioSeleccionado(null)}
        />
      </main>
    </div>
  );
};
