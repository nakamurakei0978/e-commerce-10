import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Product name must be less than 100 characters"],
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [
        1000,
        "Product description must be less than 1000 characters",
      ],
    },
    image: { type: String, default: "/uploads/example.jpeg" },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide product company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: { type: Boolean, default: false },
    freeShipping: { type: Boolean, default: false },
    inventory: {
      type: Number,
      default: 15,
      required: true,
    },
    averageRating: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
  next();
});

export default mongoose.model("Product", ProductSchema);
