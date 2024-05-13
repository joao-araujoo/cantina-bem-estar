import SectionsContentHeader from "../../components/SectionsContentHeader/SectionsContentHeader";
import styles from "./leaderboard.module.css";

export default function Leaderboard() {
  const clientes = [
    {
      nome: "Eduardo",
      caminho_imagem: "/users-images/imagem_cliente_1.webp",
      qtd_pedidos: 5,
    },
    {
      nome: "Giselle",
      caminho_imagem: "/users-images/imagem_cliente_2.jpg",
      qtd_pedidos: 10,
    },
    {
      nome: "Amanda",
      caminho_imagem: "/users-images/imagem_cliente_3.jpg",
      qtd_pedidos: 3,
    },
    {
      nome: "Rubervaldo",
      caminho_imagem: "/users-images/imagem_cliente_4.jpeg",
      qtd_pedidos: 7,
    },
    {
      nome: "Yuri Alberto",
      caminho_imagem: "/users-images/imagem_cliente_5.jpg",
      qtd_pedidos: 2,
    },
    {
      nome: "Willian Arão",
      caminho_imagem: "/users-images/imagem_cliente_6.webp",
      qtd_pedidos: 8,
    },
    {
      nome: "Raúl Seixas",
      caminho_imagem: "/users-images/imagem_cliente_7.jpg",
      qtd_pedidos: 6,
    },
    {
      nome: "Tim Maia",
      caminho_imagem: "/users-images/imagem_cliente_8.avif",
      qtd_pedidos: 4,
    },
    {
      nome: "Kauã Alves Ribeiro",
      caminho_imagem: "/users-images/imagem_cliente_9.jpeg",
      qtd_pedidos: 15,
    },
    {
      nome: "Randola",
      caminho_imagem: "/users-images/imagem_cliente_10.jpeg",
      qtd_pedidos: 1,
    },
  ];

  const clientesOrdenados = clientes.sort(
    (a, b) => b.qtd_pedidos - a.qtd_pedidos
  );

  clientesOrdenados.forEach((cliente, index) => {
    cliente.ranking = index + 1;
  });

  const topClientes = clientesOrdenados.slice(0, 5);

  const clienteSimulado = clientes.find(
    (cliente) => cliente.nome === "Tim Maia"
  );

  return (
    <>
      <SectionsContentHeader title="Placar de Líderes" />
      <div className={styles.tableContainer}>
        <table className={styles.table}>
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
                  <img
                    src={cliente.caminho_imagem}
                    alt={cliente.nome}
                    className={styles.userImage}
                  />
                  {cliente.nome}
                </td>
                <td>{cliente.qtd_pedidos}</td>
              </tr>
            ))}
            {/* Última linha para o usuário (independente do ranking) */}
            <tr>
              <td>#{clienteSimulado.ranking}</td>
              <td className={styles.userColumn}>
                <img
                  src={clienteSimulado.caminho_imagem}
                  alt={clienteSimulado.nome}
                  className={styles.userImage}
                />
                {clienteSimulado.nome}
              </td>
              <td>{clienteSimulado.qtd_pedidos}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
