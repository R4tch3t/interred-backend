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

const _deleteCliente = (req,res) => {
    let band = true;
    let c = 0;
    let bandDel = false;
    try{
    const {idClientes} = req.body
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
        
        let sql = ``
        //while(band){
            if(idClientes.length>0){
            idClientes.forEach(element => {
            //while(c<idClientes.length){
               // sleep(1000);
                //if(!bandDel){
                    bandDel=true;
                    const idCliente=element[0];
                    sql = `DELETE FROM clientes WHERE idCliente=${idCliente}`
                    
                    con.query(sql, (err, result, fields) => {
                    
                    
                    sql = `DELETE FROM recibos WHERE idCliente=${idCliente}`
                    
                    con.query(sql, (err, result, fields) => {
                    c++;
                    const cc = c
                    bandDel = false;
                    if (!err) {                        
                        //outJSON.cliente = result
                        //outJSON.exito = 1
                        
                    } else {
                        outJSON.error.name = 'error01'  
                            
                    }
                    
                    if(cc===idClientes.length){
                        outJSON.exito = 1
                        setResponse(res, outJSON, con);
                    }
                    // padronR(subqueryB)
                    });

                    if (!err) {

                    } else {
                        outJSON.error.name = 'error01'      
                    }
                //  setResponse(res, outJSON);
                    // padronR(subqueryB)
                    });
                //}
            });
        }else{
            outJSON.exito = 1
            setResponse(res, outJSON, con);
        }
       // }
        
      }
    });
    }catch(e){
      console.log(e)
    }

 }

 const deleteCliente = (req, res) => {
        try {
            const {idClientes} = req.body
            
                   if (idClientes) {

                        _deleteCliente(req, res)

                    } else {
                        res.end()
                    }
            
        } catch (e) {
            console.log(e)
        }

    }
 
module.exports=deleteCliente