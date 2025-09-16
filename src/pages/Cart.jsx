import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate(); 

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    if (cartItems.length > 0) {
      navigate("/payment"); 
    } else {
      toast.error("Your cart is empty.");
    }
  };

  return (
    <div
      className="container"
      style={{ paddingTop: "100px", minHeight: "70vh" }}
    >
      <h1 className="my-4 text-center">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/home" className="btn btn-primary">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <img
                    src={item.img}
                    className="img-fluid rounded-start"
                    alt={item.title}
                    style={{ maxHeight: "150px" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      <small className="text-muted">{item.author}</small>
                    </p>
                    <p className="card-text fw-bold">
                      ${(item.price * item.quantity).toFixed(2)}{" "}
                      <small className="text-muted">({item.quantity})</small>
                    </p>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <hr />

          <div className="text-end my-4">
            <h3>
              Total: <span className="fw-bold">${totalPrice.toFixed(2)}</span>
            </h3>
            <button
              className="btn btn-success btn-lg"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
