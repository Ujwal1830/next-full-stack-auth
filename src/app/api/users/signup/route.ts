import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

connectToDB();

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
        const hashPassword = async (password: string): Promise<string> => {
            try {
              const saltRounds = 10;
              const hashedPassword = await bcrypt.hash(password, saltRounds);
              return hashedPassword;
            } catch (error) {
              // Handle error appropriately
              console.error('Error occurred during password hashing:', error);
              throw error;
            }
          };
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, {status: 200});


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}