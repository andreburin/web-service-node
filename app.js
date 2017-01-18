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

	pokemonController.pokemon(id,function(resp){
		res.json(resp);
	});
});

app.post('/pokemons', function(req, res){
	var number 	= validator.trim(validator.escape(req.param('number')));
	var name 	= validator.trim(validator.escape(req.param('name')));
	var height 	= req.param('height');
	var weight 	= req.param('weight');
	var especie = validator.trim(validator.escape(req.param('especie')));
	var type 	= req.param('type');

	pokemonController.save(number, name, height, weight, especie, type, function(resp){
		res.json(resp);
	});
	
});

app.put('/pokemons/:id', function(req, res){
	var id = req.param('id');
	var number 	= validator.trim(validator.escape(req.param('number')));
	var name 	= validator.trim(validator.escape(req.param('name')));
	var height 	= req.param('height');
	var weight 	= req.param('weight');
	var especie = validator.trim(validator.escape(req.param('especie')));
	var type 	= req.param('type');

	pokemonController.update(id, number, name, height, weight, especie, type, function(resp){
		res.json(resp);
	});
	
});

app.delete('/pokemons/:id', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));

	pokemonController.delete(id, function(resp){
		res.json(resp);
	});
});