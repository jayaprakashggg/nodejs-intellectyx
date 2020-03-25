const UsersRoutes = require("./routes/UsersRoutes");

module.exports = function(app) {
  app.use("/api/user", UsersRoutes);
};
