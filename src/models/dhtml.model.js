const mongoose =require("mongoose");

const dhtmlSchema = new mongoose.Schema(
    {
    dialer_id:{type:String,required:true},
    desc:{type:String,required:true},
    maxusers:{type:Number,required:true},
    maxsessions:{type:Number,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    gender:{type:String,required:true},
    age:{type:Number,required:true},
    address:{type:String,required:true},
    pincode:{type:Number,required:true},
    profile:{type:String,required:true}
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

const Dhtml = mongoose.model("dhtml",dhtmlSchema);

module.exports=Dhtml;