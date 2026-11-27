import Dexie, { Table } from 'dexie';
import { EstudioCientifico } from '../types';

export interface ObservacionLocal {
  id?: number;
  comunidad: string;
  municipio: string;
  departamento: string;
  cuenca: string;
  lat: number;
  lng: number;
  matriz: string;
  descripcion: string;
  responsable: string;
  fecha: string;
  sincronizado: boolean;
}

export class MercurioDatabase extends Dexie {
  estudios!: Table<EstudioCientifico, string>;
  observacionesLocales!: Table<ObservacionLocal, number>;

  constructor() {
    super('MercurioMapBoliviaDB');
    this.version(1).stores({
      estudios: 'id, cuenca, departamento, municipio, matriz, clasificacion_evidencia, anio_publicacion, tipo_registro',
      observacionesLocales: '++id, comunidad, sincronizado, fecha'
    });
  }
}

export const db = new MercurioDatabase();
