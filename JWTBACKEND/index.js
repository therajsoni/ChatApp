const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const cookieParser = require('cookie-parser');

const app = express();

const connectDB = async() => {
    await mongoose.connect(`mongodb+srv://rajsoni909192:5t4u26ktvSL1n1qU@cluster0.z4cra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
        console.log('connected');        
    }).catch((error)=>{
        console.log(error);        
    })
}

connectDB();

app.use(express.json());
app.use(cookieParser());

const SchemaSign = new mongoose.Schema({
    name : String,
    password :String
})
const SignupUser = mongoose.models.SchemaSign || mongoose.model("UserSign",SchemaSign);
const SchemaLogin = new mongoose.Schema({
    name :  String,
    password : String
})
const LoggedUser = mongoose.models.SchemaLogin || mongoose.model("UserLogin",SchemaLogin);
const signup = async(req,res) => {
const {name,password} = await req.body;
const hashedPassword =  await bcryptjs.hash(password,10);
console.log(hashedPassword);
await SignupUser.create({                
name,
password : hashedPassword    
})
return res.json({
    success : true,
    message : 'ok'
})
}
const secretKey = '123'
const login = async (req, res) => {
    const { name, password } = req.body;

    const user = await SignupUser.findOne({ name });  
    if (!user) {
        return res.json({
            success: false,
            message: 'User not found'
        });
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
        return res.json({
            success: false,
            message: 'Incorrect password'
        });
    }
    const token = jwt.sign({ id: user._id, name: user.name }, secretKey, { expiresIn: '1h' }); // here is expire time 
    console.log(token);    
    const refreshToken = jwt.sign({id : user._id,name : user.name},secretKey); // no expire time here 
    console.log(refreshToken);    

    return res.cookie('token', token, { httpOnly: true }).cookie('refreshtoken',refreshToken,{httpOnly : true}).json({
        success: true,
        message: 'Login successful',
        user: { id: user._id, name: user.name }
    });
};

const logOut = async(req,res) => {
    // const user  = LoggedUser.findById(req._id);
    LoggedUser.findByIdAndDelete(req._id); //
    return res.cookie('token',undefined).cookie('refreshtoken',undefined).json({
        success : true,
        message : "logout"
    })
}

const refreshTokenFunction = async(req,res) => {
    const refreshT = req.cookies.refreshtoken;

    if(!refreshT)console.log('not refresh');
    jwt.verify(refreshT,secretKey,(err,decode)=>{
        if(err){
            return res.json({
                success : false,
                message : `not refresh hre`
            })            
        }
        else{
            const newToken = jwt.sign({_id:req._id,name : req.name},secretKey,{expiresIn:'1h'});
            return res.cookie('token',newToken,{httpOnly:true}).json({success : true,message : 'refresh Token ok'});
        }
    })
    
}

let az = '';

const getAllOkay = async (req, res) => {
    
    const token = req.cookies.token;
    if(!token){
     return res.json({
        success : 500,
        message : 'token invalid'
     }) 
    } 

    jwt.verify(req.cookies.token, secretKey, (err, decodeOwnData) => {
        if (err) {
            console.log('some err');
            console.log(req.cookies.token);           
            return res.json({
                success: false,
                message: 'Verification failed',
                error: err.message
            });
        } else {
            // Verification successful, return decoded data
            return res.cookie('token',token,{httpOnly:true}).cookie('refreshtoken',req.cookies.refreshtoken,{httpOnly:true}).json({
                success: true,
                message: 'okay',
                data: decodeOwnData
            });
        }
    });
};


app.post('/signup',signup);
app.post('/login',login)
app.get('/logout',logOut);
app.get('/getok',getAllOkay);
app.post('/refreshtoken',refreshTokenFunction)



app.listen(3000,()=>console.log('listen at 3000'))