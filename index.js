// Step 1: Import Ecpress
const express = require('express');

//Step2: Create an express application.
const app = express();

//step 3: Define what port to use.
const PORT = 4000;

//Step 4: Import needed classes
const cors = require('cors');
const Store = require('./utils/Store');
const Beverage = require('./utils/Beverage');
const store = new Store('My Beverage Shop', [
    new Beverage("Orange Juice", "Freshly squeezed orange juice.", 3.99, "Juices", true, 5),
    new Beverage("Espresso", "Strong and rich espresso shot.", 2.5, "Coffee", true, 10),
    new Beverage("Green Tea", "Soothing and refreshing green tea.", 1.99, "Tea", false, 0),
    new Beverage("Lemonade", "Chilled lemonade with a hint of mint.", 2.75, "Juices", true, 6),
    new Beverage("Cappuccino", "Creamy cappuccino with frothy milk.", 3.5, "Coffee", true, 7),
    new Beverage("Herbal Tea", "A calming blend of herbal teas.", 2.25, "Tea", true, 8),
    new Beverage("Smoothie", "A thick and creamy fruit smoothie.", 4.99, "Juices", true, 15),
    new Beverage("Iced Coffee", "Cold brewed iced coffee with a hint of vanilla.", 2.99, "Coffee", false, 0),
    new Beverage("Black Tea", "Bold and robust black tea.", 1.75, "Tea", true, 9),
    new Beverage("Apple Juice", "Refreshing apple juice made from fresh apples.", 3.5, "Juices", true, 10)
])

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

//Get beverage or beverages

//Get all
app.get("/beverages", (req, res)=>{
    res.json(store);
})

// Get by Id
app.get("/beverages/:id", (req, res, next)=>{
    try{
        let itemId = parseInt(req.params.id);
        const beverage = store.findItem(itemId);
        if(!beverage){
            return res.status(404).json({message: "Beverage does not exists"})
        } 
        res.json(beverage);
    } catch(err){
        next(err)
    }
})

// Route to add object
app.post("/beverages", (req, res, next) => {
    try{
        const {name, description, price, catagory, inStock, count} = req.body;
        if(!name || !description || !price || !catagory || !inStock || !count){
            return res.status(400).json({message: "Missing required fields!"})
        } else {
            let newBeverage = new Beverage(name, description, price, catagory, inStock, count);
            store.addItem(newBeverage);
            res.status(201).json(store.findItem(store.beverages.length));
        }
    } catch(err){
        next(err);
    }
    
})

//Route for updating objects
app.put("/beverages/:id", (req, res, next) => {
    try{
        const itemId = parseInt(req.params.id);
        const { name, description, price, catagory, inStock, count} = req.body;
        if(!name || !description || !price || !catagory || !inStock || !count || !itemId){
            return res.status(400).json({message: "Missing required fields!"})
        } else {
            let newBeverage = new Beverage(name, description, price, catagory, inStock, count, itemId);
            store.beverages.splice(itemId-1, 1, newBeverage);
            res.status(201).json(store.findItem(itemId));
        }
    } catch(err){
        next(err);
    }
    
})

//Route for deleting objects
app.delete("/beverages/:id", (req, res) => {
    try{
        let itemId = parseInt(req.params.id);
        const beverage = store.findItem(itemId);
       if(!beverage){
        return res.status(400).json({message: "Beverage does not exists"})
       }
       store.removeItem(itemId);
       res.status(201).json({message: `Item  was deleted`});
    } catch(err){
        next(err);
    }
})

//Step 7: Error Handling

//Generic
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        error: "Something Broke!",
        errorStack: err.stack,
        errorMessage: err.message,
    });
});

// 404 Resource not found 
app.use((req, res, next) => {
    res.status(404).json({
        error: "Resource Not Found"
    });
});

//Step 8: Make server listen on our port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    store.setBeverages();
})