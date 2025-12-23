import mongoose from "mongoose";

const {
	MONGO_HOST,
	MONGO_PORT,
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_DB,
} = process.env;

const mongoUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

export const initMongoConnection = async (): Promise<void> => {
	try {
		if (mongoose.connection.readyState !== 0) return;

		await mongoose.connect(mongoUrl, {
			auth: {
				username: MONGO_USERNAME,
				password: MONGO_PASSWORD,
			},
			authSource: "admin",
		})

		console.log("mongodb connected");
	} catch (err) {
		console.error("failed to connect to mongo", err);
		throw err;
	}
}
