

const {Client} = require('pg')
const SQL = `
  CREATE TABLE IF NOT EXISTS userList(
    id INTEGER PRIMARY KEY,
    episodesWatched INTEGER,
    title TEXT,
    image_url TEXT,
    type TEXT,
    episodes INTEGER,
    status TEXT,
    rating TEXT,
    score FLOAT(24),
    popularity INTEGER, 
    synopsis TEXT,
  );
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