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
exports.pokemon = function(id, callback){
	db.Pokemon.findById(id,function(err,pokemon){
		if(err){
			callback({error: 'Não foi possível recuperar o Pokemon'});
		}else{
			callback(pokemon);
		}
	});
};
exports.save = function(number, name, height, weight, especie, type, callback){
	db.Pokemon({
		'number':number,
		'name':name,
		'height':height,
		'weight':weight,
		'especie':especie,
		'type':type})
	.save(function(err, pokemon){
			if (err) {
				callback({error: 'Erro ao salvar o pokemon'});
			} else{
				callback(pokemon);
			};
	});
};
exports.update = function(id, number, name, height, weight, especie, type, callback){
	db.Pokemon.findById(id, function(err, pokemon){
		if(number != pokemon.number){
			pokemon.number = number;
		}

		if(name != pokemon.name){
			pokemon.name = name;
		}

		if(height != pokemon.height){
			pokemon.height = height;
		}

		if(weight != pokemon.weight){
			pokemon.weight = weight;
		}

		if(especie != pokemon.especie){
			pokemon.especie = especie;
		}

		if(type != pokemon.type){
			pokemon.type = type;
		}

		pokemon.save(function(err, pokemon){
			if (err) {
				callback({error: 'Erro ao atualizar o pokemon'});
			} else{
				callback(pokemon);
			};
		});
	});	
};
exports.delete = function(id, callback){
	db.Pokemon.findById(id, function(err, pokemon){
		if (err) {
			callback({error:'Não foi possível encontrar o pokemon para excluir'});
		} else{
			pokemon.remove(function(err){
				if(!err){
					callback({response:'Pokemon excluído com Sucesso'});
				}
			});
		};
	});
};


