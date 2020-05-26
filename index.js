const express = require("express");
const path = require("path");

const port = 8000;

const db = require("./config/mongoose");
const Contact = require('./models/contactList')

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
    Contact.find({}, function(err, contacts){
        if (err){
            console.log(`There's an error in fetching the contact from the database ${err}`);
        }
        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts,
        })        
    })
});

app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    }, function(err, contactList){
        if (err){
            console.log(`There's an error in adding contact to the database: ${err}`);
        }
        console.log(`The contact ${contactList} has been successfully added to the database.`);

        return res.redirect('back');
    })
});

app.get('/delete-contact', function(req, res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if (err){
            console.log("There's an error in deleting the contact from the database");
        }
        return res.redirect("back");
    })
})

app.listen(port, function(err){
    if (err){
        console.log(`There was an error in running the server: ${err}`);
        return
    }
    console.log(`The server is up and running at the port: ${port}`);
});

