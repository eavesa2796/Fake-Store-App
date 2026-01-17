import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=3")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching featured products:", error);
        setLoading(false);
      });
  }, []);

  const testimonials = [
    {
      name: "Barbara Smith",
      testimonial:
        "Your one-stop shop for all things fake! Explore our wide range of products and enjoy a seamless shopping experience.",
    },
    {
      name: " John Doe",
      testimonial:
        "Your one-stop shop for all things fake! Explore our wide range of products and enjoy a seamless shopping experience.",
    },
    {
      name: "Alice Johnson",
      testimonial:
        "Your one-stop shop for all things fake! Explore our wide range of products and enjoy a seamless shopping experience.",
    },
  ];

  return (
    <section>
      <h2 className="mb-4 px-5">Featured Products</h2>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4 px-5">
          {featuredProducts.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  className="product-image"
                  src={product.image}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button className="btn-primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="my-5">
        <h2 className="text-center mb-4">Customer Testimonials</h2>
        <Carousel interval={3000} className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                <Card
                  className="text-center p-4"
                  style={{
                    maxWidth: "600px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <Card.Body>
                    <div
                      className="mb-3"
                      style={{ fontSize: "2rem", color: "#ddd" }}
                    >
                      "
                    </div>
                    <Card.Text
                      className="mb-3"
                      style={{ fontSize: "1.1rem", fontStyle: "italic" }}
                    >
                      {testimonial.testimonial}
                    </Card.Text>
                    <div
                      className="mb-2"
                      style={{ color: "#ffc107", fontSize: "1.5rem" }}
                    >
                      ★★★★★
                    </div>
                    <Card.Title
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      {testimonial.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="get-started container-fluid my-5 p-5 text-white text-center">
        <h2 className="text-center mb-4">Check Out Our Deals!</h2>
        <hr className="horizontal-line" />
        <div className="text-center">
          <Button as={Link} to="/products" variant="success" size="lg">
            View Products
          </Button>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
