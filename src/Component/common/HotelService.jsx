import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

const HotelService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our Service"} />
        <Row>
          <h4 className="text-center mt-4">
            Services at <span className="hotel-color">Hotel Booking App </span>
            <span>
              <FaClock /> - 24-Hour Front Desk
            </span>
          </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi color="blue"/> Wifi
                </Card.Title>
                <Card.Text>
                  Stay connected with high-speed internet access.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils color="silver"/> Breakfast
                </Card.Title>
                <Card.Text>
                  Star your day with a delicious breakfast buffet.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt color="red"/> Laundry
                </Card.Title>
                <Card.Text>
                  Keep your cloth clean and fresh with our laundry service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail style={{color:"crimson"}}/> Mini-bar
                </Card.Title>
                <Card.Text>
                  Enjoy a refreshing drink or snack from our in-room mini-bar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking style={{color:"palegreen"}}/> Parking
                </Card.Title>
                <Card.Text>
                  Park your car conveniently in our on-site parking lot.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake style={{color:"paleturquoise"}}/> Air conditioning
                </Card.Title>
                <Card.Text>
                  Stay cool and comfortable with our air conditioning system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelService;
