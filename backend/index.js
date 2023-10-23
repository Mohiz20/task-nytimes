var express = require('express'),
    cors = require('cors'),
    bodyparser = require('body-parser'),
    dotenv = require('dotenv'),
    axios = require('axios'),
    helmet = require('helmet');

//App initialization
const app = express();
dotenv.config();   

const port = process.env.PORT || 8080;

app.use(cors());
app.use(require('morgan')('dev'));
app.use(helmet());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get("/top-stories", async function (req, res) {
    try{
        console.log('req.', req.query.type);
        const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${req.query.type}.json?api-key=${process.env.KEY}`);
        return res.send({
            data: response.data
        })
    }
    catch(error){
        console.log(error);
    }
});
  
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});