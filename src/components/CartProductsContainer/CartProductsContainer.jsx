import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify"; // Importar toast
import styles from "./styles.module.css";

export default function CartProductsContainer() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId) => {
    const removedProduct = cart.find((item) => item.id_produto === productId);
    toast.success(`${removedProduct.nome} foi removido do carrinho com sucesso!`, {
      position: "top-center", // Alterado para topo centralizado
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    removeFromCart(productId);
  };

  return (
    <div className={styles.productsContainer}>
      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>
          Seu carrinho está vazio =(
          <br />
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#e34534",
              fontWeight: "600",
            }}
          >
            Dê uma olhada em nossos deliciosos produtos!
          </Link>
        </p>
      ) : (
        cart.map((product) => (
          <div key={product.id_produto} className={styles.productCard}>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveFromCart(product.id_produto)}
              title="Remover do carrinho"
            >
              ✖
            </button>
            <div className={styles.productImage}>
              <img
                src={`http://localhost:3000/${product.caminho_imagem}`}
                alt={product.nome}
              />
            </div>
            <div className={styles.productData}>
              <h3>{product.nome}</h3>
              <p>
                <div className={styles.productQuantity}>
                  <button
                    onClick={() => updateQuantity(product.id_produto, -1)}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => updateQuantity(product.id_produto, 1)}>
                    +
                  </button>
                </div>
                <strong>
                  {parseFloat(
                    product.valor_produto * product.quantity
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
