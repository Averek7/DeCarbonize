const express = require("express");
const cors = require("cors");
const apiRequest = require("./akave"); // Correct import for CommonJS modules

const app = express();
app.use(cors());
app.use(express.json());

app.get("/buckets", async (req, res) => {
  try {
    const data = await apiRequest("get", "/buckets"); // Await the response from apiRequest
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});
// curl -X POST http://localhost:8000/buckets -H "Content-Type: application/json" -d '{"bucketName": "myBucket"}'
app.post("/buckets", async (req, res) => {
  try {
    const data = await apiRequest("post", "/buckets", req.body); // Await the response from apiRequest
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
