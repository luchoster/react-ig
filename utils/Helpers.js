"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapIndexed = exports.notNilOrEmpty = exports.nilOrEmpty = exports.notEquals = exports.notNil = exports.notEmpty = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var notEmpty = R.complement(R.isEmpty);
exports.notEmpty = notEmpty;
var notNil = R.complement(R.isNil);
exports.notNil = notNil;
var notNilOrEmpty = R.complement(R.either(R.isNil, R.isEmpty));
exports.notNilOrEmpty = notNilOrEmpty;
var notEquals = R.curry(function (a, b) {
  return R.complement(R.equals(a))(b);
});
exports.notEquals = notEquals;
var nilOrEmpty = R.either(R.isNil, R.isEmpty);
exports.nilOrEmpty = nilOrEmpty;
var mapIndexed = R.addIndex(R.map);
exports.mapIndexed = mapIndexed;