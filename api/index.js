const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const port = 3000;

let htmlData = "";
let usersArr = [
    {
        id: 1,
        name: 'admin',
        lowName: 'admin',
        pass: 'juanollo15',
        userRooms: []
    },
    {
        id: 2,
        name: 'Juan',
        lowName: 'juan',
        pass: 'xd',
        userRooms: []
    },
    {
        id: 3,
        name: 'Rodri',
        lowName: 'rodri',
        pass: 'rodri',
        userRooms: []
    }
];
// let roomsArr = [
//     {
//         code: ,
//         creator: ,
//         html: ,
//     }
// ]

// Configuración de middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/transaction', (req, res) => {
    res.json({ HTMLlist: htmlData });
});

app.post('/transaction', (req, res) => {
    htmlData = req.body.HTMLlist;
    res.send("Data received");
});

server.listen(port, () => {
    console.log(`Estoy ejecutándome en el puerto ${port}`);
});



// app.get('/users', (req, res) => {
//     // res.json({ : usersArr });
//     res.send(JSON.stringify(usersArr));
// });

app.get('/isUserAvailable', (req, res) => {
    const newUserName = req.query.username.toLowerCase(); // Captura el nombre de usuario de la consulta

    const usuario = usersArr.find((u) => u.lowName === newUserName);

    if (usuario === undefined) {
        // console.log("SE PUEDE CREAR");
        res.send(true);
    } else {
        // console.log('"NOMBRE DE USUARIO EN USO"'); // Muestra el mensaje en la consola del servidor
        res.send(false);
    }
});

app.get('/isPassCorrect', (req, res) => {
    const userNameApproved = req.query.username.toLowerCase(); // Captura el nombre de usuario de la consulta
    const passwordToCheck = req.query.password; // Captura el nombre de usuario de la consulta

    const usuario = usersArr.find((u) => u.lowName === userNameApproved);

    if (usuario.pass === passwordToCheck) {
        // console.log("CONTRASEÑA CORRECTA");
        res.send(true);
    } else {
        // console.log("CONTRASEÑA INCORECTA"); // Muestra el mensaje en la consola del servidor
        res.send(false);
    }
});


app.post('/users', (req, res) => {
    // console.log("arr antes del push: ", usersArr);
    const newUser = req.body;
    usersArr.push(newUser);
    // console.log("me llego esto: ", newUser);
    // console.log("arr despues del push: ", usersArr);
});