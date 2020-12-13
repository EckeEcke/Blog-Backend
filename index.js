const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");








let unsortedEntries = [
    {
    image:"https://1thingtodo.de/wp-content/uploads/2016/02/barcelona-reisebericht-1-thing-to-do.jpg", 
    title:"My Trip to Barcelona", 
    portrait: "https://i.pinimg.com/564x/ce/2a/95/ce2a95e99faceaf7af19c273b10ebcc1.jpg", 
    date:"2020-10-10", 
    author:"Chris", 
    postdate:"2020-11-28",
    country:"Spain",
    city:"Barcelona",
    lat:41.390205,
    lng:2.154007,
    description:"This is some text about my trip to Barcelona. We had a great time, weather was nice, tasty food and beautiful city. I need some longer text for testing purposes. So I just keep on writing. The hotel was nice, too. I went there by airplane. Flight was so nice. I took a lot of pictures. And here is some more random text."
    },
    {
    image:"https://savorylens.com/wp-0463a-content/uploads/2018/01/Prag-45.jpg", 
    title:"My Trip to Prague", 
    portrait: "https://i.pinimg.com/564x/ce/2a/95/ce2a95e99faceaf7af19c273b10ebcc1.jpg", 
    date:"2019-08-10", 
    author:"Chris P Chicken", 
    postdate:"2020-11-11",
    country:"Czech Republic",
    city:"Prague",
    lat:50.075538,
    lng:14.437800,
    description:"This is some text about my trip to Prague. We had a great time, weather was nice, tasty food and beautiful city."  
    },
    {
    image: "https://www.logistik-watchblog.de/images/2018/03/shutterstock_139999093-1.jpg", 
    title:"My Trip to London", 
    portrait: "https://www.finetoshine.com/wp-content/uploads/2020/07/Lisa-Simpson-aesthetic-profile-pic.jpg", 
    date:"2020-01-18", 
    author:"Chris P Bacon", 
    postdate:"2020-10-10",
    country:"England",
    city:"London",
    lat:51.507351,
    lng:-0.127758,
    description:"This is some text about my trip to London. We had a great time, weather was nice, tasty food and beautiful city."  
    },
    {
    image: "https://lovingnewyork.de/wp-content/uploads/2017/05/New-York-Kreuzfahrt2-1600x960.jpg", 
    title:"My Trip to New York", 
    portrait: "https://www.finetoshine.com/wp-content/uploads/2020/07/Lisa-Simpson-aesthetic-profile-pic.jpg", 
    date:"2018-05-11", 
    author:"Chris P Bacon", 
    postdate:"2020-08-10",
    country:"USA",
    city:"New York",
    lat:40.712784,
    lng:-74.005941,
    description:"This is some text about my trip to New York. We had a great time, weather was nice, tasty food and beautiful city."  
    },
    {
    image: "https://sothebys-com.brightspotcdn.com/dims4/default/d3e659c/2147483647/strip/true/crop/989x711+0+0/resize/684x492!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fc8%2Fa6%2Fd51cd4424ab699c8f3dbdb38bed2%2Fmoscow-russia-tech-center.jpg",
    title: "Summer vacation in Moscow",
    portrait: "https://i.pinimg.com/originals/00/6c/c5/006cc517225537ee317650766b111600.jpg",
    date:"2016-04-25",
    author:"Chris",
    postdate:"2020-07-11",
    country:"Russia",
    city:"Moscow",
    lat:55.755826,
    lng:37.617300,
    description:"This is some text about my trip to Moscow. We had a great time, weather was nice, tasty food and beautiful city."   
    },
    {
    image: "https://www.aegypten.de/files/Aegypten-Kairo-Madrassa.jpeg",
    title:"Seeing pyramids in Kairo",
    portrait:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtsCMyF-9Z-fSx3dofBRTx4hBj5YIemwXT4A&usqp=CAU",
    date:"2020-07-01",
    author:"Chris P Bacon",
    postdate:"2020-01-12",
    country:"Egypt",
    city:"Kairo",
    lat:30.044420,
    lng:31.235712,
    description:"This is some text about my trip to Kairo. We had a great time, weather was nice, tasty food and beautiful city."      
    }

]


let Entries = unsortedEntries.sort((a, b) => new Date(b.date).getTime() -  new Date(a.date).getTime());

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

app.listen(port, function(){
    console.log("express is running")
});



app.get("/", function(req, res){
    console.log(req);
    res.json(Entries);
    console.log(res.json(Entries));
});

app.post("/new", function(req, res){
    let post = req.body.data;
    console.log(req.body);
    let lng = parseInt(post.lng);
    let lat = parseInt(post.lat);
    let postdate = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
    let portrait = "https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png";
    let image = "https://jugendbildungsmesse.de/wp-content/uploads/2017/07/jugendbildungsmesse-work-and-travel-reisen.jpg";

    if (post.portrait.length > 1){
        portrait = post.portrait;
    };
    
    if (post.image.length > 1){
        image = post.image.length;
    };
    
    

    let newEntry = {
        image: image, 
        title: post.title, 
        portrait: portrait, 
        date: post.date, 
        author: post.author, 
        postdate: postdate,
        country: post.country,
        city: post.city,
        lat: lat,
        lng: lng,
        description: post.description,
    }

    unsortedEntries.push(newEntry);
    Entries = unsortedEntries.sort((a, b) => new Date(b.date).getTime() -  new Date(a.date).getTime());
    res.send("got post request");
})