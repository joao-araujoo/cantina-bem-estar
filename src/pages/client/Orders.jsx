import { useState } from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import SectionsContentHeader from "../../components/SectionsContentHeader/SectionsContentHeader";

export default function Orders() {
  const [filter, setFilter] = useState("Todos");

  const orders = [
    {
      id_pedido: 1,
      descricao: "Marmita Executiva",
      obs: "Sem pimentão",
      horario_retirada: "12:00",
      preco: 18.5,
      status: "Pendente",
    },
    {
      id_pedido: 2,
      descricao: "Marmita Fitness",
      obs: "Adicionar frango grelhado",
      horario_retirada: "12:15",
      preco: 15.99,
      status: "Pendente",
    },
    {
      id_pedido: 3,
      descricao: "Marmita Vegetariana",
      obs: "",
      horario_retirada: "12:30",
      preco: 12.75,
      status: "Entregue",
    },
    {
      id_pedido: 4,
      descricao: "Marmita de Feijoada",
      obs: "Extra bacon",
      horario_retirada: "12:45",
      preco: 22.0,
      status: "Pendente",
    },
    {
      id_pedido: 5,
      descricao: "Marmita de Frango Assado",
      obs: "Adicionar molho barbecue",
      horario_retirada: "13:00",
      preco: 16.5,
      status: "Entregue",
    },
    {
      id_pedido: 6,
      descricao: "Marmita de Peixe Grelhado",
      obs: "Sem salada",
      horario_retirada: "13:15",
      preco: 19.25,
      status: "Pendente",
    },
    {
      id_pedido: 7,
      descricao: "Marmita Especial",
      obs: "",
      horario_retirada: "13:30",
      preco: 20.99,
      status: "Entregue",
    },
    {
      id_pedido: 8,
      descricao: "Marmita de Strogonoff",
      obs: "Sem champignon",
      horario_retirada: "13:45",
      preco: 17.75,
      status: "Pendente",
    },
    {
      id_pedido: 9,
      descricao: "Marmita de Risoto",
      obs: "Adicionar camarão",
      horario_retirada: "14:00",
      preco: 21.5,
      status: "Pendente",
    },
    {
      id_pedido: 10,
      descricao: "Marmita Vegana",
      obs: "",
      horario_retirada: "14:15",
      preco: 14.99,
      status: "Entregue",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (filter === "Todos") return true;
    return order.status === filter;
  });

  return (
    <>
      <SectionsContentHeader title="Meus Pedidos" />
      <div style={{ marginTop: "50px" }}>
        <button
          onClick={() => setFilter("Todos")}
          style={{
            color: filter === "Todos" ? "#E34534" : "#000",
            borderBottom: filter === "Todos" ? "2px solid #E34534" : "none",
            cursor: "pointer",
            border: "none",
            background: "none",
            fontSize: "17px",
            marginRight: "20px",
            fontWeight: 500
          }}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("Pendente")}
          style={{
            color: filter === "Pendente" ? "#E34534" : "#000",
            borderBottom: filter === "Pendente" ? "2px solid #E34534" : "none",
            cursor: "pointer",
            border: "none",
            background: "none",
            fontSize: "17px",
            marginRight: "20px",
            fontWeight: 500
          }}
        >
          Pendente
        </button>
        <button
          onClick={() => setFilter("Entregue")}
          style={{
            color: filter === "Entregue" ? "#E34534" : "#000",
            borderBottom: filter === "Entregue" ? "2px solid #E34534" : "none",
            cursor: "pointer",
            border: "none",
            background: "none",
            fontSize: "17px",
            marginRight: "20px",
            fontWeight: 500
          }}
        >
          Entregue
        </button>
      </div>
      {/* Mapeia apenas os pedidos filtrados */}
      {filteredOrders.map((order) => (
        <OrderCard orderData={order} key={order.id_pedido} />
      ))}
    </>
  );
}
