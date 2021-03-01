require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  const restaurantsName = await db.query("select * from restaurants");
  try {
    res.status(200).json({
      status: "successs",
      length: restaurantsName.rows.length,
      data: {
        restaurants: restaurantsName.rows
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.response.message
    });
  }
});
//get single restaurants
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const singleRestaurant = await db.query(
      "select * from restaurants where id = $1",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      singleRestaurant: singleRestaurant.rows[0]
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.response.message
    });
  }
});
//create single restaurants
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const newRestaurant = await db.query(
      "insert into restaurants ( name, location, price_range) values($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(200).json({
      status: "success",
      data: newRestaurant.rows[0]
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.response.message
    });
  }
});
//update single restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const updateRestaurant = await db.query(
      "update restaurants set name = $1, location = $2 , price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        updateRestaurant: updateRestaurant.rows[0]
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.response.message
    });
  }
});
//delete single restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const deleteRestaurant = db.query("delete from restaurants where id = $1", [
      req.params.id
    ]);
    res.status(200).json({
      status: "success",
      data: {
        message: "delete successfully"
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.response.message
    });
  }
});

//get single restaurants reviews
app.get("/api/v1/reviews/:id", async (req, res) => {
  const reviews = await db.query(
    "select * from reviews where restaurant_id = $1",
    [req.params.id]
  );
  try {
    res.status(200).json({
      status: "successs",
      length: reviews.rows.length,
      data: {
        restaurants: reviews.rows
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.response.message
    });
  }
});

app.listen(port, () => {
  console.log(`server is up port ${port}`);
});
