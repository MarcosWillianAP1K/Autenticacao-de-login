import { useState } from "react";
import { authService } from "../services/LoginService"; 

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await authService(username, password); 
            localStorage.setItem('token', token);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    }
    
    return { login, loading, error };
}