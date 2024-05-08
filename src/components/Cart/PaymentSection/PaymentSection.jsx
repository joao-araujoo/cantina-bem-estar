import "./styles.css";

export default function PaymentSection() {
  return (
    <div className="payment-items">
      <div className="sub-total">
        <span>Subtotal: </span>
        <span>
          R$ 10,00
        </span>
      </div>
      <div className="shipping">
        <span>Entrega: </span>
        <span>
          R$ 0,00
        </span>
      </div>
    </div>
  );
}
