export const RetournerMois = (data) => {
  switch (data) {
    case 0:
      return 'danvier'
    case 1:
      return 'février'
    case 2:
      return 'mars'
    case 3:
      return 'avril'
    case 4:
      return 'mai'
    case 5:
      return 'juin'
    case 6:
      return 'juillet'
    case 7:
      return 'aout'
    case 8:
      return 'septembre'
    case 9:
      return 'octobre'
    case 10:
      return 'novembre'
    case 11:
      return 'décembre'
    default:
      return
  }
}
export const getDayText = (data) => {
  switch (data) {
    case 0:
      return 'dimanche'
    case 1:
      return 'lundi'
    case 2:
      return 'mardi'
    case 3:
      return 'mercredi'
    case 4:
      return 'jeudi'
    case 5:
      return 'vendredi'
    case 6:
      return 'samedi'
    default:
      return
  }
}

export function getFullDate(e) {
  let mois = RetournerMois(new Date(e).getMonth())
  let jour = getDayText(new Date(e).getDay())
  let date = new Date(e).getDate()
  let year = new Date(e).getFullYear()
  return `${jour}, le ${date} ${mois} ${year}`
}
export const difference = (d, f) => {
  let test = parseInt(f - d) / 86400000
  let jour = test >= 0 ? test + 1 : test
  return parseInt(jour)
}
