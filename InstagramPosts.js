"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Instagram = require("./utils/Instagram");

var _Helpers = require("./utils/Helpers");

require("./styles/main.scss");

var _typography = _interopRequireDefault(require("typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var typography = new _typography.default({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  googleFonts: [{
    name: 'Montserrat',
    styles: ['700']
  }, {
    name: 'Merriweather',
    styles: ['400', '400i', '700', '700i']
  }],
  bodyFontFamily: ['Montserrat', 'serif']
}); // Output CSS as string.

typography.toString(); // Or insert styles directly into the <head> (works well for client-only
// JS web apps.

typography.injectStyles();

var Posts = function Posts(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("a", {
    className: "wrapper",
    href: "https://www.instagram.com/p/".concat(props.shortcode, "/"),
    target: "_blank",
    rel: "noreferrer noopener"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "overlay"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: props.thumbnail_src,
    alt: props.accessibility_caption
  }), /*#__PURE__*/_react.default.createElement("div", {
    justify: "center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "favorite"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-heart fa-2x"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "text",
    color: "white"
  }, props.edge_liked_by.count)), /*#__PURE__*/_react.default.createElement("div", {
    className: "chat"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-comment fa-2x"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "text",
    color: "white"
  }, props.edge_media_to_comment.count))))));
};

var InstagramPosts = function InstagramPosts(_ref) {
  var altHash = _ref.altHash,
      hashtag = _ref.hashtag,
      maxPosts = _ref.maxPosts;

  var _React$useState = _react.default.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      igPosts = _React$useState2[0],
      setIgPosts = _React$useState2[1];

  _react.default.useEffect(function () {
    (0, _Instagram.scrapingInstagramHashtags)({
      hashtag: hashtag,
      altHash: altHash ? altHash : null,
      maxPosts: maxPosts ? maxPosts : 12
    }).then(function (res) {
      return setIgPosts(res);
    });
  }, []);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ig-posts"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ig-posts__grid"
  }, (0, _Helpers.notNilOrEmpty)(igPosts) && (0, _Helpers.mapIndexed)(function (post, index) {
    return /*#__PURE__*/_react.default.createElement(Posts, _extends({
      key: index
    }, post));
  })(igPosts)));
};

var _default = InstagramPosts;
exports.default = _default;