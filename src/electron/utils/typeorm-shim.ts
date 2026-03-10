/**
 * Shim para interceptar los require() dinámicos de TypeORM
 * y evitar que intente cargar drivers opcionales no instalados.
 *
 * Este archivo debe importarse ANTES que typeorm en el entry point.
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// Obtener ruta absoluta para require
const __filename = fileURLToPath(import.meta.url);

// Crear require para módulos ES
const _require = createRequire(__filename);
const Module = _require('module');
const originalRequire = Module.prototype.require;

// Lista de dependencias opcionales de TypeORM que deben ser ignoradas
const optionalDependencies = new Set([
  '@google-cloud/spanner',
  'sql.js',
  'mysql',
  'mysql2',
  'pg',
  'pg-query-stream',
  'mssql',
  'tedious',
  'oracledb',
  'ioredis',
  'redis',
  'mongodb',
  'aurora-data-api',
  'aurora-data-api-mysql',
  'react-native-sqlite',
  'expo-sqlite',
  'hdb-pool',
  'typeorm-aurora-data-api-driver',
  '@sap/hana-client',
  '@sap/hana-client/extension/Stream',
  '@sqltools/formatter',
  'ora',
  'chalk',
  'cli-highlight',
  'debug',
  'sha.js'
]);

// Intercepta require()
Module.prototype.require = function(id: string) {
  if (optionalDependencies.has(id)) {
    try {
      return originalRequire.apply(this, [id]);
    } catch (e) {
      // Retornar un objeto vacío para simular módulo instalado
      return { default: null, __esModule: true };
    }
  }
  return originalRequire.apply(this, [id]);
};

// Efecto secundario explícito para evitar tree-shaking
console.log('[TypeORM Shim] Registered optional dependencies interceptor');
