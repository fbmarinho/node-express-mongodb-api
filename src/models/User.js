const mongoose = require('mongoose')

const User = mongoose.model("User", {
  email: String,
  password: String,
  name: String,
})

module.exports = User