const pool = require("./pool");
async function main(){
    console.log(await pool.query("SELECT * FROM userList;"));
}
main()