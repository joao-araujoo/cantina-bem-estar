import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";
import { useAuth } from "../../contexts/AuthContext";

export default function SectionsTemplate() {
  const { user } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img
            width={100}
            src="/Logo Vermelha - Transparente.png"
            alt="Logo - Cantina Bem Estar (Um contorno vermelho de um chapéu de chef com um garfo no lado esquerdo, acima do texto 'Cantina Bem Estar')"
          />
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.notAuthorizedContainer}>
          <h1>Não Autorizado</h1>
          <img src="/unauthorized.png" alt="Stick unauthorized" width={250} />
          <p>
            Você não tem permissão para acessar esta página.
          </p>
          {user ? (
            user.userType === "cliente" ? (
              <Link to="/" className={styles.redirectButton}>Voltar para a Home</Link>
            ) : (
              <Link to="/dashboard" className={styles.redirectButton}>Voltar para o Dashboard</Link>
            )
          ) : (
            <Link to="/login" className={styles.redirectButton}>Fazer Login</Link>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
