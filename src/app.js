const path=require('path')
const express=require('express');
const hbs=require('hbs');
const location=require('./utils/geocode');
const weather=require('./utils/forecast');

// Setting Path
const publicPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../template/views');
const partialspath=path.join(__dirname,'../template/partials')

// Initialising express
const app=express();

// Setting view engine and views of express
app.set('view engine','hbs');
app.set('views',viewPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialspath);


// Setting urls
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Swargam hazarika'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        message:"U have arrive at help page",
        name:'swargam'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Swargam'
    });
});
app.listen(3000,()=>{
    console.log("Server is running succesfully");
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Help article cannot be found'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }
    location.geocoding(req.query.address,(error,{latitude,longitute,location}={})=>{
        if(error){
         return res.send({error})
        }
        weather.forecast(latitude,longitute,(error,forecastdata)=>{
            if(error){
                return res.send({error})

            }
            res.send({
                place:location,
                temperature:forecastdata

            })
        })
    })
    // console.log(req.query.address);
    
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 eror',
        name:'Something went wrong'
    })
})