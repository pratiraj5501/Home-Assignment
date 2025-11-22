  import dotenv from "dotenv"
  import pkg from "pg"
  const {Pool}=pkg;
dotenv.config();

export const pool=new Pool({
    connectionString:process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

 export async function connectDB(){
    // console.log("dddd",dbUrl)
    const result=await pool.query("SELECT NOW()")
    // console.log("result is here----",result)
//   return db.connectDB(connectDB);
}
