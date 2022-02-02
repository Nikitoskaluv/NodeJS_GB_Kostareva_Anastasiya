const colors = require("colors/safe");

let smallest = +process.argv[2];
let largest = +process.argv[3];
const arr = [];
currentColor = 0;


function getArr(smallest, largest) {
    for (let i = smallest; i <= largest; i++) {
        arr.push(i)
    }
}

if (Number.isInteger(smallest) && Number.isInteger(largest)) {
    getArr(smallest, largest);
} else {
    console.log(colors.red('Вы ввели не числа'))
    return
}



let primeNumbers = arr.filter((number) => {
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    } return number > 1;
})

if (primeNumbers.length <= 0) {
    console.log(colors.red('Нет простых чисел'))
    return
} else {
    for (let i = 0; i < primeNumbers.length; i++) {
        let colorsArr = [colors.red, colors.yellow, colors.green];
        let stringColor = colorsArr[currentColor];
        console.log(stringColor(primeNumbers[i]));
        ++currentColor;
        if (currentColor >= colorsArr.length) {
            currentColor = 0;
        }
    }
}

// {
//     for (let i = 0; i <= primeNumbers.length; i++) {
//         let colorsArr = [colors.red, colors.yellow, colors.green];
//         console.log(colorsArr[i % colorsArr.length](primeNumbers[i].toString()))
//     }
// }




