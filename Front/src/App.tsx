import { useState } from "react"
import { useLogin } from "./hooks/useLogin"

export function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, loading, error } = useLogin()


  const handleSubmmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Preencha todos os campos')
      return
    }

    const sucesso = await login(email, password)

    if (sucesso) {
      alert('Login bem-sucedido!')
    } else {
      alert('Falha no login. Verifique suas credenciais.')
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-900 justify-center items-center flex flex-col gap-4">

      <form onSubmit={handleSubmmit} className="justify-center items-center flex flex-col gap-4">

        <h1 className="text-3xl text-white font-bold">Login</h1>

        <input className="w-100 h-fit bg-white rounded-lg px-4 py-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="w-100 h-fit bg-white rounded-lg px-4 py-2"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)} />


        <button className="w-40 h-fit bg-amber-500 rounded-lg p-2 items-center justify-center flex gap-4 hover:bg-amber-600 transition-colors"
          type="submit"
          disabled={loading}
          style={{cursor: loading ? "wait" : "pointer"}}>
          
          

          <span className="text-white font-bold">Entrar</span>
        </button>
      </form>

    </div>
  )
}


