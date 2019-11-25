
export function getMonth( dateObj ){
    const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    return months[ dateObj.getMonth()-1];
}

export function getDayOfWeek( dateObj ){
    const days= ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dateObj.getDay()];
}

export function getOrdinal( number ){
    switch(number){
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}