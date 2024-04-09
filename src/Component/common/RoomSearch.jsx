import moment from "moment";
import React, { useState } from "react";
import { getAvailableRooms } from "../utils/ApiFunction";
import {
    Form,
Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
//import { Form } from "react-router-dom";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomSearchResult from "./RoomSearchResult";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);

    if (!checkIn.isValid || !checkOut.isValid()) {
      setErrorMessage("Please, enter valid date range");
      return;
    }

    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMessage("Check-in date must come before Check-out date.");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        console.log(response.data);
        setAvailableRooms(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    setSearchQuery((pervSearchQuery)=>({
        ...pervSearchQuery,
        [name]:value
    }));
    if (checkIn.isValid() && checkOut.isValid()) {
      setErrorMessage("");
    }
  };

  const ClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
  };
  return (
    <>
      <Container className="mt-5 mb-5 py-5 shadow">
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <FormGroup controlId="checkInDate">
                <FormLabel>Check-in Date</FormLabel>
                <FormControl
                  type="date"
                  name="checkInDate"
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={3}>
              <FormGroup controlId="checkOutDate">
                <FormLabel>Check-out Date</FormLabel>
                <FormControl
                  type="date"
                  name="checkOutDate"
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={3}>
              <FormGroup>
                <FormLabel>Room Type</FormLabel>
                <div className="d-flex">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                  />
                  <Button variant="secondary" type="submit">Search</Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        {isLoading ? (
            <p className="mt-4 text-primary">Finding Available Rooms....</p>
        ): availableRooms ? (
            <RoomSearchResult results={availableRooms} onClearSearch={ClearSearch}/>
        ):(
            <p className="mt-4 text-warning">No room available for the selected dates and room type.</p>
        )}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Container>
    </>
  );
};

export default RoomSearch;
