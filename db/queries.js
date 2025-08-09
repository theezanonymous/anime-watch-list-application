const pool = require("./pool");
async function getAnimeObject(link, name = false){
    let anime;
    await fetch(link).then(response => {
        //   if (!response.ok) {
        //     throw new Error('Network response was not ok');
        //   }
          return response.json();
        })
        .then(d => {
          // Work with the fetched data
          
          if(name==true){
            anime = d.data[0]
          }
          else{
            anime = d.data
          }
        })
        .catch(error => {
          // Handle any errors that occurred during the fetch or parsing
          console.error('There was a problem with the fetch operation:', error);
        });
        // let genres = 
        // [anime.mal_id, anime.titles[0].title, anime.images.jpg.image_url, 
        // anime.type, anime.episodes, anime.status, anime.rating, anime.score, anime.popularity, anime.synopsis, genres]
        return {
            id: anime.mal_id,
            title: anime.titles[0].title,
            image_url: anime.images.jpg.image_url,
            type: anime.type,
            episodes: anime.episodes,
            status: anime.status,
            rating: anime.rating,
            score: anime.score,
            popularity: anime.popularity, 
            synopsis: anime.synopsis,
            genres:anime.genres.map((genre)=>genre.name)
        }
}


async function getUserList(){
    const userList = await pool.query("SELECT * FROM userList;")
    return userList.rows
}
async function getExistingInfoFromId(id){
    const {rows} = await pool.query("SELECT * FROM userList WHERE id=$1;", [id])
    if(rows.length>0){
      return rows[0].episodeswatched
    }
    return undefined;
}
async function getAnimeByName(name){
    let animeObject = await getAnimeObject('https://api.jikan.moe/v4/anime?q='+name , true)
    return animeObject.id
}
async function getAnimeById(id){
    let animeObject = await getAnimeObject('https://api.jikan.moe/v4/anime/'+id, false)
    return animeObject;
}
async function deleteAnime(id){
    await pool.query(`DELETE FROM userList WHERE id=$1`, [id])
}
async function insertAnime(id, episodesWatched){
    let anime;
    await fetch('https://api.jikan.moe/v4/anime/'+ id).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(d => {
          // Work with the fetched data
          
          anime = d.data

        })
        .catch(error => {
          // Handle any errors that occurred during the fetch or parsing
          console.error('There was a problem with the fetch operation:', error);
        });
        let genres = anime.genres.map((genre)=>genre.name)
        
        await pool.query(`INSERT INTO userList VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12)`, [anime.mal_id, episodesWatched, anime.titles[0].title, anime.images.jpg.image_url, 
        anime.type, anime.episodes, anime.status, anime.rating, anime.score, anime.popularity, anime.synopsis, genres])
}
module.exports = {
    getUserList, getAnimeByName, getAnimeById, insertAnime, deleteAnime, getExistingInfoFromId
}
