import "./styles.css";

export default function CheckoutContainer({ cart }) {
  return (
    <div className="checkout-container">
      <div>
        <p>
          Total: <span>1 item</span>
        </p>
        <h2>R$ 10,00</h2>
      </div>
      <div>
        <button>Finalizar compra</button>
      </div>
    </div>
  );
}