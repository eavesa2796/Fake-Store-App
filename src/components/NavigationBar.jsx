import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar expand="lg" className="mx-5">
      <Navbar.Brand className="navbar-brand" as={Link} to="/">
        Fake Store
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <NavDropdown title="Products" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/products">
              Product Listing
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/add-product">
              Add Product
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/edit-product/1">
              Edit Product
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={`/delete-product`}>
              Delete Product
            </NavDropdown.Item>
          </NavDropdown>

          {/* <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link> */}
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/edit-product/1">
            Edit Product
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
