const app = require('express')()
const http = require('http').createServer(app)
const mongoose = require('mongoose');
const cors = require('cors')
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const User = require("./model/User");
const groupMessage = require("./model/GroupMessage");

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const PORT = 2984 || process.env.PORT

http.listen(PORT , () => {
    console.log(`server running @ http://localhost:${PORT}/`)
})

const DB_CONNECTION = "mongodb+srv://dennis:XuVSkFvwBThbgTfN@cluster0.xnw7o6s.mongodb.net/101020193_lab_test1_chat_app?retryWrites=true&w=majority";

mongoose.connect(DB_CONNECTION, {  
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected!")
}).catch(err => {
    console.log(err);
    console.log("Could not connect?!");
    process.exit();
});

app.get("/",  (req, res) => {
    res.sendFile(__dirname + "/view/login.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/view/signup.html");
});

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/view/chat.html");
});

app.post('/signup', async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    })
    try{
        await newUser.save()
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/signup')
    }
});

app.post("/", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username != "" && password != "") {
        User.find({username : username}, function(err, data) {
            try {
                if (data[0]) {
                    if (data[0].password == password) {
                        res.redirect('/chat');
                    }
                    else {
                        res.redirect('/');
                    }
                }
                else {
                    res.redirect('/');
                }
            } catch(err) {
                console.log(err);
            }
        });
    }
});

io.on('connection' , socket => {
    console.log("New Socket connected...");

    socket.emit('message' , "Welcome to the chat");

    socket.on('joinRoom' , room => {
        socket.join(room);

        socket.on('GroupMessage' , msg => {

        });
    });
    
    socket.on('disconnect' , () => {
        console.log('Socket disconnected...');
    });
});