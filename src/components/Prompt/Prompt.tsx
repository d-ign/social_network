import cn from 'classnames'
import s from './Prompt.module.scss'

type PathnameType = {
  pathname: string
}

const Prompt = {
  DeletingProfilePosts: () => {
    return (
      <aside className={cn(s.container, s.containerProfile)}>
        <span className={s.arrow} />
        <span className={s.text}>
          Click on the avatar to{' '}
          <b style={{ color: 'black' }}>delete multiple</b> posts
        </span>
      </aside>
    )
  },

  SearchUsers: (props: PathnameType) => {
    const { pathname } = props

    return (
      <aside className={cn(s.container, s.containerSearch)}>
        <span className={cn(s.arrow, s.arrowSearch)} />
        {pathname === '/users' && (
          <span className={s.text}>
            Synchronized with <b style={{ color: 'black' }}>url</b>
          </span>
        )}
        {pathname === '/friends' && (
          <span className={s.text}>
            Search with <b style={{ color: 'black' }}>debounce</b>
          </span>
        )}
      </aside>
    )
  },

  PaginationUsers: (props: PathnameType) => {
    const { pathname } = props

    return (
      <aside className={cn(s.container, s.containerPagination)}>
        <span className={cn(s.arrow, s.arrowPagination)} />
        {pathname === '/users' && (
          <span className={s.text}>
            Pagination{' '}
            <b style={{ color: 'black' }}>at the click of a button</b>
          </span>
        )}
        {pathname === '/friends' && (
          <span className={s.text}>
            <b style={{ color: 'black' }}>Dynamic</b> pagination
          </span>
        )}
      </aside>
    )
  },
}

export default Prompt
