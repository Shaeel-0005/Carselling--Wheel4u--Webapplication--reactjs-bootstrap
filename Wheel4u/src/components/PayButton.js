import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post('http://localhost/Wheel4u_api/stripe/create-checkout-session', {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <button onClick={handleCheckout} className="btn btn-primary">
      Check out
    </button>
  );
};

export default PayButton;
