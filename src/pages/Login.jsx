import styles from "./styles.module.css";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <header>
        <img
          width={100}
          src="./Logo Branca.png"
          alt="Logo - Cantina Bem Estar (Um contorno branco de um chapéu de chef com um garfo no lado esquerdo, acima do texto 'Cantina Bem Estar')"
        />
      </header>
      <main>
        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="you@email.com" required />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="*************"
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </main>
      <footer>
        <p>
          Ainda não possui uma conta? <a href="/register">Registrar-se</a>
        </p>
      </footer>
    </div>
  );
}
