//localdb.ts se encuentra en app/screens/persistance
import SQLite from 'react-native-sqlite-storage';

export default class LocalDB {
  static async connect() {
    try {
      const db = await SQLite.openDatabase({name: 'inventario'});
      console.log('Conexión a la base de datos establecida correctamente');
      return db;
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      throw error;
    }
  }

  // Agregamos un nuevo método en la clase LocalDB para insertar movimientos
  static async insertMovement(
    idProducto: number,
    fechaHora: string,
    cantidad: number,
  ) {
    try {
      const db = await LocalDB.connect();
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO movimientos (id_producto, fecha_hora, cantidad) VALUES (?, ?, ?)',
          [idProducto, fechaHora, cantidad],
          () => console.log('Movimiento registrado correctamente'),
          error => console.error('Error al registrar el movimiento:', error),
        );
      });
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }

  static async init() {
    try {
      const db = await LocalDB.connect();
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS productos ( 
            id            INTEGER        PRIMARY KEY AUTOINCREMENT,
            nombre        VARCHAR(64)     NOT NULL,
            precio        DECIMAL(10,2)   NOT NULL,
            minStock      INTEGER        NOT NULL DEFAULT 0,
            currentStock  INTEGER        NOT NULL DEFAULT 0,
            maxStock      INTEGER        NOT NULL DEFAULT 0
          );`,
          [],
          () => console.log('Tabla "productos" creada correctamente'),
          error => console.error('Error al crear la tabla "productos":', error),
        );
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS movimientos ( 
            id_movimiento   INTEGER        PRIMARY KEY AUTOINCREMENT,
            id_producto     INTEGER        NOT NULL,
            fecha_hora      DATETIME       NOT NULL,
            cantidad        INTEGER        NOT NULL
          );`,
          [],
          () => console.log('Tabla "movimientos" creada correctamente'),
          error =>
            console.error('Error al crear la tabla "movimientos":', error),
        );
      });
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }
}
