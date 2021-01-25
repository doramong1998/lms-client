import { reloadAuthorized } from './Authorized'

export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('recbook-authority') : str
  let authority
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString)
    }
  } catch (e) {
    authority = authorityString
  }
  if (typeof authority === 'string') {
    return [authority]
  }
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['']
  }
  return authority
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority
  localStorage.setItem('recbook-authority', JSON.stringify(proAuthority))
  // auto reload
  reloadAuthorized()
}
