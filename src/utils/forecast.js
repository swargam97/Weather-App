const request=require('request');

const forecast=(latitude,longitute,callback)=>{
    const url=`https://api.darksky.net/forecast/7812722ad3a85eb73efd09ea4809ee69/${latitude},${longitute}?units=si`;
     request({url,json:true},(error,response)=>{
             if(error){
                 callback('Something went wrong with the server');
             }
             else if(response.body.error){
                 callback('Please enter valid longitute and longitude');
             }
             else{
                 callback(undefined,`Its is currently ${response.body.currently.summary} with a temperature of  ${response.body.currently.temperature} and possiblity of ${response.body.currently.precipProbability} of rain`);
             }
     });
};

module.exports={
    forecast:forecast
}