import { insertUsers } from './createUsers.js';
import { insertDepartamentos } from './createDepartamento.js';
import { insertCiudades } from './createCity.js';
import { insertCargos } from './createCargo.js';
import { insertContactos } from './createContacto.js';
import { insertEmpresas } from './createEntidades.js';
import { insertRetos } from './createReto.js';
import { insertRecurso } from './createRecurso.js';
import { insertCursos } from './createCursos.js';
import { insertConvocatorias } from './createConvocatoria.js';
import { insertClasificados } from './createclasificado.js';

async function main() {
    await insertUsers();
    await insertDepartamentos();
    await insertCiudades();
    await insertCargos();
    await insertContactos();
    await insertEmpresas();
    await insertRetos();
    await insertRecurso();
    await insertCursos();
    await insertConvocatorias();
    await insertClasificados();
}

main();
