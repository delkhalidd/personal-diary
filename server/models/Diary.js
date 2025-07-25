//models/Diary.js
const db = require('../database/connect')

class Diary {
  constructor(data) {
    this.id = data.id
    this.title = data.title;
    this.content = data.content;
    this.date = data.date;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM diary");
    if (response.rows.length === 0) {
      throw new Error("No diary entries available.")
    }
    return response.rows.map(d => new Diary(d));
  }

  static async findById(id) {
    try {
      const diaryData = await db.query('SELECT * FROM diary WHERE id = $1', [id])
      if (diaryData.rows.length === 0) throw new Error('This diary entry does not exist!');
      return new Diary(diaryData.rows[0]);
    } catch (err) {
      throw new Error('This diary entry does not exist!');
    }
  }

  static async create(data) {
    if (!data.title) { throw new Error("Title is missing") }
    if (!data.content) { throw new Error("Content is missing") }
    if (!data.date) { throw new Error("Date is missing") }

    const response = await db.query(
      "INSERT INTO diary(title, content, date) VALUES ($1, $2, $3) RETURNING *",
      [data.title, data.content, data.date]
    );
    return new Diary(response.rows[0]);
  }

  async update(data) {
    if (!data.title || !data.content || !data.date) {
      throw new Error("Title, content, or date missing")
    }
    try {
      const response = await db.query(
        "UPDATE diary SET title = $1, content = $2, date = $3 WHERE id = $4 RETURNING *",
        [data.title, data.content, data.date, this.id]
      );
      return new Diary(response.rows[0]);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async destroy() {
    try {
      const response = await db.query("DELETE FROM diary WHERE id = $1 RETURNING *", [this.id]);
      return new Diary(response.rows[0]);
    } catch(err) {
      throw new Error("Cannot delete.");
    }
  }
}

module.exports = Diary
