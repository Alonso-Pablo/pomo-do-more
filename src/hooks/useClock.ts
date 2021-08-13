/* eslint-disable prettier/prettier */
import { useState } from 'react'

export const useClock = (timeLimit: number) => {
  //   30000(ms) / 16,666666666666666666666666666667 => 1800 = 30 minutes
  // 25000(ms) / 16,666666666666666666666666666667 => 1500 = 25 minutes
  const [clock, setClock] = useState<NodeJS.Timer | undefined>()

  const [timeStart, setTimeStart] = useState<number>(0)
  const [timeNow, setTimeNow] = useState<number>(0)
  const [savedTime, setSavedTime] = useState<number>(0)

  const updateTime = () => {
    setTimeNow((new Date()).getTime())
  }

  const startHandler = () => {
    if (clock) return false
    setTimeStart((new Date()).getTime())
    setTimeNow((new Date()).getTime())
    setClock(setInterval(updateTime, 1000))
  }


  const restartHandler = () => {
    if (clock) clearInterval(clock)
    setSavedTime(0)
    setTimeStart(0)
    setTimeNow(0)
    setClock(undefined)
  }

  const countTime = Math.floor((timeNow - timeStart) / 1000);
  const timeRest = timeLimit - countTime - savedTime;


  const pauseHandler = () => {
    const newSavedTime = savedTime + countTime
    setSavedTime(newSavedTime)
    if (clock) clearInterval(clock)
    setTimeStart(0)
    setTimeNow(0)
    setClock(undefined)
  }

  if (timeRest === -1) { restartHandler() }

  return {
    clock,           // SetInterval
    startHandler,    // Start fn
    pauseHandler,    // Pause fn
    restartHandler,  // Restart fn
    timeRest
  }
}
