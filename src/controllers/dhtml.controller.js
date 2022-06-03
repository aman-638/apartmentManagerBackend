const express = require("express");

const router = express.Router();

const Dhtml = require("../models/dhtml.model");

//api to post dhtml
router.post("", async (req,res) => {
    try{
        const dhtml=await Dhtml.create(req.body);
        return res.send(dhtml);
    }catch(err){
      return res.send(err.message);
    } 
});

//api to get all customer
router.get("", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        const dhtml=await Dhtml.find()
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await Dhtml.find().countDocuments())/size
        );

        return res.send({dhtml,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to search by dialer_id
router.get("/dialer_id", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        const dialer_id = req.query.dialer_id || "1";
        const dhtml=await Dhtml.find({dialer_id:dialer_id})
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await Dhtml.find({dialer_id:dialer_id}).countDocuments())/size
        );

        return res.send({dhtml,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

// //api to filter flattype
// router.get("/filter_flat", async (req,res) => {
//     try{
//         const page = req.query.page || 1;
//         const size = req.query.size || 3;
//         const flat_type = req.query.flat_type || "owner";
//         const flat=await Flat.find({flat_type:flat_type})
//         .skip((page -1)*size)
//         .limit(size)
//         .lean().exec();
 
//         const totalPages = Math.ceil(
//             (await Flat.find({flat_type:flat_type}).countDocuments())/size
//         );

//         return res.send({flat,totalPages});
//     }catch(err){
//       return res.send(err.message);
//     } 
// });

//api to delete user
router.delete("/:id", async (req, res) => {
    try {
      const dhtml= await Dhtml.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ msg: "customer deleted successfully",dhtml});
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

//api to update customer details
router.patch("/:id", async (req, res) => {
    try {
      const dhtml = await Dhtml.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
      });
  
      res.status(200).json({ msg: "customer updated successfully", dhtml });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  //api to get single customer
router.get("/:id", async (req, res) => {
  try {
    const dhtml = await Dhtml.findById(req.params.id);
    return res.send(dhtml);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports=router;