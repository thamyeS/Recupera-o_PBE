const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'stockcar'
});

con.connect((err) =>{
    if(err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('conectado ao banco de dados.');
});

const teste = (req, res) => {
    res.send("Back-end respondendo");
}

     // CRUD - Create clientes
const createclientes = (req, res) =>{
    const {nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;

    const query = 'INSERT INTO clientes(nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'Cliente Criado com sucesso', result});
        }
    });
};

     // CRUD - Read clientes
     const readclientes = (req, res) => {
        con.query("SELECT * FROM clientes", (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json(result);
            }
     });
}

     // CRUD - Update clientes
     const updateclientes = (req, res) => {
        const {cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;
    
        const query = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';
        con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result) =>{
            if(err) {
                res.status(500).json({error: err,message});
            } else {
                res.json({message:'Cliente atualizado com sucesso', result});
            }
        });
    }

     // CRUD - Delete clientes
     const deleteclientes = (req, res) => {
        const {cliente_id} = req.params;

        const query = 'DELETE FROM clientes WHERE cliente_id = ?';
        con.query(query, [cliente_id], (err, result) =>{
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message: 'Cliente removido com sucesso', result});
            }
        });
    }

    //Saida Front
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

//Rota para clientes
app.post("/clientes", createclientes);
app.get("/clientes", readclientes);
app.put("/clientes", updateclientes);
app.delete("/clientes/:cliente_id", deleteclientes);


     // CRUD - Create Telefone
const createTelefone = (req, res) =>{
        const {numero, tipo, cliente_id} = req.body;
    
        const query = 'INSERT INTO Telefone (numero, tipo, cliente_id) VALUES(?, ?,?)';
        con.query(query, [numero, tipo, cliente_id], (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.status(201).json({message: 'Telefone Criado com sucesso', result});
            }
        });
    }
    
    //CRUD - Read Telefone
    const readTelefone = (req, res) => {
        con.query("SELECT * FROM telefone", (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json(result);
            }
        });
    }
    
        //CRUD - Update Telefone
    const updateTelefone = (req, res) => {
        const {telefone_id, numero, tipo, cliente_id} = req.body;
    
        const query = 'UPDATE Telefone SET numero = ?, tipo= ?, cliente = ? WHERE telefone_id = ?';
        con.query(query, [numero, tipo, telefone_id, cliente_id], (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message:'Telefone atualizado com sucesso', result});
            }
        });
    }
    
        //CRUD - Delete Telefone
        const deleteTelefone = (req, res) => {
            const {telefone_id} = req.params;
    
            const query = 'DELETE FROM Telefone WHERE telefone_id = ?';
            con.query(query, [telefone_id], (err, result) =>{
                if(err) {
                    res.status(500).json({error: err.message});
                } else {
                    res.json({message: 'Telefone removido com sucesso', result});
                }
            });
        }
    
    
 //Rota para Telefone
    app.post("/Telefone", createTelefone);
    app.get("/Telefone", readTelefone);
    app.put("/Telefone", updateTelefone);
    app.delete("/Telefone/:telefone_id", deleteTelefone);
    

// CRUD - Create carros
const createcarros = (req, res) =>{
    const {marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id } = req.body;

    const query = 'INSERT INTO carros (marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id) VALUES(?, ?, ?, ?,?)';
    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'Carro Criado com sucesso', result});
        }
    });
}

//CRUD - Read carros
const readcarros = (req, res) => {
    con.query("SELECT * FROM carros", (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

    //CRUD - Update carros
const updatecarros = (req, res) => {
    const {marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id,carros_id} = req.body;

    const query = 'UPDATE carros SET marca_veiculo = ?, modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiculo = ?, cliente_id = ? WHERE carros_id = ?';
    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id, carros_id], (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message:'carro atualizado com sucesso', result});
        }
    });
}

    //CRUD - DELETE carros
    const deletecarros = (req, res) => {
        const {carros_id} = req.params;

        const query = 'DELETE FROM carros WHERE carros_id = ?';
        con.query(query, [carros_id], (err, result) =>{
            if(err) {
                res.status(500).json({error: err.message});
            } else {
                res.json({message: 'Carro removido com sucesso', result});
            }
        });
    }


//Rota para carros
app.post("/carros", createcarros);
app.get("/carros", readcarros);
app.put("/carros", updatecarros);
app.delete("/carros/:carros_id", deletecarros);



   //Teste de porta
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});