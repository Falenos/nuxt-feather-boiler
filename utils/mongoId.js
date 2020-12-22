const mongoose = require('mongoose')

const randomId = () => {
    return mongoose.Types.ObjectId()
}

const asObjectId = (str) => {
    return mongoose.Types.ObjectId(str)
}

module.exports = { randomId, asObjectId }
