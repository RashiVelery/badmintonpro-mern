const { default: mongoose } = require("mongoose");


const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["knockout", "league", "round-robin"],
      required: true
    },

    category: {
      type: String,
      enum: ["singles", "doubles", "mixed-doubles"],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    },

    courts: {
      type: Number,
      required: true,
      min: 1
    },

    slots: {
      type: Number,
      required: true,
      min: 2
    },
    
    status: {
      type: String,
      enum: ["draft", "published", "ongoing", "completed"],
      default: "draft"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },



  },
  { timestamps: true }
);


module.exports = mongoose.model("Tournament", tournamentSchema);

