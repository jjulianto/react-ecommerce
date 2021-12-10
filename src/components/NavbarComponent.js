import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = () => {
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

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      fixed="top"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Container>
        <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")} className="text-dark">
              Home
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <FontAwesomeIcon
              icon={faShoppingCart}
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer" }}
            />
            {cart.length !== 0 ? (
              <Badge pill bg="success" className="badge">
                {cart.length}
              </Badge>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
