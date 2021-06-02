import React, { useState } from 'react';
import s from './Users.module.css'; // это модульные стили, есть еще style component
import unknown from './../../img/no_photo.png';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';



const Pagination = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10 }) => {

  // или count of pages - количество страниц
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  // portionCount - кол-во порций (каждая порция по 10 страниц)
  const portionCount = Math.ceil(pagesCount / portionSize);
  // portionNumber - номер порции
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;

  return <>
    {portionNumber > 1 &&
      <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
      .map(p => {
        return <span 
        className={cn({[s.selectedPage]: currentPage === p}, s.pageNumber)} 
        key={p}
        onClick={() => { onPageChanged(p) }}>{p}</span>
      })}

    {portionCount > portionNumber &&
      <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
  </>
}




const Users = (props) => {

  return <>
    <Pagination
      totalUsersCount={props.totalUsersCount}
      pageSize={props.pageSize}
      currentPage={props.currentPage}
      onPageChanged={props.onPageChanged}
    />

    { props.users.map(u =>
      <div key={u.id} className={s.container}>

        <div className={s.column_avatar}>
          <NavLink to={'/profile/' + u.id}>
            <img src={u.photos.small !== null ? u.photos.small : unknown} alt="I" />
          </NavLink>
          {/* some проверяет условие и возвращает true/ false */}
          {u.followed
            ? <button disabled={props.followingInProgress.some(id => id === u.id)}
              onClick={() => { props.unfollow(u.id) }}>Unfollow</button>

            : <button disabled={props.followingInProgress.some(id => id === u.id)}
              onClick={() => { props.follow(u.id) }}>Follow</button>}
        </div>

        <div className={s.column_data}>
          <span>{u.name}</span>
          <span>{u.status}</span>
          <span>{'u.location.city'}</span>
          <span>{'u.location.country'}</span>
        </div>

      </div>
    )
    }
  </>
}

export default Users;