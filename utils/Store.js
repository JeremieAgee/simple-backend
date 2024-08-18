/* Store class that takes 2 parameters
{string} name: Name of store
{array} beverages: Array of beverage objects
*/
class Store {
    constructor(name, beverages = []) {
        this.name = name;
        this.beverages = beverages;
        this.setBeverages = ()=>{
            this.beverages.forEach((item, index) => {
            item.id = index + 1;
        })}
        this.findItem = (itemId) => {
            const found = this.beverages[parseInt(itemId) - 1];
            console.log(found);
            return found
        }
        this.removeItem = (itemId) => {
            this.beverages.splice(parseInt(itemId) - 1, 1);
            this.beverages.forEach((item, index) => {
                item.id = index + 1;
            })
        }
        this.addItem = (newItem) => {
            newItem.id = this.beverages.length + 1;
            this.beverages.push(newItem);
        }
    }
}
module.exports = Store;