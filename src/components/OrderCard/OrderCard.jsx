import styles from "./styles.module.css"; 
import PropTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";

OrderCard.propTypes = {
  orderData: PropTypes.object.isRequired,
  verificationCode: PropTypes.string.isRequired, // Adiciona a prop verificationCode
};

// Mapeamento de descrições detalhadas do status
const statusDescriptions = {
  1: "Seu pedido foi recebido e será preparado em breve.",
  2: "Seu pedido está sendo preparado.",
  3: "Seu pedido foi finalizado e está pronto, já pode ser retirado.",
  4: "Seu pedido foi concluído com sucesso.",
};

export default function OrderCard({ orderData, verificationCode }) {
  // Função para formatar o preço
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

  // Função para formatar o horário de retirada usando regex
  const formatPickupTime = (datetime) => {
    if (!datetime) return "Não especificado";

    // Regex para extrair a hora e o minuto no formato HH:MM
    const match = datetime.match(/\d{2}:\d{2}/);
    return match ? match[0] : "Hora inválida";
  };

  // Função para obter o estilo do status
  const getStatusStyle = (status) => {
    switch (status) {
      case 1: // Pendente
        return styles.pending;
      case 2: // Em andamento
        return styles.proccess;
      case 3: // Finalizado
        return styles.finished;
      case 4: // Entregue
        return styles.delivered;
      default:
        return;
    }
  };

  return (
    <div className={styles.wrapper} key={orderData.id_pedido}>
      <p style={{ fontStyle: "italic" }}>#{orderData.id_pedido}</p>
      <p>
        Horário de retirada:{" "}
        <span>{formatPickupTime(orderData.horario_retirada)}</span>
      </p>
      <p>
        Produtos: <span>{orderData.descricao}</span>
      </p>
      <p>
        Observações: <span>{orderData.obs || "Sem observações"}</span>
      </p>
      <p>
        Código de verificação: <span>{verificationCode}</span>
      </p>
      <p>
        Preço total: <span>{formatPrice(orderData.valor_total)}</span>
      </p>
      <p>
        <div className={styles["status-container"]}>
          Status:{" "}
          <span className={getStatusStyle(orderData.status)}>
            {orderData.status === 1
              ? "Pendente"
              : orderData.status === 2
              ? "Em andamento"
              : orderData.status === 3
              ? "Finalizado"
              : orderData.status === 4
              ? "Entregue"
              : "Desconhecido"}
          </span>
          <FaInfoCircle
            title={statusDescriptions[orderData.status]} // Usando o tooltip nativo
            style={{ cursor: "pointer", marginLeft: "5px" }}
          />
        </div>
      </p>
    </div>
  );
}
