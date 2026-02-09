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

    courts: {
      type: Number,
      required: true,
      min: 1
    },

    rules: {
      pointsPerGame: { type: Number, default: 21 },
      bestOf: { type: Number, default: 3 },
      interval: {
        enabled: { type: Boolean, default: true },
        at: { type: Number, default: 11 }
      },
      deuceEnabled: { type: Boolean, default: true }
    },

    status: {
      type: String,
      enum: ["draft", "published", "ongoing", "completed"],
      default: "draft"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Tournament", tournamentSchema);

