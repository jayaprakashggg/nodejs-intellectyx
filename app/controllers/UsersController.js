var UsersModel = require("../models/UsersModel");
const errorhelper = require("../helper/errorhelper");

/**
 * UsersController.js
 *
 * @description :: Server-side logic for managing Userss.
 */
module.exports = {
  /**
   * UsersController.list()
   */
  list: function(req, res) {
    UsersModel.find(function(err, users) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: errorhelper.getErrorMessage(err)
        });
      } else if (!users) {
        return res.json({
          success: false,
          message: "No such users."
        });
      } else {
        return res.json({
          success: true,
          users: users
        });
      }
    });
  },

  /**
   * UsersController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    UsersModel.findOne({ _id: id }, function(err, user) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: errorhelper.getErrorMessage(err)
        });
      } else if (!user) {
        return res.json({
          success: false,
          message: "No such user."
        });
      } else {
        return res.json({
          success: true,
          user: user
        });
      }
    });
  },

  /**
   * UsersController.searchByName()
   */
  searchByName: function(req, res) {
    var search = req.params.search;
    UsersModel.find({ name: { $regex: search, $options: "i" } }, function(
      err,
      users
    ) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: errorhelper.getErrorMessage(err)
        });
      } else if (!users) {
        return res.json({
          success: false,
          message: "No such user."
        });
      } else {
        return res.json({
          success: true,
          users: users
        });
      }
    });
  },

  /**
   * UsersController.create()
   */
  create: function(req, res) {
    var Users = new UsersModel({
      name: req.body.name,
      shop_name: req.body.shop_name,
      status: req.body.status,
      created_by: req.body.created_by,
      modified_by: req.body.modified_by,
      created_date: new Date()
    });
    Users.save(function(err, user) {
      if (err) {
        res.json({
          success: false,
          message: errorhelper.getErrorMessage(err)
        });
      } else if (user && user !== null && user._id) {
        res.json({
          success: true,
          message: `${user.name} profile successfully created!`
        });
      } else {
        res.json({
          success: false,
          message: "Something went wrong. Please try again later!"
        });
      }
    });
  },

  /**
   * UsersController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    UsersModel.findOne({ _id: id }, function(err, user) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: errorhelper.getErrorMessage(err)
        });
      } else if (!user) {
        return res.json({
          success: false,
          message: "No such user"
        });
      }
      user.name = req.body.name ? req.body.name : user.name;
      user.shop_name = req.body.shop_name ? req.body.shop_name : user.shop_name;
      user.status = req.body.status ? req.body.status : user.status;
      user.modified_by = req.body.modified_by
        ? req.body.modified_by
        : user.modified_by;
      user.modified_date = new Date();
      user.is_active = req.body.is_active ? req.body.is_active : user.is_active;
      user.is_deleted = req.body.is_deleted
        ? req.body.is_deleted
        : user.is_deleted;
      user.save(function(err, userData) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: errorhelper.getErrorMessage(err)
          });
        } else {
          return res.json({
            success: true,
            message: `${user.name} profile successfully updated!`
          });
        }
      });
    });
  },

  /**
   * UsersController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    UsersModel.findByIdAndRemove(id, function(err, user) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: errorhelper.getErrorMessage(err)
        });
      } else {
        return res.json({
          success: true,
          message: `${user.name} profile successfully deleted!`
        });
      }
    });
  }
};
