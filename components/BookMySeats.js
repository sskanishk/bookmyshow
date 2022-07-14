import React, { useEffect, useState } from "react";
import useStore from "../store/store.js";
import Seats from "./Seats";
import { getAlphaValue } from "../utils/util.js";
import SeatPrompt from "./SeatPrompt.js";
import Card from "./Card";
import useCountDown from "../hooks/useCountDown.js";
import Layout from '../components/Layout.js'
const BookMySeats = () => {
    const seatsToBook = useStore((state) => state.bookmyseat.seatsToBook)
    const availableSeats = useStore(state => state.bookmyseat.availableSeats)

  return (
    <>
      {seatsToBook == 0 ? (
        <SeatPrompt />
      ) : (
        <Layout seatsToBook={seatsToBook} />
      )}
    </>
  );
};


export default BookMySeats;
