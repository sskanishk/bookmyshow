// import { ObjectId } from "mongodb"
import { useEffect } from "react"
// import Admin from "../components/Admin"
import clientPromise from "../../lib/database"
import { useRouter } from 'next/router'
import useStore from "../../store/store.js"
import { ObjectId } from "mongodb"
import Admin from "../../components/Admin.js"


function Show({show}) {

        const addDisabledSeats = useStore(state => state.bookmyseat.addDisabledSeats)
        const addBookedSeats = useStore(state => state.bookmyseat.addBookedSeats)
        const addAvailableSeats = useStore(state => state.bookmyseat.addAvailableSeats)
        const addSeatsToBook = useStore(state => state.bookmyseat.addSeatsToBook)
        const addSeatClass = useStore(state => state.bookmyseat.addSeatClass)
        const addShowName = useStore(state => state.bookmyseat.addShowName)
        const addShowId = useStore(state => state.bookmyseat.addShowId)


    useEffect(() => {
        addShowId(show._id)
        addShowName(show.showName)
        addDisabledSeats(show.disabledSeats)
        addAvailableSeats(show.availableSeats)
        addSeatsToBook(show.seatsToBook)
        addSeatClass(show.seatClass)
        addBookedSeats(show.bookedSeats)

        console.log(show)
        // debugger
    }, [])
    return (
        <Admin />
    )
}

export async function getServerSideProps(context) {
    const client = await clientPromise
    const { params } = context
    
    console.log(params)
    const db = client.db("kanish-cluster")
  
    let show = await db.collection("bookmyshow").findOne({_id: new ObjectId(params.showId)})
    show = JSON.parse(JSON.stringify(show))
    console.log('vjbnk kbhjb',show)
  
    return {
      props: { show },
    }
  }
  

export default Show