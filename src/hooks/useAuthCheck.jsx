import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function useAuthCheck({
  isAdminOnly = false,
  isEmployeeOnly = false,
}) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const currentPath = window.location.pathname;

      // Verificações para tipos de usuário e permissões
      if (parsedUser.userType === "cliente" && isEmployeeOnly) {
        navigate("/unauthorized"); // Redireciona clientes que tentam acessar páginas de funcionários para "não autorizado"
      } else if (
        parsedUser.userType === "funcionario" &&
        isAdminOnly &&
        parsedUser.permissao !== 2
      ) {
        navigate("/unauthorized"); // Redireciona funcionários não admin para "não autorizado"
      } else if (
        parsedUser.userType === "funcionario" &&
        (currentPath.startsWith("/sections") || currentPath === "/")
      ) {
        navigate("/unauthorized"); // Redireciona funcionários que tentam acessar páginas de clientes para "não autorizado"
      }
    } else {
      navigate("/login"); // Redireciona para a página de login se o usuário não estiver autenticado
    }
  }, [setUser, navigate, isAdminOnly, isEmployeeOnly]);

  return user;
}
