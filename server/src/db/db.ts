import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();
import dotenv from 'dotenv';

dotenv.config();

// SE ANALIZA VARIABLES DE ENTORNO
const NAMEDATABASE = process.env.Db_NAME || "database.db";
type ColumnInfo = {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  pk: number;
};

function initializeDatabase() {
  return new Promise<void>((resolve, reject) => {
    const DB = new sql3.Database(`./${NAMEDATABASE}`, sql3.OPEN_READWRITE | sql3.OPEN_CREATE, (err) => {
      if (err) {
        console.error("Error connecting to database:", err.message);
        return reject(err);
      }
      console.log("Connected to SQLite database");

      const sql = `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT (datetime('now')),
        updatedAt TEXT,
        deletedAt TEXT,
        dueDate TEXT,
        priority TEXT DEFAULT 'LOW'
      )`;

      DB.run(sql, [], (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
          return reject(err);
        }

        // Verificar y agregar columnas si no existen (para migraciones)
        const alterPromises = [
          addColumnIfNotExists(DB, 'tasks', 'updatedAt', 'TEXT'),
          addColumnIfNotExists(DB, 'tasks', 'deletedAt', 'TEXT'),
          addColumnIfNotExists(DB, 'tasks', 'priority', 'TEXT DEFAULT \'LOW\'')
        ];

        Promise.all(alterPromises)
          .then(() => {
            console.log("Table created or already exists with all required columns");
            resolve();
          })
          .catch(alterErr => {
            console.error("Error adding columns:", alterErr);
            reject(alterErr);
          });
      });
    });
  });
}

// Función auxiliar para agregar columnas si no existen
function addColumnIfNotExists(db: sqlite3.Database, table: string, column: string, type: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.all(
      `PRAGMA table_info(${table})`,
      [],
      (err, rows: ColumnInfo[]) => {
        if (err) return reject(err);

        const columnExists = rows.some((row) => row.name === column);
        if (columnExists) {
          return resolve();
        }

        db.run(
          `ALTER TABLE ${table} ADD COLUMN ${column} ${type}`,
          [],
          (alterErr) => {
            if (alterErr) return reject(alterErr);
            console.log(`Added column ${column} to table ${table}`);
            resolve();
          }
        );
      }
    );
  });
}

let DB: sqlite3.Database;

async function setupDatabase() {
  await initializeDatabase();
  DB = new sql3.Database("./database.db");
}

setupDatabase().catch(err => {
  console.error("Database setup failed:", err);
});

export { DB };