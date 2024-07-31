/* eslint-disable react/prop-types */
import { useState } from "react";
import SectionsContentHeader from "../../SectionsContentHeader/SectionsContentHeader";
import styles from "../styles.module.css";
import { HiPencilAlt } from "react-icons/hi";

export default function EditProfileForm({ user, onSave }) {
  const [name, setName] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(user.caminho_imagem);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    onSave({
      nome: name,
      email: email,
      senha: password,
    });
  };

  const handleProfilePictureChange = (e) => {
    // Função removida para evitar alterações
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <SectionsContentHeader title="Editar Conta" />
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div className={styles.profilePictureWrapper}>
          <img
            src={profilePicture}
            alt={user.nome}
            className={styles.profilePicture}
          />
          <label className={styles.editProfilePicture}>
            <HiPencilAlt />
            <input
              type="file"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
              // Função de upload removida
            />
          </label>
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.formInput}
            />
          </label>
          <label className={styles.formLabel}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
            />
          </label>
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>
            Nova Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
            />
          </label>
          <label className={styles.formLabel}>
            Confirme a Senha:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.formInput}
            />
          </label>
        </div>
        <button type="submit" className={styles.formButton}>Salvar</button>
      </form>
    </>
  );
}
