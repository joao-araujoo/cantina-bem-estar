import { useCart } from "../../../contexts/CartContext";
import "./styles.css";

export default function PaymentSection() {
  const { calculateSubtotal } = useCart();
  const subtotal = calculateSubtotal();

  return (
    <div className="payment-items">
      <div className="sub-total">
        <span>Subtotal: </span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>
      <div className="shipping">
        <span>Entrega: </span>
        <span>R$ 0,00</span>
      </div>
    </div>
  );
}
