
module.exports = function( request, response, next ){
    let token = request.header('token');
    let userID = null
    const db= request.db;
    if(token === undefined){
        token = '';
        let sourceCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        while(token.length < 40){
            let randomCharIndex = Math.floor( sourceCharacters * Math.random());
            let randomCharacter = sourceCharacters[randomCharIndex];
            token += randomCharacter;
        }
        
        db.connect( ()=>{
            const query = "INSERT INTO `users` SET `key`= '"+token+"', `added`=NOW()";
            db.query(query, (error, result )=>{
                if(!error){
                    request.userID = result.insertId;
                    next();
                } else {
                    next('error getting user id from token');
                }
            });
        })
    } else {
        const query = 'SELECT `id` FROM `users` WHERE `key` = ?';
        db.query(query, [$token], (error, data)=>{
            if(!error){
                request.userID = data.id;
                next();
            } else {
                next('invalid token '+ token);
            }
        })
    }
}