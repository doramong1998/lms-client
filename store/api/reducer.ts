import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  uploadImage: null,
  getImages: null,
  getSection: null,
  saveSection: null,
  uploadImageUrl: null,
  accessToken: null,
  keyCreateApp: null,
  ldpId: null,
  dataLDP: null,
  saveLDP: null,
  getAllLDP: null,
  newLDPName: '',
}
const apiReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPLOAD_IMAGE:
      return {
        ...state,
        uploadImage: { ...action.payload },
      }
    case Types.UPLOAD_IMAGE_URL:
      return {
        ...state,
        uploadImageUrl: { ...action.payload },
      }
    case Types.GET_IMAGES:
      return {
        ...state,
        getImages: { ...action.payload },
      }
    case Types.SAVE_SECTION:
      return {
        ...state,
        saveSection: { ...action.payload },
      }
    case Types.GET_SECTION:
      return {
        ...state,
        getSection: { ...action.payload },
      }
    case Types.GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: { ...action.payload },
      }
    case Types.CREATE_APP:
      return {
        ...state,
        keyCreateApp: { ...action.payload },
      }
    case Types.CREATE_LDP:
      return {
        ...state,
        ldpId: { ...action.payload },
      }
    case Types.GET_DATA_LDP:
      return {
        ...state,
        dataLDP: { ...action.payload },
      }
    case Types.SAVE_LDP:
      return {
        ...state,
        saveLDP: { ...action.payload },
      }
    case Types.GET_ALL_LDP:
      return {
        ...state,
        getAllLDP: { ...action.payload },
      }
    case Types.NEW_LDP_NAME:
      return {
        ...state,
        newLDPName: action.payload,
      }
    default:
      return state
  }
}
export default apiReducer
