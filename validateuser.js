
module.exports = function( request, response, next ){
    let token = request.header('token');
    let userID = null
    const db= request.db;
    if(token === undefined || token === 'null'){
        token = '';
        let sourceCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        while(token.length < 40){
            let randomCharIndex = Math.floor( sourceCharacters.length * Math.random());
            let randomCharacter = sourceCharacters[randomCharIndex];
            token += randomCharacter;
        }
        
        db.connect( ()=>{
            const query = "INSERT INTO `users` SET `key`= '"+token+"', `added`=NOW()";
            console.log('made new token: ' + token)
            db.query(query, (error, result )=>{
                if(!error){
                    request.userID = result.insertId;
                    response.header('userToken',token);
                    next();
                } else {
                    next('error getting user id from token' + error);
                }
            });
        })
    } else {
        const query = 'SELECT `id` FROM `users` WHERE `key` = ?';
        db.connect( ()=>{
            db.query(query, [token], (error, data)=>{
                if(!error){
                    request.userID = data.id;
                    next();
                } else {
                    next('invalid token '+ token);
                }
            })
        });
    }
}