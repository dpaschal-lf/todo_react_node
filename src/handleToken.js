
export default function( res ){
        if(res.headers.hasOwnProperty('userToken')){
        localStorage.userToken = res.headers.userToken;
    }
}