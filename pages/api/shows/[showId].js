import clientPromise from "../../../lib/database"
import { ObjectId } from 'mongodb'


export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
      case 'GET': {
          return getShow(req, res)
      }

      case 'PUT': {
          return updateShow(req, res)
      }

  }
}


async function getShow(req, res) {
  try {
      const client = await clientPromise
      const db = client.db("kanish-cluster")
      const { showId } = req.query
      console.log(showId)
      let show = await db
          .collection('bookmyshow')
          .findOne({_id: new ObjectId(showId)})
      return res.status(200).json({
        message: 'Show updated successfully',
        success: true,
        data: show
    })
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      })
  }
}

async function updateShow(req, res) {
  try {
      const client = await clientPromise
      const db = client.db("kanish-cluster")
      const { showId } = req.query
      const body = JSON.parse(req.body)
      const queryObj = {}
      if(body.hasOwnProperty('seatClass')) queryObj.seatClass = body.seatClass
      if(body.hasOwnProperty('disabledSeats')) queryObj.disabledSeats = body.disabledSeats
      if(body.hasOwnProperty('showName')) queryObj.showName = body.showName
      if(body.hasOwnProperty('bookedSeats')) queryObj.bookedSeats = body.bookedSeats
      if(body.hasOwnProperty('availableSeats')) queryObj.availableSeats = body.availableSeats
      await db.collection('bookmyshow').updateOne(
          {
              _id: new ObjectId(showId),
          },
          { $set: queryObj }
      );

      return res.status(200).json({
          message: 'Show updated successfully',
          success: true,
      });
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}
