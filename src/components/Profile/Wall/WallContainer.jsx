import { connect } from 'react-redux';
import { addPost } from '../../../redux/profile-reducer';
import Wall from './Wall';

// class WallContainer extends React.Component {

// componentDidMount() {
// this.props.getUsersCreator(this.props.currentPage, this.props.pageSize);
// }

// пишем через стрелочную функцию, чтобы сохранить контекст вызова, чтобы не использовать bind
// onPageChanged = (pageNumber) => {
//   this.props.getUsersCreator(pageNumber, this.props.pageSize);
//   this.props.setCurrentPage(pageNumber);
// }

//   render() {
//     return <>
//       {this.props.isFetching ? <Preloader /> : null}

//       <Wall
//         totalUsersCount={this.props.totalUsersCount}
//         pageSize={this.props.pageSize}
//         currentPage={this.props.currentPage}
//         onPageChanged={this.onPageChanged}
//         users={this.props.users}

//         follow={this.props.follow}
//         unfollow={this.props.unfollow}
//         followingInProgress={this.props.followingInProgress}
//       />
//     </>
//   }
// }


// эта функция запускается при каждом изменнеии, создается новый объект и затем сравнивается со старым объектом. если бы мы не делали копию объекта в reducer, то ничего бы не перерисовывалось
let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  }
};

// перерисовка происходит после обнаружения, что появился новый объект. А он создастся после изменений, т.к. мы придерживаемся иммутабельности и старые объекты не меняем
export default connect(mapStateToProps, {
  addPost
})(Wall);