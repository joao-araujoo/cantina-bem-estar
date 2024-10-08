import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { RiFileList3Fill } from "react-icons/ri";
import { MdManageAccounts, MdLogout } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function UserModal() {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); 
    logout();
    clearCart();
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="greetings">
        Olá, {user ? user.nome : 'Cliente'}!
      </h2>
      <div className="links">
        <Link to="/sections/orders">
          <RiFileList3Fill size={20} />
          Pedidos
        </Link>
        <Link to="/sections/account">
          <MdManageAccounts size={20} />
          Minha Conta
        </Link>
        <Link to="/sections/leaderboard">
          <FaTrophy size={20} />
          Ranking
        </Link>
        <Link to="/sections/help">
          <IoMdHelpCircle size={20} />
          Ajuda
        </Link>
        <a href="/login" onClick={handleLogout}>
          <MdLogout size={20} />
          Sair
        </a>
      </div>
    </div>
  );
}
