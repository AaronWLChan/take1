export const convertMinutesToHoursAndMinutes = (minutes) => {

    if (minutes < 60){
        return minutes + "m"
    }

    //Converts for example 134 minutes --> 2h 14m
    let hour = Math.floor(minutes / 60) // 2 hours

    let min = minutes % 60
    
    return `${hour}h` + ` ${min}m`
}
