const express = require('express')
const app = express();
const port = 8080;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//importando arquivo
const busca = require("./models/db")


app.use(express.json());





//config tamblete engine
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars')

/*configurando o bodyParser pra pegar os dados
enviados pelo get*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//Verificando oa conexao
const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/trabalho', { useNewUrlParser: true })

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function () {
    console.log('Conectado com sucesso ao MongDB')



    //Configurando Rota Padrao
app.get('/init', (req, res) => {
        res.json({ action: 'Listing tasks' })
      })
  //GET: the 12 newest stand-up meeting notes
  app.get('/busca', function (req, res) {
        busca.find()
            .sort({ 'createdOn': -1 })
            .exec()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(500).json({
                message: 'Error finding meeting notes',
                error: err
            }))

    })

app.get('/',(req,res)=>{
    res.send(`Olá!! Seja bem vindo!<br> <h2>Podes usar a rota <i> "/cadastro"</i> para cadastrar de forma visual</h2>`)
})



//criando formulario de post/cadastro
app.get('/cadastro',(req,res)=>{
    res.render('formulario')
})



//adicionando
app.post('/novo', (req, res) => {
    const body = req.body
  
    res.json(body)
  })

app.post('/add',(req,res)=>{
    
    res.send(`Titulo: ${req.body.titulo}.  Conteudo: ${req.body.conteudo}`)
})


//Outro Post
    //POST: Create new Project ..
    app.post('/postar', function (req, res) {
        let project = new Project(req.body)
        note.save(function (err, note) {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })



// Atualizando
app.put('/novo/:id', (req, res) => {
    const taskId = req.params.id
  
    res.send({ action: 'Atulaizando', taskId: taskId })
  })



  // Delete task
app.delete('/novo/:id', (req, res) => {
    const taskId = req.params.id
  
    res.send({ action: 'Deletando', taskId: taskId })
  })
  





//Escutando a porta da ligacao. 
app.listen(port,()=>{
    console.log(`App rodando na url http://localhost:${port}`)
})
})