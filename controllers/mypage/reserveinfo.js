require('dotenv').config()
const jwt = require('jsonwebtoken')
const { Reservation } = require('../../models')
const { Hotel } = require('../../models')
const { Review } = require('../../models')

module.exports = async (req, res) => {

  const authorization = req.headers.authorization

  if (authorization === undefined) {
    res.status(401).json({
      error: 'not authorized'
    })
  }
  else {
    const token = authorization.split('Bearer ')[1]
    const data = jwt.verify(token, process.env.ACCESS_SECRET)

    const reserveInfo = await Reservation.findAll({
      include: [
        { model: Hotel, required: true }
      ],
      where: { userId: data.id },
    })

    if (!reserveInfo.length) {
      res.status(404).json({
        error: "not found"
      })
    }
    else {

      let newArr = []
      let arr = reserveInfo

      arr.forEach(async obj => {
        let newObj = Object.assign({}, {
          id: obj.dataValues.id,
          checkedin: obj.dataValues.checkedin,
          checkedout: obj.dataValues.checkedout,
          adult: obj.dataValues.adult,
          child: obj.dataValues.child,
          createdAt: obj.dataValues.createdAt,
          userId: obj.dataValues.userId,
          hotelName: obj.dataValues.Hotel.hotelname
        })
        const reviewInfo = Review.findOne({
          where: {
            userId: obj.dataValues.userId,
            hotelId: obj.dataValues.hotelId
          }
        })
        if (!reviewInfo) {
          newObj.isReviewed = false;
        } else {
          newObj.isReviewed = true;
        }

        newArr.push(newObj)
        console.log(newArr)
      })

      res.status(201).json({
        "data": newArr,
        "message": "ok"
      })

    }
  }
}