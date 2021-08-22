import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useQueryUrl = (termOfUrl: string, setTermOfUrl: any, pathname: any) => {
  const history = useHistory()

  // если есть, достаём из URL term
  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as {
      term: string
    } // substr(1) = удаление ? в начале

    if (parsed.term) {
      setTermOfUrl(parsed.term)
    }
  }, [history.location.search, pathname, setTermOfUrl])

  // пуш введённого из поиска в URL
  useEffect(() => {
    history.replace({
      pathname: '/users',
      search: termOfUrl ? `?term=${termOfUrl}` : '',
    })
  }, [termOfUrl, history, pathname])
}
export default useQueryUrl
