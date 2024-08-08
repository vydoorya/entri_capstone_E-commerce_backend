import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
