import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  const handleDelete = () => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product deleted:", data);
        navigate("/products");
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }
  return (
    <section>
      <Breadcrumb className="px-5 mt-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="mb-4 px-5">{product.title}</h2>
      <Row>
        <Col md={4} className="px-5">
          <Card>
            <Card.Img variant="top" src={product.image} />
          </Card>
        </Col>
        <Col md={8} className="px-5">
          <Card>
            <Card.Body>
              <Card.Title>${product.price} </Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Button variant="primary">Add to Cart</Button>
              <Button variant="danger" className="ms-2" onClick={handleDelete}>
                Delete Product
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default ProductDetailsPage;
