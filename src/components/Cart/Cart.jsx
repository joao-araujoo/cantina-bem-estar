import { useCart } from "../../contexts/CartContext";
import "./styles.css";
import PaymentSection from "./PaymentSection/PaymentSection";
import CheckoutContainer from "./CheckoutContainer/CheckoutContainer";
import CartItem from "./CartItem/CartItem";

// eslint-disable-next-line react/prop-types
export default function Cart({ menuRef }) {
  const { cart } = useCart();

  return (
    <div className="cart-menu" ref={menuRef}>
      <header>
        <h2>Meu carrinho</h2>
      </header>
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>
              Seu carrinho está vazio =(
            </p>
          </div>
        ) : (
          <>
            {cart.map((product) => (
              <CartItem key={product.id_produto} product={product} />
            ))}
            <PaymentSection />
            <hr className="cart-menu-bar" />
          </>
        )}
      </div>
      <CheckoutContainer />
    </div>
  );
}
