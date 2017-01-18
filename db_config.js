var db_string = 'mongodb://localhost/web-service-node';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar ao banco'));
db.once('open', function(){
	var pokemonSchema = mongoose.Schema({
		number: String,
		name:String,
		height: Number,
		weight: Number,
		especie: String,
		type: [String]
	});

	exports.Pokemon = mongoose.model('Pokemon', pokemonSchema);
});
