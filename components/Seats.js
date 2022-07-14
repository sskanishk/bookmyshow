import React from "react";

const Seats = (props) => {
  return (
    <div>
      <h3>
        {props.seatClassName} {props.cost}
      </h3>
      <hr />
      <div
        className="section"
        style={{
          display: "grid",
          gridGap: "5px",
          margin: "20px auto",
          width: "fit-content",
          gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
        }}
      >
        {props.values.map((seat) => {
          //   const isAvailable = props.availableSeats.includes(seat);
          const isBooked = props?.bookedSeats?.includes(seat);
          const isDisabled = props?.disabledSeats?.includes(seat);
          let seatClass;
          if (isBooked) {
            seatClass = "booked";
          }
          if (isDisabled) {
            seatClass = "disabled";
          }
          return (
            <div
              className={`rounded-xl border-2 border-gray-200 h-10 w-10 flex justify-center items-center ${seatClass}`}
              onClick={props.addSeat}
              key={seat}
              id={seat}
            >
              {seat.split(':')[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seats;
