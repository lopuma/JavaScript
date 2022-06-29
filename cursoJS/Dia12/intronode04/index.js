// Primero cargamos los módulos que vamos a necesitar. 
const http = require('http');
const url = require("url");
const mysql = require('mysql');

// Nos conectamos a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'osboxes',
    password: 'ABCabc123.',
    database: 'lanbide'
});
connection.connect(function(err) {
    // Si ha habido algún error al conectarse, cerramos el programa con un mensaje 
    if (err) throw err;
    console.log('Conectado a MySQL');
});

// Usaremos esta variable para sacar las cosas al navegador. La declaro aquí para que sea accesible desde las funciones que voy a crear
let out;

// Creamos un servidor. Usamos el módulo http (viene por defecto en Node.js)
// Nada más crear el servidor, se ejecuta una función que toma dos parámetros:
// req (petición del navegador) y res (respuesta del servidor))
const server = http.createServer(async function(req, res) {
    // Aprovecho para resetear la variable out. Ahora será un objeto con 2 propiedades: data para poner los datos que mandamos al navegador, y meta, con información extra de todo tipo 
    out = { meta: {}, data: [] };
    // Esto es para procesar la petición del navegador, por si tiene parámetros:
    let sql, params = url.parse(req.url, true);
    if (params.query == null) {
        out.meta.ok = false;
        out.meta.msg = "No me has pasado ningún parámetro, GAÑÁN!";
        salida(res);
    } else {
        // Examino el comando que hemos pasado 
        switch (params.query.comando) {
            case "test":
                out.meta.ok = true;
                out.meta.msg = "Vale, has hecho un test";
                salida(res);
                break;
            case "listaMunis":
                // Construimos una sentencia SQL: 
                sql = "SELECT DISTINCT municipio FROM lan_empleo ORDER BY municipio";
                // Mandamos esa consulta a MySQL, y cuando llegue la respuesta, ejecutamos la función callback:
                connection.query(sql, function(error, filas) {
                    if (error) throw error;
                    out.data = filas;
                    salida(res);
                });
                break;
            case "buscar":
                if (params.query.municipio == null && params.query.termino == null) {
                    out.meta.ok = false;
                    out.meta.msg = "Faltan parámetros";
                    salida(res);
                    return;
                }
                let clausulaMuni = "",
                    clausulaTerm = "";
                if (params.query.municipio != null) {
                    clausulaMuni = `AND municipio LIKE '%${params.query.municipio}%' `;
                }
                if (params.query.termino != null) {
                    clausulaTerm = `AND (desEmpleo LIKE '%${params.query.termino}%' OR desPuesto LIKE '%${params.query.termino}%') `;
                }
                sql = `SELECT * FROM lan_empleo WHERE 1 ${clausulaMuni} ${clausulaTerm} ORDER BY fecPub DESC LIMIT 0,1000`;
                connection.query(sql, (error, filas) => {
                    if (error) throw error;
                    out.data = filas;
                    out.meta.sql = sql;     // no hacer JAMÁS esto en producción
                    salida(res);
                });
                break;
            default:
                out.meta.ok = false;
                out.meta.msg = "No me has pasado ningún comando válido. Inténtalo de nuevo, inútil, más que inútil";
                salida(res);
        }
    }
    //connection.end(); // Antes era necesario cerrar la conexión a la bbdd de forma manual. Ahora no.
});

// Esta es la función que manda los datos al navegador.
function salida(res) {
    res.statusCode = 200;       // Código 200 = todo ha ido bien
    res.setHeader('Access-Control-Allow-Origin', '*');      // OJO CON ESTO!!!
    res.setHeader('Content-Type', 'text/json'); // mandamos los datos en formato json
    console.log("veamos...");   // pongo algo en la consola, porque me apetete
    res.end(JSON.stringify(out));
}
// Ponemos el servidor a la escucha en el puerto 3000
server.listen(3000, 'localhost', () => {
    console.log(`Servidor a la escucha en http://localhost:3000/`);
});
