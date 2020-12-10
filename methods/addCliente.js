const mysql = require("mysql")
const setResponse = (res, outJSON) => {
     //   outJSON = JSON.stringify(outJSON);
     
        res.send(outJSON);
       // con.destroy();
       // server.close();
       // server.listen(port, hostname);
}
const _addCliente = (req,res) => {

    try{
    const {nombre,telefono,ubi} = req.body
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
          
          if (!err) {
            outJSON.cliente = result
            outJSON.exito = 1
             /* sql = `SELECT * FROM ubipredio${inJSON.tp} u `
              sql += `WHERE u.CTA=${result[0].CTA} ORDER by u.CTA DESC`
              //console.log(sql)
              con.query(sql, (err, result, fields) => {
                
                if (!err) {
                  if (result.length > 0) {
                    outJSON.ubicacion = result
                    sql = `SELECT * FROM ordenes${inJSON.tp} o `
                    sql += `WHERE o.CTA=${result[0].CTA} ORDER by o.idOrden DESC`
                    con.query(sql, (err, result, fields) => {
                      if (!err) {
                        if (result.length > 0) {
                          outJSON.orden = result[0]
                          sql = `SELECT * FROM predial${inJSON.tp} p `
                          sql += `WHERE p.idOrden=${result[0].idOrden} ORDER by p.idImpuesto ASC`
                          con.query(sql, (err, result, fields) => {
                              if (!err) {
                                if (result.length > 0) {
                                  outJSON.predial = result
                                }
                              }
                              setResponse()
                          });

                        }else{
                          //setResponse()
                        }
                      }
                      setResponse()
                    });
                  } else {
                    outJSON.ubicacion = [{
                      calle: '', numero: 0, colonia: '', cp: 0, municipio: '', localidad: '', basegrav: 0
                    }]
                    setResponse()
                  }
                } else {

                }
                
              });*/
          } else {
                outJSON.error.name = 'error01'  
                
          }
          setResponse(res, outJSON);
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