import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

export default function CartCheckoutContainer() {
  const { cart, clearCart, calculateSubtotal } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [pickupTime, setPickupTime] = useState("");

  const subtotal = calculateSubtotal();
  const delivery = 0;
  const total = subtotal + delivery;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error(
        "O carrinho está vazio. Adicione itens antes de finalizar a compra.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        }
      );
      return;
    } 

    if (!user) {
      toast.error("Você precisa estar logado para realizar um pedido.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return;
    }

    if (!pickupTime) {
      toast.error("O horário de retirada é obrigatório.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return;
    }

    const description = cart
      .map(
        (item) =>
          `#${item.id_produto} ${item.nome} (${item.quantity} unidade(s))`
      )
      .join(", ");

    const observation = cart
      .map((item) => (item.comment ? `${item.nome} - ${item.comment}` : ""))
      .filter((obs) => obs) // Remove entradas vazias
      .join(", ");

    // Formata o horário para o formato do banco de dados
    const now = new Date();
    const formattedPickupTime = new Date(
      `${now.toISOString().split("T")[0]}T${pickupTime}:00Z`
    ).toISOString();

    const orderData = {
      id_cliente: user.id_cliente,
      descricao: description,
      obs: observation,
      status: 1,
      id_produtos: JSON.stringify(cart),
      valor_total: total,
      pagamento: paymentMethod,
      horario_retirada: formattedPickupTime, // Adiciona o horário de retirada
    };

    try {
      const response = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar o pedido");
      }

      toast.success(
        <div>
          Pedido realizado com sucesso!
          <br />
          <a
            href="/sections/orders"
            style={{
              color: "#000",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Ver meus pedidos
          </a>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        }
      );
      clearCart();
      setPaymentMethod(null);
      setPickupTime("");
    } catch (error) {
      toast.error("Erro ao realizar o pedido. Tente novamente.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h4>Resumo do pedido</h4>
      <div className={styles.subPrices}>
        <p>Subtotal</p>
        <p>
          <strong>
            {subtotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </p>
      </div>
      <div className={styles.subPrices}>
        <p>Entrega</p>
        <p>
          <strong>
            {delivery.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </p>
      </div>
      <div className={styles.totalPrice}>
        <p>
          <strong>Total</strong>
        </p>
        <p>
          <strong>
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </p>
      </div>
      <input
        className={styles.timeInput}
        type="time"
        title="Selecione o horário de retirada"
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
      />
      <button className={styles.purchaseButton} onClick={handlePlaceOrder}>
        Finalizar Compra
      </button>
    </div>
  );
}
