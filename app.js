const express = require('express')
const mongoose = require('mongoose') 
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = 3000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI) 

const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')


app.get('/', (req, res)=>{
  res.render('index')
})

app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})