export default interface States {
  readonly dragging: boolean,
  readonly resizing: boolean,
  readonly groupDrag: {
    x: number,
    y: number
  } | null,
  readonly groupResize: {
    percentWidth: number,
    percentHeight: number,
  } | null,
  readonly formResize: {
    percentWidth: number,
    percentHeight: number,
  } | null,
  readonly cropping: boolean,
  readonly snapElememnt: {
    top: boolean,
    left: boolean,
    right: boolean,
    bottom: boolean,
  } | null,
  readonly editingCarosel: any,
  readonly numberCarosel: number,
}
