const mongoose =require("mongoose");

const flatSchema = new mongoose.Schema(
    {
    flat_type:{type:String,required:true},
    block:{type:String,required:true},
    flat_no:{type:Number,required:true},
    flat_image:{type:String,required:true},
    residents:[{type:Object,required:true}]
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

const Flat = mongoose.model("flat",flatSchema);

module.exports=Flat;