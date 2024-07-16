import styles from "./styles.module.css";

export default function CartProductsContainer() {
  const products = [
    {
      id: 1,
      name: "Filé de Frango à Parmegiana",
      price: 19,
      calories: 350,
      category: "Tradicional",
      description: "Acompanha arroz, feijão, fritas e salada",
      image_path: "/products-images/marmita-combo.jpg",
    },
    {
      id: 2,
      name: "Salmão Grelhado",
      price: 19,
      calories: 400,
      category: "Fitness",
      description: "Acompanha quinoa, legumes e salada verde",
      image_path: "/products-images/marmita-quinoa.webp",
    },
    {
      id: 3,
      name: "Vegana de Lentilhas",
      price: 19,
      calories: 300,
      category: "Vegana",
      description: "Acompanha arroz integral, legumes e tofu",
      image_path: "/products-images/marmita-fitness.jpg",
    },
    {
      id: 4,
      name: "Coca-Cola",
      price: 5,
      calories: 140,
      category: "Bebidas",
      description: "Coca-Cola em lata",
      image_path: "/products-images/coca-cola.webp",
    },
    {
      id: 5,
      name: "Açaí",
      price: 10,
      calories: 330,
      category: "Sobremesas",
      description: "",
      image_path: "/products-images/acai.jpg",
    },
  ];

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.image_path} alt={product.name} />
          </div>
          <div className={styles.productData}>
            <h3>{product.name}</h3>
            <p>
              <div className={styles.productQuantity}>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <strong>R$ {product.price.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
