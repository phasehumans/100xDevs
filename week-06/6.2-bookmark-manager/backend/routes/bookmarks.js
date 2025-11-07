let bookmarks = []; // in memory space
let count = 0
export async function addBookmark(req,res){
   const bookmark = req.body.bookmark

    if(!bookmark){
        res.json({
            message : "bookmark is required"
        })
        return
    }

    bookmark = {
        bookmark : bookmark,
        id : count++
    }
    bookmarks.push(bookmark)

}

export async function deleteBookmark(req,res){
    const todoID = req.params.id

    bookmarks.splice(bookmarks.id(todoID))

    res.json({
        message : "bookmark is deleted"
    })
}

export async function getAllBookmarks(req,res){
    res.json({
        bookmarks : bookmarks
    })
}