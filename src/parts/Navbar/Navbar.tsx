/* eslint-disable max-len */
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import cn from 'classnames'
import s from './Navbar.module.scss'
import { getAuthorizedUserID } from '../../store/selectors/auth-selectors'

import { useAppSelector } from '../../services/hooks/useApp'

const Navbar: React.FC = () => {
  const authorizedUserID = useAppSelector(getAuthorizedUserID)
  const { pathname } = useLocation()

  const profileUrl = `/profile/${authorizedUserID}`

  const pages = [
    { name: 'Profile', to: profileUrl, svgPath: profilePath, exact: true },
    { name: 'Chat', to: '/chat', svgPath: chatPath },
    { name: 'Find Users', to: '/users', svgPath: usersPath },
    { name: 'Friends', to: '/friends', svgPath: friendsPath },
  ]

  type PageType = {
    name: string
    to: string
    svgPath: JSX.Element
    exact?: boolean
  }

  return (
    <nav className={s.nav}>
      <ul>
        {pages.map((page: PageType) => (
          <li key={page.name}>
            <NavLink
              exact={page.exact}
              to={page.to}
              activeClassName={s.active}
              className={s.navLink}
              replace
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                className={cn(s.navLinkImg, {
                  [s.activeIcon]: pathname === page.to,
                })}
              >
                {page.svgPath}
              </svg>
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const profilePath = (
  <path d='M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z' />
)

const chatPath = (
  <path d='M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z' />
)

const usersPath = (
  <path d='M15.5 12a4.48 4.48 0 013.81 6.9l3.08 3.1L21 23.39l-3.12-3.07A4.5 4.5 0 1115.5 12m0 2a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5M10 4a4 4 0 014 4c0 .91-.31 1.75-.82 2.43-.86.32-1.63.83-2.27 1.47L10 12a4 4 0 01-4-4 4 4 0 014-4M2 20v-2c0-2.12 3.31-3.86 7.5-4a6.56 6.56 0 00.5 6H2z' />
)

const friendsPath = (
  <path d='M12 5.5A3.5 3.5 0 0115.5 9a3.5 3.5 0 01-3.5 3.5A3.5 3.5 0 018.5 9 3.5 3.5 0 0112 5.5M5 8c.56 0 1.08.15 1.53.42a5.54 5.54 0 001.13 3.96A3 3 0 015 14a3 3 0 01-3-3 3 3 0 013-3m14 0a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-2.66-1.62 5.54 5.54 0 001.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9a4.04 4.04 0 00-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65 2.56.34 4.45 1.51 4.45 2.9V20z' />
)

export default Navbar
