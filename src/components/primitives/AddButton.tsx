import { useToggleState } from 'hooks/use-toggle-state'
import clsx from 'clsx'
import { AddButtonProps } from 'ts/types'
import style from '../../css/components/addButton.module.css'
import { cancelSvg, enterArrowSvg } from '../common/Svg'

const AddButton: React.FC<AddButtonProps> = ({
  items,
  setItems,
  isFocusTime,
  isBreakTime
}) => {
  const isAddingNameTask = useToggleState(false)
  const isAddingEstPomo = useToggleState(false)

  const handleCancelButton = () => {
    if (isAddingNameTask.isOn === false) {
      isAddingNameTask.handleOn()
      isAddingEstPomo.handleOff()
      return
    }
    isAddingNameTask.handleOff()
    isAddingEstPomo.handleOff()
    return
  }

  const handleEnterbutton = () => {
    if (isAddingNameTask.isOn) {
      isAddingNameTask.handleOff()
      isAddingEstPomo.handleOn()
      return
    }
    isAddingNameTask.handleOff()
    isAddingEstPomo.handleOff()
    return
  }

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
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
      0, // total Pomos
      false // The Task is finished
    ]
    const defaultPomos = 4
    if (taskInfo[0] === '') return false // If task don't have a name, return false
    if (taskInfo[1] === '') taskInfo[1] = defaultPomos // Default Estimated Pomodoros
    setItems(() => [...items, taskInfo])
  }
  return (
    <div
      className={clsx(
        style.shadowAddButton,
        isAddingNameTask.isOn && style.enlarging,
        isAddingEstPomo.isOn && style.enlarging,
        isFocusTime && style.displayNone,
        isBreakTime && style.displayNone,
        items.length && style.marginAddButton
      )}
    >
      <form
        onSubmit={handleForm}
        className={clsx(
          style.topAddBottom,
          isAddingNameTask.isOn && style.enlarging,
          isAddingEstPomo.isOn && style.enlarging
        )}
      >
        <button
          tabIndex={0}
          className={clsx(
            style.addButton,
            isAddingNameTask.isOn && style.cancelButton,
            isAddingEstPomo.isOn && style.cancelButton,

            !isAddingNameTask.isOn && style.svgNoRotated,
            isAddingNameTask.isOn && style.svgRotated,
            isAddingEstPomo.isOn && style.svgRotated
          )}
          onClick={handleCancelButton}
          type="reset"
        >
          {cancelSvg()}
        </button>
        <label
          className={clsx(
            style.labelEstPomo,
            !isAddingEstPomo.isOn && style.displayNone
          )}
          htmlFor="estPomo"
        >
          Est. pomodoros:
        </label>
        <input
          className={clsx(
            style.displayNone,
            isAddingNameTask.isOn && style.inputTitleTask
          )}
          aria-label="enter the name of the Task"
          placeholder="What will you do today?"
          name="nameTask"
          type="text"
        />
        <input
          className={clsx(
            style.displayNone,
            isAddingEstPomo.isOn && style.inputEstPomo
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
            isAddingNameTask.isOn && style.enterButton,
            isAddingEstPomo.isOn && style.enterButton
          )}
          onClick={handleEnterbutton}
          type={!isAddingEstPomo.isOn ? 'submit' : 'button'}
        >
          <div className={clsx(style.enterTopButton)}>{enterArrowSvg()}</div>
        </button>
      </form>
    </div>
  )
}

export default AddButton
