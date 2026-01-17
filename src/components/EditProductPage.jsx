import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [productLoaded, setProductLoaded] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  function handleFetchProduct(e) {
    e.preventDefault();
    if (!productId) return;

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData({
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
        });
        setProductLoaded(true);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product updated:", data);
        navigate(`/products/${productId}`);
      })
      .catch((error) => console.error("Error updating product:", error));
  }

  if (!productLoaded) {
    return (
      <section className="px-5">
        <h2 className="mb-4">Edit Product</h2>
        <Form onSubmit={handleFetchProduct}>
          <Form.Group className="mb-3" controlId="productId">
            <Form.Label>Or select a different product ID to Edit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Load Product
          </Button>
        </Form>
      </section>
    );
  }

  return (
    <section className="px-5">
      <h2 className="mb-4">Edit Product (ID: {productId})</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            className="product-image"
            value={productData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </section>
  );
};

export default EditProductPage;
