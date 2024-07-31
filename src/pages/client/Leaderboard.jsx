import { useEffect, useState } from "react";
import SectionsContentHeader from "../../components/SectionsContentHeader/SectionsContentHeader";
import styles from "./leaderboard.module.css";
import { useAuth } from "../../contexts/AuthContext";
import useAuthCheck from "../../hooks/useAuthCheck";

export default function Leaderboard() {
  const [clientes, setClientes] = useState([]);
  const { user } = useAuth();

  useAuthCheck({ isEmployeeOnly: false });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/clientes");
        const data = await response.json();
        if (data.status) {
          const clientesData = data.data;
          const clientesOrdenados = clientesData.sort((a, b) => b.qtd_pedidos - a.qtd_pedidos);
          clientesOrdenados.forEach((cliente, index) => {
            cliente.ranking = index + 1;
          });
          setClientes(clientesOrdenados); // Atualizar estado apenas uma vez
        } else {
          console.error("Erro ao buscar clientes:", data.msg);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []); // Dependência vazia indica que o useEffect deve ser executado apenas uma vez ao montar o componente

  const topClientes = clientes.slice(0, 5); // Pegar os top 5 clientes

  const clienteSimulado = user && clientes.find(
    (cliente) => cliente.nome === user.nome
  );

  return (
    <>
      <SectionsContentHeader title="Placar de Líderes" />
      <div className={styles.tableContainer}>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Usuário</th>
              <th>Qtd. Marmitas</th>
            </tr>
          </thead>
          <tbody>
            {topClientes.map((cliente) => (
              <tr key={cliente.nome}>
                <td>#{cliente.ranking}</td>
                <td className={styles.userColumn}>
                  {/* Usar a URL completa da imagem aqui */}
                  <img
                    src={`http://localhost:3000/${cliente.caminho_imagem}`}
                    alt={cliente.nome}
                    className={styles.userImage}
                  />
                  {cliente.nome}
                </td>
                <td>{cliente.qtd_pedidos}</td>
              </tr>
            ))}
            {/* Última linha para o usuário logado (independente do ranking) */}
            {clienteSimulado && (
              <tr>
                <td>#{clienteSimulado.ranking}</td>
                <td className={styles.userColumn}>
                  <img
                    src={`http://localhost:3000/${clienteSimulado.caminho_imagem}`}
                    alt={clienteSimulado.nome}
                    className={styles.userImage}
                  />
                  {clienteSimulado.nome}
                </td>
                <td>{clienteSimulado.qtd_pedidos}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
