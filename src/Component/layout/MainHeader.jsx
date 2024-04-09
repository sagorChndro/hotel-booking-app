import React from "react";

const MainHeader = () => {
  return (
    <header className="header-banner">
      <div className="overlay"></div>
      <div className="animated-texts overlay-content">
        <h1>
          Welcome to Our <span className="hotel-color">Hotel Booking App</span>
        </h1>
        <h4>Experience the Best Hospitality in Town</h4>
      </div>
    </header>
  );
};

export default MainHeader;
