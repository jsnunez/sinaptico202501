import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Evento = sequelize.define('Evento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    urlEvento: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            isUrl: true
        },
        comment: 'URL pública del evento'
    },
    titulo: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 300]
        }
    },
    codigo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [50, 5000]
        }
    },
    modalidad: {
        type: DataTypes.ENUM('presencial', 'virtual', 'hibrido'),
        allowNull: false,
        defaultValue: 'presencial'
    },
    ubicacion: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Dirección física o URL para eventos virtuales'
    },
    urlImagen: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            isUrl: true
        },
        comment: 'URL de la imagen del evento'
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
   
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaFin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    cupoMaximo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1
        }
    },
    inscripcionRequerida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    fechaInicioInscripcion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fechaCierreInscripcion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    costo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    categorias: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de categorías del evento'
    },
    ponentes: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de información de ponentes'
    },
    requisitos: {
        type: DataTypes.TEXT,
        allowNull: true
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
    urlTransmision: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL para eventos virtuales o híbridos'
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('borrador', 'publicado', 'en_curso', 'finalizado', 'cancelado'),
        allowNull: false,
        defaultValue: 'borrador'
    },
    // Campos originales mantenidos para compatibilidad
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    organizador: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tipoEventoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
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
    tableName: 'eventos',
    timestamps: true,
    indexes: [
        {
            fields: ['codigo'],
            unique: true,
            name: 'unique_codigo_not_null'
        },
        {
            fields: ['estado']
        },
        {
            fields: ['fecha']
        },
       
        {
            fields: ['modalidad']
        }
    ],
    validate: {

        inscripcionValida() {
            if (this.inscripcionRequerida && this.fechaCierreInscripcion && this.fechaInicioInscripcion &&
                this.fechaCierreInscripcion <= this.fechaInicioInscripcion) {
                throw new Error('La fecha de cierre de inscripción debe ser posterior a la de inicio');
            }
            if (this.inscripcionRequerida && this.fechaCierreInscripcion && this.fecha &&
                this.fechaCierreInscripcion > this.fecha) {
                throw new Error('La inscripción debe cerrar antes del inicio del evento');
            }
        },
        modalidadValida() {
            if (this.modalidad === 'virtual' && !this.urlTransmision) {
                throw new Error('Los eventos virtuales requieren URL de transmisión');
            }
        }
    }
});

export default Evento;