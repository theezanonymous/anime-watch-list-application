

const {Client} = require('pg')
const SQL = `
  DROP TABLE userList;
`
async function main(){
    console.log("seeding...")
    const client = new Client({
        connectionString: "postgresql://leonliu:@localhost:5432/inventory",
      });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
main();