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
import { CardProduct } from "../components";

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
          </Col>
        </Row>
        <Row className="mb-4">
          {cart.map((cartData) => (
            <Col md={4} xs={6} className="mb-4" key={cartData.id}>
              <CardProduct cartData={cartData} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  } else {
    return (
      <div className="mt-5 text-center">
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
