import { pool } from "../dbConnect.js";

const redirectOriginalURL=async(req,res)=>{
    try {
         const {code}=req.params;
         console.log("My code----",code)
          if(!code){
            // return req.status()
        }
        //  ****************** find the link first in database **************
        const result=await pool.query(`SELECT * FROM links WHERE code=$1`,[code]);
        console.log("Found rows..",result.rows.length)
         
        // *************** if ShortURL not found in database then return with 404 **************
        if (result.rows.length === 0) {
    return res.status(404).json({ message: "Short URL not found" });
}

        const linkData=result.rows[0];
        console.log("MyLInkDATA",linkData.url)

        await pool.query(`UPDATE links SET clicks = clicks + 1, last_clicked=NOW() WHERE CODE=$1`,[code])

        const original=linkData.url.trim();

        if(original.startsWith("https://")|| original.startsWith("http://")){
            return res.redirect(302,original);
        }
        return res.redirect(302, `https://${linkData.url}`)
        
    } catch (error) {
        console.log("error",error);
    }
}

export {redirectOriginalURL}