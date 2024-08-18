

/*Store class that takes 5 parameters
{string} id: Id of Beverage
{string} name: Name of beverage
{string} description
{string} price: Cost of item
{string} catagory: Catagory of the beverage
{bool} inStock: Shows if item is available
{string} count: Amount of the beverage in stock
*/
class Beverage {
    constructor(name, description, price, catagory, inStock, count, id = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = parseFloat(price).toFixed(2);
        this.catagory = catagory;
        this.inStock = inStock;
        this.count = parseInt(count);
        this.updatePrice = (newPrice) => {
            this.price = parseFloat(newPrice).toFixed(2);
        }
        this.updateStock = () => {
            this.inStock = !this.inStock;
        }
        this.udpateItem = (updatedItem) => {
            this.name = updatedItem.name;
            this.description = updatedItem.description;
            this.price = updatedItem.price;
            this.catagory = updatedItem.catagory;
            this.inStock = updatedItem.inStock;
            this.count = updatedItem.count;
        }
        this.takeSome = (amount) => {
            let newCount = this.count - amount;
            if(newCount<0){
                console.log(`Can only take ${this.count}`)
            } else if(newCount==0){
                this.count = 0;
                this.inStock = false;
            } else{
                this.count = newCount;
            }
        }
        this.addMore = (amount) => {
            this.count += amount;
        }
    }
}

module.exports = Beverage;