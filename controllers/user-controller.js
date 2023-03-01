const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
    // Get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get user by ID 
    getUserById({ params }, res){
        User.findOne({_id:params.id})
        .populate({
            path: 'thoughts',
            select: '-__v',
        })
        .select('-__v')
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    // Add a new user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(400).json(err))
    },

    // Update an existing user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
    },
    
    // Delete an existing user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
    },

    // Add a new friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
      { _id: params.userId },
      {
        $addToSet: {
          friends: params.friendId,
        },
      },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
    },
    // Delete an existing friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        {
            $pull: {
            friends: params.friendId,
            },
        },
        { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;