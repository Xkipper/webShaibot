console.clear();
import express from 'express';
import { resolve, join } from 'path';


const app = express();
app.use(express.static(join(resolve("./"), 'html')));

// listen for requests :)
const PORTe : string|number = process.env.PORT || 5000;
app.listen(PORTe, () => {
    console.log(`Our app is running on port ${ PORTe }`);
});