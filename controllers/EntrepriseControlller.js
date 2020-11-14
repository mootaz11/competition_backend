const mongoose = require("mongoose");
const entrepriseModel  = require("../models/entreprise");

const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    apiKey: "AIzaSyDcbXzRxlL0q_tM54tnAWHMlGdmPByFAfE", // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
   
  const geocoder = NodeGeocoder(options);
  


exports.create = async (req,res)=>{
   const _location_address =  await geocoder.geocode(req.body.address);
   const _location_region  = await geocoder.geocode(req.body.city);
    

    const entreprise = new entrepriseModel({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        city:req.body.city,
        address:req.body.address,
        description:req.body.description,
        contact:req.body.contact,
        image:req.file.path,
        location:{
            latitude:_location_address[0].latitude,
            longitude:_location_address[0].longitude
        },
        region:{
            latitude:_location_region[0].latitude,
            longitude:_location_region[0].longitude,
        }

    })
  const created_entreprise =  await entreprise.save()

    return res.status(201).json({created_entreprise});
}

exports.getEntreprises=(req,res)=>{
    entrepriseModel.find()
    .exec()
    .then(entreprises=>{
        if(entreprises){
            return res.status(200).json({entreprises});

        }
        else {
            return res.status(404).json({message:'entreprises not found !'});
        }
    }).
    catch(err=>{
        return res.status(500).json({err});
    })
}

