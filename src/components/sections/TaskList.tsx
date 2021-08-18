import style from '../../css/components/taskList.module.css'
import { useToggleState } from 'hooks/use-toggle-state'
import clsx from 'clsx'

import { useState, useEffect } from 'react'
import List from '../common/List'
import { arrayMove } from '../../lib/utils/utils'
import { TaskListProps } from 'ts/types'
import BreakButton from 'components/primitives/BreakButton'
import AddButton from 'components/primitives/AddButton'
import { enterArrowSvg, moreOptionsSvg, cancelSvg } from 'components/common/Svg'

const TaskList: React.FC<TaskListProps> = ({
  isFocusTime,
  isBreakTime,
  nextMode,
  increasePomoIsOn,
  increasePomoHandleOff,
  restartClock
}) => {
  const [items, setItems] = useState<(string | number | boolean)[][]>([])

  useEffect(() => {
    // save or load fromlocalStorage
    if (Object.values(items).length === 0) {
      if (localStorage.items) {
        setItems(JSON.parse(localStorage.getItem('items') || '[]'))
      }
    } else {
      localStorage.setItem('items', JSON.stringify(Object.values(items)))
    }
    // increase the number of pomodoros made
    if (increasePomoIsOn && items.length > 0) {
      const newItems = items
      newItems[0][5] = Number(newItems[0][5]) + 1
      return increasePomoHandleOff()
    }
  }, [items, increasePomoIsOn, increasePomoHandleOff])

  const isBreakMenuOpen = useToggleState(false)

  const handleEditForm = (
    e: React.SyntheticEvent,
    indexItem: number,
    totaPom: number,
    isTaskFinished: boolean | string | number
  ) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      newNameTask: { value: string }
      newEstPomo: { value: string }
    }
    const newItems = items
    newItems[indexItem] = [
      target.newNameTask.value,
      Number(target.newEstPomo.value),
      false, // Task options menu
      false, // More info about the task
      false, // isEditing?
      totaPom,
      isTaskFinished
    ]
    setItems(newItems)
    return setItems(Object.values(items))
  }
  return (
    <>
      <BreakButton
        isBreakTime={isBreakTime}
        handleBreakMenuOpen={isBreakMenuOpen.handleToggle}
        isBreakMenuOpen={isBreakMenuOpen.isOn}
        nextMode={nextMode}
        restartClock={restartClock}
      />

      <AddButton
        items={items}
        setItems={setItems}
        isFocusTime={isFocusTime}
        isBreakTime={isBreakTime}
      />

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
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="20"
                    viewBox="0 0 10 20"
                    fill="none"
                  >
                    <rect y="8" width="4" height="4" rx="2" />
                    <rect y="16" width="4" height="4" rx="2" />
                    <rect width="4" height="4" rx="2" />
                    <rect x="6" y="8" width="4" height="4" rx="2" />
                    <rect x="6" y="16" width="4" height="4" rx="2" />
                    <rect x="6" width="4" height="4" rx="2" />
                  </svg>
                </button>
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
                  {value[6] ? (
                    <del>
                      <span>{value[0]}</span>
                    </del>
                  ) : (
                    <span>{value[0]}</span>
                  )}
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
                    {moreOptionsSvg()}
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  const { key = 0 } = props
                  handleEditForm(e, key, Number(value[5]), value[6])
                }}
                className={clsx(
                  style.displayNone,
                  value[4] && style.editTaskContainer
                )}
              >
                <div className={style.editTaskTop}>
                  <button
                    onClick={() => {
                      const { key = 0 } = props
                      const newItems = items
                      newItems[key][4] = false
                      setItems(newItems)
                      return setItems(Object.values(items))
                    }}
                    className={style.editCancel}
                    type="button"
                  >
                    {cancelSvg()}
                  </button>
                  <input
                    defaultValue={value[0].toString()}
                    className={style.editNameTask}
                    aria-label="new task name"
                    name="newNameTask"
                    type="text"
                  />
                  <div className={style.moreOptionsDisabled}>
                    {moreOptionsSvg()}
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
                      {enterArrowSvg()}
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
                  onClick={() => {
                    const { key = 0 } = props
                    const newItems = items
                    newItems[key][6] = !newItems[key][6]
                    setItems(newItems)
                    return setItems(Object.values(items))
                  }}
                  className={clsx(style.optionButtons, style.separatedButton)}
                >
                  {value[6] ? 'Undone' : 'Done'}
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
