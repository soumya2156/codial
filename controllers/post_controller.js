const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    })

    if(req.xhr){
        return res.status(200).json({
            data: {
                post: post
            },
            message: "Post created!"
        })
    }
    return res.redirect('back');

}

module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id);

    //.id means converting the object id to string
    if (post.user == req.user.id) {
        post.deleteOne();

        await Comment.deleteMany({ post: req.params.id })

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted successfully"
            })
        }

        return res.redirect('back');

    } else {
        return res.redirect('back');
    }
}


