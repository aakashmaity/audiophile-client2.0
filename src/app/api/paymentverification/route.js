// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  
  try {
    await mongooseConnect();

    console.log("Mongoose Connect")
    const reqBody = await req.json();
    console.log("reqBody: " + reqBody)
    
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = reqBody;
    const orderid = req.query?.id;
    console.log("orderid: " + orderid);

    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(message).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    const orderDoc = await Order.updateOne(
      { _id: orderid },
      {
        paid: isAuthentic, //trur or false
      }
    );

    if (isAuthentic) {
      return NextResponse.json({orderDoc, success: true, message: "Order Successfull", redirect: `/cart?success=true`,},{status: 200});
    } else {
      return NextResponse.json({orderDoc, success: false, message: "Order failed"},{status: 200});
    }
  } catch (error) {
    console.error("errorDetailsaaaa:  ", error);
    return NextResponse.json({success: false, message: error.message},{status: 200});
  }
}
