import clsx from 'clsx'
import style from '../../css/components/breakButton.module.css'
import { BreakButtonProps } from 'ts/types'

const BreakButton: React.FC<BreakButtonProps> = ({
  isBreakTime,
  handleBreakMenuOpen,
  isBreakMenuOpen,
  nextMode,
  restartClock
}) => {
  return (
    <div
      className={clsx(style.breakTimeShadow, !isBreakTime && style.displayNone)}
    >
      <div className={style.breakTimeTopSide}>
        <div className={style.nameTaskAndMoreOptions}>
          <div className={style.textPart}>
            <span className={style.breakTimeText}>Break</span>
          </div>
          <div
            onClick={handleBreakMenuOpen}
            className={style.moreOptionsContainer}
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
            isBreakMenuOpen && style.breakMenuOptions
          )}
        >
          <button
            onClick={() => {
              restartClock(), nextMode()
            }}
            className={clsx(style.breakOptionSkip)}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

export default BreakButton
