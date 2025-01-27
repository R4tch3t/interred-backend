let fs = require('fs');
let https = require('https');
let express = require('express');
const PORT = 2000;
const path = require('path');
//const cors = require('cors');
const clientes = require('./allClientes');
const {genRecibo, delRecibo, addCliente, deleteCliente, editCliente} = require('./methods');
//const delRecibo = require('./methods');

let app = express();
let options = null
try {
    options = {
        key: fs.readFileSync(path.join(__dirname, "cert/server.key")),
        cert: fs.readFileSync(path.join(__dirname, "cert/server.cer"))
    }
} catch (e) {
    https = require('http');
    console.log(e)
}

function setResponseHeaders(res, filename) {
    res.header('Content-disposition', 'inline; filename=' + filename);
    res.header('Content-type', 'application/pdf');
}
function setResponseHeadersJSON(res) {
    res.header('Content-type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

}
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
https.createServer(options, app).listen(PORT, ()=> {
    console.log("My https server listening on port " + PORT + "...");
});
app.get('/expediente/:tp/:CTA/:escritura', function(req, res){
    try {
        
        var filename = "/var/expedientes/" + req.params.tp + "/" + req.params.CTA
        filename += "/" + req.params.escritura
            //filename = path.join(__dirname, filename)
            // console.log(filename)
            // file = tmpdir + filename;
        setResponseHeaders(res, req.params.escritura);
        //fs.createReadStream(path.join(__dirname, filename)).pipe(res);
        fs.createReadStream(filename).pipe(res);
        /*
        //To Create in the fly pdf
        (async function() {
            const instance = await phantom.create();
            const page = await instance.createPage();

            await page.property('viewportSize', { width: 1024, height: 600 });
            const status = await page.open(path.join(__dirname, filename));
            console.log(`Page opened with status [${status}].`);
            console.log(path.join(__dirname, filename))
            await page.render(req.params.escritura);
            console.log(`File created at [./stackoverflow.pdf]`);
            fs.createReadStream(path.join(__dirname, filename)).pipe(res);
            await instance.exit();
        })();*/

    } catch (e) {
        console.log(e)
    }
});

app.all('/clientes/get', (req, res) => {
    try {

        //console.log(res)
        //let filename = ["Acceso.js"]
       //import('./comprobarU.js').then(({comprobarU})=>{
            setResponseHeadersJSON(res, req.body.escritura);

            clientes(req,res)
       // })
        //res.send(filename)

    } catch (e) {
        console.log(e)
    }
});

app.all('/clientes/genRecibo', (req, res) => {
    try {

        
        //console.log(res)
        //let filename = ["Acceso.js"]
       //import('./comprobarU.js').then(({comprobarU})=>{
            setResponseHeadersJSON(res);

            genRecibo(req,res);
       // })
        //res.send(filename)

    } catch (e) {
        console.log(e)
    }
});

app.all('/clientes/delRecibo', (req, res) => {
    try {

        //console.log(res)
        //let filename = ["Acceso.js"]
       //import('./comprobarU.js').then(({comprobarU})=>{
            setResponseHeadersJSON(res);

            delRecibo(req,res);
       // })
        //res.send(filename)

    } catch (e) {
        console.log(e)
    }
});

app.all('/clientes/addCliente', (req, res) => {
    try {

        //console.log(res)
        //let filename = ["Acceso.js"]
       //import('./comprobarU.js').then(({comprobarU})=>{
            setResponseHeadersJSON(res);

            addCliente(req,res);
       // })
        //res.send(filename)

    } catch (e) {
        console.log(e)
    }
});

app.all('/clientes/editCliente', (req, res) => {
    try {

        //console.log(res)
        //let filename = ["Acceso.js"]
       //import('./comprobarU.js').then(({comprobarU})=>{
            setResponseHeadersJSON(res);

            editCliente(req,res);
       // })
        //res.send(filename)

    } catch (e) {
        console.log(e)
    }
});

app.all('/clientes/deleteCliente', (req, res) => {
    try {

        //console.log(res)
        //let filename = ["Acceso.js"]
       //import('./comprobarU.js').then(({comprobarU})=>{
            setResponseHeadersJSON(res);

            deleteCliente(req,res);
       // })
        //res.send(filename)

    } catch (e) {
        console.log(e)
    }
});


