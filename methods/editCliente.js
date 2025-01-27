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
const _editCliente = (req,res) => {

    try{
    let {idCliente,idRecibo,nombre,telefono,ubi,velocidad,television, monto, difDate, fechaSI, fechaSF, fechaPago} = req.body
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
        
        let sql = `UPDATE clientes SET cliente='${nombre}',telefono='${telefono}',ubi='${ubi}' WHERE idCliente=${idCliente}`
        
        con.query(sql, (err, result, fields) => {
         // console.log(result)
          //console.log(result.insertId)
          if (!err && result) {
            outJSON.cliente = result    
         
            fechaPago=new Date(fechaPago).toLocaleString();
            fechaSI=new Date(fechaSI).toLocaleString();
            fechaSF=new Date(fechaSF).toLocaleString();

            sql = `UPDATE recibos SET fechaPago='${fechaPago}',monto='${monto}',velocidad='${velocidad}',television='${television}',dateI='${fechaSI}',dateF='${fechaSF}',difDate='${difDate}' `
            sql += `WHERE idRecibo=${idRecibo}`
         
            con.query(sql, (err, result, fields) => {
             
              if (!err) {
                outJSON.exito = 1
                setResponse(res, outJSON, con);
              }
            })
             
          } else {
              setResponse(res, outJSON, con);
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

 const editCliente = (req, res) => {
        try {
            const {nombre} = req.body
       
                   if (nombre) {

                        _editCliente(req, res)

                    } else {
                        res.end()
                    }
            
        } catch (e) {
            console.log(e)
        }

    }
 
module.exports=editCliente