import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);

  function handleFetchProducts() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }

  const handleDelete = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product deleted:", data);
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <section>
      <h2 className="mb-4 px-5">All Products</h2>
      <Row xs={1} md={2} lg={3} className="g-4 px-5">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>Product ID: {product.id}</Card.Text>
                <Button
                  variant="primary"
                  className="w-50 mt-2 border-light"
                  as={Link}
                  to={`/products/${product.id}`}
                >
                  View Details
                </Button>
                <Button
                  variant="info"
                  className="w-50 mt-2 border-light text-white"
                  as={Link}
                  to={`/edit-product/${product.id}`}
                >
                  Edit Product
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  variant="danger"
                  className="w-100 mt-2"
                >
                  Delete Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ProductListingPage;
