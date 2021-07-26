//This model describes how the app connects to MongoDB

import mongoose from "mongoose";
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
import { connectionString } from "../lib/credentials.js";

mongoose.connect(connectionString, {
	dbName: "SCCDB",
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
	console.log("Mongoose connected.");
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const bandSchema = new Schema({
	name: { type: String, required: true },
	yearFormed: String,
	genre: String,
	location: String,
});

export const Band = mongoose.model("band", bandSchema);