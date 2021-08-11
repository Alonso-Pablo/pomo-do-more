import style from '../../css/taskList.module.css'
import { useToggleState } from 'hooks/use-toggle-state'
import clsx from 'clsx'

import { useState, useEffect } from 'react'
import List from './List'
import { arrayMove } from '../../lib/utils/utils'

interface InterfaceProps {
  isFocusTime: boolean
  isBreakTime: boolean
  nextMode: () => void
}

const TaskList: React.FC<InterfaceProps> = ({
  isFocusTime,
  isBreakTime,
  nextMode
}) => {
  const [items, setItems] = useState<(string | number | boolean)[][]>([]) //4Prod

  useEffect(() => {
    // localStorage
    if (Object.values(items).length === 0) {
      if (localStorage.items) {
        setItems(JSON.parse(localStorage.getItem('items') || '[]'))
      }
    } else {
      localStorage.setItem('items', JSON.stringify(Object.values(items)))
    }
  }, [items])

  const isAddNameTask = useToggleState(false)
  const isAddEstPomo = useToggleState(false)
  const isBreakMenuOpen = useToggleState(false)

  const handleAddCancelButton = () => {
    if (isAddNameTask.isOn === false) {
      isAddNameTask.handleOn()
      isAddEstPomo.handleOff()
      return
    }
    isAddNameTask.handleOff()
    isAddEstPomo.handleOff()
    return
  }

  const handleEnterbutton = () => {
    if (isAddNameTask.isOn) {
      isAddNameTask.handleOff()
      isAddEstPomo.handleOn()
      return
    }
    isAddNameTask.handleOff()
    isAddEstPomo.handleOff()
    return
  }

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const defaultPomos = 4
    const target = e.target as typeof e.target & {
      nameTask: { value: string }
      estPomo: { value: number }
    }
    const taskInfo = [
      target.nameTask.value,
      target.estPomo.value,
      false, // Task options menu
      false, // More info about the task
      false, // isEditing?
      0 // total Pomos
    ]
    if (taskInfo[0] === '') return false // If task don't have a name, return false
    if (taskInfo[1] === '') taskInfo[1] = defaultPomos // Default Estimated Pomodoros
    setItems(() => [...items, taskInfo])
  }

  const handleEditForm = (
    e: React.SyntheticEvent,
    indexItem: number,
    totaPom: number
  ) => {
    e.preventDefault()
    const compensationIndex = 1
    const target = e.target as typeof e.target & {
      newNameTask: { value: string }
      newEstPomo: { value: string }
    }
    const newItems = items
    newItems[indexItem - compensationIndex] = [
      target.newNameTask.value,
      Number(target.newEstPomo.value),
      false, // Task options menu
      false, // More info about the task
      false, // isEditing?
      totaPom
    ]
    setItems(newItems)
    return setItems(Object.values(items))
  }

  return (
    <>
      <div
        className={clsx(
          style.breakTimeShadow,
          !isBreakTime && style.displayNone
        )}
      >
        <div className={clsx(style.breakTimeTopSide)}>
          <div className={style.nameTaskAndMoreOptions}>
            <div className={style.textPart}>
              <span className={style.breakTimeText}>Break</span>
            </div>
            <div
              onClick={isBreakMenuOpen.handleToggle}
              className={clsx(style.moreOptionsContainer)}
            >
              <button className={style.moreOptions}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="20"
                  viewBox="0 0 4 20"
                  fill="none"
                >
                  <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
                  <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
                  <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
                  <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
                  <rect fill="#C1C1C1" width="4" height="4" rx="2" />
                  <rect fill="#C1C1C1" width="4" height="4" rx="2" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={clsx(
              style.displayNone,
              isBreakMenuOpen.isOn && style.menuOptions
            )}
          >
            <button
              onClick={nextMode}
              className={clsx(style.optionButtons, style.separatedButton)}
            >
              Skip
            </button>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          style.shadowAddButton,
          isAddNameTask.isOn && style.enlarging,
          isAddEstPomo.isOn && style.enlarging,
          isFocusTime && style.displayNone,
          isBreakTime && style.displayNone,
          items.length && style.marginAddButton
        )}
      >
        <form
          onSubmit={handleForm}
          className={clsx(
            style.topAddBottom,
            isAddNameTask.isOn && style.enlarging,
            isAddEstPomo.isOn && style.enlarging
          )}
        >
          <button
            tabIndex={0}
            className={clsx(
              style.addButton,
              isAddNameTask.isOn && style.cancelButton,
              isAddEstPomo.isOn && style.cancelButton
            )}
            onClick={handleAddCancelButton}
            type="reset"
          >
            <svg
              className={clsx(
                !isAddNameTask.isOn && style.svgNoRotated,
                isAddNameTask.isOn && style.svgRotated,
                isAddEstPomo.isOn && style.svgRotated
              )}
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <rect x="4" width="2" height="10" rx="1" fill="#D35A44" />
              <rect
                x="10"
                y="4"
                width="2"
                height="10"
                rx="1"
                transform="rotate(90 10 4)"
                fill="#D35A44"
              />
            </svg>
          </button>
          <label
            className={clsx(
              style.labelEstPomo,
              !isAddEstPomo.isOn && style.displayNone
            )}
            htmlFor="estPomo"
          >
            Est. pomodoros:
          </label>
          <input
            className={clsx(
              style.displayNone,
              isAddNameTask.isOn && style.inputTitleTask
            )}
            aria-label="enter the name of the Task"
            placeholder="What will you do today?"
            name="nameTask"
            type="text"
          />
          <input
            className={clsx(
              style.displayNone,
              isAddEstPomo.isOn && style.inputEstPomo
            )}
            aria-label="enter estimated number of pomodoros"
            placeholder="4"
            type="number"
            name="estPomo"
            max="99"
            min="1"
          />

          <button
            className={clsx(
              style.displayNone,
              isAddNameTask.isOn && style.enterButton,
              isAddEstPomo.isOn && style.enterButton
            )}
            onClick={handleEnterbutton}
            type={!isAddEstPomo.isOn ? 'submit' : 'button'}
          >
            <div className={clsx(style.enterTopButton)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
              >
                <path
                  d="M8.99997 1C8.99997 0.447715 9.44768 0 9.99997 0C10.5523 0 11 0.447715 11 1V9C11 9.55228 10.5523 10 9.99997 10C9.44768 10 8.99997 9.55229 8.99997 9V1Z"
                  fill="white"
                />
                <path
                  d="M9.99997 8C10.5523 8 11 8.44772 11 9C11 9.55229 10.5523 10 9.99997 10L1.99997 10C1.44769 10 0.999969 9.55228 0.999969 9C0.999969 8.44771 1.44769 8 1.99997 8L9.99997 8Z"
                  fill="white"
                />
                <rect
                  x="2"
                  y="10.4"
                  width="2"
                  height="4"
                  rx="1"
                  transform="rotate(-135 2 10.4)"
                  fill="white"
                />
                <rect
                  x="0.600006"
                  y="9"
                  width="2"
                  height="4"
                  rx="1"
                  transform="rotate(-45 0.600006 9)"
                  fill="white"
                />
              </svg>
            </div>
          </button>
        </form>
      </div>

      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <ul {...props} className={style.taskList}>
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged }) => (
          <li
            key={props.key}
            {...props}
            style={{
              ...props.style
            }}
            className={clsx(
              style.itemShadow,
              isFocusTime && props.key !== 0 && style.displayNone,
              isBreakTime && style.displayNone
            )}
          >
            <div className={clsx(style.itemTopSide)}>
              <div
                className={clsx(
                  style.displayNone,
                  !value[4] && style.nameTaskAndMoreOptions
                )}
              >
                <button
                  data-movable-handle
                  className={clsx(
                    style.grippyPart,
                    isFocusTime && style.visibilityidden
                  )}
                  style={{
                    cursor: isDragged ? 'grabbing' : 'grab'
                  }}
                  tabIndex={-1}
                ></button>
                <div
                  onClick={() => {
                    const { key = 0 } = props
                    const newItems = items
                    newItems[key][3] = !newItems[key][3]
                    setItems(newItems)
                    return setItems(Object.values(items))
                  }}
                  className={style.textPart}
                >
                  <span>{value[0]}</span>
                </div>
                <div
                  onClick={() => {
                    const { key = 0 } = props
                    const newItems = items
                    newItems[key][2] = !newItems[key][2]
                    setItems(newItems)
                    return setItems(Object.values(items))
                  }}
                  className={clsx(
                    style.moreOptionsContainer,
                    isFocusTime && style.visibilityidden
                  )}
                >
                  <button className={style.moreOptions}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="20"
                      viewBox="0 0 4 20"
                      fill="none"
                    >
                      <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" width="4" height="4" rx="2" />
                    </svg>
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) =>
                  handleEditForm(e, (props.key = 1), Number(value[5]))
                }
                className={clsx(
                  style.displayNone,
                  value[4] && style.editTaskContainer
                )}
              >
                <div className={style.editTaskTop}>
                  <button className={style.editCancel}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <rect x="4" width="2" height="10" rx="1" fill="#D35A44" />
                      <rect
                        x="10"
                        y="4"
                        width="2"
                        height="10"
                        rx="1"
                        transform="rotate(90 10 4)"
                        fill="#D35A44"
                      />
                    </svg>
                  </button>
                  <input
                    defaultValue={value[0].toString()}
                    className={style.editNameTask}
                    aria-label="new task name"
                    name="newNameTask"
                    type="text"
                  />
                  <div className={style.moreOptionsDisabled}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="20"
                      viewBox="0 0 4 20"
                      fill="none"
                    >
                      <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" width="4" height="4" rx="2" />
                      <rect fill="#C1C1C1" width="4" height="4" rx="2" />
                    </svg>
                  </div>
                </div>
                <div className={style.editTaskBottom}>
                  <p className={style.editTaskText}>Est. Pomodoros:</p>
                  <input
                    aria-label="new estimated pomodoros"
                    defaultValue={Number(value[1])}
                    className={style.editEstPomo}
                    name="newEstPomo"
                    type="number"
                    max="99"
                    min="1"
                  />
                  <button className={style.enterButton} type="submit">
                    <div className={style.enterTopButton}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none"
                      >
                        <path
                          d="M8.99997 1C8.99997 0.447715 9.44768 0 9.99997 0C10.5523 0 11 0.447715 11 1V9C11 9.55228 10.5523 10 9.99997 10C9.44768 10 8.99997 9.55229 8.99997 9V1Z"
                          fill="white"
                        />
                        <path
                          d="M9.99997 8C10.5523 8 11 8.44772 11 9C11 9.55229 10.5523 10 9.99997 10L1.99997 10C1.44769 10 0.999969 9.55228 0.999969 9C0.999969 8.44771 1.44769 8 1.99997 8L9.99997 8Z"
                          fill="white"
                        />
                        <rect
                          x="2"
                          y="10.4"
                          width="2"
                          height="4"
                          rx="1"
                          transform="rotate(-135 2 10.4)"
                          fill="white"
                        />
                        <rect
                          x="0.600006"
                          y="9"
                          width="2"
                          height="4"
                          rx="1"
                          transform="rotate(-45 0.600006 9)"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </form>

              <div
                className={clsx(
                  style.displayNone,
                  value[3] && style.moreInformationContainer
                )}
              >
                <div className={style.moreInformation}>
                  <p>Pomodoros: {value[5]}</p>
                  <p>Estimated: {value[1]}</p>
                </div>
              </div>

              <div
                className={clsx(
                  style.displayNone,
                  value[2] && style.menuOptions
                )}
              >
                <button
                  className={clsx(style.optionButtons, style.separatedButton)}
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    const { key = 0 } = props
                    const newItems = items
                    newItems[key][4] = !newItems[key][4]
                    newItems[key][2] = false
                    setItems(newItems)
                    return setItems(Object.values(items))
                  }}
                  className={clsx(style.optionButtons, style.separatedButton)}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    const { key = 0 } = props
                    const newItems = items
                    newItems.splice(key, 1)
                    setItems(newItems)
                    setItems(Object.values(items))
                    if (items.length === 0) {
                      return localStorage.removeItem('items')
                    }
                    return
                  }}
                  className={style.optionButtons}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        )}
      />
    </>
  )
}

export default TaskList
