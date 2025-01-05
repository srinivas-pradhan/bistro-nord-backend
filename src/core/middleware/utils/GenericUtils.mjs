export const ValidateDate = (epochdate) => {
    const CurrentDate = Math.round(Date.now() / 1000);
    if ( epochdate > CurrentDate) {
        return true
    }
    else {
        return false
    }
}

export const DateConverter = (datestring) => {
    const unixinseconds = Math.round(Date.parse(datestring) / 1000)
    return unixinseconds
}
