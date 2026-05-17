import { mockUsers } from '../../../Banco de Dados/BDMock';


export async function authServiceMock(username: string, password: string): Promise<string> {
    // Retornamos uma Promise para manter o mesmo comportamento assíncrono (async/await)
    return new Promise((resolve, reject) => {
        
        // Simula o tempo de latência de uma rede (ex: 1 segundo de carregamento)
        setTimeout(() => {
            
            // Aqui você define qual usuário e senha "existem" no seu banco falso
            const user = mockUsers.find(u => u.username === username && u.password === password);
            if (user) {
                
                // Se acertar, resolvemos a Promise retornando um token fictício
                const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token';
                resolve(mockToken);
                
            } else {
                
                // Se errar a senha ou usuário, rejeitamos a Promise simulando o throw new Error original
                reject(new Error('Login failed'));
                
            }
            
        }, 1000); // 1000 milissegundos = 1 segundo
    });
}