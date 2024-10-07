/* eslint-disable react/prop-types */
import SectionsContentHeader from "../../SectionsContentHeader/SectionsContentHeader";
import styles from "../styles.module.css";
import { FaUser, FaEnvelope, FaClipboardList } from "react-icons/fa"; // Importando ícones

export default function ProfileInfo({ user }) {
  return (
    <>
      <SectionsContentHeader title="Minha Conta" />
      <div className={styles.wrapper}>
        <img
          src={`http://localhost:3000/${user.caminho_imagem}`}
          alt={user.nome}
          style={{ borderRadius: "50%", width: "150px", height: "150px" }} // Estilizando a imagem
        />
        <div style={{ textAlign: "center", fontWeight: "400"}}>
          <h3>
            <FaUser style={{ marginRight: "5px" }} /> {user.nome}
          </h3>
          <p>
            <FaEnvelope style={{ marginRight: "5px" }} /> {user.email}
          </p>
          <p>
            <FaClipboardList style={{ marginRight: "5px" }} /> {user.qtd_pedidos}{" "}
            {user.qtd_pedidos > 1 ? "Pedidos" : "Pedido"}
          </p>
        </div>
      </div>
    </>
  );
}
