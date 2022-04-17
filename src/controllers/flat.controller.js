const express = require("express");

const router = express.Router();

const Flat = require("../models/flat.model");

//api to post flat
router.post("", async (req,res) => {
    try{
        const flat=await Flat.create(req.body);
        return res.send(flat);
    }catch(err){
      return res.send(err.message);
    } 
});

//api to get all flat
router.get("", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 3;
        const flat=await Flat.find()
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await Flat.find().countDocuments())/size
        );

        return res.send({flat,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to search block 
router.get("/block", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 3;
        const block = req.query.block || "A";
        const flat=await Flat.find({block:block})
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await Flat.find({block:block}).countDocuments())/size
        );

        return res.send({flat,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to filter flattype
router.get("/filter_flat", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 3;
        const flat_type = req.query.flat_type || "owner";
        const flat=await Flat.find({flat_type:flat_type})
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await Flat.find({flat_type:flat_type}).countDocuments())/size
        );

        return res.send({flat,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to delete user
router.delete("/:id", async (req, res) => {
    try {
      const flat= await Flat.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ msg: "flat deleted successfully",flat});
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

//api to update flat details
router.patch("/:id", async (req, res) => {
    try {
      const flat = await Flat.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
      });
  
      res.status(200).json({ msg: "flat updated successfully", flat });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  //api to get single flat
router.get("/:id", async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    return res.send(flat);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports=router;