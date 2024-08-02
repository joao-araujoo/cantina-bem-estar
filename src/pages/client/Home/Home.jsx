import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import { LiaSearchSolid } from "react-icons/lia";
import { HiOutlineShoppingBag, HiMiniUser } from "react-icons/hi2";
import { GiHotMeal } from "react-icons/gi";
import { FaAppleWhole, FaClock, FaCartShopping } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";
import Cart from "../../../components/Cart/Cart";
import UserModal from "../../../components/UserModal/UserModal";
import ProductModal from "../../../components/ProductModal/ProductModal";
import { useAuth } from "../../../contexts/AuthContext";
import useAuthCheck from "../../../hooks/useAuthCheck";

export default function Home() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cartMenu = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();

  useAuthCheck({ isEmployeeOnly: false });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/produtos");
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCartMenuClick = () => {
    const newRightValue =
      cartMenu.current.style.right === "0px" ? "-350px" : "0px";
    cartMenu.current.style.right = newRightValue;
    if (newRightValue === "0px") setIsModalOpen(false);
  };

  const handleUserButtonClick = () => {
    if (user) {
      setIsModalOpen(!isModalOpen);
    } else {
      navigate("/login"); // Redireciona para a página de login se o usuário não estiver autenticado
    }
  };

  const handleSearchInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    const filteredResults = products.filter((item) =>
      item.nome.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults.slice(0, 5));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleSearchBarProductClick = (product) => {
    setSelectedProduct(product); // Define o produto selecionado
  };

  // Agrupa produtos por categoria
  const productsByCategory = products.reduce((acc, product) => {
    const { categoria } = product;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(product);
    return acc;
  }, {});

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        cartMenu.current &&
        !cartMenu.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        cartMenu.current.style.right = "-350px";
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .swiper-pagination-bullet {
          background-color: #e34534;
          width: 10px;
          height: 10px;
        }

        .cards-container {
          width: 90%;
          margin: 30px auto 60px auto;
          display: flex;
          gap: 30px; 
          justify-content: space-between;
        }

        .card {
          width: 30%;
          background-color: #fff;
          box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.25);          
          padding: 30px 20px;
          border-radius: 5px;
          font-size: 14px;
          text-align: justify;
        }

        .card .title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(9px, 11px, 15px); 
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .cards-container {
            flex-direction: column;
          }

          .card {
            width: 100%;
          }
        }
      `}</style>

      <header className={styles.header}>
        <img
          width={150}
          src="/Logo Vermelha - Transparente.png"
          alt="Logo - Cantina Bem Estar"
        />
        <div className={styles.searchBar}>
          <form>
            <input
              type="search"
              name="search-text"
              id="search-text"
              placeholder="O que deseja saborear hoje?"
              autoComplete="off"
              value={searchText}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className="search-button">
              <LiaSearchSolid color="#e34534" />
            </button>
          </form>
          {searchText && (
            <div className={styles.searchBarItems}>
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.id_produto}
                    className={styles.searchBarProduct}
                    onClick={() => handleSearchBarProductClick(result)} // Abre o modal com o produto selecionado
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "45%",
                      }}
                    >
                      <img
                        src={`http://localhost:3000/${result.caminho_imagem}`}
                        alt={result.nome}
                        style={{ height: "30px", width: "30px" }}
                      />
                      <p>{result.nome}</p>
                    </div>
                    <h4>
                      {parseFloat(result.valor_produto).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </h4>
                  </div>
                ))
              ) : (
                <div className={styles.searchBarProduct}>
                  Nenhum resultado encontrado =(
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className="cart-button"
            onClick={handleCartMenuClick}
            ref={hamburgerRef}
          >
            <HiOutlineShoppingBag />
          </button>
          <button className="user-button" onClick={handleUserButtonClick}>
            {user ? <HiMiniUser /> : <FiLogIn />}
          </button>
        </div>
      </header>

      <Cart menuRef={cartMenu} />
      {isModalOpen && <UserModal />}

      <main>
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          loop
          style={{
            width: "90%",
            borderRadius: "15px",
            boxShadow: "0px 0px 3px 1px rgba(0,0,0,0.5)",
          }}
        >
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
              src="https://i.pinimg.com/originals/3e/cb/b2/3ecbb22f1f1dc96a82546d094f667fc7.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
              src="https://t3.ftcdn.net/jpg/04/57/73/82/360_F_457738290_y8fywtzTyfT2pQzU5mL1OpKHHAERc6kS.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
              src="https://jcconcursos.com.br/media/_versions/noticia/prato-feito_1_widelg.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
              src="https://ibis.accor.com/editorial/imagerie/article/comida-mineira-pratos-tipicos-de-cada-regiao-do-brasil-358a_660x440.jpg"
            />
          </SwiperSlide>
        </Swiper>

        <div className="cards-container">
          <div className="card">
            <div className="title">
              <FaAppleWhole color="#e34534" size={50} />
              <h2>Saúde e Bem-Estar</h2>
            </div>
            <p>
              Saboreie refeições nutritivas e deliciosas, preparadas com
              ingredientes frescos e amorosos para cuidar do seu bem-estar.
            </p>
          </div>

          <div className="card">
            <div className="title">
              <GiHotMeal color="#e34534" size={50} />
              <h2>Variedade no Cardápio</h2>
            </div>
            <p>
              Explore uma variedade de pratos que atendem a todos os gostos e
              necessidades alimentares. A cada semana, novos sabores e opções.
            </p>
          </div>

          <div className="card">
            <div className="title">
              <FaClock color="#e34534" size={50} />
              <h2>Agilidade no Atendimento</h2>
            </div>
            <p>
              Receba suas refeições de forma rápida e eficiente para que você
              possa aproveitar o seu dia sem preocupações.
            </p>
          </div>
        </div>

        <div
          className="packedLunchs-container"
          style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {Object.keys(productsByCategory).map((category) => (
            <div key={category}>
              <h2 style={{ marginTop: "20px" }}>{category}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  padding: "20px",
                  gap: "30px",
                }}
              >
                {productsByCategory[category].map((product) => (
                  <div
                    className={styles.packedLunchCard}
                    key={product.id_produto}
                  >
                    <img
                      width={100}
                      height={100}
                      src={`http://localhost:3000/${product.caminho_imagem}`}
                      alt={product.nome}
                    />
                    <p>{product.nome}</p>
                    <h3>
                      {parseFloat(product.valor_produto).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </h3>
                    <button onClick={() => handleProductClick(product)}>
                      <FaCartShopping size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </main>

      <Footer />
    </>
  );
}
