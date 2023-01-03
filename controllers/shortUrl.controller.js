const {Urls} = require('../models')


exports.shortUrlVerification = async (req, res) =>{
    const {shortUrl} = req.params;
    try {
        const urlInstance = await Urls.findOne({where: {code: shortUrl}})
        if(!urlInstance){
            return res.status(406).send("Error");
        }
        return res.redirect(`${urlInstance?.longUrl}`)
       } 
        catch (error) {
            return res.status(404).json({
                error: "Sorry this URL does not exist"
                });
            }
    
}