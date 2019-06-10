const express = require('express')
const router = express.Router();

//importing User model
const User = require('../../../models/User');

//@route GET api/users
//@desc  Get all users
//@access Public
router.get('/',(req,res) => {
    User.find().then(users => {
        res.json({data:users,success:true,msg:'success'})
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})

//@route GET api/users/:id
//@desc  Get a single user
//@access Public
router.get('/:id',(req,res) => {
    var id = req.params.id;
    User.findById(id).then(users => {
        res.json({data:users,success:true,msg:'success'})
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})

//@route POST api/users
//@desc  Create an user
//@access Public
router.post('/',(req,res) => {
    //creating user object
    const newUser = new User({
        fname: req.body.fname,
        email: req.body.email,
        is_superadmin: true
    })

    newUser.save().then(users => {
        res.json({data:users,success:true,msg:'Data saved successfully'})
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    });
})

//@route PUT api/users/:id
//@desc Update an user
//@access Public
router.put('/:id',(req,res) => {
    var id = req.params.id;
    const newData = {
        fname:req.body.fname,
        email:req.body.email
    }

    User.findById(id).then(user => {
        user.updateOne(newData,{new:true}).then(result => {
            res.json({data:result,success:true,msg:'Data updated successfully.'})
        }).catch(err => {
                    res.json({data:null,success:false,msg:err})
            })
    }).catch(err => {
                res.json({data:null,success:false,msg:err})
        })
})

//@route DELETE api/users/:id
//@desc Delete an user
//@access Public
router.delete('/:id',(req,res) => {
    var id = req.params.id;
    User.findById(id).then(user => {
        user.remove().then(result => {
            res.json({data:result,success:true,msg:'Data deleted successfully'})
        }).catch(err => {
            res.json({data:null,success:false,msg:err})
        })
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})

module.exports = router;