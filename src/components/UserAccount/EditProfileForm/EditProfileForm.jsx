/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SectionsContentHeader from "../../SectionsContentHeader/SectionsContentHeader";
import styles from "../styles.module.css";
import { HiPencilAlt } from "react-icons/hi";
import $ from 'jquery'; // Importa jQuery

export default function EditProfileForm({ user, onSave }) {
  const [name, setName] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(user.caminho_imagem);
  const [telefone, setTelefone] = useState(user.telefone);

  // Efeito para aplicar a máscara ao campo de telefone
  useEffect(() => {
    // Aplica a máscara ao campo de telefone
    $("#telefone").mask("(99) 99999-9999"); // Formato para telefone brasileiro
  }, []);

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
      telefone: telefone,
    });
  };

  const handleProfilePictureChange = (e) => {
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
            />
          </label>
        </div>
        
        {/* Inputs agora estão em blocos separados para ocuparem 100% */}
        <label className={styles.formLabel}>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.formInput}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </label>
        
        <label className={styles.formLabel}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </label>

        <label className={styles.formLabel}>
          Telefone: {/* Atualização do input com id */}
          <input
            type="text"
            id="telefone" // Adiciona um id ao campo de telefone
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className={styles.formInput}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </label>

        <label className={styles.formLabel}>
          Nova Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </label>

        <label className={styles.formLabel}>
          Confirme a Senha:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.formInput}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </label>

        <button type="submit" className={styles.formButton}>Salvar</button>
      </form>
    </>
  );
}
