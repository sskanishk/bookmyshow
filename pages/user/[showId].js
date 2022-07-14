import { useEffect } from "react"
import BookMySeats from "../../components/BookMySeats"
import useStore from "../../store/store.js"
import createSeats from "../../utils/createSeats.js"


function Bookticket({show}) {
    console.log(show)

    const addDisabledSeats = useStore(state => state.bookmyseat.addDisabledSeats)
    const disabledSeats = useStore(state => state.bookmyseat.disabledSeats)
    const addBookedSeats = useStore(state => state.bookmyseat.addBookedSeats)
    const bookedSeats = useStore(state => state.bookmyseat.bookedSeats)
    const addAvailableSeats = useStore(state => state.bookmyseat.addAvailableSeats)
    const availableSeats = useStore(state => state.bookmyseat.availableSeats)
    const addSeatsToBook = useStore(state => state.bookmyseat.addSeatsToBook)
    const addSeatClass = useStore(state => state.bookmyseat.addSeatClass)
    const seatClass = useStore(state => state.bookmyseat.seatClass)
    const addShowName = useStore(state => state.bookmyseat.addShowName)
    const addShowId = useStore(state => state.bookmyseat.addShowId)

    useEffect(() => {
        addShowId(show._id || "")
        addShowName(show.showName || "")
        addDisabledSeats(show.disabledSeats || [])
        // debugger
        // addAvailableSeats(show.availableSeats || [])
        addSeatsToBook(show.seatsToBook || 0)
        // addSeatClass(show.seatClass || [])
        addBookedSeats(show.bookedSeats || [])    
    
    }, [])

    useEffect(() => {

        console.log(show.seatClass)
        // debugger
        let newAdmindata = [];
        show?.seatClass?.forEach((data, i) => {
          const result = createSeats(data);
          // debugger
          newAdmindata = [...newAdmindata, result];
          // debugger
          const newAvailableSeats = result.seats.filter(
            (seat) => ![...bookedSeats, ...show.disabledSeats].includes(seat)
          );
          debugger
          addAvailableSeats([...availableSeats, ...newAvailableSeats]);
          // debugger
        });
        // debugger
        addSeatClass(newAdmindata);
    },[])

    return (
        <BookMySeats />
    )
}


export async function getServerSideProps(context) {

    const { params } = context
    let dev = process.env.NODE_ENV !== 'production'
    let { DEV_URL, PROD_URL } = process.env
    let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/shows/${params.showId}`, {
      method: "GET"
    });

    res = await res.json()
  
    return {
      props: { show: res.data },
    }
  }

export default Bookticket  