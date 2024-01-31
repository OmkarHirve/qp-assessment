module.exports = {
  APPLICATION_PORT: process.env.PORT || 8121,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.MYSQL_PASSWORD || "change-me",
  DB_HOST: "0.0.0.0",
  DB_PORT: 3306,
  DATABASE: "GroceryBooking",
};
