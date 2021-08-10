import PageLayout from 'components/layout/page'
import Container from 'components/layout/container'
import { useEffect, useState } from 'react'
import style from '../css/index.module.css'
import { useToggleState } from 'hooks/use-toggle-state'
import TaskList from '../components/common/TaskList'
import clsx from 'clsx'

const HomePage: React.FC = () => {
  const pomo = {
    // eslint-disable-next-line prettier/prettier
    'minutes': 25, // 25
    // eslint-disable-next-line prettier/prettier
    'seconds': 0,
    // eslint-disable-next-line prettier/prettier
    'isFocusTime': true,
    // eslint-disable-next-line prettier/prettier
    'isBreakTime': false
  }
  const shortBreak = {
    // eslint-disable-next-line prettier/prettier
    'minutes': 5, // 5
    // eslint-disable-next-line prettier/prettier
    'seconds': 0,
    // eslint-disable-next-line prettier/prettier
    'isFocusTime': false,
    // eslint-disable-next-line prettier/prettier
    'isBreakTime': true
  }
  const longBreak = {
    // eslint-disable-next-line prettier/prettier
    'minutes': 30,
    // eslint-disable-next-line prettier/prettier
    'seconds': 0,
    // eslint-disable-next-line prettier/prettier
    'isFocusTime': false,
    // eslint-disable-next-line prettier/prettier
    'isBreakTime': true
  }

  const [technique] = useState([
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

  const isClockTiming = useToggleState(false)
  const oneDigitNumb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [minutes, setMinutes] = useState(technique[step].minutes)
  const [seconds, setSeconds] = useState(technique[step].seconds)

  const nextMode = () => {
    let newStep = step
    newStep === 5 ? (newStep = 0) : (newStep += 1)
    setStep(newStep)
    setMinutes(technique[newStep].minutes)
    setSeconds(technique[newStep].seconds)

    if (technique[newStep].isFocusTime === true) {
      // Al terminar BreakTime vuelve a mostrar todas las tareas.
      isFocusTime.handleOff()
      isBreakTime.handleOff()
    } else {
      // Al terminar FocusTime no muestra las tareas, solo muestra "Break"
      isFocusTime.handleOff()
      isBreakTime.handleOn()
    }
  }

  const ticToc = () =>
    setTimeout(() => {
      if (minutes > 0) {
        if (seconds > 0) {
          return setSeconds(seconds - 1)
        }
        setSeconds(59)
        return setMinutes(minutes - 1)
      }
      if (seconds > 0) {
        return setSeconds(seconds - 1)
      } // if 00:00 => Ejecuta:
      isClockTiming.handleOff()
      nextMode()
    }, 1000)

  useEffect(() => {
    if (isClockTiming.isOn) {
      if (technique[step].isFocusTime === true) {
        isFocusTime.handleOn()
        isBreakTime.handleOff()
      } else {
        isFocusTime.handleOff()
        isBreakTime.handleOn()
      }
      ticToc()
    } else {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClockTiming, isFocusTime, isBreakTime, step, nextMode])

  return (
    <PageLayout headProps={{ title: 'Pomo For Do More | Alonso Pablo' }}>
      <Container
        className={clsx(
          style.todoList
          // isFocusTime.isOn && style.todoListFocus
        )}
      >
        <TaskList
          isFocusTime={isFocusTime.isOn}
          isBreakTime={isBreakTime.isOn}
          // isClockTiming={isClockTiming}
          nextMode={nextMode}
        />
      </Container>

      <div className={style.clockShadow}>
        <Container className={style.clock}>
          <p className={style.timer}>
            {oneDigitNumb.includes(minutes) ? 0 : null}
            {minutes}:{oneDigitNumb.includes(seconds) ? 0 : null}
            {seconds}
          </p>
        </Container>
      </div>

      <div className={style.controllerContainer}>
        <button
          onClick={isClockTiming.handleOn}
          className={style.shadowController}
        >
          <div
            className={clsx(
              style.topController,
              isClockTiming.isOn && style.controllerPressed
            )}
          >
            <span className={style.textController}>START</span>
          </div>
        </button>

        <button
          onClick={() => {
            // Stops all modes to display the task list
            isClockTiming.handleOff()
            isFocusTime.handleOff()
          }}
          className={style.shadowController}
        >
          <div
            className={clsx(
              style.topController,
              !isClockTiming.isOn && style.controllerPressed
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
