const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Open SQLite database
const db = new sqlite3.Database("./sqlite/ASV.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

/**
 * GET /verse/:book/:chapter/:verse
 *
 * Example:
 * /verse/John/3/16
 * /verse/Genesis/1/1
 */
app.get("/verse/:book/:chapter/:verse", (req, res) => {
    const { book, chapter, verse } = req.params;

    const sql = `
        SELECT
            b.name AS book,
            v.chapter,
            v.verse,
            v.text
        FROM ASV_verses v
        JOIN ASV_books b
            ON v.book_id = b.id
        WHERE LOWER(b.name) = LOWER(?)
          AND v.chapter = ?
          AND v.verse = ?
        LIMIT 1
    `;

    db.get(sql, [book, chapter, verse], (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: "Verse not found."
            });
        }

        res.json({
            success: true,
            data: row
        });
    });
});

/**
 * GET /chapter/:book/:chapter
 *
 * Example:
 * /chapter/John/3
 */
app.get("/chapter/:book/:chapter", (req, res) => {
    const { book, chapter } = req.params;

    const sql = `
        SELECT
            b.name AS book,
            v.chapter,
            v.verse,
            v.text
        FROM ASV_verses v
        JOIN ASV_books b
            ON v.book_id = b.id
        WHERE LOWER(b.name) = LOWER(?)
          AND v.chapter = ?
        ORDER BY v.verse
    `;

    db.all(sql, [book, chapter], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    });
});

/**
 * GET /books
 */
app.get("/books", (req, res) => {
    db.all(
        "SELECT id, name FROM ASV_books ORDER BY id",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                data: rows
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Bible API running on http://localhost:${PORT}`);
});