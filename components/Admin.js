import useStore from "../store/store.js"
import createSeats from "../utils/createSeats.js"
import { getNumberArray, getAlphabateArray } from "../utils/util.js"
import Seats from "./Seats.js"

function Admin() {

  const seatClass = useStore(state => state.bookmyseat.seatClass)
  const addSeatClass = useStore(state => state.bookmyseat.addSeatClass)
  const addShowName = useStore(state => state.bookmyseat.addShowName)
  const showName = useStore(state => state.bookmyseat.showName)
  const showId = useStore(state => state.bookmyseat.showId)

  const handleChange = (i, e) => {
    const newseatClass = [...seatClass]
    newseatClass[i][e.target.name] = e.target.value
    newseatClass[i]["startColumn"] = i === 0 ? "A" : seatClass[i - 1]["endColumn"]
    addSeatClass(newseatClass)
  }

  const addFormFields = () => {
    addSeatClass([
      ...seatClass,
      {
        seatClassName: "",
        endColumn: "",
        startColumn: "",
        rows: "",
        cost: "",
        seats: []
      },
    ])
  }

  const removeFormFields = (i) => {
    const newseatClass = [...seatClass]
    newseatClass.splice(i, 1)
    addSeatClass(newseatClass)
  }

  let handleSubmit = (event) => {
    event.preventDefault()
  }

  const showHandler = (i, e) => {
    addShowName(e.target.value)
  }

  return (
    <main className="mt-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mt-0">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div>
          <Input
            title="Show Name"
            name="showName"
            id="show-name"
            value={showName || ""}
            inputHandler={showHandler}
          />
          </div>
          <div className="shadow overflow-hidden sm:rounded-md">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              {seatClass.map((element, index) => {
                return (
                  <div
                    className="px-4 py-5 bg-white sm:p-6"
                    key={`form${index}`}
                  >
                    <div className="grid grid-cols-12 gap-6">
                      <Input
                        title="Section Name"
                        name="seatClassName"
                        id="section"
                        value={element.seatClassName || ""}
                        inputHandler={handleChange}
                        index={index}
                      />

                      {/* cost */}
                      <Input
                        title="Seat Price"
                        name="cost"
                        id="seat-price"
                        value={element.cost || ""}
                        inputHandler={handleChange}
                        index={index}
                      />

                      {/* Columns */}
                      <DropdownInput
                        title="Rows"
                        name="endColumn"
                        id="column-name"
                        value={element.endColumn || ""}
                        dropdownInputHandler={handleChange}
                        index={index}
                        options={getAlphabateArray({
                          from:
                            index === 0
                              ? 0
                              : seatClass[index - 1]["endColumn"],
                        })}
                      />

                      {/* Rows */}
                      <DropdownInput
                        title="Columns"
                        name="rows"
                        id="rows"
                        value={element.rows || ""}
                        dropdownInputHandler={handleChange}
                        index={index}
                        options={getNumberArray(100)}
                      />

                      {/* Save button */}
                      {index ? (
                        <button
                          className="col-span-2"
                          onClick={() => {
                            removeFormFields(index)
                          }}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </div>
                )
              })}

              <div className="px-4 py-3 bg-gray-50 sm:px-6">
                <button
                  type="button"
                  onClick={() => addFormFields()}
                  className="mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Field
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <GenerateAdminLayout adminData={seatClass} />
    </main>
  )
}

const Input = ({ title, name, id, value, inputHandler, index=0 }) => {
  return (
    <div className="col-span-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <input
        name={name}
        value={value || ""}
        type="text"
        onChange={(e) => inputHandler(index, e)}
        id={id}
        autoComplete="off"
        className="mt-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none w-full text-sm leading-4 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
      />
    </div>
  )
}

const DropdownInput = ({
  title,
  name,
  id,
  value,
  dropdownInputHandler,
  index,
  options,
}) => {
  return (
    <div className="col-span-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <select
        value={value || ""}
        onChange={(e) => dropdownInputHandler(index, e)}
        id={id}
        name={name}
        autoComplete="off"
        className="mt-1 block w-full py-2 px-3 leading-5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option></option>
        {options.map((i) => (
          <option key={`optn${i}`}>{i}</option>
        ))}
      </select>
    </div>
  )
}

const GenerateAdminLayout = ({ adminData }) => {
  // useEffect(() => {
    // debugger
  let newAdmindata = []
  const bookmySeatObj = useStore(state => state.bookmyseat)
  adminData.forEach((data, i) => {
    const result = createSeats(data)
    // debugger
    newAdmindata = [...newAdmindata, result]
    // const newAvailableSeats = result.seats.filter(
    //   (seat) => ![...bookedSeats, ...disableSeatData].includes(seat)
    // )
    // addAvailableSeats([...availableSeats, ...newAvailableSeats])
  })
  // addSeatClass(newAdmindata)
  // })

  const addDisabledSeats = useStore((state) => state.bookmyseat.addDisabledSeats)
  const disabledSeats = useStore((state) => state.bookmyseat.disabledSeats)
  const availableSeats = useStore((state) => state.bookmyseat.availableSeats)
  const bookedSeats = useStore((state) => state.bookmyseat.bookedSeats)
  const seatClass = useStore((state) => state.bookmyseat.seatClass)
  const showName = useStore((state) => state.bookmyseat.showName)
  const addShowId = useStore((state) => state.bookmyseat.addShowId)
  const showId = useStore((state) => state.bookmyseat.showId)
  const addDisableSeat = (ev) => {
    if (!ev.target.className.includes("booked")) {
      if (disabledSeats.includes(ev.target.id)) {
        const newAvailable = disabledSeats.filter(
          (seat) => seat !== ev.target.id
        )
        addDisabledSeats(newAvailable)
      } else {
        addDisabledSeats([...disabledSeats, ev.target.id])
      }
    }
  }

  const saveToDb = async () => {
    if(showId?.length > 5) {
      let res = await fetch(`/api/shows/${showId}`, {
        method: "PUT",
        body: JSON.stringify({seatClass: newAdmindata, disabledSeats, showName})
      })
      res = await res.json()
      alert(res.message)
    } else {
      let res = await fetch("/api/shows", {
        method: "POST",
        body: JSON.stringify({seatClass: newAdmindata, disabledSeats, showName}),
      })
      res = await res.json()
      addShowId(res.insertedId)
      alert(res.message)
    }
  }

  return (
    <div className="col-span-9">
      {newAdmindata.map((obj, i) => {
        return (
          <Seats
            values={obj.seats}
            columns={obj.rows}
            availableSeats={availableSeats}
            bookedSeats={bookedSeats}
            disabledSeats={disabledSeats}
            cost={obj.cost}
            seatClassName={obj.seatClassName}
            addSeat={addDisableSeat}
            key={`seat${i}`}
          />
        )
      })}
      <button
        type="button"
        onClick={() => saveToDb()}
        className="mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save to DB
      </button>
    </div>
  )
}

export default Admin
