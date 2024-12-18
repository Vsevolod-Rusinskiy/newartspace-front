import { removeUserDataFromLS } from '../../lib/common'
import { getAuthDataFromLS } from '../../lib/common'
import createAxiosInstance from './axiosInstatnce'

export const refreshJwt = async () => {
  console.log('попали в функцию обновления токена', 444)
  if (!getAuthDataFromLS('auth').refreshToken) {
    // todo  если нет рефреш токена, то выходим и что делать дальше?
    return
  }
  try {
    const response = await createAxiosInstance().post(`/auth/refresh`, {
      refreshToken: getAuthDataFromLS('auth').refreshToken,
    })
    console.log(response, 'получили ответ от сервера новый токен', 555)

    if (response.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...response.data,
        })
      )
      // console.log('токен обновлен', response.data.accessToken, 666)
      // Сравниваем старый токен с новым
      if (
        getAuthDataFromLS('auth').refreshToken !== response.data.refreshToken
      ) {
        console.log('Токены отличаются, обновление прошло успешно')
      } else {
        console.log('Токены одинаковые, обновление не произошло')
      }

      return response.data.accessToken
    } else {
      removeUserDataFromLS('auth')
    }
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error)
  }
}
