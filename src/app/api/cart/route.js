import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        await mongooseConnect()
    
        const reqBody = await req.json();
        const { ids } = reqBody
        
        const products = await Product.find({_id:ids});
        return NextResponse.json({reqBody,products, success: true, message:"Products fetched successfully"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({reqBody, success: false, error: error.message},{status: error.status});
    }
}