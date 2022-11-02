import kr, { useId as Se } from "react";
var Zr = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(t) {
  (function() {
    var e = {}.hasOwnProperty;
    function n() {
      for (var a = [], l = 0; l < arguments.length; l++) {
        var i = arguments[l];
        if (!!i) {
          var u = typeof i;
          if (u === "string" || u === "number")
            a.push(i);
          else if (Array.isArray(i)) {
            if (i.length) {
              var c = n.apply(null, i);
              c && a.push(c);
            }
          } else if (u === "object") {
            if (i.toString !== Object.prototype.toString && !i.toString.toString().includes("[native code]")) {
              a.push(i.toString());
              continue;
            }
            for (var f in i)
              e.call(i, f) && i[f] && a.push(f);
          }
        }
      }
      return a.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(Zr);
const Er = Zr.exports;
function _r() {
  return _r = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, _r.apply(this, arguments);
}
function Te(t) {
  if (t < 1)
    return {
      get: function() {
      },
      set: function() {
      }
    };
  var e = 0, n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function l(i, u) {
    n.set(i, u), e++, e > t && (e = 0, a = n, n = /* @__PURE__ */ new Map());
  }
  return {
    get: function(u) {
      var c = n.get(u);
      if (c !== void 0)
        return c;
      if ((c = a.get(u)) !== void 0)
        return l(u, c), c;
    },
    set: function(u, c) {
      n.has(u) ? n.set(u, c) : l(u, c);
    }
  };
}
var Sr = "-";
function Oe(t) {
  var e = Ie(t);
  function n(l) {
    var i = l.split(Sr);
    return i[0] === "" && i.length !== 1 && i.shift(), Qr(i, e) || je(l);
  }
  function a(l) {
    return t.conflictingClassGroups[l] || [];
  }
  return {
    getClassGroupId: n,
    getConflictingClassGroupIds: a
  };
}
function Qr(t, e) {
  var n;
  if (t.length === 0)
    return e.classGroupId;
  var a = t[0], l = e.nextPart.get(a), i = l ? Qr(t.slice(1), l) : void 0;
  if (i)
    return i;
  if (e.validators.length !== 0) {
    var u = t.join(Sr);
    return (n = e.validators.find(function(c) {
      var f = c.validator;
      return f(u);
    })) == null ? void 0 : n.classGroupId;
  }
}
var qr = /^\[(.+)\]$/;
function je(t) {
  if (qr.test(t)) {
    var e = qr.exec(t)[1], n = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}
function Ie(t) {
  var e = t.theme, n = t.prefix, a = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  }, l = Ae(Object.entries(t.classGroups), n);
  return l.forEach(function(i) {
    var u = i[0], c = i[1];
    Cr(c, a, u, e);
  }), a;
}
function Cr(t, e, n, a) {
  t.forEach(function(l) {
    if (typeof l == "string") {
      var i = l === "" ? e : Jr(e, l);
      i.classGroupId = n;
      return;
    }
    if (typeof l == "function") {
      if (Pe(l)) {
        Cr(l(a), e, n, a);
        return;
      }
      e.validators.push({
        validator: l,
        classGroupId: n
      });
      return;
    }
    Object.entries(l).forEach(function(u) {
      var c = u[0], f = u[1];
      Cr(f, Jr(e, c), n, a);
    });
  });
}
function Jr(t, e) {
  var n = t;
  return e.split(Sr).forEach(function(a) {
    n.nextPart.has(a) || n.nextPart.set(a, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(a);
  }), n;
}
function Pe(t) {
  return t.isThemeGetter;
}
function Ae(t, e) {
  return e ? t.map(function(n) {
    var a = n[0], l = n[1], i = l.map(function(u) {
      return typeof u == "string" ? e + u : typeof u == "object" ? Object.fromEntries(Object.entries(u).map(function(c) {
        var f = c[0], h = c[1];
        return [e + f, h];
      })) : u;
    });
    return [a, i];
  }) : t;
}
function ze(t) {
  return _r({
    cache: Te(t.cacheSize)
  }, Oe(t));
}
var $e = /\s+/, re = "!";
function Me(t, e) {
  var n = e.getClassGroupId, a = e.getConflictingClassGroupIds, l = /* @__PURE__ */ new Set();
  return t.trim().split($e).map(function(i) {
    var u = We(i), c = u.modifiers, f = u.hasImportantModifier, h = u.baseClassName, m = n(h);
    if (!m)
      return {
        isTailwindClass: !1,
        originalClassName: i
      };
    var y = Fe(c).join(""), R = f ? y + re : y;
    return {
      isTailwindClass: !0,
      modifierId: R,
      classGroupId: m,
      originalClassName: i
    };
  }).reverse().filter(function(i) {
    if (!i.isTailwindClass)
      return !0;
    var u = i.modifierId, c = i.classGroupId, f = u + c;
    return l.has(f) ? !1 : (l.add(f), a(c).forEach(function(h) {
      return l.add(u + h);
    }), !0);
  }).reverse().map(function(i) {
    return i.originalClassName;
  }).join(" ");
}
var Ge = /[:[\]]/g;
function We(t) {
  for (var e = [], n = 0, a = 0, l; l = Ge.exec(t); )
    if (l[0] === ":") {
      if (n === 0) {
        var i = l.index + 1;
        e.push(t.substring(a, i)), a = i;
      }
    } else
      l[0] === "[" ? n++ : l[0] === "]" && n--;
  var u = e.length === 0 ? t : t.substring(a), c = u.startsWith(re), f = c ? u.substring(1) : u;
  return {
    modifiers: e,
    hasImportantModifier: c,
    baseClassName: f
  };
}
function Fe(t) {
  if (t.length <= 1)
    return t;
  var e = [], n = [];
  return t.forEach(function(a) {
    var l = a[0] === "[";
    l ? (e.push.apply(e, n.sort().concat([a])), n = []) : n.push(a);
  }), e.push.apply(e, n.sort()), e;
}
function Ne() {
  for (var t = 0, e, n, a = ""; t < arguments.length; )
    (e = arguments[t++]) && (n = ee(e)) && (a && (a += " "), a += n);
  return a;
}
function ee(t) {
  if (typeof t == "string")
    return t;
  for (var e, n = "", a = 0; a < t.length; a++)
    t[a] && (e = ee(t[a])) && (n && (n += " "), n += e);
  return n;
}
function Ve() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var a, l, i, u = c;
  function c(h) {
    var m = e[0], y = e.slice(1), R = y.reduce(function(M, j) {
      return j(M);
    }, m());
    return a = ze(R), l = a.cache.get, i = a.cache.set, u = f, f(h);
  }
  function f(h) {
    var m = l(h);
    if (m)
      return m;
    var y = Me(h, a);
    return i(h, y), y;
  }
  return function() {
    return u(Ne.apply(null, arguments));
  };
}
function x(t) {
  var e = function(a) {
    return a[t] || [];
  };
  return e.isThemeGetter = !0, e;
}
var L = /^\[(.+)\]$/, De = /^\d+\/\d+$/, Le = /* @__PURE__ */ new Set(["px", "full", "screen"]), Ye = /^(\d+)?(xs|sm|md|lg|xl)$/, Ue = /\d+(%|px|em|rem|vh|vw|pt|pc|in|cm|mm|cap|ch|ex|lh|rlh|vi|vb|vmin|vmax)/, Be = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function $(t) {
  return !Number.isNaN(Number(t)) || Le.has(t) || De.test(t) || U(t);
}
function U(t) {
  var e, n = (e = L.exec(t)) == null ? void 0 : e[1];
  return n ? n.startsWith("length:") || Ue.test(n) : !1;
}
function qe(t) {
  var e, n = (e = L.exec(t)) == null ? void 0 : e[1];
  return n ? n.startsWith("size:") : !1;
}
function Je(t) {
  var e, n = (e = L.exec(t)) == null ? void 0 : e[1];
  return n ? n.startsWith("position:") : !1;
}
function Xe(t) {
  var e, n = (e = L.exec(t)) == null ? void 0 : e[1];
  return n ? n.startsWith("url(") || n.startsWith("url:") : !1;
}
function Ke(t) {
  var e, n = (e = L.exec(t)) == null ? void 0 : e[1];
  return n ? !Number.isNaN(Number(n)) || n.startsWith("number:") : !1;
}
function S(t) {
  var e, n = (e = L.exec(t)) == null ? void 0 : e[1];
  return n ? Number.isInteger(Number(n)) : Number.isInteger(Number(t));
}
function C(t) {
  return L.test(t);
}
function tr() {
  return !0;
}
function D(t) {
  return Ye.test(t);
}
function He(t) {
  var e, n = (e = L.exec(t)) == null ? void 0 : e[1];
  return n ? Be.test(n) : !1;
}
function Ze() {
  var t = x("colors"), e = x("spacing"), n = x("blur"), a = x("brightness"), l = x("borderColor"), i = x("borderRadius"), u = x("borderSpacing"), c = x("borderWidth"), f = x("contrast"), h = x("grayscale"), m = x("hueRotate"), y = x("invert"), R = x("gap"), M = x("gradientColorStops"), j = x("inset"), W = x("margin"), G = x("opacity"), T = x("padding"), _ = x("saturate"), H = x("scale"), ar = x("sepia"), ir = x("skew"), sr = x("space"), lr = x("translate"), Z = function() {
    return ["auto", "contain", "none"];
  }, B = function() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  }, Q = function() {
    return ["auto", e];
  }, ur = function() {
    return ["", $];
  }, Y = function() {
    return ["auto", S];
  }, I = function() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  }, P = function() {
    return ["solid", "dashed", "dotted", "double", "none"];
  }, N = function() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  }, q = function() {
    return ["start", "end", "center", "between", "around", "evenly"];
  }, V = function() {
    return ["", "0", C];
  }, rr = function() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [tr],
      spacing: [$],
      blur: ["none", "", D, U],
      brightness: [S],
      borderColor: [t],
      borderRadius: ["none", "", "full", D, U],
      borderSpacing: [e],
      borderWidth: ur(),
      contrast: [S],
      grayscale: V(),
      hueRotate: [S],
      invert: V(),
      gap: [e],
      gradientColorStops: [t],
      inset: Q(),
      margin: Q(),
      opacity: [S],
      padding: [e],
      saturate: [S],
      scale: [S],
      sepia: V(),
      skew: [S, C],
      space: [e],
      translate: [e]
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", C]
      }],
      container: ["container"],
      columns: [{
        columns: [D]
      }],
      "break-after": [{
        "break-after": rr()
      }],
      "break-before": [{
        "break-before": rr()
      }],
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      box: [{
        box: ["border", "content"]
      }],
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      float: [{
        float: ["right", "left", "none"]
      }],
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      "object-position": [{
        object: [].concat(I(), [C])
      }],
      overflow: [{
        overflow: B()
      }],
      "overflow-x": [{
        "overflow-x": B()
      }],
      "overflow-y": [{
        "overflow-y": B()
      }],
      overscroll: [{
        overscroll: Z()
      }],
      "overscroll-x": [{
        "overscroll-x": Z()
      }],
      "overscroll-y": [{
        "overscroll-y": Z()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [j]
      }],
      "inset-x": [{
        "inset-x": [j]
      }],
      "inset-y": [{
        "inset-y": [j]
      }],
      top: [{
        top: [j]
      }],
      right: [{
        right: [j]
      }],
      bottom: [{
        bottom: [j]
      }],
      left: [{
        left: [j]
      }],
      visibility: ["visible", "invisible"],
      z: [{
        z: [S]
      }],
      basis: [{
        basis: [e]
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      flex: [{
        flex: ["1", "auto", "initial", "none", C]
      }],
      grow: [{
        grow: V()
      }],
      shrink: [{
        shrink: V()
      }],
      order: [{
        order: ["first", "last", "none", S]
      }],
      "grid-cols": [{
        "grid-cols": [tr]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: [S]
        }]
      }],
      "col-start": [{
        "col-start": Y()
      }],
      "col-end": [{
        "col-end": Y()
      }],
      "grid-rows": [{
        "grid-rows": [tr]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [S]
        }]
      }],
      "row-start": [{
        "row-start": Y()
      }],
      "row-end": [{
        "row-end": Y()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", C]
      }],
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", C]
      }],
      gap: [{
        gap: [R]
      }],
      "gap-x": [{
        "gap-x": [R]
      }],
      "gap-y": [{
        "gap-y": [R]
      }],
      "justify-content": [{
        justify: q()
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: q()
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [].concat(q(), ["stretch"])
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [T]
      }],
      px: [{
        px: [T]
      }],
      py: [{
        py: [T]
      }],
      pt: [{
        pt: [T]
      }],
      pr: [{
        pr: [T]
      }],
      pb: [{
        pb: [T]
      }],
      pl: [{
        pl: [T]
      }],
      m: [{
        m: [W]
      }],
      mx: [{
        mx: [W]
      }],
      my: [{
        my: [W]
      }],
      mt: [{
        mt: [W]
      }],
      mr: [{
        mr: [W]
      }],
      mb: [{
        mb: [W]
      }],
      ml: [{
        ml: [W]
      }],
      "space-x": [{
        "space-x": [sr]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [sr]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", e]
      }],
      "min-w": [{
        "min-w": ["min", "max", "fit", $]
      }],
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [D]
        }, D, U]
      }],
      h: [{
        h: Q()
      }],
      "min-h": [{
        "min-h": ["min", "max", "fit", $]
      }],
      "max-h": [{
        "max-h": [e, "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", D, U]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ke]
      }],
      "font-family": [{
        font: [tr]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", U]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", $]
      }],
      "list-style-type": [{
        list: ["none", "disc", "decimal", C]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "placeholder-color": [{
        placeholder: [t]
      }],
      "placeholder-opacity": [{
        "placeholder-opacity": [G]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [t]
      }],
      "text-opacity": [{
        "text-opacity": [G]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [].concat(P(), ["wavy"])
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", $]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", $]
      }],
      "text-decoration-color": [{
        decoration: [t]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      indent: [{
        indent: [e]
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", U]
      }],
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap"]
      }],
      break: [{
        break: ["normal", "words", "all"]
      }],
      content: [{
        content: ["none", C]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-opacity": [{
        "bg-opacity": [G]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [].concat(I(), [Je])
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", qe]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Xe]
      }],
      "bg-color": [{
        bg: [t]
      }],
      "gradient-from": [{
        from: [M]
      }],
      "gradient-via": [{
        via: [M]
      }],
      "gradient-to": [{
        to: [M]
      }],
      rounded: [{
        rounded: [i]
      }],
      "rounded-t": [{
        "rounded-t": [i]
      }],
      "rounded-r": [{
        "rounded-r": [i]
      }],
      "rounded-b": [{
        "rounded-b": [i]
      }],
      "rounded-l": [{
        "rounded-l": [i]
      }],
      "rounded-tl": [{
        "rounded-tl": [i]
      }],
      "rounded-tr": [{
        "rounded-tr": [i]
      }],
      "rounded-br": [{
        "rounded-br": [i]
      }],
      "rounded-bl": [{
        "rounded-bl": [i]
      }],
      "border-w": [{
        border: [c]
      }],
      "border-w-x": [{
        "border-x": [c]
      }],
      "border-w-y": [{
        "border-y": [c]
      }],
      "border-w-t": [{
        "border-t": [c]
      }],
      "border-w-r": [{
        "border-r": [c]
      }],
      "border-w-b": [{
        "border-b": [c]
      }],
      "border-w-l": [{
        "border-l": [c]
      }],
      "border-opacity": [{
        "border-opacity": [G]
      }],
      "border-style": [{
        border: [].concat(P(), ["hidden"])
      }],
      "divide-x": [{
        "divide-x": [c]
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": [c]
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{
        "divide-opacity": [G]
      }],
      "divide-style": [{
        divide: P()
      }],
      "border-color": [{
        border: [l]
      }],
      "border-color-x": [{
        "border-x": [l]
      }],
      "border-color-y": [{
        "border-y": [l]
      }],
      "border-color-t": [{
        "border-t": [l]
      }],
      "border-color-r": [{
        "border-r": [l]
      }],
      "border-color-b": [{
        "border-b": [l]
      }],
      "border-color-l": [{
        "border-l": [l]
      }],
      "divide-color": [{
        divide: [l]
      }],
      "outline-style": [{
        outline: [""].concat(P(), ["hidden"])
      }],
      "outline-offset": [{
        "outline-offset": [$]
      }],
      "outline-w": [{
        outline: [$]
      }],
      "outline-color": [{
        outline: [t]
      }],
      "ring-w": [{
        ring: ur()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [t]
      }],
      "ring-opacity": [{
        "ring-opacity": [G]
      }],
      "ring-offset-w": [{
        "ring-offset": [$]
      }],
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      shadow: [{
        shadow: ["", "inner", "none", D, He]
      }],
      "shadow-color": [{
        shadow: [tr]
      }],
      opacity: [{
        opacity: [G]
      }],
      "mix-blend": [{
        "mix-blend": N()
      }],
      "bg-blend": [{
        "bg-blend": N()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [n]
      }],
      brightness: [{
        brightness: [a]
      }],
      contrast: [{
        contrast: [f]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", D, C]
      }],
      grayscale: [{
        grayscale: [h]
      }],
      "hue-rotate": [{
        "hue-rotate": [m]
      }],
      invert: [{
        invert: [y]
      }],
      saturate: [{
        saturate: [_]
      }],
      sepia: [{
        sepia: [ar]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [a]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [f]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [h]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [m]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [y]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [G]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [_]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [ar]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [u]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [u]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [u]
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", C]
      }],
      duration: [{
        duration: [S]
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", C]
      }],
      delay: [{
        delay: [S]
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", C]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [H]
      }],
      "scale-x": [{
        "scale-x": [H]
      }],
      "scale-y": [{
        "scale-y": [H]
      }],
      rotate: [{
        rotate: [S, C]
      }],
      "translate-x": [{
        "translate-x": [lr]
      }],
      "translate-y": [{
        "translate-y": [lr]
      }],
      "skew-x": [{
        "skew-x": [ir]
      }],
      "skew-y": [{
        "skew-y": [ir]
      }],
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", C]
      }],
      accent: [{
        accent: ["auto", t]
      }],
      appearance: ["appearance-none"],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", C]
      }],
      "caret-color": [{
        caret: [t]
      }],
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      "scroll-m": [{
        "scroll-m": [e]
      }],
      "scroll-mx": [{
        "scroll-mx": [e]
      }],
      "scroll-my": [{
        "scroll-my": [e]
      }],
      "scroll-mt": [{
        "scroll-mt": [e]
      }],
      "scroll-mr": [{
        "scroll-mr": [e]
      }],
      "scroll-mb": [{
        "scroll-mb": [e]
      }],
      "scroll-ml": [{
        "scroll-ml": [e]
      }],
      "scroll-p": [{
        "scroll-p": [e]
      }],
      "scroll-px": [{
        "scroll-px": [e]
      }],
      "scroll-py": [{
        "scroll-py": [e]
      }],
      "scroll-pt": [{
        "scroll-pt": [e]
      }],
      "scroll-pr": [{
        "scroll-pr": [e]
      }],
      "scroll-pb": [{
        "scroll-pb": [e]
      }],
      "scroll-pl": [{
        "scroll-pl": [e]
      }],
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", C]
      }],
      fill: [{
        fill: [t]
      }],
      "stroke-w": [{
        stroke: [$]
      }],
      stroke: [{
        stroke: [t]
      }],
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      "col-start-end": ["col-start", "col-end"],
      "row-start-end": ["row-start", "row-end"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    }
  };
}
var Qe = /* @__PURE__ */ Ve(Ze);
const K = {
  weight: {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black"
  },
  size: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl"
  },
  decoration: {
    lineThrough: "line-through",
    underline: "underline",
    uppercase: "uppercase"
  },
  leading: {
    none: "leading-none",
    normal: "leading-normal",
    loose: "leading-loose"
  }
};
var Tr = { exports: {} }, nr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xr;
function rt() {
  if (Xr)
    return nr;
  Xr = 1;
  var t = kr, e = Symbol.for("react.element"), n = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, l = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(c, f, h) {
    var m, y = {}, R = null, M = null;
    h !== void 0 && (R = "" + h), f.key !== void 0 && (R = "" + f.key), f.ref !== void 0 && (M = f.ref);
    for (m in f)
      a.call(f, m) && !i.hasOwnProperty(m) && (y[m] = f[m]);
    if (c && c.defaultProps)
      for (m in f = c.defaultProps, f)
        y[m] === void 0 && (y[m] = f[m]);
    return { $$typeof: e, type: c, key: R, ref: M, props: y, _owner: l.current };
  }
  return nr.Fragment = n, nr.jsx = u, nr.jsxs = u, nr;
}
var or = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kr;
function et() {
  return Kr || (Kr = 1, process.env.NODE_ENV !== "production" && function() {
    var t = kr, e = Symbol.for("react.element"), n = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), c = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), j = Symbol.iterator, W = "@@iterator";
    function G(r) {
      if (r === null || typeof r != "object")
        return null;
      var o = j && r[j] || r[W];
      return typeof o == "function" ? o : null;
    }
    var T = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(r) {
      {
        for (var o = arguments.length, s = new Array(o > 1 ? o - 1 : 0), d = 1; d < o; d++)
          s[d - 1] = arguments[d];
        H("error", r, s);
      }
    }
    function H(r, o, s) {
      {
        var d = T.ReactDebugCurrentFrame, g = d.getStackAddendum();
        g !== "" && (o += "%s", s = s.concat([g]));
        var b = s.map(function(v) {
          return String(v);
        });
        b.unshift("Warning: " + o), Function.prototype.apply.call(console[r], console, b);
      }
    }
    var ar = !1, ir = !1, sr = !1, lr = !1, Z = !1, B;
    B = Symbol.for("react.module.reference");
    function Q(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === a || r === i || Z || r === l || r === h || r === m || lr || r === M || ar || ir || sr || typeof r == "object" && r !== null && (r.$$typeof === R || r.$$typeof === y || r.$$typeof === u || r.$$typeof === c || r.$$typeof === f || r.$$typeof === B || r.getModuleId !== void 0));
    }
    function ur(r, o, s) {
      var d = r.displayName;
      if (d)
        return d;
      var g = o.displayName || o.name || "";
      return g !== "" ? s + "(" + g + ")" : s;
    }
    function Y(r) {
      return r.displayName || "Context";
    }
    function I(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case a:
          return "Fragment";
        case n:
          return "Portal";
        case i:
          return "Profiler";
        case l:
          return "StrictMode";
        case h:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case c:
            var o = r;
            return Y(o) + ".Consumer";
          case u:
            var s = r;
            return Y(s._context) + ".Provider";
          case f:
            return ur(r, r.render, "ForwardRef");
          case y:
            var d = r.displayName || null;
            return d !== null ? d : I(r.type) || "Memo";
          case R: {
            var g = r, b = g._payload, v = g._init;
            try {
              return I(v(b));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, N = 0, q, V, rr, O, Or, jr, Ir;
    function Pr() {
    }
    Pr.__reactDisabledLog = !0;
    function te() {
      {
        if (N === 0) {
          q = console.log, V = console.info, rr = console.warn, O = console.error, Or = console.group, jr = console.groupCollapsed, Ir = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: Pr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        N++;
      }
    }
    function ne() {
      {
        if (N--, N === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, r, {
              value: q
            }),
            info: P({}, r, {
              value: V
            }),
            warn: P({}, r, {
              value: rr
            }),
            error: P({}, r, {
              value: O
            }),
            group: P({}, r, {
              value: Or
            }),
            groupCollapsed: P({}, r, {
              value: jr
            }),
            groupEnd: P({}, r, {
              value: Ir
            })
          });
        }
        N < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var gr = T.ReactCurrentDispatcher, br;
    function cr(r, o, s) {
      {
        if (br === void 0)
          try {
            throw Error();
          } catch (g) {
            var d = g.stack.trim().match(/\n( *(at )?)/);
            br = d && d[1] || "";
          }
        return `
` + br + r;
      }
    }
    var mr = !1, dr;
    {
      var oe = typeof WeakMap == "function" ? WeakMap : Map;
      dr = new oe();
    }
    function Ar(r, o) {
      if (!r || mr)
        return "";
      {
        var s = dr.get(r);
        if (s !== void 0)
          return s;
      }
      var d;
      mr = !0;
      var g = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var b;
      b = gr.current, gr.current = null, te();
      try {
        if (o) {
          var v = function() {
            throw Error();
          };
          if (Object.defineProperty(v.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(v, []);
            } catch (F) {
              d = F;
            }
            Reflect.construct(r, [], v);
          } else {
            try {
              v.call();
            } catch (F) {
              d = F;
            }
            r.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            d = F;
          }
          r();
        }
      } catch (F) {
        if (F && d && typeof F.stack == "string") {
          for (var p = F.stack.split(`
`), k = d.stack.split(`
`), w = p.length - 1, E = k.length - 1; w >= 1 && E >= 0 && p[w] !== k[E]; )
            E--;
          for (; w >= 1 && E >= 0; w--, E--)
            if (p[w] !== k[E]) {
              if (w !== 1 || E !== 1)
                do
                  if (w--, E--, E < 0 || p[w] !== k[E]) {
                    var A = `
` + p[w].replace(" at new ", " at ");
                    return r.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", r.displayName)), typeof r == "function" && dr.set(r, A), A;
                  }
                while (w >= 1 && E >= 0);
              break;
            }
        }
      } finally {
        mr = !1, gr.current = b, ne(), Error.prepareStackTrace = g;
      }
      var X = r ? r.displayName || r.name : "", Br = X ? cr(X) : "";
      return typeof r == "function" && dr.set(r, Br), Br;
    }
    function ae(r, o, s) {
      return Ar(r, !1);
    }
    function ie(r) {
      var o = r.prototype;
      return !!(o && o.isReactComponent);
    }
    function fr(r, o, s) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return Ar(r, ie(r));
      if (typeof r == "string")
        return cr(r);
      switch (r) {
        case h:
          return cr("Suspense");
        case m:
          return cr("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case f:
            return ae(r.render);
          case y:
            return fr(r.type, o, s);
          case R: {
            var d = r, g = d._payload, b = d._init;
            try {
              return fr(b(g), o, s);
            } catch {
            }
          }
        }
      return "";
    }
    var pr = Object.prototype.hasOwnProperty, zr = {}, $r = T.ReactDebugCurrentFrame;
    function vr(r) {
      if (r) {
        var o = r._owner, s = fr(r.type, r._source, o ? o.type : null);
        $r.setExtraStackFrame(s);
      } else
        $r.setExtraStackFrame(null);
    }
    function se(r, o, s, d, g) {
      {
        var b = Function.call.bind(pr);
        for (var v in r)
          if (b(r, v)) {
            var p = void 0;
            try {
              if (typeof r[v] != "function") {
                var k = Error((d || "React class") + ": " + s + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw k.name = "Invariant Violation", k;
              }
              p = r[v](o, v, d, s, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (w) {
              p = w;
            }
            p && !(p instanceof Error) && (vr(g), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", s, v, typeof p), vr(null)), p instanceof Error && !(p.message in zr) && (zr[p.message] = !0, vr(g), _("Failed %s type: %s", s, p.message), vr(null));
          }
      }
    }
    var le = Array.isArray;
    function hr(r) {
      return le(r);
    }
    function ue(r) {
      {
        var o = typeof Symbol == "function" && Symbol.toStringTag, s = o && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return s;
      }
    }
    function ce(r) {
      try {
        return Mr(r), !1;
      } catch {
        return !0;
      }
    }
    function Mr(r) {
      return "" + r;
    }
    function Gr(r) {
      if (ce(r))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ue(r)), Mr(r);
    }
    var er = T.ReactCurrentOwner, de = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Wr, Fr, xr;
    xr = {};
    function fe(r) {
      if (pr.call(r, "ref")) {
        var o = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (o && o.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function pe(r) {
      if (pr.call(r, "key")) {
        var o = Object.getOwnPropertyDescriptor(r, "key").get;
        if (o && o.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function ve(r, o) {
      if (typeof r.ref == "string" && er.current && o && er.current.stateNode !== o) {
        var s = I(er.current.type);
        xr[s] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(er.current.type), r.ref), xr[s] = !0);
      }
    }
    function ge(r, o) {
      {
        var s = function() {
          Wr || (Wr = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        s.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: s,
          configurable: !0
        });
      }
    }
    function be(r, o) {
      {
        var s = function() {
          Fr || (Fr = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        s.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: s,
          configurable: !0
        });
      }
    }
    var me = function(r, o, s, d, g, b, v) {
      var p = {
        $$typeof: e,
        type: r,
        key: o,
        ref: s,
        props: v,
        _owner: b
      };
      return p._store = {}, Object.defineProperty(p._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(p, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.defineProperty(p, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
    };
    function he(r, o, s, d, g) {
      {
        var b, v = {}, p = null, k = null;
        s !== void 0 && (Gr(s), p = "" + s), pe(o) && (Gr(o.key), p = "" + o.key), fe(o) && (k = o.ref, ve(o, g));
        for (b in o)
          pr.call(o, b) && !de.hasOwnProperty(b) && (v[b] = o[b]);
        if (r && r.defaultProps) {
          var w = r.defaultProps;
          for (b in w)
            v[b] === void 0 && (v[b] = w[b]);
        }
        if (p || k) {
          var E = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          p && ge(v, E), k && be(v, E);
        }
        return me(r, p, k, g, d, er.current, v);
      }
    }
    var yr = T.ReactCurrentOwner, Nr = T.ReactDebugCurrentFrame;
    function J(r) {
      if (r) {
        var o = r._owner, s = fr(r.type, r._source, o ? o.type : null);
        Nr.setExtraStackFrame(s);
      } else
        Nr.setExtraStackFrame(null);
    }
    var wr;
    wr = !1;
    function Rr(r) {
      return typeof r == "object" && r !== null && r.$$typeof === e;
    }
    function Vr() {
      {
        if (yr.current) {
          var r = I(yr.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function xe(r) {
      {
        if (r !== void 0) {
          var o = r.fileName.replace(/^.*[\\\/]/, ""), s = r.lineNumber;
          return `

Check your code at ` + o + ":" + s + ".";
        }
        return "";
      }
    }
    var Dr = {};
    function ye(r) {
      {
        var o = Vr();
        if (!o) {
          var s = typeof r == "string" ? r : r.displayName || r.name;
          s && (o = `

Check the top-level render call using <` + s + ">.");
        }
        return o;
      }
    }
    function Lr(r, o) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var s = ye(o);
        if (Dr[s])
          return;
        Dr[s] = !0;
        var d = "";
        r && r._owner && r._owner !== yr.current && (d = " It was passed a child from " + I(r._owner.type) + "."), J(r), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', s, d), J(null);
      }
    }
    function Yr(r, o) {
      {
        if (typeof r != "object")
          return;
        if (hr(r))
          for (var s = 0; s < r.length; s++) {
            var d = r[s];
            Rr(d) && Lr(d, o);
          }
        else if (Rr(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var g = G(r);
          if (typeof g == "function" && g !== r.entries)
            for (var b = g.call(r), v; !(v = b.next()).done; )
              Rr(v.value) && Lr(v.value, o);
        }
      }
    }
    function we(r) {
      {
        var o = r.type;
        if (o == null || typeof o == "string")
          return;
        var s;
        if (typeof o == "function")
          s = o.propTypes;
        else if (typeof o == "object" && (o.$$typeof === f || o.$$typeof === y))
          s = o.propTypes;
        else
          return;
        if (s) {
          var d = I(o);
          se(s, r.props, "prop", d, r);
        } else if (o.PropTypes !== void 0 && !wr) {
          wr = !0;
          var g = I(o);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", g || "Unknown");
        }
        typeof o.getDefaultProps == "function" && !o.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Re(r) {
      {
        for (var o = Object.keys(r.props), s = 0; s < o.length; s++) {
          var d = o[s];
          if (d !== "children" && d !== "key") {
            J(r), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), J(null);
            break;
          }
        }
        r.ref !== null && (J(r), _("Invalid attribute `ref` supplied to `React.Fragment`."), J(null));
      }
    }
    function Ur(r, o, s, d, g, b) {
      {
        var v = Q(r);
        if (!v) {
          var p = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var k = xe(g);
          k ? p += k : p += Vr();
          var w;
          r === null ? w = "null" : hr(r) ? w = "array" : r !== void 0 && r.$$typeof === e ? (w = "<" + (I(r.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : w = typeof r, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", w, p);
        }
        var E = he(r, o, s, g, b);
        if (E == null)
          return E;
        if (v) {
          var A = o.children;
          if (A !== void 0)
            if (d)
              if (hr(A)) {
                for (var X = 0; X < A.length; X++)
                  Yr(A[X], r);
                Object.freeze && Object.freeze(A);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Yr(A, r);
        }
        return r === a ? Re(E) : we(E), E;
      }
    }
    function Ee(r, o, s) {
      return Ur(r, o, s, !0);
    }
    function _e(r, o, s) {
      return Ur(r, o, s, !1);
    }
    var Ce = _e, ke = Ee;
    or.Fragment = a, or.jsx = Ce, or.jsxs = ke;
  }()), or;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = rt() : t.exports = et();
})(Tr);
const Hr = Tr.exports.jsx, tt = Tr.exports.jsxs, z = {
  disabled: "cursor-not-allowed",
  pill: "rounded-full",
  size: {
    xs: `${K.size.xs} px-3 py-2`,
    sm: `${K.size.sm} px-3 py-2`,
    md: `${K.size.base} px-5 py-2.5`,
    lg: `${K.size.lg} px-5 py-3`,
    xl: `${K.size.xl} px-6 py-3.5`
  },
  color: {
    default: "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 focus:text-gray-900 focus:ring-2 focus:ring-gray-100",
    primary: "bg-blue-600 text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-500",
    danger: "bg-red-500 text-white hover:bg-red-800 focus:ring-2 focus:ring-red-300",
    success: "bg-green-500 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-300"
  },
  outline: {
    default: "bg-white text-gray-800 ring-1 ring-gray-900 hover:bg-gray-800 hover:text-white focus:ring-1 focus:ring-gray-200 dark:ring-white",
    primary: "bg-white ring-1 ring-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-300",
    danger: "text-red-600 ring-1 ring-red-600 hover:bg-red-700 hover:text-white focus:ring-2 focus:ring-red-300",
    success: "text-green-500 ring-1 ring-green-500  hover:bg-green-500 hover:text-white focus:ring-2 focus:ring-green-300"
  },
  startIcon: {
    xs: "mr-[10.4px]",
    sm: "mr-[10.4px]",
    md: "mr-[11px]",
    lg: "mr-[15px]",
    xl: "mr-[15px]"
  },
  endIcon: {
    xs: "ml-[10.4px]",
    sm: "ml-[10.4px]",
    md: "ml-[11px]",
    lg: "ml-[15px]",
    xl: "ml-[15px]"
  }
}, nt = kr.forwardRef(({
  children: t,
  id: e,
  size: n = "md",
  color: a,
  disabled: l,
  outline: i,
  startIcon: u,
  endIcon: c,
  className: f,
  ...h
}, m) => {
  const y = Se(), R = e || y;
  return /* @__PURE__ */ tt("button", {
    ref: m,
    id: R,
    "data-testid": `button-${R}`,
    disabled: l,
    className: Qe(Er("flex flex-row items-center justify-center", `${K.weight.medium}`, `${z.size[n]}`, "rounded-lg focus:outline-none select-none", {
      [z.color.primary]: a === "primary" && !i,
      [z.outline.primary]: i && a === "primary",
      [z.color.default]: a === void 0 && !i || a === "default" && !i,
      [z.outline.default]: a === void 0 && i || a === "default" && i,
      [z.color.danger]: a === "danger" && !i,
      [z.outline.danger]: a === "danger" && i,
      [z.color.success]: a === "success" && !i,
      [z.outline.success]: a === "success" && i,
      [z.disabled]: l,
      "dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-2 dark:focus:ring-gray-400": i
    }), f),
    ...h,
    children: [u && /* @__PURE__ */ Hr("span", {
      className: Er(z.startIcon[n]),
      "data-testid": `button-icon-start-${R}`,
      children: u
    }), t, c && /* @__PURE__ */ Hr("span", {
      className: Er(z.endIcon[n]),
      "data-testid": `button-icon-end-${R}`,
      children: c
    })]
  });
});
nt.displayName = "Button";
export {
  nt as Button,
  z as classes
};
