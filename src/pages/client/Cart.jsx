import CartCheckoutContainer from "../../components/CartCheckoutContainer/CartCheckoutContainer";
import CartProductsContainer from "../../components/CartProductsContainer/CartProductsContainer";
import SectionsContentHeader from "../../components/SectionsContentHeader/SectionsContentHeader";

export default function Cart() {
  return (
    <>
      <SectionsContentHeader title="Finalize sua Compra!" />
      <div
        className="container"
        style={{
          width: "100%",
          display: "flex",
          gap: "5%",
          marginTop: "50px",
          flexWrap: "wrap-reverse",
        }}
      >
        <CartProductsContainer />
        <CartCheckoutContainer />
      </div>
    </>
  );
}
