import styles from "./styles.module.css";
import { FaLocationDot, FaPhone, FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Sobre nós</h2>
                <p>Somos a Cantina Bem-Estar, apaixonados por comida saudável e deliciosa. Nosso objetivo é proporcionar refeições nutritivas e reconfortantes, preparadas com ingredientes frescos e amorosos.</p>
            </div>
            <div className={styles.box}>
                <h2>Contato</h2>
                <span className="location">
                    <p>
                        <FaLocationDot size={15} />
                        R. Paraibuna, 75  Jardim Sao Dimas, São José dos Campos - SP, 12245-020
                    </p>
                </span>
                <span className="phone">
                    
                    <p><FaPhone size={15} /> +55 (12) 98188-1877</p>
                </span>
                <span className="email">
                    
                    <p> <MdEmail size={15} /> luciacantinabemestar@hotmail.com</p>
                </span>
            </div>
            <div className={styles.box}>
                <h2>Redes sociais</h2>
                <p>Siga-nos em nossas redes sociais para não perder nenhuma novidade!</p>
                <div className="social-media-icons">
                    <a href="https://www.instagram.com/" target="_blank">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.twitter.com/" target="_blank">
                        <FaXTwitter />
                    </a>
                </div>
            </div>
            <img src="/Logo Branca.png" alt="Logo - Cantina Bem Estar (Um contorno branco de um chapéu de chef com um garfo no lado esquerdo, acima do texto 'Cantina Bem Estar')" />
        </div>

        <hr />
        <p className={styles.copyright}>Copyright ©2024 | Cantina Bem-Estar </p>
    </footer>
  )
}
