import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { getRoomById } from "../utils/ApiFunction";
import { useParams } from "react-router-dom";
import {} from "react-icons";
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";

const Ceckingout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoadig] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoadig(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoadig(false);
        });
    }, 2000);
  }, [roomId]);
  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <div>
                <p className="text-info">Loading room information..........</p>
              </div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <img
                  src={`data:image/jpeg;base64, ${roomInfo.photo}`}
                  alt="Room Photo"
                  style={{ width: "100%", height: "200px" }}
                />
                <table className="table table-bordered shadow-lg">
                  <tbody>
                    <tr>
                      <th>Room Type</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>

                    <tr>
                      <th>Price Per Night</th>
                      <td>${roomInfo.roomPrice}</td>
                    </tr>

                    <tr>
                      <th>Room Service</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaWifi style={{color:"blue"}}/> Wifi
                          </li>
                          <li>
                            <FaTv style={{color:"turquoise"}}/> Netflix Premium
                          </li>
                          <li>
                            <FaUtensils style={{color:"silver"}}/> Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt style={{color:"darkseagreen"}}/> Mini Bar Refreshmet
                          </li>
                          <li>
                            <FaCar style={{color:"yellowgreen"}}/> Car Service
                          </li>
                          <li>
                            <FaParking style={{color:"grey"}}/> Parking Space
                          </li>
                          <li>
                            <FaTshirt style={{color:"red"}}/> Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
          <BookingForm/>
          </div>
          
        </div>
      </section>
      <section>
        <RoomCarousel/>
      </section>
    </div>
  );
};

export default Ceckingout;
