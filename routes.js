module.exports = app => {
  const users = require("./app/controllers/");

  // Create a new employee
  app.post("/users", users.create);

  // Retrieve all users
  app.get("/users", users.findAll);

  // Retrieve a single employee with employeeId
  app.get("/users/:employeeId", users.findOne);

  // Update a employee with employeeId
  app.put("/users/:employeeId", users.update);

  // Delete a employee with employeeId
  app.delete("/users/:employeeId", users.delete);

  // Create a new employee
  app.delete("/users", users.deleteAll);
};