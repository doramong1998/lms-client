export interface SectionProps {
  id?: string
  type?: string
  typeBackground?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundAttachment?: string
  backgroundOrigin?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  backgroundOpacity?: number
  backgroundColor?: string
  typeGradient?: 'linear-gradient' | 'radial-gradient'
  backgroundGradient1?: string
  backgroundGradient2?: string
  position?: number
  overlayColor?: string
  typeOverlay?: string
  className?:string
  classStyle?:string
  filter?: FilterProps
  desktop?: SectionDeviceProps
  mobile?: SectionDeviceProps
  beauty?: boolean
}

interface SectionDeviceProps {
  height?: number
  hide?: boolean
}

export interface ButtonProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  text?: string
  zIndex?: number
  transform?: Transform
  color?: string
  overlayColor?: string
  typeOverlay?: string
  fontStyle?: any
  fontWeight?: any
  textDecorationLine?: any
  textTransform?: any
  padding?: number
  lineHeight?: string
  letterSpacing?: number
  fontFamily?: string
  borderRadius?: BorderRadius
  backgroundColor?: string
  typeBackground?: string
  typeGradient?: 'linear-gradient' | 'radial-gradient'
  backgroundGradient1?: string
  backgroundGradient2?: string
  position?: number
  boxShadow?: any
  boxShadowWidth?: any
  boxShadowHeight?: any
  boxShadowOpacity?: any
  boxShadowDark?: any
  link?: LinkProps
  clickEventType?: string
  call?: string
  mail?: string
  changeSection?: string,
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: ButtonDeviceProps
  mobile?: ButtonDeviceProps
}

interface ButtonDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  fontSize?: number
  textAlign?: 'left' | 'center' | 'right'
  hide?: boolean
}

export interface HeadingProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  text?: string
  zIndex?: number
  transform?: Transform
  color?: string
  tag?: string
  fontStyle?: any
  fontWeight?: any
  textDecorationLine?: any
  textTransform?: any
  textShadow?: any
  padding?: number
  lineHeight?: string
  letterSpacing?: number
  fontFamily?: string
  link?: LinkProps
  call?: string
  mail?: string
  changeSection?: string,
  clickEventType?: string
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: HeadingDeviceProps
  mobile?: HeadingDeviceProps
}

interface HeadingDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  fontSize?: number
  textAlign?: 'left' | 'center' | 'right',
  hide?: boolean
}

export interface LineProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  zIndex?: number
  transform?: Transform
  borderWidth?: number
  borderStyle?: any
  borderColor?: string
  direction?: 'horizon' | 'vertical'
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: LineDeviceProps
  mobile?: LineDeviceProps
}

interface LineDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

export interface ParagraphProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  text?: string
  zIndex?: number
  transform?: Transform
  color?: string
  fontStyle?: any
  fontWeight?: any
  textDecorationLine?: any
  textTransform?: any
  padding?: number
  lineHeight?: string
  letterSpacing?: number
  fontFamily?: string
  link?: LinkProps
  call?: string
  mail?: string
  changeSection?: string,
  textShadow?: any
  clickEventType?: string
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: ParagraphDeviceProps
  mobile?: ParagraphDeviceProps
}

interface ParagraphDeviceProps {
  top?: number
  left?: number
  width?: number
  fontSize?: number
  height?: number
  textAlign?: 'left' | 'center' | 'right'
  hide?: boolean
}

export interface ListProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  text?: string
  zIndex?: number
  transform?: Transform
  color?: string
  fontStyle?: any
  fontWeight?: any
  padding?: number
  lineHeight?: string
  letterSpacing?: number
  fontFamily?: string
  textShadow?: any
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: ListDeviceProps
  mobile?: ListDeviceProps
}

interface ListDeviceProps {
  top?: number
  left?: number
  width?: number
  fontSize?: number
  height?: number
  textAlign?: 'left' | 'center' | 'right'
  hide?: boolean
}

export interface VideoProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  zIndex?: number
  transform?: Transform
  videoId?: string
  boxShadow?: any
  boxShadowWidth?: any
  boxShadowHeight?: any
  boxShadowOpacity?: any
  boxShadowDark?: any
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: VideoDeviceProps
  mobile?: VideoDeviceProps
}

interface VideoDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

export interface ImageProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  zIndex?: number
  transform?: Transform
  url: string
  background?: string
  overlayColor?: string
  typeOverlay?: string
  link?: LinkProps
  clickEventType?: string
  boxShadow?: any
  boxShadowWidth?: any
  boxShadowHeight?: any
  boxShadowOpacity?: any
  boxShadowDark?: any
  borderRadius?: BorderRadius
  filter?: FilterProps
  lock?: boolean
  crop?: ImageCropProps
  className?:string
  classStyle?:string
  desktop?: ImageDeviceProps
  mobile?: ImageDeviceProps
}

interface ImageDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}
interface ImageCropProps {
  top?: number
  left?: number
  width?: number
  height?: number
  crop?: boolean
}

interface LinkProps {
  url?: string
  target?: '_self' | '_blank'
}

export interface FormProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  data?: any
  zIndex?: number
  url?: string
  color?: string
  fontStyle?: any
  fontWeight?: any
  textDecorationLine?: any
  textTransform?: any
  padding?: number
  lineHeight?: string
  letterSpacing?: number
  fontFamily?: string
  typeBackground?: string
  backgroundColor?: string
  typeGradient?: 'linear-gradient' | 'radial-gradient'
  backgroundGradient1?: string
  backgroundGradient2?: string
  position?: number
  boxShadow?: any
  boxShadowWidth?: any
  boxShadowHeight?: any
  boxShadowOpacity?: any
  boxShadowDark?: any
  transform?: Transform
  borderRadius?: BorderRadius
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: FormDeviceProps
  mobile?: FormDeviceProps
}

interface FormDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
  fontSize?: number
}

interface Transform {
  opacity?: number
  perspective?: number
  rotate?: number
  rotateX?: number
  rotateY?: number
  skewX?: number
  skewY?: number
}

interface BorderRadius {
  borderAll?: number
  borderStyle?: string
  borderColor?: string
  borderWidth?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomRightRadius?: number
  borderBottomLeftRadius?: number
}

export interface ShapeProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  icon?: string
  zIndex?: number
  transform?: Transform
  color?: string
  boxShadow?: any
  boxShadowWidth?: any
  boxShadowHeight?: any
  boxShadowOpacity?: any
  boxShadowDark?: any
  link?: LinkProps
  clickEventType?: string
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: ShapeDeviceProps
  mobile?: ShapeDeviceProps
}

interface ShapeDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

export interface BoxProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  zIndex?: number
  transform?: Transform
  overlayColor?: string
  typeOverlay?: string
  borderRadius?: BorderRadius
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundAttachment?: string
  backgroundOrigin?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  backgroundOpacity?: number
  typeBackground?: string
  typeGradient?: 'linear-gradient' | 'radial-gradient'
  backgroundGradient1?: string
  backgroundGradient2?: string
  position?: number
  boxShadow?: any
  boxShadowWidth?: any
  boxShadowHeight?: any
  boxShadowOpacity?: any
  boxShadowDark?: any
  link?: LinkProps
  call?: string
  mail?: string
  changeSection?: string,
  clickEventType?: string
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: BoxDeviceProps
  mobile?: BoxDeviceProps
}

interface BoxDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

export interface CodeHtmlProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  code?: string
  zIndex?: number
  transform?: Transform
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  desktop?: CodeHtmlDeviceProps
  mobile?: CodeHtmlDeviceProps
}

interface CodeHtmlDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

export interface CaroselProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  elements?: any
  zIndex?: number
  transform?: Transform
  filter?: FilterProps
  lock?: boolean
  widthElement?: number
  className?:string
  classStyle?:string
  timeScroll?: number
  desktop?: CaroselDeviceProps
  mobile?: CaroselDeviceProps
}

interface CaroselDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

export interface GalleryProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  images?: any
  zIndex?: number
  transform?: Transform
  filter?: FilterProps
  lock?: boolean
  className?:string
  classStyle?:string
  timeScroll?: number
  thumb?:GalleryThumb
  desktop?: GalleryDeviceProps
  mobile?: GalleryDeviceProps
}

interface GalleryThumb {
  show?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  width?:number,
  height?:number,
  marginGallery?:number,
  marginThumb?:number
}

interface GalleryDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

export interface GroupProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  zIndex?: number
  element?: any
  lock?: boolean
  className: '',
  classStyle: '',
  desktop?: GroupDeviceProps
  mobile?: GroupDeviceProps
}

interface GroupDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  hide?: boolean
}

interface FilterProps {
  contrast?:number
  brightness?:number
  saturate?:number
  sepia?:number
  grayscale?:number
  invert?:number
  hueRotate?:number
  blur?:number
}

export interface CountdownProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  timeCount?: number
  zIndex?: number
  transform?: Transform
  color?: string
  overlayColor?: string
  typeOverlay?: string
  fontStyle?: any
  fontWeight?: any
  textDecorationLine?: any
  textTransform?: any
  padding?: number
  lineHeight?: string
  letterSpacing?: number
  fontFamily?: string
  borderRadius?: BorderRadius
  backgroundColor?: string
  typeBackground?: string
  typeGradient?: 'linear-gradient' | 'radial-gradient'
  backgroundGradient1?: string
  backgroundGradient2?: string
  position?: number
  boxShadow?: any
  boxShadowWidth?: any
  boxShadowHeight?: any
  boxShadowOpacity?: any
  boxShadowDark?: any
  filter?: FilterProps
  lock?: boolean
  countdown?: CountdownSettingsProps
  className?:string
  classStyle?:string
  desktop?: CountdownDeviceProps
  mobile?: CountdownDeviceProps
}
interface CountdownSettingsProps{
  showDate?: boolean
  showHour?: boolean
  showMinute?: boolean
  showSecond?: boolean
  type?: 'minute' | 'everydays' | 'overtime'
  minute?: number
  start?: string
  stop?: string
  end?: string
}
interface CountdownDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  fontSize?: number
  textAlign?: 'left' | 'center' | 'right'
  hide?: boolean
}

export interface LuckySpinProps {
  id?: string
  sectionId?: string
  groupId?: string
  caroselId?: string
  type?: string
  listPrize?: string
  message?: string
  turn?: number
  background?: string
  rotateBackground?:number
  button?: string
  zIndex?: number
  lock?: boolean
  color?: string
  fontStyle?: any
  fontWeight?: any
  textDecorationLine?: any
  textTransform?: any
  lineHeight?: string
  padding?: number
  letterSpacing?: number
  fontFamily?: string
  desktop?: LuckySpinDeviceProps
  mobile?: LuckySpinDeviceProps
}

interface LuckySpinDeviceProps {
  top?: number
  left?: number
  width?: number
  height?: number
  fontSize?: number
  textAlign?: 'left' | 'center' | 'right'
  hide?: boolean
}
