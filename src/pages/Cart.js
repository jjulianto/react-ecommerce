import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Breadcrumb,
  Col,
  Container,
  Row,
  Image,
  Button,
} from "react-bootstrap";
import numberWithCommas from "../utils/utils";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3004/carts`)
      .then((result) => {
        const responseAPI = result.data;
        dispatch({ type: "UPDATE_CART", payload: responseAPI });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  const navigate = useNavigate();

  if (cart.length !== 0) {
    return (
      <Container>
        <Row style={{ marginTop: "70px" }}>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              active
              style={{ fontWeight: "bold", color: "#000000" }}
            >
              Cart
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Col>
            <h2>
              <strong>Cart List</strong>
            </h2>
            <div className="table-responsive mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Name</th>
                    <th scope="col">Seller</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total Price</th>
                    {/* <th scope="col">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartData, index) => (
                    <tr key={cartData.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Image
                          src={cartData.image}
                          className="img-fluid shadow"
                          width="250"
                        />
                      </td>
                      <td>{cartData.name}</td>
                      <td>{cartData.seller}</td>
                      <td>{cartData.stock}</td>
                      <td align="center">{cartData.quantity}</td>
                      <td>
                        Rp.
                        {cartData.prices.isDiscount
                          ? numberWithCommas(cartData.prices.discountPrice)
                          : numberWithCommas(cartData.prices.actualPrice)}
                      </td>
                      <td>
                        Rp.
                        {cartData.prices.isDiscount
                          ? numberWithCommas(
                              cartData.prices.discountPrice * cartData.quantity
                            )
                          : numberWithCommas(
                              cartData.prices.actualPrice * cartData.quantity
                            )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh", flexDirection: "column" }}
      >
        <Image src="assets/images/empty-cart.png" width="350" />
        <h2>Empty Cart</h2>
        <p>It seems like you dont have any product yet on your cart</p>
        <Button variant="success" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }
};

export default Cart;
