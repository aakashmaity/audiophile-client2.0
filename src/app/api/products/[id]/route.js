import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    try {
        await mongooseConnect();

        const {id} = params
        const product = await Product.findById(id);
        
        return NextResponse.json({product, success: true, message: 'Product found' }, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, error: error?.message},{status: error.status});
    }
}