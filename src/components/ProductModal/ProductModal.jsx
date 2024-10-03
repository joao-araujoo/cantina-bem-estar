/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./styles.module.css";
import { BsFire } from "react-icons/bs";
import { ImSpoonKnife } from "react-icons/im";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuDessert } from "react-icons/lu";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify";

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.valor_produto);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(prev + delta, 1));
  };

  const renderCategoryIcon = () => {
    switch (product.categoria.toLowerCase()) {
      case "marmitas":
        return <ImSpoonKnife size={25} />;
      case "bebidas":
        return <RiDrinks2Fill size={25} />;
      case "sobremesas":
        return <LuDessert size={25} />;
      default:
        return <ImSpoonKnife size={25} />;
    }
  };

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      quantity,
      comment,
      price: product.valor_produto,
    };

    addToCart(productWithOptions, quantity, comment);

    const itemCount = quantity > 1 ? `${quantity}x` : `1x`;
    const itemText =
      quantity > 1
        ? `"${product.nome}" foram adicionados ao carrinho com sucesso!`
        : `"${product.nome}" foi adicionado ao carrinho com sucesso!`;

    toast.success(`(${itemCount}) ${itemText}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    onClose();
  };

  const totalPrice = (price * quantity).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className={styles.modalOverlay} key={product.id_produto}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.headerTitle}>
            {renderCategoryIcon()}
            <h2>{product.nome}</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.imageContainer}>
            <img
              src={`http://localhost:3000/${product.caminho_imagem}`}
              alt={product.nome}
              className={styles.productImage}
            />
          </div>
          <div className={styles.detailsContainer}>
            <p style={{ color: "#666" }}>{product.descricao}</p>

            <div className={styles.commentSection}>
              <div className={styles.commentHeader}>
                <label htmlFor="comment">Algum comentário?</label>
                <span className={styles.characterCount}>
                  {comment.length} / 300
                </span>
              </div>
              <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Ex: Adicione um pouco mais de sal!"
                rows="4"
                maxLength="300"
                className={styles.commentInput}
              />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.footerContent}>
            <div className={styles.calories}>
              <p>
                <BsFire size={25} color="#e34534" />
                {product.calorias} kcal
              </p>
            </div>
            <div className={styles.productQuantity}>
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>
          <button className={styles.addButton} onClick={handleAddToCart}>
            Adicionar {totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
