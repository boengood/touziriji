/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: '这是首页' });
   //res.send('Hello World');
};


exports.login = function(req, res){
	res.render('login', { title: '用户登陆'});
};

exports.doLogin = function(req, res){
var user={
username:'admin',
password:'admin'
}
if(req.body.username===user.username && req.body.password===user.password){
req.session.user=user;
return res.redirect('/home');
} else {
req.session.error='用户名或密码不正确';
return res.redirect('/login.html');
}
};

exports.logout = function(req, res){
	req.session.user=null;
	res.redirect('/');
};

exports.home = function(req, res){
	res.render('home', { title: 'Home'});
};

exports.test = function(req, res){
	console.log( req.params.name);
	return res.redirect('/home');
};