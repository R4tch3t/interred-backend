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
const _delRecibo = (req,res) => {

    try{
    const {idRecibo,idCliente} = req.body
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
        
        let sql = `DELETE FROM recibos WHERE idRecibo=${idRecibo}`
        
        con.query(sql, (err, result, fields) => {
          
          if (!err) {
            sql = `SELECT * FROM recibos WHERE idCliente=${idCliente}`
            outJSON.clientes = result
            con.query(sql, (err, result, fields) => {
              if(result.length>0){
                outJSON.adeuda = 1
              }else{
                outJSON.adeuda = 0
              }
              setResponse(res, outJSON, con);
        });
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
                setResponse(res, outJSON, con);
          }
          
         // padronR(subqueryB)
        });


      }
    });
    }catch(e){
      console.log(e)
    }

 }

 const delRecibo = (req, res) => {
        try {
            const {idRecibo} = req.body
           
                   if (idRecibo) {

                        _delRecibo(req, res)

                    } else {
                        res.end()
                    }
            
        } catch (e) {
            console.log(e)
        }

    }
 
module.exports=delRecibo