import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";

export default function SectionsTemplate() {
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
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
