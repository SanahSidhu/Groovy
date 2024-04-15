require('dotenv').config();

const express = require('express');
const app  = express();

//set views
app.set('views', './views')
app.set('view engine', 'ejs')

//static files
app.use(express.static(__dirname+"/public")); 

app.use("", require("./routes/routes"))


PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))