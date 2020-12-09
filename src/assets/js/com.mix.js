/**
 * ObjArrayValueKey 传入一个值 查找对象数组 中对应某个KEK 并去某个属性的值
 * @param {number,string} value
 * @param {Object} ObjArray
 * @param {array} keyArray [查找key,返回目标Key]
 * @returns {string}
 * @constructor
 */
export const ObjArrayValueKey = function (value, ObjArray, keyArray) {
  let _tmp = ''
  for (let i in ObjArray) {
    if (ObjArray[i][keyArray[0]] == value) {
      _tmp = ObjArray[i][keyArray[1]]
      break
    }
  }
  return _tmp
}
/**
 * ArrayDiff 简单数组差集
 * @param {array,Object} arr1 被差值
 * @param {array,Object} arr2 目标值，主集合
 * @returns []
 * @constructor
 */
export const ArrayDiff = function (arr1, arr2) {
  let set1 = new Set(arr1)
  let set2 = new Set(arr2)

  let subset = []

  for (let item of set1) {
    if (!set2.has(item)) {
      subset.push(item)
    }
  }
  return subset
}
/**
 * Trim 去除字符串空格
 * @param str 字符串
 * @returns {XML|string|void|*}
 * @constructor
 */
export const Trim = function (str) {
  return str.replace(/(^\s+)|(\s+$)/g, "");
}

/**
 * 获取浏览器可视的高宽
 * @func GetWindowWidthHeight
 * @returns {{width: number, height: number}}
 * @todo 这家伙获取浏览器可视的高宽
 */
export const GetWindowWidthHeight = function () {
  let winWidth = 0;
  let winHeight = 0;
  /*获取窗口宽度*/
  if (window.innerWidth) {
    winWidth = window.innerWidth;
  }
  else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth;
  }
  /*获取窗口高度*/
  if (window.innerHeight) {
    winHeight = window.innerHeight;
  }
  else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight;
  }
  /*通过深入Document内部对body进行检测，获取窗口大小*/
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
  }
  return {
    width: winWidth,
    height: winHeight
  }
}

/**
 * 获取元素可视的高宽
 * @func GetClientWidthHeight
 * @returns {{width: number, height: number}}
 * @todo 获取元素可视的高宽
 */
export const GetClientWidthHeight = function ($element) {
  return {
    width: $element.clientWidth,
    height: $element.clientHeight
  }
}

/**
 * 获取元素滚动内容
 * @func GetScrollWidthHeight
 * @returns {{width: number, height: number}}
 * @todo 获取可以获取滚动内容
 */
export const GetScrollWidthHeight = function ($element) {
  return {
    width: $element.scrollWidth,
    height: $element.scrollHeight
  }
}

/**
 * 获取元素实际大小
 * @func GetOffsetWidthHeight
 * @returns {{width: number, height: number}}
 * @todo 可以返回元素实际大小
 */
export const GetOffsetWidthHeight = function ($element) {
  return {
    width: $element.offsetWidth,
    height: $element.offsetHeight
  }
}
/**
 * 简单的绑定浏览器事件
 */
export const OnWinResize = function (callback,time) {
  let resizeTimer = null
  time = time || 100
  window.onresize = function () {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(function () {
      callback()
    }, time)
  }
}
/**
 * 简单的绑定滚动事件
 */
export const ELOnScroll = function (el,callback,time) {
  let scrollTimer = null
  time = time || 100
  el.onscroll = function () {
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }
    scrollTimer = setTimeout(function () {
      callback()
    }, time)
  }
}

/**
 * Returns the offset parent of the given element
 * @function
 * @ignore
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent;
  return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
}

/**
 * Given an element and one of its parents, return the offset
 * @function
 * @ignore
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @return {Object} rect
 */
function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
  var elementRect = getBoundingClientRect(element);
  var parentRect = getBoundingClientRect(parent);

  if (fixed) {
    var scrollParent = getScrollParent(parent);
    parentRect.top += scrollParent.scrollTop;
    parentRect.bottom += scrollParent.scrollTop;
    parentRect.left += scrollParent.scrollLeft;
    parentRect.right += scrollParent.scrollLeft;
  }

  var rect = {
    top: elementRect.top - parentRect.top ,
    left: elementRect.left - parentRect.left ,
    bottom: (elementRect.top - parentRect.top) + elementRect.height,
    right: (elementRect.left - parentRect.left) + elementRect.width,
    width: elementRect.width,
    height: elementRect.height
  };
  return rect;
}

//默认返回注册的方法
export default {
  ObjArrayValueKey,
  ArrayDiff,
  Trim,
  GetWindowWidthHeight,
  OnWinResize,
  ELOnScroll
}
