
const API_URL = 'http://localhost:8080/api';


export async function authService(username: string, password: string): Promise<string> {
    
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });



    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data.token;
}