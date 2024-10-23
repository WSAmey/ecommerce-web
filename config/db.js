const mongoose=require("mongoose");
const connectDB=(url)=>{
    try {
        return mongoose.connect(url,{

        }).then(()=>{
            console.log("Connected to DB successfully.");
        });
    } catch (error) {
        console.log("An error occured while connecting to DB: ", error);
        
    }
}

module.exports={connectDB};