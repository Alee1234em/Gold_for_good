import React, { useState } from 'react';
import { ESPECIES_PECES_GUIA } from '../../data/initialData';
import { Fish, HeartPulse, AlertTriangle, ShieldCheck, Info, BookOpen, Activity } from 'lucide-react';

export const FoodSafetyView: React.FC = () => {
  const [tab, setTab] = useState<'peces' | 'salud'>('peces');

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto p-6 space-y-6">
      
      {/* Cabecera y Navegación entre Pescados y Salud */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Fish className="w-4 h-4 text-cyan-400" />
            Módulos 6 y 7 · Seguridad Alimentaria y Salud Pública
          </div>
          <h2 className="text-xl font-bold text-white">Guía Científica de Ictiofauna y Orientación Preventiva</h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Información basada en publicaciones de la UMSA y la OMS. No se declaran especies universalmente seguras ni peligrosas: la bioacumulación varía según la posición trófica, talla y tramo del río.
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setTab('peces')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              tab === 'peces'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Fish className="w-4 h-4" />
            Especies de Peces y Consumo
          </button>
          <button
            onClick={() => setTab('salud')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              tab === 'salud'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            Orientación Sanitaria y Síntomas
          </button>
        </div>
      </div>

      {tab === 'peces' ? (
        <div className="space-y-4">
          <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs text-cyan-300 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              <strong>Límite de la OMS/FAO:</strong> 0.5 mg/kg (ppm) de mercurio total en pescado para consumo de la población general (0.2 mg/kg para grupos vulnerables).
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ESPECIES_PECES_GUIA.map((pez, idx) => {
              const isAlto = pez.riesgoBioacumulacion === 'Muy Alto';
              const isBajo = pez.riesgoBioacumulacion === 'Bajo';

              return (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-base text-white">{pez.nombreComun}</h3>
                        <p className="text-[11px] italic text-slate-400">{pez.nombreCientifico}</p>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isAlto
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : isBajo
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        Riesgo: {pez.riesgoBioacumulacion}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 pt-2 border-t border-slate-800 text-slate-300">
                      <p><strong className="text-slate-400">Nivel Trófico:</strong> {pez.nivelTrofico}</p>
                      <p><strong className="text-slate-400">Concentración Típica:</strong> <span className="font-mono text-cyan-300 font-semibold">{pez.concentracionTipicaPpm}</span></p>
                      <p><strong className="text-slate-400">Cuenca Reportada:</strong> {pez.cuencaReportada}</p>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 mt-2">
                        {pez.recomendacionConsumo}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                    Fuente: {pez.fuenteEstudio}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Tab de Orientación Sanitaria */
        <div className="space-y-6">
          <div className="p-4 bg-amber-950/40 border border-amber-900/60 rounded-xl text-xs text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Aviso Médico Preventivo:</strong> Este módulo tiene fines educativos y preventivos basados en lineamientos de la OMS y el Ministerio de Salud y Deportes de Bolivia. No realiza diagnósticos clínicos individuales ni reemplaza la consulta con un médico toxicológico.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Formas del mercurio */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Formas Químicas del Mercurio
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-cyan-300 block">1. Mercurio Metálico / Elemental (Hg0):</strong>
                  Vapor liberado durante el quemado de la amalgama de oro. Exposición ocupacional por inhalación directa en barracas y talleres.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-cyan-300 block">2. Metilmercurio (MeHg):</strong>
                  Forma orgánica altamente neurotóxica producida por bacterias en sedimentos acuáticos. Se bioacumula en la carne de pescado consumida por comunidades ribereñas.
                </div>
              </div>
            </div>

            {/* Grupos vulnerables y Síntomas */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-400" />
                Grupos Vulnerables y Síntomas de Alerta
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-rose-300 block">Grupos de Mayor Riesgo:</strong>
                  Mujeres embarazadas, lactantes y niños menores de 5 años. El metilmercurio atraviesa fácilmente la barrera placentaria y hematoencefálica.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block">Síntomas Neurotóxicos Tempranos:</strong>
                  Parestesia (hormigueo en dedos y labios), temblores finos en manos, pérdida de agudeza visual periférica, dificultades de coordinación motriz y problemas de aprendizaje en niños.
                </div>
              </div>
            </div>

            {/* Diagnóstico y Centros de Atención */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Pruebas de Diagnóstico y Atención
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-emerald-300 block">Pruebas Diagnósticas Oficiales:</strong>
                  Análisis de mercurio total en cabello (refleja exposición alimentaria crónica) y mercurio en orina de 24 horas (exposición ocupacional aguda por vapores).
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-slate-200 block">Centros de Referencia en Bolivia:</strong>
                  Hospital de Clínicas (La Paz), Instituto de Salud Ocupacional (INSO), Hospital de Rurrenabaque y centros de la Red de Salud de la Amazonía.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
