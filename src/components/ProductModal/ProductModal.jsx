/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./styles.module.css";
import { BsFire } from "react-icons/bs";
import { ImSpoonKnife } from "react-icons/im";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuDessert } from "react-icons/lu";

const ProductModal = ({ product, onClose }) => {
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

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
                  <div className={styles.optionPrice}>R$ 17</div>
                </div>
                <input type="radio" name="tamanho" value="mini" />
              </div>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Normal</div>
                  <div className={styles.optionPrice}>R$ 19</div>
                </div>
                <input type="radio" name="tamanho" value="normal" />
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
                <input type="radio" name="acompanha-salada" value="sim" />
              </div>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Não</div>
                </div>
                <input type="radio" name="acompanha-salada" value="nao" />
              </div>
            </div>
          </div>
        );
  
      case "bebidas":
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
                  <div className={styles.optionName}>250ml</div>
                  <div className={styles.optionPrice}>R$ 5</div>
                </div>
                <input type="radio" name="tamanho" value="250ml" />
              </div>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>500ml</div>
                  <div className={styles.optionPrice}>R$ 7</div>
                </div>
                <input type="radio" name="tamanho" value="500ml" />
              </div>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>1L</div>
                  <div className={styles.optionPrice}>R$ 10</div>
                </div>
                <input type="radio" name="tamanho" value="1L" />
              </div>
            </div>
            <div className={styles.labelContainer}>
              <div className={styles.label}>
                Gelo
                <p className={styles.description}>Selecione 1 opção</p>
              </div>
              <div className={styles.required}>OBRIGATÓRIO</div>
            </div>
            <div className={styles.options}>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Com Gelo</div>
                </div>
                <input type="radio" name="gelo" value="com-gelo" />
              </div>
              <div className={styles.optionItem}>
                <div className={styles.optionDetails}>
                  <div className={styles.optionName}>Sem Gelo</div>
                </div>
                <input type="radio" name="gelo" value="sem-gelo" />
              </div>
            </div>
          </div>
        );
  
      default:
        return null;
    }
  };
  

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
              src={`http://localhost:3000/${product.caminho_imagem}`} // TODO colocar {product.caminho_imagem} depois...
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
          <button
            className={styles.addButton}
            onClick={() => {
              /* Adicione a funcionalidade de adicionar ao carrinho aqui */
            }}
          >
            Adicionar {product.valor_produto}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
