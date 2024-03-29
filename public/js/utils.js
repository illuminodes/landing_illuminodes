var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/toastify-js/src/toastify.js
var require_toastify = __commonJS((exports, module) => {
  /*!
   * Toastify js 1.12.0
   * https://github.com/apvarun/toastify-js
   * @license MIT licensed
   *
   * Copyright (C) 2018 Varun A P
   */
  (function(root, factory) {
    if (typeof module === "object" && exports) {
      module.exports = factory();
    } else {
      root.Toastify = factory();
    }
  })(exports, function(global) {
    var Toastify = function(options) {
      return new Toastify.lib.init(options);
    }, version = "1.12.0";
    Toastify.defaults = {
      oldestFirst: true,
      text: "Toastify is awesome!",
      node: undefined,
      duration: 3000,
      selector: undefined,
      callback: function() {
      },
      destination: undefined,
      newWindow: false,
      close: false,
      gravity: "toastify-top",
      positionLeft: false,
      position: "",
      backgroundColor: "",
      avatar: "",
      className: "",
      stopOnFocus: true,
      onClick: function() {
      },
      offset: { x: 0, y: 0 },
      escapeMarkup: true,
      ariaLive: "polite",
      style: { background: "" }
    };
    Toastify.lib = Toastify.prototype = {
      toastify: version,
      constructor: Toastify,
      init: function(options) {
        if (!options) {
          options = {};
        }
        this.options = {};
        this.toastElement = null;
        this.options.text = options.text || Toastify.defaults.text;
        this.options.node = options.node || Toastify.defaults.node;
        this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration;
        this.options.selector = options.selector || Toastify.defaults.selector;
        this.options.callback = options.callback || Toastify.defaults.callback;
        this.options.destination = options.destination || Toastify.defaults.destination;
        this.options.newWindow = options.newWindow || Toastify.defaults.newWindow;
        this.options.close = options.close || Toastify.defaults.close;
        this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity;
        this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft;
        this.options.position = options.position || Toastify.defaults.position;
        this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor;
        this.options.avatar = options.avatar || Toastify.defaults.avatar;
        this.options.className = options.className || Toastify.defaults.className;
        this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus;
        this.options.onClick = options.onClick || Toastify.defaults.onClick;
        this.options.offset = options.offset || Toastify.defaults.offset;
        this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
        this.options.ariaLive = options.ariaLive || Toastify.defaults.ariaLive;
        this.options.style = options.style || Toastify.defaults.style;
        if (options.backgroundColor) {
          this.options.style.background = options.backgroundColor;
        }
        return this;
      },
      buildToast: function() {
        if (!this.options) {
          throw "Toastify is not initialized";
        }
        var divElement = document.createElement("div");
        divElement.className = "toastify on " + this.options.className;
        if (!!this.options.position) {
          divElement.className += " toastify-" + this.options.position;
        } else {
          if (this.options.positionLeft === true) {
            divElement.className += " toastify-left";
            console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.");
          } else {
            divElement.className += " toastify-right";
          }
        }
        divElement.className += " " + this.options.gravity;
        if (this.options.backgroundColor) {
          console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
        }
        for (var property in this.options.style) {
          divElement.style[property] = this.options.style[property];
        }
        if (this.options.ariaLive) {
          divElement.setAttribute("aria-live", this.options.ariaLive);
        }
        if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
          divElement.appendChild(this.options.node);
        } else {
          if (this.options.escapeMarkup) {
            divElement.innerText = this.options.text;
          } else {
            divElement.innerHTML = this.options.text;
          }
          if (this.options.avatar !== "") {
            var avatarElement = document.createElement("img");
            avatarElement.src = this.options.avatar;
            avatarElement.className = "toastify-avatar";
            if (this.options.position == "left" || this.options.positionLeft === true) {
              divElement.appendChild(avatarElement);
            } else {
              divElement.insertAdjacentElement("afterbegin", avatarElement);
            }
          }
        }
        if (this.options.close === true) {
          var closeElement = document.createElement("button");
          closeElement.type = "button";
          closeElement.setAttribute("aria-label", "Close");
          closeElement.className = "toast-close";
          closeElement.innerHTML = "&#10006;";
          closeElement.addEventListener("click", function(event) {
            event.stopPropagation();
            this.removeElement(this.toastElement);
            window.clearTimeout(this.toastElement.timeOutValue);
          }.bind(this));
          var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
          if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
            divElement.insertAdjacentElement("afterbegin", closeElement);
          } else {
            divElement.appendChild(closeElement);
          }
        }
        if (this.options.stopOnFocus && this.options.duration > 0) {
          var self = this;
          divElement.addEventListener("mouseover", function(event) {
            window.clearTimeout(divElement.timeOutValue);
          });
          divElement.addEventListener("mouseleave", function() {
            divElement.timeOutValue = window.setTimeout(function() {
              self.removeElement(divElement);
            }, self.options.duration);
          });
        }
        if (typeof this.options.destination !== "undefined") {
          divElement.addEventListener("click", function(event) {
            event.stopPropagation();
            if (this.options.newWindow === true) {
              window.open(this.options.destination, "_blank");
            } else {
              window.location = this.options.destination;
            }
          }.bind(this));
        }
        if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
          divElement.addEventListener("click", function(event) {
            event.stopPropagation();
            this.options.onClick();
          }.bind(this));
        }
        if (typeof this.options.offset === "object") {
          var x = getAxisOffsetAValue("x", this.options);
          var y = getAxisOffsetAValue("y", this.options);
          var xOffset = this.options.position == "left" ? x : "-" + x;
          var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;
          divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
        }
        return divElement;
      },
      showToast: function() {
        this.toastElement = this.buildToast();
        var rootElement;
        if (typeof this.options.selector === "string") {
          rootElement = document.getElementById(this.options.selector);
        } else if (this.options.selector instanceof HTMLElement || typeof ShadowRoot !== "undefined" && this.options.selector instanceof ShadowRoot) {
          rootElement = this.options.selector;
        } else {
          rootElement = document.body;
        }
        if (!rootElement) {
          throw "Root element is not defined";
        }
        var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
        rootElement.insertBefore(this.toastElement, elementToInsert);
        Toastify.reposition();
        if (this.options.duration > 0) {
          this.toastElement.timeOutValue = window.setTimeout(function() {
            this.removeElement(this.toastElement);
          }.bind(this), this.options.duration);
        }
        return this;
      },
      hideToast: function() {
        if (this.toastElement.timeOutValue) {
          clearTimeout(this.toastElement.timeOutValue);
        }
        this.removeElement(this.toastElement);
      },
      removeElement: function(toastElement) {
        toastElement.className = toastElement.className.replace(" on", "");
        window.setTimeout(function() {
          if (this.options.node && this.options.node.parentNode) {
            this.options.node.parentNode.removeChild(this.options.node);
          }
          if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
          }
          this.options.callback.call(toastElement);
          Toastify.reposition();
        }.bind(this), 400);
      }
    };
    Toastify.reposition = function() {
      var topLeftOffsetSize = {
        top: 15,
        bottom: 15
      };
      var topRightOffsetSize = {
        top: 15,
        bottom: 15
      };
      var offsetSize = {
        top: 15,
        bottom: 15
      };
      var allToasts = document.getElementsByClassName("toastify");
      var classUsed;
      for (var i = 0;i < allToasts.length; i++) {
        if (containsClass(allToasts[i], "toastify-top") === true) {
          classUsed = "toastify-top";
        } else {
          classUsed = "toastify-bottom";
        }
        var height = allToasts[i].offsetHeight;
        classUsed = classUsed.substr(9, classUsed.length - 1);
        var offset = 15;
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        if (width <= 360) {
          allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";
          offsetSize[classUsed] += height + offset;
        } else {
          if (containsClass(allToasts[i], "toastify-left") === true) {
            allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
            topLeftOffsetSize[classUsed] += height + offset;
          } else {
            allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";
            topRightOffsetSize[classUsed] += height + offset;
          }
        }
      }
      return this;
    };
    function getAxisOffsetAValue(axis, options) {
      if (options.offset[axis]) {
        if (isNaN(options.offset[axis])) {
          return options.offset[axis];
        } else {
          return options.offset[axis] + "px";
        }
      }
      return "0px";
    }
    function containsClass(elem, yourClass) {
      if (!elem || typeof yourClass !== "string") {
        return false;
      } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
        return true;
      } else {
        return false;
      }
    }
    Toastify.lib.init.prototype = Toastify.lib;
    return Toastify;
  });
});

// node_modules/string-natural-compare/natural-compare.js
var require_natural_compare = __commonJS((exports, module) => {
  var isNumberCode = function(code) {
    return code >= 48 && code <= 57;
  };
  var naturalCompare = function(a, b) {
    var lengthA = (a += "").length;
    var lengthB = (b += "").length;
    var aIndex = 0;
    var bIndex = 0;
    while (aIndex < lengthA && bIndex < lengthB) {
      var charCodeA = a.charCodeAt(aIndex);
      var charCodeB = b.charCodeAt(bIndex);
      if (isNumberCode(charCodeA)) {
        if (!isNumberCode(charCodeB)) {
          return charCodeA - charCodeB;
        }
        var numStartA = aIndex;
        var numStartB = bIndex;
        while (charCodeA === 48 && ++numStartA < lengthA) {
          charCodeA = a.charCodeAt(numStartA);
        }
        while (charCodeB === 48 && ++numStartB < lengthB) {
          charCodeB = b.charCodeAt(numStartB);
        }
        var numEndA = numStartA;
        var numEndB = numStartB;
        while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
          ++numEndA;
        }
        while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
          ++numEndB;
        }
        var difference = numEndA - numStartA - numEndB + numStartB;
        if (difference) {
          return difference;
        }
        while (numStartA < numEndA) {
          difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);
          if (difference) {
            return difference;
          }
        }
        aIndex = numEndA;
        bIndex = numEndB;
        continue;
      }
      if (charCodeA !== charCodeB) {
        if (charCodeA < alphabetIndexMapLength && charCodeB < alphabetIndexMapLength && alphabetIndexMap[charCodeA] !== -1 && alphabetIndexMap[charCodeB] !== -1) {
          return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
        }
        return charCodeA - charCodeB;
      }
      ++aIndex;
      ++bIndex;
    }
    if (aIndex >= lengthA && bIndex < lengthB && lengthA >= lengthB) {
      return -1;
    }
    if (bIndex >= lengthB && aIndex < lengthA && lengthB >= lengthA) {
      return 1;
    }
    return lengthA - lengthB;
  };
  var alphabet;
  var alphabetIndexMap;
  var alphabetIndexMapLength = 0;
  naturalCompare.caseInsensitive = naturalCompare.i = function(a, b) {
    return naturalCompare(("" + a).toLowerCase(), ("" + b).toLowerCase());
  };
  Object.defineProperties(naturalCompare, {
    alphabet: {
      get: function() {
        return alphabet;
      },
      set: function(value) {
        alphabet = value;
        alphabetIndexMap = [];
        var i = 0;
        if (alphabet) {
          for (;i < alphabet.length; i++) {
            alphabetIndexMap[alphabet.charCodeAt(i)] = i;
          }
        }
        alphabetIndexMapLength = alphabetIndexMap.length;
        for (i = 0;i < alphabetIndexMapLength; i++) {
          if (alphabetIndexMap[i] === undefined) {
            alphabetIndexMap[i] = -1;
          }
        }
      }
    }
  });
  module.exports = naturalCompare;
});

// node_modules/list.js/src/utils/get-by-class.js
var require_get_by_class = __commonJS((exports, module) => {
  var getElementsByClassName = function(container, className, single) {
    if (single) {
      return container.getElementsByClassName(className)[0];
    } else {
      return container.getElementsByClassName(className);
    }
  };
  var querySelector = function(container, className, single) {
    className = "." + className;
    if (single) {
      return container.querySelector(className);
    } else {
      return container.querySelectorAll(className);
    }
  };
  var polyfill = function(container, className, single) {
    var classElements = [], tag = "*";
    var els = container.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (var i = 0, j = 0;i < elsLen; i++) {
      if (pattern.test(els[i].className)) {
        if (single) {
          return els[i];
        } else {
          classElements[j] = els[i];
          j++;
        }
      }
    }
    return classElements;
  };
  module.exports = function() {
    return function(container, className, single, options) {
      options = options || {};
      if (options.test && options.getElementsByClassName || !options.test && document.getElementsByClassName) {
        return getElementsByClassName(container, className, single);
      } else if (options.test && options.querySelector || !options.test && document.querySelector) {
        return querySelector(container, className, single);
      } else {
        return polyfill(container, className, single);
      }
    };
  }();
});

// node_modules/list.js/src/utils/extend.js
var require_extend = __commonJS((exports, module) => {
  module.exports = function extend(object) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, source;source = args[i]; i++) {
      if (!source)
        continue;
      for (var property in source) {
        object[property] = source[property];
      }
    }
    return object;
  };
});

// node_modules/list.js/src/utils/index-of.js
var require_index_of = __commonJS((exports, module) => {
  var indexOf = [].indexOf;
  module.exports = function(arr, obj) {
    if (indexOf)
      return arr.indexOf(obj);
    for (var i = 0, il = arr.length;i < il; ++i) {
      if (arr[i] === obj)
        return i;
    }
    return -1;
  };
});

// node_modules/list.js/src/utils/to-array.js
var require_to_array = __commonJS((exports, module) => {
  var isArray = function(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  };
  module.exports = function toArray(collection) {
    if (typeof collection === "undefined")
      return [];
    if (collection === null)
      return [null];
    if (collection === window)
      return [window];
    if (typeof collection === "string")
      return [collection];
    if (isArray(collection))
      return collection;
    if (typeof collection.length != "number")
      return [collection];
    if (typeof collection === "function" && collection instanceof Function)
      return [collection];
    var arr = [];
    for (var i = 0, il = collection.length;i < il; i++) {
      if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
        arr.push(collection[i]);
      }
    }
    if (!arr.length)
      return [];
    return arr;
  };
});

// node_modules/list.js/src/utils/events.js
var require_events = __commonJS((exports) => {
  var bind = window.addEventListener ? "addEventListener" : "attachEvent";
  var unbind = window.removeEventListener ? "removeEventListener" : "detachEvent";
  var prefix = bind !== "addEventListener" ? "on" : "";
  var toArray = require_to_array();
  exports.bind = function(el, type, fn, capture) {
    el = toArray(el);
    for (var i = 0, il = el.length;i < il; i++) {
      el[i][bind](prefix + type, fn, capture || false);
    }
  };
  exports.unbind = function(el, type, fn, capture) {
    el = toArray(el);
    for (var i = 0, il = el.length;i < il; i++) {
      el[i][unbind](prefix + type, fn, capture || false);
    }
  };
  exports.debounce = function(fn, wait, immediate) {
    var timeout;
    return wait ? function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate)
          fn.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow)
        fn.apply(context, args);
    } : fn;
  };
});

// node_modules/list.js/src/utils/to-string.js
var require_to_string = __commonJS((exports, module) => {
  module.exports = function(s) {
    s = s === undefined ? "" : s;
    s = s === null ? "" : s;
    s = s.toString();
    return s;
  };
});

// node_modules/list.js/src/utils/classes.js
var require_classes = __commonJS((exports, module) => {
  var ClassList = function(el) {
    if (!el || !el.nodeType) {
      throw new Error("A DOM element reference is required");
    }
    this.el = el;
    this.list = el.classList;
  };
  var index = require_index_of();
  var re = /\s+/;
  module.exports = function(el) {
    return new ClassList(el);
  };
  ClassList.prototype.add = function(name) {
    if (this.list) {
      this.list.add(name);
      return this;
    }
    var arr = this.array();
    var i = index(arr, name);
    if (!~i)
      arr.push(name);
    this.el.className = arr.join(" ");
    return this;
  };
  ClassList.prototype.remove = function(name) {
    if (this.list) {
      this.list.remove(name);
      return this;
    }
    var arr = this.array();
    var i = index(arr, name);
    if (~i)
      arr.splice(i, 1);
    this.el.className = arr.join(" ");
    return this;
  };
  ClassList.prototype.toggle = function(name, force) {
    if (this.list) {
      if (typeof force !== "undefined") {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name);
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }
    if (typeof force !== "undefined") {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }
    return this;
  };
  ClassList.prototype.array = function() {
    var className = this.el.getAttribute("class") || "";
    var str = className.replace(/^\s+|\s+$/g, "");
    var arr = str.split(re);
    if (arr[0] === "")
      arr.shift();
    return arr;
  };
  ClassList.prototype.has = ClassList.prototype.contains = function(name) {
    return this.list ? this.list.contains(name) : !!~index(this.array(), name);
  };
});

// node_modules/list.js/src/utils/get-attribute.js
var require_get_attribute = __commonJS((exports, module) => {
  module.exports = function(el, attr) {
    var result = el.getAttribute && el.getAttribute(attr) || null;
    if (!result) {
      var attrs = el.attributes;
      var length = attrs.length;
      for (var i = 0;i < length; i++) {
        if (attrs[i] !== undefined) {
          if (attrs[i].nodeName === attr) {
            result = attrs[i].nodeValue;
          }
        }
      }
    }
    return result;
  };
});

// node_modules/list.js/src/item.js
var require_item = __commonJS((exports, module) => {
  module.exports = function(list) {
    return function(initValues, element, notCreate) {
      var item = this;
      this._values = {};
      this.found = false;
      this.filtered = false;
      var init = function(initValues2, element2, notCreate2) {
        if (element2 === undefined) {
          if (notCreate2) {
            item.values(initValues2, notCreate2);
          } else {
            item.values(initValues2);
          }
        } else {
          item.elm = element2;
          var values = list.templater.get(item, initValues2);
          item.values(values);
        }
      };
      this.values = function(newValues, notCreate2) {
        if (newValues !== undefined) {
          for (var name in newValues) {
            item._values[name] = newValues[name];
          }
          if (notCreate2 !== true) {
            list.templater.set(item, item.values());
          }
        } else {
          return item._values;
        }
      };
      this.show = function() {
        list.templater.show(item);
      };
      this.hide = function() {
        list.templater.hide(item);
      };
      this.matching = function() {
        return list.filtered && list.searched && item.found && item.filtered || list.filtered && !list.searched && item.filtered || !list.filtered && list.searched && item.found || !list.filtered && !list.searched;
      };
      this.visible = function() {
        return item.elm && item.elm.parentNode == list.list ? true : false;
      };
      init(initValues, element, notCreate);
    };
  };
});

// node_modules/list.js/src/add-async.js
var require_add_async = __commonJS((exports, module) => {
  module.exports = function(list) {
    var addAsync = function(values, callback, items) {
      var valuesToAdd = values.splice(0, 50);
      items = items || [];
      items = items.concat(list.add(valuesToAdd));
      if (values.length > 0) {
        setTimeout(function() {
          addAsync(values, callback, items);
        }, 1);
      } else {
        list.update();
        callback(items);
      }
    };
    return addAsync;
  };
});

// node_modules/list.js/src/pagination.js
var require_pagination = __commonJS((exports, module) => {
  var classes = require_classes();
  var events = require_events();
  var List = require_src();
  module.exports = function(list) {
    var isHidden = false;
    var refresh = function(pagingList, options) {
      if (list.page < 1) {
        list.listContainer.style.display = "none";
        isHidden = true;
        return;
      } else if (isHidden) {
        list.listContainer.style.display = "block";
      }
      var item, l = list.matchingItems.length, index = list.i, page = list.page, pages = Math.ceil(l / page), currentPage = Math.ceil(index / page), innerWindow = options.innerWindow || 2, left = options.left || options.outerWindow || 0, right = options.right || options.outerWindow || 0;
      right = pages - right;
      pagingList.clear();
      for (var i = 1;i <= pages; i++) {
        var className = currentPage === i ? "active" : "";
        if (is.number(i, left, right, currentPage, innerWindow)) {
          item = pagingList.add({
            page: i,
            dotted: false
          })[0];
          if (className) {
            classes(item.elm).add(className);
          }
          item.elm.firstChild.setAttribute("data-i", i);
          item.elm.firstChild.setAttribute("data-page", page);
        } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
          item = pagingList.add({
            page: "...",
            dotted: true
          })[0];
          classes(item.elm).add("disabled");
        }
      }
    };
    var is = {
      number: function(i, left, right, currentPage, innerWindow) {
        return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
      },
      left: function(i, left) {
        return i <= left;
      },
      right: function(i, right) {
        return i > right;
      },
      innerWindow: function(i, currentPage, innerWindow) {
        return i >= currentPage - innerWindow && i <= currentPage + innerWindow;
      },
      dotted: function(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem);
      },
      dottedLeft: function(pagingList, i, left, right, currentPage, innerWindow) {
        return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
      },
      dottedRight: function(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        if (pagingList.items[currentPageItem - 1].values().dotted) {
          return false;
        } else {
          return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
        }
      }
    };
    return function(options) {
      var pagingList = new List(list.listContainer.id, {
        listClass: options.paginationClass || "pagination",
        item: options.item || "<li><a class='page' href='#'></a></li>",
        valueNames: ["page", "dotted"],
        searchClass: "pagination-search-that-is-not-supposed-to-exist",
        sortClass: "pagination-sort-that-is-not-supposed-to-exist"
      });
      events.bind(pagingList.listContainer, "click", function(e) {
        var target = e.target || e.srcElement, page = list.utils.getAttribute(target, "data-page"), i = list.utils.getAttribute(target, "data-i");
        if (i) {
          list.show((i - 1) * page + 1, page);
        }
      });
      list.on("updated", function() {
        refresh(pagingList, options);
      });
      refresh(pagingList, options);
    };
  };
});

// node_modules/list.js/src/parse.js
var require_parse = __commonJS((exports, module) => {
  module.exports = function(list) {
    var Item = require_item()(list);
    var getChildren = function(parent) {
      var nodes = parent.childNodes, items = [];
      for (var i = 0, il = nodes.length;i < il; i++) {
        if (nodes[i].data === undefined) {
          items.push(nodes[i]);
        }
      }
      return items;
    };
    var parse = function(itemElements, valueNames) {
      for (var i = 0, il = itemElements.length;i < il; i++) {
        list.items.push(new Item(valueNames, itemElements[i]));
      }
    };
    var parseAsync = function(itemElements, valueNames) {
      var itemsToIndex = itemElements.splice(0, 50);
      parse(itemsToIndex, valueNames);
      if (itemElements.length > 0) {
        setTimeout(function() {
          parseAsync(itemElements, valueNames);
        }, 1);
      } else {
        list.update();
        list.trigger("parseComplete");
      }
    };
    list.handlers.parseComplete = list.handlers.parseComplete || [];
    return function() {
      var itemsToIndex = getChildren(list.list), valueNames = list.valueNames;
      if (list.indexAsync) {
        parseAsync(itemsToIndex, valueNames);
      } else {
        parse(itemsToIndex, valueNames);
      }
    };
  };
});

// node_modules/list.js/src/templater.js
var require_templater = __commonJS((exports, module) => {
  var Templater = function(list) {
    var createItem, templater = this;
    var init = function() {
      var itemSource;
      if (typeof list.item === "function") {
        createItem = function(values) {
          var item = list.item(values);
          return getItemSource(item);
        };
        return;
      }
      if (typeof list.item === "string") {
        if (list.item.indexOf("<") === -1) {
          itemSource = document.getElementById(list.item);
        } else {
          itemSource = getItemSource(list.item);
        }
      } else {
        itemSource = getFirstListItem();
      }
      if (!itemSource) {
        throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");
      }
      itemSource = createCleanTemplateItem(itemSource, list.valueNames);
      createItem = function() {
        return itemSource.cloneNode(true);
      };
    };
    var createCleanTemplateItem = function(templateNode, valueNames) {
      var el = templateNode.cloneNode(true);
      el.removeAttribute("id");
      for (var i = 0, il = valueNames.length;i < il; i++) {
        var elm = undefined, valueName = valueNames[i];
        if (valueName.data) {
          for (var j = 0, jl = valueName.data.length;j < jl; j++) {
            el.setAttribute("data-" + valueName.data[j], "");
          }
        } else if (valueName.attr && valueName.name) {
          elm = list.utils.getByClass(el, valueName.name, true);
          if (elm) {
            elm.setAttribute(valueName.attr, "");
          }
        } else {
          elm = list.utils.getByClass(el, valueName, true);
          if (elm) {
            elm.innerHTML = "";
          }
        }
      }
      return el;
    };
    var getFirstListItem = function() {
      var nodes = list.list.childNodes;
      for (var i = 0, il = nodes.length;i < il; i++) {
        if (nodes[i].data === undefined) {
          return nodes[i].cloneNode(true);
        }
      }
      return;
    };
    var getItemSource = function(itemHTML) {
      if (typeof itemHTML !== "string")
        return;
      if (/<tr[\s>]/g.exec(itemHTML)) {
        var tbody = document.createElement("tbody");
        tbody.innerHTML = itemHTML;
        return tbody.firstElementChild;
      } else if (itemHTML.indexOf("<") !== -1) {
        var div = document.createElement("div");
        div.innerHTML = itemHTML;
        return div.firstElementChild;
      }
      return;
    };
    var getValueName = function(name) {
      for (var i = 0, il = list.valueNames.length;i < il; i++) {
        var valueName = list.valueNames[i];
        if (valueName.data) {
          var data = valueName.data;
          for (var j = 0, jl = data.length;j < jl; j++) {
            if (data[j] === name) {
              return { data: name };
            }
          }
        } else if (valueName.attr && valueName.name && valueName.name == name) {
          return valueName;
        } else if (valueName === name) {
          return name;
        }
      }
    };
    var setValue = function(item, name, value) {
      var elm = undefined, valueName = getValueName(name);
      if (!valueName)
        return;
      if (valueName.data) {
        item.elm.setAttribute("data-" + valueName.data, value);
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item.elm, valueName.name, true);
        if (elm) {
          elm.setAttribute(valueName.attr, value);
        }
      } else {
        elm = list.utils.getByClass(item.elm, valueName, true);
        if (elm) {
          elm.innerHTML = value;
        }
      }
    };
    this.get = function(item, valueNames) {
      templater.create(item);
      var values = {};
      for (var i = 0, il = valueNames.length;i < il; i++) {
        var elm = undefined, valueName = valueNames[i];
        if (valueName.data) {
          for (var j = 0, jl = valueName.data.length;j < jl; j++) {
            values[valueName.data[j]] = list.utils.getAttribute(item.elm, "data-" + valueName.data[j]);
          }
        } else if (valueName.attr && valueName.name) {
          elm = list.utils.getByClass(item.elm, valueName.name, true);
          values[valueName.name] = elm ? list.utils.getAttribute(elm, valueName.attr) : "";
        } else {
          elm = list.utils.getByClass(item.elm, valueName, true);
          values[valueName] = elm ? elm.innerHTML : "";
        }
      }
      return values;
    };
    this.set = function(item, values) {
      if (!templater.create(item)) {
        for (var v in values) {
          if (values.hasOwnProperty(v)) {
            setValue(item, v, values[v]);
          }
        }
      }
    };
    this.create = function(item) {
      if (item.elm !== undefined) {
        return false;
      }
      item.elm = createItem(item.values());
      templater.set(item, item.values());
      return true;
    };
    this.remove = function(item) {
      if (item.elm.parentNode === list.list) {
        list.list.removeChild(item.elm);
      }
    };
    this.show = function(item) {
      templater.create(item);
      list.list.appendChild(item.elm);
    };
    this.hide = function(item) {
      if (item.elm !== undefined && item.elm.parentNode === list.list) {
        list.list.removeChild(item.elm);
      }
    };
    this.clear = function() {
      if (list.list.hasChildNodes()) {
        while (list.list.childNodes.length >= 1) {
          list.list.removeChild(list.list.firstChild);
        }
      }
    };
    init();
  };
  module.exports = function(list) {
    return new Templater(list);
  };
});

// node_modules/list.js/src/search.js
var require_search = __commonJS((exports, module) => {
  module.exports = function(list) {
    var item, text, columns, searchString, customSearch;
    var prepare = {
      resetList: function() {
        list.i = 1;
        list.templater.clear();
        customSearch = undefined;
      },
      setOptions: function(args) {
        if (args.length == 2 && args[1] instanceof Array) {
          columns = args[1];
        } else if (args.length == 2 && typeof args[1] == "function") {
          columns = undefined;
          customSearch = args[1];
        } else if (args.length == 3) {
          columns = args[1];
          customSearch = args[2];
        } else {
          columns = undefined;
        }
      },
      setColumns: function() {
        if (list.items.length === 0)
          return;
        if (columns === undefined) {
          columns = list.searchColumns === undefined ? prepare.toArray(list.items[0].values()) : list.searchColumns;
        }
      },
      setSearchString: function(s) {
        s = list.utils.toString(s).toLowerCase();
        s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
        searchString = s;
      },
      toArray: function(values) {
        var tmpColumn = [];
        for (var name in values) {
          tmpColumn.push(name);
        }
        return tmpColumn;
      }
    };
    var search = {
      list: function() {
        var words = [], phrase, ss = searchString;
        while ((phrase = ss.match(/"([^"]+)"/)) !== null) {
          words.push(phrase[1]);
          ss = ss.substring(0, phrase.index) + ss.substring(phrase.index + phrase[0].length);
        }
        ss = ss.trim();
        if (ss.length)
          words = words.concat(ss.split(/\s+/));
        for (var k = 0, kl = list.items.length;k < kl; k++) {
          var item2 = list.items[k];
          item2.found = false;
          if (!words.length)
            continue;
          for (var i = 0, il = words.length;i < il; i++) {
            var word_found = false;
            for (var j = 0, jl = columns.length;j < jl; j++) {
              var values = item2.values(), column = columns[j];
              if (values.hasOwnProperty(column) && values[column] !== undefined && values[column] !== null) {
                var text2 = typeof values[column] !== "string" ? values[column].toString() : values[column];
                if (text2.toLowerCase().indexOf(words[i]) !== -1) {
                  word_found = true;
                  break;
                }
              }
            }
            if (!word_found)
              break;
          }
          item2.found = word_found;
        }
      },
      reset: function() {
        list.reset.search();
        list.searched = false;
      }
    };
    var searchMethod = function(str) {
      list.trigger("searchStart");
      prepare.resetList();
      prepare.setSearchString(str);
      prepare.setOptions(arguments);
      prepare.setColumns();
      if (searchString === "") {
        search.reset();
      } else {
        list.searched = true;
        if (customSearch) {
          customSearch(searchString, columns);
        } else {
          search.list();
        }
      }
      list.update();
      list.trigger("searchComplete");
      return list.visibleItems;
    };
    list.handlers.searchStart = list.handlers.searchStart || [];
    list.handlers.searchComplete = list.handlers.searchComplete || [];
    list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), "keyup", list.utils.events.debounce(function(e) {
      var target = e.target || e.srcElement, alreadyCleared = target.value === "" && !list.searched;
      if (!alreadyCleared) {
        searchMethod(target.value);
      }
    }, list.searchDelay));
    list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), "input", function(e) {
      var target = e.target || e.srcElement;
      if (target.value === "") {
        searchMethod("");
      }
    });
    return searchMethod;
  };
});

// node_modules/list.js/src/filter.js
var require_filter = __commonJS((exports, module) => {
  module.exports = function(list) {
    list.handlers.filterStart = list.handlers.filterStart || [];
    list.handlers.filterComplete = list.handlers.filterComplete || [];
    return function(filterFunction) {
      list.trigger("filterStart");
      list.i = 1;
      list.reset.filter();
      if (filterFunction === undefined) {
        list.filtered = false;
      } else {
        list.filtered = true;
        var is = list.items;
        for (var i = 0, il = is.length;i < il; i++) {
          var item = is[i];
          if (filterFunction(item)) {
            item.filtered = true;
          } else {
            item.filtered = false;
          }
        }
      }
      list.update();
      list.trigger("filterComplete");
      return list.visibleItems;
    };
  };
});

// node_modules/list.js/src/sort.js
var require_sort = __commonJS((exports, module) => {
  module.exports = function(list) {
    var buttons = {
      els: undefined,
      clear: function() {
        for (var i = 0, il = buttons.els.length;i < il; i++) {
          list.utils.classes(buttons.els[i]).remove("asc");
          list.utils.classes(buttons.els[i]).remove("desc");
        }
      },
      getOrder: function(btn) {
        var predefinedOrder = list.utils.getAttribute(btn, "data-order");
        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          return predefinedOrder;
        } else if (list.utils.classes(btn).has("desc")) {
          return "asc";
        } else if (list.utils.classes(btn).has("asc")) {
          return "desc";
        } else {
          return "asc";
        }
      },
      getInSensitive: function(btn, options) {
        var insensitive = list.utils.getAttribute(btn, "data-insensitive");
        if (insensitive === "false") {
          options.insensitive = false;
        } else {
          options.insensitive = true;
        }
      },
      setOrder: function(options) {
        for (var i = 0, il = buttons.els.length;i < il; i++) {
          var btn = buttons.els[i];
          if (list.utils.getAttribute(btn, "data-sort") !== options.valueName) {
            continue;
          }
          var predefinedOrder = list.utils.getAttribute(btn, "data-order");
          if (predefinedOrder == "asc" || predefinedOrder == "desc") {
            if (predefinedOrder == options.order) {
              list.utils.classes(btn).add(options.order);
            }
          } else {
            list.utils.classes(btn).add(options.order);
          }
        }
      }
    };
    var sort = function() {
      list.trigger("sortStart");
      var options = {};
      var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;
      if (target) {
        options.valueName = list.utils.getAttribute(target, "data-sort");
        buttons.getInSensitive(target, options);
        options.order = buttons.getOrder(target);
      } else {
        options = arguments[1] || options;
        options.valueName = arguments[0];
        options.order = options.order || "asc";
        options.insensitive = typeof options.insensitive == "undefined" ? true : options.insensitive;
      }
      buttons.clear();
      buttons.setOrder(options);
      var customSortFunction = options.sortFunction || list.sortFunction || null, multi = options.order === "desc" ? -1 : 1, sortFunction;
      if (customSortFunction) {
        sortFunction = function(itemA, itemB) {
          return customSortFunction(itemA, itemB, options) * multi;
        };
      } else {
        sortFunction = function(itemA, itemB) {
          var sort2 = list.utils.naturalSort;
          sort2.alphabet = list.alphabet || options.alphabet || undefined;
          if (!sort2.alphabet && options.insensitive) {
            sort2 = list.utils.naturalSort.caseInsensitive;
          }
          return sort2(itemA.values()[options.valueName], itemB.values()[options.valueName]) * multi;
        };
      }
      list.items.sort(sortFunction);
      list.update();
      list.trigger("sortComplete");
    };
    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];
    buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
    list.utils.events.bind(buttons.els, "click", sort);
    list.on("searchStart", buttons.clear);
    list.on("filterStart", buttons.clear);
    return sort;
  };
});

// node_modules/list.js/src/utils/fuzzy.js
var require_fuzzy = __commonJS((exports, module) => {
  module.exports = function(text, pattern, options) {
    var Match_Location = options.location || 0;
    var Match_Distance = options.distance || 100;
    var Match_Threshold = options.threshold || 0.4;
    if (pattern === text)
      return true;
    if (pattern.length > 32)
      return false;
    var loc = Match_Location, s = function() {
      var q = {}, i;
      for (i = 0;i < pattern.length; i++) {
        q[pattern.charAt(i)] = 0;
      }
      for (i = 0;i < pattern.length; i++) {
        q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
      }
      return q;
    }();
    function match_bitapScore_(e, x) {
      var accuracy = e / pattern.length, proximity = Math.abs(loc - x);
      if (!Match_Distance) {
        return proximity ? 1 : accuracy;
      }
      return accuracy + proximity / Match_Distance;
    }
    var score_threshold = Match_Threshold, best_loc = text.indexOf(pattern, loc);
    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      best_loc = text.lastIndexOf(pattern, loc + pattern.length);
      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      }
    }
    var matchmask = 1 << pattern.length - 1;
    best_loc = -1;
    var bin_min, bin_mid;
    var bin_max = pattern.length + text.length;
    var last_rd;
    for (var d = 0;d < pattern.length; d++) {
      bin_min = 0;
      bin_mid = bin_max;
      while (bin_min < bin_mid) {
        if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
          bin_min = bin_mid;
        } else {
          bin_max = bin_mid;
        }
        bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
      }
      bin_max = bin_mid;
      var start = Math.max(1, loc - bin_mid + 1);
      var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
      var rd = Array(finish + 2);
      rd[finish + 1] = (1 << d) - 1;
      for (var j = finish;j >= start; j--) {
        var charMatch = s[text.charAt(j - 1)];
        if (d === 0) {
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
        } else {
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
        }
        if (rd[j] & matchmask) {
          var score = match_bitapScore_(d, j - 1);
          if (score <= score_threshold) {
            score_threshold = score;
            best_loc = j - 1;
            if (best_loc > loc) {
              start = Math.max(1, 2 * loc - best_loc);
            } else {
              break;
            }
          }
        }
      }
      if (match_bitapScore_(d + 1, loc) > score_threshold) {
        break;
      }
      last_rd = rd;
    }
    return best_loc < 0 ? false : true;
  };
});

// node_modules/list.js/src/fuzzy-search.js
var require_fuzzy_search = __commonJS((exports, module) => {
  var classes = require_classes();
  var events = require_events();
  var extend = require_extend();
  var toString = require_to_string();
  var getByClass = require_get_by_class();
  var fuzzy = require_fuzzy();
  module.exports = function(list, options) {
    options = options || {};
    options = extend({
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true,
      searchClass: "fuzzy-search"
    }, options);
    var fuzzySearch = {
      search: function(searchString, columns) {
        var searchArguments = options.multiSearch ? searchString.replace(/ +$/, "").split(/ +/) : [searchString];
        for (var k = 0, kl = list.items.length;k < kl; k++) {
          fuzzySearch.item(list.items[k], columns, searchArguments);
        }
      },
      item: function(item, columns, searchArguments) {
        var found = true;
        for (var i = 0;i < searchArguments.length; i++) {
          var foundArgument = false;
          for (var j = 0, jl = columns.length;j < jl; j++) {
            if (fuzzySearch.values(item.values(), columns[j], searchArguments[i])) {
              foundArgument = true;
            }
          }
          if (!foundArgument) {
            found = false;
          }
        }
        item.found = found;
      },
      values: function(values, value, searchArgument) {
        if (values.hasOwnProperty(value)) {
          var text = toString(values[value]).toLowerCase();
          if (fuzzy(text, searchArgument, options)) {
            return true;
          }
        }
        return false;
      }
    };
    events.bind(getByClass(list.listContainer, options.searchClass), "keyup", list.utils.events.debounce(function(e) {
      var target = e.target || e.srcElement;
      list.search(target.value, fuzzySearch.search);
    }, list.searchDelay));
    return function(str, columns) {
      list.search(str, columns, fuzzySearch.search);
    };
  };
});

// node_modules/list.js/src/index.js
var require_src = __commonJS((exports, module) => {
  var naturalSort = require_natural_compare();
  var getByClass = require_get_by_class();
  var extend = require_extend();
  var indexOf = require_index_of();
  var events = require_events();
  var toString = require_to_string();
  var classes = require_classes();
  var getAttribute = require_get_attribute();
  var toArray = require_to_array();
  module.exports = function(id, options, values) {
    var self = this, init, Item = require_item()(self), addAsync = require_add_async()(self), initPagination = require_pagination()(self);
    init = {
      start: function() {
        self.listClass = "list";
        self.searchClass = "search";
        self.sortClass = "sort";
        self.page = 1e4;
        self.i = 1;
        self.items = [];
        self.visibleItems = [];
        self.matchingItems = [];
        self.searched = false;
        self.filtered = false;
        self.searchColumns = undefined;
        self.searchDelay = 0;
        self.handlers = { updated: [] };
        self.valueNames = [];
        self.utils = {
          getByClass,
          extend,
          indexOf,
          events,
          toString,
          naturalSort,
          classes,
          getAttribute,
          toArray
        };
        self.utils.extend(self, options);
        self.listContainer = typeof id === "string" ? document.getElementById(id) : id;
        if (!self.listContainer) {
          return;
        }
        self.list = getByClass(self.listContainer, self.listClass, true);
        self.parse = require_parse()(self);
        self.templater = require_templater()(self);
        self.search = require_search()(self);
        self.filter = require_filter()(self);
        self.sort = require_sort()(self);
        self.fuzzySearch = require_fuzzy_search()(self, options.fuzzySearch);
        this.handlers();
        this.items();
        this.pagination();
        self.update();
      },
      handlers: function() {
        for (var handler in self.handlers) {
          if (self[handler] && self.handlers.hasOwnProperty(handler)) {
            self.on(handler, self[handler]);
          }
        }
      },
      items: function() {
        self.parse(self.list);
        if (values !== undefined) {
          self.add(values);
        }
      },
      pagination: function() {
        if (options.pagination !== undefined) {
          if (options.pagination === true) {
            options.pagination = [{}];
          }
          if (options.pagination[0] === undefined) {
            options.pagination = [options.pagination];
          }
          for (var i = 0, il = options.pagination.length;i < il; i++) {
            initPagination(options.pagination[i]);
          }
        }
      }
    };
    this.reIndex = function() {
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.parse(self.list);
    };
    this.toJSON = function() {
      var json = [];
      for (var i = 0, il = self.items.length;i < il; i++) {
        json.push(self.items[i].values());
      }
      return json;
    };
    this.add = function(values2, callback) {
      if (values2.length === 0) {
        return;
      }
      if (callback) {
        addAsync(values2.slice(0), callback);
        return;
      }
      var added = [], notCreate = false;
      if (values2[0] === undefined) {
        values2 = [values2];
      }
      for (var i = 0, il = values2.length;i < il; i++) {
        var item = null;
        notCreate = self.items.length > self.page ? true : false;
        item = new Item(values2[i], undefined, notCreate);
        self.items.push(item);
        added.push(item);
      }
      self.update();
      return added;
    };
    this.show = function(i, page) {
      this.i = i;
      this.page = page;
      self.update();
      return self;
    };
    this.remove = function(valueName, value, options2) {
      var found = 0;
      for (var i = 0, il = self.items.length;i < il; i++) {
        if (self.items[i].values()[valueName] == value) {
          self.templater.remove(self.items[i], options2);
          self.items.splice(i, 1);
          il--;
          i--;
          found++;
        }
      }
      self.update();
      return found;
    };
    this.get = function(valueName, value) {
      var matchedItems = [];
      for (var i = 0, il = self.items.length;i < il; i++) {
        var item = self.items[i];
        if (item.values()[valueName] == value) {
          matchedItems.push(item);
        }
      }
      return matchedItems;
    };
    this.size = function() {
      return self.items.length;
    };
    this.clear = function() {
      self.templater.clear();
      self.items = [];
      return self;
    };
    this.on = function(event, callback) {
      self.handlers[event].push(callback);
      return self;
    };
    this.off = function(event, callback) {
      var e = self.handlers[event];
      var index = indexOf(e, callback);
      if (index > -1) {
        e.splice(index, 1);
      }
      return self;
    };
    this.trigger = function(event) {
      var i = self.handlers[event].length;
      while (i--) {
        self.handlers[event][i](self);
      }
      return self;
    };
    this.reset = {
      filter: function() {
        var is = self.items, il = is.length;
        while (il--) {
          is[il].filtered = false;
        }
        return self;
      },
      search: function() {
        var is = self.items, il = is.length;
        while (il--) {
          is[il].found = false;
        }
        return self;
      }
    };
    this.update = function() {
      var is = self.items, il = is.length;
      self.visibleItems = [];
      self.matchingItems = [];
      self.templater.clear();
      for (var i = 0;i < il; i++) {
        if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
          is[i].show();
          self.visibleItems.push(is[i]);
          self.matchingItems.push(is[i]);
        } else if (is[i].matching()) {
          self.matchingItems.push(is[i]);
          is[i].hide();
        } else {
          is[i].hide();
        }
      }
      self.trigger("updated");
      return self;
    };
    init.start();
  };
});

// src/js/utils.js
var import_toastify_js = __toESM(require_toastify(), 1);
var import_list = __toESM(require_src(), 1);
var newList = (id, options) => {
  return new import_list.default(id, options);
};
var showSuccessMessage = (message) => {
  import_toastify_js.default({
    text: message,
    duration: 2100,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "#27B825",
      color: "#ffffff",
      position: "fixed",
      right: "24px",
      bottom: "24px",
      padding: "12px",
      width: "auto",
      borderRadius: "6px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    },
    onClick: function() {
    }
  }).showToast();
};
var showErrorMessage = (message) => {
  import_toastify_js.default({
    text: message,
    duration: 2100,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "#B82525",
      color: "#ffffff",
      position: "fixed",
      right: "24px",
      bottom: "24px",
      padding: "12px",
      width: "auto",
      borderRadius: "6px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    },
    onClick: function() {
    }
  }).showToast();
};
export {
  showSuccessMessage,
  showErrorMessage,
  newList
};
