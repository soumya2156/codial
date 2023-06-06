const Post = require('../models/post');
const User = require('../models/users');


module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id' , 25);
    // Post.find({}).then(function(posts){
    //     return res.render('home' , {
    //         title: "Codial | Home" ,
    //         posts: posts
    //     })
    // })
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({})

        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });
    }catch (err) {
        console.log(err , "ERROR in home controller");
    }
}

