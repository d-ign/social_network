import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'

const useQueryUrl = (pathname: string) => {
  const history = useHistory()
  const [termOfUrl, setTermOfUrl] = useState('')

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
      pathname,
      search: termOfUrl ? `?term=${termOfUrl}` : '',
    })
  }, [termOfUrl, history, pathname])

  return { termOfUrl, setTermOfUrl }
}

export default useQueryUrl
