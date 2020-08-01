(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueDragDropAlign"] = factory(require("vue"));
	else
		root["VueDragDropAlign"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0029":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "0185":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("e5fa");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0a0a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da3c");
var core = __webpack_require__("a7d3");
var LIBRARY = __webpack_require__("b457");
var wksExt = __webpack_require__("fda1");
var defineProperty = __webpack_require__("3adc").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0a91":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("b42c");
__webpack_require__("93c4");
module.exports = __webpack_require__("b77f");


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0f89":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("6f8a");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "103a":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("da3c").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "12fd":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("6f8a");
var document = __webpack_require__("da3c").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "12fd9":
/***/ (function(module, exports) {



/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1938":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("d13f");

$export($export.S, 'Array', { isArray: __webpack_require__("b5aa") });


/***/ }),

/***/ "1b55":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("7772")('wks');
var uid = __webpack_require__("7b00");
var Symbol = __webpack_require__("da3c").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "1b8f":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a812");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "1c01":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("9e1e"), 'Object', { defineProperty: __webpack_require__("86cc").f });


/***/ }),

/***/ "1c4c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("9b43");
var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var toLength = __webpack_require__("9def");
var createProperty = __webpack_require__("f1ae");
var getIterFn = __webpack_require__("27ee");

$export($export.S + $export.F * !__webpack_require__("5cc5")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2312":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8ce0");


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2418":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6a9b");
var toLength = __webpack_require__("a5ab");
var toAbsoluteIndex = __webpack_require__("1b8f");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "245b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2695":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("43c8");
var toIObject = __webpack_require__("6a9b");
var arrayIndexOf = __webpack_require__("2418")(false);
var IE_PROTO = __webpack_require__("5d8f")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "2824":
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";function r(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return o(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return o(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return u=t.done,t},e:function(t){c=!0,i=t},f:function(){try{u||null==e.return||e.return()}finally{if(c)throw i}}}}function o(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0},e=arguments.length>2?arguments[2]:void 0,r=2*Math.PI/360*e,o=Math.cos(r),a=Math.sin(r),i=(n.x-t.x)*o-(n.y-t.y)*a+t.x,u=(n.x-t.x)*a+(n.y-t.y)*o+t.y;return{x:i,y:u}}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[{x:0,y:0},{x:0,y:0}],e=n[0],r=n[1],o=f(t,e)+f(t,r)-f(e,r);return o>=0&&o<1e-7}function u(t,n){var e,r,o,a,u=0,c=n.length;for(o=n[0],e=1;e<=c;e++){if(i(t,[o,a=n[e%c]]))return!0;t.x>=Math.min(o.x,a.x)&&t.x<=Math.max(o.x,a.x)&&t.y<=Math.max(o.y,a.y)&&o.x!==a.x&&(r=(t.x-o.x)*(a.y-o.y)/(a.x-o.x)+o.y,(o.y===a.y||t.y<=r)&&u++),o=a}return u%2!=0}function c(t,n){var e,o=!0,a=r(t);try{for(a.s();!(e=a.n()).done;){if(!u(e.value,n)){o=!1;break}}}catch(t){a.e(t)}finally{a.f()}return o}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[{x:0,y:0},{x:0,y:0}],e={},r=n[0],o=n[1];if(r.x-o.x==0)e.x=r.x,e.y=t.y;else{var a=(r.y-o.y)/(r.x-o.x),i=r.y-a*r.x,u=t.x+a*t.y;e.x=(u-a*i)/(a*a+1),e.y=a*e.x+i}return e}function d(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[{x:0,y:0},{x:0,y:0}],r=e[0],o=e[1];if(r.x-o.x==0)t=Math.abs(n.x-r.x);else{var a=(r.y-o.y)/(r.x-o.x),i=r.y-a*r.x;t=Math.abs((a*n.x+i-n.y)/Math.sqrt(a*a+1))}return t}function f(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0},e=Math.abs(n.x-t.x),r=Math.abs(n.y-t.y),o=Math.sqrt(Math.pow(e,2)+Math.pow(r,2));return o}function y(t){var n=t.replace("matrix(","").replace(")","").split(", "),e=n[0],r=n[1];return parseFloat((Math.atan2(r,e)*(180/Math.PI)).toFixed(4))||0}function x(t){var n=0;try{n=y(getComputedStyle(t,null).getPropertyValue("transform")),t.parentNode&&(n+=x(t.parentNode))}catch(t){}return(n%=360)<0&&(n+=360),n}function p(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=t.getBoundingClientRect(),r=document.documentElement.scrollLeft,o=document.documentElement.scrollTop,a={x:e.left+r+.5*e.width,y:e.top+o+.5*e.height};if(n){var i=document.createElement("div");i.style.cssText="position:absolute;width:3px;height:3px;left:".concat(a.x-1,"px;top:").concat(a.y-1,"px;background: #000;"),document.body.appendChild(i)}return a}function s(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=g(t),o=.5*e.width,a=.5*e.height,i=p(t,n),u=[{x:i.x-o,y:i.y-a},{x:i.x+o,y:i.y-a},{x:i.x+o,y:i.y+a},{x:i.x-o,y:i.y+a}];if(n){var c,l=r(u);try{for(l.s();!(c=l.n()).done;){var d=c.value,f=document.createElement("div");f.style.cssText="position:absolute;width:3px;height:3px;left:".concat(d.x-1,"px;top:").concat(d.y-1,"px;background: #000;"),document.body.appendChild(f)}}catch(t){l.e(t)}finally{l.f()}}return u}function h(t){var n,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=x(t),i=p(t,e),u=s(t,e),c=[],l=r(u);try{for(l.s();!(n=l.n()).done;){var d=n.value;c.push(a(i,d,o))}}catch(t){l.e(t)}finally{l.f()}if(e){var f,y=r(c);try{for(y.s();!(f=y.n()).done;){var h=f.value,v=document.createElement("div");v.style.cssText="position:absolute;width:3px;height:3px;left:".concat(h.x-1,"px;top:").concat(h.y-1,"px;background: #000;"),document.body.appendChild(v)}}catch(t){y.e(t)}finally{y.f()}}return c}function v(t,n){var e,o,i,u,c,l,d,f=arguments.length>2&&void 0!==arguments[2]&&arguments[2],y=h(t),v=x(t),g=x(n),m=v-g,b=p(n,f),M=s(n,f),w=[],P=r(y);try{for(P.s();!(d=P.n()).done;){var S=d.value;w.push(a(b,S,-g))}}catch(t){P.e(t)}finally{P.f()}if(f){var j,T=r(w);try{for(T.s();!(j=T.n()).done;){var F=j.value,C=document.createElement("div");C.style.cssText="position:absolute;width:3px;height:3px;left:".concat(F.x-1,"px;top:").concat(F.y-1,"px;background: #000;"),document.body.appendChild(C)}}catch(t){T.e(t)}finally{T.f()}}var O=M[0].y,I=M[1].x,E=M[2].y,k=M[3].x;o=Math.min(w[0].y-O,w[1].y-O,w[2].y-O,w[3].y-O),i=Math.min(I-w[0].x,I-w[1].x,I-w[2].x,I-w[3].x),u=Math.min(E-w[0].y,E-w[1].y,E-w[2].y,E-w[3].y);var A={left:e=Math.min(w[0].x-k,w[1].x-k,w[2].x-k,w[3].x-k),top:o,right:i,bottom:u,width:c=Math.max(Math.abs(w[0].x-w[2].x),Math.abs(w[1].x-w[3].x)),height:l=Math.max(Math.abs(w[0].y-w[2].y),Math.abs(w[1].y-w[3].y)),deg:m};if(f){var D=document.createElement("div");D.style.cssText="position:absolute;width:".concat(c,"px;height:").concat(l,"px;left:").concat(e,"px;top:").concat(o,"px;background: rgba(0,0,0,0.4);"),n.appendChild(D)}return A}function g(t){var n=window.getComputedStyle(t,!1),e=parseFloat(n.width),r=parseFloat(n.height);"content-box"===n["box-sizing"]&&(e+=parseFloat(n["padding-left"])+parseFloat(n["padding-right"])+parseFloat(n["border-left"])+parseFloat(n["border-right"]),r+=parseFloat(n["padding-top"])+parseFloat(n["padding-bottom"])+parseFloat(n["border-top"])+parseFloat(n["border-bottom"]));return{width:e,height:r}}e.r(n),e.d(n,"rotatePoint",(function(){return a})),e.d(n,"pointIsInPolygon",(function(){return u})),e.d(n,"polygonIsInPolygon",(function(){return c})),e.d(n,"pointToLineCross",(function(){return l})),e.d(n,"pointToLineDistance",(function(){return d})),e.d(n,"pointsDistance",(function(){return f})),e.d(n,"matrixToDeg",(function(){return y})),e.d(n,"clientDeg",(function(){return x})),e.d(n,"clientCenterPoint",(function(){return p})),e.d(n,"clientOriginalPoints",(function(){return s})),e.d(n,"clientBoundsPoints",(function(){return h})),e.d(n,"rectBoundsToRect",(function(){return v})),e.d(n,"pointIsOnLine",(function(){return i})),e.d(n,"domExactSize",(function(){return g}))}])}));

/***/ }),

/***/ "2a4e":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a812");
var defined = __webpack_require__("e5fa");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2caf":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("5ca1");

$export($export.S, 'Array', { isArray: __webpack_require__("1169") });


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2ea1":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("6f8a");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "31c2":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "3425":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"831718e4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-draggable-resizable.vue?vue&type=template&id=5b964929&
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[( _obj = {}, _obj[_vm.classNameActive] = _vm.enabled, _obj[_vm.classNameDragging] = _vm.dragging, _obj[_vm.classNameResizing] = _vm.resizing, _obj[_vm.classNameDraggable] = _vm.draggable, _obj[_vm.classNameResizable] = _vm.resizable, _obj ), _vm.className],style:(_vm.style),on:{"mousedown":_vm.elementMouseDown,"touchstart":_vm.elementTouchDown}},[_vm._l((_vm.actualHandles),function(handle){return (_vm.enabled && _vm.resizable)?_c('div',{key:handle,class:[_vm.classNameHandle, _vm.classNameHandle + '-' + handle],style:({display: _vm.enabled ? 'block' : 'none'}),on:{"mousedown":function($event){$event.stopPropagation();$event.preventDefault();return _vm.handleDown(handle, $event)},"touchstart":function($event){$event.stopPropagation();$event.preventDefault();return _vm.handleTouchDown(handle, $event)}}},[_vm._t(handle)],2):_vm._e()}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.enabled && _vm.rotatable),expression:"enabled && rotatable"}],class:[_vm.classNameRotate],on:{"mousedown":function($event){$event.stopPropagation();$event.preventDefault();return _vm.rotateDown($event)},"touchstart":function($event){$event.stopPropagation();$event.preventDefault();return _vm.rotateTouchDown($event)}}},[_c('Icon',{attrs:{"name":"rotate","width":"14","height":"14"}})],1),(_vm.enabled && _vm.showTips && _vm.toolTops)?_c('div',{staticClass:"x-toolTip",domProps:{"textContent":_vm._s(_vm.toolTops)}}):_vm._e(),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-draggable-resizable.vue?vue&type=template&id=5b964929&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.define-property.js
var es6_object_define_property = __webpack_require__("1c01");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.define-properties.js
var es6_object_define_properties = __webpack_require__("58b2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.for-each.js
var es6_array_for_each = __webpack_require__("f3e2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.is-array.js
var es6_array_is_array = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__("ac4d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__("8a81");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
var es6_array_from = __webpack_require__("1c4c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.date.to-string.js
var es6_date_to_string = __webpack_require__("87b3");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("a745");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js


function _arrayWithoutHoles(arr) {
  if (is_array_default()(arr)) return _arrayLikeToArray(arr);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__("774e");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js
var is_iterable = __webpack_require__("c8bb");
var is_iterable_default = /*#__PURE__*/__webpack_require__.n(is_iterable);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol.js
var symbol = __webpack_require__("67bb");
var symbol_default = /*#__PURE__*/__webpack_require__.n(symbol);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js



function _iterableToArray(iter) {
  if (typeof symbol_default.a !== "undefined" && is_iterable_default()(Object(iter))) return from_default()(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/unsupportedIterableToArray.js


function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return from_default()(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js

function _arrayWithHoles(arr) {
  if (is_array_default()(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js
var get_iterator = __webpack_require__("5d73");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js



function _iterableToArrayLimit(arr, i) {
  if (typeof symbol_default.a === "undefined" || !is_iterable_default()(Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = get_iterator_default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.filter.js
var es6_array_filter = __webpack_require__("d25f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.set.js
var es6_set = __webpack_require__("4f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/@xpf0000/vuesvgicon/dist/VueSvgIcons.css
var VueSvgIcons = __webpack_require__("998a");

// EXTERNAL MODULE: ./node_modules/@xpf0000/vuesvgicon/dist/VueSvgIcons.umd.min.js
var VueSvgIcons_umd_min = __webpack_require__("6881");
var VueSvgIcons_umd_min_default = /*#__PURE__*/__webpack_require__.n(VueSvgIcons_umd_min);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./src/utils/fns.js


function isFunction(func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}
function snapToGrid(grid, pendingX, pendingY) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var x = Math.round(pendingX / scale / grid[0]) * grid[0];
  var y = Math.round(pendingY / scale / grid[1]) * grid[1];
  return [x, y];
}
function computeWidth(parentWidth, left, right) {
  return parentWidth - left - right;
}
function computeHeight(parentHeight, top, bottom) {
  return parentHeight - top - bottom;
}
function restrictToBounds(value, min, max) {
  if (min !== null && value < min) {
    return min;
  }

  if (max !== null && max < value) {
    return max;
  }

  return value;
}
// CONCATENATED MODULE: ./src/utils/dom.js


function matchesSelectorToParentElements(el, selector, baseNode) {
  var node = el;
  var matchesSelectorFunc = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].find(function (func) {
    return isFunction(node[func]);
  });
  if (!isFunction(node[matchesSelectorFunc])) return false;

  do {
    if (node[matchesSelectorFunc](selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}
function addEvent(el, event, handler) {
  if (!el) {
    return;
  }

  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    el['on' + event] = handler;
  }
}
function removeEvent(el, event, handler) {
  if (!el) {
    return;
  }

  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    el['on' + event] = null;
  }
}
// EXTERNAL MODULE: ./node_modules/@xpf0000/dom-points/dist/domPoints.js
var domPoints = __webpack_require__("2824");

// CONCATENATED MODULE: ./src/icon/rotate.js

VueSvgIcons_umd_min_default.a.register({
  'rotate': {
    'width': 1024,
    'height': 1024,
    'paths': [{
      'd': 'M793.176276 158.366897A449.853793 449.853793 0 0 0 512 60.239448C262.497103 60.239448 60.239448 262.497103 60.239448 512c0 249.502897 202.257655 451.760552 451.760552 451.760552 249.502897 0 451.760552-202.257655 451.760552-451.760552A30.119724 30.119724 0 0 1 1024 512c0 282.765241-229.234759 512-512 512S0 794.765241 0 512 229.234759 0 512 0c121.467586 0 236.261517 42.513655 327.150345 118.113103l-10.540138-79.042206c-1.05931-7.962483 1.271172-15.412966 6.444138-20.48 7.238621-6.938483 18.661517-8.192 29.21931-3.230897 10.557793 4.943448 18.273103 15.218759 19.756138 26.217931l19.950345 149.53931c0.971034 7.185655-0.812138 14.018207-5.014069 19.049931-4.484414 5.067034-11.175724 7.732966-18.573241 7.379862l-148.321104-6.232275c-14.512552-1.800828-27.188966-14.318345-29.21931-28.848552-2.01269-14.512552 7.273931-26.235586 21.433379-27.012414l68.890483 2.913104z'
    }]
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-draggable-resizable.vue?vue&type=script&lang=js&
























function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = vue_draggable_resizablevue_type_script_lang_js_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function vue_draggable_resizablevue_type_script_lang_js_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return vue_draggable_resizablevue_type_script_lang_js_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return vue_draggable_resizablevue_type_script_lang_js_arrayLikeToArray(o, minLen); }

function vue_draggable_resizablevue_type_script_lang_js_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var DataCenter = {
  select: {},
  active: -1
};
external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$EveBus = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a();
var events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
};
var userSelectNone = {
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  MsUserSelect: 'none'
};
var userSelectAuto = {
  userSelect: 'auto',
  MozUserSelect: 'auto',
  WebkitUserSelect: 'auto',
  MsUserSelect: 'auto'
};
var eventsFor = events.mouse;
/* harmony default export */ var vue_draggable_resizablevue_type_script_lang_js_ = ({
  replace: true,
  name: 'vue-draggable-resizable',
  components: {
    Icon: VueSvgIcons_umd_min_default.a
  },
  props: {
    className: {
      type: String,
      default: 'vdr'
    },
    classNameDraggable: {
      type: String,
      default: 'draggable'
    },
    classNameResizable: {
      type: String,
      default: 'resizable'
    },
    classNameDragging: {
      type: String,
      default: 'dragging'
    },
    classNameResizing: {
      type: String,
      default: 'resizing'
    },
    classNameActive: {
      type: String,
      default: 'active'
    },
    classNameHandle: {
      type: String,
      default: 'handle'
    },
    classNameRotate: {
      type: String,
      default: 'rotate'
    },
    disableUserSelect: {
      type: Boolean,
      default: true
    },
    enableNativeDrag: {
      type: Boolean,
      default: false
    },
    preventDeactivation: {
      type: Boolean,
      default: false
    },
    align: {
      type: Boolean,
      default: true
    },
    alignRange: {
      type: Number,
      default: 5,
      validator: function validator(val) {
        return val >= 0;
      }
    },
    active: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean,
      default: true
    },
    showTips: {
      type: Boolean,
      default: true
    },
    dropable: {
      type: Boolean,
      default: false
    },
    dropinable: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: true
    },
    lockAspectRatio: {
      type: Boolean,
      default: false
    },
    mutleDragAble: {
      type: Boolean,
      default: true
    },
    w: {
      type: [Number, String],
      default: 200,
      validator: function validator(val) {
        if (typeof val === 'number') {
          return val > 0;
        }

        return val === 'auto';
      }
    },
    h: {
      type: [Number, String],
      default: 200,
      validator: function validator(val) {
        if (typeof val === 'number') {
          return val > 0;
        }

        return val === 'auto';
      }
    },
    minWidth: {
      type: Number,
      default: 0,
      validator: function validator(val) {
        return val >= 0;
      }
    },
    minHeight: {
      type: Number,
      default: 0,
      validator: function validator(val) {
        return val >= 0;
      }
    },
    maxWidth: {
      type: Number,
      default: null,
      validator: function validator(val) {
        return val >= 0;
      }
    },
    maxHeight: {
      type: Number,
      default: null,
      validator: function validator(val) {
        return val >= 0;
      }
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    r: {
      type: Number,
      default: 0
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator: function validator(val) {
        return typeof val === 'string' ? val === 'auto' : val >= 0;
      }
    },
    handles: {
      type: Array,
      default: function _default() {
        return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
      },
      validator: function validator(val) {
        var s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']);
        return new Set(val.filter(function (h) {
          return s.has(h);
        })).size === val.length;
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String,
      default: 'both',
      validator: function validator(val) {
        return ['x', 'y', 'both'].includes(val);
      }
    },
    grid: {
      type: Array,
      default: function _default() {
        return [1, 1];
      }
    },
    parent: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number,
      default: 1,
      validator: function validator(val) {
        return val > 0;
      }
    },
    onDragStart: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    onDrag: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    onResizeStart: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    onResize: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    onRotateStart: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    onRotate: {
      type: Function,
      default: function _default() {
        return true;
      }
    }
  },
  data: function data() {
    return {
      left: this.x,
      top: this.y,
      right: null,
      bottom: null,
      width: null,
      height: null,
      rotate: this.r,
      widthTouched: false,
      heightTouched: false,
      aspectFactor: null,
      parentWidth: null,
      parentHeight: null,
      minW: this.minWidth,
      minH: this.minHeight,
      maxW: this.maxWidth,
      maxH: this.maxHeight,
      handle: null,
      enabled: this.active,
      resizing: false,
      dragging: false,
      rotating: false,
      zIndex: this.z,
      toolTops: ''
    };
  },
  created: function created() {
    // eslint-disable-next-line
    if (this.maxWidth && this.minWidth > this.maxWidth) console.warn('[Vdr warn]: Invalid prop: minWidth cannot be greater than maxWidth'); // eslint-disable-next-line

    if (this.maxWidth && this.minHeight > this.maxHeight) console.warn('[Vdr warn]: Invalid prop: minHeight cannot be greater than maxHeight');
    this.resetBoundsAndMouseState();
  },
  mounted: function mounted() {
    var _this = this;

    if (!this.enableNativeDrag) {
      this.$el.ondragstart = function () {
        return false;
      };
    }

    var _this$getParentSize = this.getParentSize(),
        _this$getParentSize2 = _slicedToArray(_this$getParentSize, 2),
        parentWidth = _this$getParentSize2[0],
        parentHeight = _this$getParentSize2[1];

    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;
    var size = Object(domPoints["domExactSize"])(this.$el);
    var _ref = [size.width, size.height],
        width = _ref[0],
        height = _ref[1];
    this.aspectFactor = (this.w !== 'auto' ? this.w : width) / (this.h !== 'auto' ? this.h : height);
    this.width = this.w !== 'auto' ? this.w : width;
    this.height = this.h !== 'auto' ? this.h : height;
    this.right = this.parentWidth - this.width - this.left;
    this.bottom = this.parentHeight - this.height - this.top;
    addEvent(window, 'resize', this.checkParentSize);
    addEvent(this.$el, 'contextmenu', this.contextMenu);
    this.$el.isDragDrop = true;
    this.$EveBus.$on('deSelectElement', this.deSelectElement);
    this.$EveBus.$on('handleDrag', this.handleDrag);
    this.$EveBus.$on('mutlElementDown', this.mutlElementDown);
    this.$EveBus.$on('dropCheck', this.dropCheck);
    this.$EveBus.$on('alignCheck', this.alignCheck);
    this.$nextTick(function (_) {
      _this.getBoundsPoint();
    });
  },
  beforeDestroy: function beforeDestroy() {
    removeEvent(this.$el, 'contextmenu', this.contextMenu);
    removeEvent(document.documentElement, 'mousedown', this.deselect);
    removeEvent(document.documentElement, 'touchstart', this.handleUp);
    removeEvent(document.documentElement, 'mousemove', this.move);
    removeEvent(document.documentElement, 'touchmove', this.move);
    removeEvent(document.documentElement, 'mouseup', this.handleUp);
    removeEvent(document.documentElement, 'touchend touchcancel', this.deselect);
    removeEvent(window, 'resize', this.checkParentSize);
    this.$EveBus.$off('deSelectElement', this.deSelectElement);
    this.$EveBus.$off('handleDrag', this.handleDrag);
    this.$EveBus.$off('mutlElementDown', this.mutlElementDown);
    this.$EveBus.$off('dropCheck', this.dropCheck);
    this.$EveBus.$off('alignCheck', this.alignCheck);
  },
  methods: {
    alignCheck: function alignCheck(vm) {
      var vmLeft = vm.left;
      var vmTop = vm.top;
      var alignRange = vm.alignRange;
      var checkpoints = [].concat(_toConsumableArray(vm.clientBoundsPoint), [vm.clientCenterPoint]); // 检测屏幕位置对齐

      if (vm._uid === this._uid) {
        var clientCenter = Object(domPoints["clientCenterPoint"])(document.body);

        var _iterator = _createForOfIteratorHelper(checkpoints),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var p = _step.value;
            var x = clientCenter.x - p.x;

            if (Math.abs(x) <= alignRange) {
              var alignLeft = vmLeft + x;

              if (!vm.alignLeft) {
                vm.alignLeft = alignLeft;
              } else {
                vm.alignLeft = Math.abs(x) < Math.abs(vm.alignLeft - vmLeft) ? alignLeft : vm.alignLeft;
              }

              this.alignLineAdd("width:1px;left:".concat(clientCenter.x - 1, "px;top:0;bottom:0;"));
            }

            var y = clientCenter.y - p.y;

            if (Math.abs(y) <= alignRange) {
              var alignTop = vmTop + y;

              if (!vm.alignTop) {
                vm.alignTop = alignTop;
              } else {
                vm.alignTop = Math.abs(y) < Math.abs(vm.alignTop - vmTop) ? alignTop : vm.alignTop;
              }

              this.alignLineAdd("height:1px;left:0;right:0;top:".concat(clientCenter.y - 1, "px;"));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (!DataCenter.select[this._uid] && !vm.$el.contains(this.$el)) {
        var points = [].concat(_toConsumableArray(this.clientBoundsPoint), [this.clientCenterPoint]);

        var _iterator2 = _createForOfIteratorHelper(checkpoints),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var cp = _step2.value;

            var _iterator3 = _createForOfIteratorHelper(points),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _p = _step3.value;

                var _x = _p.x - cp.x;

                if (Math.abs(_x) <= alignRange) {
                  var _alignLeft = vmLeft + _x;

                  if (!vm.alignLeft) {
                    vm.alignLeft = _alignLeft;
                  } else {
                    vm.alignLeft = Math.abs(_x) < Math.abs(vm.alignLeft - vmLeft) ? _alignLeft : vm.alignLeft;
                  }

                  var top = Math.min(_p.y, cp.y);
                  var height = Math.abs(_p.y - cp.y);
                  this.alignLineAdd("width:1px;height:".concat(height, "px;left:").concat(_p.x - 1, "px;top:").concat(top, "px;"));
                }

                var _y = _p.y - cp.y;

                if (Math.abs(_y) <= alignRange) {
                  var _alignTop = vmTop + _y;

                  if (!vm.alignTop) {
                    vm.alignTop = _alignTop;
                  } else {
                    vm.alignTop = Math.abs(_y) < Math.abs(vm.alignTop - vmTop) ? _alignTop : vm.alignTop;
                  }

                  var left = Math.min(_p.x, cp.x);
                  var width = Math.abs(_p.x - cp.x);
                  this.alignLineAdd("height:1px;width:".concat(width, "px;left:").concat(left, "px;top:").concat(_p.y - 1, "px;"));
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    },
    alignInit: function alignInit() {
      this.alignLineRemove();
      this.alignLeft = null;
      this.alignTop = null;
      this.$EveBus.$emit('alignCheck', this);
    },
    alignLineAdd: function alignLineAdd(css) {
      var centerDom = document.createElement('div');
      centerDom.className = 'dragdrop-align-line';
      centerDom.style.cssText = css;
      document.body.appendChild(centerDom);
    },
    alignLineRemove: function alignLineRemove() {
      var lines = document.querySelectorAll('.dragdrop-align-line');

      var _iterator4 = _createForOfIteratorHelper(lines),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var line = _step4.value;
          line.remove();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    },
    dropCheck: function dropCheck(vm) {
      // vm 待检测
      if (this.dropinable && vm._uid !== this._uid && !vm.$el.contains(this.$el)) {
        var checkpoints = vm.clientBoundsPoint;
        var points = this.clientBoundsPoint;

        if (Object(domPoints["polygonIsInPolygon"])(checkpoints, points)) {
          if (!vm.dropNode) {
            vm.dropNode = this;
          } else {
            if (vm.dropNode._uid !== this._uid) {
              if (vm.dropNode.$el.contains(this.$el)) {
                vm.dropNode = this;
              } else {
                if (this.zIndex > vm.dropNode.zIndex) {
                  vm.dropNode = this;
                }
              }
            }
          }
        } else {
          if (vm.dropNode && vm.dropNode._uid === this._uid) {
            vm.dropNode = null;
          }
        }
      }
    },
    mutlElementDown: function mutlElementDown() {
      if (this.enabled) {
        this.resetBoundsAndMouseState();
        this.reCheckParent();
        this.mouseClickPosition.left = this.left;
        this.mouseClickPosition.right = this.right;
        this.mouseClickPosition.top = this.top;
        this.mouseClickPosition.bottom = this.bottom;

        if (this.parent) {
          this.bounds = this.calcDragLimits();
        }
      }
    },
    handleDrag: function handleDrag(deltaX, deltaY) {
      var _this2 = this;

      if (DataCenter.select[this._uid]) {
        var mouseClickPosition = this.mouseClickPosition;
        var bounds = this.bounds;
        var left = restrictToBounds(mouseClickPosition.left - deltaX, bounds.minLeft, bounds.maxLeft);
        var top = restrictToBounds(mouseClickPosition.top - deltaY, bounds.minTop, bounds.maxTop);
        var single = Object.keys(DataCenter.select).length === 1;

        if (single && this.align && this.alignLeft && Math.abs(left - this.alignLeft) < this.alignRange) {
          left = this.alignLeft;
        }

        if (single && this.align && this.alignTop && Math.abs(top - this.alignTop) < this.alignRange) {
          top = this.alignTop;
        }

        if (this.onDrag(left, top) === false) {
          return;
        }

        var right = restrictToBounds(mouseClickPosition.right + deltaX, bounds.minRight, bounds.maxRight);
        var bottom = restrictToBounds(mouseClickPosition.bottom + deltaY, bounds.minBottom, bounds.maxBottom);
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.toolTops = "x:".concat(this.left.toFixed(0), " y:").concat(this.top.toFixed(0));
        this.$emit('dragging', this.left, this.top);

        if (this.moved) {
          this.$nextTick(function (_) {
            if (_this2.dropable || _this2.align) {
              _this2.getBoundsPoint();
            } // 放置检测


            if (_this2.dropable) {
              _this2.$EveBus.$emit('dropCheck', _this2);
            } // 对齐检测 显示对齐线&停靠


            if (_this2.align) {
              _this2.alignInit();
            }
          });
        }
      }
    },
    // 多选时 取消选择
    deSelectElement: function deSelectElement(vm, sigleDrag) {
      if (this.enabled && vm._uid !== this._uid) {
        if (sigleDrag || !this.mutleDragAble || !vm.mutleDragAble) {
          this.resizing = false;
          this.enabled = false;
          this.dragging = false;
          this.rotating = false;
          this.$emit('deactivated');
          this.$emit('update:active', false);
          this.resetBoundsAndMouseState();
          this.getBoundsPoint();
          delete DataCenter.select[this._uid];
        }
      }
    },
    reSetEvent: function reSetEvent() {
      addEvent(document.documentElement, eventsFor.move, this.move);
      addEvent(document.documentElement, eventsFor.stop, this.handleUp);
      removeEvent(document.documentElement, 'mousedown', this.deselect);
      removeEvent(document.documentElement, 'touchend touchcancel', this.deselect);
      addEvent(document.documentElement, 'mousedown', this.deselect);
      addEvent(document.documentElement, 'touchend touchcancel', this.deselect);
    },
    // 重置
    resetBoundsAndMouseState: function resetBoundsAndMouseState() {
      this.mouseClickPosition = {
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };
      this.bounds = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null
      };
    },
    reCheckParent: function reCheckParent() {
      var _this$getParentSize3 = this.getParentSize(),
          _this$getParentSize4 = _slicedToArray(_this$getParentSize3, 2),
          parentWidth = _this$getParentSize4[0],
          parentHeight = _this$getParentSize4[1];

      this.parentWidth = parentWidth;
      this.parentHeight = parentHeight;
      this.right = this.parentWidth - this.width - this.left;
      this.bottom = this.parentHeight - this.height - this.top;
    },
    getParentSize: function getParentSize() {
      if (this.parent) {
        var parentNode = this.$el.parentNode;
        var size = Object(domPoints["domExactSize"])(parentNode);
        var width = size.width;
        var height = size.height;
        return [width, height];
      }

      return [null, null];
    },
    elementTouchDown: function elementTouchDown(e) {
      eventsFor = events.touch;
      this.elementDown(e);
    },
    elementMouseDown: function elementMouseDown(e) {
      eventsFor = events.mouse;
      this.elementDown(e);
    },
    elementDown: function elementDown(e) {
      if (e instanceof MouseEvent && e.isTrusted && e.which !== 1) {
        return;
      }

      var target = e.target || e.srcElement;

      if (this.$el.contains(target)) {
        if (this.onDragStart(e) === false) {
          return;
        }

        if (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el) || this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el)) {
          this.dragging = false;
          return;
        }

        this.$EveBus.$emit('contextMenuHide', this);

        if (!this.enabled) {
          this.enabled = true;
          this.$emit('activated');
          this.$emit('update:active', true);

          if (!e.metaKey && !e.ctrlKey) {
            DataCenter.select = {};
          }

          var sigleDrag = !e.metaKey && !e.ctrlKey;
          this.$EveBus.$emit('deSelectElement', this, sigleDrag);
          DataCenter.select[this._uid] = this;
          DataCenter.active = this._uid;
        } else {
          if (e.metaKey || e.ctrlKey) {
            delete DataCenter.select[this._uid];
            this.resizing = false;
            this.enabled = false;
            this.dragging = false;
            this.$emit('deactivated');
            this.$emit('update:active', false);
            return;
          } else {
            DataCenter.select[this._uid] = this;
            DataCenter.active = this._uid;
          }
        }

        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        this.$EveBus.$emit('mutlElementDown', this);

        if (this.draggable) {
          this.dragging = true;
        }

        if (this.align) {
          this.getBoundsPoint();
          this.alignInit();
        }

        this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX;
        this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY;
        this.reSetEvent();
      }
    },
    getBoundsPoint: function getBoundsPoint() {
      this.clientBoundsPoint = Object(domPoints["clientBoundsPoints"])(this.$el);
      this.clientCenterPoint = Object(domPoints["clientCenterPoint"])(this.$el);
    },
    calcDragLimits: function calcDragLimits() {
      var rect = Object(domPoints["rectBoundsToRect"])(this.$el, this.$el.parentNode);
      var width = rect.width;
      var height = rect.height;
      var left = Math.max((width - this.width) * 0.5, 0);
      var top = Math.max((height - this.height) * 0.5, 0);
      left = left < 0.0000001 ? 0 : left;
      top = top < 0.0000001 ? 0 : top;
      var bounds = {};
      bounds.minLeft = Math.ceil(left / this.grid[0]) * this.grid[0];
      bounds.minRight = bounds.minLeft;
      bounds.maxLeft = Math.floor((this.parentWidth - this.width - left) / this.grid[0]) * this.grid[0];
      bounds.maxRight = bounds.maxLeft;
      bounds.minTop = Math.ceil(top / this.grid[1]) * this.grid[1];
      bounds.minBottom = bounds.minTop;
      bounds.maxTop = Math.floor((this.parentHeight - this.height - top) / this.grid[1]) * this.grid[1];
      bounds.maxBottom = bounds.maxTop;
      return bounds;
    },
    calcResizeLimits: function calcResizeLimits() {
      var minW = this.minW;
      var minH = this.minH;
      var maxW = this.maxW;
      var maxH = this.maxH;
      var aspectFactor = this.aspectFactor;

      var _this$grid = _slicedToArray(this.grid, 2),
          gridX = _this$grid[0],
          gridY = _this$grid[1];

      if (this.lockAspectRatio) {
        // 最小宽度 / 最小高度 大于宽高比 以最小宽度为准 重新计算最小高度
        if (minW / minH > aspectFactor) {
          minH = minW / aspectFactor;
        } else {
          // 以最小高度为准 重新计算最小宽度
          minW = aspectFactor * minH;
        }

        if (maxW && maxH) {
          maxW = Math.min(maxW, aspectFactor * maxH);
          maxH = Math.min(maxH, maxW / aspectFactor);
        } else if (maxW) {
          maxH = maxW / aspectFactor;
        } else if (maxH) {
          maxW = aspectFactor * maxH;
        }

        if (this.parent) {
          var maxPW = this.parentWidth;
          var maxPH = this.parentHeight; // 父元素 宽度 / 高度 > 宽高比 以父元素高度为准 计算宽度

          if (maxPW / maxPH > aspectFactor) {
            maxPW = aspectFactor * maxPH;
          } else {
            // 以宽度为准 计算高度
            maxPH = maxPW / aspectFactor;
          }

          minW = Math.min(minW, maxPW);
          maxW = Math.min(maxW, maxPW);
          minH = Math.min(minH, maxPH);
          maxH = Math.min(maxH, maxPH);
        }
      }

      minW = Math.ceil(minW / gridX) * gridX;
      minH = Math.ceil(minH / gridY) * gridY;
      maxW = Math.floor(maxW / gridX) * gridX;
      maxH = Math.floor(maxH / gridY) * gridY;
      var bounds = {
        minW: minW,
        minH: minH,
        maxW: maxW,
        maxH: maxH
      };
      return bounds;
    },
    checkIsDragDrop: function checkIsDragDrop(target) {
      var is = false;
      is = target.isDragDrop === true;

      if (is) {
        return true;
      }

      if (target.parentNode) {
        is = is || this.checkIsDragDrop(target.parentNode);
      }

      return is;
    },
    deselect: function deselect(e) {
      var target = e.target || e.srcElement;

      if (!this.checkIsDragDrop(target)) {
        if (this.enabled && !this.preventDeactivation) {
          this.enabled = false;
          this.$emit('deactivated');
          this.$emit('update:active', false);
        }

        removeEvent(document.documentElement, eventsFor.move, this.move);
        DataCenter.active = -1;
        delete DataCenter.select[this._uid];
        this.$EveBus.$emit('deSelectElement', this, true);
        this.$EveBus.$emit('contextMenuHide', this);
      }

      if (!this.enabled) {
        this.resetBoundsAndMouseState();
      }

      removeEvent(document.documentElement, 'mousedown', this.deselect);
      removeEvent(document.documentElement, 'touchend touchcancel', this.deselect);
    },
    handleTouchDown: function handleTouchDown(handle, e) {
      eventsFor = events.touch;
      this.handleDown(handle, e);
    },
    rotateTouchDown: function rotateTouchDown(e) {
      eventsFor = events.touch;
      this.rotateDown(e);
    },
    rotateDown: function rotateDown(e) {
      if (e instanceof MouseEvent && e.which !== 1) {
        return;
      }

      if (this.onRotateStart(e) === false) {
        return;
      }

      e.stopPropagation && e.stopPropagation();
      e.preventDefault && e.preventDefault();
      this.rotating = true;
      this.reCheckParent();
      this.resetBoundsAndMouseState();
      this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX;
      this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY;
      this.mouseClickPosition.left = this.left;
      this.mouseClickPosition.right = this.right;
      this.mouseClickPosition.top = this.top;
      this.mouseClickPosition.bottom = this.bottom;

      if (this.align) {
        this.getBoundsPoint();
        this.alignInit();
      }

      this.initRotate();
      this.initParentBoundsPoints();
      this.reSetEvent();
      DataCenter.select = {};
      DataCenter.select[this._uid] = this;
      this.$EveBus.$emit('deSelectElement', this, true);
    },
    initParentBoundsPoints: function initParentBoundsPoints() {
      var parentNode = this.$el.parentNode;
      var size = Object(domPoints["domExactSize"])(parentNode);
      var pw = size.width;
      var ph = size.height;
      this.parentBoundsPoints = [{
        x: 0,
        y: 0
      }, {
        x: pw,
        y: 0
      }, {
        x: pw,
        y: ph
      }, {
        x: 0,
        y: ph
      }];
    },
    initRotate: function initRotate() {
      var scrollLeft = document.documentElement.scrollLeft;
      var scrollTop = document.documentElement.scrollTop;
      var bounds = this.$el.getBoundingClientRect();
      var width = bounds.width;
      var height = bounds.height;
      var left = bounds.left + scrollLeft;
      var top = bounds.top + scrollTop;
      var mouseY = this.mouseClickPosition.mouseY;
      var mouseX = this.mouseClickPosition.mouseX;
      var cx = left + width * 0.5; // 中心点

      var cy = top + height * 0.5;
      var tan = height / width; // 正弦

      var hd = Math.atan(tan); // 弧度

      var jd = 180 / Math.PI * hd; // 角度

      this.rotateInit = {};
      this.rotateInit.initjd = jd; // 初始角度

      this.rotateInit.cx = cx; // 中心点

      this.rotateInit.cy = cy;
      var a = Math.abs(mouseY - this.rotateInit.cy);
      var b = Math.abs(mouseX - this.rotateInit.cx);
      tan = a / b; // 正切

      hd = Math.atan(tan); // 弧度

      jd = 180 / Math.PI * hd; // 角度

      mouseX < this.rotateInit.cx && mouseY <= this.rotateInit.cy && (jd -= this.rotateInit.initjd);
      mouseX >= this.rotateInit.cx && mouseY < this.rotateInit.cy && (jd = 180 - jd - this.rotateInit.initjd);
      mouseX >= this.rotateInit.cx && mouseY >= this.rotateInit.cy && (jd = 180 + jd - this.rotateInit.initjd);
      mouseX < this.rotateInit.cx && mouseY > this.rotateInit.cy && (jd = -jd - this.rotateInit.initjd);
      this.rotateInit.mousejd = jd;
      this.rotateInit.startjd = this.rotate;
      this.centerPoint = {
        x: this.left + this.width * 0.5,
        y: this.top + this.height * 0.5
      };
      this.originalPoints = [{
        x: this.left,
        y: this.top
      }, {
        x: this.left + this.width,
        y: this.top
      }, {
        x: this.left + this.width,
        y: this.top + this.height
      }, {
        x: this.left,
        y: this.top + this.height
      }];
    },
    move: function move(e) {
      if (e.isTrusted && e.which !== 1) {
        return;
      }

      var axis = this.axis;
      var grid = this.grid;
      var mouseClickPosition = this.mouseClickPosition;
      var tmpDeltaX = axis && axis !== 'y' ? mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX) : 0;
      var tmpDeltaY = axis && axis !== 'x' ? mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY) : 0;

      var _snapToGrid = snapToGrid(grid, tmpDeltaX, tmpDeltaY, this.scale),
          _snapToGrid2 = _slicedToArray(_snapToGrid, 2),
          deltaX = _snapToGrid2[0],
          deltaY = _snapToGrid2[1];

      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      if (this.resizing) {
        this.handleResize(deltaX, deltaY);
      } else if (this.dragging) {
        this.moved = true;
        this.$EveBus.$emit('handleDrag', deltaX, deltaY);
      } else if (this.rotating) {
        this.handleRotate(e.touches ? e.touches[0].pageX : e.pageX, e.touches ? e.touches[0].pageY : e.pageY);
      }
    },
    moveHorizontally: function moveHorizontally(val) {
      var _snapToGrid3 = snapToGrid(this.grid, val, this.top, this.scale),
          _snapToGrid4 = _slicedToArray(_snapToGrid3, 2),
          deltaX = _snapToGrid4[0],
          _ = _snapToGrid4[1];

      var left = restrictToBounds(deltaX, this.bounds.minLeft, this.bounds.maxLeft);
      this.left = left;
      this.right = this.parentWidth - this.width - left;
    },
    moveVertically: function moveVertically(val) {
      var _snapToGrid5 = snapToGrid(this.grid, this.left, val, this.scale),
          _snapToGrid6 = _slicedToArray(_snapToGrid5, 2),
          _ = _snapToGrid6[0],
          deltaY = _snapToGrid6[1];

      var top = restrictToBounds(deltaY, this.bounds.minTop, this.bounds.maxTop);
      this.top = top;
      this.bottom = this.parentHeight - this.height - top;
    },
    handleDown: function handleDown(handle, e) {
      if (e instanceof MouseEvent && e.which !== 1) {
        return;
      }

      if (this.onResizeStart(handle, e) === false) {
        return;
      }

      e.stopPropagation && e.stopPropagation();
      e.preventDefault && e.preventDefault();
      this.handle = handle;
      this.resizing = true;
      this.reCheckParent();
      this.resetBoundsAndMouseState();
      this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX;
      this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY;
      this.mouseClickPosition.left = this.left;
      this.mouseClickPosition.right = this.right;
      this.mouseClickPosition.top = this.top;
      this.mouseClickPosition.bottom = this.bottom;
      this.bounds = this.calcResizeLimits();
      var center = {
        x: this.left + this.width * 0.5,
        y: this.top + this.height * 0.5
      };
      var point = {};

      switch (this.handle) {
        case 'ml':
        case 'tm':
        case 'tl':
          point = {
            x: this.left + this.width,
            y: this.top + this.height
          };
          break;

        case 'tr':
          point = {
            x: this.left,
            y: this.top + this.height
          };
          break;

        case 'bl':
          point = {
            x: this.left + this.width,
            y: this.top
          };
          break;

        case 'bm':
        case 'mr':
        case 'br':
          point = {
            x: this.left,
            y: this.top
          };
          break;
      }

      this.lockedPoint = Object(domPoints["rotatePoint"])(center, point, this.rotate);
      this.initParentBoundsPoints();

      if (this.align) {
        this.getBoundsPoint();
        this.alignInit();
      }

      this.reSetEvent();
      DataCenter.select = {};
      DataCenter.select[this._uid] = this;
      this.$EveBus.$emit('deSelectElement', this, true);
    },
    handleResize: function handleResize(deltaX, deltaY) {
      var _this3 = this;

      var left = this.left;
      var top = this.top;
      var right = this.right;
      var bottom = this.bottom;
      var mouseClickPosition = this.mouseClickPosition;
      var aspectFactor = this.aspectFactor;

      if (!this.widthTouched && deltaX) {
        this.widthTouched = true;
      }

      if (!this.heightTouched && deltaY) {
        this.heightTouched = true;
      }

      if (this.handle.includes('b')) {
        bottom = mouseClickPosition.bottom + deltaY;
      } else if (this.handle.includes('t')) {
        top = mouseClickPosition.top - deltaY;
      }

      if (this.handle.includes('r')) {
        right = mouseClickPosition.right + deltaX;
      } else if (this.handle.includes('l')) {
        left = mouseClickPosition.left - deltaX;
      }

      if (this.lockAspectRatio) {
        if (this.handle === 'tl') {
          var nt = this.top - (this.left - left) / aspectFactor;
          var nl = this.left - (this.top - top) * aspectFactor;

          if (Math.abs(this.top - nt) < Math.abs(this.left - nl)) {
            top = nt;
          } else {
            left = nl;
          }
        } else if (this.handle === 'tr') {
          var _nt = this.top - (this.right - right) / aspectFactor;

          var nr = this.right - (this.top - top) * aspectFactor;

          if (Math.abs(this.top - _nt) < Math.abs(this.right - nr)) {
            top = _nt;
          } else {
            right = nr;
          }
        } else if (this.handle === 'br') {
          var nb = this.bottom - (this.right - right) / aspectFactor;

          var _nr = this.right - (this.bottom - bottom) * aspectFactor;

          if (Math.abs(this.bottom - nb) < Math.abs(this.right - _nr)) {
            bottom = nb;
          } else {
            right = _nr;
          }
        } else if (this.handle === 'bl') {
          var _nb = this.bottom - (this.left - left) / aspectFactor;

          var _nl = this.left - (this.bottom - bottom) * aspectFactor;

          if (Math.abs(this.bottom - _nb) < Math.abs(this.left - _nl)) {
            bottom = _nb;
          } else {
            left = _nl;
          }
        } else if (this.handle === 'bm') {
          right = this.right - (this.bottom - bottom) * aspectFactor;
        } else if (this.handle === 'tm') {
          left = this.left - (this.top - top) * aspectFactor;
        } else if (this.handle === 'mr') {
          bottom = this.bottom - (this.right - right) / aspectFactor;
        } else if (this.handle === 'ml') {
          top = this.top - (this.left - left) / aspectFactor;
        }
      }

      var width = computeWidth(this.parentWidth, left, right);
      var height = computeHeight(this.parentHeight, top, bottom);

      if (!this.checkResizeWidthHeight(width, height)) {
        return;
      }

      if (this.onResize(this.handle, left, top, width, height) === false) {
        return;
      }

      var center = {
        x: left + width * 0.5,
        y: top + height * 0.5
      };
      var point = {};
      var pointRotated = {};
      var movex, movey;

      switch (this.handle) {
        case 'ml':
        case 'tm':
        case 'tl':
          point = {
            x: left + width,
            y: top + height
          };
          break;

        case 'tr':
          point = {
            x: left,
            y: top + height
          };
          break;

        case 'bl':
          point = {
            x: left + width,
            y: top
          };
          break;

        case 'bm':
        case 'mr':
        case 'br':
          point = {
            x: left,
            y: top
          };
          break;
      }

      pointRotated = Object(domPoints["rotatePoint"])(center, point, this.rotate);
      movex = pointRotated.x - this.lockedPoint.x;
      movey = pointRotated.y - this.lockedPoint.y;
      left -= movex;
      top -= movey;
      right += movex;
      bottom += movey;
      var movedBoundsPoints = [];
      var movedCenter = {
        x: left + width * 0.5,
        y: top + height * 0.5
      };
      point = {
        x: left,
        y: top
      };
      pointRotated = Object(domPoints["rotatePoint"])(movedCenter, point, this.rotate);
      movedBoundsPoints.push(pointRotated);
      point = {
        x: left + width,
        y: top
      };
      pointRotated = Object(domPoints["rotatePoint"])(movedCenter, point, this.rotate);
      movedBoundsPoints.push(pointRotated);
      point = {
        x: left + width,
        y: top + height
      };
      pointRotated = Object(domPoints["rotatePoint"])(movedCenter, point, this.rotate);
      movedBoundsPoints.push(pointRotated);
      point = {
        x: left,
        y: top + height
      };
      pointRotated = Object(domPoints["rotatePoint"])(movedCenter, point, this.rotate);
      movedBoundsPoints.push(pointRotated);

      if (this.parent && !this.checkResizeBounds(movedBoundsPoints)) {
        return;
      }

      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
      this.width = width;
      this.height = height;
      this.toolTops = "w:".concat(width.toFixed(0), " h:").concat(height.toFixed(0));

      if (this.align) {
        this.$nextTick(function (_) {
          _this3.getBoundsPoint();

          _this3.alignInit();
        });
      }

      this.$emit('resizing', this.left, this.top, this.width, this.height);
    },
    handleRotate: function handleRotate(mouseX, mouseY) {
      var _this4 = this;

      var a = Math.abs(mouseY - this.rotateInit.cy);
      var b = Math.abs(mouseX - this.rotateInit.cx);
      var tan = a / b; // 正切

      var hd = Math.atan(tan); // 弧度

      var jd = 180 / Math.PI * hd; // 角度

      mouseX < this.rotateInit.cx && mouseY <= this.rotateInit.cy && (jd -= this.rotateInit.initjd);
      mouseX >= this.rotateInit.cx && mouseY < this.rotateInit.cy && (jd = 180 - jd - this.rotateInit.initjd);
      mouseX >= this.rotateInit.cx && mouseY >= this.rotateInit.cy && (jd = 180 + jd - this.rotateInit.initjd);
      mouseX < this.rotateInit.cx && mouseY > this.rotateInit.cy && (jd = -jd - this.rotateInit.initjd);
      jd = jd === 360 ? 0 : jd;
      var add = Math.abs(jd - this.rotateInit.mousejd);
      var z = this.rotateInit.startjd;
      add = jd < this.rotateInit.mousejd ? add * -1 : add;
      z += add;
      z = z / 360.0 >= 1.0 ? z % 360 : z;
      var boundsPoints = [];

      var _iterator5 = _createForOfIteratorHelper(this.originalPoints),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var p = _step5.value;
          boundsPoints.push(Object(domPoints["rotatePoint"])(this.centerPoint, p, z));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (this.parent && !this.checkResizeBounds(boundsPoints)) {
        return;
      }

      this.rotate = z;
      this.toolTops = "\u89D2\u5EA6: ".concat(z.toFixed(2));

      if (this.align) {
        this.$nextTick(function (_) {
          _this4.getBoundsPoint();

          _this4.alignInit();
        });
      }
    },
    changeWidth: function changeWidth(val) {
      var _snapToGrid7 = snapToGrid(this.grid, val, 0, this.scale),
          _snapToGrid8 = _slicedToArray(_snapToGrid7, 2),
          newWidth = _snapToGrid8[0],
          _ = _snapToGrid8[1];

      var right = restrictToBounds(this.parentWidth - newWidth - this.left, this.bounds.minRight, this.bounds.maxRight);
      var bottom = this.bottom;

      if (this.lockAspectRatio) {
        bottom = this.bottom - (this.right - right) / this.aspectFactor;
      }

      var width = computeWidth(this.parentWidth, this.left, right);
      var height = computeHeight(this.parentHeight, this.top, bottom);
      this.right = right;
      this.bottom = bottom;
      this.width = width;
      this.height = height;
    },
    changeHeight: function changeHeight(val) {
      var _snapToGrid9 = snapToGrid(this.grid, 0, val, this.scale),
          _snapToGrid10 = _slicedToArray(_snapToGrid9, 2),
          _ = _snapToGrid10[0],
          newHeight = _snapToGrid10[1];

      var bottom = restrictToBounds(this.parentHeight - newHeight - this.top, this.bounds.minBottom, this.bounds.maxBottom);
      var right = this.right;

      if (this.lockAspectRatio) {
        right = this.right - (this.bottom - bottom) * this.aspectFactor;
      }

      var width = computeWidth(this.parentWidth, this.left, right);
      var height = computeHeight(this.parentHeight, this.top, bottom);
      this.right = right;
      this.bottom = bottom;
      this.width = width;
      this.height = height;
    },
    checkParentSize: function checkParentSize() {
      if (this.parent) {
        var _this$getParentSize5 = this.getParentSize(),
            _this$getParentSize6 = _slicedToArray(_this$getParentSize5, 2),
            newParentWidth = _this$getParentSize6[0],
            newParentHeight = _this$getParentSize6[1];

        this.parentWidth = newParentWidth;
        this.parentHeight = newParentHeight;
      }
    },
    checkResizeBounds: function checkResizeBounds(points) {
      return Object(domPoints["polygonIsInPolygon"])(points, this.parentBoundsPoints);
    },
    checkResizeWidthHeight: function checkResizeWidthHeight(width, height) {
      var bounds = this.bounds;

      if (width < bounds.minW || bounds.maxW && width > bounds.maxW) {
        return false;
      }

      if (height < bounds.minH || bounds.maxH && height > bounds.maxH) {
        return false;
      }

      return true;
    },
    contextMenu: function contextMenu(e) {
      e.stopPropagation && e.stopPropagation();
      e.preventDefault && e.preventDefault();

      if (!this.enabled) {
        this.enabled = true;
        this.$emit('activated');
        this.$emit('update:active', true);

        if (!e.metaKey && !e.ctrlKey) {
          DataCenter.select = {};
        }

        var sigleDrag = !e.metaKey && !e.ctrlKey;
        this.$EveBus.$emit('deSelectElement', this, sigleDrag);
        DataCenter.select[this._uid] = this;
        DataCenter.active = this._uid;
      } else {
        DataCenter.active = this._uid;
      }

      this.$EveBus.$emit('mutlElementDown', this);

      if (this.draggable) {
        this.dragging = true;
      }

      addEvent(document.documentElement, 'mousedown', this.deselect);
      addEvent(document.documentElement, 'touchend touchcancel', this.deselect);
      this.$emit('contextmenu', e, this, DataCenter.select);
    },
    handleUp: function handleUp(e) {
      this.alignLineRemove();
      removeEvent(document.documentElement, eventsFor.move, this.move);
      this.handle = null;

      if (!this.enabled) {
        this.resetBoundsAndMouseState();
      }

      this.getBoundsPoint();

      if (this.resizing) {
        this.resizing = false;
        this.$emit('resizestop', this.left, this.top, this.width, this.height);
      }

      if (this.dragging) {
        this.dragging = false;
        this.$emit('dragstop', this.left, this.top);
      }

      if (this.rotating) {
        this.rotating = false;
        this.$emit('rotatestop', this.left, this.top, this.rotate);
      }

      removeEvent(document.documentElement, 'mouseup', this.handleUp); // 多选时判断是否拖动 没拖动过 就是鼠标点击 把其余的选择取消掉

      if (!this.moved && !e.metaKey && !e.ctrlKey) {
        this.$EveBus.$emit('deSelectElement', this, true);
      }

      this.moved = false;

      if (this.dropNode) {
        if (!this.dropParentNode || !this.$el.parentNode.isSameNode(this.dropNode.$el)) {
          this.moveToDropNode();
        } else {
          this.dropNode = null;
        }
      }
    },
    moveToDropNode: function moveToDropNode() {
      for (var id in DataCenter.select) {
        var vm = DataCenter.select[id];
        var rect = Object(domPoints["rectBoundsToRect"])(vm.$el, this.dropNode.$el);
        var left = rect.left + (rect.width - vm.width) * 0.5;
        var top = rect.top + (rect.height - vm.height) * 0.5;

        if (vm.parent) {
          if (left < 0 || top < 0 || left + vm.width > this.dropNode.width || top + vm.height > this.dropNode.height) {
            continue;
          }
        }

        vm.left = left;
        vm.top = top;
        vm.rotate = rect.deg;
        this.dropNode.$el.appendChild(vm.$el);
        vm.dropParentNode = this.dropNode;
      }

      this.dropNode = null;
    }
  },
  computed: {
    style: function style() {
      return _objectSpread({
        transform: "rotate(".concat(this.rotate, "deg)"),
        left: "".concat(this.left, "px"),
        top: "".concat(this.top, "px"),
        width: this.computedWidth,
        height: this.computedHeight,
        zIndex: this.zIndex
      }, this.dragging && this.disableUserSelect ? userSelectNone : userSelectAuto);
    },
    actualHandles: function actualHandles() {
      if (!this.resizable) return [];
      return this.handles;
    },
    computedWidth: function computedWidth() {
      if (this.w === 'auto') {
        if (!this.widthTouched) {
          return 'auto';
        }
      }

      return this.width + 'px';
    },
    computedHeight: function computedHeight() {
      if (this.h === 'auto') {
        if (!this.heightTouched) {
          return 'auto';
        }
      }

      return this.height + 'px';
    },
    resizingOnX: function resizingOnX() {
      return Boolean(this.handle) && (this.handle.includes('l') || this.handle.includes('r'));
    },
    resizingOnY: function resizingOnY() {
      return Boolean(this.handle) && (this.handle.includes('t') || this.handle.includes('b'));
    },
    isCornerHandle: function isCornerHandle() {
      return Boolean(this.handle) && ['tl', 'tr', 'br', 'bl'].includes(this.handle);
    }
  },
  watch: {
    active: {
      handler: function handler(val) {
        this.enabled = val;
        this.toolTops = '';

        if (val) {
          removeEvent(document.documentElement, 'mousedown', this.deselect);
          removeEvent(document.documentElement, 'touchend touchcancel', this.deselect);
          addEvent(document.documentElement, 'mousedown', this.deselect);
          addEvent(document.documentElement, 'touchend touchcancel', this.deselect);
          this.$emit('activated');
        } else {
          this.$emit('deactivated');
        }
      },
      immediate: true,
      deep: true
    },
    z: function z(val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val;
      }
    },
    x: function x(val) {
      if (this.resizing || this.dragging) {
        return;
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits();
      }

      this.moveHorizontally(val);
    },
    y: function y(val) {
      if (this.resizing || this.dragging) {
        return;
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits();
      }

      this.moveVertically(val);
    },
    lockAspectRatio: function lockAspectRatio(val) {
      if (val) {
        this.aspectFactor = this.width / this.height;
      } else {
        this.aspectFactor = undefined;
      }
    },
    minWidth: function minWidth(val) {
      if (val > 0 && val <= this.width) {
        this.minW = val;
      }
    },
    minHeight: function minHeight(val) {
      if (val > 0 && val <= this.height) {
        this.minH = val;
      }
    },
    maxWidth: function maxWidth(val) {
      this.maxW = val;
    },
    maxHeight: function maxHeight(val) {
      this.maxH = val;
    },
    w: function w(val) {
      if (this.resizing || this.dragging) {
        return;
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits();
      }

      this.changeWidth(val);
    },
    h: function h(val) {
      if (this.resizing || this.dragging) {
        return;
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits();
      }

      this.changeHeight(val);
    }
  }
});
// CONCATENATED MODULE: ./src/components/vue-draggable-resizable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_vue_draggable_resizablevue_type_script_lang_js_ = (vue_draggable_resizablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/vue-draggable-resizable.vue





/* normalize component */

var component = normalizeComponent(
  components_vue_draggable_resizablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_draggable_resizable = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "37c8":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("2b4c");


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a72":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var LIBRARY = __webpack_require__("2d00");
var wksExt = __webpack_require__("37c8");
var defineProperty = __webpack_require__("86cc").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "3adc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0f89");
var IE8_DOM_DEFINE = __webpack_require__("a47f");
var toPrimitive = __webpack_require__("2ea1");
var dP = Object.defineProperty;

exports.f = __webpack_require__("7d95") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "436c":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("1b55")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "43c8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("c26b");
var validate = __webpack_require__("b39a");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__("e0b8")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "565d":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("6a9b");
var gOPN = __webpack_require__("d876").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "57f7":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("93c4");
__webpack_require__("6109");
module.exports = __webpack_require__("a7d3").Array.from;


/***/ }),

/***/ "58b2":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__("9e1e"), 'Object', { defineProperties: __webpack_require__("1495") });


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5ce7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("7108");
var descriptor = __webpack_require__("f845");
var setToStringTag = __webpack_require__("c0d8");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("8ce0")(IteratorPrototype, __webpack_require__("1b55")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "5d73":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("0a91");

/***/ }),

/***/ "5d8f":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("7772")('keys');
var uid = __webpack_require__("7b00");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5df3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("02f4")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("01f9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "6109":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("bc25");
var $export = __webpack_require__("d13f");
var toObject = __webpack_require__("0185");
var call = __webpack_require__("9c93");
var isArrayIter = __webpack_require__("c227");
var toLength = __webpack_require__("a5ab");
var createProperty = __webpack_require__("b3ec");
var getIterFn = __webpack_require__("f159");

$export($export.S + $export.F * !__webpack_require__("436c")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "626e":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("d74e");
var createDesc = __webpack_require__("f845");
var toIObject = __webpack_require__("6a9b");
var toPrimitive = __webpack_require__("2ea1");
var has = __webpack_require__("43c8");
var IE8_DOM_DEFINE = __webpack_require__("a47f");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("7d95") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "6277":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("7b00")('meta');
var isObject = __webpack_require__("6f8a");
var has = __webpack_require__("43c8");
var setDesc = __webpack_require__("3adc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("d782")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "67ab":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("ca5a")('meta');
var isObject = __webpack_require__("d3f4");
var has = __webpack_require__("69a8");
var setDesc = __webpack_require__("86cc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("79e5")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "67bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("b258");

/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "6881":
/***/ (function(module, exports, __webpack_require__) {

(function(t,n){ true?module.exports=n():undefined})("undefined"!==typeof self?self:this,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s="fb15")}({"01f9":function(t,n,e){"use strict";var r=e("2d00"),o=e("5ca1"),i=e("2aba"),c=e("32e9"),u=e("84f2"),a=e("41a0"),f=e("7f20"),s=e("38fd"),l=e("2b4c")("iterator"),p=!([].keys&&"next"in[].keys()),d="@@iterator",h="keys",v="values",y=function(){return this};t.exports=function(t,n,e,b,g,x,m){a(e,n,b);var S,_,w,E=function(t){if(!p&&t in P)return P[t];switch(t){case h:return function(){return new e(this,t)};case v:return function(){return new e(this,t)}}return function(){return new e(this,t)}},O=n+" Iterator",j=g==v,T=!1,P=t.prototype,M=P[l]||P[d]||g&&P[g],I=M||E(g),A=g?j?E("entries"):I:void 0,N="Array"==n&&P.entries||M;if(N&&(w=s(N.call(new t)),w!==Object.prototype&&w.next&&(f(w,O,!0),r||"function"==typeof w[l]||c(w,l,y))),j&&M&&M.name!==v&&(T=!0,I=function(){return M.call(this)}),r&&!m||!p&&!T&&P[l]||c(P,l,I),u[n]=I,u[O]=y,g)if(S={values:j?I:E(v),keys:x?I:E(h),entries:A},m)for(_ in S)_ in P||i(P,_,S[_]);else o(o.P+o.F*(p||T),n,S);return S}},"02f4":function(t,n,e){var r=e("4588"),o=e("be13");t.exports=function(t){return function(n,e){var i,c,u=String(o(n)),a=r(e),f=u.length;return a<0||a>=f?t?"":void 0:(i=u.charCodeAt(a),i<55296||i>56319||a+1===f||(c=u.charCodeAt(a+1))<56320||c>57343?t?u.charAt(a):i:t?u.slice(a,a+2):c-56320+(i-55296<<10)+65536)}}},"0390":function(t,n,e){"use strict";var r=e("02f4")(!0);t.exports=function(t,n,e){return n+(e?r(t,n).length:1)}},"0a49":function(t,n,e){var r=e("9b43"),o=e("626a"),i=e("4bf8"),c=e("9def"),u=e("cd1c");t.exports=function(t,n){var e=1==t,a=2==t,f=3==t,s=4==t,l=6==t,p=5==t||l,d=n||u;return function(n,u,h){for(var v,y,b=i(n),g=o(b),x=r(u,h,3),m=c(g.length),S=0,_=e?d(n,m):a?d(n,0):void 0;m>S;S++)if((p||S in g)&&(v=g[S],y=x(v,S,b),t))if(e)_[S]=y;else if(y)switch(t){case 3:return!0;case 5:return v;case 6:return S;case 2:_.push(v)}else if(s)return!1;return l?-1:f||s?s:_}}},"0bfb":function(t,n,e){"use strict";var r=e("cb7c");t.exports=function(){var t=r(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},"0d58":function(t,n,e){var r=e("ce10"),o=e("e11e");t.exports=Object.keys||function(t){return r(t,o)}},"0f89":function(t,n,e){var r=e("6f8a");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},1169:function(t,n,e){var r=e("2d95");t.exports=Array.isArray||function(t){return"Array"==r(t)}},"11e9":function(t,n,e){var r=e("52a7"),o=e("4630"),i=e("6821"),c=e("6a99"),u=e("69a8"),a=e("c69a"),f=Object.getOwnPropertyDescriptor;n.f=e("9e1e")?f:function(t,n){if(t=i(t),n=c(n,!0),a)try{return f(t,n)}catch(e){}if(u(t,n))return o(!r.f.call(t,n),t[n])}},"12fd":function(t,n,e){var r=e("6f8a"),o=e("da3c").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},1495:function(t,n,e){var r=e("86cc"),o=e("cb7c"),i=e("0d58");t.exports=e("9e1e")?Object.defineProperties:function(t,n){o(t);var e,c=i(n),u=c.length,a=0;while(u>a)r.f(t,e=c[a++],n[e]);return t}},"214f":function(t,n,e){"use strict";e("b0c5");var r=e("2aba"),o=e("32e9"),i=e("79e5"),c=e("be13"),u=e("2b4c"),a=e("520a"),f=u("species"),s=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2===e.length&&"a"===e[0]&&"b"===e[1]}();t.exports=function(t,n,e){var p=u(t),d=!i((function(){var n={};return n[p]=function(){return 7},7!=""[t](n)})),h=d?!i((function(){var n=!1,e=/a/;return e.exec=function(){return n=!0,null},"split"===t&&(e.constructor={},e.constructor[f]=function(){return e}),e[p](""),!n})):void 0;if(!d||!h||"replace"===t&&!s||"split"===t&&!l){var v=/./[p],y=e(c,p,""[t],(function(t,n,e,r,o){return n.exec===a?d&&!o?{done:!0,value:v.call(n,e,r)}:{done:!0,value:t.call(e,n,r)}:{done:!1}})),b=y[0],g=y[1];r(String.prototype,t,b),o(RegExp.prototype,p,2==n?function(t,n){return g.call(t,this,n)}:function(t){return g.call(t,this)})}}},"230e":function(t,n,e){var r=e("d3f4"),o=e("7726").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},"23c6":function(t,n,e){var r=e("2d95"),o=e("2b4c")("toStringTag"),i="Arguments"==r(function(){return arguments}()),c=function(t,n){try{return t[n]}catch(e){}};t.exports=function(t){var n,e,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=c(n=Object(t),o))?e:i?r(n):"Object"==(u=r(n))&&"function"==typeof n.callee?"Arguments":u}},"2aba":function(t,n,e){var r=e("7726"),o=e("32e9"),i=e("69a8"),c=e("ca5a")("src"),u="toString",a=Function[u],f=(""+a).split(u);e("8378").inspectSource=function(t){return a.call(t)},(t.exports=function(t,n,e,u){var a="function"==typeof e;a&&(i(e,"name")||o(e,"name",n)),t[n]!==e&&(a&&(i(e,c)||o(e,c,t[n]?""+t[n]:f.join(String(n)))),t===r?t[n]=e:u?t[n]?t[n]=e:o(t,n,e):(delete t[n],o(t,n,e)))})(Function.prototype,u,(function(){return"function"==typeof this&&this[c]||a.call(this)}))},"2aeb":function(t,n,e){var r=e("cb7c"),o=e("1495"),i=e("e11e"),c=e("613b")("IE_PROTO"),u=function(){},a="prototype",f=function(){var t,n=e("230e")("iframe"),r=i.length,o="<",c=">";n.style.display="none",e("fab2").appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write(o+"script"+c+"document.F=Object"+o+"/script"+c),t.close(),f=t.F;while(r--)delete f[a][i[r]];return f()};t.exports=Object.create||function(t,n){var e;return null!==t?(u[a]=r(t),e=new u,u[a]=null,e[c]=t):e=f(),void 0===n?e:o(e,n)}},"2b4c":function(t,n,e){var r=e("5537")("wks"),o=e("ca5a"),i=e("7726").Symbol,c="function"==typeof i,u=t.exports=function(t){return r[t]||(r[t]=c&&i[t]||(c?i:o)("Symbol."+t))};u.store=r},"2d00":function(t,n){t.exports=!1},"2d95":function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},"2ea1":function(t,n,e){var r=e("6f8a");t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"2f21":function(t,n,e){"use strict";var r=e("79e5");t.exports=function(t,n){return!!t&&r((function(){n?t.call(null,(function(){}),1):t.call(null)}))}},"32e9":function(t,n,e){var r=e("86cc"),o=e("4630");t.exports=e("9e1e")?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},3846:function(t,n,e){e("9e1e")&&"g"!=/./g.flags&&e("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:e("0bfb")})},"38fd":function(t,n,e){var r=e("69a8"),o=e("4bf8"),i=e("613b")("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},"3adc":function(t,n,e){var r=e("0f89"),o=e("a47f"),i=e("2ea1"),c=Object.defineProperty;n.f=e("7d95")?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return c(t,n,e)}catch(u){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},"41a0":function(t,n,e){"use strict";var r=e("2aeb"),o=e("4630"),i=e("7f20"),c={};e("32e9")(c,e("2b4c")("iterator"),(function(){return this})),t.exports=function(t,n,e){t.prototype=r(c,{next:o(1,e)}),i(t,n+" Iterator")}},"43c8":function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},4588:function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},4630:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},"4bf8":function(t,n,e){var r=e("be13");t.exports=function(t){return Object(r(t))}},"520a":function(t,n,e){"use strict";var r=e("0bfb"),o=RegExp.prototype.exec,i=String.prototype.replace,c=o,u="lastIndex",a=function(){var t=/a/,n=/b*/g;return o.call(t,"a"),o.call(n,"a"),0!==t[u]||0!==n[u]}(),f=void 0!==/()??/.exec("")[1],s=a||f;s&&(c=function(t){var n,e,c,s,l=this;return f&&(e=new RegExp("^"+l.source+"$(?!\\s)",r.call(l))),a&&(n=l[u]),c=o.call(l,t),a&&c&&(l[u]=l.global?c.index+c[0].length:n),f&&c&&c.length>1&&i.call(c[0],e,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(c[s]=void 0)})),c}),t.exports=c},"52a7":function(t,n){n.f={}.propertyIsEnumerable},5537:function(t,n,e){var r=e("8378"),o=e("7726"),i="__core-js_shared__",c=o[i]||(o[i]={});(t.exports=function(t,n){return c[t]||(c[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e("2d00")?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},"5ca1":function(t,n,e){var r=e("7726"),o=e("8378"),i=e("32e9"),c=e("2aba"),u=e("9b43"),a="prototype",f=function(t,n,e){var s,l,p,d,h=t&f.F,v=t&f.G,y=t&f.S,b=t&f.P,g=t&f.B,x=v?r:y?r[n]||(r[n]={}):(r[n]||{})[a],m=v?o:o[n]||(o[n]={}),S=m[a]||(m[a]={});for(s in v&&(e=n),e)l=!h&&x&&void 0!==x[s],p=(l?x:e)[s],d=g&&l?u(p,r):b&&"function"==typeof p?u(Function.call,p):p,x&&c(x,s,p,t&f.U),m[s]!=p&&i(m,s,d),b&&S[s]!=p&&(S[s]=p)};r.core=o,f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},"5dbc":function(t,n,e){var r=e("d3f4"),o=e("8b97").set;t.exports=function(t,n,e){var i,c=n.constructor;return c!==e&&"function"==typeof c&&(i=c.prototype)!==e.prototype&&r(i)&&o&&o(t,i),t}},"5f1b":function(t,n,e){"use strict";var r=e("23c6"),o=RegExp.prototype.exec;t.exports=function(t,n){var e=t.exec;if("function"===typeof e){var i=e.call(t,n);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t,n)}},"613b":function(t,n,e){var r=e("5537")("keys"),o=e("ca5a");t.exports=function(t){return r[t]||(r[t]=o(t))}},"626a":function(t,n,e){var r=e("2d95");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},6821:function(t,n,e){var r=e("626a"),o=e("be13");t.exports=function(t){return r(o(t))}},"69a8":function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},"6a99":function(t,n,e){var r=e("d3f4");t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"6b54":function(t,n,e){"use strict";e("3846");var r=e("cb7c"),o=e("0bfb"),i=e("9e1e"),c="toString",u=/./[c],a=function(t){e("2aba")(RegExp.prototype,c,t,!0)};e("79e5")((function(){return"/a/b"!=u.call({source:"a",flags:"b"})}))?a((function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?o.call(t):void 0)})):u.name!=c&&a((function(){return u.call(this)}))},"6f8a":function(t,n){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},7726:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},"77f1":function(t,n,e){var r=e("4588"),o=Math.max,i=Math.min;t.exports=function(t,n){return t=r(t),t<0?o(t+n,0):i(t,n)}},"79e5":function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},"7d95":function(t,n,e){t.exports=!e("d782")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},"7f20":function(t,n,e){var r=e("86cc").f,o=e("69a8"),i=e("2b4c")("toStringTag");t.exports=function(t,n,e){t&&!o(t=e?t:t.prototype,i)&&r(t,i,{configurable:!0,value:n})}},"7f7f":function(t,n,e){var r=e("86cc").f,o=Function.prototype,i=/^\s*function ([^ (]*)/,c="name";c in o||e("9e1e")&&r(o,c,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},8378:function(t,n){var e=t.exports={version:"2.6.1"};"number"==typeof __e&&(__e=e)},"84f2":function(t,n){t.exports={}},"85f2":function(t,n,e){t.exports=e("ec5b")},"86cc":function(t,n,e){var r=e("cb7c"),o=e("c69a"),i=e("6a99"),c=Object.defineProperty;n.f=e("9e1e")?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return c(t,n,e)}catch(u){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},"87b3":function(t,n,e){var r=Date.prototype,o="Invalid Date",i="toString",c=r[i],u=r.getTime;new Date(NaN)+""!=o&&e("2aba")(r,i,(function(){var t=u.call(this);return t===t?c.call(this):o}))},8875:function(t,n,e){var r,o,i;(function(e,c){o=[],r=c,i="function"===typeof r?r.apply(n,o):r,void 0===i||(t.exports=i)})("undefined"!==typeof self&&self,(function(){function t(){if(document.currentScript)return document.currentScript;try{throw new Error}catch(l){var t,n,e,r=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,o=/@([^@]*):(\d+):(\d+)\s*$/gi,i=r.exec(l.stack)||o.exec(l.stack),c=i&&i[1]||!1,u=i&&i[2]||!1,a=document.location.href.replace(document.location.hash,""),f=document.getElementsByTagName("script");c===a&&(t=document.documentElement.outerHTML,n=new RegExp("(?:[^\\n]+?\\n){0,"+(u-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),e=t.replace(n,"$1").trim());for(var s=0;s<f.length;s++){if("interactive"===f[s].readyState)return f[s];if(f[s].src===c)return f[s];if(c===a&&f[s].innerHTML&&f[s].innerHTML.trim()===e)return f[s]}return null}}return t}))},"8b97":function(t,n,e){var r=e("d3f4"),o=e("cb7c"),i=function(t,n){if(o(t),!r(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,r){try{r=e("9b43")(Function.call,e("11e9").f(Object.prototype,"__proto__").set,2),r(t,[]),n=!(t instanceof Array)}catch(o){n=!0}return function(t,e){return i(t,e),n?t.__proto__=e:r(t,e),t}}({},!1):void 0),check:i}},"8ce0":function(t,n,e){var r=e("3adc"),o=e("f845");t.exports=e("7d95")?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},9093:function(t,n,e){var r=e("ce10"),o=e("e11e").concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},"9b43":function(t,n,e){var r=e("d8e8");t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},"9c6c":function(t,n,e){var r=e("2b4c")("unscopables"),o=Array.prototype;void 0==o[r]&&e("32e9")(o,r,{}),t.exports=function(t){o[r][t]=!0}},"9def":function(t,n,e){var r=e("4588"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},"9e1e":function(t,n,e){t.exports=!e("79e5")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},a47f:function(t,n,e){t.exports=!e("7d95")&&!e("d782")((function(){return 7!=Object.defineProperty(e("12fd")("div"),"a",{get:function(){return 7}}).a}))},a481:function(t,n,e){"use strict";var r=e("cb7c"),o=e("4bf8"),i=e("9def"),c=e("4588"),u=e("0390"),a=e("5f1b"),f=Math.max,s=Math.min,l=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,h=function(t){return void 0===t?t:String(t)};e("214f")("replace",2,(function(t,n,e,v){return[function(r,o){var i=t(this),c=void 0==r?void 0:r[n];return void 0!==c?c.call(r,i,o):e.call(String(i),r,o)},function(t,n){var o=v(e,t,this,n);if(o.done)return o.value;var l=r(t),p=String(this),d="function"===typeof n;d||(n=String(n));var b=l.global;if(b){var g=l.unicode;l.lastIndex=0}var x=[];while(1){var m=a(l,p);if(null===m)break;if(x.push(m),!b)break;var S=String(m[0]);""===S&&(l.lastIndex=u(p,i(l.lastIndex),g))}for(var _="",w=0,E=0;E<x.length;E++){m=x[E];for(var O=String(m[0]),j=f(s(c(m.index),p.length),0),T=[],P=1;P<m.length;P++)T.push(h(m[P]));var M=m.groups;if(d){var I=[O].concat(T,j,p);void 0!==M&&I.push(M);var A=String(n.apply(void 0,I))}else A=y(O,p,j,T,M,n);j>=w&&(_+=p.slice(w,j)+A,w=j+O.length)}return _+p.slice(w)}];function y(t,n,r,i,c,u){var a=r+t.length,f=i.length,s=d;return void 0!==c&&(c=o(c),s=p),e.call(u,s,(function(e,o){var u;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(a);case"<":u=c[o.slice(1,-1)];break;default:var s=+o;if(0===s)return o;if(s>f){var p=l(s/10);return 0===p?o:p<=f?void 0===i[p-1]?o.charAt(1):i[p-1]+o.charAt(1):o}u=i[s-1]}return void 0===u?"":u}))}}))},a7d3:function(t,n){var e=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=e)},aa77:function(t,n,e){var r=e("5ca1"),o=e("be13"),i=e("79e5"),c=e("fdef"),u="["+c+"]",a="​",f=RegExp("^"+u+u+"*"),s=RegExp(u+u+"*$"),l=function(t,n,e){var o={},u=i((function(){return!!c[t]()||a[t]()!=a})),f=o[t]=u?n(p):c[t];e&&(o[e]=f),r(r.P+r.F*u,"String",o)},p=l.trim=function(t,n){return t=String(o(t)),1&n&&(t=t.replace(f,"")),2&n&&(t=t.replace(s,"")),t};t.exports=l},ac6a:function(t,n,e){for(var r=e("cadf"),o=e("0d58"),i=e("2aba"),c=e("7726"),u=e("32e9"),a=e("84f2"),f=e("2b4c"),s=f("iterator"),l=f("toStringTag"),p=a.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=o(d),v=0;v<h.length;v++){var y,b=h[v],g=d[b],x=c[b],m=x&&x.prototype;if(m&&(m[s]||u(m,s,p),m[l]||u(m,l,b),a[b]=p,g))for(y in r)m[y]||i(m,y,r[y],!0)}},b0c5:function(t,n,e){"use strict";var r=e("520a");e("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},ba1e:function(t,n,e){},bc25:function(t,n,e){var r=e("f2fe");t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},be13:function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},c366:function(t,n,e){var r=e("6821"),o=e("9def"),i=e("77f1");t.exports=function(t){return function(n,e,c){var u,a=r(n),f=o(a.length),s=i(c,f);if(t&&e!=e){while(f>s)if(u=a[s++],u!=u)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}}},c5f6:function(t,n,e){"use strict";var r=e("7726"),o=e("69a8"),i=e("2d95"),c=e("5dbc"),u=e("6a99"),a=e("79e5"),f=e("9093").f,s=e("11e9").f,l=e("86cc").f,p=e("aa77").trim,d="Number",h=r[d],v=h,y=h.prototype,b=i(e("2aeb")(y))==d,g="trim"in String.prototype,x=function(t){var n=u(t,!1);if("string"==typeof n&&n.length>2){n=g?n.trim():p(n,3);var e,r,o,i=n.charCodeAt(0);if(43===i||45===i){if(e=n.charCodeAt(2),88===e||120===e)return NaN}else if(48===i){switch(n.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+n}for(var c,a=n.slice(2),f=0,s=a.length;f<s;f++)if(c=a.charCodeAt(f),c<48||c>o)return NaN;return parseInt(a,r)}}return+n};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var n=arguments.length<1?0:t,e=this;return e instanceof h&&(b?a((function(){y.valueOf.call(e)})):i(e)!=d)?c(new v(x(n)),e,h):x(n)};for(var m,S=e("9e1e")?f(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_=0;S.length>_;_++)o(v,m=S[_])&&!o(h,m)&&l(h,m,s(v,m));h.prototype=y,y.constructor=h,e("2aba")(r,d,h)}},c69a:function(t,n,e){t.exports=!e("9e1e")&&!e("79e5")((function(){return 7!=Object.defineProperty(e("230e")("div"),"a",{get:function(){return 7}}).a}))},ca5a:function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},cadf:function(t,n,e){"use strict";var r=e("9c6c"),o=e("d53b"),i=e("84f2"),c=e("6821");t.exports=e("01f9")(Array,"Array",(function(t,n){this._t=c(t),this._i=0,this._k=n}),(function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,o(1)):o(0,"keys"==n?e:"values"==n?t[e]:[e,t[e]])}),"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},cb7c:function(t,n,e){var r=e("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},cd1c:function(t,n,e){var r=e("e853");t.exports=function(t,n){return new(r(t))(n)}},ce10:function(t,n,e){var r=e("69a8"),o=e("6821"),i=e("c366")(!1),c=e("613b")("IE_PROTO");t.exports=function(t,n){var e,u=o(t),a=0,f=[];for(e in u)e!=c&&r(u,e)&&f.push(e);while(n.length>a)r(u,e=n[a++])&&(~i(f,e)||f.push(e));return f}},d0a2:function(t,n,e){"use strict";var r=e("ba1e"),o=e.n(r);o.a},d13f:function(t,n,e){var r=e("da3c"),o=e("a7d3"),i=e("bc25"),c=e("8ce0"),u=e("43c8"),a="prototype",f=function(t,n,e){var s,l,p,d=t&f.F,h=t&f.G,v=t&f.S,y=t&f.P,b=t&f.B,g=t&f.W,x=h?o:o[n]||(o[n]={}),m=x[a],S=h?r:v?r[n]:(r[n]||{})[a];for(s in h&&(e=n),e)l=!d&&S&&void 0!==S[s],l&&u(x,s)||(p=l?S[s]:e[s],x[s]=h&&"function"!=typeof S[s]?e[s]:b&&l?i(p,r):g&&S[s]==p?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n[a]=t[a],n}(p):y&&"function"==typeof p?i(Function.call,p):p,y&&((x.virtual||(x.virtual={}))[s]=p,t&f.R&&m&&!m[s]&&c(m,s,p)))};f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},d3f4:function(t,n){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},d53b:function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},d782:function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},d8e8:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},da3c:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},e11e:function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},e341:function(t,n,e){var r=e("d13f");r(r.S+r.F*!e("7d95"),"Object",{defineProperty:e("3adc").f})},e853:function(t,n,e){var r=e("d3f4"),o=e("1169"),i=e("2b4c")("species");t.exports=function(t){var n;return o(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)||(n=void 0),r(n)&&(n=n[i],null===n&&(n=void 0))),void 0===n?Array:n}},ec5b:function(t,n,e){e("e341");var r=e("a7d3").Object;t.exports=function(t,n,e){return r.defineProperty(t,n,e)}},f2fe:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},f3e2:function(t,n,e){"use strict";var r=e("5ca1"),o=e("0a49")(0),i=e("2f21")([].forEach,!0);r(r.P+r.F*!i,"Array",{forEach:function(t){return o(this,t,arguments[1])}})},f845:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},fab2:function(t,n,e){var r=e("7726").document;t.exports=r&&r.documentElement},fb15:function(t,n,e){"use strict";if(e.r(n),"undefined"!==typeof window){var r=window.document.currentScript,o=e("8875");r=o(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:o});var i=r&&r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);i&&(e.p=i[1])}var c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("svg",{class:t.klass,style:t.style,attrs:{version:"1.1",role:t.label?"img":"presentation","aria-label":t.label,x:t.x,y:t.y,width:t.width,height:t.height,viewBox:t.box}},[t._t("default",[t.icon&&t.icon.paths?t._l(t.icon.paths,(function(n,r){return e("path",t._b({key:"path-"+r},"path",n,!1))})):t._e(),t._v(" "),t.icon&&t.icon.polygons?t._l(t.icon.polygons,(function(n,r){return e("polygon",t._b({key:"polygon-"+r},"polygon",n,!1))})):t._e(),t._v(" "),t.icon&&t.icon.raw?[e("g",t._b({domProps:{innerHTML:t._s(t.raw)}},"g",t.icon.g,!1))]:t._e()])],2)},u=[],a=(e("6b54"),e("87b3"),e("ac6a"),e("f3e2"),e("a481"),e("85f2")),f=e.n(a);function s(t,n,e){return n in t?f()(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e("7f7f"),e("c5f6");var l={},p={name:"fa-icon",props:{name:{type:String,validator:function(t){return!t||t in l||(console.warn('Invalid prop: prop "name" is referring to an unregistered icon "'.concat(t,'".')+"\nPlease make sure you have imported this icon before using it."),!1)}},scale:[Number,String],spin:Boolean,pulse:Boolean,flip:{validator:function(t){return"h"===t||"v"===t||"vh"===t}},label:String},data:function(){return{x:!1,y:!1,childrenWidth:0,childrenHeight:0,outerScale:1}},computed:{normalizedScale:function(){var t=this.scale;return t="undefined"===typeof t?1:Number(t),isNaN(t)||t<=0?(console.warn('Invalid prop: prop "scale" should be a number over 0.',this),this.outerScale):t*this.outerScale},klass:function(){return s({"fa-icon":!0,"fa-spin":this.spin,"fa-flip-h":"h"===this.flip,"fa-flip-v":"v"===this.flip,"fa-flip-vh":"vh"===this.flip,"fa-pulse":this.pulse},this.$options.name,!0)},icon:function(){return this.name?l[this.name]:null},box:function(){return this.icon?"0 0 ".concat(this.icon.width," ").concat(this.icon.height):"0 0 ".concat(this.width," ").concat(this.height)},ratio:function(){if(!this.icon)return 1;var t=this.icon,n=t.width,e=t.height;return Math.max(n,e)/16},width:function(){return this.childrenWidth||this.icon&&this.icon.width/this.ratio*this.normalizedScale||0},height:function(){return this.childrenHeight||this.icon&&this.icon.height/this.ratio*this.normalizedScale||0},style:function(){return 1!==this.normalizedScale&&{fontSize:this.normalizedScale+"em"}},raw:function(){if(!this.icon||!this.icon.raw)return null;var t=this.icon.raw,n={};return t=t.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g,(function(t,e,r){var o=h();return n[r]=o,' id="'.concat(o,'"')})),t=t.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,(function(t,e,r,o){var i=e||o;return i&&n[i]?"#".concat(n[i]):t})),t}},mounted:function(){var t=this;if(this.name||0!==this.$children.length){if(!this.icon){var n=0,e=0;this.$children.forEach((function(r){r.outerScale=t.normalizedScale,n=Math.max(n,r.width),e=Math.max(e,r.height)})),this.childrenWidth=n,this.childrenHeight=e,this.$children.forEach((function(t){t.x=(n-t.width)/2,t.y=(e-t.height)/2}))}}else console.warn('Invalid prop: prop "name" is required.')},register:function(t){for(var n in t){var e=t[n];e.paths||(e.paths=[]),e.d&&e.paths.push({d:e.d}),e.polygons||(e.polygons=[]),e.points&&e.polygons.push({points:e.points}),l[n]=e}},icons:l},d=870711;function h(){return"fa-".concat((d++).toString(16))}var v=p;e("d0a2");function y(t,n,e,r,o,i,c,u){var a,f="function"===typeof t?t.options:t;if(n&&(f.render=n,f.staticRenderFns=e,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),c?(a=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(c)},f._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(f.functional){f._injectStyles=a;var s=f.render;f.render=function(t,n){return a.call(n),s(t,n)}}else{var l=f.beforeCreate;f.beforeCreate=l?[].concat(l,a):[a]}return{exports:t,options:f}}var b=y(v,c,u,!1,null,null,null),g=b.exports,x=g;n["default"]=x},fdef:function(t,n){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}})["default"]}));
//# sourceMappingURL=VueSvgIcons.umd.min.js.map

/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6a9b":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("8bab");
var defined = __webpack_require__("e5fa");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6e1f":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6f42":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6f8a":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "7108":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("0f89");
var dPs = __webpack_require__("f568");
var enumBugKeys = __webpack_require__("0029");
var IE_PROTO = __webpack_require__("5d8f")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("12fd")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("103a").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7633":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("2695");
var enumBugKeys = __webpack_require__("0029");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "774e":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("57f7");

/***/ }),

/***/ "7772":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("a7d3");
var global = __webpack_require__("da3c");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b457") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7b00":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "7bbc":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("6821");
var gOPN = __webpack_require__("9093").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "7d8a":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6e1f");
var TAG = __webpack_require__("1b55")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "7d95":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("d782")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ec5b");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "87b3":
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__("2aba")(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "89ca":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("b42c");
__webpack_require__("93c4");
module.exports = __webpack_require__("d38f");


/***/ }),

/***/ "8a81":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var DESCRIPTORS = __webpack_require__("9e1e");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var META = __webpack_require__("67ab").KEY;
var $fails = __webpack_require__("79e5");
var shared = __webpack_require__("5537");
var setToStringTag = __webpack_require__("7f20");
var uid = __webpack_require__("ca5a");
var wks = __webpack_require__("2b4c");
var wksExt = __webpack_require__("37c8");
var wksDefine = __webpack_require__("3a72");
var enumKeys = __webpack_require__("d4c0");
var isArray = __webpack_require__("1169");
var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var createDesc = __webpack_require__("4630");
var _create = __webpack_require__("2aeb");
var gOPNExt = __webpack_require__("7bbc");
var $GOPD = __webpack_require__("11e9");
var $DP = __webpack_require__("86cc");
var $keys = __webpack_require__("0d58");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("9093").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("52a7").f = $propertyIsEnumerable;
  __webpack_require__("2621").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("2d00")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("32e9")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bab":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6e1f");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "8ce0":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("3adc");
var createDesc = __webpack_require__("f845");
module.exports = __webpack_require__("7d95") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "93c4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("2a4e")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("e4a9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "998a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c93":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("0f89");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a47f":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("7d95") && !__webpack_require__("d782")(function () {
  return Object.defineProperty(__webpack_require__("12fd")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a5ab":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("a812");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "a745":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d604");

/***/ }),

/***/ "a7d3":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "a812":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac4d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3a72")('asyncIterator');


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b22a":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "b258":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("d256");
__webpack_require__("12fd9");
__webpack_require__("d127");
__webpack_require__("d24f");
module.exports = __webpack_require__("a7d3").Symbol;


/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "b3e7":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "b3ec":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("3adc");
var createDesc = __webpack_require__("f845");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "b42c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("fa54");
var global = __webpack_require__("da3c");
var hide = __webpack_require__("8ce0");
var Iterators = __webpack_require__("b22a");
var TO_STRING_TAG = __webpack_require__("1b55")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "b457":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "b5aa":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6e1f");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "b635":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return install; });
/* harmony import */ var _components_vue_draggable_resizable_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f42");
/* harmony import */ var _components_vue_draggable_resizable_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_vue_draggable_resizable_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_vue_draggable_resizable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3425");


function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueDragDropAlign', _components_vue_draggable_resizable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
}
var plugin = {
  install: install
};
var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

/* harmony default export */ __webpack_exports__["a"] = (_components_vue_draggable_resizable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "b77f":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0f89");
var get = __webpack_require__("f159");
module.exports = __webpack_require__("a7d3").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "bc25":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("f2fe");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c0d8":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("3adc").f;
var has = __webpack_require__("43c8");
var TAG = __webpack_require__("1b55")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "c227":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("b22a");
var ITERATOR = __webpack_require__("1b55")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "c26b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__("86cc").f;
var create = __webpack_require__("2aeb");
var redefineAll = __webpack_require__("dcbc");
var ctx = __webpack_require__("9b43");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var $iterDefine = __webpack_require__("01f9");
var step = __webpack_require__("d53b");
var setSpecies = __webpack_require__("7a56");
var DESCRIPTORS = __webpack_require__("9e1e");
var fastKey = __webpack_require__("67ab").fastKey;
var validate = __webpack_require__("b39a");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("89ca");

/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d127":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("0a0a")('asyncIterator');


/***/ }),

/***/ "d13f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da3c");
var core = __webpack_require__("a7d3");
var ctx = __webpack_require__("bc25");
var hide = __webpack_require__("8ce0");
var has = __webpack_require__("43c8");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "d24f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("0a0a")('observable');


/***/ }),

/***/ "d256":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("da3c");
var has = __webpack_require__("43c8");
var DESCRIPTORS = __webpack_require__("7d95");
var $export = __webpack_require__("d13f");
var redefine = __webpack_require__("2312");
var META = __webpack_require__("6277").KEY;
var $fails = __webpack_require__("d782");
var shared = __webpack_require__("7772");
var setToStringTag = __webpack_require__("c0d8");
var uid = __webpack_require__("7b00");
var wks = __webpack_require__("1b55");
var wksExt = __webpack_require__("fda1");
var wksDefine = __webpack_require__("0a0a");
var enumKeys = __webpack_require__("d2d6");
var isArray = __webpack_require__("b5aa");
var anObject = __webpack_require__("0f89");
var isObject = __webpack_require__("6f8a");
var toObject = __webpack_require__("0185");
var toIObject = __webpack_require__("6a9b");
var toPrimitive = __webpack_require__("2ea1");
var createDesc = __webpack_require__("f845");
var _create = __webpack_require__("7108");
var gOPNExt = __webpack_require__("565d");
var $GOPD = __webpack_require__("626e");
var $GOPS = __webpack_require__("31c2");
var $DP = __webpack_require__("3adc");
var $keys = __webpack_require__("7633");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("d876").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("d74e").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("b457")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("8ce0")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "d25f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var $filter = __webpack_require__("0a49")(2);

$export($export.P + $export.F * !__webpack_require__("2f21")([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d2d6":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("7633");
var gOPS = __webpack_require__("31c2");
var pIE = __webpack_require__("d74e");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "d38f":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("7d8a");
var ITERATOR = __webpack_require__("1b55")('iterator');
var Iterators = __webpack_require__("b22a");
module.exports = __webpack_require__("a7d3").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d4c0":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d604":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1938");
module.exports = __webpack_require__("a7d3").Array.isArray;


/***/ }),

/***/ "d74e":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "d782":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "d876":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("2695");
var hiddenKeys = __webpack_require__("0029").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "da3c":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "e0b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var redefineAll = __webpack_require__("dcbc");
var meta = __webpack_require__("67ab");
var forOf = __webpack_require__("4a59");
var anInstance = __webpack_require__("f605");
var isObject = __webpack_require__("d3f4");
var fails = __webpack_require__("79e5");
var $iterDetect = __webpack_require__("5cc5");
var setToStringTag = __webpack_require__("7f20");
var inheritIfRequired = __webpack_require__("5dbc");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e341":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("d13f");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("7d95"), 'Object', { defineProperty: __webpack_require__("3adc").f });


/***/ }),

/***/ "e4a9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b457");
var $export = __webpack_require__("d13f");
var redefine = __webpack_require__("2312");
var hide = __webpack_require__("8ce0");
var Iterators = __webpack_require__("b22a");
var $iterCreate = __webpack_require__("5ce7");
var setToStringTag = __webpack_require__("c0d8");
var getPrototypeOf = __webpack_require__("ff0c");
var ITERATOR = __webpack_require__("1b55")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "e5fa":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "ec5b":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("e341");
var $Object = __webpack_require__("a7d3").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "f159":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("7d8a");
var ITERATOR = __webpack_require__("1b55")('iterator');
var Iterators = __webpack_require__("b22a");
module.exports = __webpack_require__("a7d3").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f2fe":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "f3e2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var $forEach = __webpack_require__("0a49")(0);
var STRICT = __webpack_require__("2f21")([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "f568":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("3adc");
var anObject = __webpack_require__("0f89");
var getKeys = __webpack_require__("7633");

module.exports = __webpack_require__("7d95") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f845":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "fa54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("b3e7");
var step = __webpack_require__("245b");
var Iterators = __webpack_require__("b22a");
var toIObject = __webpack_require__("6a9b");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("e4a9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ src_0["b" /* install */]; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/index.js
var src_0 = __webpack_require__("b635");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_0["a" /* default */]);



/***/ }),

/***/ "fda1":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("1b55");


/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "ff0c":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("43c8");
var toObject = __webpack_require__("0185");
var IE_PROTO = __webpack_require__("5d8f")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=VueDragDropAlign.umd.js.map