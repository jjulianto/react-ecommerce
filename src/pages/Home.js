import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CardProduct } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faDollarSign,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { data } = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();

  const getListProducts = useCallback(() => {
    axios
      .get(`http://localhost:3004/products`)
      .then((result) => {
        const responseAPI = result.data;
        dispatch({ type: "UPDATE_DATA_PRODUCT", payload: responseAPI });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    getListProducts();
  }, [getListProducts]);

  const getListCart = () => {
    axios
      .get(`http://localhost:3004/carts`)
      .then((result) => {
        const responseAPI = result.data;
        dispatch({ type: "UPDATE_CART", payload: responseAPI });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notification = () => {
    store.addNotification({
      title: "Success",
      message: "Product Added to Cart",
      type: "success",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
      },
    });
  };

  const addToCart = (value) => {
    const product = {
      ...value,
      stock: value.stock === 0 ? 0 : value.stock - 1,
    };
    axios
      .put(`http://localhost:3004/products/${value.id}`, product)
      .then((response) => {
        getListProducts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3004/carts?id=${value.id}`)
      .then((response) => {
        if (response.data.length === 0) {
          const cart = {
            ...value,
            stock: value.stock === 0 ? 0 : value.stock - 1,
            quantity: 1,
          };

          axios
            .post(`http://localhost:3004/carts`, cart)
            .then((response) => {
              console.log(response);
              getListCart();
              notification();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const cart = {
            ...value,
            stock: value.stock === 0 ? 0 : value.stock - 1,
            quantity: response.data[0].quantity + 1,
          };

          axios
            .put(`http://localhost:3004/carts/${response.data[0].id}`, cart)
            .then((response) => {
              console.log(response);
              getListCart();
              notification();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={6} className="order-md-2">
          <img src="assets/images/ilustrasi.png" className="w-100" alt="hero" />
        </Col>
        <Col md={6} className="order-md-1 mt-4">
          <div className="d-flex h-100">
            <div className="justify-content-center align-self-center">
              <h1>
                <strong>Excellent Products, </strong> <br />
                in Your Gadget
              </h1>
              <p style={{ fontSize: "18px" }}>
                Let's choose and order your favorite product!
              </p>
              <Button variant="success" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={12} className="text-center mb-4">
          <h2>
            <strong>Why Choose Us?</strong>
          </h2>
        </Col>
        <Col md={4} xs={12} className="text-center p-3">
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            style={{ color: "#198754", fontSize: "64px", marginBottom: "25px" }}
          />
          <h4>
            <strong>Easy to Order</strong>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
            reiciendis consequatur! Laboriosam nam sint fugit.
          </p>
        </Col>
        <Col md={4} xs={12} className="text-center p-3">
          <FontAwesomeIcon
            icon={faDollarSign}
            style={{ color: "#198754", fontSize: "64px", marginBottom: "25px" }}
          />
          <h4>
            <strong>Affordable Price</strong>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            enim sint perferendis at. Corporis, sed!
          </p>
        </Col>
        <Col md={4} xs={12} className="text-center p-3">
          <FontAwesomeIcon
            icon={faMedal}
            style={{ color: "#198754", fontSize: "64px", marginBottom: "25px" }}
          />
          <h4>
            <strong>Best Quality</strong>
          </h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
            libero molestiae non earum sed sunt.
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>
            <strong>Product List</strong>
          </h2>
        </Col>
      </Row>
      <Row className="mb-4">
        {data.map((product) => (
          <Col md={4} xs={12} className="mb-4" key={product.id}>
            <CardProduct product={product} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
