const fs= require('fs')

const cleanFile = (filepath) =>{
    fs.readFile(filepath, 'utf-8', (err, data) => {
        if(err){
            console.log("error while file reading")
            return
        }

        const clean = data.replace(/\s+/g, " ").trim();  

        fs.writeFile(filepath, clean, (err)=>{
            if(err){
                console.log("error while writing the file")
                return
            }

            console.log("file clean done")
        })
    })


    // fs.writeFile(filepath, clean, ) --- writefile should run when your readfile and cleancontent is done
    // nested async code
}

cleanFile("clean.txt")