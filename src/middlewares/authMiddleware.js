const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ mensagem: "Token não fornecido" });

  const token = authHeader.split(' ')[1]

  try {
    const decodificado = jwt.verify(token, 'chave_super_secreta_sabor_digital_123')
    req.usuarioPapel = decodificado.usuarioPapel
    return next()
  } catch (erro) {
    return res.status(401).json({mensagem: "Token inválido"})
  }
}

const verificarAdmin = (req, res, next) => {
    if (req.usuarioPapel !== 'admin') {
        return res.status(403).json({mensagem: "Acesso restrito para administradores"})
    }
    return next()
}

module.exports = {verificarToken, verificarAdmin}