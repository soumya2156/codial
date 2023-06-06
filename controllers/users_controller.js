const User = require('../models/users') 
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id).then(function(user){
        return res.render('user_profile' , {
            title : "User Profile",
            profile_user: user
        });
    });    
}

module.exports.update = async function( req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) {console.log('*****Multer Error: ', err)}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
                    }
                    // this is saving the path of the uploaded file into avatar filed in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            return res.redirect('back');
        }
    }else{
        return res.status(401).send('Unauthorized');
    }

}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up' , {
        title : "Codeial | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    req.flash('success' , 'Logged in Successfully');
    return res.redirect('/');
}

//
module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){return next(err);}
    });
    req.flash('success' , 'You have logged out!!');

    return res.redirect('/');
}