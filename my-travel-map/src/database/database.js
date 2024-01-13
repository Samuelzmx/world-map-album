const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

export async function openDb() {
    return open({
        filename: "./mydb.sqlite",
        driver: sqlite3.Database,
    });
}

export async function initializeDb() {
    const db = await openDb();
    await db.exec(`CREATE TABLE IF NOT EXISTS pins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        PID TEXT NOT NULL,
        _TYPE TEXT NOT NULL
    )`);
    await db.exec(`CREATE TABLE IF NOT EXISTS lines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        map_pin_id INTEGER NOT NULL,
        fixed_pin_id INTEGER NOT NULL,
        map_pin_pid TEXT NOT NULL,
        fixed_pin_pid TEXT NOT NULL
    )`);
    await db.exec(`CREATE TABLE IF NOT EXISTS blog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pid REAL NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    )`);
 
    return db;
}
