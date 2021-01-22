const getIdYoutube = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

const CalcWidth = (device: any, html: any) => (html?.settings?.[device] ? html?.settings?.[device] : (device === 'desktop' ? 960 : 375))
const TimesOnDay = [
  '00:00:00',
  '01:00:00',
  '02:00:00',
  '03:00:00',
  '04:00:00',
  '05:00:00',
  '06:00:00',
  '07:00:00',
  '08:00:00',
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '13:00:00',
  '14:00:00',
  '15:00:00',
  '16:00:00',
  '17:00:00',
  '18:00:00',
  '19:00:00',
  '20:00:00',
  '21:00:00',
  '22:00:00',
  '23:00:00',
  '24:00:00',
]
export default {
  getIdYoutube, CalcWidth, TimesOnDay,
}
