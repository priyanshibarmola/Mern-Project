exports.connectToDB = async () => {
    try {
        console.log("URI exists:", !!process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("connected to DB");
    } catch (error) {
        console.error("DB ERROR:");
        console.error(error);
    }
}
