import { useEffect, useState } from "react"

const useCountDown = (minutes) => {
  const [seconds, setSeconds] = useState(minutes * 60)

  useEffect(() => {

    if(seconds > -1) {
        const interval = setInterval(() => {
            setSeconds(seconds - 1)
        }, 1000)
        return () => clearInterval(interval)
    } 

  }, [seconds])

  console.log(seconds)

  return seconds > -1 ? getReturnValues2(seconds) : "EXPIRED"
}

const getReturnValues2 = (countDown) => {

  const minutes = Math.floor(countDown / 60)
  const seconds = countDown % 60

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0")
}

export default useCountDown
