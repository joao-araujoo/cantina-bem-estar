/* eslint-disable react/prop-types */
import SectionsContentHeader from "../../SectionsContentHeader/SectionsContentHeader";
import styles from "../styles.module.css";

export default function ProfileInfo({ user }) {
  return (
    <>
      <SectionsContentHeader title="Minha Conta" />
      <div className={styles.wrapper}>
        <img src={user.profilePicture} alt={user.name} />
        <div style={{textAlign: "center", fontWeight: "400"}}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.ordersQuantity} pedidos</p>
        </div>
      </div>
    </>
  );
}
