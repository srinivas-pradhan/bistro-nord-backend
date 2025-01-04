export const ValidateDate = (epochdate) => {
    const CurrentDate = Math.round(Date.now() / 1000);
    if ( epochdate <= CurrentDate) {
        return false
    }
    else {
        return true
    }
}

export const DateConverter = (datestring) => {
    const unixinseconds = Math.round(Date.parse(datestring) / 1000)
    return unixinseconds
}

// Add logic to check if there are more than 5 active reservations for the user.
// If so - Please ask them to work with us for a Business account.
