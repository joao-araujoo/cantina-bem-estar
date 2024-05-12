import styles from "./styles.module.css";
import PropTypes from "prop-types";

OrderCard.propTypes = {
  orderData: PropTypes.object,
};

export default function OrderCard({ orderData }) {
  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pendente":
        return styles.pending;
      case "Entregue":
        return styles.delivered;
      default:
        return;
    }
  };

  return (
    <div
      className={styles.wrapper}
      key={orderData.id_pedido}
    >
      <p style={{ fontStyle: "italic" }}>#{orderData.id_pedido}</p>
      <p>
        Horário de retirada: <span>{orderData.horario_retirada}</span>
      </p>
      <p>
        Produtos: <span>{orderData.descricao}</span>
      </p>
      <p>
        Observações: <span>{orderData.obs || "Sem observações"}</span>
      </p>
      <p>
        Preço total: <span>{formatPrice(orderData.preco)}</span>
      </p>
      <p>
        Status: <span className={getStatusStyle(orderData.status)}>{orderData.status}</span>
      </p>
    </div>
  );
}
