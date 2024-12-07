const express = require('express');
const router = express.Router();
const walrus=require("../walrus")

router.get('/:id',async (req, res) => {
    const id = req.params.id;
    const data=await walrus.getFile(id);

    return res.send(data);
});

module.exports=router;