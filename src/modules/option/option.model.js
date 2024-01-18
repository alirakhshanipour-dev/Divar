import { Schema, Types, model } from "mongoose";

const OptionSchema = new Schema({
    title: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, enum: ["integer", "number", "array", "boolean"] },
    enum: { type: Array, default: [] },
    guide: { type: String, required: false },
    category: { type: Types.ObjectId, ref: "Category", required: true }

})

export const OptionModel = model("Option", OptionSchema)