import crypto from "crypto"
import { pool } from "../dbConnect.js"
const BASEURL=process.env.BASEURL;
const getLinksData=async(req,res)=>{
    try {
        const result=await pool.query(`SELECT * FROM links`);
        const linkData=result.rows;
        const resp=[];
        for(let link of linkData){
            let shortURL=`${BASEURL}/code/${link.code}`;
            link.shortURL=shortURL;
            resp.push(link);
            
        }

        
        return res.status(200).json( resp)
        
    } catch (error) {
        console.log(error)
        
    }
}
 
const generateCode=()=>{
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code="";
    let length=8;

     const bytes=crypto.randomBytes(length);

    for(let i=0;i<length;i++){
        const index=bytes[i] % CHARS.length;
        code+=CHARS[index]
    }
    
    return code;
    
    
}


 const createLink=async(req,res)=>{
    try {
        let {code, url}=req.body;

        if(!url){
            return res.status(400).json({success:false,messge:"URL is missing"})
        }
     
        if(code){
            const exists=await pool.query("SELECT 1 FROM links WHERE code=$1 ",[code]);
            if(exists.rowCount>0){
                 return res.status(409).json({ error: "Short code already exists" });
            }
        }

        if(!code){
            
            code=generateCode()
             

        }
        const result=await pool.query( `INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *`,[code,url]);
        const row=result.rows[0];
        const shortUrl=`${BASEURL}/code/${row.code}`

        return res.status(201).json({code:code,url:url,shortUrl:shortUrl})
    } catch (error) {
        
    }
}

const getSingleLinkStat=async(req,res)=>{
    try {
    

        const {code}=req.params;
        
        if(!code){
            // return req.status()
        }
        //  ****************** find the link first in database **************
        const result=await pool.query(`SELECT * FROM links WHERE code=$1`,[code]);
        
         
        // *************** if ShortURL not found in database then return with 404 **************

        const linkData=result.rows[0];
        const shortURL=`${BASEURL}/code/${linkData.code}`;
        linkData.shortUrl=shortURL;
        return res.status(200).json(linkData);
        

         



   
        
    } catch (error) {
        console.log(error)
        
    }
}
const deleteSingleLink=async(req,res)=>{
    try {
        const {code}=req.params;
        if(!code){
            return res.status(404).json("code is missing")
        }
        const result=await pool.query(`SELECT * FROM links WHERE code = $1`,[code]);
        if(result.rows.length===0){
            return res.status(404).json("short URL not found!!")
        }
        await pool.query(`DELETE FROM links WHERE code = $1`,[code]);
        
        return res.status(200).json({message:"Link deleted successfully!!",code})
    } catch (error) {
        return res.status(500).json("error",error)
        
    }
}

export {getLinksData, createLink,getSingleLinkStat,deleteSingleLink}