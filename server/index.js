const express=require("express");
const cors=require("cors");
const multer=require("multer");
const fs = require("fs");
const app=express();

app.use(express.json());
app.use(cors());

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./public/images") // set the destination to save the file
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`) // set the file name to current timestamp + original name
    }
})

const upload=multer({storage})

app.post("/upload",upload.single("file"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
        const filePath = req.file.path;

        // Read the file content
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }
            console.log("File content:", data);
            res.send(data); // send the file content as response
        });
    } else {
        res.status(400).send("No file uploaded");
    }
    
    
})


// Serve static files from the public directory
app.listen(3000,()=>{
    console.log("server is running");
    
})