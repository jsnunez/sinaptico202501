import sequelize from '../config/database.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';
import MiembroComite from '../models/miembroComite.js';
import ConvocatoriaProyectos from '../models/convocatoriaProyectos.js';
import Proyectos from '../models/proyectos.js';
import Convocatoria from '../models/convocatoria.js';

async function arreglarLlavesForaneas() {
    try {
        console.log('🔧 Iniciando reparación de llaves foráneas...');
        
        // Verificar conexión
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.\n');

        console.log('📋 Verificando estado actual de las tablas...');
        
        // Verificar tablas existentes
        const [tables] = await sequelize.query("SHOW TABLES");
        console.log('Tablas existentes:');
        tables.forEach(table => {
            console.log(`  - ${Object.values(table)[0]}`);
        });

        console.log('\n🔍 Verificando foreign keys existentes...');
        
        // Obtener todas las foreign keys
        const [foreignKeys] = await sequelize.query(`
            SELECT 
                TABLE_NAME,
                COLUMN_NAME,
                CONSTRAINT_NAME,
                REFERENCED_TABLE_NAME,
                REFERENCED_COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
            WHERE REFERENCED_TABLE_SCHEMA = DATABASE() 
            AND REFERENCED_TABLE_NAME IS NOT NULL
            ORDER BY TABLE_NAME, COLUMN_NAME
        `);

        console.log('Foreign Keys existentes:');
        foreignKeys.forEach(fk => {
            console.log(`  ${fk.TABLE_NAME}.${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME} (${fk.CONSTRAINT_NAME})`);
        });

        console.log('\n🛠️ Creando foreign keys necesarias...');

        // Definir las foreign keys que necesitamos
        const foreignKeysToCreate = [
            {
                table: 'miembros_comite',
                column: 'userId',
                referencedTable: 'users',
                referencedColumn: 'id',
                constraintName: 'fk_miembros_comite_userId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
            {
                table: 'convocatoria_proyectos',
                column: 'proyectoId',
                referencedTable: 'proyectos',
                referencedColumn: 'id',
                constraintName: 'fk_convocatoria_proyectos_proyectoId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            {
                table: 'convocatoria_proyectos',
                column: 'convocatoriaId',
                referencedTable: 'convocatorias',
                referencedColumn: 'id',
                constraintName: 'fk_convocatoria_proyectos_convocatoriaId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            {
                table: 'proyectos',
                column: 'entidadId',
                referencedTable: 'Entidad',
                referencedColumn: 'id',
                constraintName: 'fk_proyectos_entidadId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
            {
                table: 'proyectos',
                column: 'userId',
                referencedTable: 'users',
                referencedColumn: 'id',
                constraintName: 'fk_proyectos_userId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }
        ];

        for (const fk of foreignKeysToCreate) {
            try {
                // Verificar si las tablas y columnas existen
                const [tableExists] = await sequelize.query(`
                    SELECT COUNT(*) as count 
                    FROM INFORMATION_SCHEMA.TABLES 
                    WHERE TABLE_SCHEMA = DATABASE() 
                    AND TABLE_NAME = '${fk.table}'
                `);

                const [referencedTableExists] = await sequelize.query(`
                    SELECT COUNT(*) as count 
                    FROM INFORMATION_SCHEMA.TABLES 
                    WHERE TABLE_SCHEMA = DATABASE() 
                    AND TABLE_NAME = '${fk.referencedTable}'
                `);

                if (tableExists[0].count === 0) {
                    console.log(`⚠️  Tabla ${fk.table} no existe, saltando...`);
                    continue;
                }

                if (referencedTableExists[0].count === 0) {
                    console.log(`⚠️  Tabla referenciada ${fk.referencedTable} no existe, saltando...`);
                    continue;
                }

                // Verificar si la columna existe
                const [columnExists] = await sequelize.query(`
                    SELECT COUNT(*) as count 
                    FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_SCHEMA = DATABASE() 
                    AND TABLE_NAME = '${fk.table}' 
                    AND COLUMN_NAME = '${fk.column}'
                `);

                if (columnExists[0].count === 0) {
                    console.log(`⚠️  Columna ${fk.table}.${fk.column} no existe, saltando...`);
                    continue;
                }

                // Verificar si ya existe el constraint
                const [constraintExists] = await sequelize.query(`
                    SELECT COUNT(*) as count 
                    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                    WHERE TABLE_SCHEMA = DATABASE() 
                    AND TABLE_NAME = '${fk.table}' 
                    AND COLUMN_NAME = '${fk.column}' 
                    AND REFERENCED_TABLE_NAME = '${fk.referencedTable}'
                `);

                if (constraintExists[0].count > 0) {
                    console.log(`✅ FK ${fk.table}.${fk.column} -> ${fk.referencedTable}.${fk.referencedColumn} ya existe`);
                    continue;
                }

                // Limpiar datos inválidos antes de crear la FK
                await sequelize.query(`
                    UPDATE ${fk.table} 
                    SET ${fk.column} = NULL 
                    WHERE ${fk.column} IS NOT NULL 
                    AND ${fk.column} NOT IN (
                        SELECT ${fk.referencedColumn} 
                        FROM ${fk.referencedTable}
                    )
                `);

                // Crear la foreign key
                const sql = `
                    ALTER TABLE ${fk.table} 
                    ADD CONSTRAINT ${fk.constraintName} 
                    FOREIGN KEY (${fk.column}) 
                    REFERENCES ${fk.referencedTable}(${fk.referencedColumn}) 
                    ON DELETE ${fk.onDelete} 
                    ON UPDATE ${fk.onUpdate}
                `;

                await sequelize.query(sql);
                console.log(`✅ Creada FK: ${fk.table}.${fk.column} -> ${fk.referencedTable}.${fk.referencedColumn}`);

            } catch (error) {
                console.log(`❌ Error creando FK ${fk.table}.${fk.column}: ${error.message}`);
                
                // Si el error es por datos inválidos, intentar limpiar más agresivamente
                if (error.message.includes('Cannot add or update a child row')) {
                    try {
                        console.log(`🧹 Limpiando datos inválidos en ${fk.table}.${fk.column}...`);
                        await sequelize.query(`UPDATE ${fk.table} SET ${fk.column} = NULL WHERE ${fk.column} IS NOT NULL`);
                        
                        // Intentar crear nuevamente
                        const sql = `
                            ALTER TABLE ${fk.table} 
                            ADD CONSTRAINT ${fk.constraintName} 
                            FOREIGN KEY (${fk.column}) 
                            REFERENCES ${fk.referencedTable}(${fk.referencedColumn}) 
                            ON DELETE ${fk.onDelete} 
                            ON UPDATE ${fk.onUpdate}
                        `;
                        await sequelize.query(sql);
                        console.log(`✅ Creada FK después de limpieza: ${fk.table}.${fk.column} -> ${fk.referencedTable}.${fk.referencedColumn}`);
                    } catch (cleanupError) {
                        console.log(`❌ Error persistente en FK ${fk.table}.${fk.column}: ${cleanupError.message}`);
                    }
                }
            }
        }

        console.log('\n🔍 Verificando foreign keys después de la reparación...');
        
        const [newForeignKeys] = await sequelize.query(`
            SELECT 
                TABLE_NAME,
                COLUMN_NAME,
                CONSTRAINT_NAME,
                REFERENCED_TABLE_NAME,
                REFERENCED_COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
            WHERE REFERENCED_TABLE_SCHEMA = DATABASE() 
            AND REFERENCED_TABLE_NAME IS NOT NULL
            ORDER BY TABLE_NAME, COLUMN_NAME
        `);

        console.log('Foreign Keys finales:');
        newForeignKeys.forEach(fk => {
            console.log(`  ${fk.TABLE_NAME}.${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME} (${fk.CONSTRAINT_NAME})`);
        });

        console.log('\n✅ Reparación de foreign keys completada exitosamente!');
        console.log(`📊 Total de foreign keys: ${newForeignKeys.length}`);

        // Verificar integridad referencial
        console.log('\n🔍 Verificando integridad referencial...');
        
        // Verificar miembros_comite
        const [invalidMiembros] = await sequelize.query(`
            SELECT COUNT(*) as count 
            FROM miembros_comite 
            WHERE userId IS NOT NULL 
            AND userId NOT IN (SELECT id FROM users)
        `);
        
        console.log(`Miembros del comité con userId inválido: ${invalidMiembros[0].count}`);

        // Verificar convocatoria_proyectos
        try {
            const [invalidConvProyectos] = await sequelize.query(`
                SELECT COUNT(*) as count 
                FROM convocatoria_proyectos 
                WHERE (proyectoId IS NOT NULL AND proyectoId NOT IN (SELECT id FROM proyectos))
                OR (convocatoriaId IS NOT NULL AND convocatoriaId NOT IN (SELECT id FROM convocatorias))
            `);
            console.log(`ConvocatoriaProyectos con referencias inválidas: ${invalidConvProyectos[0].count}`);
        } catch (error) {
            console.log('Tabla convocatoria_proyectos no existe aún');
        }

        console.log('\n🎉 Proceso de reparación de foreign keys completado!');

    } catch (error) {
        console.error('❌ Error durante la reparación:', error);
    } finally {
        await sequelize.close();
    }
}

arreglarLlavesForaneas();