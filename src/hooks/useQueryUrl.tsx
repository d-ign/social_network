import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'

const useQueryUrl = (pathname: string) => {
  const history = useHistory()
  const [termOfUrl, setTermOfUrl] = useState('')

  // get from URL term, if present
  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as {
      term: string
    } // substr(1) = delete ? at the beginning

    if (parsed.term) {
      setTermOfUrl(parsed.term)
    }
  }, [history.location.search, pathname, setTermOfUrl])

  // push entered from search into URL
  useEffect(() => {
    history.replace({
      pathname,
      search: termOfUrl ? `?term=${termOfUrl}` : '',
    })
  }, [termOfUrl, history, pathname])

  return { termOfUrl, setTermOfUrl }
}

export default useQueryUrl
