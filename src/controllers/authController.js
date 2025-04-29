import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

class AuthController {
  // Listar Todos os Usuários
  async getAllUsers(req, res) {
    try {
      const users = await userModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar Novo Usuário
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validação Básica
      if (!name || !email || !password) {
        return res.status(400).json({
          error: "Os campos: name, email e password são obrigatórios!!",
        });
      }

      // Verificar se o Usuário já Existe
      const userExists = await userModel.findByEmail(email);

      if (userExists) {
        return res
          .status(400)
          .json({ error: `O email: "${email}" já está em uso!` });
      }

      // Hash da Senha
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Criação do Objeto do Usuário
      const data = {
        name,
        email,
        password: hashedPassword,
      };

      // Criação do Usuário
      const user = await userModel.create(data);

      return res
        .status(201)
        .json({ message: `Usuário ${name} criado com sucesso!`, user });
    } catch (error) {
      console.error("Erro ao criar novo usuário:", error);
      res.status(500).json({ error: `Erro ao criar usuário ${name}` });
    }
  }
}

export default new AuthController();