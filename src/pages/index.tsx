/* eslint-disable prettier/prettier */
import { useRef, useState } from 'react'
import style from '../css/components/index.module.css'
import clsx from 'clsx'
import PageLayout from 'components/layout/page'
import TaskList from '../components/sections/TaskList'
import Clock from '../components/sections/Clock'
import { useToggleState } from 'hooks/use-toggle-state'
import { useClock } from 'hooks/useClock'

const HomePage: React.FC = () => {
  const pomo = {
    timeTotal: 1500,
    // timeTotal: 3, //4dev
    isFocusTime: true,
    isLongBreak: false
  }
  const shortBreak = {
    timeTotal: 300,
    // timeTotal: 2, //4dev
    isFocusTime: false,
    isLongBreak: false
  }
  const longBreak = {
    timeTotal: 1800,
    // timeTotal: 4, //4dev
    isFocusTime: false,
    isLongBreak: true
  }

  const [modes] = useState([
    pomo,
    shortBreak,
    pomo,
    shortBreak,
    pomo,
    longBreak
  ])

  const [step, setStep] = useState(0)
  const isFocusTime = useToggleState(false)
  const isBreakTime = useToggleState(false)
  const increasePomo = useToggleState(false)

  const newClock = useClock(modes[step].timeTotal)

  // Construye la notificacion a mostrar
  const showNotification = async (
    title: string,
    message: string,
    vibration: VibratePattern,
    status: string
  ): Promise<void> => {
    const registration = await navigator.serviceWorker.getRegistration()
    if (!registration) return
    const notifBody = message
    const notifImg = '/icons/icon-72x72.png'
    registration.showNotification(title, {
      body: notifBody,
      icon: notifImg,
      vibrate: vibration,
      tag: status
    })
    return
  }

  const nextMode = () => {
    let nextStep = step
    nextStep === 5 ? (nextStep = 0) : (nextStep += 1)
    setStep(nextStep)

    if (modes[nextStep].isFocusTime === true) {
      // Al terminar BreakTime vuelve a mostrar todas las tareas.
      isFocusTime.handleOff()
      isBreakTime.handleOff()
      showNotification(
        'Focus Time!',
        'Time to return :)',
        [100, 200, 100, 200, 100, 200, 100],
        'focus_time'
      )
      return
    } else {
      if (modes[nextStep].isLongBreak === false) {
        showNotification(
          'Break',
          'Take a little break: 5 min.',
          [500, 100, 500, 100, 500, 100, 500],
          'little_break'
        )
      } else {
        showNotification(
          'Long Break!',
          'Take a long break: 30 min.',
          [200, 100, 200, 100, 200, 100, 200],
          'long_break'
        )
      }
      // Al terminar FocusTime no muestra las tareas, solo muestra "Break"
      isFocusTime.handleOff()
      isBreakTime.handleOn()
      increasePomo.handleOn()
      return
    }
  }

  if (newClock.timeRest === -1) {
    nextMode()
  }

  const buttonPlay = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined'
      ? new Audio('/audio/button_play.mp3')
      : undefined
  )
  const buttonPause = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined'
      ? new Audio('/audio/button_pause.mp3')
      : undefined
  )

  const requestNotification = () => {
    Notification.requestPermission(function (result) {
      if (result === 'denied') {
        // TODO; Denied; Make a cool warning
        return
      } else if (result === 'default') {
        return
      }
      // TODO; Accepted;Make a cool warning
      return
    })
  }

  return (
    <PageLayout headProps={{ title: 'Pomo Do More' }}>
      <div className={clsx(style.todoList)}>
        <TaskList
          isFocusTime={isFocusTime.isOn}
          isBreakTime={isBreakTime.isOn}
          nextMode={nextMode}
          increasePomoIsOn={increasePomo.isOn}
          increasePomoHandleOff={increasePomo.handleOff}
          restartClock={newClock.restartHandler}
        />
      </div>

      <Clock
        buttonPause={buttonPause}
        restartClock={newClock.restartHandler}
        timeRest={newClock.timeRest}
      />

      <div className={style.controllerContainer}>
        <button
          onClick={() => {
            buttonPlay.current?.play()
            requestNotification()
            if (modes[step].isFocusTime === true) {
              isFocusTime.handleOn()
              isBreakTime.handleOff()
            } else {
              isFocusTime.handleOff()
              isBreakTime.handleOn()
            }
            newClock.startHandler()
          }}
          className={style.shadowController}
        >
          <div
            className={clsx(
              style.topController,
              newClock.clock && style.controllerPressed
            )}
          >
            <span className={style.textController}>START</span>
          </div>
        </button>
        <button
          onClick={() => {
            buttonPause.current?.play()
            newClock.pauseHandler()
            isFocusTime.handleOff()
          }}
          className={style.shadowController}
        >
          <div
            className={clsx(
              style.topController,
              !newClock.clock && style.controllerPressed
            )}
          >
            <span className={style.textController}>STOP</span>
          </div>
        </button>
      </div>
    </PageLayout>
  )
}

export default HomePage
