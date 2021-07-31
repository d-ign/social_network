(this.webpackJsonpsocial_network = this.webpackJsonpsocial_network || []).push([[0], {
  108(e, t, n) {
    n.d(t, 'a', (() => u)); const a = n(8); const r = n(45); const s = (n(0), n(18)); const c = n(21); const o = n(1); const i = function (e) { return { isAuth: e.auth.isAuth }; }; function u(e) { return Object(c.b)(i, {})(((t) => { const n = t.isAuth; const c = Object(r.a)(t, ['isAuth']); return n ? Object(o.jsx)(e, Object(a.a)({}, c)) : Object(o.jsx)(s.a, { to: '/login' }); })); }
  },
  146(e, t, n) { e.exports = { container: 'Wall_container__1uEMX', wrapSendAndButton: 'Wall_wrapSendAndButton__2y9qX' }; },
  149(e, t, n) { e.exports = { search: 'Search_search__2QBqv', searchCount: 'Search_searchCount__3-oiu' }; },
  161(e, t, n) {
    n.d(t, 'a', (() => c)); const a = n(62); const r = n(8); const s = { dialogs: [{ id: 1, name: 'Denis' }, { id: 2, name: 'Andrey' }, { id: 3, name: 'Alexandr' }, { id: 4, name: 'Alisa' }], messages: [{ id: 1, message: 'Hi!' }, { id: 2, message: 'lalalalalalala' }, { id: 3, message: 'How are you?' }], newMessageText: '' }; var c = { sendMessage(e) { return { type: 'SEND_MESSAGE', newMessageText: e }; } }; t.b = function () { const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) { case 'SEND_MESSAGE': var n = { id: 4, message: t.newMessageText }; return Object(r.a)(Object(r.a)({}, e), {}, { messages: [n].concat(Object(a.a)(e.messages)), newMessageText: '' }); default: return e; } };
  },
  17(e, t, n) {
    n.d(t, 'c', (() => c)), n.d(t, 'b', (() => a)), n.d(t, 'a', (() => r)); let a; let r; const s = n(189); var c = n.n(s).a.create({ withCredentials: !0, baseURL: 'https://social-network.samuraijs.com/api/1.0/', headers: { 'API-KEY': '9fe42175-1733-4793-9c3f-72022637a8a0' } }); !(function (e) { e[e.Success = 0] = 'Success', e[e.Error = 1] = 'Error'; }(a || (a = {}))), (function (e) { e[e.CaptchaIsRequired = 10] = 'CaptchaIsRequired'; }(r || (r = {})));
  },
  183(e, t, n) {
    n(0); const a = n(32); const r = n(47); const s = n.n(r); const c = n(79); const o = n(204); const i = n(199); const u = n.n(i); const l = n(200); const d = n.n(l); const j = n(1); t.a = function (e) {
      const t = e.id; const n = e.photo; const r = e.name; const i = e.status; const l = e.followed; const p = e.unfollow; const f = e.follow; const b = e.followingInProgress; const h = e.authorizedUserID; return Object(j.jsxs)(j.Fragment, {
        children: [Object(j.jsx)(a.b, { to: `/profile/${t}`, style: { textDecoration: 'none', display: 'block' }, children: Object(j.jsxs)('div', { className: s.a.wrapAvatarNameAndStatus, children: [Object(j.jsx)('div', { children: Object(j.jsx)('div', { className: s.a.avatar, children: Object(j.jsx)('img', { src: n !== null ? n : c.a, alt: 'avatar' }) }) }), Object(j.jsxs)('div', { className: s.a.nameAndStatus, children: [(r === null || void 0 === r ? void 0 : r.length) > 17 ? Object(j.jsx)('div', { 'data-tooltip': r, children: Object(j.jsx)('div', { className: s.a.name, children: r }) }) : Object(j.jsx)('div', { className: s.a.name, children: r }), (i === null || void 0 === i ? void 0 : i.length) > 17 ? Object(j.jsx)('div', { 'data-tooltip': i, children: Object(j.jsx)('div', { className: s.a.status, children: i }) }) : Object(j.jsx)('div', { className: s.a.status, children: i })] })] }) }), l ? Object(j.jsx)('div', {
          className: s.a.button,
          children: Object(j.jsx)(o.a, {
            onClick() { return p(t); }, disabled: b.some(((e) => e === t)), style: { justifyContent: 'flex-end', alignItems: 'flex-start', flexBasis: '200px' }, startIcon: Object(j.jsx)(u.a, {}), children: 'Unfollow',
          }),
        }) : t === h ? Object(j.jsx)(j.Fragment, {}) : Object(j.jsx)('div', {
          className: s.a.button,
          children: Object(j.jsx)(o.a, {
            onClick() { return f(t); }, disabled: b.some(((e) => e === t)), color: 'primary', style: { justifyContent: 'flex-end', alignItems: 'flex-start', flexBasis: '200px' }, startIcon: Object(j.jsx)(d.a, {}), children: 'Follow',
          }),
        })],
      });
    };
  },
  187(e, t, n) {
    n(0); const a = n(149); const r = n.n(a); const s = n(371); const c = n(201); const o = n.n(c); const i = n(116); const u = n(403); const l = Object(u.a)(((e) => ({
      search: Object(i.a)({
        position: 'relative', borderRadius: e.shape.borderRadius, backgroundColor: 'rgba(255, 255, 255, 0.15)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }, margin: '10px 0 10px 0', width: '100%', maxWidth: '24ch',
      }, e.breakpoints.up('sm'), { marginLeft: e.spacing(1), width: 'auto' }),
      searchIcon: {
        padding: e.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
      },
      inputRoot: { color: 'inherit' },
      inputInput: { padding: e.spacing(1, 1, 1, 0), paddingLeft: 'calc(1em + '.concat(e.spacing(4), 'px)'), width: '100%' },
    }))); const d = n(1); t.a = function (e) {
      const t = l(); return Object(d.jsxs)('div', {
        className: r.a.search,
        children: [Object(d.jsxs)('div', {
          className: t.search,
          children: [Object(d.jsx)('div', { className: t.searchIcon, children: Object(d.jsx)(o.a, {}) }), Object(d.jsx)(s.a, {
            placeholder: 'Search by name...', classes: { root: t.inputRoot, input: t.inputInput }, inputProps: { 'aria-label': 'search' }, onInput(t) { return e.onPageChanged(1, t.target.value); },
          })],
        }), Object(d.jsxs)('div', { className: r.a.searchCount, children: ['Total: ', e.totalUsersCount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')] })],
      });
    };
  },
  23(e, t, n) {
    e.exports = {
      containerForm: 'InfoData_containerForm__1JOGm', wrap: 'InfoData_wrap__1Sogv', aboutMe: 'InfoData_aboutMe__2cZYL', job: 'InfoData_job__3N8Ba', contacts: 'InfoData_contacts__uL_8Z', title: 'InfoData_title__3tTLU', text: 'InfoData_text__3OEXf', contact: 'InfoData_contact__15i2w', contactTitle: 'InfoData_contactTitle__2PwVT', contactTextWrap: 'InfoData_contactTextWrap__DGFoS', contactText: 'InfoData_contactText__1r_Xy',
    };
  },
  27(e, t, n) {
    e.exports = {
      form: 'InfoDataForm_form__3X5Dg', titleForm: 'InfoDataForm_titleForm__3o6fa', wrap: 'InfoDataForm_wrap__7quju', contacts: 'InfoDataForm_contacts__ETWKA', titleAllContacts: 'InfoDataForm_titleAllContacts__32-Po', titleContact: 'InfoDataForm_titleContact__Def8-', countStyle: 'InfoDataForm_countStyle__3Vxhs', wrapForCount: 'InfoDataForm_wrapForCount__3uTkw', errorProfileContacts: 'InfoDataForm_errorProfileContacts__PksGi',
    };
  },
  29(e, t, n) {
    e.exports = {
      nav: 'Navbar_nav__3R0rh', navLink: 'Navbar_navLink__3jqZB', navLinkImg: 'Navbar_navLinkImg__3kMZG', active: 'Navbar_active__2b-XZ',
    };
  },
  366(e, t, n) {
    n.r(t); const a = n(0); const r = n.n(a); const s = n(19); const c = n.n(s); const o = n(32); const i = n(21); const u = n(13); const l = n(188); const d = n(186); const j = n(7); const p = n.n(j); const f = n(14); const b = n(8); const h = n(17); const m = function () { return Object(f.a)(p.a.mark((function e() { let t; return p.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return e.next = 2, h.c.get('auth/me'); case 2: return t = e.sent, e.abrupt('return', t.data); case 4: case 'end': return e.stop(); } }), e); })))(); }; const O = function (e, t) {
      const n = arguments; return Object(f.a)(p.a.mark((function a() {
        let r; let s; let c; return p.a.wrap(((a) => {
          for (;;) {
            switch (a.prev = a.next) {
              case 0: return r = n.length > 2 && void 0 !== n[2] && n[2], s = n.length > 3 && void 0 !== n[3] ? n[3] : null, a.next = 4, h.c.post('/auth/login', {
                email: e, password: t, rememberMe: r, captcha: s,
              }); case 4: return c = a.sent, a.abrupt('return', c.data); case 6: case 'end': return a.stop();
            }
          }
        }), a);
      })))();
    }; const x = function () { return Object(f.a)(p.a.mark((function e() { let t; return p.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return e.next = 2, h.c.delete('/auth/login'); case 2: return t = e.sent, e.abrupt('return', t.data); case 4: case 'end': return e.stop(); } }), e); })))(); }; const v = function () { return Object(f.a)(p.a.mark((function e() { let t; return p.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return e.next = 2, h.c.get('security/get-captcha-url'); case 2: return t = e.sent, e.abrupt('return', t.data); case 4: case 'end': return e.stop(); } }), e); })))(); }; const g = n(57); const _ = {
      userID: null, email: null, login: null, isAuth: !1, captchaURL: null,
    }; const w = function (e, t, n, a) {
      return {
        type: 'SET_USER_DATA',
        payload: {
          userID: e, email: t, login: n, isAuth: a,
        },
      };
    }; const S = function (e) { return { type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaURL: e } }; }; const C = function () { return (function () { const e = Object(f.a)(p.a.mark((function e(t) { let n; let a; let r; let s; let c; return p.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return e.next = 2, m(); case 2: (n = e.sent).resultCode === h.b.Success && (a = n.data, r = a.id, s = a.email, c = a.login, t(w(r, s, c, !0))); case 4: case 'end': return e.stop(); } }), e); }))); return function (t) { return e.apply(this, arguments); }; }()); }; const N = function () { const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) { case 'SET_USER_DATA': case 'GET_CAPTCHA_URL_SUCCESS': return Object(b.a)(Object(b.a)({}, e), t.payload); default: return e; } }; const I = n(161); const y = n(62); const P = function (e) { return Object(f.a)(p.a.mark((function t() { let n; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, h.c.get('profile/'.concat(e)); case 2: return n = t.sent, t.abrupt('return', n.data); case 4: case 'end': return t.stop(); } }), t); })))(); }; const k = function (e) { return Object(f.a)(p.a.mark((function t() { let n; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, h.c.get('profile/status/'.concat(e)); case 2: return n = t.sent, t.abrupt('return', n.data); case 4: case 'end': return t.stop(); } }), t); })))(); }; const E = function (e) { return Object(f.a)(p.a.mark((function t() { let n; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, h.c.put('profile/status', e); case 2: return n = t.sent, t.abrupt('return', n.data); case 4: case 'end': return t.stop(); } }), t); })))(); }; const A = function (e) { return Object(f.a)(p.a.mark((function t() { let n; let a; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return (n = new FormData()).append('image', e), t.next = 4, h.c.put('profile/photo', n, { headers: { 'Content-Type': 'multipart/form-data' } }); case 4: return a = t.sent, t.abrupt('return', a.data); case 6: case 'end': return t.stop(); } }), t); })))(); }; const T = function (e) { return Object(f.a)(p.a.mark((function t() { let n; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, h.c.put('profile', e); case 2: return n = t.sent, t.abrupt('return', n.data); case 4: case 'end': return t.stop(); } }), t); })))(); }; const U = {
      posts: [{ id: 1, message: '\u0421\u0442\u0435\u043d\u0430 \u041f\u0440\u0438\u0432\u0435\u0442!', likesCount: 12 }, { id: 2, message: '\u0421\u0442\u0435\u043d\u0430 \u041a\u0430\u043a \u0434\u0435\u043b\u0430?', likesCount: 4 }], profile: null, status: '', showSuccessSave: '', errorProfileContacts: '',
    }; const F = {
      addPost(e) { return { type: 'ADD_POST', newPostText: e }; }, setUserProfile(e) { return { type: 'SET_USER', profile: e }; }, setStatus(e) { return { type: 'SET_STATUS', status: e }; }, savePhotoSuccess(e) { return { type: 'SAVE_PHOTO_SUCCESS', photos: e }; }, showSuccessSaveProfile(e) { return { type: 'SHOW_SUCCESS_SAVE', message: e }; }, showErrorProfileContacts(e) { return { type: 'SHOW_ERROR_PROFILE_CONTACTS', message: e }; },
    }; const D = function (e) { return (function () { const t = Object(f.a)(p.a.mark((function t(n) { let a; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, P(e); case 2: a = t.sent, n(F.setUserProfile(a)); case 4: case 'end': return t.stop(); } }), t); }))); return function (e) { return t.apply(this, arguments); }; }()); }; const L = function () { const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : U; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) { case 'ADD_POST': var n = { id: 3, message: t.newPostText, likesCount: 0 }; return Object(b.a)(Object(b.a)({}, e), {}, { posts: [n].concat(Object(y.a)(e.posts)) }); case 'SET_USER': return Object(b.a)(Object(b.a)({}, e), {}, { profile: t.profile }); case 'SET_STATUS': return Object(b.a)(Object(b.a)({}, e), {}, { status: t.status }); case 'SAVE_PHOTO_SUCCESS': return Object(b.a)(Object(b.a)({}, e), {}, { profile: Object(b.a)(Object(b.a)({}, e.profile), {}, { photos: t.photos }) }); case 'SHOW_SUCCESS_SAVE': return Object(b.a)(Object(b.a)({}, e), {}, { showSuccessSave: t.message }); case 'SHOW_ERROR_PROFILE_CONTACTS': return Object(b.a)(Object(b.a)({}, e), {}, { errorProfileContacts: t.message }); default: return e; } }; const R = n(76); const W = { initialized: !1 }; const M = function () { return { type: 'INITIALIZED_SUCCESS' }; }; const H = function () { const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : W; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) { case 'INITIALIZED_SUCCESS': return Object(b.a)(Object(b.a)({}, e), {}, { initialized: !0 }); default: return e; } }; const z = Object(u.c)({
      profilePage: L, messagesPage: I.b, usersPage: R.b, auth: N, app: H, form: d.a,
    }); const V = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || u.d; const B = Object(u.e)(z, V(Object(u.a)(l.a))); const G = n(45); const Z = n(18); const J = n(58); const q = n(1); function Y(e) { return function (t) { return Object(q.jsx)(a.Suspense, { fallback: Object(q.jsx)(J.a, {}), children: Object(q.jsx)(e, Object(b.a)({}, t)) }); }; } const X = n(99); const K = n.n(X); const Q = n(63); const $ = n.n(Q); const ee = `${n.p}static/media/logo.cebb0f3e.svg`; const te = `${n.p}static/media/logout.8e3cc1f3.svg`; const ne = n(204); const ae = n(195); const re = n.n(ae); const se = function (e) {
      return Object(q.jsxs)('header', {
        className: $.a.header,
        children: [Object(q.jsxs)(o.b, { className: $.a.logoAndTitle, to: '/profile', children: [Object(q.jsx)('img', { src: ee, alt: 'logo' }), Object(q.jsx)('span', { className: $.a.headerTitle, children: 'Social network' })] }), Object(q.jsx)('div', {
          className: $.a.login,
          children: e.isAuth ? Object(q.jsxs)(q.Fragment, {
            children: [Object(q.jsx)('span', { className: $.a.loginName, children: e.login }), Object(q.jsx)('span', {
              className: $.a.buttonDesctop,
              children: Object(q.jsx)(ne.a, {
                onClick: e.logoutThunk, variant: 'outlined', style: { margin: 16 }, startIcon: Object(q.jsx)(re.a, {}), children: 'Log out',
              }),
            }), Object(q.jsx)('span', {
              className: $.a.buttonMobile,
              children: Object(q.jsx)(ne.a, {
                onClick: e.logoutThunk, variant: 'outlined', style: { margin: 16 }, children: Object(q.jsx)('img', { src: te, alt: 'logout' }),
              }),
            })],
          }) : Object(q.jsx)(Z.a, { to: '/login' }),
        })],
      });
    }; const ce = Object(u.d)(Object(i.b)(((e) => ({ isAuth: e.auth.isAuth, login: e.auth.login })), { logoutThunk() { return (function () { const e = Object(f.a)(p.a.mark((function e(t) { return p.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return e.next = 2, x(); case 2: e.sent.resultCode === h.b.Success && t(w(null, null, null, !1)); case 4: case 'end': return e.stop(); } }), e); }))); return function (t) { return e.apply(this, arguments); }; }()); } }))(((e) => Object(q.jsx)(se, Object(b.a)({}, e)))); const oe = n(29); const ie = n.n(oe); const ue = Object(u.d)(Object(i.b)(((e) => ({ authorizedUserID: e.auth.userID })), {}), Z.g)(((e) => {
      const t = `/profile/${e.authorizedUserID}`; return Object(q.jsxs)('nav', {
        className: ie.a.nav,
        id: 'navbar',
        children: [Object(q.jsxs)(o.b, {
          exact: !0,
          to: t,
          activeClassName: ie.a.active,
          className: ie.a.navLink,
          children: [Object(q.jsx)('svg', {
            width: '24', height: '24', fill: e.location.pathname === t ? '#00bcd4' : 'white', className: ie.a.navLinkImg, viewBox: '0 0 24 24', children: Object(q.jsx)('path', { fill: 'currentColor', d: 'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z' }),
          }), 'Profile'],
        }), Object(q.jsxs)(o.b, {
          to: '/dialogs',
          activeClassName: ie.a.active,
          className: ie.a.navLink,
          children: [Object(q.jsx)('svg', {
            xmlns: 'http://www.w3.org/2000/svg', version: '1.1', width: '24', height: '24', fill: e.location.pathname === '/dialogs' ? '#00bcd4' : 'white', className: ie.a.navLinkImg, viewBox: '0 0 24 24', children: Object(q.jsx)('path', { d: 'M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z' }),
          }), 'Messages'],
        }), Object(q.jsxs)(o.b, {
          to: '/users',
          activeClassName: ie.a.active,
          className: ie.a.navLink,
          children: [Object(q.jsx)('svg', {
            width: '24', height: '24', viewBox: '0 0 24 24', fill: e.location.pathname === '/users' ? '#00bcd4' : 'white', className: ie.a.navLinkImg, children: Object(q.jsx)('path', { d: 'M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M2,20V18C2,15.88 5.31,14.14 9.5,14C9.18,14.78 9,15.62 9,16.5C9,17.79 9.38,19 10,20H2Z' }),
          }), 'Find Users'],
        }), Object(q.jsxs)(o.b, {
          to: '/friends',
          activeClassName: ie.a.active,
          className: ie.a.navLink,
          children: [Object(q.jsx)('svg', {
            xmlns: 'http://www.w3.org/2000/svg', version: '1.1', width: '24', height: '24', fill: e.location.pathname === '/friends' ? '#00bcd4' : 'white', className: ie.a.navLinkImg, viewBox: '0 0 24 24', children: Object(q.jsx)('path', { d: 'M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z' }),
          }), 'Friends'],
        })],
      });
    })); const le = n(111); const de = n(112); const je = n(115); const pe = n(114); const fe = n(108); const be = n(184); const he = n(185); const me = n(64); const Oe = n.n(me); const xe = `${n.p}static/media/avatar_2.e0878a2c.jpg`; const ve = n(79); const ge = n(401); const _e = n(196); const we = n.n(_e); const Se = function (e) { return Object(q.jsxs)('div', { className: Oe.a.container, children: [Object(q.jsx)('div', { children: Object(q.jsx)('div', { className: Oe.a.avatar, children: Object(q.jsx)('img', { src: xe !== null ? xe : ve.a, alt: 'avatar' }) }) }), Object(q.jsxs)('div', { className: Oe.a.nameAndPost, children: [Object(q.jsx)('div', { className: Oe.a.name, children: 'Name user' }), Object(q.jsx)('div', { className: Oe.a.message, children: e.message }), Object(q.jsxs)('div', { className: Oe.a.wrapLike, children: [Object(q.jsx)(ge.a, { 'aria-label': 'like', size: 'small', children: Object(q.jsx)(we.a, {}) }), Object(q.jsx)('span', { className: Oe.a.like, children: e.likesCount })] })] })] }); }; const Ce = n(146); const Ne = n.n(Ce); const Ie = n(40); const ye = n(197); const Pe = n.n(ye); const ke = Object(he.a)({ form: 'profileNewPostForm' })(((e) => Object(q.jsx)('form', {
      onSubmit: e.handleSubmit,
      children: Object(q.jsxs)('div', {
        className: Ne.a.wrapSendAndButton,
        children: [Object(q.jsx)(be.a, {
          component: Ie.a, name: 'newPostText', placeholder: 'Enter the post text...', multiline: !0, fullWidth: !0, variant: 'outlined', inputProps: { maxLength: 1e3 },
        }), Object(q.jsx)(ne.a, {
          type: 'submit', variant: 'contained', color: 'primary', style: { color: 'white', marginLeft: '10px', width: '160px' }, endIcon: Object(q.jsx)(Pe.a, {}), children: 'Add post',
        })],
      }),
    }))); const Ee = function (e) { const t = e.posts.map(((e) => Object(q.jsx)(Se, { message: e.message, likesCount: e.likesCount }, e.id))); return Object(q.jsxs)('div', { className: Ne.a.container, children: [Object(q.jsx)(ke, { onSubmit(t) { e.addPost(t.newPostText); } }), t] }); }; const Ae = Object(u.d)(Object(i.b)(((e) => ({ posts: e.profilePage.posts })), { addPost: F.addPost }))(Ee); const Te = n(91); const Ue = n(53); const Fe = n.n(Ue); const De = n(402); const Le = n(123); const Re = n.n(Le); const We = n(124); const Me = n.n(We); const He = n(403); const ze = Object(He.a)(((e) => ({
      inputProfileStatus: {
        minHeight: '30px', maxHeight: '180px', lineHeight: '25px', padding: e.spacing(1), backgroundColor: '#4F4F4F', borderRadius: '5px 5px 0 0',
      },
    }))); const Ve = function (e) { e.target.select(), document.getElementById(`${e.target.name}Count`).textContent = e.target.value.length; const t = document.getElementById(`${e.target.name}WrapCount`); t.style.display = 'inline-block', t.style.fontSize = '10px', t.style.position = 'absolute', t.style.right = '10px', t.style.top = 0; }; const Be = function (e) { document.getElementById(`${e.target.name}WrapCount`).style.display = 'none'; }; const Ge = function (e, t) { const n = `${t.target.name}WrapCount`; const a = `${t.target.name}Count`; const r = t.target.value.length; r < e - 10 && (document.getElementById(n).style.color = 'white'), r >= e - 10 && (document.getElementById(n).style.color = 'yellow'), r === e && (document.getElementById(n).style.color = 'red'), document.getElementById(a).textContent = t.target.value.length; }; const Ze = function (e) {
      const t = ze(); const n = Object(a.useState)(!1); const r = Object(Te.a)(n, 2); const s = r[0]; const c = r[1]; const o = Object(a.useState)(e.status); const i = Object(Te.a)(o, 2); const u = i[0]; const l = i[1]; Object(a.useEffect)((() => { l(e.status); }), [e.status]); return Object(q.jsxs)('div', {
        className: Fe.a.container,
        children: [s && Object(q.jsxs)('div', {
          className: Fe.a.wrap,
          children: [Object(q.jsx)(De.a, {
            name: 'status', value: u, placeholder: 'Your status...', autoFocus: !0, inputProps: { maxLength: 300 }, className: t.inputProfileStatus, multiline: !0, fullWidth: !0, onInput: Ge.bind(null, 300), onFocus: Ve, onBlur: Be, onChange(e) { return l(e.currentTarget.value); },
          }), Object(q.jsxs)('div', {
            className: Fe.a.buttons,
            children: [Object(q.jsx)('div', {
              className: Fe.a.buttonWrap,
              children: Object(q.jsx)(ne.a, {
                onClick() { e.updateStatus(u), c(!1); }, variant: 'contained', color: 'primary', style: { color: '#fff', margin: 10, width: '100%' }, startIcon: Object(q.jsx)(Re.a, {}), children: 'Save',
              }),
            }), Object(q.jsx)('div', {
              className: Fe.a.buttonWrap,
              children: Object(q.jsx)(ne.a, {
                onClick() { return c(!1); }, variant: 'outlined', style: { margin: 10, width: '100%' }, startIcon: Object(q.jsx)(Me.a, {}), children: 'Cancel',
              }),
            }), Object(q.jsxs)('span', { id: 'statusWrapCount', children: [Object(q.jsx)('span', { id: 'statusCount' }), ' of 300'] })],
          })],
        }), e.isOwner && !s && Object(q.jsx)('div', { className: Fe.a.status, onClick() { return c(!0); }, children: e.status || Object(q.jsx)('span', { className: Fe.a.statusEmpty, children: 'Your status is empty' }) }), !e.isOwner && e.status && Object(q.jsx)('div', { className: Fe.a.statusNotMy, children: e.status })],
      });
    }; const Je = n(408); const qe = n(406); const Ye = function (e) {
      const t = e.input; const n = e.label; return Object(q.jsx)('div', {
        children: Object(q.jsx)(Je.a, {
          control: Object(q.jsx)(qe.a, { checked: !!t.value, onChange: t.onChange }), label: n, labelPlacement: 'start', style: { marginLeft: 0 },
        }),
      });
    }; const Xe = n(27); const Ke = n.n(Xe); const Qe = n(85); const $e = n.n(Qe); const et = Object(he.a)({ form: 'editProfile' })(((e) => {
      const t = e.handleSubmit; const n = e.initialValues; const a = e.errorProfileContacts; return Object(q.jsxs)('form', {
        onSubmit: t,
        className: Ke.a.form,
        children: [Object(q.jsx)('h1', { className: Ke.a.titleForm, children: 'Edit profile' }), Object(q.jsxs)('div', {
          className: $e()(Ke.a.wrap, Ke.a.wrapForCount),
          children: [Object(q.jsx)(be.a, {
            component: Ie.a, name: 'fullName', label: 'Name:', placeholder: 'Your name', variant: 'filled', fullWidth: !0, inputProps: { maxLength: 100 }, onInput: Ge.bind(null, 100), onFocus: Ve, onBlur: Be,
          }), Object(q.jsxs)('span', { id: 'fullNameWrapCount', className: Ke.a.countStyle, children: [Object(q.jsx)('span', { id: 'fullNameCount' }), ' of 100'] })],
        }), Object(q.jsxs)('div', {
          className: $e()(Ke.a.wrap, Ke.a.wrapForCount),
          children: [Object(q.jsx)(be.a, {
            component: Ie.a, name: 'aboutMe', label: 'About me:', placeholder: 'Write about yourself!', multiline: !0, fullWidth: !0, variant: 'filled', inputProps: { maxLength: 1e3 }, onInput: Ge.bind(null, 1e3), onFocus: Ve, onBlur: Be,
          }), Object(q.jsxs)('span', { id: 'aboutMeWrapCount', className: Ke.a.countStyle, children: [Object(q.jsx)('span', { id: 'aboutMeCount' }), ' of 1000'] })],
        }), Object(q.jsx)('div', { className: Ke.a.wrap, children: Object(q.jsx)(be.a, { component: Ye, name: 'lookingForAJob', label: 'Are you looking for a job?' }) }), Object(q.jsxs)('div', {
          className: $e()(Ke.a.wrap, Ke.a.wrapForCount),
          children: [Object(q.jsx)(be.a, {
            component: Ie.a, name: 'lookingForAJobDescription', label: 'Professional skills:', placeholder: 'What you can do?', multiline: !0, fullWidth: !0, variant: 'filled', inputProps: { maxLength: 1e3 }, onInput: Ge.bind(null, 1e3), onFocus: Ve, onBlur: Be,
          }), Object(q.jsxs)('span', { id: 'lookingForAJobDescriptionWrapCount', className: Ke.a.countStyle, children: [Object(q.jsx)('span', { id: 'lookingForAJobDescriptionCount' }), ' of 1000'] })],
        }), Object(q.jsxs)('div', { className: Ke.a.wrap, children: [Object(q.jsx)('div', { className: Ke.a.titleAllContacts, children: 'Contacts:' }), Object(q.jsx)('div', { className: Ke.a.errorProfileContacts, children: a }), Object.keys(n.contacts).map(((e) => Object(q.jsxs)('div', { className: Ke.a.contacts, children: [Object(q.jsxs)('div', { className: Ke.a.titleContact, children: [e, ':'] }), Object(q.jsx)(be.a, { component: Ie.a, name: `contacts.${e}` })] }, e)))] })],
      });
    })); const tt = n(23); const nt = n.n(tt); const at = function (e) { const t = e.contactTitle; const n = e.contactValue; return Object(q.jsx)(q.Fragment, { children: n && Object(q.jsxs)('div', { className: nt.a.contact, children: [Object(q.jsxs)('span', { className: nt.a.contactTitle, children: [t, ':'] }), Object(q.jsx)('div', { className: nt.a.contactTextWrap, children: Object(q.jsx)('a', { className: nt.a.contactText, href: n, children: n }) })] }) }); }; const rt = function (e) { const t = e.profile; return Object(q.jsxs)('div', { className: nt.a.containerForm, children: [Object(q.jsx)('div', { className: nt.a.wrap, children: t.aboutMe && Object(q.jsxs)('div', { className: nt.a.aboutMe, children: [Object(q.jsx)('div', { className: nt.a.title, children: 'About me:' }), Object(q.jsx)('div', { className: nt.a.text, children: t.aboutMe })] }) }), Object(q.jsx)('div', { className: nt.a.wrap, children: Object(q.jsxs)('div', { className: nt.a.job, children: [Object(q.jsx)('div', { className: nt.a.title, children: 'Job search:' }), t.lookingForAJob ? Object(q.jsx)('div', { className: nt.a.text, children: 'Now looking for a job!' }) : Object(q.jsx)('div', { className: nt.a.text, children: "I'm not looking for a job" })] }) }), Object(q.jsx)('div', { className: nt.a.wrap, children: t.lookingForAJobDescription && Object(q.jsxs)('div', { className: nt.a.job, children: [Object(q.jsx)('div', { className: nt.a.title, children: 'Professional skills:' }), Object(q.jsx)('div', { className: nt.a.text, children: t.lookingForAJobDescription })] }) }), Object(q.jsx)('div', { className: nt.a.wrap, children: Object.values(t.contacts).some(((e) => e && e !== '')) && Object(q.jsxs)('div', { className: nt.a.contacts, children: [Object(q.jsx)('div', { className: nt.a.title, children: 'My contacts' }), Object.keys(t.contacts).map(((e) => Object(q.jsx)(at, { contactTitle: e, contactValue: t.contacts[e] }, e)))] }) })] }); }; const st = `${n.p}static/media/camera.12909c41.svg`; const ct = n(38); const ot = n.n(ct); const it = n(198); const ut = n.n(it); function lt() { return Object(a.useEffect)((() => { window.scrollTo(0, 0); }), []), null; } const dt = Object(i.b)()(((e) => {
      const t = e.dispatch; const n = Object(G.a)(e, ['dispatch']); const r = Object(a.useState)(!1); const s = Object(Te.a)(r, 2); const c = s[0]; const o = s[1]; if (!n.profile) return Object(q.jsx)(J.a, {}); return Object(q.jsxs)('div', {
        className: ot.a.containerMain,
        children: [Object(q.jsx)(lt, {}), Object(q.jsxs)('div', {
          className: ot.a.columnLeft,
          children: [Object(q.jsx)('div', {
            className: ot.a.avatarWrap,
            children: Object(q.jsxs)('div', {
              className: ot.a.avatar,
              children: [Object(q.jsx)('img', { src: n.profile.photos.large || ve.a, alt: 'avatar' }), n.isOwner && !c && Object(q.jsxs)('div', {
                className: ot.a.camera,
                children: [Object(q.jsx)('label', { htmlFor: 'file_out', children: Object(q.jsx)('div', { className: ot.a.wrapImg, children: Object(q.jsx)('img', { src: st, alt: 'icon' }) }) }), Object(q.jsx)('input', {
                  id: 'file_out', className: ot.a.editPhotoInput, type: 'file', onChange(e) { let t; ((t = e.target.files) === null || void 0 === t ? void 0 : t.length) && n.savePhotoThunk(e.target.files[0]); },
                })],
              })],
            }),
          }), n.isOwner && !c && Object(q.jsx)(ne.a, {
            onClick() { return o(!0); }, variant: 'outlined', style: { fontSize: 12, marginTop: 10 }, startIcon: Object(q.jsx)(ut.a, { style: { fontSize: 16 } }), children: 'Edit profile',
          }), c && Object(q.jsxs)('div', {
            className: ot.a.buttonsSaveAndCancelProfile,
            children: [Object(q.jsx)(ne.a, {
              onClick() { return t(Object(g.b)('editProfile')); }, variant: 'contained', color: 'primary', fullWidth: !0, style: { fontSize: 12, color: '#fff', margin: 10 }, startIcon: Object(q.jsx)(Re.a, {}), children: 'Save',
            }), Object(q.jsx)(ne.a, {
              onClick() { return o(!1); }, variant: 'outlined', fullWidth: !0, style: { fontSize: 12, color: '#fff', margin: 10 }, startIcon: Object(q.jsx)(Me.a, {}), children: 'Cancel',
            })],
          }), c && n.showSuccessSave && Object(q.jsx)('div', { className: ot.a.successSave, children: n.showSuccessSave })],
        }), Object(q.jsxs)('div', { className: ot.a.columnRight, children: [!c && Object(q.jsx)('div', { className: ot.a.fullName, children: n.profile.fullName }), !c && Object(q.jsx)(Ze, { status: n.status, updateStatus: n.updateStatus, isOwner: n.isOwner }), c ? Object(q.jsx)(et, { initialValues: n.profile, errorProfileContacts: n.errorProfileContacts, onSubmit(e) { n.saveProfileThunk(e); } }) : Object(q.jsx)(rt, { profile: n.profile })] })],
      });
    })); const jt = (function (e) {
      Object(je.a)(n, e); const t = Object(pe.a)(n); function n() { return Object(le.a)(this, n), t.apply(this, arguments); } return Object(de.a)(n, [{ key: 'refreshProfile', value() { let e = +this.props.match.params.userId; e || (e = this.props.authorizedUserID) || this.props.history.push('/login'), this.props.getUserProfile(e), this.props.getStatus(e); } }, { key: 'componentDidMount', value() { this.refreshProfile(); } }, { key: 'componentDidUpdate', value(e) { this.props.match.params.userId !== e.match.params.userId && this.refreshProfile(); } }, {
        key: 'render',
        value() {
          return Object(q.jsxs)(q.Fragment, {
            children: [Object(q.jsx)(dt, {
              profile: this.props.profile, status: this.props.status, showSuccessSave: this.props.showSuccessSave, errorProfileContacts: this.props.errorProfileContacts, isOwner: +this.props.match.params.userId === this.props.authorizedUserID, updateStatus: this.props.updateStatus, savePhotoThunk: this.props.savePhotoThunk, saveProfileThunk: this.props.saveProfileThunk,
            }), Object(q.jsx)(Ae, {})],
          });
        },
      }]), n;
    }(r.a.PureComponent)); const pt = Object(u.d)(Object(i.b)(((e) => ({
      profile: e.profilePage.profile, status: e.profilePage.status, authorizedUserID: e.auth.userID, showSuccessSave: e.profilePage.showSuccessSave, errorProfileContacts: e.profilePage.errorProfileContacts,
    })), {
      getUserProfile: D, getStatus(e) { return (function () { const t = Object(f.a)(p.a.mark((function t(n) { let a; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, k(e); case 2: a = t.sent, n(F.setStatus(a)); case 4: case 'end': return t.stop(); } }), t); }))); return function (e) { return t.apply(this, arguments); }; }()); }, updateStatus(e) { return (function () { const t = Object(f.a)(p.a.mark((function t(n) { return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, E(e); case 2: t.sent.resultCode === h.b.Success && n(F.setStatus(e)); case 4: case 'end': return t.stop(); } }), t); }))); return function (e) { return t.apply(this, arguments); }; }()); }, savePhotoThunk(e) { return (function () { const t = Object(f.a)(p.a.mark((function t(n) { let a; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, A(e); case 2: (a = t.sent).resultCode === h.b.Success && n(F.savePhotoSuccess(a.data.photos)); case 4: case 'end': return t.stop(); } }), t); }))); return function (e) { return t.apply(this, arguments); }; }()); }, saveProfileThunk(e) { return (function () { const t = Object(f.a)(p.a.mark((function t(n, a) { let r; let s; return p.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: return t.next = 2, T(e); case 2: r = t.sent, s = a().auth.userID, r.resultCode === h.b.Success && (n(D(s)), n(F.showSuccessSaveProfile('Data saved successfully!')), setTimeout(n, 4e3, F.showSuccessSaveProfile('')), n(F.showErrorProfileContacts(''))), r.resultCode === h.b.Error && n(F.showErrorProfileContacts(r.messages[0])); case 6: case 'end': return t.stop(); } }), t); }))); return function (e, n) { return t.apply(this, arguments); }; }()); },
    }), Z.g, fe.a)(jt); const ft = n(54); const bt = n.n(ft); const ht = Object(he.a)({ form: 'loginForm', validate(e) { const t = {}; return ['email', 'password', 'captcha'].forEach(((n) => { e[n] || (t[n] = 'Required'); })), e.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email) && (t.email = 'Invalid email address'), t; } })(((e) => {
      const t = e.handleSubmit; const n = e.error; const a = e.captchaURL; return Object(q.jsx)(q.Fragment, {
        children: Object(q.jsxs)('form', {
          onSubmit: t,
          children: [Object(q.jsx)('div', {
            className: bt.a.row,
            children: Object(q.jsx)(be.a, {
              component: Ie.a, name: 'email', label: 'Email:', type: 'email', fullWidth: !0,
            }),
          }), Object(q.jsx)('div', {
            className: bt.a.row,
            children: Object(q.jsx)(be.a, {
              component: Ie.a, name: 'password', label: 'Password:', type: 'password', fullWidth: !0,
            }),
          }), Object(q.jsx)('div', { className: $e()(bt.a.row, bt.a.rowCheckbox), children: Object(q.jsx)(be.a, { component: Ye, name: 'rememberMe', label: 'Remember me' }) }), a && Object(q.jsx)('img', { src: a, alt: 'captcha' }), a && Object(q.jsx)(be.a, { component: Ie.a, fullWidth: !0, name: 'captcha' }), Object(q.jsxs)('div', {
            className: bt.a.row,
            children: [Object(q.jsx)(ne.a, {
              type: 'submit',
              variant: 'contained',
              color: 'primary',
              style: {
                width: '100%', fontSize: 16, fontWeight: 'bold', color: '#fff',
              },
              children: 'Log in',
            }), n && Object(q.jsx)('div', { className: bt.a.formError, children: n })],
          })],
        }),
      });
    })); const mt = Object(u.d)(Object(i.b)(((e) => ({ captchaURL: e.auth.captchaURL, isAuth: e.auth.isAuth, userID: e.auth.userID })), { loginThunk(e, t, n, a) { return (function () { const r = Object(f.a)(p.a.mark((function r(s) { let c; let o; let i; return p.a.wrap(((r) => { for (;;) switch (r.prev = r.next) { case 0: return r.next = 2, O(e, t, n, a); case 2: (c = r.sent).resultCode === h.b.Success && (s(C()), s(S(null))), c.resultCode === h.b.Error && (o = c.messages, i = Object(g.a)('loginForm', { _error: o.length > 0 ? o[0] : 'Some error' }), s(i)), c.resultCode === h.a.CaptchaIsRequired && s(function () { const e = Object(f.a)(p.a.mark((function e(t) { let n; let a; return p.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return e.next = 2, v(); case 2: n = e.sent, a = n.url, t(S(a)); case 5: case 'end': return e.stop(); } }), e); }))); return function (t) { return e.apply(this, arguments); }; }()); case 6: case 'end': return r.stop(); } }), r); }))); return function (e) { return r.apply(this, arguments); }; }()); } }))(((e) => (e.isAuth ? Object(q.jsx)(Z.a, { to: '/profile/'.concat(e.userID) }) : Object(q.jsx)('div', { className: bt.a.wrap, children: Object(q.jsxs)('div', { className: bt.a.body, children: [Object(q.jsx)('h1', { children: 'Log in' }), Object(q.jsx)(ht, { onSubmit(t) { e.loginThunk(t.email, t.password, t.rememberMe, t.captcha); }, captchaURL: e.captchaURL })] }) })))); const Ot = n(98); const xt = n.n(Ot); const vt = n(183); const gt = n(187); const _t = Object(u.d)(Object(i.b)(((e) => ({
      isFetching: e.usersPage.isFetching, friends: e.usersPage.friends, users: e.usersPage.users, totalUsersCount: e.usersPage.totalUsersCount, pageSize: e.usersPage.pageSize, authorizedUserID: e.auth.userID, followingInProgress: e.usersPage.followingInProgress,
    })), { getFriends: R.e, follow: R.c, unfollow: R.g }), fe.a)(((e) => {
      const t = e.users; const n = e.getFriends; const a = Object(G.a)(e, ['users', 'getFriends']); r.a.useEffect((() => n(1, 100, '', !0)), [n, t]); return Object(q.jsxs)('div', {
        className: xt.a.wrapper,
        children: [a.isFetching ? Object(q.jsx)(J.a, {}) : null, Object(q.jsx)(gt.a, { onPageChanged(e, t) { n(e, a.pageSize, t, !0); }, totalUsersCount: a.totalUsersCount }), a.totalUsersCount === 0 && Object(q.jsx)('div', { className: xt.a.nothingFound, children: 'Nothing found' }), Object(q.jsx)('div', {
          className: xt.a.container,
          children: a.friends.map(((e) => Object(q.jsx)('div', {
            className: xt.a.user,
            children: Object(q.jsx)(vt.a, {
              id: e.id, photo: e.photos.small, name: e.name, status: e.status, followed: e.followed, unfollow: a.unfollow, follow: a.follow, followingInProgress: a.followingInProgress, authorizedUserID: a.authorizedUserID,
            }),
          }, e.id))),
        })],
      });
    })); const wt = (function (e) { Object(je.a)(n, e); const t = Object(pe.a)(n); function n(e) { let a; return Object(le.a)(this, n), (a = t.call(this, e)).state = { error: null }, a; } return Object(de.a)(n, [{ key: 'render', value() { let e; return this.state.error ? Object(q.jsxs)('div', { children: [Object(q.jsx)('h2', { children: 'Something went wrong' }), Object(q.jsx)('details', { style: { whiteSpace: 'pre-wrap' }, children: (e = this.state.error) === null || void 0 === e ? void 0 : e.toString() })] }) : this.props.children; } }], [{ key: 'getDerivedStateFromError', value(e) { return { error: e }; } }]), n; }(r.a.Component)); const St = r.a.lazy((() => n.e(3).then(n.bind(null, 412)))); const Ct = r.a.lazy((() => n.e(4).then(n.bind(null, 413)))); const Nt = Y(St); const It = Y(Ct); const yt = Object(u.d)(Z.g, Object(i.b)(((e) => ({ initialized: e.app.initialized, userID: e.auth.userID })), { initializeAppThunk() { return (function () { const e = Object(f.a)(p.a.mark((function e(t) { return p.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return e.next = 2, t(C()); case 2: t(M()); case 3: case 'end': return e.stop(); } }), e); }))); return function (t) { return e.apply(this, arguments); }; }()); } }))(((e) => { const t = e.initializeAppThunk; const n = Object(G.a)(e, ['initializeAppThunk']); return r.a.useEffect((() => t()), [t]), n.initialized ? Object(q.jsx)('div', { className: K.a.fon, children: Object(q.jsx)('div', { className: K.a.container, children: Object(q.jsxs)('div', { className: K.a.appWrapper, children: [Object(q.jsx)(ce, {}), Object(q.jsx)(ue, {}), Object(q.jsx)('div', { className: K.a.appWrapperContent, children: Object(q.jsx)(wt, { children: Object(q.jsxs)(Z.d, { children: [Object(q.jsx)(Z.a, { from: '/profile/undefined', to: '/' }), Object(q.jsx)(Z.b, { path: '/dialogs', render() { return Object(q.jsx)(Nt, {}); } }), Object(q.jsx)(Z.b, { path: '/profile/:userId', render() { return Object(q.jsx)(pt, {}); } }), Object(q.jsx)(Z.b, { path: '/users', render() { return Object(q.jsx)(It, {}); } }), Object(q.jsx)(Z.b, { path: '/friends', render() { return Object(q.jsx)(_t, {}); } }), Object(q.jsx)(Z.b, { path: '/login', render() { return Object(q.jsx)(mt, {}); } }), Object(q.jsx)(Z.a, { exact: !0, from: '/', to: `/profile/${n.userID}` }), Object(q.jsx)(Z.a, { from: '*', to: '/' })] }) }) })] }) }) }) : Object(q.jsx)(J.a, {}); })); const Pt = n(203); const kt = n(407); const Et = n(404); const At = n(405); const Tt = n(202); const Ut = n.n(Tt); let Ft = Object(Pt.a)({ palette: { type: 'dark', primary: { main: Ut.a[600] }, secondary: { main: '#919191' } } }); Ft = Object(kt.a)(Ft), c.a.render(Object(q.jsx)(o.a, { children: Object(q.jsx)(Et.a, { theme: Ft, children: Object(q.jsxs)(i.a, { store: B, children: [Object(q.jsx)(At.a, {}), Object(q.jsx)(yt, {})] }) }) }), document.getElementById('root'));
  },
  38(e, t, n) {
    e.exports = {
      avatar: 'InfoContainer_avatar__CcdyI', avatarWrap: 'InfoContainer_avatarWrap__1SEZU', camera: 'InfoContainer_camera__IpD6r', wrapImg: 'InfoContainer_wrapImg__10vd-', editPhotoInput: 'InfoContainer_editPhotoInput__XccDx', containerMain: 'InfoContainer_containerMain__3Xio4', columnLeft: 'InfoContainer_columnLeft__1_kJ8', columnRight: 'InfoContainer_columnRight__2qyh0', iconButtonEditProfile: 'InfoContainer_iconButtonEditProfile__26Jz-', fullName: 'InfoContainer_fullName__7Hk3o', buttonsSaveAndCancelProfile: 'InfoContainer_buttonsSaveAndCancelProfile__1uVyp', successSave: 'InfoContainer_successSave__23-f5', anim: 'InfoContainer_anim__QEFY8',
    };
  },
  40(e, t, n) {
    const a = n(8); const r = n(45); const s = n(369); const c = n(1); t.a = function (e) {
      const t = e.label; const n = e.input; const o = e.placeholder; const i = e.multiline; const u = e.variant; const l = e.inputProps; const d = e.onInput; const j = e.onFocus; const p = e.meta; const f = p.touched; const b = p.error; const h = p.warning; const m = e.fullWidth; const O = Object(r.a)(e, ['label', 'input', 'placeholder', 'multiline', 'variant', 'inputProps', 'onInput', 'onFocus', 'meta', 'fullWidth']); return Object(c.jsxs)(c.Fragment, {
        children: [Object(c.jsx)(s.a, Object(a.a)(Object(a.a)({
          label: t, placeholder: o, inputProps: l, onInput: d, onFocus: j, variant: u, multiline: i, fullWidth: m,
        }, n), O)), f && (b && Object(c.jsx)('span', { style: { color: 'red' }, children: b }) || h && Object(c.jsx)('span', { children: h }))],
      });
    };
  },
  47(e, t, n) {
    e.exports = {
      wrapAvatarNameAndStatus: 'User_wrapAvatarNameAndStatus__8Hk7D', avatar: 'User_avatar__2oDgd', nameAndStatus: 'User_nameAndStatus__3sPsM', name: 'User_name__lmqfs', status: 'User_status__2tKNY', button: 'User_button__2Jj9r',
    };
  },
  53(e, t, n) {
    e.exports = {
      container: 'Status_container__BDZoe', wrap: 'Status_wrap__1mMIC', buttons: 'Status_buttons__KMxYA', buttonWrap: 'Status_buttonWrap__3yn6L', status: 'Status_status__27mFj', statusNotMy: 'Status_statusNotMy__3afoa', statusEmpty: 'Status_statusEmpty__1-cAn', buttonSave: 'Status_buttonSave__2MrEy', buttonCancel: 'Status_buttonCancel__10fUe',
    };
  },
  54(e, t, n) {
    e.exports = {
      wrap: 'Login_wrap__18LVK', body: 'Login_body__2Hhs9', row: 'Login_row__3d41Y', rowCheckbox: 'Login_rowCheckbox__4sYwU', formError: 'Login_formError__3j1Nj',
    };
  },
  58(e, t, n) {
    n(0); const a = `${n.p}static/media/preloader.a2993579.svg`; const r = n(1); t.a = function () { return Object(r.jsx)('div', { style: { position: 'absolute', left: 'calc(50% - 85px)' }, children: Object(r.jsx)('div', { style: { display: 'flex', justifyContent: 'center' }, children: Object(r.jsx)('img', { src: a, alt: 'preloader' }) }) }); };
  },
  63(e, t, n) {
    e.exports = {
      header: 'Header_header__3vTSi', logoAndTitle: 'Header_logoAndTitle__1mTjG', headerTitle: 'Header_headerTitle__2wZ_g', login: 'Header_login__1LiSF', loginName: 'Header_loginName__3CaV_', logoutImg: 'Header_logoutImg__1QW2c', buttonMobile: 'Header_buttonMobile__3V8e5', buttonDesctop: 'Header_buttonDesctop__38OBn',
    };
  },
  64(e, t, n) {
    e.exports = {
      container: 'Post_container__3VKFd', avatar: 'Post_avatar__Z9tVC', nameAndPost: 'Post_nameAndPost__14k_q', name: 'Post_name__UCrHi', message: 'Post_message__1vD2I', wrapLike: 'Post_wrapLike__1qVOH', like: 'Post_like__30Txn',
    };
  },
  76(e, t, n) {
    n.d(t, 'a', (() => d)), n.d(t, 'f', (() => j)), n.d(t, 'd', (() => p)), n.d(t, 'e', (() => f)), n.d(t, 'c', (() => h)), n.d(t, 'g', (() => m)); const a = n(7); const r = n.n(a); const s = n(14); const c = n(62); const o = n(8); const i = n(17); const u = { getUsers(e, t, n, a) { return Object(s.a)(r.a.mark((function s() { let c; return r.a.wrap(((r) => { for (;;) switch (r.prev = r.next) { case 0: return r.next = 2, i.c.get('users?page='.concat(e, '&count=').concat(t, '&term=').concat(n, '&friend=').concat(a)); case 2: return c = r.sent, r.abrupt('return', c.data); case 4: case 'end': return r.stop(); } }), s); })))(); }, followUser(e) { return i.c.post('follow/'.concat(e), {}); }, unfollowUser(e) { return i.c.delete('follow/'.concat(e)); } }; const l = {
      users: [], friends: [], foundUsers: [], pageSize: 50, totalUsersCount: 0, currentPage: 1, isFetching: !0, followingInProgress: [],
    }; var d = {
      followSuccess(e) { return { type: 'FOLLOW', userID: e }; }, unfollowSuccess(e) { return { type: 'UNFOLLOW', userID: e }; }, setUsers(e) { return { type: 'SET_USERS', users: e }; }, setFriends(e) { return { type: 'SET_FRIENDS', friends: e }; }, setFoundUsers(e) { return { type: 'SET_FOUND_USERS', foundUsers: e }; }, setTotalUsersCount(e) { return { type: 'SET_TOTAL_USERS_COUNT', count: e }; }, clearUsers() { return { type: 'CLEAR_USERS' }; }, setCurrentPage(e) { return { type: 'SET_CURRENT_PAGE', currentPage: e }; }, toggleIsFetching(e) { return { type: 'TOGGLE_IS_FETCHING', isFetching: e }; }, toggleFollowingProgress(e, t) { return { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching: e, userID: t }; },
    }; var j = function (e, t, n) { return (function () { const a = Object(s.a)(r.a.mark((function a(s) { let c; return r.a.wrap(((a) => { for (;;) switch (a.prev = a.next) { case 0: return s(d.toggleIsFetching(!0)), a.next = 3, u.getUsers(e, t, n); case 3: c = a.sent, s(d.setUsers(c.items)), s(d.setTotalUsersCount(c.totalCount)), s(d.toggleIsFetching(!1)); case 7: case 'end': return a.stop(); } }), a); }))); return function (e) { return a.apply(this, arguments); }; }()); }; var p = function (e, t, n) { return (function () { const a = Object(s.a)(r.a.mark((function a(s) { let c; return r.a.wrap(((a) => { for (;;) switch (a.prev = a.next) { case 0: return s(d.toggleIsFetching(!0)), a.next = 3, u.getUsers(e, t, n); case 3: c = a.sent, s(d.clearUsers()), s(d.setFoundUsers(c.items)), s(d.setTotalUsersCount(c.totalCount)), s(d.toggleIsFetching(!1)); case 8: case 'end': return a.stop(); } }), a); }))); return function (e) { return a.apply(this, arguments); }; }()); }; var f = function (e, t, n) { const a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]; return (function () { const c = Object(s.a)(r.a.mark((function s(c) { let o; return r.a.wrap(((r) => { for (;;) switch (r.prev = r.next) { case 0: return c(d.toggleIsFetching(!0)), r.next = 3, u.getUsers(e, t, n, a); case 3: o = r.sent, c(d.setFriends(o.items)), c(d.setTotalUsersCount(o.totalCount)), c(d.toggleIsFetching(!1)); case 7: case 'end': return r.stop(); } }), s); }))); return function (e) { return c.apply(this, arguments); }; }()); }; const b = (function () { const e = Object(s.a)(r.a.mark((function e(t, n, a, s) { return r.a.wrap(((e) => { for (;;) switch (e.prev = e.next) { case 0: return t(d.toggleFollowingProgress(!0, n)), e.next = 3, a(n); case 3: e.sent.data.resultCode === i.b.Success && t(s(n)), t(d.toggleFollowingProgress(!1, n)); case 6: case 'end': return e.stop(); } }), e); }))); return function (t, n, a, r) { return e.apply(this, arguments); }; }()); var h = function (e) { return (function () { const t = Object(s.a)(r.a.mark((function t(n) { return r.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: b(n, e, u.followUser.bind(u), d.followSuccess); case 1: case 'end': return t.stop(); } }), t); }))); return function (e) { return t.apply(this, arguments); }; }()); }; var m = function (e) { return (function () { const t = Object(s.a)(r.a.mark((function t(n) { return r.a.wrap(((t) => { for (;;) switch (t.prev = t.next) { case 0: b(n, e, u.unfollowUser.bind(u), d.unfollowSuccess); case 1: case 'end': return t.stop(); } }), t); }))); return function (e) { return t.apply(this, arguments); }; }()); }; t.b = function () { const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) { case 'FOLLOW': return Object(o.a)(Object(o.a)({}, e), {}, { users: e.users.map(((e) => (e.id === t.userID ? Object(o.a)(Object(o.a)({}, e), {}, { followed: !0 }) : e))) }); case 'UNFOLLOW': return Object(o.a)(Object(o.a)({}, e), {}, { users: e.users.map(((e) => (e.id === t.userID ? Object(o.a)(Object(o.a)({}, e), {}, { followed: !1 }) : e))) }); case 'SET_USERS': return Object(o.a)(Object(o.a)({}, e), {}, { users: [].concat(Object(c.a)(e.users), Object(c.a)(t.users)), foundUsers: [] }); case 'CLEAR_USERS': return Object(o.a)(Object(o.a)({}, e), {}, { users: [] }); case 'SET_FRIENDS': return Object(o.a)(Object(o.a)({}, e), {}, { friends: t.friends }); case 'SET_FOUND_USERS': return Object(o.a)(Object(o.a)({}, e), {}, { users: [], foundUsers: t.foundUsers }); case 'SET_CURRENT_PAGE': return Object(o.a)(Object(o.a)({}, e), {}, { currentPage: t.currentPage }); case 'SET_TOTAL_USERS_COUNT': return Object(o.a)(Object(o.a)({}, e), {}, { totalUsersCount: t.count }); case 'TOGGLE_IS_FETCHING': return Object(o.a)(Object(o.a)({}, e), {}, { isFetching: t.isFetching }); case 'TOGGLE_IS_FOLLOWING_PROGRESS': return Object(o.a)(Object(o.a)({}, e), {}, { followingInProgress: t.isFetching ? [].concat(Object(c.a)(e.followingInProgress), [t.userID]) : e.followingInProgress.filter(((e) => e !== t.userID)) }); default: return e; } };
  },
  79(e, t, n) {
    t.a = `${n.p}static/media/no_photo.8bf0768a.svg`;
  },
  98(e, t, n) {
    e.exports = {
      wrapper: 'Users_wrapper__3Yevw', nothingFound: 'Users_nothingFound__2cse7', container: 'Users_container__gMpcS', user: 'Users_user__AVhKe', buttonLoadMore: 'Users_buttonLoadMore__1kZ2C',
    };
  },
  99(e, t, n) {
    e.exports = {
      fon: 'App_fon__Rn3Sm', container: 'App_container__2T05O', appWrapper: 'App_appWrapper__1hlCE', appWrapperContent: 'App_appWrapperContent__1C2YH',
    };
  },
}, [[366, 1, 2]]]);
// # sourceMappingURL=main.626db66e.chunk.js.map
