const {Urls} = require('../models')
let localhost = "http://localhost:5000"
const md5 = require('md5');


exports.createUrl = async (req, res) => {
    try {
        let {longUrl,userId} = req.body;
       
        if(longUrl.length > 20){
            let code = md5(longUrl);
            if(code.length > 6){
                code = code.slice(0,6)
                let data = await Urls.create({UserId:userId,longUrl,code,shortUrl:`${localhost}/${code}`})
                console.log("urlsData",data);
                return res.json(`${localhost}/${code}`);
            }
        }else{
            return res.status(404).json({
                error: "The URL should be greater than 20 characters"
            })
        }
       
    } catch (error) {
        return res.status(404).json({
            error: "The URL should be greater than 20 characters"
        })}
}
