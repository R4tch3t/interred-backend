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
        let subqueryB = ''
        
        //var subqueryN = ''
        if (cliente !== '') {
          if (tipoB != undefined && tipoB === 0) {
              subqueryB = `WHERE c.cliente='${cliente}'`
          }
          if (tipoB != undefined && tipoB === 1) {
            subqueryB = `WHERE c.telefono LIKE '%${telefono?telefono:''}%'`
          }
        }
        let sql = `SELECT * FROM clientes c ${subqueryB} ORDER by c.idCliente ASC`
        con.query(sql, async (err, result, fields) => {
          //console.log(result)
          
          if (!err) {
            if (result.length > 0) {
              outJSON.clientes = result
              let c = 0
              let l = result.length
              console.log("c "+c)
              result.forEach(async (e) => {
                console.log(e.idCliente)
              
              //const q = () => {return new Promise((resolve,reject)=>{
                sql = `SELECT * FROM recibos r, velocidad v WHERE r.idCliente=${e.idCliente} AND v.idVelocidad=r.idVelocidad ORDER by r.idRecibo DESC`
               console.log(sql)
                con.query(sql, (err, result, fields) => {
                  //console.log(result)
                  if(!err){
                    if(result&&result.length>0){
                      console.log(result[0])
                      const currentDate = new Date(result[0].dateF)
                      if(result[0].dateF<=currentDate){
                        outJSON.clientes[e.idCliente-1].expiro=1
                        result[0].dateI.setMonth(result[0].dateI.getMonth()+result[0].difDate)
                        result[0].dateF.setMonth(result[0].dateF.getMonth()+result[0].difDate)
                      }//else{
                        outJSON.clientes[e.idCliente-1].ultimoRecibo=result[0]
                        //const difDate = (result[0].dateF.getMonth()+1)-(currentDate.getMonth()+1)
                        //outJSON.clientes[e.idCliente-1].difDate=difDate
                      //}

                      

                      
                    }
                  }
                  if(e.idCliente>=l){
                      console.log(outJSON)  
                        setResponse(res, outJSON);
                      }
                  console.log("yea")
                  //resolve(1)
                });

              //});}
             // await q();
              c++
              console.log("c "+c)
              });
              
              //const q = await con.query(sql) 
             // console.log(q)
             /* q.forEach((val,key)=>{
                console.log(val.RowDataPacket)
                console.log(key)
              })
              let lastC = 0;
              result.forEach((val,key)=>{
                console.log(val)
                console.log(key)
              })
              outJSON.clientes = result[0]
              
             
              sql = `SELECT * FROM ubipredio${inJSON.tp} u `
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
              setResponse(res, outJSON);
            }
          } else {
            setResponse(res, outJSON);
          }
          
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
  
