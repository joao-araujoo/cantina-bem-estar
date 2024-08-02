import { Link } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import "./styles.css";

export default function CheckoutContainer() {
  const { calculateSubtotal, cart } = useCart();
  const subtotal = calculateSubtotal();
  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <div>
        <p>
          Total:{" "}
          <span>
            {totalItems} {totalItems === 1 ? "item" : "itens"}
          </span>
        </p>
        <h2>R$ {subtotal.toFixed(2)}</h2>
      </div>
      <div>
        <Link
          to="/sections/cart"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <button>Finalizar compra</button>
        </Link>
      </div>
    </div>
  );
}
