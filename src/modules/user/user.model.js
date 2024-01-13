import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
    code: { type: String, required: false, default: undefined },
    expiresIn: { type: Number, required: false, default: 0 },
})

const UserSchema = new Schema({
    fullName: { type: String, required: false },
    phone: { type: String, required: true, unique: true },
    otp: { type: OtpSchema },
    verified_phone: { type: Boolean, required: true, default: false }
},
    { timestamps: true })


export const UserModel = model("user", UserSchema, "users")