import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsersThunk } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsersSelector, 
  // getUserSuperPuperSelector, 
  getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';

// UsersContainer - первая контейнерная компонента вокруг Users, отвечающая за AJAX запросы и отрисовку Users
class UsersContainer extends React.Component {

  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsersThunk(currentPage, pageSize);
  }

  // пишем через стрелочную функцию, чтобы сохранить контекст вызова, чтобы не использовать bind
  onPageChanged = (pageNumber) => {
    this.props.getUsersThunk(pageNumber, this.props.pageSize);
    this.props.setCurrentPage(pageNumber); // подсвечиваем текущую страницу
  }

  render() {
    // <> - это фрагмент, то же самое: <Fragment></Fragment> --> вместо div для доступности
    return <>
      {this.props.isFetching ? <Preloader /> : null}

      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}

        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

// функция connect передает сама в mapStateToProps state, а мы можем забыть про store
let mapStateToProps = (state) => {
  return {
    // users: getUserSuperPuperSelector(state),
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
};
// после вызова одного из методов объекта из mapDispatchToProps store изменяется и после этого перерисовывается UI (вызывается mapStateToProps и достаются оттуда свежие пропсы)
// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userID) => {
//       dispatch(followAC(userID));
//     },
//     unfollow: (userID) => {
//       dispatch(unfollowAC(userID));
//     },
//     ...
//   }
// };
// компоненте Users в качестве свойств объекта props будут переданы свойства из mapStateToProps и mapDispatchToProps. В Users мы можем обращаться к ним, как props.pageSize или props.setTotalUsersCount() и т.д.

// безымянная втроая контейнерная компонента нужна для общения со store, для прокидывания данных в первую контейнерную компоненту UsersContainer и ее отрисовку
export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsersThunk
  }),
  withAuthRedirect
)(UsersContainer)
