(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[4],{416:function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return i}));var r=function(e){return e.usersPage.users},a=function(e){return e.usersPage.pageSize},s=function(e){return e.usersPage.totalUsersCount},c=function(e){return e.usersPage.isFetching},i=function(e){return e.usersPage.followingInProgress}},417:function(e,t,n){e.exports={user:"User_user__2-MFR",wrapAvatarNameAndStatus:"User_wrapAvatarNameAndStatus__1DasO",wrapAvatar:"User_wrapAvatar__390Wy",nameAndStatus:"User_nameAndStatus__2nXq4",status:"User_status__1Fkst",button:"User_button__3q-3g"}},418:function(e,t,n){},419:function(e,t,n){"use strict";var r=n(59),a=n(60);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(n(0)),c=(0,r(n(61)).default)(s.createElement("path",{d:"M19 13H5v-2h14v2z"}),"Remove");t.default=c},420:function(e,t,n){"use strict";var r=n(59),a=n(60);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(n(0)),c=(0,r(n(61)).default)(s.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=c},421:function(e,t,n){var r=n(62),a=n(422),s=n(423),c=Math.max,i=Math.min;e.exports=function(e,t,n){var o,u,l,d,f,j,v=0,b=!1,h=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function m(t){var n=o,r=u;return o=u=void 0,v=t,d=e.apply(r,n)}function O(e){return v=e,f=setTimeout(x,t),b?m(e):d}function _(e){var n=e-j;return void 0===j||n>=t||n<0||h&&e-v>=l}function x(){var e=a();if(_(e))return w(e);f=setTimeout(x,function(e){var n=t-(e-j);return h?i(n,l-(e-v)):n}(e))}function w(e){return f=void 0,p&&o?m(e):(o=u=void 0,d)}function g(){var e=a(),n=_(e);if(o=arguments,u=this,j=e,n){if(void 0===f)return O(j);if(h)return clearTimeout(f),f=setTimeout(x,t),m(j)}return void 0===f&&(f=setTimeout(x,t)),d}return t=s(t)||0,r(n)&&(b=!!n.leading,l=(h="maxWait"in n)?c(s(n.maxWait)||0,t):l,p="trailing"in n?!!n.trailing:p),g.cancel=function(){void 0!==f&&clearTimeout(f),v=0,o=j=u=f=void 0},g.flush=function(){return void 0===f?d:w(a())},g}},422:function(e,t,n){var r=n(49);e.exports=function(){return r.Date.now()}},423:function(e,t,n){var r=n(424),a=n(62),s=n(105),c=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,o=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(s(e))return NaN;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var n=i.test(e);return n||o.test(e)?u(e.slice(2),n?2:8):c.test(e)?NaN:+e}},424:function(e,t,n){var r=n(425),a=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(a,""):e}},425:function(e,t){var n=/\s/;e.exports=function(e){for(var t=e.length;t--&&n.test(e.charAt(t)););return t}},426:function(e,t,n){e.exports={container:"Search_container__2QWKN",wrap:"Search_wrap__30375",searchIcon:"Search_searchIcon__nrD5M",searchCount:"Search_searchCount__3NOnv",search:"Search_search__2Jvrt"}},427:function(e,t,n){"use strict";var r=n(59),a=n(60);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(n(0)),c=(0,r(n(61)).default)(s.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.default=c},428:function(e,t,n){"use strict";n(0);var r=n(9),a=n(406),s=n(419),c=n.n(s),i=n(420),o=n.n(i),u=n(417),l=n.n(u),d=n(79),f=(n(418),n(1)),j=function(e){var t=e.element,n=e.children;return Object(f.jsx)("div",{"data-tooltip":t,children:n})},v=n(155),b=n(416),h=n(37);t.a=function(e){var t=e.user,n=t.id,s=t.photos,i=t.name,u=t.status,p=t.followed,m=e.theme,O=e.unfollow,_=e.follow,x={justifyContent:"flex-end",alignItems:"flex-start",flexBasis:"200px"},w=Object(r.d)(b.a),g=Object(r.d)(h.a);return Object(f.jsxs)("div",{className:l.a.user,children:[Object(f.jsxs)("div",{className:l.a.wrapAvatarNameAndStatus,children:[Object(f.jsx)("div",{className:l.a.wrapAvatar,children:Object(f.jsx)(d.a,{photo:s.large,size:"large",id:n})}),Object(f.jsxs)("div",{className:l.a.nameAndStatus,children:[(null===i||void 0===i?void 0:i.length)>19?Object(f.jsx)(j,{element:i,children:Object(f.jsx)(v.a,{id:n,name:i,size:"normal"})}):Object(f.jsx)(v.a,{id:n,name:i,size:"normal"}),(null===u||void 0===u?void 0:u.length)>19?Object(f.jsx)(j,{element:u,children:Object(f.jsx)("div",{className:l.a.status,children:u})}):Object(f.jsx)("div",{className:l.a.status,children:u})]})]}),p?Object(f.jsx)("div",{className:l.a.button,children:Object(f.jsx)(a.a,{onClick:function(){return O(n)},disabled:w.some((function(e){return e===n})),style:x,startIcon:Object(f.jsx)(c.a,{}),children:"Unfollow"})}):n===g?Object(f.jsx)(f.Fragment,{}):Object(f.jsx)("div",{className:l.a.button,children:Object(f.jsx)(a.a,{onClick:function(){return _(n)},disabled:w.some((function(e){return e===n})),color:"theme1"===m?"primary":"secondary",style:x,startIcon:Object(f.jsx)(o.a,{}),children:"Follow"})})]})}},429:function(e,t,n){"use strict";var r=n(0),a=n.n(r),s=n(421),c=n.n(s),i=n(415),o=n(427),u=n.n(o),l=n(407),d=Object(l.a)((function(e){return{search:{padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),width:"100%","&:focus":{borderRadius:"5px",backgroundColor:"#5e5e5e4d"}}}})),f=n(426),j=n.n(f),v=n(1),b=a.a.memo((function(e){var t=e.pathname,n=e.termOfUrl,r=void 0===n?"":n,a=e.searchUsers,s=e.totalUsersCount,o=d(),l=function(e){return a(e.target.value)};return Object(v.jsxs)("div",{className:j.a.container,children:[Object(v.jsxs)("div",{className:j.a.wrap,children:[Object(v.jsx)("div",{className:j.a.searchIcon,children:Object(v.jsx)(u.a,{})}),"/users"===t&&Object(v.jsx)(i.a,{placeholder:"Search by name...",inputProps:{"aria-label":"search"},classes:{input:o.search},value:r,onChange:l}),"/friends"===t&&Object(v.jsx)(i.a,{placeholder:"Search by name...",inputProps:{"aria-label":"search"},classes:{input:o.search},onInput:c()(l,600)})]}),Object(v.jsxs)("div",{className:j.a.searchCount,children:["Total: ",s.toString().replace(/(\d)(?=(\d{3})+$)/g,"$1 ")]})]})}));t.a=b},445:function(e,t,n){e.exports={wrapper:"Friends_wrapper__e3B38",container:"Friends_container__3picv",buttonLoadMore:"Friends_buttonLoadMore__3DhKd",hiddenButtonLoadMore:"Friends_hiddenButtonLoadMore__1o7lC",wrapUsers:"Friends_wrapUsers__1oitZ",lastElement:"Friends_lastElement__2-m-c"}},448:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(9),c=n(416),i=n(158),o=n(106),u=n(22),l=n(21),d=n(445),f=n.n(d),j=n(428),v=n(429),b=n(157),h=function(e,t,n,a){var s=Object(r.useRef)();Object(r.useEffect)((function(){if(!n){s.current&&s.current.disconnect();s.current=new IntersectionObserver((function(e){e[0].isIntersecting&&t&&a()})),s.current.observe(e.current)}}),[n,a,t,e])},p=n(27),m=n(159),O=n(1),_=a.a.memo((function(e){var t=e.location.pathname,n=Object(s.d)(p.b),i=Object(s.d)(c.c),l=Object(s.d)(c.e),d=Object(s.d)(c.b),_=Object(s.d)(c.d),x=Object(s.c)(),w=Math.ceil(_/i),g=Object(r.useState)(1),N=Object(u.a)(g,2),S=N[0],y=N[1];Object(r.useEffect)((function(){x(m.a.clearUsers()),y(1),x(Object(m.d)(1,"",!0)),F(!0)}),[t,x]);var U=a.a.useRef(null),M=Object(r.useState)(!1),A=Object(u.a)(M,2),C=A[0],F=A[1];return h(U,w>S,d,(function(){F(!0),y(++S),x(Object(m.d)(S,"",!0))})),Object(r.useEffect)((function(){F(!1)}),[l.length]),Object(O.jsxs)("div",{className:f.a.wrapper,children:[Object(O.jsx)(v.a,{searchUsers:function(e){y(1),x(Object(m.d)(1,e,!0))},totalUsersCount:_,pathname:t}),0===_&&!d&&Object(O.jsx)(b.a,{elements:"users",writeSomething:!1}),Object(O.jsxs)("div",{className:f.a.container,children:[Object(O.jsx)("div",{className:f.a.wrapUsers,children:l.map((function(e){return Object(O.jsx)(j.a,{user:{id:e.id,name:e.name,status:e.status,followed:e.followed,photos:e.photos},theme:n,follow:function(e){return x(Object(m.c)(e))},unfollow:function(e){return x(Object(m.e)(e))}},e.id)}))}),C&&Object(O.jsx)(o.a,{display:"block"}),!d&&Object(O.jsx)("div",{ref:U,className:f.a.lastElement})]})]})})),x=Object(l.h)(_);t.default=Object(i.a)((function(){var e=Object(s.d)(c.b);return Object(O.jsxs)(O.Fragment,{children:[e?Object(O.jsx)(o.a,{display:"default"}):null,Object(O.jsx)(x,{})]})}))}}]);
//# sourceMappingURL=4.8abfe018.chunk.js.map