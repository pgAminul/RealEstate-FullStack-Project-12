const express = require("express");
require("dotenv").config();
const app = require("./app.js");
const PORT = process.env.PORT || 3000;

// Realeasts
// movUJU47JgUIVvhH

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
