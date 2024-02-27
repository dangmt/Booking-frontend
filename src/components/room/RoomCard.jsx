import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <CardBody className="d-flex flex-wrap align-items-center">
          <div className="mb-3 me-3 mb-md-0">
            <Link to={`/book-room/${room.id}`}>
              <CardImg
                variant="top"
                src={room.photoUrl}
                alt="Room Photo"
                style={{ height: "200px", width: "200px", objectFit: "cover" }}

                // className="max-width-200px"
              ></CardImg>
            </Link>
          </div>
          <div className="flex-grow-1 ms-3 px-5">
            <CardTitle className="hotel-color">{room.roomType}</CardTitle>
            <CardTitle className="room-price">
              {room.roomPrice} / night
            </CardTitle>
            <CardText>
              Some room information goes here for the guest to read through
            </CardText>
          </div>
          <div className="mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              {" "}
              Book Now
            </Link>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RoomCard;
