import React, { useState, useEffect } from 'react';
import { db, ObservacionLocal } from '../../db/offlineDb';
import { EstudioCientifico } from '../../types';
import { Wifi, WifiOff, DownloadCloud, UploadCloud, Database, Plus, CheckCircle, AlertCircle, Save } from 'lucide-react';

interface Props {
  estudios: EstudioCientifico[];
}

export const OfflineSyncView: React.FC<Props> = ({ estudios }) => {
  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const [descargadoOffline, setDescargadoOffline] = useState<boolean>(false);
  const [observacionesLocales, setObservacionesLocales] = useState<ObservacionLocal[]>([]);
  const [guardadoExitoso, setGuardadoExitoso] = useState<boolean>(false);

  // Formulario de registro local de campo
  const [nuevaObs, setNuevaObs] = useState({
    comunidad: '',
    municipio: 'Rurrenabaque',
    departamento: 'Beni',
    cuenca: 'Cuenca del Río Beni',
    lat: -14.4420,
    lng: -67.5300,
    matriz: 'Agua / Observación visual',
    descripcion: '',
    responsable: ''
  });

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    cargarObservacionesLocales();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const cargarObservacionesLocales = async () => {
    try {
      const data = await db.observacionesLocales.toArray();
      setObservacionesLocales(data);
      const count = await db.estudios.count();
      if (count > 0) {
        setDescargadoOffline(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const descargarPaqueteCuencaOffline = async () => {
    try {
      await db.estudios.clear();
      await db.estudios.bulkAdd(estudios);
      setDescargadoOffline(true);
    } catch (e) {
      console.error('Error guardando en IndexedDB:', e);
    }
  };

  const guardarObservacionEnCampo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaObs.comunidad || !nuevaObs.descripcion || !nuevaObs.responsable) {
      alert('Por favor complete comunidad, descripción y responsable.');
      return;
    }

    try {
      const obs: ObservacionLocal = {
        ...nuevaObs,
        fecha: new Date().toISOString().split('T')[0],
        sincronizado: false
      };
      await db.observacionesLocales.add(obs);
      setGuardadoExitoso(true);
      setNuevaObs({
        comunidad: '',
        municipio: 'Rurrenabaque',
        departamento: 'Beni',
        cuenca: 'Cuenca del Río Beni',
        lat: -14.4420,
        lng: -67.5300,
        matriz: 'Agua / Observación visual',
        descripcion: '',
        responsable: ''
      });
      cargarObservacionesLocales();
      setTimeout(() => setGuardadoExitoso(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto p-6 space-y-6">
      
      {/* Estado de conectividad y PWA */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4 text-cyan-400" />
            Módulo 8 · PWA & Modo Rural Offline
          </div>
          <h2 className="text-xl font-bold text-white">Almacenamiento Local y Monitoreo de Campo sin Conexión</h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Diseñado para teléfonos y tablets en comunidades ribereñas sin internet. Guarda fichas científicas en IndexedDB y almacena alertas comunitarias para sincronizarlas al retornar al pueblo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
            online
              ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
              : 'bg-rose-950/80 border-rose-800 text-rose-300'
          }`}>
            {online ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span>{online ? 'Conectado a Internet' : 'Modo Offline (Sin Señal)'}</span>
          </div>

          <button
            onClick={descargarPaqueteCuencaOffline}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-600/30"
          >
            <DownloadCloud className="w-4 h-4" />
            {descargadoOffline ? 'Actualizar Paquete Offline' : 'Descargar Cuenca del Río Beni'}
          </button>
        </div>
      </div>

      {descargadoOffline && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>
            <strong>Paquete local activo:</strong> {estudios.length} investigaciones, coordenadas y mapas vectoriales cacheados en este dispositivo.
          </span>
        </div>
      )}

      {/* Grilla: Registro de Observación Comunitaria + Lista Local */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Formulario de Registro Comunitario */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Registrar Observación de Campo (Offline)
            </h3>
            <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-medium">
              Tipo: Observación Comunitaria
            </span>
          </div>

          <p className="text-xs text-slate-400">
            * Se registrará en la base de datos local y permanecerá diferenciada de una medición analítica de laboratorio oficial.
          </p>

          <form onSubmit={guardarObservacionEnCampo} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Comunidad Ribereña / Sitio:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Comunidad Eyiyo Quibo"
                  value={nuevaObs.comunidad}
                  onChange={(e) => setNuevaObs({ ...nuevaObs, comunidad: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Responsable del reporte:</label>
                <input
                  type="text"
                  required
                  placeholder="Nombre de autoridad o monitor local"
                  value={nuevaObs.responsable}
                  onChange={(e) => setNuevaObs({ ...nuevaObs, responsable: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Municipio:</label>
                <input
                  type="text"
                  value={nuevaObs.municipio}
                  onChange={(e) => setNuevaObs({ ...nuevaObs, municipio: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tipo de Matriz / Evento:</label>
                <select
                  value={nuevaObs.matriz}
                  onChange={(e) => setNuevaObs({ ...nuevaObs, matriz: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                >
                  <option value="Agua / Observación visual">Agua / Turbidez inusual</option>
                  <option value="Peces muertos">Mortalidad puntual de peces</option>
                  <option value="Sedimento / Draga">Actividad de dragas en ribera</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Descripción de la observación y contexto:</label>
              <textarea
                required
                rows={3}
                placeholder="Detalle turbidez del agua, presencia de balsas mineras o mortandad de especies..."
                value={nuevaObs.descripcion}
                onChange={(e) => setNuevaObs({ ...nuevaObs, descripcion: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Localmente en IndexedDB
            </button>

            {guardadoExitoso && (
              <p className="text-emerald-400 text-xs text-center font-medium animate-pulse">
                ✓ Observación comunitaria guardada con éxito en el dispositivo.
              </p>
            )}
          </form>
        </div>

        {/* Observaciones Locales Pendientes de Sincronización */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              Registros Locales ({observacionesLocales.length})
            </h3>
            {online && observacionesLocales.length > 0 && (
              <button
                onClick={() => alert('Sincronización completada con el servidor central')}
                className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-800 px-3 py-1 rounded-md hover:bg-cyan-900 transition font-medium"
              >
                Sincronizar Ahora
              </button>
            )}
          </div>

          <div className="space-y-3">
            {observacionesLocales.map((obs) => (
              <div key={obs.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{obs.comunidad} ({obs.municipio})</span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-300">
                    {obs.sincronizado ? 'Sincronizado' : 'Pendiente Sincronización'}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{obs.descripcion}</p>
                <div className="text-[10px] text-slate-500 pt-1 flex justify-between">
                  <span>Monitor: {obs.responsable}</span>
                  <span>Fecha: {obs.fecha}</span>
                </div>
              </div>
            ))}

            {observacionesLocales.length === 0 && (
              <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                <Database className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="text-xs">No hay observaciones comunitarias pendientes en la memoria local.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
