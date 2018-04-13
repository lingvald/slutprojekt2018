const
	express 				= require('express'),
	mongoose 				= require('mongoose'),
	passport 				= require('passport'),
	bodyParser 				= require('body-parser'),
	User					= require('./models/user'),
	Conversation			= require('./models/conversation'),
	LocalStrategy 			= require('passport-local'),
	passportLocalMongoose 	= require('passport-local-mongoose'),
	path					= require('path'),
	app						= express();

app.use(express.static(__dirname + '/node_modules'));
mongoose.connect("mongodb://localhost/chatt_auth");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(path.resolve(), 'static')));
app.use(bodyParser.json());

app.use(require('express-session')({
	secret: "this is a chat",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
// ROUTES
// ===========

app.get('/',  function(req, res){
	res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/home',isLoggedIn , function(req, res){
	res.sendFile(path.join(__dirname + '/static/App.html'));

});

app.get('/home/isloggedin', isLoggedIn, function(req, res){
	res.send(req.user);
});

app.post('/register', function(req, res){
	req.body.username;
	req.body.password;
	User.register(new User({username: req.body.username}), req.body.password, function(error, user){
		if(error){
			console.log(error);
			return res.redirect('/');
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/home');
		});
	});
});

app.get('/api/users', function(req, res){
	var currentUser = req.user.username;

	User.find({username: {$ne: currentUser}}, function(error, result){

		if(error){
			console.log(error);
		} else {

		}
		res.send(result);
	});
});

app.get('/api/users/:opponent', function(req, res){
	const opponent = req.params.opponent;
	User.find({username: opponent}, function(error, result){
		if(error){
			console.log(error);
		} else {

		}
		res.send(result);
	});
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/'
}), function(req, res){

});

app.post('/userinfo', function(req, res){
    console.log(req.user);
	const identifier = req.user.username;
	const bio = req.body.bio;
	const city = req.body.city;
    const sex = req.body.sex;
	const age = req.body.age;
	const image = req.body.image;
	console.log(identifier);

	User.findOneAndUpdate({username: identifier}, {$set: {bio: bio, city: city, age: age, sex: sex, image: image}}, {upsert:true}, function(err, raw) {
    if (err) {
      res.send(err);
    }
    res.redirect('/home');
  });
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

// CHATROOM ROUTES

app.post('/conversations', function(req, res){
	const username = req.user.username;
	const opponent = req.body.opponent;
	const message = req.body.message;
	const user_id = req.body.user_id;
	const imgUrl = req.body.imgUrl;

	const newConversation = new Conversation ({
		username: username,
		message: message,
		user_id: user_id,
		opponent: opponent,
		imgUrl: imgUrl
	});

newConversation.save(function(error, result){
		if(error){
			console.log('error');
		} else {

		}
	});
});

app.get('/api/allconversations', function(req, res){

		Conversation.find({'opponent': 'toAll'}, function(error, result){
if(error){
console.log(error);
}
res.send(result);
});
})
app.get('/api/conversations/:opponent', function(req, res){
	const opponent = req.params.opponent;
	const username = req.user.username;

	Conversation.find({
        $and : [
            { $or : [ { username: username }, { username : opponent } ] },
            { $or : [ {opponent : username }, { opponent : opponent }  ] }]}, function(error, result){
		if(error){
			console.log(error);
		} else {

		}
		res.send(result);
	});
});

app.listen(3000, function(){
	console.log('server is running on port 3000');
});
