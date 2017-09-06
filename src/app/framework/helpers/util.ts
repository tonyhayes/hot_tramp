import { Consts } from './consts';
import * as _ from 'lodash';
export class Util {
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
	static debounce(func, wait, immediate?) {
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
	static throttle(fn, threshhold?, scope?) {
		return function (fn, threshhold?, scope?) {
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
	//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
	static isMobile() {
  		let check = false;
  		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
  		return check;
	};
	static isMobileOrTablet() {
  		let check = false;
  		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
  		return check;
	};
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
    static removeDomNuisances() {
		//remove fail-back routing element from DOM
		let elem = document.getElementById('route-error-fallback');
		if(elem && elem.parentNode){
			elem.parentNode.removeChild(elem);			
		}
		elem = document.getElementById('dc-footer');
		if(elem && elem.parentNode){
			elem.parentNode.removeChild(elem);			
		}
		//auth0 bug - auth0-lock-container-1
		elem = document.getElementById('auth0-lock-container-1');
		if(elem && elem.parentNode){
			console.log('removing auth0-lock-container-1')
			elem.parentNode.removeChild(elem);			
		}
    }
    static isInvalidTenantName(name) {
        switch (name) {
	        case 'logged-out':
	        	return true
	        case 'user-administration':
	        	return true
	        case 'project-management':
	        	return true
	        default:
	            return false;
        }
    }
    static pad(n) {
    	return (n < 10) ? ("0" + n) : n;
    }
    static getDate(daysFromToday):Object {
		let d = new Date();
		d.setDate(d.getDate() + daysFromToday);
		const day = d.getDate();
		const month = d.getMonth()+1;
		const year = d.getFullYear();
  		const ngbDate = { year: year, month: month, day: day };
 		return ngbDate

    }
    static formatDateObject(date):Object {
    	if(!date){
    		return null;
    	}
    	const dateArray = date.split('-');
		const day = +dateArray[2];
		const month = +dateArray[1];
		const year = +dateArray[0];
  		const ngbDate = { year: year, month: month, day: day };
 		return ngbDate

    }
    static formatDisplayDate(date, fromFormat, fromSep, toFormat, toSep):Object {
    	if(!date){
    		return null;
    	}

    	//FIXME - from format NOT implemented hardcoded to YYYYMMDD
    	const dateArray = date.split(fromSep);
		const day = +dateArray[2];
		const month = +dateArray[1];
		const year = +dateArray[0];

        switch (toFormat) {
	        case 'mm/dd/yyyy':
	        	return `${month}${toSep}${day}${toSep}${year}`
	        case 'dd/mm/yyyy':
	        	return `${day}${toSep}${month}${toSep}${year}`
	        default:
	        	return `${month}${toSep}${day}${toSep}${year}`
        }

    }
    static getCategoryLogObject(fieldReport, categoryId, contentId, topic?) {
    	let foundCategoryLog;
		fieldReport.notes.forEach(note =>{
			if(note.description == categoryId){
				if(note.content.length){
					if(topic){
						if(note.content[0].content[topic]){
							foundCategoryLog = note.content[0].content[topic][contentId];																		
						}
					}else{
						foundCategoryLog = note.content[0].content[contentId];											
					}
				}
			}
		})
		return foundCategoryLog;    	

    }
    static getCategoryObject(fieldReport, categoryId) {
    	let foundCategory;
		fieldReport.notes.forEach(note =>{
			if(note.description == categoryId){
				foundCategory = note;											
			}
		})
		return foundCategory;    	

    }
    static formatReportDate(fmt, dateStr, seperator?) {
    	if(!seperator){
    		seperator = '-'
    	}
    	if(dateStr.date){
    		//convert into selected date
			return `${dateStr.date.year}-${Util.pad(dateStr.date.month)}-${Util.pad(dateStr.date.day)}`;    	
    	}

		const dt = dateStr.split(seperator);
		if(fmt == 'mm/dd/yyyy' || fmt == 'mm-dd-yyyy'){
			return `${dt[2]}-${dt[0]}-${dt[1]}`;    	
		}
		if(fmt == 'dd/mm/yyyy' || fmt == 'dd-mm-yyyy'){
			return `${dt[2]}-${dt[1]}-${dt[0]}`;    	
		}
		return dateStr;

    }
    static stringifyContent(report) {
		const fieldReport = _.cloneDeep(report);
		fieldReport.notes.forEach(note =>{
			if(note.content.length){
				note.content[0].content = JSON.stringify(note.content[0].content);
			}
		})
		return fieldReport;    	

    }
    static stringifyCategoryContent(category) {
		const note = _.cloneDeep(category);
			if(note.content.length){
				note.content[0].content = JSON.stringify(note.content[0].content);
			}
		return note;    	
    }
    static parseContent(report) {
		const fieldReport = _.cloneDeep(report);
		fieldReport.notes.forEach(note =>{
			if(note.content.length){
				note.content[0].content = JSON.parse(note.content[0].content);
			}
		})
		return fieldReport;    	

    }
    static parseCategoryContent(category) {
		const note = _.cloneDeep(category);
			if(note.content.length){
				note.content[0].content = JSON.parse(note.content[0].content);
			}
		return note;    	

    }
    static insertCategoryLogObject(fieldReport, categoryId, logId, data, topic?) {
    	let foundCategory = {};
		fieldReport.notes.forEach(note =>{
			if(note.description == categoryId){
				if(note.content.length){
					if(topic){
						if( note.content[0].content[topic] ){
							note.content[0].content[topic][logId] = data;						
						}else{
							note.content[0].content[topic] = {};
							note.content[0].content[topic][logId] = data;
						}	
					}else{
						note.content[0].content[logId] = data;	
					}				
				}else{
					if(topic){
						note.content[0] = {content: {}};
						note.content[0].content[topic] = {};
						note.content[0].content[topic][logId] = data;
					}else{
						const newCategory = note.content[0] = {content: {}};
						newCategory.content[logId] = data;
					}
				}
			}
		})
		return fieldReport;    	

    }
    static replaceCategoryObject(fieldReport, categoryId, data) {
    	let foundCategory = {};
		fieldReport.notes.forEach(note =>{
			if(note.description == categoryId){
				note = data;	
			}
		})
		return fieldReport;    	

    }
    static removeCategoryLogObject(fieldReport, categoryId, logId, topic?) {
		fieldReport.notes.forEach(note =>{
			if(note.description == categoryId){
				if(note.content.length){
					if(topic){
						if( note.content[0].content[topic] && note.content[0].content[topic][logId] ){
							delete note.content[0].content[topic][logId];						
							if(!note.content[0].content[topic].length){
								note.content[0][topic] = []			
							}			
						}
					}else{
						if( note.content[0].content[logId] ){
							delete note.content[0].content[logId];
							if(!note.content[0].content.length){
								delete note.content.content
								note.content.content = null			
							}			
						}
					}				
				}
			}
		})
		return fieldReport;    	

    }

    static getFieldMenuChildren(categories) {
    	const fieldMenu = [] 
		categories.forEach(category =>{
			const path = ['/project-management/field-report-detail/notes']
			const data = {
				menu: {
    				title: category.title,
    				icon: category.icon,
    				iconTitle: 'New',
					header: true,
    				expanded: false,
    				componentType: 'notes',
   					id: category.id,
    				order: category.order || 0,					
				}
			}
			fieldMenu.push({path: path, data: data})
		})
		return fieldMenu;    	

    }
    static convertCategoriesToFieldReportNoteHeader(categories) {
    	// the fieldreport does not support the category model, so format the categories into 
    	// what the backend is expecting
    	const fieldReportCategories = [] 
		categories.forEach(category =>{
			const categoryObj = {
				category: category.title,
				description: category.id,
				content: [],
			}
			fieldReportCategories.push(categoryObj)
		})
		return fieldReportCategories;    	

    }
 	static getAppDetails() {
		//admin.dexchadev.com/mech-co"
		//hack to find the app
		const hostArray = window.location.host.split('.');
		let app = hostArray[0];
		if(app.includes('local')){
			app = 'dev'
		}
		let domain = null
		if(hostArray.length > 1){
			domain = hostArray[1]
		}
		if(domain == 'dexchadev' && !app.includes('qa')){
			app = app+'dev'
		}
		return Consts[app];
	};
   
	static attributeCount(log){
		let count = 0
		for (const key in log) {
			// skip loop if the property is from prototype
			if (!log.hasOwnProperty(key)) continue;
			if(log[key] && log[key] != ""){
				count++
			}
		}
		return count;
	}
	static toDecimal(numberArray) {
       	return numberArray[0].numerator + numberArray[1].numerator /
           (60 * numberArray[1].denominator) + numberArray[2].numerator / (3600 * numberArray[2].denominator);
   	}
	/**
	 * Get the longitude from the image EXIF GPS data.
	 *
	 * @return {number|boolean} Return false if GPS data is not available
	 */
	static getLongitude(longitude, longitudeRef) {
		if (!longitude) {
			return false;
		}

		if (longitudeRef === 'W') {
			longitude = longitude * -1;
		}

		return longitude;
	};


	/**
	 * Get the latitude from the image EXIF GPS data.
	 *
	 * @return {number|boolean} Return false if GPS data is not available
	 */
	static getLatitude(latitude, latitudeRef) {
		if (!latitude) {
			return false;
		}

		if (latitudeRef === 'S') {
			latitude = latitude * -1;
		}

		return latitude;
	};


	/**
	 * Get a Google Maps URL for the image EXIF GPS coordinates.
	 *
	 * @param {string|number} latitude
	 * @param {string|number} longitude
	 * @param {string} protocol Either 'http:', 'https:' or empty for a protocol relative URL
	 * @param {string|number} zoom Zoom level for the map (1-20), defaults to 10
	 * @param {string} type Map type, either 'm' for the normal map (default), 'k' for satellite, 'h' for hybrid, 'p' for terrain or 'e' for Google Earth
	 * @return {string|boolean} Google Maps URL for the location, or false if no data points available
	 */
	static getGoogleMapsUrl(latitude, longitude, protocol, zoom, type) {

		if (!protocol) {
			protocol = '';
		}

		if (!zoom) {
			zoom = '10';
		}

		if (!type) {
			type = 'm';
		}

		if (!latitude || !longitude) {
			return;
		}

		return protocol + '//maps.google.com/maps?z=' + zoom + '&t=' + type + '&q=loc:' + latitude + '+' + longitude;
	};

	static militaryTimeToStandard(time) {
		if (!time) {
			return false;
		}

		time = time.split(':'); // convert to array

		// fetch
		const hours = Number(time[0]);
		const minutes = Number(time[1]);
		const seconds = Number(time[2]);

		// calculate
		let timeValue;

		if (hours > 0 && hours <= 12) {
  			timeValue= "" + hours;
		} else if (hours > 12) {
  			timeValue= "" + (hours - 12);
		} else if (hours == 0) {
  			timeValue= "12";
		}
 
		timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
//		timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
		timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

		// show
		return timeValue;	
	}



}

