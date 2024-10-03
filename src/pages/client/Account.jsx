import { useState } from "react";
import EditProfileForm from "../../components/UserAccount/EditProfileForm/EditProfileForm";
import ProfileInfo from "../../components/UserAccount/ProfileInfo/ProfileInfo";
import { HiPencil } from "react-icons/hi";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../../hooks/useAuthCheck";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useAuthCheck({ isEmployeeOnly: false });

  const handleSave = async (editedInfo) => {
    const dataToSend = {
      nome: editedInfo.nome || user.nome,
      email: editedInfo.email || user.email,
      telefone: editedInfo.telefone || user.telefone, // Adiciona telefone
      qtd_pedidos: user.qtd_pedidos, // Mantém o qtd_pedidos atual
    };

    if (editedInfo.senha) {
      dataToSend.senha = editedInfo.senha;
    }

    try {
      const response = await fetch(`http://localhost:3000/clientes/${user.id_cliente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (data.status) {
        setUser((prevUser) => {
          const updatedUser = { ...prevUser, ...data.data };
          localStorage.setItem("user", JSON.stringify(updatedUser)); // Atualiza localStorage
          return updatedUser;
        });
        toast.success("Perfil atualizado com sucesso!");
        setEditMode(false);
        navigate("/sections/account");
      } else {
        toast.error("Erro ao salvar!");
        console.error("Erro ao atualizar perfil:", data.msg);
      }
    } catch (error) {
      toast.error("Erro ao salvar!");
      console.error("Erro ao atualizar perfil:", error);
    }
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
