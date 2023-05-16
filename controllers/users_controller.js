const User = require('../models/users') 

module.exports.profile = function(req, res){
    return res.render('user_profile' , {
        title : "User Profile"
    });
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up' , {
        title : "Codeial | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in' , {
        title: "Codeial | sign In"
    });
}

//get the sign up data
module.exports.create = function(req , res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}).then(function(user){
        if(!user){
            User.create(req.body).then(function(user){
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    })
}

//sign and create a session for user
module.exports.createSession = function(req, res){
    //TODO later
}