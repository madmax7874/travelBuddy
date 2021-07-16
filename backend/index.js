const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api',(req,res)=>{
    res.json("vidholi");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server has started on port ${PORT}`);
});