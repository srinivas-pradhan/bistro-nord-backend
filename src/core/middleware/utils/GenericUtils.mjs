export const ValidateDate = (epochdate) => {
    // const CurrentDate = Math.round(Date.now() / 1000) -> rounded in seconds
    const CurrentDate = Date.now()
    if ( epochdate > CurrentDate) {
        return true
    }
    else {
        return false
    }
}

