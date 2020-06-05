"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapingInstagramPosts = scrapingInstagramPosts;
exports.scrapingInstagramHashtags = scrapingInstagramHashtags;

var R = _interopRequireWildcard(require("ramda"));

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _Helpers = require("./Helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var parseResponse = function parseResponse(response) {
  var $ = _cheerio.default.load(response.data);

  var scripts = $("html > body > script"); // Code smells #40 and #42
  //   // I should verify why i get the script before the body tag

  var id = 0;

  if (scripts.get(0).attribs.type === "application/ld+json") {
    id = 1;
  }

  var jsonData = $("html > body > script").get(id).children[0].data.replace(/window\._sharedData\s?=\s?{/, "{").replace(/;$/g, "");
  return JSON.parse(jsonData).entry_data;
};

function scrapingInstagramPosts(_x) {
  return _scrapingInstagramPosts.apply(this, arguments);
}

function _scrapingInstagramPosts() {
  _scrapingInstagramPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var username, maxPosts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref.username, maxPosts = _ref.maxPosts;
            return _context.abrupt("return", _axios.default.get("https://www.instagram.com/".concat(username, "/")).then(function (response) {
              var data = parseResponse(response);
              var photos = [];
              data && (0, _Helpers.mapIndexed)(function (item, index) {
                (0, _Helpers.mapIndexed)(function (post, i) {
                  return photos.push(post.node);
                })(item[0].graphql.user.edge_owner_to_timeline_media.edges);
              })(R.values(data));
              return maxPosts ? photos.slice(0, maxPosts) : photos;
            }).catch(function (err) {
              console.warn("\nCould not fetch instagram posts. Error status ".concat(err));
              return null;
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _scrapingInstagramPosts.apply(this, arguments);
}

function scrapingInstagramHashtags(_x2) {
  return _scrapingInstagramHashtags.apply(this, arguments);
}

function _scrapingInstagramHashtags() {
  _scrapingInstagramHashtags = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var altHash, hashtag, maxPosts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            altHash = _ref2.altHash, hashtag = _ref2.hashtag, maxPosts = _ref2.maxPosts;
            return _context2.abrupt("return", _axios.default.get("https://www.instagram.com/explore/tags/".concat(hashtag, "/")).then(function (response) {
              var data = parseResponse(response);
              var photos = [];
              data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges.forEach(function (edge) {
                if (edge.node) {
                  (0, _Helpers.notNilOrEmpty)(altHash) ? R.contains("#".concat(altHash), edge.node.edge_media_to_caption.edges[0].node.text) && photos.push(edge.node) : photos.push(edge.node);
                }
              });
              return maxPosts ? photos.slice(0, maxPosts) : photos;
            }).catch(function (err) {
              console.warn("\nCould not fetch instagram posts from hashtag. Error status ".concat(err));
              return null;
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _scrapingInstagramHashtags.apply(this, arguments);
}