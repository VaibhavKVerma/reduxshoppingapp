import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";

const ProductDetails = () => {
  const { productId } = useParams();
  const { image, price, category, description, title } = useSelector(
    (state) => state.selectedProductReducer
  );
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => {
        console.log("Err is:", err);
      });
    dispatch(selectedProduct(response.data));
    console.log(response.data);
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProduct();
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="ui grid container">
      {Object.keys(selectedProduct).length === 0 ? (
        <div>Loading.....</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} alt={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <span className="ui teal tag label">${price}</span>
                </h2>
                <h3 className="ui brown block header">
                  {String(category).toUpperCase()}
                </h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex={0}>
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
