const ProdutoRepository = require('../repositories/UsuarioRepository');
const fs = require('fs').promises;
const path = require('path');

class UsuarioService {
    async listarUsuarios() {
        const usuarios = await UsuarioRepository.findAll();
        return {
            sucesso: true,
            dados: usuarios,
            total: usuarios.length
        };
    }

    async buscarUsuarioPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const usuario = await UsuarioRepository.findById(id);
        if (!usuario) {
            throw { status: 404, mensagem: "Usuário não encontrado" };
        }

        return {
            sucesso: true,
            dados: usuario
        };
    }

    async cadastrarUsuario(dados) {
        let { nome, email, senha, papel } = dados;
        
        // Convert preco if it comes as a string from FormData

        if (!nome || !email || senha === undefined || !papel){
            throw { status: 400, mensagem: "Nome, descrição e senha são obrigatórios e devem ser válidos" };
        }

        const novoUsuario = {
            nome: nome.trim(),
            email: email.trim(),
            senha: senha.trim(),
            papel: papel.trim(),
        };

        const id = await UsuarioRepository.create(novoUsuario);

        return {
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso",
            id
        };
    }

    async atualizarUsuario(id, dados) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const existe = await UsuarioRepository.findById(id);
        if (!existe) {
            throw { status: 404, mensagem: "Usuário não encontrado" };
        }

        const atualizado = {};
        let { nome, email, senha, papel } = dados;

        if (nome !== undefined) atualizado.nome = nome.trim();
        if (email !== undefined) atualizado.email = email.trim();
        if (senha !== undefined) atualizado.senha = senha.trim()
        if (papel !== undefined) atualizado.papel = papel.trim();

        if (Object.keys(atualizado).length === 0) {
            throw { status: 400, mensagem: "Nenhum dado válido enviado para atualização" };
        }

        await UsuarioRepository.update(id, atualizado);

        return {
            sucesso: true,
            mensagem: "Usuário atualizado com sucesso"
        };
    }

    async deletarUsuario(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const existe = await UsuarioRepository.findById(id);
        if (!existe) {
            throw { status: 404, mensagem: "Usuário não encontrado" };
        }

        await UsuarioRepository.delete(id);

        return {
            sucesso: true,
            mensagem: "Usuário apagado com sucesso"
        };
    }
}

module.exports = new UsuarioService();
