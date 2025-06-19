import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();
import dotenv from 'dotenv';
dotenv.config();


// SE ANALIZA VARIABLES DE ENTORNO
const NAMEDATABASE = process.env.Db_NAME || "database.db"


function initializeDatabase() {
  return new Promise<void>((resolve, reject) => {
    const DB = new sql3.Database(`./${NAMEDATABASE}`, sql3.OPEN_READWRITE | sql3.OPEN_CREATE, (err) => {
      if (err) {
        console.error("Error connecting to database:", err.message);
        return reject(err);
      }
      console.log("Connected to SQLite database");

      const sql = ` CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now')),
      priority TEXT
  )`;

      DB.run(sql, [], (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
          return reject(err);
        }
        console.log("Table created or already exists");
        resolve();
      });
    });
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