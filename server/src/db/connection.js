import mongoose from "mongoose"
const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://rajuranjan413:1234@cluster0.c8j4dvr.mongodb.net/`)
        console.log(`\n MongoDB connected !!`);
    }
    catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDb
