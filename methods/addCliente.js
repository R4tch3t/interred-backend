const mysql = require("mysql")
const setResponse = (res, outJSON, con) => {
     //   outJSON = JSON.stringify(outJSON);
     try{
       con.destroy();
     }catch(e){
       
     }
     try{
        res.send(outJSON);
     }catch(e){
       console.log(e)
     }
     
       // server.close();
       // server.listen(port, hostname);
}
const _addCliente = (req,res) => {

    try{
    const {nombre,telefono,ubi,idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago} = req.body
    let outJSON = {}
    let con = mysql.createConnection({
                        host: "localhost",
                        user: process.env.NODE_MYSQL_USER,
                        password: process.env.NODE_MYSQL_PASS,
                        database: "interred"
    });
    con.connect((err) => {
      outJSON = {};
      outJSON.error = {};
      if (err) {
        console.log(`Err on con: ${err}`);
        
      } else {
        
        let sql = `INSERT INTO clientes(cliente, telefono, ubi) VALUES ('${nombre}','${telefono}','${ubi}')`
        console.log(sql)
        con.query(sql, (err, result, fields) => {
          console.log(result)
          console.log(result.insertId)
          if (!err && result) {
            outJSON.cliente = result                
            sql = `INSERT INTO recibos (idCliente, fechaPago, monto, idVelocidad, dateI, dateF, difDate) VALUES ('${result.insertId}', '${fechaPago}', '${monto}', '${idVelocidad}', '${fechaSI}', '${fechaSF}', '${difDate}')`
            con.query(sql, (err, result, fields) => {
              console.log(result)
              if (!err) {
                outJSON.exito = 1
                setResponse(res, outJSON, con);
              }
            })
             
          } else {
                outJSON.error.name = 'error01'  
                
          }
          
         // padronR(subqueryB)
        });


      }
    });
    }catch(e){
      console.log(e)
    }

 }

 const addCliente = (req, res) => {
        try {
            const {nombre} = req.body
            console.log(nombre)
            console.log(req.body)
                   if (nombre) {

                        _addCliente(req, res)

                    } else {
                        res.end()
                    }
            
        } catch (e) {
            console.log(e)
        }

    }
 
module.exports=addCliente