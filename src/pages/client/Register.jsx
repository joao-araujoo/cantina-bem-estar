import styles from "../Login/styles.module.css";

export default function Register() {
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
        <form className="login-form">
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" placeholder="Dani Araujo" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="you@email.com" required />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="*************"
            required
          />

          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="*************"
            required
          />

          <button type="submit">Criar Conta</button>
        </form>
      </main>
      <footer>
        <p>
          Já possui uma conta? <a href="/login">Fazer Login</a>
        </p>
      </footer>
    </div>
  );
}
