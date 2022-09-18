

// 18:00 -> 1080 18*60

export function convertHourStringToMinutes(hourstring:string){
    const [hours,minutes] = hourstring.split(':').map(Number)

    const minutesAmount = (hours*60)+minutes;

    return minutesAmount;


}