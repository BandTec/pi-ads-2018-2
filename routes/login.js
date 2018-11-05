var express = require('express');
var router = express.Router();
var isNull = require('../script').isNull;
var Database = require('../Database');
const Cryptr = require('cryptr');
const config = require('../config');
const cryptr = new Cryptr(config.security.key);

router.get('/', (req, res, next) => {
    if (!req.session.user || req.session.user && !req.session.user.logged_in) {
        res.render('login', {
            'message': req.session.message || ''
        });
    } else {
        res.render('index', {
            session: req.session
        });
    }
});

router.post('/', (req, res, next) => {
	console.log('tentando autenticar...');
	
	try {
			
		var login = req.body.login;
		var senha = req.body.senha;
		
		if (isNull(login) || isNull(senha)) {
			console.log('Login e/ou senha inválidos');
			res.render('login', {
				'mensagem': 'Login e/ou senha inválidos!'
			});
		} else {
			console.log('tentando consulta no banco...');
			Database.query(`SELECT * FROM usuario WHERE login = '${login}';`, (error, results, rows) => {
				console.log('entrou no o login');
				const msgErro = {'mensagem': "Falha no login"};
				if (error) {
					res.status(401).render('login', msgErro);
				}
				if (results.length > 0) {
					let decryptedPassword = cryptr.decrypt(results[0].senha);
					if (decryptedPassword === senha) {
						let user = {
							nome: results[0].nome,
							login: results[0].login,
							id: results[0].id,
							autenticado: true
						};
						req.session.user = user;
						res.redirect('/index');
					} else {
						res.status(401).render('login', msgErro);
					}
				} else {
					res.status(401).render('login', msgErro);
				}
			});
		}
    
	} catch (e) {
		console.error(`erro: ${e}`);
		res.send({'mensagem':`${e}`});
	}

});

module.exports = router;
