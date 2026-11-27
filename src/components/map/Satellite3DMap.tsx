import React, { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibreMap, Marker, NavigationControl, FullscreenControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { EstudioCientifico } from '../../types';
import { GEOJSON_CUENCA_PILOTO } from '../../data/initialData';
import { Layers, Compass, Eye, ShieldAlert, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface Props {
  estudios: EstudioCientifico[];
  estudioSeleccionado: EstudioCientifico | null;
  onSelectEstudio: (estudio: EstudioCientifico | null) => void;
}

export const Satellite3DMap: React.FC<Props> = ({
  estudios,
  estudioSeleccionado,
  onSelectEstudio
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [mapStyle, setMapStyle] = useState<'satellite' | 'topo' | 'dark'>('satellite');
  const [is3D, setIs3D] = useState<boolean>(true);

  // Inicialización del mapa MapLibre
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Configuración de capas ráster estilo Google Earth (Esri World Imagery HD)
    const mapStyleConfig: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        'satellite-tiles': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
        },
        'osm-tiles': {
          type: 'raster',
          tiles: [
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors'
        },
        'cuenca-piloto': {
          type: 'geojson',
          data: GEOJSON_CUENCA_PILOTO as any
        }
      },
      layers: [
        {
          id: 'satellite-layer',
          type: 'raster',
          source: 'satellite-tiles',
          layout: {
            visibility: 'visible'
          }
        },
        {
          id: 'cuenca-fill',
          type: 'fill',
          source: 'cuenca-piloto',
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'fill-color': '#00B4D8',
            'fill-opacity': 0.12
          }
        },
        {
          id: 'cuenca-boundary',
          type: 'line',
          source: 'cuenca-piloto',
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'line-color': '#00B4D8',
            'line-width': 2.5,
            'line-dasharray': [3, 2]
          }
        },
        {
          id: 'rios-layer',
          type: 'line',
          source: 'cuenca-piloto',
          filter: ['==', '$type', 'LineString'],
          paint: {
            'line-color': [
              'match',
              ['get', 'impacto'],
              'MUY_ALTO', '#E63946',
              'ALTO', '#FFB703',
              'PRISTINO', '#06D6A0',
              '#38BDF8'
            ],
            'line-width': 3.5,
            'line-opacity': 0.85
          }
        }
      ]
    };

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyleConfig,
      center: [-67.65, -14.85], // Centrado en la Cuenca del Río Beni
      zoom: 7.2,
      pitch: 45, // Inclinación 3D tipo Google Earth
      bearing: -15, // Orientación en perspectiva
      maxPitch: 75
    });

    mapInstance.addControl(new NavigationControl({ visualizePitch: true }), 'top-right');
    mapInstance.addControl(new FullscreenControl(), 'top-right');

    map.current = mapInstance;

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, []);

  // Cambiar entre estilo Satélite (Google Earth), Topográfico o Científico
  useEffect(() => {
    if (!map.current) return;
    const m = map.current;

    if (m.isStyleLoaded()) {
      if (m.getLayer('satellite-layer')) {
        m.setLayoutProperty(
          'satellite-layer',
          'visibility',
          mapStyle === 'satellite' ? 'visible' : 'none'
        );
      }
    }
  }, [mapStyle]);

  // Actualizar marcadores científicos con semáforo analítico estricto
  useEffect(() => {
    if (!map.current) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    estudios.forEach(estudio => {
      const el = document.createElement('div');
      el.className = 'custom-marker cursor-pointer group transition-transform hover:scale-125';

      let bgColor = 'bg-slate-500';
      let ringColor = 'ring-slate-400';
      let icon = '🔬';

      if (estudio.clasificacion_evidencia === 'CONTAMINACION_CONFIRMADA') {
        bgColor = 'bg-rose-600';
        ringColor = 'ring-rose-400 ring-4';
        icon = '⚠️';
      } else if (estudio.clasificacion_evidencia === 'SIN_EXCEDENCIA') {
        bgColor = 'bg-emerald-600';
        ringColor = 'ring-emerald-400 ring-2';
        icon = '✅';
      } else if (estudio.clasificacion_evidencia === 'BAJO_INVESTIGACION') {
        bgColor = 'bg-amber-500';
        ringColor = 'ring-amber-300 ring-2';
        icon = '🔍';
      }

      el.innerHTML = `
        <div class="relative flex items-center justify-center w-9 h-9 rounded-full ${bgColor} ${ringColor} text-white shadow-xl shadow-black/40">
          <span class="text-sm">${icon}</span>
          <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-slate-900 rounded-full border border-white flex items-center justify-center text-[8px] font-bold">
            ${estudio.matriz === 'Cabello humano' ? '👤' : estudio.matriz === 'Peces' ? '🐟' : '💧'}
          </span>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectEstudio(estudio);
        if (map.current) {
          map.current.flyTo({
            center: [estudio.coordenadas.lng, estudio.coordenadas.lat],
            zoom: 9.5,
            pitch: 50,
            duration: 1500
          });
        }
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([estudio.coordenadas.lng, estudio.coordenadas.lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [estudios, onSelectEstudio]);

  // Si se selecciona un estudio desde el catálogo, volar hacia él
  useEffect(() => {
    if (!estudioSeleccionado || !map.current) return;
    map.current.flyTo({
      center: [estudioSeleccionado.coordenadas.lng, estudioSeleccionado.coordenadas.lat],
      zoom: 10,
      pitch: 55,
      bearing: -20,
      duration: 1200
    });
  }, [estudioSeleccionado]);

  // Alternar vista 3D / 2D
  const toggle3D = () => {
    if (!map.current) return;
    if (is3D) {
      map.current.easeTo({ pitch: 0, bearing: 0, duration: 800 });
      setIs3D(false);
    } else {
      map.current.easeTo({ pitch: 55, bearing: -15, duration: 800 });
      setIs3D(true);
    }
  };

  const setViewFocus = (preset: 'cuenca' | 'kaka' | 'rurre' | 'madre') => {
    if (!map.current) return;
    if (preset === 'cuenca') {
      map.current.flyTo({ center: [-67.65, -14.85], zoom: 7.2, pitch: 45, bearing: -15 });
    } else if (preset === 'kaka') {
      map.current.flyTo({ center: [-67.8814, -15.4981], zoom: 10.5, pitch: 60, bearing: -30 });
    } else if (preset === 'rurre') {
      map.current.flyTo({ center: [-67.5319, -14.4411], zoom: 11, pitch: 55, bearing: 10 });
    } else if (preset === 'madre') {
      map.current.flyTo({ center: [-66.1000, -10.9833], zoom: 9, pitch: 40, bearing: 0 });
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      {/* Contenedor del Mapa MapLibre GL */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Controles flotantes superiores estilo Earth */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2 shadow-2xl flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-950/70 border border-cyan-800/80 text-cyan-300 rounded-md font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Visor Satelital 3D (Google Earth Style)
          </div>

          <button
            onClick={toggle3D}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1 ${
              is3D
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Alternar entre perspectiva 3D oblicua y mapa 2D"
          >
            <Compass className={`w-3.5 h-3.5 ${is3D ? 'rotate-45' : ''} transition-transform`} />
            {is3D ? '3D Activo' : 'Planta 2D'}
          </button>

          <button
            onClick={() => setMapStyle(mapStyle === 'satellite' ? 'topo' : 'satellite')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-all flex items-center gap-1"
            title="Alternar capas satelital o topográfica"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            {mapStyle === 'satellite' ? 'Satélite HD' : 'Topográfico'}
          </button>
        </div>

        {/* Marcadores rápidos de cuencas de interés */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm p-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
          <span className="text-slate-400 font-medium pl-1">Vistas rápidas:</span>
          <button
            onClick={() => setViewFocus('cuenca')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
          >
            Cuenca Río Beni
          </button>
          <button
            onClick={() => setViewFocus('kaka')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 transition"
          >
            Cabecera Kaka (Guanay)
          </button>
          <button
            onClick={() => setViewFocus('rurre')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 transition"
          >
            Rurrenabaque / Esse Ejja
          </button>
          <button
            onClick={() => setViewFocus('madre')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
          >
            Madre de Dios
          </button>
        </div>
      </div>

      {/* Leyenda científica flotante inferior */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 shadow-2xl text-xs max-w-sm">
        <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-cyan-400" />
          Semáforo de Evidencia Analítica
        </h4>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
            <span className="text-slate-300">Contaminación confirmada (&gt; norma OMS/USEPA)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            <span className="text-slate-300">Sin excedencia del criterio de referencia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
            <span className="text-slate-300">Bajo investigación / Alerta comunitaria</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>Líneas de río: <strong className="text-rose-400">Rojo</strong> = Minería aurífera activa</span>
          <span className="text-emerald-400">Verde = Prístino</span>
        </div>
      </div>
    </div>
  );
};
