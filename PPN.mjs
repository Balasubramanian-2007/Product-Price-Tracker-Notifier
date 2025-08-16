import express from 'express'
import cors from 'cors'
import axios from 'axios'
import cron from 'node-cron'
import nodemailer from 'nodemailer'
import pkg from 'pg'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

const web = express();
dotenv.config();

const {Pool}=pkg;
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"ProductPriceNotifier",
    password:process.env.DB_PASSWORD,
    port:5432,
})

web.use(express.json()); // To handle JSON data from React  
web.use(cors()); // Allow requests from React frontend

cron.schedule('*/10 * * * *',async()=>{   // for actual process (check between 12 hours) but for testing i want to change it to 10 mins or less format
    console.log("checking price details");
    const apikey = process.env.Zenrows_API_KEY;
    const date=new Date();
    // const info_for_datex=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    const checking_time=await pool.query(`SELECT user_id,product_url,old_price,product_name FROM notificationTable`);
    for(const i of checking_time.rows){
        const url=i.product_url;
        try{
            const response = await axios({
            url: 'https://api.zenrows.com/v1/',
            method: 'GET',
            params: {
                url:url,
                apikey: apikey,
                autoparse: 'true'
            },
            });
            const data=response.data;
            const newPrice=parseInt(data.price);
            
            const messageToSent=`❗️${i.product_name}\n Product link to Buy :${i.product_url} \n Old Price :${i.old_price}\n🚨NEW PRICE :${newPrice}\nThanks for using our Site ❗️`;
            const userMailidFromDatabase= await pool.query("SELECT mail_id FROM userTable WHERE user_id=$1",[i.user_id]);
            const senderEmail=userMailidFromDatabase.rows[0].mail_id; // wna to fill this part using sender mailID form database 
            if(newPrice<parseInt(i.old_price)){
                await pool.query(`UPDATE notificationTable SET old_price=$1,datex=$2 WHERE user_id=$3`,[newPrice,date,i.user_id]);
                const transporter=nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'',
                        pass:process.env.EMAIL_APP_CODE
                    }
                });
                const mailOptions={
                    from:'',
                    to:senderEmail,
                    subject:"📢 Price Dropped (Alert) !🚨",
                    text:messageToSent
                };
                transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.error(error);
                }
                else{
                    console.log("mail sent");
                }
            })
            }
        }
        catch(err){
            console.log("There is a error in schedular code , rectify it !");
        }
    }
})

web.get("/",(req,res)=>{
    res.json({msg:"welcome to backend ..."});
})


web.post("/register",async(req,res)=>{
    const{userName,userid,useremail,userpassword}=req.body;
    const saltRounds=10;
    const hashed=await bcrypt.hash(userpassword,saltRounds);
    try{
        await pool.query(`INSERT INTO userTable(user_id,name,email_id,password) VALUES($1,$2,$3,$4)`,[userid,userName,useremail,hashed]);
        res.json({"UserData":
            {name:userName,id:userid,email:useremail,password:userpassword}
        });
    }
    catch(err){
        if(err.code=='23505'){
            res.json({InvalidReq:"UserID already exists ! Please enter any other User ID"});
        }
        res.json({errMsg:"Some fields are invalid !"});
    }
})

web.post("/login",async(req,res)=>{
    const {userID,userPassword}=req.body;  //the names should be modified based on the frontend ;
    try{
        const check=await pool.query(`SELECT password FROM userTable WHERE user_id=$1`,[userID]);
        if(check.rows.length === 0){
            res.json({register:"There is no account seems like this ! First register(signup) and then login"});
        }
        const hashedPasswordFromDB = check.rows[0].password;
        const isMatch = await bcrypt.compare(userPassword, hashedPasswordFromDB);
        if(isMatch){
            // localStorage.setItem("userID",userID);
            res.json({status:"success",code:"accepted"});
        }
    }
    catch(err){
        res.sendStatus(401);
    }
})

web.post("/home-search",async(req,res)=>{
    const userURL=req.body.url;             //this may be changed according to frontend 
    await fetchProductDetails();
    const apikey =process.env.Zenrows_API_KEY;
    async function fetchProductDetails(){
    try {
        const response = await axios({
            url: 'https://api.zenrows.com/v1/',
            method: 'GET',
            params: {
                url: userURL,
                apikey: apikey,
                autoparse: 'true'
            },
        });
        const data=response.data;
        const title=data.title;
        const photo=data.images;
        const category=data.category;
        const description=data.description;
        const availablity=data.out_of_stock;   // is the out of stock is false means the product is available as it is the common one in all products so i used that variable instead of "availablity"
        const current_price=data.price;
        
        res.json({Title:title,Image:photo,Category:category,Des:description,Status:availablity,Price:current_price});
    }
    catch(err){
        console.log("can't fetch data from zenrows server !");
    }
}
})

web.post("/notify",async(req,res)=>{

    const userURL=req.body.url; 
    // const useridFromLocalStorage=localStorage.getItem("userID");
    // const notificationSendingMail=req.body.mail;
    const useridForMail=req.body.email;
    const{Title,Price}=req.body;


    const date=new Date();
    // const info_for_datex=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    await pool.query(`INSERT INTO notificationTable(user_id,product_name,product_url,old_price,datex) VALUES($1,$2,$3,$4,$5)`,[useridForMail,Title,userURL,Price,date]);
    console.log("notification data  updated in database");
})

web.listen(3000,()=>{
    console.log("WEB is working on port 3000");
})


