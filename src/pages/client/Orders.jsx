import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../../components/OrderCard/OrderCard";
import SectionsContentHeader from "../../components/SectionsContentHeader/SectionsContentHeader";
import useAuthCheck from "../../hooks/useAuthCheck";

export default function Orders() {
  const [filter, setFilter] = useState("Todos");
  const [orders, setOrders] = useState([]);

  useAuthCheck({ isEmployeeOnly: false });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/pedidos");
        const data = await response.json();
        if (data.status) {
          setOrders(data.data); // Setando apenas o array de pedidos em 'data'
        } else {
          console.error("Erro ao buscar pedidos:", data.msg);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === "Todos") return true;
    if (filter === "Pendente") return order.status === 1 || order.status === 2 || order.status === 3;
    if (filter === "Entregue") return order.status === 4;
    return false;
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
            fontWeight: 500,
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
            fontWeight: 500,
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
            fontWeight: 500,
          }}
        >
          Entregue
        </button>
      </div>
      {/* Verifica se há pedidos filtrados */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard orderData={order} key={order.id_pedido} />
        ))
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img src="/no-orders.svg" alt="No orders" width="280px"/>
          <h2>Ainda não há pedidos!</h2>
          <p>
            Não sabe o que escolher?{" "}
            <Link to="/" style={{ color: "#E34534", textDecoration: "none", fontWeight: "600" }}>
              Conheça nossas queridinhas da casa!
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
