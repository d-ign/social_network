(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[4],{416:function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return c})),n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return i}));var r=function(e){return e.usersPage.users},a=function(e){return e.usersPage.pageSize},c=function(e){return e.usersPage.totalUsersCount},s=function(e){return e.usersPage.isFetching},i=function(e){return e.usersPage.followingInProgress}},417:function(e,t,n){"use strict";var r=n(22),a=n(0);t.a=function(){var e=Object(a.useState)(window.innerWidth),t=Object(r.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){var e=function(){return c(window.innerWidth)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[n,c]),n}},418:function(e,t,n){e.exports={user:"User_user__2-MFR",wrapAvatarNameAndStatus:"User_wrapAvatarNameAndStatus__1DasO",wrapAvatar:"User_wrapAvatar__390Wy",nameAndStatus:"User_nameAndStatus__2nXq4",wrapName:"User_wrapName__1IOhj",status:"User_status__1Fkst"}},419:function(e,t,n){"use strict";var r=n(58),a=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(0)),s=(0,r(n(60)).default)(c.createElement("path",{d:"M19 13H5v-2h14v2z"}),"Remove");t.default=s},420:function(e,t,n){"use strict";var r=n(58),a=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(0)),s=(0,r(n(60)).default)(c.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=s},421:function(e,t,n){},422:function(e,t,n){var r=n(61),a=n(423),c=n(424),s=Math.max,i=Math.min;e.exports=function(e,t,n){var u,o,l,d,j,f,b=0,O=!1,h=!1,m=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function v(t){var n=u,r=o;return u=o=void 0,b=t,d=e.apply(r,n)}function p(e){return b=e,j=setTimeout(_,t),O?v(e):d}function x(e){var n=e-f;return void 0===f||n>=t||n<0||h&&e-b>=l}function _(){var e=a();if(x(e))return w(e);j=setTimeout(_,function(e){var n=t-(e-f);return h?i(n,l-(e-b)):n}(e))}function w(e){return j=void 0,m&&u?v(e):(u=o=void 0,d)}function g(){var e=a(),n=x(e);if(u=arguments,o=this,f=e,n){if(void 0===j)return p(f);if(h)return clearTimeout(j),j=setTimeout(_,t),v(f)}return void 0===j&&(j=setTimeout(_,t)),d}return t=c(t)||0,r(n)&&(O=!!n.leading,l=(h="maxWait"in n)?s(c(n.maxWait)||0,t):l,m="trailing"in n?!!n.trailing:m),g.cancel=function(){void 0!==j&&clearTimeout(j),b=0,u=f=o=j=void 0},g.flush=function(){return void 0===j?d:w(a())},g}},423:function(e,t,n){var r=n(50);e.exports=function(){return r.Date.now()}},424:function(e,t,n){var r=n(425),a=n(61),c=n(106),s=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,u=/^0o[0-7]+$/i,o=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(c(e))return NaN;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var n=i.test(e);return n||u.test(e)?o(e.slice(2),n?2:8):s.test(e)?NaN:+e}},425:function(e,t,n){var r=n(426),a=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(a,""):e}},426:function(e,t){var n=/\s/;e.exports=function(e){for(var t=e.length;t--&&n.test(e.charAt(t)););return t}},427:function(e,t,n){e.exports={container:"Search_container__2QWKN",searchWrap:"Search_searchWrap__cinBZ",searchIcon:"Search_searchIcon__nrD5M",searchCount:"Search_searchCount__3NOnv",search:"Search_search__2Jvrt"}},428:function(e,t,n){"use strict";var r=n(58),a=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(0)),s=(0,r(n(60)).default)(c.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.default=s},430:function(e,t,n){"use strict";var r=n(22),a=n(0),c=n(418),s=n.n(c),i=n(417),u=n(9),o=n(406),l=n(419),d=n.n(l),j=n(420),f=n.n(j),b=n(416),O=n(37),h=n(157),m=n(27),v=n(1),p=function(e){var t=e.id,n=e.followed,r={textAlign:"center"},c={justifyContent:"flex-end",alignItems:"flex-start",flexBasis:"200px"},s=Object(u.d)(b.a),i=Object(u.d)(O.a),l=Object(u.d)(m.b),j=Object(u.c)(),p=Object(a.useCallback)((function(){return j(Object(h.c)(t))}),[j,t]),x=Object(a.useCallback)((function(){return j(Object(h.e)(t))}),[j,t]),_=s.some((function(e){return e===t}));return Object(v.jsx)(v.Fragment,{children:n?Object(v.jsx)("div",{style:r,children:Object(v.jsx)(o.a,{onClick:x,disabled:_,style:c,startIcon:Object(v.jsx)(d.a,{}),children:"Unfollow"})}):t===i?Object(v.jsx)(v.Fragment,{}):Object(v.jsx)("div",{style:r,children:Object(v.jsx)(o.a,{onClick:p,disabled:_,color:"theme1"===l?"primary":"secondary",style:c,startIcon:Object(v.jsx)(f.a,{}),children:"Follow"})})})},x=Object(a.memo)(p),_=(n(421),function(e){var t=e.element,n=e.children;return Object(v.jsx)("div",{"data-tooltip":t,children:n})}),w=Object(a.memo)(_),g=n(79),N=n(156),S=function(e){var t=e.user,n=t.id,c=t.photos,u=t.name,o=t.status,l=t.followed,d=Object(a.useState)(19),j=Object(r.a)(d,2),f=j[0],b=j[1],O=Object(i.a)();return Object(a.useEffect)((function(){O<=735&&b(10)}),[O]),Object(v.jsxs)("article",{className:s.a.user,children:[Object(v.jsxs)("div",{className:s.a.wrapAvatarNameAndStatus,children:[Object(v.jsx)("div",{className:s.a.wrapAvatar,children:Object(v.jsx)(g.a,{photo:c.large,size:"large",id:n})}),Object(v.jsxs)("div",{className:s.a.nameAndStatus,children:[Object(v.jsx)(y.Name,{id:n,name:u,symbolCount:f}),Object(v.jsx)(y.Status,{status:o,symbolCount:f})]})]}),Object(v.jsx)(x,{id:n,followed:l})]})},y={Name:Object(a.memo)((function(e){var t=e.id,n=e.name,r=e.symbolCount;return Object(v.jsx)(v.Fragment,{children:(null===n||void 0===n?void 0:n.length)>r?Object(v.jsx)(w,{element:n,children:Object(v.jsx)("div",{className:s.a.wrapName,children:Object(v.jsx)(N.a,{id:t,name:n,size:"normal"})})}):Object(v.jsx)("div",{className:s.a.wrapName,children:Object(v.jsx)(N.a,{id:t,name:n,size:"normal"})})})})),Status:Object(a.memo)((function(e){var t=e.status,n=e.symbolCount;return Object(v.jsx)(v.Fragment,{children:(null===t||void 0===t?void 0:t.length)>n?Object(v.jsx)(w,{element:t,children:Object(v.jsx)("div",{className:s.a.status,children:Object(v.jsx)("i",{children:t})})}):Object(v.jsx)("div",{className:s.a.status,children:Object(v.jsx)("i",{children:t})})})}))};t.a=Object(a.memo)(S)},431:function(e,t,n){"use strict";var r=n(0),a=n(422),c=n.n(a),s=n(415),i=n(428),u=n.n(i),o=n(407),l=Object(o.a)((function(e){return{search:{padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),width:"100%","&:focus":{borderRadius:"5px",backgroundColor:"#5e5e5e4d"}}}})),d=n(427),j=n.n(d),f=n(1),b=function(e){var t=e.pathname,n=e.termOfUrl,a=e.searchUsers,i=e.totalUsersCount,o=l(),d=Object(r.useCallback)((function(e){a(e.target.value)}),[a]);return Object(f.jsxs)("div",{className:j.a.container,children:[Object(f.jsxs)("div",{className:j.a.searchWrap,children:[Object(f.jsx)("div",{className:j.a.searchIcon,children:Object(f.jsx)(u.a,{})}),"/users"===t&&Object(f.jsx)(s.a,{placeholder:"Search by name...",inputProps:{"aria-label":"search"},classes:{input:o.search},value:n,onChange:d}),"/friends"===t&&Object(f.jsx)(s.a,{placeholder:"Search by name...",inputProps:{"aria-label":"search"},classes:{input:o.search},onInput:c()(d,600)})]}),Object(f.jsxs)("div",{className:j.a.searchCount,children:["Total: ",i.toString().replace(/(\d)(?=(\d{3})+$)/g,"$1 ")]})]})};t.a=Object(r.memo)(b)},460:function(e,t,n){e.exports={container:"Friends_container__3picv",wrapUsers:"Friends_wrapUsers__1oitZ",buttonLoadMore:"Friends_buttonLoadMore__3DhKd",hiddenButtonLoadMore:"Friends_hiddenButtonLoadMore__1o7lC",users:"Friends_users__2j3Y9",lastElement:"Friends_lastElement__2-m-c"}},463:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(9),s=n(416),i=n(107),u=n(22),o=n(26),l=n(460),d=n.n(l),j=n(430),f=n(431),b=n(159),O=function(e,t,n,a){var c=Object(r.useRef)();Object(r.useEffect)((function(){if(!n){c.current&&c.current.disconnect();c.current=new IntersectionObserver((function(e){e[0].isIntersecting&&t&&a()})),c.current.observe(e.current)}}),[n,a,t,e])},h=n(157),m=n(1),v=function(){var e=Object(c.d)(s.c),t=Object(c.d)(s.e),n=Object(c.d)(s.b),l=Object(c.d)(s.d),v=Object(c.c)(),p=Object(o.h)().pathname,x=Math.ceil(l/e),_=Object(r.useState)(1),w=Object(u.a)(_,2),g=w[0],N=w[1],S=Object(r.useState)(""),y=Object(u.a)(S,2),C=y[0],U=y[1],A=Object(r.useCallback)((function(e){N(1),U(e),v(Object(h.d)(1,e,!0))}),[v]);Object(r.useEffect)((function(){v(h.a.clearUsers()),N(1),v(Object(h.d)(1,"",!0)),I(!0)}),[p,v]);var E=a.a.useRef(null),F=Object(r.useState)(!1),M=Object(u.a)(F,2),k=M[0],I=M[1];return O(E,x>g,n,(function(){I(!0),N(++g),v(Object(h.d)(g,C,!0))})),Object(r.useEffect)((function(){I(!1)}),[t.length]),Object(m.jsxs)("main",{className:d.a.wrapper,children:[Object(m.jsx)(f.a,{termOfUrl:"",searchUsers:A,totalUsersCount:l,pathname:p}),0===l&&!n&&Object(m.jsx)(b.a,{elements:"users",writeSomething:!1}),Object(m.jsxs)("div",{className:d.a.container,children:[Object(m.jsx)("div",{className:d.a.wrapUsers,children:t.map((function(e){return Object(m.jsx)(j.a,{user:{id:e.id,name:e.name,status:e.status,followed:e.followed,photos:e.photos}},e.id)}))}),k&&Object(m.jsx)(i.a,{display:"block"}),!n&&Object(m.jsx)("div",{ref:E,className:d.a.lastElement})]})]})},p=Object(r.memo)(v);t.default=function(){var e=Object(c.d)(s.b);return Object(m.jsxs)(m.Fragment,{children:[e?Object(m.jsx)(i.a,{display:"default"}):null,Object(m.jsx)(p,{})]})}}}]);
//# sourceMappingURL=4.0c3e1c47.chunk.js.map