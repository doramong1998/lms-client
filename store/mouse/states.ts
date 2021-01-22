export default interface States {
  readonly mouseMove: {
    status: boolean,
    pageX: number,
    pageY: number,
  },
  readonly mouseDown: {
    type: string,
    status: boolean,
    pageX: number,
    pageY: number,
  },
}
