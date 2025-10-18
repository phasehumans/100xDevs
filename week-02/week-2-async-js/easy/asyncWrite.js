const fs= require('fs').promises
// .promises

async function write(filename, content){
    await fs.writeFile(filename, content, "utf-8")
    console.log("file written")
}


write("write.txt", "hello world")