import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Entidad from './entidad.js';

const Proyectos = sequelize.define('Proyectos', {
    // Contacto Líder PPI
    entidadId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Entidad, 
            key: 'id'
        }
    },

    // Contacto quien diligencia la ficha
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    
    // Contacto  lider  la ficha
    userLiderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    // Información General del PPI
    nombrePPI: { type: DataTypes.STRING, allowNull: false },
    determinanteProductividad: { type: DataTypes.STRING, allowNull: false },
    componenteProductividad: { type: DataTypes.STRING, allowNull: false },
    objetivo: { type: DataTypes.STRING, allowNull: false },
    necesidadProblema: { type: DataTypes.STRING, allowNull: false },
    impactos: { type: DataTypes.STRING, allowNull: false },
    objetivosEspecificos: { type: DataTypes.STRING, allowNull: false },
    duracionPPI: {
        type: DataTypes.ENUM('Menos de un año', 'Entre un año y tres años', 'Más de tres años'),
        allowNull: false
    },
    presupuestoPPI: {
        type: DataTypes.ENUM(
            'De 0 a 100 millones de pesos',
            'De 101 a 500 millones de pesos',
            'De 501 a 1000 millones de pesos',
            'De 1001 a 5000 millones de pesos',
            'Más de 5000 millones de pesos'
        ),
        allowNull: false
    },
    fasePPI: {
        type: DataTypes.ENUM(
            'Fase 1: Idea',
            'Fase 2: Formulación o Prefactibilidad',
            'Fase 3: Factibilidad',
            'Contratación',
            'Ejecución'
        ),
        allowNull: false
    },
    rangoDeEmpleos: { type: DataTypes.STRING, allowNull: false },
    estratosBeneficiarios: { type: DataTypes.STRING, allowNull: false },

    // Equidad de Género y Superación de la Pobreza
    potencialEmpleo: { type: DataTypes.STRING, allowNull: false },
    impactoEmpleo: { type: DataTypes.STRING, allowNull: false },
    impactoEquidad: { type: DataTypes.STRING, allowNull: false },
    politicasPPI: { type: DataTypes.STRING, allowNull: false },
    
}, {
    tableName: 'proyectos',
    timestamps: true
});

// Relación con usuario (quien diligencia la ficha)
Proyectos.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

export default Proyectos;