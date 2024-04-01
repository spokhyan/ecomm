const {default: mongoose } = require("mongoose");

const dbconnect =  () => {
    
        // mongoose.set("useNewUrlParser", true);
        // mongoose.connect(process.env.MONGODB_URL).
        // then(()=>{console.log("Mongoose server has started")})
        // .catch((err)=>{
        //     console.error(err); 
        // })
        // const connection = mongoose.connection;
        // console.log("Database connected successfully")


        try {
            const conn = mongoose.connect(process.env.MONGODB_URL);
            console.log("Database Connected Successfully");
          } catch (error) {
            console.log("DAtabase error");
          }
    
    

};
module.exports = dbconnect;