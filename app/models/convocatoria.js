import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Convocatoria = sequelize.define('Convocatoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 300]
        }
    },
    numero: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            isValidFormat(value) {
                if (value && !/^\d{4}-\d{2}$|^LEGACY-\d{3}$/.test(value)) {
                    throw new Error('El número debe tener formato YYYY-NN o LEGACY-NNN');
                }
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [50, 5000]
        }
    },
    presupuestoTotal: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    maxProyectos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    fechaApertura: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaCierre: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaResultados: {
        type: DataTypes.DATE,
        allowNull: false
    },
    areasTematicas: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de áreas temáticas prioritarias'
    },
    presupuestoMinimo: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
            min: 0
        }
    },
    presupuestoMaximo: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
            min: 0
        }
    },
    duracionMinima: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1
        }
    },
    duracionMaxima: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1
        }
    },
    requisitos: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    documentosRequeridos: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de documentos requeridos'
    },
    palabrasClave: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de palabras clave'
    },
    contacto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('borrador', 'publicada', 'cerrada', 'cancelada'),
        allowNull: false,
        defaultValue: 'borrador'
    },
    // Campos originales mantenidos para compatibilidad
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    financiamiento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    organizador: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'CRCI Santander'
    },
    urlConvocatoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fechaLimite: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    tipoConvocatoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1  // Valor por defecto para tipos existentes
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'convocatorias',
    timestamps: true,
    indexes: [
        {
            fields: ['numero'],
            unique: true,
            name: 'unique_numero_not_null'
        },
        {
            fields: ['estado']
        },
        {
            fields: ['fechaApertura']
        },
        {
            fields: ['fechaCierre']
        }
    ],
    validate: {
        fechasValidas() {
            if (this.fechaCierre && this.fechaApertura && this.fechaCierre <= this.fechaApertura) {
                throw new Error('La fecha de cierre debe ser posterior a la fecha de apertura');
            }
            if (this.fechaResultados && this.fechaCierre && this.fechaResultados <= this.fechaCierre) {
                throw new Error('La fecha de resultados debe ser posterior a la fecha de cierre');
            }
        },
        presupuestosValidos() {
            if (this.presupuestoMaximo && this.presupuestoMinimo && this.presupuestoMaximo < this.presupuestoMinimo) {
                throw new Error('El presupuesto máximo debe ser mayor al mínimo');
            }
        },
        duracionesValidas() {
            if (this.duracionMaxima && this.duracionMinima && this.duracionMaxima < this.duracionMinima) {
                throw new Error('La duración máxima debe ser mayor a la mínima');
            }
        }
    }
});

export default Convocatoria;
