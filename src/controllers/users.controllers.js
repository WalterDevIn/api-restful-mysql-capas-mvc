import pool from '../../config/conexion.js'
//ASYNC es una promesa -> tiene que esperar a que le lleguen los datos para continuar la ejecucion

//mostrar todos los usuarios
export const getAllUser = async (req, res) => {
    const sql = "SELECT * FROM users"; //consulta SQL
  
    try{ //intenta hacer la promesa
      const conection = await pool.getConnection(); //activa la conexion
      const [rows] = await conection.query(sql); //ejecuta la consulta -> el SQL
      conection.release(); //libera la conexion
      res.json(rows); //envia la respuesta
    }catch(error){ //si hay un error
      res.status(500).send("algo salio mal")
    }
  
}
//mostrar usuarios por id
export const getUserById = async (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM users WHERE id_user = ?`; //SQL q quiero ejecutar -> trae todo los q tiene la tabla "tienda"
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [id]);
      conection.release(); //libera la conexion
      
      (rows[0])? res.json(rows[0]) : res.status(404).send("usuario no existe")
      
  
    }catch(error){ //si hay un error
      res.status(500).send("algo salio mal")
    }
}
//insertar usuarios
export const createUser = async (req, res) => {
    const values = req.body
    const sql = `INSERT INTO users SET ?`
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [values]);
      conection.release(); 
      
      console.log(rows)
      res.status(201).send(`nuevo usuario con id ${rows.insertId}`)
      
  
    }catch(error){ 
      res.status(500).send("algo salio mal")
    }
}
//actializar datos -> cambiar datos de usuarios existentes
export const updateUser = async(req, res) => {
    const id = req.params.id;
    const newValues = req.body
    const sql = `UPDATE users SET ? WHERE id_user = ?`;
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [newValues, id]);
      conection.release(); 
      
      console.log(rows);
      (rows.affectedRows == 0)? res.status(404).send("Usuario no existe") : res.send("Datos actualizados")
  
    }catch(error){ 
      res.status(500).send("algo salio mal")
    }
}
//eliminar usuarios por id
export const deleteUser = async(req, res) => {
    const id = Number(req.params.id);
    const sql = "DELETE FROM users WHERE id_user = ?";
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [id]);
      conection.release(); 
      
      console.log(rows);
      (rows.affectedRows == 0)? res.status(404).send("Usuario no existe") : res.send("USUARIO ELIMINADO");
  
    }catch(error){ 
      res.status(500).send("algo salio mal")
    }
  }