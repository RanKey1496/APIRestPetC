var app = require('./app');
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.db, function(err, res){
	if(err){
		console.log(err);
		process.exit(1);
	} else {
  		console.log('Conection Established');
	  	app.listen(config.port, function(){
	    	console.log('Server at http://localhost:', config.port);
	  	});
	}
});