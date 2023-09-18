async function InitFlashcards(){
    try{
        let id = 0;
        let username = "";

        let notes = []
        
        await fetch("/user/currentlyViewed")
        .then(x => x.json())
        .then(x => {
            id = x.id;
            username = x.username
        })
        .catch(x => console.log(x));
    
        console.log(id, username);

        await fetch(`/notes/${id}`)
        .then(x => x.json())
        .then(x => console.log(x));
    }
    catch (err){
        console.log(err);
    }
    
}

InitFlashcards()