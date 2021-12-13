import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import numberWithCommas from "../utils/utils";

const CardProduct = (props) => {
  return (
    <Card className="shadow border-0">
      <Card.Img
        variant="top"
        src={props.product.image}
        style={{ objectFit: "cover", height: "13em" }}
        alt="thumbnail"
      />
      <Card.Body>
        <Card.Title>
          <strong>{props.product.name}</strong>
        </Card.Title>
        <Card.Title className="text-muted" style={{ fontSize: "16px" }}>
          {props.product.seller}
        </Card.Title>
        <Card.Title className="text-dark" style={{ fontSize: "14px" }}>
          Stock: {props.product.stock}
        </Card.Title>
        {props.product.prices.isDiscount ? (
          <div className="d-flex">
            <Card.Text
              className="me-2"
              style={{
                textDecoration: "line-through",
                fontSize: "14px",
                position: "relative",
                marginTop: "2px",
              }}
            >
              Rp. {numberWithCommas(props.product.prices.actualPrice)}
            </Card.Text>
            <Card.Text>
              <strong>
                Rp. {numberWithCommas(props.product.prices.discountPrice)}
              </strong>
            </Card.Text>
          </div>
        ) : (
          <Card.Text>
            <strong>
              Rp. {numberWithCommas(props.product.prices.actualPrice)}
            </strong>
          </Card.Text>
        )}
        {props.product.stock >= 1 ? (
          <Button
            variant="success"
            className="w-100"
            onClick={() => props.addToCart(props.product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            Add to Cart
          </Button>
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
