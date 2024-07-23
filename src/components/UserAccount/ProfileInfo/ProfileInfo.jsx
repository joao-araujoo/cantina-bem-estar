/* eslint-disable react/prop-types */
import SectionsContentHeader from "../../SectionsContentHeader/SectionsContentHeader";
import styles from "../styles.module.css";

export default function ProfileInfo({ user }) {
  return (
    <>
      <SectionsContentHeader title="Minha Conta" />
      <div className={styles.wrapper}>
        <img src={`http://localhost:3000/${user.caminho_imagem}`} alt={user.nome} />
        <div style={{ textAlign: "center", fontWeight: "400" }}>
          <h3>{user.nome}</h3>
          <p>{user.email}</p>
          <p>{user.qtd_pedidos} pedidos</p>
        </div>
      </div>
    </>
  );
}
