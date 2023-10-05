const pgp = require("pg-promise")();

const db = pgp({
  host: "localhost",
  user: "postgres",
  password: "12346",
  database: "Ecommerce",
  allowExitOnIdle: true,
});

db.connect()
  .then((obj) => {
    console.log("Base de Datos Conectada");
    obj.done();
  })
  .catch((error) => {
    console.log(`Conexion con la Base con error: ${error}`);
  });

// Función para crear una base de datos
async function createDatabase() {
  const client = await pool.connect();
  try {
    // Cambiar el nombre de la base de datos según tus necesidades
    const databaseName = "mi_nueva_base_de_datos";

    // Crear la base de datos
    await client.query(`CREATE DATABASE ${databaseName}`);
  } finally {
    client.release();
  }
}

// Función para conectarse a la base de datos recién creada
function connectToDatabase() {
  const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${databaseName}`;
  const db = pgp(connectionString);
  return db;
}

// Función para crear tablas y definir la estructura de la base de datos
async function createTablesAndSchema() {
  const db = connectToDatabase();

  // Define la estructura de tus tablas aquí utilizando SQL

  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id serial PRIMARY KEY,
        nombre VARCHAR(255),
        email VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS productos (
        id serial PRIMARY KEY,
        nombre VARCHAR(255),
        precio numeric(10, 2)
      );

      -- Agrega más tablas según sea necesario
    `);

    console.log("Tablas creadas con éxito.");
  } catch (error) {
    console.error("Error al crear tablas:", error);
  } finally {
    db.$pool.end(); // Cierra la conexión
  }
}

// Función para insertar registros iniciales en las tablas
async function insertInitialData() {
  const db = connectToDatabase();

  try {
    await db.tx(async (t) => {
      // Inserta registros iniciales en tus tablas aquí utilizando transacciones
      await t.none("INSERT INTO usuarios (nombre, email) VALUES ($1, $2)", [
        "Usuario 1",
        "usuario1@example.com",
      ]);
      await t.none("INSERT INTO productos (nombre, precio) VALUES ($1, $2)", [
        "Producto 1",
        19.99,
      ]);
      // Agrega más inserciones según sea necesario
    });

    console.log("Registros iniciales insertados con éxito.");
  } catch (error) {
    console.error("Error al insertar registros iniciales:", error);
  } finally {
    db.$pool.end(); // Cierra la conexión
  }
}

// Ejecuta las funciones en orden
createDatabase()
  .then(() => {
    createTablesAndSchema();
  })
  .then(() => {
    insertInitialData();
  })
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = db;
