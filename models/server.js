const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //DB connection
        this.conectarDB();
    
        //middlewares
        this.middlewares();
        //rutas de mi app
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        //directorio publico
        this.app.use(express.static('public'));
        //lectura y parseo del body
        this.app.use(express.json());
  
    }

    async conectarDB(){
        await dbConnection();
    }   

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuario'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });

    }
}

module.exports = Server;