import Footer from "../../../components/Footer/Footer";
import { LiaSearchSolid } from "react-icons/lia";
import { HiOutlineShoppingBag, HiMiniUser } from "react-icons/hi2";
import { GiHotMeal } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAppleWhole, FaClock, FaCartShopping } from "react-icons/fa6";
import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";
import Cart from "../../../components/Cart/Cart";
import UserModal from "../../../components/UserModal/UserModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartMenu = useRef(null);
  const hamburgerRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const packedLunchs = [
    {
      id: 1,
      name: "Filé de Frango à Parmegiana",
      price: "R$ 17,00 - 19,00",
      calories: 350,
      category: "Tradicional",
      description: "Acompanha arroz, feijão, fritas e salada",
      image_path: "/products-images/marmita-combo.jpg",
    },
    {
      id: 2,
      name: "Salmão Grelhado",
      price: "R$ 17,00 - 19,00",
      calories: 400,
      category: "Fitness",
      description: "Acompanha quinoa, legumes e salada verde",
      image_path: "/products-images/marmita-quinoa.webp",
    },
    {
      id: 3,
      name: "Vegana de Lentilhas",
      price: "R$ 17,00 - 19,00",
      calories: 300,
      category: "Vegana",
      description: "Acompanha arroz integral, legumes e tofu",
      image_path: "/products-images/marmita-fitness.jpg",
    },
    {
      id: 4,
      name: "Coca-Cola",
      price: "R$ 5,00",
      calories: 140,
      category: "Bebidas",
      description: "Coca-Cola em lata",
      image_path: "/products-images/coca-cola.webp",
    },
    {
      id: 5,
      name: "Açaí",
      price: "R$ 10,00 - R$ 15,00",
      calories: 330,
      category: "Sobremesas",
      description: "",
      image_path: "/products-images/acai.jpg",
    },
    {
      id: 1,
      name: "Filé de Frango à Parmegiana",
      price: "R$ 17,00 - 19,00",
      calories: 350,
      category: "Tradicional",
      description: "Acompanha arroz, feijão, fritas e salada",
      image_path: "/products-images/marmita-combo.jpg",
    },
    {
      id: 2,
      name: "Salmão Grelhado",
      price: "R$ 17,00 - 19,00",
      calories: 400,
      category: "Fitness",
      description: "Acompanha quinoa, legumes e salada verde",
      image_path: "/products-images/marmita-quinoa.webp",
    },
    {
      id: 3,
      name: "Vegana de Lentilhas",
      price: "R$ 17,00 - 19,00",
      calories: 300,
      category: "Vegana",
      description: "Acompanha arroz integral, legumes e tofu",
      image_path: "/products-images/marmita-fitness.jpg",
    },
    {
      id: 4,
      name: "Coca-Cola",
      price: "R$ 5,00",
      calories: 140,
      category: "Bebidas",
      description: "Coca-Cola em lata",
      image_path: "/products-images/coca-cola.webp",
    },
    {
      id: 5,
      name: "Açaí",
      price: "R$ 10,00 - R$ 15,00",
      calories: 330,
      category: "Sobremesas",
      description: "",
      image_path: "/products-images/acai.jpg",
    },
    {
      id: 1,
      name: "Filé de Frango à Parmegiana",
      price: "R$ 17,00 - 19,00",
      calories: 350,
      category: "Tradicional",
      description: "Acompanha arroz, feijão, fritas e salada",
      image_path: "/products-images/marmita-combo.jpg",
    },
    {
      id: 2,
      name: "Salmão Grelhado",
      price: "R$ 17,00 - 19,00",
      calories: 400,
      category: "Fitness",
      description: "Acompanha quinoa, legumes e salada verde",
      image_path: "/products-images/marmita-quinoa.webp",
    },
    {
      id: 3,
      name: "Vegana de Lentilhas",
      price: "R$ 17,00 - 19,00",
      calories: 300,
      category: "Vegana",
      description: "Acompanha arroz integral, legumes e tofu",
      image_path: "/products-images/marmita-fitness.jpg",
    },
    {
      id: 4,
      name: "Coca-Cola",
      price: "R$ 5,00",
      calories: 140,
      category: "Bebidas",
      description: "Coca-Cola em lata",
      image_path: "/products-images/coca-cola.webp",
    },
    {
      id: 5,
      name: "Açaí",
      price: "R$ 10,00 - R$ 15,00",
      calories: 330,
      category: "Sobremesas",
      description: "",
      image_path: "/products-images/acai.jpg",
    },
    {
      id: 1,
      name: "Filé de Frango à Parmegiana",
      price: "R$ 17,00 - 19,00",
      calories: 350,
      category: "Tradicional",
      description: "Acompanha arroz, feijão, fritas e salada",
      image_path: "/products-images/marmita-combo.jpg",
    },
    {
      id: 2,
      name: "Salmão Grelhado",
      price: "R$ 17,00 - 19,00",
      calories: 400,
      category: "Fitness",
      description: "Acompanha quinoa, legumes e salada verde",
      image_path: "/products-images/marmita-quinoa.webp",
    },
    {
      id: 3,
      name: "Vegana de Lentilhas",
      price: "R$ 17,00 - 19,00",
      calories: 300,
      category: "Vegana",
      description: "Acompanha arroz integral, legumes e tofu",
      image_path: "/products-images/marmita-fitness.jpg",
    },
    {
      id: 4,
      name: "Coca-Cola",
      price: "R$ 5,00",
      calories: 140,
      category: "Bebidas",
      description: "Coca-Cola em lata",
      image_path: "/products-images/coca-cola.webp",
    },
    {
      id: 5,
      name: "Açaí",
      price: "R$ 10,00 - R$ 15,00",
      calories: 330,
      category: "Sobremesas",
      description: "",
      image_path: "/products-images/acai.jpg",
    },
    {
      id: 1,
      name: "Filé de Frango à Parmegiana",
      price: "R$ 17,00 - 19,00",
      calories: 350,
      category: "Tradicional",
      description: "Acompanha arroz, feijão, fritas e salada",
      image_path: "/products-images/marmita-combo.jpg",
    },
    {
      id: 2,
      name: "Salmão Grelhado",
      price: "R$ 17,00 - 19,00",
      calories: 400,
      category: "Fitness",
      description: "Acompanha quinoa, legumes e salada verde",
      image_path: "/products-images/marmita-quinoa.webp",
    },
    {
      id: 3,
      name: "Vegana de Lentilhas",
      price: "R$ 17,00 - 19,00",
      calories: 300,
      category: "Vegana",
      description: "Acompanha arroz integral, legumes e tofu",
      image_path: "/products-images/marmita-fitness.jpg",
    },
    {
      id: 4,
      name: "Coca-Cola",
      price: "R$ 5,00",
      calories: 140,
      category: "Bebidas",
      description: "Coca-Cola em lata",
      image_path: "/products-images/coca-cola.webp",
    },
    {
      id: 5,
      name: "Açaí",
      price: "R$ 10,00 - R$ 15,00",
      calories: 330,
      category: "Sobremesas",
      description: "",
      image_path: "/products-images/acai.jpg",
    },
    {
      id: 1,
      name: "Filé de Frango à Parmegiana",
      price: "R$ 17,00 - 19,00",
      calories: 350,
      category: "Tradicional",
      description: "Acompanha arroz, feijão, fritas e salada",
      image_path: "/products-images/marmita-combo.jpg",
    },
    {
      id: 2,
      name: "Salmão Grelhado",
      price: "R$ 17,00 - 19,00",
      calories: 400,
      category: "Fitness",
      description: "Acompanha quinoa, legumes e salada verde",
      image_path: "/products-images/marmita-quinoa.webp",
    },
    {
      id: 3,
      name: "Vegana de Lentilhas",
      price: "R$ 17,00 - 19,00",
      calories: 300,
      category: "Vegana",
      description: "Acompanha arroz integral, legumes e tofu",
      image_path: "/products-images/marmita-fitness.jpg",
    },
    {
      id: 4,
      name: "Coca-Cola",
      price: "R$ 5,00",
      calories: 140,
      category: "Bebidas",
      description: "Coca-Cola em lata",
      image_path: "/products-images/coca-cola.webp",
    },
    {
      id: 5,
      name: "Açaí",
      price: "R$ 10,00 - R$ 15,00",
      calories: 330,
      category: "Sobremesas",
      description: "",
      image_path: "/products-images/acai.jpg",
    },
  ];

  const handleCartMenuClick = () => {
    const newRightValue =
      cartMenu.current.style.right === "0px" ? "-350px" : "0px";
    cartMenu.current.style.right = newRightValue;
    if (newRightValue === "0px") setIsModalOpen(false);
  };

  const handleUserButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    const filteredResults = packedLunchs.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults.slice(0, 5));
  };

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
          alt="Logo - Cantina Bem Estar (Um contorno vermelho de um chapéu de chef com um garfo no lado esquerdo, acima do texto 'Cantina Bem Estar')"
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
                  <div key={result.id} className={styles.searchBarProduct}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "45%",
                      }}
                    >
                      <img
                        src={result.image_path}
                        alt={result.name}
                        style={{ height: "30px", width: "30px" }}
                      />
                      <p>{result.name}</p>
                    </div>
                    <h4>{result.price}</h4>
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
            <HiMiniUser />
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
              <h2>Variedade de Opções</h2>
            </div>
            <p>
              Explore nossa variedade de pratos tradicionais, opções fitness e
              veganas, criadas para agradar a todos os paladares.
            </p>
          </div>

          <div className="card">
            <div className="title">
              <FaClock color="#e34534" size={50} />
              <h2>Facilidade</h2>
            </div>
            <p>
              Faça seu pedido online com facilidade e conveniência, e retire na
              hora marcada na Cantina. Experimente a praticidade!
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
          }}
        >
          {Array.from(
            packedLunchs.reduce((acc, packedLunch) => {
              const { category } = packedLunch;
              if (!acc.has(category)) acc.set(category, []);
              acc.get(category).push(packedLunch);
              return acc;
            }, new Map())
          ).map(([category, marmitas]) => (
            <>
              <h2 style={{ marginTop: "20px" }}>{category}</h2>
              <div
                key={category}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  padding: "20px",
                  gap: 30,
                }}
              >
                {marmitas.map((marmita) => (
                  // caso seja uma das marmitas mais vendidas, colocar uma classe para adicionar o simbolo ao topo
                  <div className={styles.packedLunchCard} key={marmita.id}>
                    <img
                      width={100}
                      height={100}
                      src={marmita.image_path}
                      alt={marmita.name}
                    />
                    <p>{marmita.name}</p>
                    <h3>{marmita.price}</h3>
                    <button>
                      <FaCartShopping size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
