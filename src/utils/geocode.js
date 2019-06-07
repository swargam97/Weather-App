const request=require('request')
const geocoding=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibGlsc2hheiIsImEiOiJjanc3eDA3dmowcDV0NGVvNHRkNXh4dHpwIn0.-M6MUJdvn0bpiAYuC-7ZXw&limit=1`;
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to server')
        }
        else if(response.body.features.length===0){
            callback("Please enter a valid location")
        }
        else{
            const latitude=response.body.features[0].center[1];
            const longitute=response.body.features[0].center[0];
            callback(undefined,{
                latitude,
                longitute,
                location:response.body.features[0].place_name
            });
        }
    })
}

module.exports={
    geocoding:geocoding
}