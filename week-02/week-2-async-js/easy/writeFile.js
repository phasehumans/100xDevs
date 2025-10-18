import fs from "fs"

function write(filename, cb){
    fs.writeFile(filename, "this is new line", (error)=>{
        cb()
    });
}

write("sample.txt", (data)=>{
    console.log('done')
})
