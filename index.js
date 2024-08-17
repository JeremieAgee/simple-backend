// Step 1: Import Ecpress
const express = require('express');

//Step2: Create an express application.
const app = express();

//step 3: Define what port to use.
const PORT = 4000;

//Step 4: Import Cors
const cors = require('cors');

//Step 5: Define middleware.
//Make app use cors to allow cross origin request.(Request from other sites)
app.use(cors());

//Make app use express to parse JSON 
app.use(express.json())


// Step 6: Define Routes
//Create a simple homepage route.
app.get('/', (req, res) => {
    res.send("Hello, World");
    console.log(req)
})

// Simple route to add object
app.post((req, res)=>{
    res.send(`Added an object`)
    console.log(req)
})

//Simple route for updating objects
app.put((req, res)=>{
    res.send(`Updated an object`)
    console.log(req)
})

//Simple route for deleting objects
app.delete((req, res)=>{
    console.log(req);
    res.send(`Deleted an object`);
})

//Step 7: Error Handling

//Generic
app.use((err, req, res, next) =>{
    console.log(err.stack);
    res.status(500).json({
        error: "Something Broke!",
        errorStack: err.stack,
        errorMessage: err.message,
    });
});

// 404 Resource not found 
app.use((req, res, next)=>{
    res.status(404).json({
        error: "Resource Not Found"
    });
});

//Step 8: Make server listen on our port
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})