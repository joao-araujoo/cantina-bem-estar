import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          toast.success('Login bem-sucedido!');
          console.log('Login bem-sucedido:', data.data);
          // Aqui você pode redirecionar o usuário ou atualizar o estado da aplicação
          localStorage.setItem('token', data.token); // Salva o token no localStorage
          localStorage.setItem('user', JSON.stringify(data.data)); // Salva os dados do usuário no localStorage
          // Redirecionar usuário ou atualizar estado, exemplo:
          // window.location.href = '/'; // Redireciona para a página principal ou a página desejada
        } else {
          toast.error(data.msg);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img
          width={100}
          src="/Logo Branca.png"
          alt="Logo - Cantina Bem Estar"
        />
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="*************"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <ToastContainer />
      </main>
      <footer>
        <p>
          Ainda não possui uma conta? <a href="/register">Registrar-se</a>
        </p>
      </footer>
    </div>
  );
}
