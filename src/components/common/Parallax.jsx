import React from "react";
import { Container } from "react-bootstrap";

const Parallax = () => {
  return (
    <div className="parallax mb-5">
      <Container className="text-center py-5 ">
        <div className="animated-texts bounceIn">
          <h1>
            Experience the Best hospitality at{" "}
            <span className="hotel-color">FPT Hotel</span>
          </h1>
          <h3>We offer the best services for all your needs.</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
