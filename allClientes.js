const mysql = require("mysql")
const setResponse = (res, outJSON) => {
     //   outJSON = JSON.stringify(outJSON);
        res.send(outJSON);
       // con.destroy();
       // server.close();
       // server.listen(port, hostname);
}
const _clientes = (req,res) => {

    try{
    const {cliente, tipoB} = req.body
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
        let subqueryB = 'WHERE v.idVelocidad=c.idVelocidad'
        
        //var subqueryN = ''
        if (cliente !== '') {
          if (tipoB != undefined && tipoB === 0) {
              subqueryB = `WHERE c.cliente='${cliente}' AND v.idVelocidad=c.idVelocidad`
          }
          if (tipoB != undefined && tipoB === 1) {
            subqueryB = `WHERE c.telefono LIKE '%${telefono}%' AND v.idVelocidad=c.idVelocidad`
          }
        }
        let sql = `SELECT * FROM clientes c, velocidad v ${subqueryB} ORDER by c.idCliente ASC`
        
        con.query(sql, (err, result, fields) => {
          
          if (!err) {
            if (result.length > 0) {
              
              outJSON.clientes = result
              
             
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
          } else {

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

 const clientes = (req, res) => {
        try {
            const {cliente} = req.body
                   if (cliente||cliente==="") {

                        _clientes(req, res)

                    } else {
                        res.end()
                    }
            
        } catch (e) {
            console.log(e)
        }

    }
 
module.exports=clientes
  