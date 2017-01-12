var MongoClient = require('mongodb').MongoClient;
var document = require('./data/pokemons.json');
var url = 'mongodb://localhost/web-service-node';

MongoClient.connect(url, function(err, db){
	if (err){
		return console.dir(err);
	}
	var collection = db.collection('pokemons');
	collection.insert(document, function(err, result){
		if(err) return console.dir(err);	
	});
});