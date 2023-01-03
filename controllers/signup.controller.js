const {Users} = require('../models')


exports.createUser = async (req, res) => {
    try {
        const {email,name,password} = req.body;
        let [user, isCreated] = await Users.findOrCreate({where : {email},
        defaults: { 
              email, name, password
        }});
        return res.status(200).json({data: user, created: isCreated})
    }   
    catch (error) {
            return res.status(406).json({
                error: error
            })
        }
    }


   
