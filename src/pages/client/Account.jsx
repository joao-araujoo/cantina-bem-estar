/* eslint-disable react/prop-types */
import { useState } from "react";
import EditProfileForm from "../../components/UserAccount/EditProfileForm/EditProfileForm";
import ProfileInfo from "../../components/UserAccount/ProfileInfo/ProfileInfo";
import { HiPencil } from "react-icons/hi";

export default function Account() {
  const initialUser = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    profilePicture: "/users-images/imagem_cliente_1.webp",
    ordersQuantity: 0,
    password: "1234",
  };

  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);

  const handleSave = (editedInfo) => {
    console.log("Informações editadas:", editedInfo);
    setUser((prevUser) => ({ ...prevUser, ...editedInfo }));
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <EditProfileForm user={user} onSave={handleSave} />
      ) : (
        <ProfileInfo user={user} />
      )}
      <button
        onClick={() => setEditMode(!editMode)}
        style={{
          padding: "10px",
          backgroundColor: "#e34534",
          border: "none",
          color: "#fff",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          borderRadius: "5px",
        }}
      >
       <HiPencil /> {editMode ? "Cancelar Edição" : "Editar Perfil"}
      </button>
    </div>
  );
}
