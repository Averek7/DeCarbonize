const express = require("express");
const router = express.Router();

const akave = require("../akave");

router.get("/buckets", async (req, res) => {
  try {
    const data = await akave.apiRequest("get", "/buckets");
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/buckets/:bucketname", async (req, res) => {
  try {
    const { bucketname } = req.params;
    const data = await akave.apiRequest("get", `/buckets/${bucketname}`);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/buckets/:bucketname", async (req, res) => {
  const { bucketname } = req.params;
  akave.uploadFile(bucketname, "data.json");
});

router.post("/buckets", async (req, res) => {
  try {
    const data = await akave.apiRequest("post", "/buckets", req.body);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});



module.exports = router;