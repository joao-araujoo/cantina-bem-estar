/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
  const [selectedOptions, setSelectedOptions] = useState({});
  const [price, setPrice] = useState(product.valor_produto);

  useEffect(() => {
    let newPrice = parseFloat(product.valor_produto);

    // Atualiza o preço baseado na opção "tamanho"
    if (selectedOptions.tamanho === "normal") {
      newPrice += 2.0; // Ajuste o valor conforme necessário
    }

    setPrice(newPrice);
  }, [selectedOptions, product.valor_produto]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(prev + delta, 1));
  };

  const handleOptionChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.value,
    });
  };

  const validateOptions = () => {
    const requiredOptions = {
      marmitas: ["tamanho", "acompanha-salada"],
    };

    const required = requiredOptions[product.categoria.toLowerCase()] || [];

    for (const option of required) {
      if (!selectedOptions[option]) {
        return false;
      }
    }
    return true;
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

  const renderCategorySpecificContent = () => {
    const category = product.categoria.toLowerCase();

    switch (category) {
      case "marmitas":
        return (
          <div className={styles.optionContainer}>
            <div className={styles.labelContainer}>
              <div className={styles.label}>
                Tamanho
                <p className={styles.description}>Selecione 1 opção</p>
              </div>
              <div className={styles.required}>OBRIGATÓRIO</div>
            </div>
            <div className={styles.options}>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Mini</div>
                  <div className={styles.optionPrice}>+ R$ 0,00</div>
                </div>
                <input
                  type="radio"
                  name="tamanho"
                  value="mini"
                  onChange={handleOptionChange}
                />
              </div>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Normal</div>
                  <div className={styles.optionPrice}>+ R$ 2,00</div>
                </div>
                <input
                  type="radio"
                  name="tamanho"
                  value="normal"
                  onChange={handleOptionChange}
                />
              </div>
            </div>

            <div className={styles.labelContainer}>
              <div className={styles.label}>
                Acompanha Salada
                <p className={styles.description}>Selecione uma opção</p>
              </div>
              <div className={styles.required}>OBRIGATÓRIO</div>
            </div>
            <div className={styles.options}>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Sim</div>
                </div>
                <input
                  type="radio"
                  name="acompanha-salada"
                  value="sim"
                  onChange={handleOptionChange}
                />
              </div>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Não</div>
                </div>
                <input
                  type="radio"
                  name="acompanha-salada"
                  value="nao"
                  onChange={handleOptionChange}
                />
              </div>
            </div>
          </div>
        );

      case "bebidas":
      case "sobremesas":
        return null;

      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    if (!validateOptions()) {
      toast.error("Por favor, selecione todas as opções obrigatórias.");
      return;
    }

    const productWithOptions = {
      ...product,
      ...selectedOptions,
      quantity,
      comment,
      price: price.toFixed(2),
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

            {renderCategorySpecificContent()}

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
