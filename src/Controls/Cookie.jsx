import jsCookie from 'js-cookie'
export const setCookie = (name, usname) => {
  jsCookie.set(name, usname, {
    expires: 1,
    secure: true,
    sameSite: 'strict',
    path: '/',
  })
}
