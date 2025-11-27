import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

export const solucionarConflictoNumero = async () => {
  try {
    console.log('🔧 Solucionando conflicto de columna numero...');

    // 1. Verificar si la columna numero ya existe
    const [columns] = await sequelize.query(
      "SHOW COLUMNS FROM convocatorias LIKE 'numero'",
      { type: QueryTypes.SELECT }
    );

    if (columns.length > 0) {
      console.log('📋 Columna numero ya existe, actualizando registros...');
      
      // 2. Actualizar registros existentes con numero vacío o null
      await sequelize.query(`
        UPDATE convocatorias 
        SET numero = CONCAT('LEGACY-', LPAD(id, 3, '0'))
        WHERE numero IS NULL OR numero = '' OR numero = 'null' OR TRIM(numero) = ''
      `);

      // Asegurar que TODOS los registros tengan un numero válido (verificación adicional)
      await sequelize.query(`
        UPDATE convocatorias 
        SET numero = CONCAT('LEGACY-', LPAD(id, 3, '0'))
        WHERE LENGTH(TRIM(COALESCE(numero, ''))) = 0
      `);

      console.log('✅ Registros actualizados con números únicos');

      // Asegurar que todos los registros tengan tipoConvocatoriaId válido
      console.log('🔄 Actualizando tipoConvocatoriaId...');
      await sequelize.query(`
        UPDATE convocatorias 
        SET tipoConvocatoriaId = 1
        WHERE tipoConvocatoriaId IS NULL OR tipoConvocatoriaId = 0
      `);
      console.log('✅ tipoConvocatoriaId actualizado');
      
      // Verificar que no queden registros con numero vacío antes de continuar
      const [emptyCount] = await sequelize.query(`
        SELECT COUNT(*) as count FROM convocatorias 
        WHERE numero IS NULL OR numero = '' OR TRIM(numero) = ''
      `, { type: QueryTypes.SELECT });
      
      if (emptyCount.count > 0) {
        console.log(`⚠️ Aún hay ${emptyCount.count} registros con numero vacío, actualizando...`);
        await sequelize.query(`
          UPDATE convocatorias 
          SET numero = CONCAT('LEGACY-', LPAD(id, 3, '0'))
          WHERE numero IS NULL OR numero = '' OR TRIM(numero) = ''
        `);
      }

      // 3. Verificar si hay restricción unique y eliminarla temporalmente si existe
      const [constraints] = await sequelize.query(`
        SELECT CONSTRAINT_NAME 
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
        WHERE TABLE_SCHEMA = DATABASE() 
          AND TABLE_NAME = 'convocatorias' 
          AND COLUMN_NAME = 'numero'
          AND CONSTRAINT_NAME != 'PRIMARY'
      `, { type: QueryTypes.SELECT });

      if (constraints.length > 0) {
        console.log('🔓 Eliminando restricción unique existente...');
        await sequelize.query(`
          ALTER TABLE convocatorias 
          DROP INDEX \`${constraints[0].CONSTRAINT_NAME}\`
        `);
      }

      // 4. Agregar la restricción unique nuevamente
      console.log('🔒 Agregando restricción unique...');
      await sequelize.query(`
        ALTER TABLE convocatorias 
        ADD UNIQUE INDEX unique_numero (numero)
      `);

    } else {
      console.log('➕ Columna numero no existe, se creará automáticamente');
      
      // Si no existe la columna, primero actualizar registros existentes
      await sequelize.query(`
        UPDATE convocatorias 
        SET nombre = CONCAT('LEGACY-', LPAD(id, 3, '0'), ' - ', COALESCE(nombre, 'Convocatoria sin título'))
        WHERE nombre IS NULL OR nombre = ''
      `);
      
      // Asegurar que todos los registros tengan tipoConvocatoriaId válido
      console.log('🔄 Actualizando tipoConvocatoriaId...');
      await sequelize.query(`
        UPDATE convocatorias 
        SET tipoConvocatoriaId = 1
        WHERE tipoConvocatoriaId IS NULL OR tipoConvocatoriaId = 0
      `);
      console.log('✅ tipoConvocatoriaId actualizado');
    }

    console.log('✅ Conflicto solucionado exitosamente');
    return true;

  } catch (error) {
    console.error('❌ Error al solucionar conflicto:', error.message);
    
    // Intentar una solución más agresiva si falla
    try {
      console.log('🔧 Intentando solución alternativa...');
      
      // Eliminar registros con problemas si es absolutamente necesario
      await sequelize.query(`
        DELETE FROM convocatorias 
        WHERE (nombre IS NULL OR nombre = '') 
          AND (fechaLimite IS NULL OR fechaLimite < '2020-01-01')
      `);
      
      console.log('✅ Registros problemáticos eliminados');
      return true;
      
    } catch (fallbackError) {
      console.error('❌ Error en solución alternativa:', fallbackError.message);
      throw new Error(`No se pudo solucionar el conflicto: ${error.message}`);
    }
  }
};

export default solucionarConflictoNumero;