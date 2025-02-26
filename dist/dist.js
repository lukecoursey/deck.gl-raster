(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@deck.gl/layers'), require('@luma.gl/engine'), require('@luma.gl/core'), require('@luma.gl/constants'), require('@deck.gl/mesh-layers'), require('@deck.gl/core')) :
typeof define === 'function' && define.amd ? define(['exports', '@deck.gl/layers', '@luma.gl/engine', '@luma.gl/core', '@luma.gl/constants', '@deck.gl/mesh-layers', '@deck.gl/core'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.deck = global.deck || {}, global.deck['gl-raster'] = {}), global.deck, global.luma, global.luma, global.luma.GL, global.deck, global.deck));
}(this, (function (exports, layers, engine, core, GL, meshLayers, core$1) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var GL__default = /*#__PURE__*/_interopDefaultLegacy(GL);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var lodash_isequal = createCommonjsModule(function (module, exports) {
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;
});

const DEFAULT_TEXTURE_PARAMETERS = {
  [GL__default['default'].TEXTURE_MIN_FILTER]: GL__default['default'].NEAREST,
  [GL__default['default'].TEXTURE_MAG_FILTER]: GL__default['default'].NEAREST,
  [GL__default['default'].TEXTURE_WRAP_S]: GL__default['default'].CLAMP_TO_EDGE,
  [GL__default['default'].TEXTURE_WRAP_T]: GL__default['default'].CLAMP_TO_EDGE,
};

function loadImages({gl, images, props, oldProps}) {
  // Change to `true` if we need to setState with a new `images` object
  let imagesDirty = false;

  // If there are any removed keys, which previously existed in oldProps and
  // this.state.images but no longer exist in props, remove from the images
  // object
  if (oldProps && oldProps.images) {
    for (const key in oldProps.images) {
      if (props.images && !(key in props.images) && key in images) {
        delete images[key];
        imagesDirty = true;
      }
    }
  }

  // Check if any keys of props.images have changed
  const changedKeys = [];
  for (const key in props.images) {
    // If oldProps.images didn't exist or it existed and this key didn't exist
    if (!oldProps.images || (oldProps.images && !(key in oldProps.images))) {
      changedKeys.push(key);
      continue;
    }

    // Deep compare when the key previously existed to see if it changed
    if (!lodash_isequal(props.images[key], oldProps.images[key])) {
      changedKeys.push(key);
    }
  }

  for (const key of changedKeys) {
    const imageData = props.images[key];
    if (!imageData) {
      continue;
    }

    if (Array.isArray(imageData)) {
      images[key] = imageData.map((x) => loadTexture(gl, x));
    } else {
      images[key] = loadTexture(gl, imageData);
    }
    imagesDirty = true;
  }

  if (imagesDirty) {
    return images;
  }

  return null;
}

/**
 * Create Texture2D object from image data
 *
 * @param   {any}  gl gl context
 * @param   {Texture2D | Object} imageData input object representing image
 *
 * @return  {Texture2D?} Texture2D object representing image
 */
function loadTexture(gl, imageData) {
  if (!imageData) {
    return null;
  }

  if (imageData instanceof core.Texture2D) {
    return imageData;
  }

  let textureParams = {
    ...imageData,
    parameters: {
      ...DEFAULT_TEXTURE_PARAMETERS,
      ...imageData.parameters,
    },
  };

  if (!core.isWebGL2(gl)) {
    textureParams = webgl1TextureFallbacks(textureParams);
  }

  return new core.Texture2D(gl, textureParams);
}

/**
 * Texture fallbacks for WebGL1
 * Fallback ideas derived from viv
 * https://github.com/hms-dbmi/viv/blob/5bcec429eeba55914ef3d7155a610d82048520a0/src/layers/XRLayer/XRLayer.js#L280-L302
 *
 * @param   {Object}  textureParams  [textureParams description]
 *
 * @return  {Object}                 [return description]
 */
function webgl1TextureFallbacks(textureParams) {
  // Set mipmaps to false
  // Not sure if this is necessary?
  // Might actually only be necessary for uint textures
  textureParams.mipmaps = false;

  // Change format to Luminance
  if ([GL__default['default'].R8UI, GL__default['default'].R16UI, GL__default['default'].R32UI].includes(textureParams.format)) {
    textureParams.format = GL__default['default'].LUMINANCE;
  }

  // Change dataFormat to Luminance
  if (textureParams.dataFormat === GL__default['default'].RED_INTEGER) {
    textureParams.dataFormat = GL__default['default'].LUMINANCE;
  }

  // Set data type to float
  if (
    [GL__default['default'].UNSIGNED_BYTE, GL__default['default'].UNSIGNED_SHORT, GL__default['default'].UNSIGNED_INT].includes(
      textureParams.type
    )
  ) {
    textureParams.type = GL__default['default'].FLOAT;
  }

  // Cast data to float 32 if one of the uint types
  if (
    textureParams.data instanceof Uint8Array ||
    textureParams.data instanceof Uint16Array ||
    textureParams.data instanceof Uint32Array
  ) {
    textureParams.data = new Float32Array(textureParams.data);
  }

  return textureParams;
}

var fsWebGL1$1 = "#define SHADER_NAME raster-layer-fragment-shader\n#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec2 vTexCoord;varying vec2 vTexPos;uniform float desaturate;uniform vec4 transparentColor;uniform vec3 tintColor;uniform float opacity;uniform mediump float coordinateConversion;uniform vec4 bounds;const float TILE_SIZE=512.0;const float PI=3.1415926536;const float WORLD_SCALE=TILE_SIZE/PI/2.0;vec2 lnglat_to_mercator(vec2 lnglat){float x=lnglat.x;float y=clamp(lnglat.y,-89.9,89.9);return vec2(radians(x)+PI,PI+log(tan(PI*0.25+radians(y)*0.5)))*WORLD_SCALE;}vec2 mercator_to_lnglat(vec2 xy){xy/=WORLD_SCALE;return degrees(vec2(xy.x-PI,atan(exp(xy.y-PI))*2.0-PI*0.5));}vec3 color_desaturate(vec3 color){float luminance=(color.r+color.g+color.b)*0.333333333;return mix(color,vec3(luminance),desaturate);}vec3 color_tint(vec3 color){return color*tintColor;}vec4 apply_opacity(vec3 color,float alpha){return mix(transparentColor,vec4(color,1.0),alpha);}vec2 getUV(vec2 pos){return vec2((pos.x-bounds[0])/(bounds[2]-bounds[0]),(pos.y-bounds[3])/(bounds[1]-bounds[3]));}void main(void){vec2 uv=vTexCoord;if(coordinateConversion<-0.5){vec2 lnglat=mercator_to_lnglat(vTexPos);uv=getUV(lnglat);}else if(coordinateConversion>0.5){vec2 commonPos=lnglat_to_mercator(vTexPos);uv=getUV(commonPos);}vec4 image;DECKGL_CREATE_COLOR(image,uv);DECKGL_MUTATE_COLOR(image,uv);gl_FragColor=apply_opacity(color_tint(color_desaturate(image.rgb)),image.a*opacity);geometry.uv=uv;DECKGL_FILTER_COLOR(gl_FragColor,geometry);}";

var fsWebGL2$1 = "#version 300 es\n#define SHADER_NAME raster-layer-fragment-shader\nprecision mediump float;precision mediump int;precision mediump usampler2D;in vec2 vTexCoord;in vec2 vTexPos;out vec4 color;uniform float desaturate;uniform vec4 transparentColor;uniform vec3 tintColor;uniform float opacity;uniform mediump float coordinateConversion;uniform vec4 bounds;const float TILE_SIZE=512.0;const float PI=3.1415926536;const float WORLD_SCALE=TILE_SIZE/PI/2.0;vec2 lnglat_to_mercator(vec2 lnglat){float x=lnglat.x;float y=clamp(lnglat.y,-89.9,89.9);return vec2(radians(x)+PI,PI+log(tan(PI*0.25+radians(y)*0.5)))*WORLD_SCALE;}vec2 mercator_to_lnglat(vec2 xy){xy/=WORLD_SCALE;return degrees(vec2(xy.x-PI,atan(exp(xy.y-PI))*2.0-PI*0.5));}vec3 color_desaturate(vec3 color){float luminance=(color.r+color.g+color.b)*0.333333333;return mix(color,vec3(luminance),desaturate);}vec3 color_tint(vec3 color){return color*tintColor;}vec4 apply_opacity(vec3 color,float alpha){return mix(transparentColor,vec4(color,1.0),alpha);}vec2 getUV(vec2 pos){return vec2((pos.x-bounds[0])/(bounds[2]-bounds[0]),(pos.y-bounds[3])/(bounds[1]-bounds[3]));}void main(void){vec2 uv=vTexCoord;if(coordinateConversion<-0.5){vec2 lnglat=mercator_to_lnglat(vTexPos);uv=getUV(lnglat);}else if(coordinateConversion>0.5){vec2 commonPos=lnglat_to_mercator(vTexPos);uv=getUV(commonPos);}vec4 image;DECKGL_CREATE_COLOR(image,uv);DECKGL_MUTATE_COLOR(image,uv);color=apply_opacity(color_tint(color_desaturate(image.rgb)),image.a*opacity);geometry.uv=uv;DECKGL_FILTER_COLOR(color,geometry);}";

var vsWebGL1$1 = "#define SHADER_NAME raster-layer-vertex-shader\nattribute vec2 texCoords;attribute vec3 positions;attribute vec3 positions64Low;varying vec2 vTexCoord;varying vec2 vTexPos;uniform mediump float coordinateConversion;const vec3 pickingColor=vec3(1.0,0.0,0.0);void main(void){geometry.worldPosition=positions;geometry.uv=texCoords;geometry.pickingColor=pickingColor;gl_Position=project_position_to_clipspace(positions,positions64Low,vec3(0.0),geometry.position);DECKGL_FILTER_GL_POSITION(gl_Position,geometry);vTexCoord=texCoords;if(coordinateConversion<-0.5){vTexPos=geometry.position.xy;}else if(coordinateConversion>0.5){vTexPos=geometry.worldPosition.xy;}vec4 color=vec4(0.0);DECKGL_FILTER_COLOR(color,geometry);}";

var vsWebGL2$1 = "#version 300 es\n#define SHADER_NAME raster-layer-vertex-shader\nin vec2 texCoords;in vec3 positions;in vec3 positions64Low;out vec2 vTexCoord;out vec2 vTexPos;uniform mediump float coordinateConversion;const vec3 pickingColor=vec3(1.0,0.0,0.0);void main(void){geometry.worldPosition=positions;geometry.uv=texCoords;geometry.pickingColor=pickingColor;gl_Position=project_position_to_clipspace(positions,positions64Low,vec3(0.0),geometry.position);DECKGL_FILTER_GL_POSITION(gl_Position,geometry);vTexCoord=texCoords;if(coordinateConversion<-0.5){vTexPos=geometry.position.xy;}else if(coordinateConversion>0.5){vTexPos=geometry.worldPosition.xy;}vec4 color=vec4(0.0);DECKGL_FILTER_COLOR(color,geometry);}";

const defaultProps$1 = {
  ...layers.BitmapLayer.defaultProps,
  modules: {type: 'array', value: [], compare: true},
  images: {type: 'object', value: {}, compare: true},
  moduleProps: {type: 'object', value: {}, compare: true},
};

class RasterLayer extends layers.BitmapLayer {
  initializeState() {
    const {gl} = this.context;
    const programManager = engine.ProgramManager.getDefaultProgramManager(gl);

    const fsStr1 = 'fs:DECKGL_MUTATE_COLOR(inout vec4 image, in vec2 coord)';
    const fsStr2 = 'fs:DECKGL_CREATE_COLOR(inout vec4 image, in vec2 coord)';

    // Only initialize shader hook functions _once globally_
    // Since the program manager is shared across all layers, but many layers
    // might be created, this solves the performance issue of always adding new
    // hook functions. See #22
    if (!programManager._hookFunctions.includes(fsStr1)) {
      programManager.addShaderHook(fsStr1);
    }
    if (!programManager._hookFunctions.includes(fsStr2)) {
      programManager.addShaderHook(fsStr2);
    }

    // images is a mapping from keys to Texture2D objects. The keys should match
    // names of uniforms in shader modules
    this.setState({images: {}});

    super.initializeState();
  }

  draw({uniforms}) {
    const {model, images, coordinateConversion, bounds} = this.state;
    const {desaturate, transparentColor, tintColor, moduleProps} = this.props;

    // Render the image
    if (
      !model ||
      !images ||
      Object.keys(images).length === 0 ||
      !Object.values(images).every((item) => item)
    ) {
      return;
    }

    model
      .setUniforms(
        Object.assign({}, uniforms, {
          desaturate,
          transparentColor: transparentColor.map((x) => x / 255),
          tintColor: tintColor.slice(0, 3).map((x) => x / 255),
          coordinateConversion,
          bounds
        })
      )
      .updateModuleSettings({
        ...moduleProps,
        ...images,
      })
      .draw();
  }

  getShaders() {
    const {gl} = this.context;
    const {modules = []} = this.props;
    const webgl2 = core.isWebGL2(gl);

    // Choose webgl version for module
    // If fs2 or fs1 keys exist, prefer them, but fall back to fs, so that
    // version-independent modules don't need to care
    for (const module of modules) {
      module.fs = webgl2 ? module.fs2 || module.fs : module.fs1 || module.fs;

      // Sampler type is always float for WebGL1
      if (!webgl2 && module.defines) {
        module.defines.SAMPLER_TYPE = 'sampler2D';
      }
    }

    const parentShaders = super.getShaders();
    return {
      ...parentShaders,
      vs: webgl2 ? vsWebGL2$1 : vsWebGL1$1,
      fs: webgl2 ? fsWebGL2$1 : fsWebGL1$1,
      modules: [...parentShaders.modules, ...modules],
    };
  }

  updateState({props, oldProps, changeFlags}) {
    // setup model first
    const modulesChanged = props && props.modules && oldProps && !lodash_isequal(props.modules, oldProps.modules);
    if (changeFlags.extensionsChanged || modulesChanged) {
      const {gl} = this.context;
      if (this.state.model) {
        this.state.model.delete();
      }
      this.setState({model: this._getModel(gl)});
      this.getAttributeManager().invalidateAll();
    }

    if (props && props.images) {
      this.updateImages({props, oldProps});
    }

    const attributeManager = this.getAttributeManager();

    if (props.bounds !== oldProps.bounds) {
      const oldMesh = this.state.mesh;
      const mesh = this._createMesh();
      this.state.model.setVertexCount(mesh.vertexCount);
      for (const key in mesh) {
        if (oldMesh && oldMesh[key] !== mesh[key]) {
          attributeManager.invalidate(key);
        }
      }
      this.setState({mesh, ...this._getCoordinateUniforms()});
    } else if (props._imageCoordinateSystem !== oldProps._imageCoordinateSystem) {
      this.setState(this._getCoordinateUniforms());
    }
  }

  updateImages({props, oldProps}) {
    const {images} = this.state;
    const {gl} = this.context;

    const newImages = loadImages({gl, images, props, oldProps});
    if (newImages) {
      this.setState({images: newImages});
    }
  }

  finalizeState() {
    super.finalizeState();

    if (this.state.images) {
      for (const image of Object.values(this.state.images)) {
        if (Array.isArray(image)) {
          image.map((x) => x && x.delete());
        } else {
          image && image.delete();
        }
      }
    }
  }
}

RasterLayer.defaultProps = defaultProps$1;
RasterLayer.layerName = 'RasterLayer';

// only apply composeModelMatrix when in cartesian or meter_offsets coordinate system
// with `composeModelMatrix` enabled, the rotation part of the layer's modelMatrix will be composed to instance's transformations
// since rotating latitude and longitude can not provide meaningful results, hence `composeModelMatrix` is disabled
// when in LNGLAT and LNGLAT_OFFSET coordinates.
function shouldComposeModelMatrix(viewport, coordinateSystem) {
  return (
    coordinateSystem === core$1.COORDINATE_SYSTEM.CARTESIAN ||
    coordinateSystem === core$1.COORDINATE_SYSTEM.METER_OFFSETS ||
    (coordinateSystem === core$1.COORDINATE_SYSTEM.DEFAULT && !viewport.isGeospatial)
  );
}

var fsWebGL1 = "#define SHADER_NAME raster-mesh-layer-fs\nprecision highp float;uniform bool hasTexture;uniform bool flatShading;uniform float opacity;varying vec2 vTexCoord;varying vec3 cameraPosition;varying vec3 normals_commonspace;varying vec4 position_commonspace;varying vec4 vColor;void main(void){geometry.uv=vTexCoord;vec4 image;DECKGL_CREATE_COLOR(image,vTexCoord);DECKGL_MUTATE_COLOR(image,vTexCoord);vec3 normal;if(flatShading){\n#ifdef DERIVATIVES_AVAILABLE\nnormal=normalize(cross(dFdx(position_commonspace.xyz),dFdy(position_commonspace.xyz)));\n#else\nnormal=vec3(0.0,0.0,1.0);\n#endif\n}else{normal=normals_commonspace;}vec3 lightColor=lighting_getLightColor(image.rgb,cameraPosition,position_commonspace.xyz,normal);gl_FragColor=vec4(lightColor,opacity);DECKGL_FILTER_COLOR(gl_FragColor,geometry);}";

var fsWebGL2 = "#version 300 es\n#define SHADER_NAME raster-mesh-layer-fs\nprecision highp float;uniform bool hasTexture;uniform bool flatShading;uniform float opacity;in vec2 vTexCoord;in vec3 cameraPosition;in vec3 normals_commonspace;in vec4 position_commonspace;in vec4 vColor;out vec4 fragColor;void main(void){geometry.uv=vTexCoord;vec4 image;DECKGL_CREATE_COLOR(image,vTexCoord);DECKGL_MUTATE_COLOR(image,vTexCoord);vec3 normal;if(flatShading){\n#ifdef DERIVATIVES_AVAILABLE\nnormal=normalize(cross(dFdx(position_commonspace.xyz),dFdy(position_commonspace.xyz)));\n#else\nnormal=vec3(0.0,0.0,1.0);\n#endif\n}else{normal=normals_commonspace;}vec3 lightColor=lighting_getLightColor(image.rgb,cameraPosition,position_commonspace.xyz,normal);fragColor=vec4(lightColor,opacity);DECKGL_FILTER_COLOR(fragColor,geometry);}";

var vsWebGL1 = "#define SHADER_NAME raster-mesh-layer-vs\nuniform float sizeScale;uniform bool composeModelMatrix;attribute vec3 positions;attribute vec3 normals;attribute vec3 colors;attribute vec2 texCoords;attribute vec3 instancePositions;attribute vec3 instancePositions64Low;attribute vec4 instanceColors;attribute vec3 instancePickingColors;attribute mat3 instanceModelMatrix;attribute vec3 instanceTranslation;varying vec2 vTexCoord;varying vec3 cameraPosition;varying vec3 normals_commonspace;varying vec4 position_commonspace;varying vec4 vColor;void main(void){geometry.worldPosition=instancePositions;geometry.uv=texCoords;geometry.pickingColor=instancePickingColors;vTexCoord=texCoords;cameraPosition=project_uCameraPosition;normals_commonspace=project_normal(instanceModelMatrix*normals);vColor=vec4(colors*instanceColors.rgb,instanceColors.a);geometry.normal=normals_commonspace;vec3 pos=(instanceModelMatrix*positions)*sizeScale+instanceTranslation;if(composeModelMatrix){DECKGL_FILTER_SIZE(pos,geometry);gl_Position=project_position_to_clipspace(pos+instancePositions,instancePositions64Low,vec3(0.0),position_commonspace);}else{pos=project_size(pos);DECKGL_FILTER_SIZE(pos,geometry);gl_Position=project_position_to_clipspace(instancePositions,instancePositions64Low,pos,position_commonspace);}geometry.position=position_commonspace;DECKGL_FILTER_GL_POSITION(gl_Position,geometry);DECKGL_FILTER_COLOR(vColor,geometry);}";

var vsWebGL2 = "#version 300 es\n#define SHADER_NAME raster-mesh-layer-vs\nuniform float sizeScale;uniform bool composeModelMatrix;in vec3 positions;in vec3 normals;in vec3 colors;in vec2 texCoords;in vec3 instancePositions;in vec3 instancePositions64Low;in vec4 instanceColors;in vec3 instancePickingColors;in mat3 instanceModelMatrix;in vec3 instanceTranslation;out vec2 vTexCoord;out vec3 cameraPosition;out vec3 normals_commonspace;out vec4 position_commonspace;out vec4 vColor;void main(void){geometry.worldPosition=instancePositions;geometry.uv=texCoords;geometry.pickingColor=instancePickingColors;vTexCoord=texCoords;cameraPosition=project_uCameraPosition;normals_commonspace=project_normal(instanceModelMatrix*normals);vColor=vec4(colors*instanceColors.rgb,instanceColors.a);geometry.normal=normals_commonspace;vec3 pos=(instanceModelMatrix*positions)*sizeScale+instanceTranslation;if(composeModelMatrix){DECKGL_FILTER_SIZE(pos,geometry);gl_Position=project_position_to_clipspace(pos+instancePositions,instancePositions64Low,vec3(0.0),position_commonspace);}else{pos=project_size(pos);DECKGL_FILTER_SIZE(pos,geometry);gl_Position=project_position_to_clipspace(instancePositions,instancePositions64Low,pos,position_commonspace);}geometry.position=position_commonspace;DECKGL_FILTER_GL_POSITION(gl_Position,geometry);DECKGL_FILTER_COLOR(vColor,geometry);}";

function validateGeometryAttributes(attributes) {
  core$1.log.assert(
    attributes.positions || attributes.POSITION,
    'RasterMeshLayer requires "postions" or "POSITION" attribute in mesh property.'
  );
}

/*
 * Convert mesh data into geometry
 * @returns {Geometry} geometry
 */
function getGeometry(data) {
  if (data.attributes) {
    validateGeometryAttributes(data.attributes);
    if (data instanceof core.Geometry) {
      return data;
    } else {
      return new core.Geometry(data);
    }
  } else if (data.positions || data.POSITION) {
    validateGeometryAttributes(data);
    return new core.Geometry({
      attributes: data,
    });
  }
  throw Error('Invalid mesh');
}

const defaultProps = {
  ...meshLayers.SimpleMeshLayer.defaultProps,
  modules: {type: 'array', value: [], compare: true},
  images: {type: 'object', value: {}, compare: true},
  moduleProps: {type: 'object', value: {}, compare: true},
};

class RasterMeshLayer extends meshLayers.SimpleMeshLayer {
  initializeState() {
    const {gl} = this.context;
    const programManager = engine.ProgramManager.getDefaultProgramManager(gl);

    const fsStr1 = 'fs:DECKGL_MUTATE_COLOR(inout vec4 image, in vec2 coord)';
    const fsStr2 = 'fs:DECKGL_CREATE_COLOR(inout vec4 image, in vec2 coord)';

    // Only initialize shader hook functions _once globally_
    // Since the program manager is shared across all layers, but many layers
    // might be created, this solves the performance issue of always adding new
    // hook functions. See #22
    if (!programManager._hookFunctions.includes(fsStr1)) {
      programManager.addShaderHook(fsStr1);
    }
    if (!programManager._hookFunctions.includes(fsStr2)) {
      programManager.addShaderHook(fsStr2);
    }

    // images is a mapping from keys to Texture2D objects. The keys should match
    // names of uniforms in shader modules
    this.setState({images: {}});

    super.initializeState();
  }

  getShaders() {
    const {gl} = this.context;
    const {modules = []} = this.props;
    const webgl2 = core.isWebGL2(gl);

    // Choose webgl version for module
    // If fs2 or fs1 keys exist, prefer them, but fall back to fs, so that
    // version-independent modules don't need to care
    for (const module of modules) {
      module.fs = webgl2 ? module.fs2 || module.fs : module.fs1 || module.fs;

      // Sampler type is always float for WebGL1
      if (!webgl2 && module.defines) {
        module.defines.SAMPLER_TYPE = 'sampler2D';
      }
    }

    return {
      ...super.getShaders(),
      vs: webgl2 ? vsWebGL2 : vsWebGL1,
      fs: webgl2 ? fsWebGL2 : fsWebGL1,
      modules: [core$1.project32, core$1.phongLighting, ...modules],
    };
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});

    if (
      props.mesh !== oldProps.mesh ||
      changeFlags.extensionsChanged ||
      props.modules !== oldProps.modules
    ) {
      if (this.state.model) {
        this.state.model.delete();
      }
      if (props.mesh) {
        this.setState({model: this.getModel(props.mesh)});

        const attributes = props.mesh.attributes || props.mesh;
        this.setState({
          hasNormals: Boolean(attributes.NORMAL || attributes.normals),
        });
      }
      this.getAttributeManager().invalidateAll();
    }

    if (props && props.images) {
      this.updateImages({props, oldProps});
    }

    if (this.state.model) {
      this.state.model.setDrawMode(
        this.props.wireframe ? GL__default['default'].LINE_STRIP : GL__default['default'].TRIANGLES
      );
    }
  }

  updateImages({props, oldProps}) {
    const {images} = this.state;
    const {gl} = this.context;

    const newImages = loadImages({
      gl,
      images,
      props,
      oldProps,
    });

    if (newImages) {
      this.setState({images: newImages});
    }
  }

  draw({uniforms}) {
    const {model, images} = this.state;
    const {moduleProps} = this.props;

    // Render the image
    if (
      !model ||
      !images ||
      Object.keys(images).length === 0 ||
      !Object.values(images).every((item) => item)
    ) {
      return;
    }

    const {viewport} = this.context;
    const {sizeScale, coordinateSystem, _instanced} = this.props;

    model
      .setUniforms(
        Object.assign({}, uniforms, {
          sizeScale,
          composeModelMatrix:
            !_instanced || shouldComposeModelMatrix(viewport, coordinateSystem),
          flatShading: !this.state.hasNormals,
        })
      )
      .updateModuleSettings({
        ...moduleProps,
        ...images,
      })
      .draw();
  }

  finalizeState() {
    super.finalizeState();

    if (this.state.images) {
      for (const image of Object.values(this.state.images)) {
        if (Array.isArray(image)) {
          image.map((x) => x && x.delete());
        } else {
          image && image.delete();
        }
      }
    }
  }

  getModel(mesh) {
    const {gl} = this.context;

    const model = new core.Model(
      gl,
      Object.assign({}, this.getShaders(), {
        id: this.props.id,
        geometry: getGeometry(mesh),
        isInstanced: true,
      })
    );

    return model;
  }
}

RasterMeshLayer.layerName = 'RasterMeshLayer';
RasterMeshLayer.defaultProps = defaultProps;

// Originally ported from viv
// https://github.com/hms-dbmi/viv/blob/603e5e0967eec1b360623dbe51357baa6bdf71fc/src/constants.js#L12-L43
const WEBGL2_DTYPES = {
  uint8: {
    format: GL__default['default'].R8UI,
    dataFormat: GL__default['default'].RED_INTEGER,
    type: GL__default['default'].UNSIGNED_BYTE,
  },
  uint16: {
    format: GL__default['default'].R16UI,
    dataFormat: GL__default['default'].RED_INTEGER,
    type: GL__default['default'].UNSIGNED_SHORT,
  },
  uint32: {
    format: GL__default['default'].R32UI,
    dataFormat: GL__default['default'].RED_INTEGER,
    type: GL__default['default'].UNSIGNED_INT,
  },
  int8: {
    format: GL__default['default'].R8I,
    dataFormat: GL__default['default'].RED_INTEGER,
    type: GL__default['default'].BYTE,
  },
  int16: {
    format: GL__default['default'].R16I,
    dataFormat: GL__default['default'].RED_INTEGER,
    type: GL__default['default'].SHORT,
  },
  int32: {
    format: GL__default['default'].R32I,
    dataFormat: GL__default['default'].RED_INTEGER,
    type: GL__default['default'].INT,
  },
  float16: {
    format: GL__default['default'].R16F,
    dataFormat: GL__default['default'].RED,
    type: GL__default['default'].HALF_FLOAT,
  },
  float32: {
    format: GL__default['default'].R32F,
    dataFormat: GL__default['default'].RED,
    type: GL__default['default'].FLOAT,
  },
};

function getUniforms$7(opts = {}) {
  const {imageBands} = opts;
  if (!imageBands || imageBands.length === 0) {
    return;
  }

  const [
    bitmapTexture_r,
    bitmapTexture_g,
    bitmapTexture_b,
    bitmapTexture_a,
  ] = imageBands;

  return {
    bitmapTexture_r,
    bitmapTexture_g,
    bitmapTexture_b,
    bitmapTexture_a,
  };
}

const fs1$2 = `\
uniform sampler2D bitmapTexture_r;
uniform sampler2D bitmapTexture_g;
uniform sampler2D bitmapTexture_b;
uniform sampler2D bitmapTexture_a;
`;

const fs2$2 = `\
precision mediump float;
precision mediump int;
precision mediump usampler2D;

#ifdef SAMPLER_TYPE
  uniform SAMPLER_TYPE bitmapTexture_r;
  uniform SAMPLER_TYPE bitmapTexture_g;
  uniform SAMPLER_TYPE bitmapTexture_b;
  uniform SAMPLER_TYPE bitmapTexture_a;
#else
  uniform sampler2D bitmapTexture_r;
  uniform sampler2D bitmapTexture_g;
  uniform sampler2D bitmapTexture_b;
  uniform sampler2D bitmapTexture_a;
#endif
`;

var combineBands = {
  name: 'combine-bands',
  fs1: fs1$2,
  fs2: fs2$2,
  getUniforms: getUniforms$7,
  defines: {
    SAMPLER_TYPE: 'sampler2D',
  },
  inject: {
    'fs:DECKGL_CREATE_COLOR': `
    float channel1 = float(texture2D(bitmapTexture_r, coord).r);
    float channel2 = float(texture2D(bitmapTexture_g, coord).r);
    float channel3 = float(texture2D(bitmapTexture_b, coord).r);
    float channel4 = float(texture2D(bitmapTexture_a, coord).r);

    image = vec4(channel1, channel2, channel3, channel4);
    `,
  },
};

function getUniforms$6(opts = {}) {
  const {imageRgba} = opts;
  if (!imageRgba) {
    return;
  }

  return {
    bitmapTexture_rgba: imageRgba,
  };
}

const fs1$1 = `\
uniform sampler2D bitmapTexture_rgba;
`;

const fs2$1 = `\
precision mediump float;
precision mediump int;
precision mediump usampler2D;

#ifdef SAMPLER_TYPE
  uniform SAMPLER_TYPE bitmapTexture_rgba;
#else
  uniform sampler2D bitmapTexture_rgba;
#endif
`;

var rgbaImage = {
  name: 'rgba-image',
  fs1: fs1$1,
  fs2: fs2$1,
  getUniforms: getUniforms$6,
  defines: {
    SAMPLER_TYPE: 'sampler2D',
  },
  inject: {
    'fs:DECKGL_CREATE_COLOR': `
    image = vec4(texture2D(bitmapTexture_rgba, coord));
    `,
  },
};

function getUniforms$5(opts = {}) {
  const {imageMask} = opts;

  if (!imageMask) {
    return;
  }

  return {
    bitmapTexture_mask: imageMask,
  };
}

const fs$9 = `\
uniform sampler2D bitmapTexture_mask;
`;

var maskImage = {
  name: 'mask-image',
  fs: fs$9,
  getUniforms: getUniforms$5,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    float alpha = float(texture2D(bitmapTexture_mask, coord).a);
    image = vec4(image.rgb, alpha);
    `,
  },
};

var fs$8 = "uniform sampler2D u_colormap_texture;uniform float colormapScaler;uniform float colormapOffset;vec4 colormap(sampler2D cmap,vec4 image,float scaler,float offset){vec2 uv=vec2(scaler*image.r+offset,0.5);return texture2D(cmap,uv);}";

function getUniforms$4(opts = {}) {
  const {imageColormap, colormapScaler, colormapOffset} = opts;

  if (!imageColormap) {
    return;
  }

  return {
    u_colormap_texture: imageColormap,
    colormapScaler: Number.isFinite(colormapScaler) ? colormapScaler : 0.5,
    colormapOffset: Number.isFinite(colormapOffset) ? colormapOffset : 0.5,
  };
}

var colormap = {
  name: 'colormap',
  fs: fs$8,
  getUniforms: getUniforms$4,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = colormap(u_colormap_texture, image, colormapScaler, colormapOffset);
    `,
  },
};

var fs$7 = "uniform float linearRescaleScaler;uniform float linearRescaleOffset;vec4 linear_rescale(vec4 arr,float scaler,float offset){return arr*scaler+offset;}";

function getUniforms$3(opts = {}) {
  const {linearRescaleScaler, linearRescaleOffset} = opts;

  if (!linearRescaleScaler && !linearRescaleOffset) {
    return;
  }

  return {
    linearRescaleScaler: linearRescaleScaler || 1,
    linearRescaleOffset: linearRescaleOffset || 0,
  };
}

var linearRescale = {
  name: 'linear_rescale',
  fs: fs$7,
  getUniforms: getUniforms$3,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = linear_rescale(image, linearRescaleScaler, linearRescaleOffset);
    `,
  },
};

var fs$6 = "#define epsilon 0.00000001\nuniform float sigmoidal_contrast;uniform float sigmoidal_bias;vec4 sigmoidalContrast(vec4 arr,float contrast,float bias){float alpha=bias;float beta=contrast;alpha=clamp(alpha,epsilon,alpha);if(beta>0.){vec4 numerator=1./(1.+exp(beta*(alpha-arr)))-1./(1.+exp(beta*alpha));float denominator=1./(1.+exp(beta*(alpha-1.)))-1./(1.+exp(beta*alpha));arr=numerator/denominator;}else if(beta<0.){arr=((beta*alpha)-log((1.0/((arr/(1.0+exp((beta*alpha)-beta)))-(arr/(1.0+exp(beta*alpha)))+(1.0/(1.0+exp(beta*alpha)))))-1.0))/beta;}return arr;}";

function getUniforms$2(opts = {}) {
  const {sigmoidalContrast, sigmoidalBias} = opts;

  if (!sigmoidalContrast && !sigmoidalBias) {
    return;
  }

  return {
    sigmoidal_contrast: sigmoidalContrast || 0,
    sigmoidal_bias: sigmoidalBias || 0.5,
  };
}

var sigmoidalContrast = {
  name: 'sigmoidal_contrast',
  fs: fs$6,
  getUniforms: getUniforms$2,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = sigmoidalContrast(image, sigmoidal_contrast, sigmoidal_bias);
    `,
  },
};

var fs$5 = "#define epsilon 0.00000001\nuniform float gamma_r;uniform float gamma_g;uniform float gamma_b;uniform float gamma_a;float gammaContrast(float arr,float g){g=clamp(g,epsilon,g);return pow(arr,1.0/g);}vec4 gammaContrast(vec4 arr,float gamma1,float gamma2,float gamma3,float gamma4){arr.r=gammaContrast(arr.r,gamma1);arr.g=gammaContrast(arr.g,gamma2);arr.b=gammaContrast(arr.b,gamma3);arr.a=gammaContrast(arr.a,gamma4);return arr;}";

function getUniforms$1(opts = {}) {
  const {gammaValue, gammaR, gammaG, gammaB, gammaA} = opts;

  if (!gammaValue && (!gammaR && !gammaG && !gammaB && !gammaA)) {
    return;
  }

  return {
    gamma_r: gammaR || 1,
    gamma_g: gammaG || 1,
    gamma_b: gammaB || 1,
    gamma_a: gammaA || 1,
  };
}

var gammaContrast = {
  name: 'gamma_contrast',
  fs: fs$5,
  getUniforms: getUniforms$1,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = gammaContrast(image, gamma_r, gamma_g, gamma_b, gamma_a);
    `,
  },
};

var fs1 = "uniform sampler2D bitmapTexture_pan;uniform float panWeight;float pansharpen_brovey_ratio(vec4 rgb,float pan,float weight){return pan/((rgb.r+rgb.g+rgb.b*weight)/(2.+weight));}vec4 pansharpen_brovey_calc(vec4 rgb,float pan,float weight){float ratio=pansharpen_brovey_ratio(rgb,pan,weight);return ratio*rgb;}";

var fs2 = "precision mediump usampler2D;\n#ifdef SAMPLER_TYPE\nuniform SAMPLER_TYPE bitmapTexture_pan;\n#else\nuniform sampler2D bitmapTexture_pan;\n#endif\nuniform float panWeight;float pansharpen_brovey_ratio(vec4 rgb,float pan,float weight){return pan/((rgb.r+rgb.g+rgb.b*weight)/(2.+weight));}vec4 pansharpen_brovey_calc(vec4 rgb,float pan,float weight){float ratio=pansharpen_brovey_ratio(rgb,pan,weight);return ratio*rgb;}";

function getUniforms(opts = {}) {
  const {imagePan, panWeight = 0.2} = opts;

  if (!imagePan) {
    return;
  }

  return {
    bitmapTexture_pan: imagePan,
    panWeight,
  };
}

var pansharpenBrovey = {
  name: 'pansharpen_brovey',
  fs1,
  fs2,
  defines: {
    SAMPLER_TYPE: 'sampler2D',
  },
  getUniforms,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    float pan_band = float(texture2D(bitmapTexture_pan, coord).r);
    image = pansharpen_brovey_calc(image, pan_band, panWeight);
    `,
  },
};

var fs$4 = "float enhanced_vegetation_index_calc(vec4 image){float band5=image.r;float band4=image.g;float band2=image.b;float numerator=band5-band4;float denominator=band5+(6.*band4)-(7.5*band2)+1.;return 2.5*(numerator/denominator);}";

var evi = {
  name: 'enhanced_vegetation_index',
  fs: fs$4,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = vec4(enhanced_vegetation_index_calc(image), 0., 0., 0.);
    `,
  },
};

var fs$3 = "float modified_soil_adjusted_vegetation_index_calc(vec4 image){float band5=image.r;float band4=image.g;float to_sqrt=((2.*band5+1.)*(2.*band5+1.))-(8.*(band5-band4));return((2.*band5)+1.-sqrt(to_sqrt))/2.;}";

var msavi = {
  name: 'modified_soil_adjusted_vegetation_index',
  fs: fs$3,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = vec4(modified_soil_adjusted_vegetation_index_calc(image), 0., 0., 0.);
    `,
  },
};

var fs$2 = "float normalized_difference_calc(vec4 image){return((image.r-image.g)/(image.r+image.g));}";

var normalizedDifference = {
  name: 'normalized_difference',
  fs: fs$2,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = vec4(normalized_difference_calc(image), 0., 0., 0.);
    `,
  },
};

var fs$1 = "float soil_adjusted_vegetation_index_calc(vec4 image){float band5=image.r;float band4=image.g;float numerator=band5-band4;float denominator=(band5+band4+0.5)*1.5;return numerator/denominator;}";

var savi = {
  name: 'soil_adjusted_vegetation_index',
  fs: fs$1,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = vec4(soil_adjusted_vegetation_index_calc(image), 0., 0., 0.);
    `,
  },
};

var fs = "float vector_length_calc(vec4 image){return length(vec2(image.r,image.g));}";

var vectorLength = {
  name: 'vector_length',
  fs,
  inject: {
    'fs:DECKGL_MUTATE_COLOR': `
    image = vec4(vector_length_calc(image), 0., 0., 0.);
    `,
  },
};

// NOTE: this should be considered an experimental export for now

// \x93NUMPY
const NPY_MAGIC = new Uint8Array([147, 78, 85, 77, 80, 89]);

function systemIsLittleEndian() {
  const a = new Uint32Array([0x12345678]);
  const b = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  return !(b[0] == 0x12);
}

const LITTLE_ENDIAN_OS = systemIsLittleEndian();

// The basic string format consists of 3 parts:
// - a character describing the byteorder of the data (<: little-endian, >: big-endian, |: not-relevant)
// - a character code giving the basic type of the array
// - an integer providing the number of bytes the type uses.
// https://numpy.org/doc/stable/reference/arrays.interface.html
const DTYPES = {
  u1: {
    name: 'uint8',
    arrayConstructor: Uint8Array,
  },
  i1: {
    name: 'int8',
    arrayConstructor: Int8Array,
  },
  u2: {
    name: 'uint16',
    arrayConstructor: Uint16Array,
  },
  i2: {
    name: 'int16',
    arrayConstructor: Int16Array,
  },
  u4: {
    name: 'uint32',
    arrayConstructor: Int32Array,
  },
  i4: {
    name: 'int32',
    arrayConstructor: Int32Array,
  },
  f4: {
    name: 'float32',
    arrayConstructor: Float32Array,
  },
  f8: {
    name: 'float64',
    arrayConstructor: Float64Array,
  },
};

function parseNpy(arrayBuffer) {
  if (!arrayBuffer) {
    return null;
  }

  const view = new DataView(arrayBuffer);

  const magic = new Uint8Array(arrayBuffer, 0, 6);
  if (!arrayEqual(magic, NPY_MAGIC)) {
    console.warn('NPY Magic not matched!');
  }

  const majorVersion = view.getUint8(6);
  // const minorVersion = view.getUint8(7);

  let offset = 8;
  let headerLength;
  if (majorVersion >= 2) {
    headerLength = view.getUint32(8, true);
    offset += 4;
  } else {
    headerLength = view.getUint16(8, true);
    offset += 2;
  }

  const encoding = majorVersion <= 2 ? 'latin1' : 'utf-8';
  const decoder = new TextDecoder(encoding);
  const headerArray = new Uint8Array(arrayBuffer, offset, headerLength);
  const headerText = decoder.decode(headerArray);
  offset += headerLength;

  const header = JSON.parse(
    headerText
      .replace(/'/g, '"')
      .replace('False', 'false')
      .replace('(', '[')
      .replace(/,*\),*/g, ']')
  );

  const npy_dtype = header.descr;
  const dtype = DTYPES[npy_dtype.slice(1, 3)];
  if (!dtype) {
    console.warn(`Decoding of npy dtype not implemented: ${npy_dtype}`);
    return null;
  }

  const data = new dtype['arrayConstructor'](arrayBuffer, offset);

  // Swap endianness if needed
  if (
    (npy_dtype[0] === '>' && LITTLE_ENDIAN_OS) ||
    (npy_dtype[0] === '<' && !LITTLE_ENDIAN_OS)
  ) {
    throw new Error(
      'Data is wrong endianness, byte swapping not yet implemented.'
    );
  }

  if (header && header.fortran_order) {
    console.warn('Data is in Fortran order.');
  }

  return {
    dtype: dtype.name,
    data,
    header,
  };
}

function arrayEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

exports.RasterLayer = RasterLayer;
exports.RasterMeshLayer = RasterMeshLayer;
exports.WEBGL2_DTYPES = WEBGL2_DTYPES;
exports._parseNpy = parseNpy;
exports.colormap = colormap;
exports.combineBands = combineBands;
exports.enhancedVegetationIndex = evi;
exports.gammaContrast = gammaContrast;
exports.linearRescale = linearRescale;
exports.maskImage = maskImage;
exports.modifiedSoilAdjustedVegetationIndex = msavi;
exports.normalizedDifference = normalizedDifference;
exports.pansharpenBrovey = pansharpenBrovey;
exports.rgbaImage = rgbaImage;
exports.sigmoidalContrast = sigmoidalContrast;
exports.soilAdjustedVegetationIndex = savi;
exports.vectorLength = vectorLength;

Object.defineProperty(exports, '__esModule', { value: true });

})));
