import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  }, {
    timestamps: true,
  });

//Checks if password matches the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Hashes the password before saving the user to the database
userSchema.pre("save", async function (next) {
  //Only hash the password if it is modified or new
  if (!this.isModified("password")) {
    next();
  }
  //Salt is a random string added to the password before hashing to make it more secure
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;