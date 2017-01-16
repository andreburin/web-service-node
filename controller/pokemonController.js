var db = require('../db_config.js');

exports.list = function(callback){
	db.Pokemon.find({},function(err,pokemons){
		if(err){
			callback({error: 'Não foi possível recuperar a lista de Pokemons'});
		}else{
			callback(pokemons);
		}
	});
};
exports.pokemon = function(){};
exports.save = function(){};
exports.update = function(){};
exports.delete = function(){};


