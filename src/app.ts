import express,{Application,Request,Response,NextFunction} from "express";
import mongoose from "mongoose";
import cors from "cors";
const app:Application = express();

interface Error{
    status?:number;
    message?:string;
}


module.exports = (opts: any) => {
  app.use(cors());

   app.get("/",(req:Request,res:Response)=>{
       res.json({message:"Welcome to question and answer REST API"})
   })

    //Error handler for page/route not found

    app.use((req:Request, res:Response, next:NextFunction) => {
        const error: {status?:number,message:string} = new Error("Page Not found");
        error.status = 404;
        next(error);
    });

    //Error handler for other types of error
    app.use((error:Error, req:Request, res:Response, next:NextFunction) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message,
            },
        });
    });
  //DB connection
  const db = async () => {
    await mongoose.connect(opts.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("database connected"));
    return db;
  };
  return {
    app,
    db,
    start: () =>
      db().then(() => {
        app.listen(opts.PORT, () => {
          console.log(`Q and A API is listening on ${opts.PORT}`);
        });
      }),
  };
};
