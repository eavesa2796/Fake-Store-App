import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="text-center my-5">
      <h2 className="mb-4">404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <Button variant="primary">Go to Home</Button>
      </Link>
    </section>
  );
};

export default NotFound;
