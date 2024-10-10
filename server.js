import app from "./src/app.js";
import colors from "colors"
import config from "./src/config/config.js";
const PORT= config.PORT
app.listen(PORT,()=>{
    console.log(`app is running at PORT:${PORT}`.bgBlack.rainbow);
    
})