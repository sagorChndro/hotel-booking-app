import React, { useState } from "react";

const RoomFilter = ({ data, setfilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredRoom = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setfilteredData(filteredRoom);
  };

  const clearFilter = () => {
    setFilter("");
    setfilteredData(data);
  };

  const roomTypes = ["", ...new Set(data?.map((room) => room?.roomType))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter rooms by type
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value={""}>select a room type for filter.....</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={String(type)}>
            {String(type)}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear Filter
      </button>

      {/* <button onClick={clearFilter} className="text-xl w-32 h-14 before:block before:absolute before:inset-0 before:bg-sky-600 before:duration-500 after:duration-500 duration-300 hover:before:skew-y-12 after:block after:absolute after:inset-0 after:bg-sky-900 hover:after:-skew-y-12 before:-z-10 after:-z-10 inline-block relative text-white"><span> Clear Filter</span></button> */}
    </div>
  );
};

export default RoomFilter;
