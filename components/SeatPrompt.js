import { useEffect, useState } from "react";
import useStore from "../store/store.js";


function SeatPrompt() {
  const [numberOfSeats, setNumberOfSeats] = useState(0);

  const addSeatsToBook = useStore((state) => state.bookmyseat.addSeatsToBook);
  const seatsToBook = useStore((state) => state.bookmyseat.seatsToBook);
  const availableSeats = useStore((state) => state.bookmyseat.availableSeats)

  // debugger


  return (
    <>
    {/* <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"> */}
      <div className="text-center bg-gray-50 py-2 my-4 rounded-2xl">
        <div className="px-4 py-3 sm:px-6">
          <div className="col-span-2">
            <label
              htmlFor="section"
              className="block text-sm font-medium text-gray-700"
            >
              How many seats would you like to book?
            </label>
            <input
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(e.target.value)}
              className="mt-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none text-sm leading-4 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              // debugger
              if(parseInt(numberOfSeats) > availableSeats.length) alert("Not possible")
              else addSeatsToBook(numberOfSeats)
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Grab your seats
          </button>
        </div>
      </div>
    {/* </main> */}
    </>
  );
}

export default SeatPrompt;
