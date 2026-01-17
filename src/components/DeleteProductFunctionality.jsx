import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useState } from "react";

const DeleteProductFunctionality = ({ props }) => {
  const [productId, setProductId] = useState("");
  const [deletedProduct, setDeletedProduct] = useState(null);

  const handleDelete = () => {
    if (productId) {
      // First fetch the product details before deleting
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((productData) => {
          // Then delete the product
          return fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Product deleted:", data);
              setDeletedProduct(productData);
              props.onDelete(productId);
              setProductId("");
            });
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <>
      <Form className="my-4 px-5">
        <Form.Group className="mb-3" controlId="formDeleteProductId">
          <Form.Label>Product ID to Delete</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" onClick={handleDelete}>
          Delete Product
        </Button>
      </Form>

      {deletedProduct && (
        <div className="px-5">
          <Alert variant="success" dismissible>
            Product successfully deleted!
          </Alert>
          <Card style={{ maxWidth: "500px" }}>
            <Card.Img
              variant="top"
              src={deletedProduct.image}
              alt={deletedProduct.title}
              style={{ height: "300px", objectFit: "contain", padding: "20px" }}
            />
            <Card.Body>
              <Card.Title>{deletedProduct.title}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${deletedProduct.price}
              </Card.Text>
              <Card.Text>
                <strong>Category:</strong> {deletedProduct.category}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {deletedProduct.description}
              </Card.Text>
              <Card.Text className="text-muted">
                <strong>Product ID:</strong> {deletedProduct.id}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default DeleteProductFunctionality;
