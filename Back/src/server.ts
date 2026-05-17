import express, { type Request, type Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { mockUsers } from '../../Banco de Dados/BDMock.js';

const app = express();

// O CORS é fundamental! Ele permite que o seu React (localhost:5173) 
// faça requisições para o seu Back (localhost:8080) sem ser bloqueado.
app.use(cors());

// Permite que o servidor entenda JSON no corpo (body) da requisição
app.use(express.json());

// Uma "senha" secreta do servidor para assinar os tokens (nunca vaze isso no mundo real)
const SECRET_KEY = 'minha_chave_super_secreta';

// Rota de Login (O equivalente ao seu API_URL + '/auth/login')
app.post('/api/auth/login', (req: Request, res: Response) => {
    // Pega o que o React enviou
    const { username, password } = req.body;


    const user = mockUsers.find(u => u.username === username && u.password === password);
    // Simulação temporária antes de conectarmos o BD real
    if (user) {
        
        // Gera um token de verdade! Ele guarda o usuário e expira em 1 hora
        const token = jwt.sign({ user: username }, SECRET_KEY, { expiresIn: '1h' });
        
        // Devolve o token para o React
        return res.json({ token });
    }

    // Se errar a senha, devolve Status 401 (Não autorizado)
    return res.status(401).json({ error: 'Credenciais inválidas' });
});

// Liga o servidor
app.listen(8080, () => {
    console.log('🚀 Servidor rodando em http://localhost:8080');
});