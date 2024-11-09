import { instance } from "@/components/Payments";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongooseConnect();
    const { name, email, city, pincode, address, country, cartProducts, totalAmount } = await req.json();
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productInfos = await Product.find({ _id: uniqueIds });

    let order_items = [];
    for (const productId of uniqueIds) {
      const productinfo = productInfos.find(
        (p) => p._id.toString() === productId
      );
      const quantity =
        productsIds.filter((id) => id === productId)?.length || 0; //counting no of products with same product id

      if (quantity > 0 && productinfo) {
        order_items.push({
          quantity,
          price_data: {
            currency: "INR",
            unit_amount: quantity * productinfo.price,
          },
          product_data: { name: productinfo.title },
        });
      }
    }

    const option = {
      amount: totalAmount * 100 || 10000,
      currency: "INR",
    };
    const order = await instance.orders.create(option);

    const orderDoc = await Order.create({
      order_items,
      name,
      email,
      city,
      pincode,
      address,
      country,
      paid: false,
      order_id: order?.id,
    });

    const options = {
      key: process.env.RAZORPAY_API_ID, // Enter the Key ID generated from the Dashboard
      amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Audiophile",
      description: "All type of audio system at one place",
      order_id: order?.id, //This is a Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `/api/paymentverification/?id=${orderDoc?._id}`,
      prefill: {
        name: "Akash Maity",
        email: "akashmaity57@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    return NextResponse.json({order, orderDoc, options, success: true}, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
