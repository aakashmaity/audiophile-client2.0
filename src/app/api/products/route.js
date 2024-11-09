import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await mongooseConnect();

        const featuredProductId = process.env.FEATURED_PRODUCT_ID
    

        const featuredProduct = await Product.findById({_id: featuredProductId});
        const newProducts = await Product.find({}, null, {
            sort: { _id: -1 },
            limit: 10,
        }); //{} to det all products(no filtering), "null" get all data/attributes
        
        return NextResponse.json({featuredProduct, newProducts , success: true, message: 'Product fetched successfully'},{status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false ,message: error.message},{status: error.status});
    }
}

export async function GET(){
    try {
        await mongooseConnect();

        const products = await Product.find({}, null, {'_id':-1}) 
        return NextResponse.json({products , success: true, message: 'Products fetched successfully'},{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false ,message: error.message},{status: error.status});
    }
}