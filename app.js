var app = require('./app_config.js');

var pokemonController = require('./controller/pokemonController.js');

var validator = require('validator');



app.get('/', function(req, res){
	
});

app.get('/pokemons', function(req, res){

	pokemonController.list(function(resp){
		res.json(resp);
	});

});

app.get('/pokemons/:id', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));

	db.Pokemon.findById(id,function(err,pokemon){
		if(err){
			res.json({error: 'Não foi possível recuperar o Pokemon'});
		}else{
			res.json(pokemon);
		}
	});
});

app.post('/pokemons', function(req, res){

	var name = validator.trim(validator.escape(req.param('name')));

	new Pokemon({'name':name}).save(function(err, pokemon){
		if (err) {
			res.json({error: 'Erro ao salvar o pokemon'});
		} else{
			res.json(pokemon);
		};
	});
});

app.put('/pokemons', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));
	var name = validator.trim(validator.escape(req.param('name')));

	db.Pokemon.findById(id, function(err, pokemon){
		pokemon.name = name;

		pokemon.save(function(err, pokemon){
			if (err) {
				res.json({error: 'Erro ao atualizar o pokemon'});
			} else{
				res.json(pokemon);
			};
		});
	});	
});

app.delete('/delete/:id', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));

	db.Pokemon.findById(id, function(err, pokemon){
		if (err) {
			res.json({error:'Não foi possível encontrar o pokemon para excluir'});
		} else{
			pokemon.remove(function(err){
				if(!err){
					res.json({response:'Pokemon excluído com Sucesso'});
				}
			});
		};
	});
});