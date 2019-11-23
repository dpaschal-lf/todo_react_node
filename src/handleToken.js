
export default function( res ){
    const token = res.headers.get('userToken')
    if(token){
        localStorage.userToken = token;
    }
}