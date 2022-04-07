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


app.get('/login', async (req, res) => {
    res.redirect("https://open.trovo.live/page/login.html?client_id=e0b02bf8e9720f5a6f8a5b54ee2d6637&response_type=token&scope=user_details_self+chat_send_self+send_to_my_channel+manage_messages&redirect_uri=http%3A%2F%2Fshaibot-trovo.herokuapp.com%2Fsuccess&state=statedata")
    res.end()
})
