import moment from 'moment'


export const getAge = (birthday) => {
    var currentDate = new Date().getTime()
    var birthDate = new Date(birthday).getTime()

    let difference = (currentDate - birthDate)

    return moment.duration(difference).years()
}