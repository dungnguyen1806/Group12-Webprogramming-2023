const express= require("express");
const app= express();
const cors= require("cors");
const router= require("./routers");
const connectDB= require("./configs/database");

app.use(cors());
app.use(express.json());
connectDB();
router(app);


app.listen(process.env.PORT||3000, ()=>{
  console.log("Server is run at port: "+ 3000);
})