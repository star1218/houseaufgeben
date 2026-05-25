// "10369".split("") ДЗ 3.3

//let name = prompt("Enter your name:")
//let age = prompt("Enter your age:")
//let live = prompt("where do you live:")

//console.log(${name} ${age} ${live})          3.2 ДЗ

//console.log(typeof "Hello")      
//console.log(typeof 123)          
//console.log(typeof true)         
//console.log(typeof undefined)    
//console.log(typeof null)         
//console.log(typeof {name: "Ihor"}) 
//console.log(typeof 123n)         
//console.log(typeof Symbol())                           дз 3.1

//let numOrStr = prompt('input number or string');
//console.log(numOrStr);

//switch (true) {

  //  case numOrStr === null:
    //    console.log('ви скасували');
      //  break;

    //case numOrStr.trim() === '':
      //  console.log('Empty String');
        //break;

   // case isNaN(+numOrStr):
     //   console.log('number is Ba_NaN');
       // break;

    //default:
      //  console.log('OK!');
//}    //4.4 ДЗ





//let name = prompt("Enter your name:") 
//alert(Hello, ${name} How are you?) 4.1дз


//let a = 1
//let b = 1
//let c = 2

//let result

//if (a === b && b === c) {
  //  result = 'все равны'
//} else if (a === b  b === c  c === a) {
  //  result = 'есть одинаковые'
//} else {
//    result = 'все разные'
//}

//console.log(result) дз4.2

//let result = "";  дз 5.1

//for (let i = 20.5; i <= 30; i += 0.5) {
//    result = result + i + " ";
//}

//console.log(result);


//for (let i = 10; i <= 100; i += 10) {. дз 5.2
//    console.log(i + " доларів = " + i * 26 + " гривень");
//}



//let n = +prompt("Ведите число от 1 до 100") 5.3 дз
//for (let i = 1; i <= 100; i++)
//if (i** <= n)
//console.log("Веденное число ${n},в квадрате ${i}")


//let n = +prompt("Введіть число"); 5.4 дз

//let isPrime = true;

//if (n <= 1) {
//    isPrime = false;
//}

//for (let i = 2; i < n; i++) {
//    if (n % i === 0) {
//        isPrime = false;
//        break;
//    }
//}

//if (isPrime) {
//    console.log(`${n} — просте число`);
//} else {
//    console.log(`${n} — не просте число`);
//}


//let person = {. дз 6.1
//    name: "Ihor",
//    age: 21,
//    lend: "Ukraine",

//    showInfo() {
//        console.log(`Информация пользователя: ${this.name}, ${this.age}, ${this.lend}`)
//    }
//}

//person.showInfo()


//const numbers = [1,2,3,4,5,6] дз 6.2

//const evenNumbers = numbers.filter(function(number) {
//    return number % 2 === 0;
//});

//console.log(evenNumbers);

//let book = {. дз 6.3
//    contacts: [
//        {
//            name: "gra five",
//            phone: "0934243696",
//            email: "Tkachenko@gmail.com"
//        }
//    ],

//    findContact(name) {
//        return this.contacts.find(contact => contact.name === name);
//    },

//    addContact(contact) {
//        this.contacts.push(contact);
//    }
//}

//book.addContact({
//    name: "cs",
//    phone: "0985881806",
//    email: "Buzova@gmail.com"
//});

//console.log(book.findContact("cs"));