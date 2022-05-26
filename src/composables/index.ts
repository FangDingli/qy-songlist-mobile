import { Snackbar } from '@varlet/ui'

const appBaseUrl = import.meta.env.MODE === 'production' ? 'http://8.136.112.243:8000' : '/devServer'

export const requestData = async (url: string) => {
  const { error, data } = await useFetch(appBaseUrl + url).json()

  if (error.value) {
    Snackbar.error(data.value.status + ' ' + data.value.message)
    return
  } else {
    return data.value
  }
}