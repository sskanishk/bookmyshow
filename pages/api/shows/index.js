import clientPromise from "../../../lib/database.js"

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getShows(req, res)
        }

        case 'POST': {
            return addShow(req, res)
        }
    }
}

// Getting all shows.
async function getShows(req, res) {
    try {
        const client = await clientPromise
        const db = client.db("kanish-cluster")
        let shows = await db
            .collection('bookmyshow')
            .find({})
            .toArray()
        return res.status(200).json(shows)
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        })
    }
}

// Adding a new show
async function addShow(req, res) {
    try {
        const client = await clientPromise
        const db = client.db("kanish-cluster")
        const response = await db.collection('bookmyshow').insertOne(JSON.parse(req.body))
        return res.status(200).json({
            message: "Show saved succesfully to DB",
            success: false,
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        })
    }
}

