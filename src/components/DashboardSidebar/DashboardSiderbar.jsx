import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { GoHomeFill } from "react-icons/go";
import { MdBorderColor } from "react-icons/md";
import { MdDinnerDining } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { GiCook } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

const DashboardSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLinkClick = (e) => {
    const ripple = document.createElement("span");
    ripple.className = styles.ripple;
    ripple.style.left = `${e.clientX - e.target.offsetLeft}px`;
    ripple.style.top = `${e.clientY - e.target.offsetTop}px`;
    e.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <img
          src="/Logo Branca.png"
          alt="Logo da Cantina"
          className={styles.logo}
        />
        <NavLink
          to="/dashboard"
          exact
          activeClassName={styles.active}
          onClick={handleLinkClick}
        >
          <GoHomeFill size={25} />
          Home
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          activeClassName={styles.active}
          onClick={handleLinkClick}
        >
          <MdBorderColor size={25} />
          Pedidos
        </NavLink>
        <NavLink
          to="/dashboard/products"
          activeClassName={styles.active}
          onClick={handleLinkClick}
        >
          <MdDinnerDining size={25} />
          Produtos
        </NavLink>
        <NavLink
          to="/dashboard/clients"
          activeClassName={styles.active}
          onClick={handleLinkClick}
        >
          <MdPerson size={25} />
          Clientes
        </NavLink>
        <NavLink
          to="/dashboard/employees"
          activeClassName={styles.active}
          onClick={handleLinkClick}
          style={{ borderBottom: "1px solid #e67165" }}
        >
          <GiCook size={25} />
          Funcionários
        </NavLink>
        <div className={styles.logoutContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FiLogOut size={25} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
