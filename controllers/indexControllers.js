const db = require('../db/queries.js')
exports.displayList = async (req, res)=>{
    const rows = await db.getUserList();
    res.render("homepage", {rows: rows})
}
exports.displayAnime = async (req, res)=>{
    const row = await db.getAnimeById(req.params.id)
    const existingInfo = await db.getExistingInfoFromId(req.params.id)
    res.render("animePage", {row:row, existingInfo:existingInfo})
}
exports.postAnime = async ( req, res)=>{
    await db.deleteAnime(req.params.id)
    if(req.body.watching == "yes"){
        await db.insertAnime(req.params.id, parseInt(req.body.episodeswatched))
    }
    res.redirect("/")

}
exports.getSearch = async(req, res)=>{
    let id = await db.getAnimeByName(req.query.search)
    res.redirect("/anime/"+id)
}