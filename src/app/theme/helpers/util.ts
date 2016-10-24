import Consts from './consts';
export default class Util {
	static binarySearch(a, k, compareFn) {
		if(compareFn == Consts.STRING_COMPARATOR_FUNCTION && !Util.isFunction(compareFn)) {
			compareFn = Util[Consts.STRING_COMPARATOR_FUNCTION];
		}
		if(!Util.isFunction(compareFn)) {
			compareFn = Util.defaultComparator;
		}
		let left = 0;
		let right = a.length-1;
		while(left <= right) {
			let mid = Math.floor(0.5*(left+right)) ;
			let cmp = compareFn(a[mid], k);
			if(cmp < 0) {
				left = mid + 1;
			} else if(cmp > 0) {
				right = mid - 1;
			} else {
				return mid;
			}
		}
		return -(left + 1);
	}
	static binarySearchInsertCeiling(a, k, compareFn) {
		let index = Util.binarySearch(a, k, compareFn);
		return (index >= 0 ? index : -(index+1));
	}
	static binarySearchInsertFloor(a, k, compareFn) {
		let index = Util.binarySearch(a, k, compareFn);
		return (index >= 0 ? index : -(index+2));
	}
	static getInsertPosition(a, k, compareFn) {
		let idx = Util.binarySearch(a, k, compareFn);
		return (idx >= 0) ? idx : -(idx+1);
	}

	static getFromSortedArray(a, obj, compareFn) {
		if(compareFn == Consts.STRING_COMPARATOR_FUNCTION && !Util.isFunction(compareFn)) {
			compareFn = Util[Consts.STRING_COMPARATOR_FUNCTION];
		}
		if(!Util.isFunction(compareFn)) {
			compareFn = Util.defaultComparator;
		}
		let searchIdx = Util.binarySearch(a, obj, compareFn);
		if(searchIdx >= 0) {
			return a[searchIdx];
		}
		return undefined;
	}
	// Taken from http://stackoverflow.com/questions/1068834/object-comparison-in-javascript and modified slightly
	static areObjectsEqual(x, y) {
	    let p;
	    const leftChain = [];
	    const rightChain = [];

	    // Remember that NaN === NaN returns false
	    // and isNaN(undefined) returns true
	    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
	        return true;
	    }

	    // Compare primitives and functions.
	    // Check if both arguments link to the same object.
	    // Especially useful on step when comparing prototypes
	    if (x === y) {
	        return true;
	    }

	    // Works in case when functions are created in constructor.
	    // Comparing dates is a common scenario. Another built-ins?
	    // We can even handle functions passed across iframes
	    if ((typeof x === 'function' && typeof y === 'function') ||
	       (x instanceof Date && y instanceof Date) ||
	       (x instanceof RegExp && y instanceof RegExp) ||
	       (x instanceof String && y instanceof String) ||
	       (x instanceof Number && y instanceof Number)) {
	        return x.toString() === y.toString();
	    }

	    if (x instanceof Map && y instanceof Map) {
	        return Util.areMapsEqual(x, y);
	    }

	    // At last checking prototypes as good a we can
	    if (!(x instanceof Object && y instanceof Object)) {
	        return false;
	    }

	    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
	        return false;
	    }

	    if (x.constructor !== y.constructor) {
	        return false;
	    }

	    if (x.prototype !== y.prototype) {
	        return false;
	    }

	    // Check for infinitive linking loops
	    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
	        return false;
	    }

	    // Quick checking of one object beeing a subset of another.
	    for (p in y) {
	        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
	            return false;
	        } else if (typeof y[p] !== typeof x[p]) {
	            return false;
	        }
	    }

	    for (p in x) {
	        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
	            return false;
	        } else if (typeof y[p] !== typeof x[p]) {
	            return false;
	        }

	        switch (typeof (x[p])) {
	        case 'object':
	        case 'function':

	            leftChain.push(x);
	            rightChain.push(y);

	            if (!Util.areObjectsEqual(x[p], y[p])) {
	                return false;
	            }

	            leftChain.pop();
	            rightChain.pop();
	            break;

	        default:
	            if (x[p] !== y[p]) {
	                return false;
	            }
	            break;
	        }
	    }

	    return true;
	}

	static areMapsEqual(a, b) {
	    if (a.size !== b.size) {
	        return false;
	    }

	    for (const [key, value] of a) {
	        if (!b.has(key)) {
	            return false;
	        }

	        if (!Util.areObjectsEqual(value, b.get(key))) {
	            return false;
	        }
	    }

	    return true;
	}
	static insertIntoSortedArray(a, obj, compareFn) {
		if(compareFn == Consts.STRING_COMPARATOR_FUNCTION && !Util.isFunction(compareFn)) {
			compareFn = Util[Consts.STRING_COMPARATOR_FUNCTION];
		}
		if(!Util.isFunction(compareFn)) {
			compareFn = Util.defaultComparator;
		}

		let searchIdx = Util.binarySearch(a, obj, compareFn);
		let insertIdx = searchIdx >= 0 ? searchIdx : -(searchIdx+1)
		a.splice(insertIdx, 0, obj);
	}
	static insertIntoUniqueSortedArray(a, obj, compareFn) {
		if(compareFn == Consts.STRING_COMPARATOR_FUNCTION && !Util.isFunction(compareFn)) {
			compareFn = Util[Consts.STRING_COMPARATOR_FUNCTION];
		}
		if(!Util.isFunction(compareFn)) {
			compareFn = Util.defaultComparator;
		}

		let searchIdx = Util.binarySearch(a, obj, compareFn);
		if(searchIdx < 0) {
			a.splice(-(searchIdx+1), 0, obj);
		}
	}
	static removeFromSortedArray(a, obj, compareFn) {
		if(compareFn == Consts.STRING_COMPARATOR_FUNCTION && !Util.isFunction(compareFn)) {
			compareFn = Util[Consts.STRING_COMPARATOR_FUNCTION];
		}
		if(!Util.isFunction(compareFn)) {
			compareFn = Util.defaultComparator;
		}

		let searchIdx = Util.binarySearch(a, obj, compareFn);
		if(searchIdx >= 0) {
			return a.splice(searchIdx, 1)[0];
		}
		return false;
	}

	static removeFromUnsortedArray(a, obj) {
		let idx = a.indexOf(obj);
		if(idx >= 0) {
			a.splice(idx, 1);
		}
	}

	// Assumes numeric input
	// Clamps x within the range [min, max]
	static clamp(x, min, max) {
		return Math.max(Math.min(x, max), min);
	}

	// Returns removed element if found or undefined if not found
	static removeElement(array, target) {
		let idx = array.indexOf(target);
		if(idx >= 0) {
			return array.splice(idx, 1);
		}
		return undefined;
	}
	// Returns array with unique elements
	static removeDuplicateElements(array) {
		let a = array;
		for(let i=0; i<a.length; ++i) {
			for(let j=i+1; j<a.length; ++j) {
				if(a[i] === a[j]){
					a.splice(j--, 1);
				}
			}
		}
		return a;
	}
	// merges an array then returns array with unique elements
	static mergeRemoveDuplicateElements(array) {
		let a = array.concat();
		for(let i=0; i<a.length; ++i) {
			for(let j=i+1; j<a.length; ++j) {
				if(a[i] === a[j])
					a.splice(j--, 1);
			}
		}
		return a;
	}

	// Create an es6 version of some ng-tasty services
	static debounce() {
		return function (func, wait, immediate) {
			var args, context, debounceTimeout, timeout;
			debounceTimeout = function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			return function debounce () {
				context = this;
				args = arguments;
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(debounceTimeout, wait);
				if (callNow) {
					func.apply(context, args);
				}
			};
		};
	}
	static throttle() {
		return function (fn, threshhold, scope) {
			threshhold = threshhold || 250;
			var last, promise;
			return function throttle () {
				var context = scope || this;
				var now = Date.now(),
					args = arguments;
				if (last && now < last + threshhold) {
					// hold on to it
					clearTimeout(promise);
					promise = setTimeout(function throttleTimeout () {
						last = now;
						fn.apply(context, args);
					}, threshhold);
				} else {
					last = now;
					fn.apply(context, args);
				}
			};
		};
	}
	static objectAsMap(data, mapper) {
		let m = new Map();
		for (let prop in data ){
			const k = prop;
			const v = data[prop];
		 	m.set(k, Util.isFunction(mapper) ? mapper(v) : v);
		}
		return m;
	}
	// Reverse mapping from [ a, b, c ] to { a: 0, b: 1, c: 2 }
	static arrayAsMap(data) {
		let m = new Map();
		data.forEach((ele, i) => {
			m.set(ele, i);
		});
		return m;
	}
	static camelize(str) {
		return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2) {
			if (p2) {
				return p2.toUpperCase();
			}
			return p1.toLowerCase();        
		});
	}
	static dynamicSort(property) {
		let sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}	
	static defaultComparator(a, b) {
		return a - b;
	}
	static stringComparator(a,b) {
		return a.localeCompare(b);
	}
	static isMac() {
		return navigator.platform.toUpperCase().indexOf('MAC')>=0;
	}
	static isMacLike() {
		return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
	}
	static isIOS() {
		return navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;
	}
	static isWindows() {
		return navigator.platform.indexOf('Win')>=0;
	}
	static isSafari() {
		return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS');
	}
	static isDoubleEqual(a, b) {
		return Math.abs(a-b) < Number.EPSILON;
	}
	static isDefined(value) {
		return typeof value !== 'undefined';;
	}
	static isString(value) {
		return typeof value === 'string';
	}
	static isNumber(value) {
		return typeof value === 'number';
	}
	static isObject(value) {
		return value !== null && typeof value === 'object';
	}
	static isFunction(value) {
		return typeof value === 'function';
	}

	static isEmail(email) {
	    // writing a regex to match all valid email addresses is really, really hard (see http://stackoverflow.com/a/201378)
	    // so I just do a simple check.
	    return (/^.+@.+$/).test(email);
	}
	//http://burtleburtle.net/bob/hash/doobs.html
	static jenkinsHash(key, size) {
		let hash = 0;
		for (var i=0; i<key.length; ++i) {
			hash += key.charCodeAt(i);
			hash += (hash << 10);
			hash ^= (hash >> 6);
		}
		hash += (hash << 3);
		hash ^= (hash >> 11);
		hash += (hash << 15);
		// make unsigned and modulo size
		return (hash >>> 0) % size;
	}

 	static isObjectEmpty(obj) {
		const hasOwnProperty = Object.prototype.hasOwnProperty;

	    // null and undefined are "empty"
	    if (obj == null) return true;

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length > 0)    return false;
	    if (obj.length === 0)  return true;

	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	    }

	    return true;
	}

	static evaluateTemplateStringAgainstDictionary(str, obj) {
	/*

	Example usage:
	evaluateTemplateStringAgainstDictionary("${code} - ${name}", { code: '123', name: 'Apparel' });
	// "123 - Apparel"

	*/
  		return applyStringToTemplate(str)(templateEngine, obj);
		// http://stackoverflow.com/a/29771751
		function applyStringToTemplate(literal) {
		  	// Substitute literal expressions to quoted ones so it can be applied against the
		  	// object that can be applied with the template engine (arguments[0]) against the
		  	// passed object (arguments[1])
		  	return new Function('', "return arguments[0]`" + literal.replace(/\$\{(.*?)\}/g, (m0, m1) => {
		    	return "${'" + m1 + "'}";
		  	}) + "`(arguments[1]);");
		}

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals
		function templateEngine(strings, ...keys) {
		  	return (function(...values) {
		    	var dict = values[values.length - 1] || {};
		    	var result = [strings[0]];
		    	keys.forEach(function(key, i) {
		      		var value = Number.isInteger(key) ? values[key] : dict[key];
		      		result.push(value, strings[i + 1]);
		    	});
		    	return result.join('');
		  });
		}
	}
	static itemMask(itemNumber) {
		const seperator = itemNumber.indexOf('.');;
		if(seperator == -1) return itemNumber;

		return itemNumber.substring(0, seperator); 
	}
    static getThumbnailDimensions(innerW, innerH, outerW, outerH) {
        var outerAR = outerW / outerH;
        var innerAR = innerW / innerH;
        if(outerAR >= innerAR) {
            return [ outerH * innerAR, outerH ];  // Container is wider than contents
        } else {
            return [ outerW, outerW * innerAR ];  // Content is wider than container
        }
    }

}

