const fs = require('fs')
const filename = 'text.txt'
const paragraph = fs.readFileSync(filename).toString()
// const reg = new RegExp('ab*')
const pattern = /par/mig;
const myArray = paragraph.match(pattern)
// console.log(myArray);

// console.log(`Occurences of pattern in the string is : ${myArray.length}`);

const nSCallBl = (err,data) =>{
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }
    console.log(data);
}

fs.readFile(filename,'utf8',nSCallBl)
// fs.readFile(filename, 'utf8',(err,data)=>{
//     if (err) {
//         return console.error(err)

//     }
//     console.log(data);
// })