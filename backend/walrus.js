const axios=require("axios");

async function getFile(blobId){
    try{
        const resp=await axios.get(`https://aggregator.walrus-testnet.walrus.space/v1/${blobId}`);
        return resp.data;
    }catch(err){

    }
}

async function putFile(formdata){
    try{
        const resp=await axios.put("https://publisher.walrus-testnet.walrus.space/v1/store?epochs=5",formdata);
        return resp.data;
    }catch(err){
        res.send(err)
    }
}

module.exports={getFile,putFile}