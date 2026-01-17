import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useState } from "react";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [addedProduct, setAddedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        category: formData.category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product added:", data);
        setAddedProduct({ ...formData, id: data.id });
        setFormData({
          title: "",
          price: "",
          description: "",
          image: "",
          category: "",
        });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <section className="container my-4">
      <h2 className="mb-4">Add New Product</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>

      {addedProduct && (
        <div>
          <Alert
            variant="success"
            dismissible
            onClose={() => setAddedProduct(null)}
          >
            Product successfully added with ID: {addedProduct.id}!
          </Alert>
          <Card style={{ maxWidth: "500px" }}>
            <Card.Img
              variant="top"
              src={addedProduct.image}
              alt={addedProduct.title}
              style={{ height: "300px", objectFit: "contain", padding: "20px" }}
            />
            <Card.Body>
              <Card.Title>{addedProduct.title}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${addedProduct.price}
              </Card.Text>
              <Card.Text>
                <strong>Category:</strong> {addedProduct.category}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {addedProduct.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </section>
  );
};

export default AddProductPage;
