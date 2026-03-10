/**
 * Script para limpiar los errores de dependencias opcionales de TypeORM
 * en el archivo main.js generado por vite-plugin-electron
 */

const fs = require('fs');
const path = require('path');

const distElectronPath = path.join(__dirname, '..', 'dist-electron', 'main.mjs');

function cleanTypeOrmErrors() {
  if (!fs.existsSync(distElectronPath)) {
    console.log('[clean-typeorm-errors] main.mjs no existe, saltando...');
    return;
  }

  try {
    let content = fs.readFileSync(distElectronPath, 'utf-8');
    let modified = false;

    // Agregar polyfill para __dirname y __filename al inicio del archivo (después de reflect-metadata)
    const polyfill = 'import { fileURLToPath as __f$ } from "url"; import { dirname as __d$ } from "path"; globalThis.__filename = __f$(import.meta.url); globalThis.__dirname = __d$(globalThis.__filename);\n';

    // Insertar después del primer import
    const firstImportMatch = content.match(/^(import[\s\S]*?["'][^"']*["'];?\n)/);
    if (firstImportMatch && !content.includes('globalThis.__dirname =')) {
      const insertPos = firstImportMatch[1].length;
      content = content.slice(0, insertPos) + polyfill + content.slice(insertPos);
      modified = true;
      console.log('[clean-typeorm-errors] Polyfill agregado');
    }

    // Reemplazar los throws de errores con código que retorna módulos vacíos
    const errorPattern = /throw new Error\(`Could not resolve "[^"]+" imported by "typeorm"\. Is it installed\?`\);/g;
    const replacement1 = '/* optional dep removed */';

    const newContent1 = content.replace(errorPattern, replacement1);
    if (newContent1 !== content) {
      content = newContent1;
      modified = true;
      console.log('[clean-typeorm-errors] Errores "Could not resolve" limpiados');
    }

    // Reemplazar los throws de DriverPackageNotInstalledError
    // Formato 1: throw new DriverPackageNotInstalledError_1.DriverPackageNotInstalledError("Mysql", connectorPackage);
    const driverErrorPattern = /throw new DriverPackageNotInstalledError_1\.DriverPackageNotInstalledError\([^)]+\);/g;
    const replacement2 = '/* driver not installed - skipped */';

    const newContent2 = content.replace(driverErrorPattern, replacement2);
    if (newContent2 !== content) {
      content = newContent2;
      modified = true;
      console.log('[clean-typeorm-errors] Errores "DriverPackageNotInstalledError_1" limpiados');
    }

    // Formato 2: throw new error_1.DriverPackageNotInstalledError("SQLite", "better-sqlite3");
    const driverErrorPattern2 = /throw new error_1\.DriverPackageNotInstalledError\([^)]+\);/g;
    const replacement3 = '/* driver not installed - skipped */';

    const newContent3 = content.replace(driverErrorPattern2, replacement3);
    if (newContent3 !== content) {
      content = newContent3;
      modified = true;
      console.log('[clean-typeorm-errors] Errores "error_1.DriverPackageNotInstalledError" limpiados');
    }

    if (modified) {
      fs.writeFileSync(distElectronPath, content, 'utf-8');
      console.log('[clean-typeorm-errors] Archivo actualizado');
    } else {
      console.log('[clean-typeorm-errors] No se encontraron errores que limpiar');
    }
  } catch (error) {
    console.error('[clean-typeorm-errors] Error:', error.message);
  }
}

cleanTypeOrmErrors();
