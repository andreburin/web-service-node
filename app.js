var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db_string = 'mongodb://localhost/web-service-node';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar ao banco'));
db.once('open', function(){
	var pokemonSchema = mongoose.Schema({
		name:String
	});

	Pokemon = mongoose.model('Pokemon', pokemonSchema);
});


app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
	
});

app.get('/pokemons', function(req, res){
	Pokemon.find({},function(err,pokemons){
		if(err){
			res.json({error: 'Não foi possível recuperar a lista de Pokemons'});
		}else{
			res.json(pokemons);
		}
	});
});

app.get('/pokemons/:id', function(req, res){
	var id = req.param('id');

	Pokemon.findById(id,function(err,pokemon){
		if(err){
			res.json({error: 'Não foi possível recuperar o Pokemon'});
		}else{
			res.json(pokemon);
		}
	});
});

app.post('/pokemons', function(req, res){

	var name = req.param('name');

	new Pokemon({name:name}).save(function(err, pokemon){
		if (err) {
			res.json({error: 'Erro ao salvar o pokemon'});
		} else{
			res.json(pokemon);
		};
	});
});

app.put('/pokemons', function(req, res){
	res.end('Teste Acessada!');
});

app.delete('/delete/:id', function(req, res){
	var id = req.param('id');

	Pokemon.findById(id, function(err, pokemon){
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