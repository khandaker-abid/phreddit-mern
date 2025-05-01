

export function Timestamp(props) {  //time only - data object
    const time = new Date(props.time)
    const now = new Date()
    console.log(time)
    const diff = time.getTime() - now.getTime()
    if(time.getFullYear() === now.getFullYear() && time.getDay() === now.getDay() && time.getMonth() === now.getMonth()) {
      const convert = 1000
      const secs = Math.abs(Math.floor(diff/convert))
      if(secs <=59) {
        return `${secs} second(s) ago`
      } else if (secs <= 60*60-1) {
        return `${Math.floor(secs/60)} minute(s) ago`
      } else {
        return `${Math.floor((secs/60)/60)} hour(s) ago`
      }
    } else {
      const convert = 1000*60*60*24
      const days = Math.abs(Math.floor(diff/convert))
      if(days===0) {
        return "1 day(s) ago"
      }
      if(days <= 29) {
        return `${days} day(s) ago`
      } else if (days <= 364) {
        return `${Math.floor(days/30)} month(s) ago`
      } else {
        return `${Math.floor(days/365)} year(s) ago`
      }
    }
}