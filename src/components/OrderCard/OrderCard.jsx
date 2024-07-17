import styles from "./styles.module.css";
import PropTypes from "prop-types";

OrderCard.propTypes = {
  orderData: PropTypes.object.isRequired,
};

export default function OrderCard({ orderData }) {
  const formatPrice = (price) => {
    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      return "Preço inválido";
    }
    return priceNumber.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 1: // Assuming 1 represents "Pendente"
        return styles.pending;
      case 2: // Assuming 2 represents "Em andamento"
        return styles.proccess;
      case 3: // Assuming 3 represents "Finished"
        return styles.finished;
      case 4: // Assuming 4 represents "Entregue"
        return styles.delivered;
      default:
        return;
    }
  };

  return (
    <div className={styles.wrapper} key={orderData.id_pedido}>
      <p style={{ fontStyle: "italic" }}>#{orderData.id_pedido}</p>
      <p>
        Horário de retirada: <span>{orderData.horario_retirada || "Não especificado"}</span>
      </p>
      <p>
        Produtos: <span>{orderData.descricao}</span>
      </p>
      <p>
        Observações: <span>{orderData.obs || "Sem observações"}</span>
      </p>
      <p>
        Preço total: <span>{formatPrice(orderData.valor_total)}</span>
      </p>
      <p>
        Status: <span className={getStatusStyle(orderData.status)}>
          {orderData.status === 1 ? "Pendente" :
            orderData.status === 2 ? "Em andamento" :
              orderData.status === 3 ? "Finalizado" :
                orderData.status === 4 ? "Entregue" : "Desconhecido"}
        </span>
      </p>
    </div>
  );
}
