(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[4],{411:function(e,s,t){"use strict";var r=t(47),n=t(48);Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var o=n(t(0)),a=(0,r(t(49)).default)(o.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");s.default=a},413:function(e,s,t){"use strict";t.r(s);var r=t(57),n=t(79),o=t(60),a=t(58),u=t(0),i=t.n(u),l=t(19),c=t(16),g=t(72),p=function(e){return e.usersPage.users},h=function(e){return e.usersPage.pageSize},d=function(e){return e.usersPage.totalUsersCount},f=function(e){return e.usersPage.currentPage},j=function(e){return e.usersPage.isFetching},P=function(e){return e.usersPage.followingInProgress},U=t(95),b=t(183),w=t(187),O=t(102),v=t.n(O),C=t(401),m=t(411),x=t.n(m),z=t(1),F=function(e){var s=Object(u.useState)(1),t=Object(U.a)(s,2),r=t[0],n=t[1];return Object(z.jsxs)("div",{className:v.a.wrapper,children:[Object(z.jsx)(w.a,{onPageChanged:function(s,t){e.getFoundUsers(s,e.pageSize,t)},totalUsersCount:e.totalUsersCount}),0===e.totalUsersCount&&!e.isFetching&&Object(z.jsx)("div",{className:v.a.nothingFound,children:"Nothing found"}),Object(z.jsxs)("div",{className:v.a.container,children:[(e.users.length>0?e.users:e.foundUsers).map((function(s){return Object(z.jsx)("div",{className:v.a.user,children:Object(z.jsx)(b.a,{id:s.id,photo:s.photos.small,name:s.name,status:s.status,followed:s.followed,unfollow:e.unfollow,follow:e.follow,followingInProgress:e.followingInProgress,authorizedUserID:e.authorizedUserID})},s.id)})),Object(z.jsx)("div",{className:v.a.buttonLoadMore,children:Object(z.jsx)(C.a,{"aria-label":"load more users",onClick:function(){n(++r),e.onPageChanged(r,"")},children:Object(z.jsx)(x.a,{})})})]})]})},I=t(59),k=t(149),S=function(e){Object(o.a)(t,e);var s=Object(a.a)(t);function t(){var e;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=s.call.apply(s,[this].concat(o))).onPageChanged=function(s,t){e.props.getUsers(s,e.props.pageSize,t),e.props.setCurrentPage(s)},e}return Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,s=e.currentPage,t=e.pageSize;this.props.getUsers(s,t,"")}},{key:"componentWillUnmount",value:function(){this.props.clearUsers(),this.props.setCurrentPage(1)}},{key:"render",value:function(){return Object(z.jsxs)(z.Fragment,{children:[this.props.isFetching?Object(z.jsx)(I.a,{}):null,Object(z.jsx)(F,{totalUsersCount:this.props.totalUsersCount,isFetching:this.props.isFetching,currentPage:this.props.currentPage,pageSize:this.props.pageSize,onPageChanged:this.onPageChanged,users:this.props.users,foundUsers:this.props.foundUsers,follow:this.props.follow,unfollow:this.props.unfollow,followingInProgress:this.props.followingInProgress,authorizedUserID:this.props.authorizedUserID,getFoundUsers:this.props.getFoundUsers})]})}}]),t}(i.a.Component);s.default=Object(c.d)(Object(l.b)((function(e){return{users:p(e),foundUsers:e.usersPage.foundUsers,pageSize:h(e),totalUsersCount:d(e),currentPage:f(e),isFetching:j(e),followingInProgress:P(e),authorizedUserID:e.auth.userID}}),{follow:g.c,unfollow:g.i,setCurrentPage:g.g,toggleFollowingProgress:g.h,getUsers:g.f,clearUsers:g.a,getFoundUsers:g.d}),k.a)(S)}}]);
//# sourceMappingURL=4.65419db3.chunk.js.map