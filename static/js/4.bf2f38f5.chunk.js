(this.webpackJsonpsocial_network = this.webpackJsonpsocial_network || []).push([[4], {
  411(e, s, t) {
    const r = t(48); const n = t(49); Object.defineProperty(s, '__esModule', { value: !0 }), s.default = void 0; const o = n(t(0)); const a = (0, r(t(50)).default)(o.createElement('path', { d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' }), 'ExpandMore'); s.default = a;
  },
  413(e, s, t) {
    t.r(s); const r = t(111); const n = t(112); const o = t(115); const a = t(114); const u = t(0); const i = t.n(u); const l = t(21); const c = t(13); const g = t(76); const p = function (e) { return e.usersPage.users; }; const d = function (e) { return e.usersPage.pageSize; }; const h = function (e) { return e.usersPage.totalUsersCount; }; const f = function (e) { return e.usersPage.currentPage; }; const j = function (e) { return e.usersPage.isFetching; }; const U = function (e) { return e.usersPage.followingInProgress; }; const b = t(91); const P = t(183); const w = t(187); const O = t(98); const v = t.n(O); const C = t(401); const m = t(411); const x = t.n(m); const z = t(1); const F = function (e) {
      const s = Object(u.useState)(1); const t = Object(b.a)(s, 2); let r = t[0]; const n = t[1]; return Object(z.jsxs)('div', {
        className: v.a.wrapper,
        children: [Object(z.jsx)(w.a, { onPageChanged(s, t) { e.getFoundUsers(s, e.pageSize, t); }, totalUsersCount: e.totalUsersCount }), e.totalUsersCount === 0 && !e.isFetching && Object(z.jsx)('div', { className: v.a.nothingFound, children: 'Nothing found' }), Object(z.jsxs)('div', {
          className: v.a.container,
          children: [(e.users.length > 0 ? e.users : e.foundUsers).map(((s) => Object(z.jsx)('div', {
            className: v.a.user,
            children: Object(z.jsx)(P.a, {
              id: s.id, photo: s.photos.small, name: s.name, status: s.status, followed: s.followed, unfollow: e.unfollow, follow: e.follow, followingInProgress: e.followingInProgress, authorizedUserID: e.authorizedUserID,
            }),
          }, s.id))), Object(z.jsx)('div', { className: v.a.buttonLoadMore, children: Object(z.jsx)(C.a, { 'aria-label': 'load more users', onClick() { n(++r), e.onPageChanged(r, ''); }, children: Object(z.jsx)(x.a, {}) }) })],
        })],
      });
    }; const I = t(58); const k = t(108); const S = (function (e) {
      Object(o.a)(t, e); const s = Object(a.a)(t); function t() { let e; Object(r.a)(this, t); for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)o[a] = arguments[a]; return (e = s.call.apply(s, [this].concat(o))).onPageChanged = function (s, t) { e.props.getUsers(s, e.props.pageSize, t), e.props.setCurrentPage(s); }, e; } return Object(n.a)(t, [{ key: 'componentDidMount', value() { const e = this.props; const s = e.currentPage; const t = e.pageSize; this.props.getUsers(s, t, ''); } }, { key: 'componentWillUnmount', value() { this.props.clearUsers(), this.props.setCurrentPage(1); } }, {
        key: 'render',
        value() {
          return Object(z.jsxs)(z.Fragment, {
            children: [this.props.isFetching ? Object(z.jsx)(I.a, {}) : null, Object(z.jsx)(F, {
              users: this.props.users, foundUsers: this.props.foundUsers, pageSize: this.props.pageSize, totalUsersCount: this.props.totalUsersCount, isFetching: this.props.isFetching, followingInProgress: this.props.followingInProgress, authorizedUserID: this.props.authorizedUserID, onPageChanged: this.onPageChanged, follow: this.props.follow, unfollow: this.props.unfollow, getFoundUsers: this.props.getFoundUsers,
            })],
          });
        },
      }]), t;
    }(i.a.Component)); s.default = Object(c.d)(Object(l.b)(((e) => ({
      users: p(e), foundUsers: e.usersPage.foundUsers, pageSize: d(e), totalUsersCount: h(e), currentPage: f(e), isFetching: j(e), followingInProgress: U(e), authorizedUserID: e.auth.userID,
    })), {
      setCurrentPage: g.a.setCurrentPage, clearUsers: g.a.clearUsers, follow: g.c, unfollow: g.g, getFoundUsers: g.d, getUsers: g.f,
    }), k.a)(S);
  },
}]);
// # sourceMappingURL=4.bf2f38f5.chunk.js.map
