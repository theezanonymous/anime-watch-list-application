const {Client} = require('pg')

const tableSQL = `
CREATE TABLE IF NOT EXISTS animeList (
  id INTEGER PRIMARY KEY, 
  title TEXT,
  image_url TEXT,
  type TEXT,
  episodes INTEGER,
  status TEXT,
  rating TEXT,
  score FLOAT(24),
  popularity INTEGER, 
  synopsis TEXT,
  genres TEXT[]

);
`


async function main(){
    console.log("seeding...")
    const client = new Client({
        connectionString: "postgresql://leonliu:@localhost:5432/inventory",
      });
    await client.connect();
    await client.query(tableSQL);
    for(let j = 1; j <=1158; j++){
      let data;
      await fetch('https://api.jikan.moe/v4/anime?page='+j).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(d => {
          // Work with the fetched data
          
          data = d.data

        })
        .catch(error => {
          // Handle any errors that occurred during the fetch or parsing
          console.error('There was a problem with the fetch operation:', error);
        });
      if(data){
      for(let i = 0; i < data.length ; i++){
        let anime = data[i];
        let genres = anime.genres.map((genre)=>genre.name)
        await client.query(`INSERT INTO userList VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [anime.mal_id, anime.titles[0].title, anime.images.jpg.image_url, 
        anime.type, anime.episodes, anime.status, anime.rating, anime.score, anime.popularity, anime.synopsis, genres])
      }
    }
    }
    await client.end();
    console.log("done");
}
main()