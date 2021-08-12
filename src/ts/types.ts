// Here will go general types you define

import { Dispatch, SetStateAction } from 'react'

export type Test = { key: string }
export interface ClockProps {
  stopClock: () => void
  stopFocusTime: () => void
  initialMinutes: number
  initialSeconds: number
  setMinutes: Dispatch<SetStateAction<number>>
  setSeconds: Dispatch<SetStateAction<number>>
  minutes: number
  seconds: number
}
export interface TaskListProps {
  isFocusTime: boolean
  isBreakTime: boolean
  nextMode: () => void
  increasePomoIsOn: boolean
  increasePomoHandleOff: () => void
}
interface IVoiceover {
  item: (position: number) => string
  lifted: (position: number) => string
  dropped: (from: number, to: number) => string
  moved: (position: number, up: boolean) => string
  canceled: (position: number) => string
}

export interface IItemProps {
  key?: number
  tabIndex?: number
  'aria-roledescription'?: string
  onKeyDown?: (e: React.KeyboardEvent) => void
  onWheel?: (e: React.WheelEvent) => void
  style?: React.CSSProperties
  ref?: React.RefObject<any>
}

export interface RenderItemParams<Value> {
  value: Value
  props: IItemProps
  index?: number
  isDragged: boolean
  isSelected: boolean
  isOutOfBounds: boolean
}

export interface RenderListParams {
  children: React.ReactNode
  isDragged: boolean
  props: {
    ref: React.RefObject<any>
  }
}

export interface BeforeDragParams {
  elements: Element[]
  index: number
}

export interface OnChangeMeta {
  oldIndex: number
  newIndex: number
  targetRect: ClientRect
}

export interface IProps<Value> {
  beforeDrag?: (params: BeforeDragParams) => void
  renderItem: (params: RenderItemParams<Value>) => React.ReactNode
  renderList: (props: RenderListParams) => React.ReactNode
  values: Value[]
  onChange: (meta: OnChangeMeta) => void
  transitionDuration: number
  removableByMove: boolean
  lockVertically: boolean
  voiceover: IVoiceover
  container?: Element | null
}

export type TEvent = React.MouseEvent | React.TouchEvent | React.KeyboardEvent
