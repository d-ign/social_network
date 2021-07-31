(this.webpackJsonpsocial_network = this.webpackJsonpsocial_network || []).push([[3], {
  409(e, a, s) {
    e.exports = {
      container: 'Dialogs_container__KlA9W', items: 'Dialogs_items__ynFSW', dialogs: 'Dialogs_dialogs__1YIzW', message: 'Dialogs_message__D3bS7', wrapSendAndButton: 'Dialogs_wrapSendAndButton__23pJv',
    };
  },
  410(e, a, s) {
    const t = s(48); const n = s(49); Object.defineProperty(a, '__esModule', { value: !0 }), a.default = void 0; const i = n(s(0)); const o = (0, t(s(50)).default)(i.createElement('path', { d: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' }), 'Send'); a.default = o;
  },
  412(e, a, s) {
    s.r(a); const t = s(21); const n = s(13); const i = s(161); const o = s(108); const r = (s(0), s(184)); const c = s(185); const d = s(32); const l = s(409); const m = s.n(l); const u = s(1); const g = function (e) {
      const a = `/dialogs/${e.id}`; return Object(u.jsx)(d.b, {
        className: m.a.active, to: a, style: { color: 'white' }, children: e.name,
      });
    }; const j = function (e) { return Object(u.jsx)('div', { className: m.a.message, style: { overflowWrap: 'break-word', width: '400px', marginBottom: 20 }, children: e.text }); }; const b = s(40); const p = s(204); const x = s(410); const f = s.n(x); const h = Object(c.a)({ form: 'dialogAddMessageForm' })(((e) => {
      const a = e.handleSubmit; return Object(u.jsx)('form', {
        onSubmit: a,
        children: Object(u.jsxs)('div', {
          className: m.a.wrapSendAndButton,
          children: [Object(u.jsx)(r.a, {
            component: b.a, name: 'newMessageText', placeholder: 'Enter your message...', multiline: !0, fullWidth: !0, variant: 'outlined', inputProps: { maxLength: 1e3 },
          }), Object(u.jsx)(p.a, {
            type: 'submit', variant: 'contained', color: 'primary', style: { color: 'white', marginLeft: '10px' }, endIcon: Object(u.jsx)(f.a, {}), children: 'Send',
          })],
        }),
      });
    })); const v = function (e) { const a = e.dialogs.map(((e) => Object(u.jsx)(g, { name: e.name, id: e.id }, e.id))); const s = e.messages.map(((e) => Object(u.jsx)(j, { text: e.message }, e.id))); return Object(u.jsx)('div', { className: m.a.containerMain, children: Object(u.jsxs)('div', { className: m.a.container, children: [Object(u.jsx)('div', { className: m.a.items, children: a }), Object(u.jsxs)('div', { className: m.a.dialogs, children: [s, Object(u.jsx)(h, { onSubmit(a) { e.sendMessage(a.newMessageText); } })] })] }) }); }; a.default = Object(n.d)(Object(t.b)(((e) => ({ dialogs: e.messagesPage.dialogs, messages: e.messagesPage.messages })), { sendMessage: i.a.sendMessage }), o.a)(v);
  },
}]);
// # sourceMappingURL=3.e5d3b6ef.chunk.js.map
