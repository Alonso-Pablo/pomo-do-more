import style from '../../css/taskList.module.css'
import { useToggleState } from 'hooks/use-toggle-state'
import clsx from 'clsx'

import React from 'react'
import List from './List'
import { arrayMove } from '../../lib/utils/utils'

const TaskList: React.FC = () => {
  const [items, setItems] = React.useState(
    Array.from(Array(8).keys()).map((val) => `Item ${val}`)
  )

  const isAddNameTask = useToggleState(false)
  const isAddEstPomo = useToggleState(false)

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

  interface Event {
    preventDefault: () => void
    target: {
      nameTask: { value: string }
      estPomo: { value: { toString: () => string } }
    }
  }

  const handleForm = (e: Event) => {
    e.preventDefault()
    const nameTask: string = e.target.nameTask.value
    const estPomo: string = e.target.estPomo.value.toString()
    const result: string[] = [nameTask, estPomo]
    // eslint-disable-next-line no-console
    console.log(result)
  }

  return (
    <>
      <div
        className={clsx(
          style.shadowAddButton,
          isAddNameTask.isOn && style.enlarging,
          isAddEstPomo.isOn && style.enlarging
        )}
      >
        <form
          onSubmit={handleForm}
          className={clsx(
            style.topAddButtom,
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
            aria-label="Enter the name of the Task"
            placeholder="What will you do today?"
            aria-required
            type="text"
            // id="nameTask"
            name="nameTask"
          />
          <input
            className={clsx(
              style.displayNone,
              isAddEstPomo.isOn && style.inputEstPomo
            )}
            aria-label="Enter estimated number of pomodoros"
            placeholder="4"
            aria-required
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
            {...props}
            className={style.item}
            style={{
              ...props.style
            }}
          >
            <div className={style.itemTopSide}>
              <button
                data-movable-handle
                className={style.grippyPart}
                style={{
                  cursor: isDragged ? 'grabbing' : 'grab'
                }}
                tabIndex={-1}
              ></button>
              <div className={style.textPart}>
                <span>{value}</span>
              </div>
              <div className={style.moreOptionsContainer}>
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
          </li>
        )}
      />
    </>
  )
}

export default TaskList
