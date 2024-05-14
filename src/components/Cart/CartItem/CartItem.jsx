/* eslint-disable react/prop-types */
import "./styles.css";

export default function CartItem({ productObject }) {

  return (
    <div className="cart-item">
      <input
        type="checkbox"
        name="checkItem"
        id={productObject.id}
      />
      <div className="cart-item__characteristics">
        <div className="cart-item__image">
          <img src={productObject.image_path} alt={productObject.name} />
        </div>
        <div className="cart-item__specifications">
          <div>
              <h3>{productObject.name}</h3>
            <p>
              {productObject.category}
            </p>
          </div>
          <div className="cart-item__options">
            <h2>
              {productObject.price}
            </h2>
            <div className="product-quantity">
              <button >-</button>
              <span>1</span>
              <button >+</button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="removeFromCart-button"
      >
        ✖
      </button>
    </div>
  );
}
