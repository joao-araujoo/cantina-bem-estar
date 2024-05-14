// import useCart from "../../hooks/useCart";
import "./styles.css";
// import CartItem from "./CartItem/CartItem";
import PaymentSection from "./PaymentSection/PaymentSection";
import CheckoutContainer from "./CheckoutContainer/CheckoutContainer";
import CartItem from "./CartItem/CartItem";

// eslint-disable-next-line react/prop-types
export default function Cart({ menuRef }) {
  // const { cart } = useCart();

  return (
    <div className="cart-menu" ref={menuRef}>
      <header>
        <h2>Meu carrinho</h2>
      </header>
      <div className="cart-items">
        <CartItem productObject={{id: 1, name: "Filé de Frango", category: "Tradicionais", price: "R$ 17,00", image_path: "/products-images/marmita-combo.jpg"}} />
        <CartItem productObject={{id: 1, name: "Berinjela", category: "Veganas", price: "R$ 17,00", image_path: "/products-images/marmita-quinoa.webp"}} />
        <CartItem productObject={{id: 1, name: "Batata doce", category: "Fitness", price: "R$ 17,00", image_path: "/products-images/marmita-fitness.jpg"}} />
        <CartItem productObject={{id: 1, name: "Coca-Cola", category: "Bebidas", price: "R$ 5,00", image_path: "/products-images/coca-cola.webp"}} />
        <CartItem productObject={{id: 1, name: "Açai", category: "Sobremesas", price: "R$ 13,00", image_path: "/products-images/acai.jpg"}} />
      </div>

      <PaymentSection />
      <hr className="cart-menu-bar" />

      <CheckoutContainer />
    </div>
  );
}
