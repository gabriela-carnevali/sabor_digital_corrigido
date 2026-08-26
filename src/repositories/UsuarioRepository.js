const e = require('express');
const pool = require('../config/database');

class UsuarioRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM usuario ORDER BY id DESC');
        return rows;
    }

    async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        return rows[0];
    }

    async create(usuarioData) {
        const { nome, email, senha, papel } = usuarioData;
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, senha, papel) VALUES (?, ?, ?, ?)',
            [nome, email, senha, papel]
        );
        return result.insertId;
    }

    async update(email, usuarioData) {
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(usuarioData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        if (fields.length === 0) return null;

        values.push(email);
        const query = `UPDATE usuario SET ${fields.join(', ')} WHERE email = ?`;
        const [result] = await pool.query(query, values);
        return result.affectedRows;
    }

    async delete(email) {
        const [result] = await pool.query('DELETE FROM usuario WHERE email = ?', [email]);
        return result.affectedRows;
    }
}

module.exports = new UsuarioRepository();
