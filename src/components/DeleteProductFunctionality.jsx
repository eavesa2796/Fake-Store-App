import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const DeleteProductFunctionality = ({ props }) => {
  const [productId, setProductId] = useState("");
  const [deletedProduct, setDeletedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = () => {
    if (productId) {
      // Fetch the product details to show in confirmation modal
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((productData) => {
          setProductToDelete(productData);
          setShowModal(true);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  };

  const handleConfirmDelete = () => {
    // Proceed with deletion
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product deleted:", data);
        setDeletedProduct(productToDelete);
        props.onDelete(productId);
        setProductId("");
        setShowModal(false);
        setProductToDelete(null);
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setProductToDelete(null);
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
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete Product
        </Button>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToDelete && (
            <>
              <p>Are you sure you want to delete this product?</p>
              <Card>
                <Card.Img
                  variant="top"
                  src={productToDelete.image}
                  alt={productToDelete.title}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "20px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{productToDelete.title}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${productToDelete.price}
                  </Card.Text>
                  <Card.Text>
                    <strong>ID:</strong> {productToDelete.id}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

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
