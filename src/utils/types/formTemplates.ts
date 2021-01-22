export interface InputProps {
    id?: string
    formId?: string
    sectionId?: string
    zIndex?:number
    dataName?: string
    type?: string
    tag?: string
    placeholder?: string
    defaultValue?: string
    color?: string;
    fontStyle?:any;
    fontWeight?:any;
    fontFamily?:string;
    textDecorationLine?: any;
    textTransform?:any;
    fontSize?: any;
    textAlign?: any;
    padding?: number;
    lineHeight?: string;
    letterSpacing?: number;
    typeBackground?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    typeGradient?: 'linear-gradient' | 'radial-gradient';
    backgroundGradient1?: string;
    backgroundGradient2?: string;
    position?: number;
    boxShadow?: any;
    boxShadowWidth?: any;
    boxShadowHeight?: any;
    boxShadowOpacity?: any;
    boxShadowDark?: any;
    transform?: Transform;
    borderRadius?:BorderRadius;
    filter?: FilterProps
    desktop?: DeviceProps
    mobile?: DeviceProps
  }

export interface ButtonProps {
    id?: string
    formId?: string
    sectionId?: string
    tag?: string
    zIndex?:number
    type?: string
    text?: string
    color?: string
    background?: string
    fontSize?: any;
    fontStyle?: any
    fontWeight?: any
    textDecorationLine?: any
    textTransform?: any
    borderRadius?: BorderRadius
    boxShadow?: any;
    boxShadowWidth?: any;
    boxShadowHeight?: any;
    fontFamily?:string;
    boxShadowOpacity?: any;
    overlayColor?: string
    typeOverlay?: string
    boxShadowDark?: any;
    typeBackground?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    typeGradient?: 'linear-gradient' | 'radial-gradient';
    backgroundGradient1?: string
    backgroundGradient2?: string
    position?: number
    transform?: Transform
    filter?: FilterProps
    desktop?: DeviceProps
    mobile?: DeviceProps
  }

export interface CheckboxProps {
    id?: string
    formId?: string
    zIndex?:number
    sectionId?: string
    type?: string
    tag?: string
    values?: any
    color?: string;
    dataName?: string
    defaultValue?: string
    fontStyle?:any;
    fontWeight?:any;
    fontFamily?:string;
    textDecorationLine?: any;
    textTransform?:any;
    fontSize?: any;
    textAlign?: any;
    padding?: number;
    lineHeight?: string;
    letterSpacing?: number;
    typeBackground?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    typeGradient?: 'linear-gradient' | 'radial-gradient';
    backgroundGradient1?: string;
    backgroundGradient2?: string;
    position?: number;
    boxShadow?: any;
    boxShadowWidth?: any;
    boxShadowHeight?: any;
    boxShadowOpacity?: any;
    boxShadowDark?: any;
    transform?: Transform;
    filter?: FilterProps
    borderRadius?:BorderRadius;
    desktop?: DeviceProps
    mobile?: DeviceProps
  }

export interface RadioProps {
    id?: string
    formId?: string
    sectionId?: string
    zIndex?:number
    type?: string
    tag?: string
    dataName?: string
    defaultValue?: string
    values?: any
    color?: string;
    fontStyle?:any;
    fontWeight?:any;
    fontFamily?:string;
    textDecorationLine?: any;
    textTransform?:any;
    fontSize?: any;
    textAlign?: any;
    padding?: number;
    lineHeight?: string;
    letterSpacing?: number;
    typeBackground?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    typeGradient?: 'linear-gradient' | 'radial-gradient';
    backgroundGradient1?: string;
    backgroundGradient2?: string;
    position?: number;
    boxShadow?: any;
    boxShadowWidth?: any;
    boxShadowHeight?: any;
    boxShadowOpacity?: any;
    boxShadowDark?: any;
    transform?: Transform;
    filter?: FilterProps
    borderRadius?:BorderRadius;
    desktop?: DeviceProps
    mobile?: DeviceProps
  }

export interface SelectProps {
    id?: string
    formId?: string
    sectionId?: string
    zIndex?:number
    type?: string
    tag?: string
    dataName?: string
    defaultValue?: string
    values?: any
    color?: string;
    fontStyle?:any;
    fontWeight?:any;
    fontFamily?:string;
    textDecorationLine?: any;
    textTransform?:any;
    fontSize?: any;
    textAlign?: any;
    padding?: number;
    lineHeight?: string;
    letterSpacing?: number;
    typeBackground?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    typeGradient?: 'linear-gradient' | 'radial-gradient';
    backgroundGradient1?: string;
    backgroundGradient2?: string;
    position?: number;
    boxShadow?: any;
    boxShadowWidth?: any;
    boxShadowHeight?: any;
    boxShadowOpacity?: any;
    boxShadowDark?: any;
    transform?: Transform;
    filter?: FilterProps
    borderRadius?:BorderRadius;
    desktop?: DeviceProps
    mobile?: DeviceProps
  }

export interface SelectAddressProps {
    id?: string
    formId?: string
    sectionId?: string
    zIndex?:number
    type?: string
    tag?: string
    dataName?: string
    defaultValueDistrict?: string
    defaultValueCommune?: string
    defaultValueProvince?: string
    color?: string;
    fontStyle?:any;
    fontWeight?:any;
    fontFamily?:string;
    textDecorationLine?: any;
    textTransform?:any;
    fontSize?: any;
    textAlign?: any;
    padding?: number;
    lineHeight?: string;
    letterSpacing?: number;
    typeBackground?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    typeGradient?: 'linear-gradient' | 'radial-gradient';
    backgroundGradient1?: string;
    backgroundGradient2?: string;
    position?: number;
    boxShadow?: any;
    boxShadowWidth?: any;
    boxShadowHeight?: any;
    boxShadowOpacity?: any;
    boxShadowDark?: any;
    transform?: Transform;
    filter?: FilterProps
    borderRadius?:BorderRadius;
    desktop?: DeviceProps
    mobile?: DeviceProps
  }

  interface DeviceProps {
    top?: number
    left?: number
    width?: number
    height?: number
    fontSize?: number
    hide?: boolean
  }

  interface BorderRadius {
    borderAll?: number;
    borderStyle?: string;
    borderColor?: string;
    borderWidth?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomLeftRadius?: number;
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
export type FormElements = ButtonProps & InputProps & CheckboxProps & RadioProps
