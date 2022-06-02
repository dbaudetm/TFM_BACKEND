import mongoose from "mongoose";
const conectDB = async () => {

    try{
        const connection = await mongoose.connect(process.env.MONGOURL,
        {useNewUrlParser:true,useUnifiedTopology:true})
        const url = `${connection.connection.host}:${connection.connection.port}`
      
    }catch(error){
       
        process.exit(1)
    }

}
export default conectDB