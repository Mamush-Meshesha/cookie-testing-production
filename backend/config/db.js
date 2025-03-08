import mongoose from "mongoose"
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`db connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`error connecting ${error.message}`)

    }
}

export default connectDB