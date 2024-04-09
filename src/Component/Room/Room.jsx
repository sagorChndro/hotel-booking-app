import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunction";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filteredData, setfilteredData] = useState([{ id: "" }]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getAllRooms()
  //     .then((data) => {
  //       setData(data);
  //       setfilteredData(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="text-info" style={{ fontSize: "20px" }}>
  //       Loading Rooms........
  //     </div>
  //   );
  // }

  useEffect(() => {
    // Display loading message for a brief initial timeout
    const initialTimeout = setTimeout(() => {
      setIsLoading(true);
    }, 100);
    const fetchData = async () => {
      try {
        const result = await getAllRooms();
        setData(result);
        setfilteredData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data after 3 seconds
    const loadingTimeout = setTimeout(() => {
      fetchData();
    }, 1000);

    // Cleanup timeouts to avoid memory leaks
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  if (isLoading) {
    return (
      <div className="text-info" style={{ fontSize: "20px" }}>
        Loading Rooms........
      </div>
    );
  }

    if (error) {
      return <div className="text-danger">Error: {error}</div>;
    }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter data={data} setfilteredData={setfilteredData} />
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
      <Row>{renderRooms()}</Row>
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
