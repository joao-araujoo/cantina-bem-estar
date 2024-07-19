import { useState } from 'react';
import styles from './styles.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/clientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          console.log('Login bem-sucedido:', data.data);
          // Aqui você pode redirecionar o usuário ou atualizar o estado da aplicação
        } else {
          setError(data.msg);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img
          width={100}
          src="/Logo Branca.png"
          alt="Logo - Cantina Bem Estar (Um contorno branco de um chapéu de chef com um garfo no lado esquerdo, acima do texto 'Cantina Bem Estar')"
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
        {error && <p className="error-message">{error}</p>}
      </main>
      <footer>
        <p>
          Ainda não possui uma conta? <a href="/register">Registrar-se</a>
        </p>
      </footer>
    </div>
  );
}
