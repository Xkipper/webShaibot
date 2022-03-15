console.clear();
import * as express from 'express';
import { resolve, join } from 'path';


const app: express.Application = express();
app.use(express.static(join(resolve("./"), 'html')));

// listen for requests :)
const PORTe : string|number = process.env.PORT || 5000;
app.listen(PORTe, () => {
    console.log(`Our app is running on port ${ PORTe }`);
});



app.get('/success', async (req, res) => {
    
    console.log(req.query);
    console.log("-------------------------------------------------------------")
    try {
        res.send("<small>"+ req.query.access_token + "</small>")
    } catch {
        res.send("Error!")
    }
    res.status(200)
    res.end()
})
