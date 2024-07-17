import styles from "./styles.module.css";
import { FaPix, FaPaypal  } from "react-icons/fa6";
import { RiMastercardFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";

export default function CartCheckoutContainer() {
  return (
    <div className={styles.checkoutContainer}>
      <h4>Resumo do pedido</h4>
      <div className={styles.subPrices}>
        <p>Subtotal</p>
        <p>
          <strong>R$ 36,00</strong>
        </p>
      </div>
      <div className={styles.subPrices}>
        <p>Entrega</p>
        <p>
          <strong>R$ 0,00</strong>
        </p>
      </div>
      <div className={styles.totalPrice}>
        <p>
          <strong>Total</strong>
        </p>
        <p>
          <strong>R$ 36,00</strong>
        </p>
      </div>
      <input
        className={styles.timeInput}
        type="time"
        title="Selecione o horário de retirada"
      />
      <div className={styles.paymentMethods}>
        <label className={styles.paymentLabel}>
          <input type="radio" name="payment" className={styles.paymentRadio} />
          <span className={styles.paymentButton} title="PIX">
            <FaPix />
          </span>
        </label>
        <label className={styles.paymentLabel}>
          <input type="radio" name="payment" className={styles.paymentRadio} />
          <span className={styles.paymentButton} title="Cartão">
            <RiMastercardFill />
          </span>
        </label>
        <label className={styles.paymentLabel}>
          <input type="radio" name="payment" className={styles.paymentRadio} />
          <span className={styles.paymentButton} title="PayPal">
            <FaPaypal />
          </span>
        </label>
        <label className={styles.paymentLabel}>
          <input type="radio" name="payment" className={styles.paymentRadio} />
          <span className={styles.paymentButton} title="Pagar na hora">
            <GiTakeMyMoney />
          </span>
        </label>
      </div>
      <button className={styles.purchaseButton}>Finalizar Compra</button>
    </div>
  );
}