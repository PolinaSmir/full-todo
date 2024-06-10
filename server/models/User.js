const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: Date,
    validate: {
      // validator: function (value) {
      //   if (value < new Date()) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },
      validator: (value) => value < new Date(),
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value),
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
