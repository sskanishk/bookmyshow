import React, { useEffect, useState } from "react";
import useStore from "../store/store.js";
import Seats from "./Seats";
import { useRouter } from 'next/router'
import Card from "./Card";
import useCountDown from "../hooks/useCountDown.js";

function Layout() {
  const router = useRouter()
      const time = 0.1;

      // const disabledSeats = useStore(state => state.bookmyseat.disabledSeats)
      const showName = useStore(state => state.bookmyseat.showName)
      const showId = useStore(state => state.bookmyseat.showId)
    
      const [bookedStatus, setBookedStatus] = useState("");
      const [totalPrice, setTotalPrice] = useState(0);
      // let totalPrice = 0
      const countDown = useCountDown(time);
    
      const addDisabledSeats = useStore((state) => state.bookmyseat.addDisabledSeats);
      const disabledSeats = useStore((state) => state.bookmyseat.disabledSeats);
    
      const addBookedSeats = useStore((state) => state.bookmyseat.addBookedSeats);
      const bookedSeats = useStore((state) => state.bookmyseat.bookedSeats);

      const addBookedSeatsPrice = useStore((state) => state.bookmyseat.addBookedSeatsPrice);
      const bookedSeatsPrice = useStore((state) => state.bookmyseat.bookedSeatsPrice);
    
      const addAvailableSeats = useStore(
        (state) => state.bookmyseat.addAvailableSeats
      );
      const availableSeats = useStore((state) => state.bookmyseat.availableSeats);
    
      const addSeatsToBook = useStore((state) => state.bookmyseat.addSeatsToBook);
      const seatsToBook = useStore((state) => state.bookmyseat.seatsToBook);
    
      const addSeatClass = useStore((state) => state.bookmyseat.addSeatClass);
      const seatClass = useStore((state) => state.bookmyseat.seatClass);

  const priceClac = (bookdata) => {
    let totalcost = 0
    bookdata.map((val) => {
      totalcost += parseInt(val.split(':')[1])
      setTotalPrice(totalcost)
    })
  }
  const addSeat = (ev) => {
    if (seatsToBook && !ev.target.className.includes("disabled")) {
      const _seatsToBook = parseInt(seatsToBook, 10);
      // debugger
      if (bookedSeats.includes(ev.target.id)) {
        const newAvailable = bookedSeats.filter(
          (seat) => seat !== ev.target.id
        );
        addBookedSeats(newAvailable);
        if(newAvailable.length > 0) {
          priceClac(newAvailable)
        }else if(newAvailable.length === 0) {
          setTotalPrice(0)
        }
        addAvailableSeats([...availableSeats, ev.target.id]);        
      }else if (bookedSeats.length <= _seatsToBook) {
         if (bookedSeats.length < _seatsToBook) {
          addBookedSeats([...bookedSeats, ev.target.id]);
          const newAvailable = availableSeats.filter(
            (seat) => seat !== ev.target.id
          );
          priceClac([...bookedSeats, ev.target.id])
          addAvailableSeats(newAvailable);
        } else if (bookedSeats.length === _seatsToBook) {
          const droppedSeat = bookedSeats.shift();
          const newAvailable = availableSeats.filter(
            (seat) => seat !== ev.target.id
          );
          priceClac([...bookedSeats, ev.target.id])          
          addAvailableSeats([...newAvailable, droppedSeat]);
          addBookedSeats([...bookedSeats, ev.target.id]);
        }
        // const newAvailableSeats = availableSeats.filter(seat => !bookedSeats.includes(seat));
        // addAvailableSeats(newAvailableSeats);
      } 
    }
  };

  const confirmBooking = async () => {
    setBookedStatus(`Confirmed booking ${totalPrice}`);
    bookedSeats.forEach((seat) => {
      setBookedStatus((prevState) => {
        return prevState + seat + " ";
      });
    });
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat)
    );
    addAvailableSeats(newAvailableSeats)
    addBookedSeats(bookedSeats);
    // addSeatsToBook(0);
    // debugger
    // router.push('/checkout')
    if(showId?.length > 5) {
      let res = await fetch(`/api/shows/${showId}`, {
        method: "PUT",
        body: JSON.stringify({bookedSeats: bookedSeats, availableSeats, newAvailableSeats})
      })
      res = await res.json()
      alert(res.message)
    } else {
      let res = await fetch("/api/shows", {
        method: "POST",
        body: JSON.stringify({bookedSeats: bookedSeats, availableSeats, newAvailableSeats}),
      })
      res = await res.json()
      addShowId(res.insertedId)
      alert(res.message)
    }


  };
  // if(countDown === 'EXPIRED') {
  //   router.push('/user')
  // }
  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card value={countDown} heading="Time left to book your seat" />
          <Card value={`₹${totalPrice}`} heading="Total Price" />
          <Card value={seatsToBook} heading="Total Number of Seats" />
          <Card value={seatsToBook} heading="Total Number of Seats" />
        </div>

        <div className="col-span-9">
          {seatClass.map((obj, i) => {
            // debugger
            console.log("obj", seatClass);
            return (
              <Seats
                values={obj.seats}
                columns={obj.rows}
                cost={obj.cost}
                seatClassName={obj.seatClassName}
                availableSeats={availableSeats}
                bookedSeats={bookedSeats}
                disabledSeats={disabledSeats}
                addSeat={addSeat}
                key={`seat${i}`}
              />
            );
          })}
        </div>
      </div>
 
      <button
        className="m-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10" 
        onClick={confirmBooking}>Book seats {totalPrice}
        </button>
      <p>{bookedStatus}</p>
    </div>
  );
}



export default Layout;
