const express = require("express");
const path = require("path");

const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use(express.urlencoded());

let contactList = [
    {
        name: 'Prashwar',
        phone: 7406610689,
    },
    {
        name: 'Pratyush',
        phone: 7259389506,
    },
    {
        name: 'Risabh',
        phone: 7899774171
    }
]

app.get('/', function(req, res){
    res.render("home", {
        title: "My Contacts",
        contact_list: contactList,
    })
})
app.post('/create-contact', function(req, res){
    contactList.push(req.body);
    res.redirect("back");
})
app.listen(port, function(err){
    if (err){
        console.log(`There was an error in running the server: ${err}`);
        return
    }
    console.log(`The server is up and running at the port: ${port}`);
});
