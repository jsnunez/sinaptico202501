import sequelize from '../config/database.js';
import User from '../models/user.js';
import MiembroComite from '../models/miembroComite.js';
import '../models/associations.js';

async function verificarYSincronizarTablas() {
    try {
        console.log('🔍 Verificando conexión a la base de datos...');
        
        // Verificar conexión
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');

        console.log('\n📋 Verificando tablas existentes...');
        
        // Verificar si existe la tabla users
        const [results] = await sequelize.query("SHOW TABLES LIKE 'users'");
        if (results.length === 0) {
            console.log('⚠️  La tabla users no existe. Sincronizando modelo User...');
            await User.sync({ force: false });
            console.log('✅ Tabla users creada.');
        } else {
            console.log('✅ La tabla users ya existe.');
        }

        console.log('\n🔄 Sincronizando MiembroComite...');
        
        // Sincronizar MiembroComite sin foreign keys primero
        await MiembroComite.sync({ force: false, alter: true });
        console.log('✅ Tabla miembros_comite sincronizada.');

        console.log('\n🔗 Verificando asociaciones...');
        
        // Verificar si la asociación funciona
        try {
            const testMiembro = await MiembroComite.findOne({
                include: [{ model: User, as: 'Usuario' }]
            });
            console.log('✅ Asociaciones funcionando correctamente.');
        } catch (error) {
            console.log('⚠️  Las asociaciones necesitan configuración:', error.message);
        }

        console.log('\n📊 Estadísticas de tablas:');
        
        const userCount = await User.count();
        const miembroCount = await MiembroComite.count();
        
        console.log(`   - Usuarios: ${userCount}`);
        console.log(`   - Miembros del comité: ${miembroCount}`);

        console.log('\n✅ Verificación y sincronización completada exitosamente.');

    } catch (error) {
        console.error('❌ Error durante la verificación:', error);
        
        if (error.original && error.original.code === 'ER_FK_CANNOT_OPEN_PARENT') {
            console.log('\n🔧 Recomendaciones para solucionar el error:');
            console.log('   1. Verificar que la tabla users existe');
            console.log('   2. Eliminar foreign keys problemáticas');
            console.log('   3. Recrear asociaciones de forma controlada');
            
            // Intentar una solución automática
            try {
                console.log('\n🛠️  Intentando reparación automática...');
                
                // Eliminar foreign key constraint si existe
                await sequelize.query(`
                    ALTER TABLE miembros_comite 
                    DROP FOREIGN KEY IF EXISTS miembros_comite_userId_foreign_idx
                `).catch(() => console.log('   - FK constraint no existía'));
                
                // Recrear tabla sin FK
                await MiembroComite.sync({ force: false });
                
                console.log('✅ Reparación automática completada.');
                
            } catch (repairError) {
                console.error('❌ No se pudo reparar automáticamente:', repairError.message);
            }
        }
    } finally {
        await sequelize.close();
    }
}

verificarYSincronizarTablas();