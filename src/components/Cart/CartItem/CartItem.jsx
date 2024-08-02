/* eslint-disable react/prop-types */
import { useCart } from "../../../contexts/CartContext";
import "./styles.css";

export default function CartItem({ product }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__characteristics">
        <div className="cart-item__image">
          <img src={`http://localhost:3000/${product.caminho_imagem}`} alt={product.nome} />
        </div>
        <div className="cart-item__specifications">
          <div>
            <h3>{product.nome}</h3>
            <p>{product.categoria}</p>
          </div>
          <div className="cart-item__options">
            <h2>{parseFloat(product.valor_produto).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}</h2>
            <div className="product-quantity">
              <button onClick={() => updateQuantity(product.id_produto, -1)}>
                -
              </button>
              <span>{product.quantity}</span>
              <button onClick={() => updateQuantity(product.id_produto, 1)}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="removeFromCart-button"
        onClick={() => removeFromCart(product.id_produto)}
      >
        ✖
      </button>
    </div>
  );
}
