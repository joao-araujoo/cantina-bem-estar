import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

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
      setTimeout(() => {
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
      }, 300);
      return;
    }

    if (!user) {
      setTimeout(() => {
        toast.error("Você precisa estar logado para realizar um pedido.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      }, 300);
      return;
    }

    if (!pickupTime) {
      setTimeout(() => {
        toast.error("O horário de retirada é obrigatório.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      }, 300);
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
      .filter((obs) => obs)
      .join(", ");

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
      horario_retirada: formattedPickupTime,
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

      // Enviar e-mail de confirmação
      await emailjs.send(
        "service_tih0e8j",
        "template_gwd7unn",
        {
          to_name: user.nome,
          to_email: user.email,
          order_description: description,
          total_value: total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          pickup_time: new Date(formattedPickupTime).toLocaleString('en-US', { timeZone: 'UTC', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }).replace(',', ''),
        },
        "UD22PjRWUnZWXhcSS"
      );

      // Notificação de sucesso
      setTimeout(() => {
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
      }, 300);

      clearCart();
      setPaymentMethod(null);
      setPickupTime("");
    } catch (error) {
      setTimeout(() => {
        toast.error("Erro ao realizar o pedido. Tente novamente.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      }, 300);
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
