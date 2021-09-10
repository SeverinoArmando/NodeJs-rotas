const db = require("./db")

//Criando tabela do Banco de Dados
const Post = db.sequelize.define('estudante',{
    titulo:{type: db.Sequelize.STRING},
    conteudo:{type:db.Sequelize.TEXT}
})

// Post.sync({force:true})

module.exports = Post;