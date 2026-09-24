import { expect, type Locator, type Page } from '@playwright/test';

let message1 : string = "Hello";
message1 = "bye";
console.log(message1);
let age1: number=20;
console.log(age1);
let isActive: boolean = false;

let numberArry: number[] = [1,2,3];

let data : any = "this could be anything"; //any datatype
data =42;

//ts functions
function add1(a:number,b:number) : number
{
    return a+b;
}
add1(3,4);

//ts onjects
let user1: {name:string, age:number, location:string} = {name: "Bob", age: 34, location:"Tokyo"};   
user1.location = "Japan";

//ts classes
class CartPage
{
    page: Page;
    cartList: Locator;
    checkout: Locator;
    constructor(page:any)
    {
        this.page = page;
        this.cartList = page.locator("div li").first();
        this.checkout = page.locator("text = Checkout");
    }
}