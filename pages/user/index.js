import BookMySeats from "../../components/BookMySeats"
import Link from "next/link"

function User({showsList}) {
    return (
        <>
        {/* <main className="mt-6 mx-auto max-w-7xl px-4">
            <div className="sm:text-center lg:text-left">
            <BookMySeats />
            </div>
        </main> */}

<div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <h2 className="text-4xl">Book Tickets</h2>
      <div className="grid grid-cols-12 gap-3">
        {showsList &&
          showsList.map((show, i) => {
            return (
            <div className="col-span-3 cursor-pointer" key={`showcard${i}`}>
              <Link href={`/user/${show._id}`} replace>
                  <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 col-span-3">
                    <div className="flex flex-col">
                      <div className="flex flex-row space-x-4 items-center text-left">
                        <div id="temp">
                          <h5 className="text-xl">{show.showName}</h5>
                          <p className="text-xs text-gray-500">{show._id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </Link>
            </div>
            )
          })}
      </div>
    </div>

        </>
    )
}

export async function getServerSideProps(context) {
  // const client = await clientPromise
  // const db = client.db("kanish-cluster")
  // let showsList = await db.collection("bookmyshow").find({}).toArray()
  // showsList = JSON.parse(JSON.stringify(showsList))

  let dev = process.env.NODE_ENV !== 'production'
  let { DEV_URL, PROD_URL } = process.env
  let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/shows`, {
    method: "GET"
  });
  // let res = await fetch(`/api/shows/`, {
    // method: "GET"
  // })s
  res = await res.json()
  console.log(res)

  return {
    props: { showsList: res },
  }
}

export default User