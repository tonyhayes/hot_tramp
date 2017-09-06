import { Util } from './util';
import { Consts } from './consts';

describe('Util binary search', function() {
	let users = [];
	let found = -1;







	beforeEach(function() {
		users = ['aaa', 'aab', 'abb', 'bbb', 'bbc', 'bcc', 'ccc'];
	});

	it('found should be -8 using user defined comparator', function() {  // i.e. -(found+1) === 7 aka insert position
		found = Util.binarySearch(users, 'zzz', function(a,b) {
			return a.localeCompare(b);
		});
		expect(found).toEqual(-8);
	});

	it('found should be 1 using user defined comparator', function() {  // i.e. insert position
		found = Util.binarySearch(users, 'aab', function(a,b) {
			return a.localeCompare(b);
		});
		expect(found).toEqual(1);
	});
	it('found should be -8 using built in string comparator', function() {  // i.e. -(found+1) === 7 aka insert position
		found = Util.binarySearch(users, 'zzz', Consts.STRING_COMPARATOR_FUNCTION);
		expect(found).toEqual(-8);
	});

	it('found should be 1 using built in string  comparator', function() {  // i.e. insert position
		found = Util.binarySearch(users, 'aab', Consts.STRING_COMPARATOR_FUNCTION);
		expect(found).toEqual(1);
	});
});  
describe('Util remove Element', function() {
	let users = [];
	let found = -1;

	beforeEach(function() {
		users = ['aaa', 'aab', 'abb', 'bbb', 'bbc', 'bcc', 'ccc'];
	});

	it('found should be 6', function() { 
		found = Util.removeElement(users, 'ccc');
		expect(users.length).toEqual(6);
		expect(found.toString()).toEqual('ccc');
	});

	it('found should be 7', function() {  
		found = Util.removeElement(users, 'zzz');
		expect(users.length).toEqual(7);
		expect(found).toEqual(undefined);
	});
});
describe('Util clamp', function() {
	let clamp = -1;


	it('clamp should be 0', function() { 
		clamp = Util.clamp(-5, 0, 10);
		expect(clamp).toEqual(0);
	});

	it('clamp should be 7', function() { 
		clamp = Util.clamp(7, 1, 10);
		expect(clamp).toEqual(7);
	});
	it('clamp should be 8', function() { 
		clamp = Util.clamp(8, 1, 10);
		expect(clamp).toEqual(8);
	});
	it('clamp should be 10', function() { 
		clamp = Util.clamp(10, 1, 10);
		expect(clamp).toEqual(10);
	});
	it('clamp should be 10', function() { 
		clamp = Util.clamp(11, 1, 10);
		expect(clamp).toEqual(10);
	});
}); 

describe('Util insertIntoUniqueSortedArray', function() {
	let arr = [];
	it('should insert into an array', function() {
		Util.insertIntoUniqueSortedArray(arr, 6, null);  
		expect(arr.toString()).toEqual('6');
	});
	it('should insert into an array before the last element added', function() {
		Util.insertIntoUniqueSortedArray(arr, 2, null);  
		expect(arr.toString()).toEqual('2,6');
	});
	it('should insert into an array after the last element', function() {
		Util.insertIntoUniqueSortedArray(arr, 12, null);  
		expect(arr.toString()).toEqual('2,6,12');
	});
	it('should not insert into an array a duplicate', function() {
		Util.insertIntoUniqueSortedArray(arr, 12, null);  
		expect(arr.toString()).toEqual('2,6,12');
	});
});

describe('Util insertIntoSortedArray', function() {      
	let arr = [];
	it('should insert into an array', function() {
		Util.insertIntoSortedArray(arr, 6, null);  
		expect(arr.toString()).toEqual('6');
	});
	it('should insert into an array before the last element added', function() {
		Util.insertIntoSortedArray(arr, 2, null);  
		expect(arr.toString()).toEqual('2,6');
	});
	it('should insert into an array after the last element', function() {
		Util.insertIntoSortedArray(arr, 12, null);  
		expect(arr.toString()).toEqual('2,6,12');
	});
	it('should insert into an array a duplicate', function() {
		Util.insertIntoSortedArray(arr, 12, null);  
		expect(arr.toString()).toEqual('2,6,12,12');
	});
});  
describe('Util getFromSortedArray', function() {
	let blockIdList = [1,2,15,54];

	it('should getFromSortedArray', function() {
		let found = Util.getFromSortedArray(blockIdList, 15, null);  
		expect(found).toEqual(15);
	});
	it('should not find in removeFromSortedArray', function() {
		let found = Util.getFromSortedArray(blockIdList, 46, null);  
		expect(found).toEqual(undefined);
	});
});  

describe('Util removeFromSortedArray', function() {
	let blockIdList = [1,2,15,54];

	it('should removeFromSortedArray', function() {
		Util.removeFromUnsortedArray(blockIdList, 2);  
		expect(blockIdList.toString()).toEqual('1,15,54');
	});
	it('should not find in removeFromSortedArray', function() {
		Util.removeFromUnsortedArray(blockIdList, 46);  
		expect(blockIdList.toString()).toEqual('1,15,54');
	});
});  


describe('Util removeFromUnsortedArray', function() {
	let blockIdList = [1,2,15,54,23,3,4,5,6];

	it('should removeFromUnsortedArray', function() {
		Util.removeFromUnsortedArray(blockIdList, 6);  
		expect(blockIdList.toString()).toEqual('1,2,15,54,23,3,4,5');
	});
	it('should not find in removeFromUnsortedArray', function() {
		Util.removeFromUnsortedArray(blockIdList, 46);  
		expect(blockIdList.toString()).toEqual('1,2,15,54,23,3,4,5');
	});
});  

describe('Util list of users - no duplicates', function() {
	let users = [];
	let sorted = [];

	beforeEach(function() {
		users = ['jack', 'igor', 'jeff'];
		sorted = Util.removeDuplicateElements(users);
	});

	it('users should be 3', function() {
		expect(sorted.length).toEqual(3);
	});

	it('return users with no changes or ordering', function() {
		expect(sorted[0]).toEqual('jack');
		expect(sorted[1]).toEqual('igor');
		expect(sorted[2]).toEqual('jeff');
	});
});  

describe('Util list of users - remove duplicates', function() {
		let users = [];
		let sorted = [];

	beforeEach(function() {
		users = ['jack', 'igor', 'jeff', 'igor', 'jeff', 'jack', 'igor', 'jeff'];
		sorted = Util.removeDuplicateElements(users);
	});

	it('users should be 3', function() {
		expect(sorted.length).toEqual(3);
	});

	it('return users with no changes or ordering, but without the duplicates', function() {
		expect(sorted[0]).toEqual('jack');
		expect(sorted[1]).toEqual('igor');
		expect(sorted[2]).toEqual('jeff');
	});
});
describe('Util list of users - no duplicates', function() {
	let users = [];
	let boozers = [];
	let sorted = [];

	beforeEach(function() {
		users = ['jack', 'igor', 'jeff'];
		boozers = ['jack1', 'igor1', 'jeff1'];
		sorted = Util.mergeRemoveDuplicateElements(users.concat(boozers));
	});

	it('combined should be 6', function() {
		expect(sorted.length).toEqual(6);
	});

	it('return combined with no changes or ordering', function() {
		expect(sorted[0]).toEqual('jack');
		expect(sorted[1]).toEqual('igor');
		expect(sorted[2]).toEqual('jeff');
	});
});  

describe('Util list of users and boozers - remove duplicates', function() {
	let users = [];
	let sorted = [];
	let boozers = [];

	beforeEach(function() {
		users = ['jack', 'igor', 'jeff', 'igor', 'jeff', 'jack', 'igor', 'jeff'];
		boozers = ['jack', 'igor', 'jeff', 'igor', 'jeff', 'jack', 'igor', 'jeff'];
		sorted = Util.mergeRemoveDuplicateElements(users.concat(boozers));
	});

	it('users should be 3', function() {
		expect(sorted.length).toEqual(3);
	});

	it('return users with no changes or ordering, but without the duplicates', function() {
		expect(sorted[0]).toEqual('jack');
		expect(sorted[1]).toEqual('igor');
		expect(sorted[2]).toEqual('jeff');
	});
});
describe('Util array as map', function() {
	let spreadData = [1,2,3,4,5]
	let am = null;
	beforeEach(function() {
		am = Util.arrayAsMap(spreadData);

	});

	it('am should be 5', function() {
		expect(am.size).toEqual(5);
	});
	it('am should be 1, 2', function() {
		expect(am.has(1)).toEqual(true);
		expect(am.has(2)).toEqual(true);
	});
	it('am value should be original array index', function() {
		expect(am.get(1)).toEqual(0);
		expect(am.get(2)).toEqual(1);
		expect(am.get(3)).toEqual(2);
		expect(am.get(4)).toEqual(3);
		expect(am.get(5)).toEqual(4);
	});
});
describe('Util object As Map', function() {
	let layoutVersionData = 
		{
		  'V1': ['M1','M2','M3','M4','M5'],
		  'V2': ['M6','M7','M8','M9','M10']
		};
	let am = new Map();

	beforeEach(function() {
		am = Util.objectAsMap(layoutVersionData, null);
	});

	it('am should be V1,V2', function() {
		expect(am.has('V1')).toEqual(true);
		expect(am.has('V2')).toEqual(true);
	});
	it('am should be 2', function() {
		expect(am.size).toEqual(2);
	});

	it('am value should be found', function() {
		expect(am.get('V1').length).toEqual(5);
		expect(am.get('V1')[0]).toEqual('M1');
		expect(am.get('V2')[2]).toEqual('M8');
	});
});
describe('Util camelize', function() {
	it('camelize tony is in the house', function() {
		const camel = Util.camelize('camelize tony is in the house');
		expect(camel).toEqual('camelizeTonyIsInTheHouse');

	});
	it('Camelize Tony Is In The house', function() {
		const camel = Util.camelize('Camelize Tony Is In The house');
		expect(camel).toEqual('camelizeTonyIsInTheHouse');

	});
	it('camelize tony-is-in-the-house', function() {
		const camel = Util.camelize('camelize tony-is-in-the-house');
		expect(camel).toEqual('camelizeTonyIsInTheHouse');

	});
	it('camelize tony_is_in_the_house', function() {
		const camel = Util.camelize('camelize tony_is_in_the_house');
		expect(camel).toEqual('camelizeTonyIsInTheHouse');

	});
});
describe('Util jenkinsHash', function() {
	it('jenkinsHash using 1 as key and expecting return value of 9', function() {
		let element = Util.jenkinsHash('1', 20);
		expect(element).toEqual(9);
	});
	it('jenkinsHash using 1 as key and expecting return value of 9 - again', function() {
		let element = Util.jenkinsHash('1', 20);
		expect(element).toEqual(9);
	});
	it('jenkinsHash using 277 as key and expecting return value of 7', function() {
		let element = Util.jenkinsHash('277', 20);
		expect(element).toEqual(7);
	});
	it('jenkinsHash using 277 as key and expecting return value of 7 - again', function() {
		let element = Util.jenkinsHash('277', 20);
		expect(element).toEqual(7);
	});
	it('jenkinsHash using 5 as key and expecting return value of 7', function() {
		let element = Util.jenkinsHash('5', 20);
		expect(element).toEqual(7);
	});
	it('jenkinsHash using 5 as key and expecting return value of 7 - again', function() {
		let element = Util.jenkinsHash('5', 20);
		expect(element).toEqual(7);
	});
	it('jenkinsHash using 2 as key and expecting return value of 10', function() {
		let element = Util.jenkinsHash('2', 20);
		expect(element).toEqual(10);
	});
	it('jenkinsHash using 3 as key and expecting return value of 11 - again', function() {
		let element = Util.jenkinsHash('3', 20);
		expect(element).toEqual(11);
	});
	it('jenkinsHash using 4 as key and expecting return value of 5', function() {
		let element = Util.jenkinsHash('4', 20);
		expect(element).toEqual(5);
	});
	it('jenkinsHash using 6 as key and expecting return value of 8', function() {
		let element = Util.jenkinsHash('6', 20);
		expect(element).toEqual(8);
	});
	it('jenkinsHash using 7 as key and expecting return value of 16', function() {
		let element = Util.jenkinsHash('7', 20);
		expect(element).toEqual(16);
	});
	it('jenkinsHash using 8 as key and expecting return value of 8', function() {
		let element = Util.jenkinsHash('8', 20);
		expect(element).toEqual(8);
	});
	it('jenkinsHash using 9 as key and expecting return value of 1', function() {
		let element = Util.jenkinsHash('9', 20);
		expect(element).toEqual(1);
	});
	it('jenkinsHash using 10 as key and expecting return value of 5', function() {
		let element = Util.jenkinsHash('10', 20);
		expect(element).toEqual(5);
	});
	it('jenkinsHash using 11 as key and expecting return value of 17', function() {
		let element = Util.jenkinsHash('11', 20);
		expect(element).toEqual(17);
	});
	it('jenkinsHash using 12 as key and expecting return value of 10', function() {
		let element = Util.jenkinsHash('12', 20);
		expect(element).toEqual(10);
	});
	it('jenkinsHash using 13 as key and expecting return value of 9', function() {
		let element = Util.jenkinsHash('13', 20);
		expect(element).toEqual(9);
	});
	it('jenkinsHash using 14 as key and expecting return value of 3', function() {
		let element = Util.jenkinsHash('14', 20);
		expect(element).toEqual(3);
	});
	it('jenkinsHash using 15 as key and expecting return value of 11', function() {
		let element = Util.jenkinsHash('15', 20);
		expect(element).toEqual(11);
	});
	it('jenkinsHash using 16 as key and expecting return value of 17', function() {
		let element = Util.jenkinsHash('16', 20);
		expect(element).toEqual(17);
	});
	it('jenkinsHash using 17 as key and expecting return value of 2', function() {
		let element = Util.jenkinsHash('17', 20);
		expect(element).toEqual(2);
	});
	it('jenkinsHash using 18 as key and expecting return value of 2', function() {
		let element = Util.jenkinsHash('18', 20);
		expect(element).toEqual(2);
	});
	it('jenkinsHash using 19 as key and expecting return value of 5', function() {
		let element = Util.jenkinsHash('19', 20);
		expect(element).toEqual(5);
	});
	it('jenkinsHash using 20 as key and expecting return value of 19', function() {
		let element = Util.jenkinsHash('20', 20);
		expect(element).toEqual(19);
	});
});
describe('Util evaluateTemplateStringAgainstDictionary', function() {
	it('evaluateTemplateStringAgainstDictionary code: 123, name: Apparel', function() {
		const str = Util.evaluateTemplateStringAgainstDictionary("${code} - ${name}", { code: '123', name: 'Apparel' });
		expect(str).toEqual('123 - Apparel');
	});
	it('evaluateTemplateStringAgainstDictionary code: 123, name: Apparel', function() {
		const str = Util.evaluateTemplateStringAgainstDictionary("*${code}*-*${name}*", { code: '123', name: 'Apparel' });
		expect(str).toEqual('*123*-*Apparel*');
	});
});
describe('Util itemMask', function() {
	it('itemMask  123.14 should equal 123', function() {
		const str = Util.itemMask("123.14");
		expect(str).toEqual('123');
	});
	it('itemMask  123.Apparel should equal 123', function() {
		const str = Util.itemMask("123.Apparel");
		expect(str).toEqual('123');
	});
});
describe('Util isDoubleEqual', function() {
	it('isDoubleEqual  123.14 should not equal 123', function() {
		const bool = Util.isDoubleEqual(123.14, 123);
		expect(bool).toEqual(false);
	});
	it('isDoubleEqual  123 should equal 123', function() {
		const bool = Util.isDoubleEqual(123, 123);
		expect(bool).toEqual(true);
	});
});
describe('Util isString', function() {
	it('isString  123.14 should be number', function() {
		const bool = Util.isString(123.14);
		expect(bool).toEqual(false);
	});
	it('isString  123Advance should not equal number', function() {
		const bool = Util.isString('123advance');
		expect(bool).toEqual(true);
	});
});
describe('Util isNumber', function() {
	it('isNumber  123 should be  number', function() {
		const bool = Util.isNumber(123);
		expect(bool).toEqual(true);
	});
	it('isNumber  123.14 should not be number', function() {
		const bool = Util.isNumber(123.14);
		expect(bool).toEqual(true);
	});
	it('isNumber  123Advance should not equal number', function() {
		const bool = Util.isNumber('123advance');
		expect(bool).toEqual(false);
	});
});
describe('Util areObjectsEqual', function() {
	var a = {a: 'text', b:[0,1]};
	var b = {a: 'text', b:[0,1]};
	var c = {a: 'text', b: 0};
	var d = {a: 'text', b: false};
	var e = {a: 'text', b:[1,0]};
	var f = {a: 'text', b:[1,0], f: function(){ this.f = this.b; }};
	var g = {a: 'text', b:[1,0], f: function(){ this.f = this.b; }};
	var h = {a: 'text', b:[1,0], f: function(){ this.a = this.b; }};
	var i = {
		a: 'text',
		c: {
			b: [1, 0],
			f: function(){
				this.a = this.b;
			}
		}
	};
	var j = {
		a: 'text',
		c: {
			b: [1, 0],
			f: function(){
				this.a = this.b;
			}
		}
	};
	var k = {a: 'text', b: null};
	var l = {a: 'text', b: undefined};

	it('areObjectsEqual a should = b', function() {
		const bool = Util.areObjectsEqual(a,b);
		expect(bool).toEqual(true);
	});
	it('areObjectsEqual a should != c', function() {
		const bool = Util.areObjectsEqual(a,c);
		expect(bool).toEqual(false);
	});
	it('areObjectsEqual c should != d', function() {
		const bool = Util.areObjectsEqual(c,d);
		expect(bool).toEqual(false);
	});
	it('areObjectsEqual a should != e', function() {
		const bool = Util.areObjectsEqual(a,e);
		expect(bool).toEqual(false);
	});
	it('areObjectsEqual f should = g', function() {
		const bool = Util.areObjectsEqual(f,g);
		expect(bool).toEqual(true);
	});
	it('areObjectsEqual h should != g', function() {
		const bool = Util.areObjectsEqual(h,g);
		expect(bool).toEqual(false);
	});
	it('areObjectsEqual i should = j', function() {
		const bool = Util.areObjectsEqual(i,j);
		expect(bool).toEqual(true);
	});
	it('areObjectsEqual d should != k', function() {
		const bool = Util.areObjectsEqual(d,k);
		expect(bool).toEqual(false);
	});
	it('areObjectsEqual k should != l', function() {
		const bool = Util.areObjectsEqual(k,l);
		expect(bool).toEqual(false);
	});
});
describe('Util isDefined', function() {
	it('isDefined aaa should be defined', function() {
		var aaa = 'qqq'
		const bool = Util.isDefined(aaa);
		expect(bool).toEqual(true);
	});
	it('isDefined bbb should not be defined', function() {
		const bool = Util.isDefined(bbb);
		var bbb = 'ccc';
		expect(bool).toEqual(false);
	});
});
describe('Util isObjectEmpty', function() {
	it('isObjectEmpty("") true', function() {
		const bool = Util.isObjectEmpty("");
		expect(bool).toEqual(true);
	});
	it('isObjectEmpty([]) true', function() {
		const bool = Util.isObjectEmpty([]);
		expect(bool).toEqual(true);
	});
	it('isObjectEmpty({}) true', function() {
		const bool = Util.isObjectEmpty({});
		expect(bool).toEqual(true);
	});
	it('isObjectEmpty({length: 0, custom_property: []}) true', function() {
		const bool = Util.isObjectEmpty({length: 0, custom_property: []});
		expect(bool).toEqual(true);
	});
	it('isObjectEmpty("hello") false', function() {
		const bool = Util.isObjectEmpty("hello");
		expect(bool).toEqual(false);
	});
	it('isObjectEmpty([1,2,3]) false', function() {
		const bool = Util.isObjectEmpty([1,2,3]);
		expect(bool).toEqual(false);
	});
	it('isObjectEmpty({test: 1}) false', function() {
		const bool = Util.isObjectEmpty({test: 1});
		expect(bool).toEqual(false);
	});
	it('isObjectEmpty({length: 3, custom_property: [1,2,3]}) false', function() {
		const bool = Util.isObjectEmpty({length: 3, custom_property: [1,2,3]});
		expect(bool).toEqual(false);
	});
});
describe('Util isInvalidTenantName', function() {
	it('isInvalidTenantName aaa should be false', function() {
		var aaa = 'qqq'
		const bool = Util.isInvalidTenantName(aaa);
		expect(bool).toEqual(false);
	});
	it('isInvalidTenantName logged-out should be true', function() {
		const bool = Util.isInvalidTenantName('logged-out');
		expect(bool).toEqual(true);
	});
	it('isInvalidTenantName user-administration should be true', function() {
		const bool = Util.isInvalidTenantName('user-administration');
		expect(bool).toEqual(true);
	});
	it('isInvalidTenantName project-management should be true', function() {
		const bool = Util.isInvalidTenantName('project-management');
		expect(bool).toEqual(true);
	});
});
describe('Util removeDomNuisances', function() {
	it('removeDomNuisances return undefined', function() {
		expect(Util.removeDomNuisances()).toEqual(undefined);
	});
});
describe('Util isEmail', function() {
	it('isEmail aaa@bbb.com should be valid', function() {
		var email = 'aaa@bbb.com'
		const bool = Util.isEmail(email);
		expect(bool).toEqual(true);
	});
	it('isEmail aaa-bbb.com should not be valid', function() {
		var email = 'aaa-bbb.com'
		const bool = Util.isEmail(email);
		expect(bool).toEqual(false);
	});
	it('isEmail aaa-bbb@ should not be valid', function() {
		var email = 'aaa-bbb@'
		const bool = Util.isEmail(email);
		expect(bool).toEqual(false);
	});
	it('isEmail aaa-bbb@. should be valid - sadly', function() {
		var email = 'aaa-bbb@.'
		const bool = Util.isEmail(email);
		expect(bool).toEqual(true);
	});
	it('isEmail aaa bbb@s.com should be valid - sadly, i think', function() {
		var email = 'aaa bbb@s.com'
		const bool = Util.isEmail(email);
		expect(bool).toEqual(true);
	});
});
describe('Util isObject', function() {
	it('isObject aaa should be true', function() {
		var aaa = {id:'qqq'}
		const bool = Util.isObject(aaa);
		expect(bool).toEqual(true);
	});
	it('isObject bbb should not be true', function() {
		const bool = Util.isObject(bbb);
		var bbb = {id:'ccc'};
		expect(bool).toEqual(false);
	});
	it('isObject 123 should not be true', function() {
		const bool = Util.isObject(123);
		expect(bool).toEqual(false);
	});
	it('isObject tony should not be true', function() {
		const bool = Util.isObject('tony');
		expect(bool).toEqual(false);
	});
});
describe('Util pad', function() {
	it('pad 1 should be 01', function() {
		expect(Util.pad(1)).toEqual('01');
	});
	it('pad 10 should be 10', function() {
		expect(Util.pad(10)).toEqual(10);
	});
});
describe('Util getDate +-10', function() {
	it('getDate +10', function() {
		const n = Util.getDate(10);
		expect(n['year']).not.toBeLessThan(2017);
	});
	it('getDate -10', function() {
		const n = Util.getDate(10);
		expect(n['year']).not.toBeLessThan(2017);
	});
});
describe('Util formatDateObject', function() {
	it('formatDateObject 1', function() {
		expect(Util.formatDateObject('2017-15-5')).toEqual({year: 2017, month: 15, day: 5});
	});
	it('formatDateObject null', function() {
		expect(Util.formatDateObject()).toEqual(null);
	});
});

describe('Util dynamic sort', function() {

	const people = [
		{name: "Name", last: "LAST"},
		{name:"AAA", last:"ZZZ"},
		{name: "Name", last: "AAA"}
	];
	it('dynamicSort people - asc', function() {
		people.sort(Util.dynamicSort('name'));
		expect(people[0].name).toEqual('AAA');
		expect(people[0].last).toEqual('ZZZ');
		expect(people[1].name).toEqual('Name');
		expect(people[1].last).toEqual('LAST');
		expect(people[2].name).toEqual('Name');
		expect(people[2].last).toEqual('AAA');

	});
	it('dynamicSort people - desc', function() {
		people.sort(Util.dynamicSort('-name'));
		expect(people[2].name).toEqual('AAA');
		expect(people[2].last).toEqual('ZZZ');
		expect(people[0].name).toEqual('Name');
		expect(people[0].last).toEqual('LAST');
		expect(people[1].name).toEqual('Name');
		expect(people[1].last).toEqual('AAA');

	});
});
describe('Util getCategoryLogObject', function() {

	const fieldReport = {
  	"actionee": "584af775e808bcf75f0603b6 jbuhner@dexchadev.com",
  	"notes": [
		{
	  		"category": "weather",
	  		"description": "Weather",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.931",
	  		"lastUpdated": "2017-05-02T18:34:45.931",
	  		"fieldReportEntryId": "77a2998e-fa6f-49ef-a4ab-4d7d92e9450b",
	  		"rejection": null
		},
		{
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [
	  			{
	  				content: {
	  					12: {
	  						hello:'hi'
	  					}
	  				}
	  			}
	  		],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		},
		{
	  		"category": "visitor",
	  		"description": "Visitor",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "1ca906fd-bf4b-4905-ae23-cca8bef6c3ad",
	  		"rejection": null
		},
		{
	  		"category": "notes",
	  		"description": "Work Completed",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
	  		"rejection": null
		},
		{
	  		"category": "photo",
	  		"description": "Photo",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "103fb3c3-1331-4bc9-9189-69c06e5127ec",
	  		"rejection": null
		},
		{
	  		"category": "signature",
	  		"description": "Signature",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "af28c475-7eb1-43e5-99df-8865a2b4d9ec",
	  		"rejection": null
		}
  	],
  	"id": "0913a059-fff1-4ca5-895d-e5ef24a160e0",
  	"tenant": "mech-co",
  	"jobCode": "PLM_city",
  	"forDay": "2017-05-02",
  	"createdDay": "2017-05-02T18:34:45.935",
  	"originator": "jbuhner@dexchadev.com",
  	"status": "Open"
}						


	it('getCategoryLogObject - null return', function() {
		const obj = Util.getCategoryLogObject(fieldReport, 'Weather', 12);
		expect(obj).toEqual(undefined);

	});
	it('getCategoryLogObject - good return', function() {
		const obj = Util.getCategoryLogObject(fieldReport, 'Crew', 12);
		expect(obj).toEqual({hello:'hi'});

	});
});
describe('Util getCategoryObject', function() {

	const fieldReport = {
  	"actionee": "584af775e808bcf75f0603b6 jbuhner@dexchadev.com",
  	"notes": [
		{
	  		"category": "weather",
	  		"description": "Weather",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.931",
	  		"lastUpdated": "2017-05-02T18:34:45.931",
	  		"fieldReportEntryId": "77a2998e-fa6f-49ef-a4ab-4d7d92e9450b",
	  		"rejection": null
		},
		{
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [
	  			{
	  				content: {
	  					12: {
	  						hello:'hi'
	  					}
	  				}
	  			}
	  		],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		},
		{
	  		"category": "visitor",
	  		"description": "Visitor",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "1ca906fd-bf4b-4905-ae23-cca8bef6c3ad",
	  		"rejection": null
		},
		{
	  		"category": "notes",
	  		"description": "Work Completed",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
	  		"rejection": null
		},
		{
	  		"category": "photo",
	  		"description": "Photo",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "103fb3c3-1331-4bc9-9189-69c06e5127ec",
	  		"rejection": null
		},
		{
	  		"category": "signature",
	  		"description": "Signature",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "af28c475-7eb1-43e5-99df-8865a2b4d9ec",
	  		"rejection": null
		}
  	],
  	"id": "0913a059-fff1-4ca5-895d-e5ef24a160e0",
  	"tenant": "mech-co",
  	"jobCode": "PLM_city",
  	"forDay": "2017-05-02",
  	"createdDay": "2017-05-02T18:34:45.935",
  	"originator": "jbuhner@dexchadev.com",
  	"status": "Open"
}						


	it('getCategoryObject - null return', function() {
		const obj = Util.getCategoryObject(fieldReport, 'Weathers');
		expect(obj).toEqual(undefined);

	});
	it('getCategoryObject - good return', function() {
		const obj = Util.getCategoryObject(fieldReport, 'Crew');
		expect(obj).toEqual(fieldReport.notes[1]);

	});
});
describe('Util insertCategoryLogObject', function() {

	const fieldReport = {
  	"actionee": "584af775e808bcf75f0603b6 jbuhner@dexchadev.com",
  	"notes": [
		{
	  		"category": "weather",
	  		"description": "Weather",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.931",
	  		"lastUpdated": "2017-05-02T18:34:45.931",
	  		"fieldReportEntryId": "77a2998e-fa6f-49ef-a4ab-4d7d92e9450b",
	  		"rejection": null
		},
		{
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [{content: {12: {hello:'hi'}}}],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		},
		{
	  		"category": "visitor",
	  		"description": "Visitor",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "1ca906fd-bf4b-4905-ae23-cca8bef6c3ad",
	  		"rejection": null
		},
		{
	  		"category": "notes",
	  		"description": "Work Completed",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
	  		"rejection": null
		},
		{
	  		"category": "photo",
	  		"description": "Photo",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "103fb3c3-1331-4bc9-9189-69c06e5127ec",
	  		"rejection": null
		},
		{
	  		"category": "signature",
	  		"description": "Signature",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "af28c475-7eb1-43e5-99df-8865a2b4d9ec",
	  		"rejection": null
		}
  	],
  	"id": "0913a059-fff1-4ca5-895d-e5ef24a160e0",
  	"tenant": "mech-co",
  	"jobCode": "PLM_city",
  	"forDay": "2017-05-02",
  	"createdDay": "2017-05-02T18:34:45.935",
  	"originator": "jbuhner@dexchadev.com",
  	"status": "Open"
}						


	it('insertCategoryLogObject - 1st return', function() {
		const obj = Util.insertCategoryLogObject(fieldReport, 'Weather', 12, {hello:'hi'});
		expect(obj.notes[0].content.length).toEqual(1);

	});
	it('insertCategoryLogObject - 2nd return', function() {
		const obj = Util.insertCategoryLogObject(fieldReport, 'Weather', 12, {hello:'hi'});
		expect(obj.notes[0].content.length).toEqual(1);

	});
	it('insertCategoryLogObject - topic', function() {
		const obj = Util.insertCategoryLogObject(fieldReport, 'Work Completed', 12, {hello:'hi'}, 'tony');
		expect(obj.notes[3].content[0].content['tony']['12']).toEqual( { hello: 'hi' });

	});
	it('insertCategoryLogObject - topic - update', function() {
		const obj = Util.insertCategoryLogObject(fieldReport, 'Work Completed', 12, {hello:'hiya'}, 'tony');
		expect(obj.notes[3].content[0].content['tony']['12']).toEqual({ hello: 'hiya' });

	});
	it('getCategoryLogObject - topic', function() {
		const obj = Util.getCategoryLogObject(fieldReport, 'Work Completed', 12, 'tony');
		expect(obj).toEqual({hello:'hiya'});

	});
	it('getCategoryLogObject - bad topic', function() {
		const obj = Util.getCategoryLogObject(fieldReport, 'Work Completed', 12, 'tony17');
		expect(obj).toEqual(undefined);

	});
});
describe('Util removeCategoryLogObject', function() {

	const fieldReport = {
  	"actionee": "584af775e808bcf75f0603b6 jbuhner@dexchadev.com",
  	"notes": [
		{
	  		"category": "weather",
	  		"description": "Weather",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.931",
	  		"lastUpdated": "2017-05-02T18:34:45.931",
	  		"fieldReportEntryId": "77a2998e-fa6f-49ef-a4ab-4d7d92e9450b",
	  		"rejection": null
		},
		{
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [{content: {12: {hello:'hi'}}}],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		},
		{
	  		"category": "visitor",
	  		"description": "Visitor",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "1ca906fd-bf4b-4905-ae23-cca8bef6c3ad",
	  		"rejection": null
		},
		{
	  		"category": "notes",
	  		"description": "Work Completed",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
	  		"rejection": null
		},
		{
	  		"category": "photo",
	  		"description": "Photo",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "103fb3c3-1331-4bc9-9189-69c06e5127ec",
	  		"rejection": null
		},
		{
	  		"category": "signature",
	  		"description": "Signature",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "af28c475-7eb1-43e5-99df-8865a2b4d9ec",
	  		"rejection": null
		}
  	],
  	"id": "0913a059-fff1-4ca5-895d-e5ef24a160e0",
  	"tenant": "mech-co",
  	"jobCode": "PLM_city",
  	"forDay": "2017-05-02",
  	"createdDay": "2017-05-02T18:34:45.935",
  	"originator": "jbuhner@dexchadev.com",
  	"status": "Open"
}						


	it('insertCategoryLogObject - 1st return', function() {
		const obj = Util.insertCategoryLogObject(fieldReport, 'Weather', '12', {hello:'hi'});
		expect(obj.notes[0].content.length).toEqual(1);

	});
	it('insertCategoryLogObject - topic', function() {
		const obj = Util.insertCategoryLogObject(fieldReport, 'Work Completed', '12', {hello:'hi'}, 'tony');
		expect(obj.notes[3].content[0].content['tony']['12']).toEqual( { hello: 'hi' });

	});
	it('removeCategoryLogObject - no field report', function() {
		const obj = Util.removeCategoryLogObject({notes:[]}, 'Work Completed', '12', 'tony');
		expect(obj.notes.length).toEqual(0);

	});
	it('removeCategoryLogObject - no cat', function() {
		const obj = Util.removeCategoryLogObject(fieldReport, 'Work Completed', '15', 'tony');
		expect(obj.notes[3].content[0].content['tony']['12']).toEqual( { hello: 'hi' });

	});
	it('removeCategoryLogObject - 1st return', function() {
		const obj = Util.removeCategoryLogObject(fieldReport, 'Weather', '12');
		expect(obj.notes[3].content[0].content['12']).toEqual( undefined );

	});
	it('removeCategoryLogObject - topic', function() {
		const obj = Util.removeCategoryLogObject(fieldReport, 'Work Completed', '12', 'tony');
		expect(obj.notes[3].content[0].content['tony']['12']).toEqual( undefined );

	});

});

describe('Util replaceCategoryObject', function() {

	const fieldReport = {
  	"actionee": "584af775e808bcf75f0603b6 jbuhner@dexchadev.com",
  	"notes": [
		{
	  		"category": "weather",
	  		"description": "Weather",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.931",
	  		"lastUpdated": "2017-05-02T18:34:45.931",
	  		"fieldReportEntryId": "77a2998e-fa6f-49ef-a4ab-4d7d92e9450b",
	  		"rejection": null
		},
		{
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [{content: {12: {hello:'hi'}}}],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		},
		{
	  		"category": "visitor",
	  		"description": "Visitor",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "1ca906fd-bf4b-4905-ae23-cca8bef6c3ad",
	  		"rejection": null
		},
		{
	  		"category": "notes",
	  		"description": "Work Completed",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
	  		"rejection": null
		},
		{
	  		"category": "photo",
	  		"description": "Photo",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "103fb3c3-1331-4bc9-9189-69c06e5127ec",
	  		"rejection": null
		},
		{
	  		"category": "signature",
	  		"description": "Signature",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "af28c475-7eb1-43e5-99df-8865a2b4d9ec",
	  		"rejection": null
		}
  	],
  	"id": "0913a059-fff1-4ca5-895d-e5ef24a160e0",
  	"tenant": "mech-co",
  	"jobCode": "PLM_city",
  	"forDay": "2017-05-02",
  	"createdDay": "2017-05-02T18:34:45.935",
  	"originator": "jbuhner@dexchadev.com",
  	"status": "Open"
}						


	it('replaceCategoryObject - 1st return', function() {
		const obj = Util.replaceCategoryObject(fieldReport, 'Weather', [{hello:'hi'}]);
		expect(obj.notes[0]).toEqual({ category: 'weather', description: 'Weather', phase: null, content: [  ], created: '2017-05-02T18:34:45.931', lastUpdated: '2017-05-02T18:34:45.931', fieldReportEntryId: '77a2998e-fa6f-49ef-a4ab-4d7d92e9450b', rejection: null });

	});
	it('replaceCategoryObject - 2nd return', function() {
		const obj = Util.replaceCategoryObject(fieldReport, 'Weather', [{hello:'hi'}]);
		expect(obj.notes[0]).toEqual({ category: 'weather', description: 'Weather', phase: null, content: [  ], created: '2017-05-02T18:34:45.931', lastUpdated: '2017-05-02T18:34:45.931', fieldReportEntryId: '77a2998e-fa6f-49ef-a4ab-4d7d92e9450b', rejection: null });

	});
});

describe('Util getFieldMenuChildren', function() {

	const categories = [
		{title: "Name", icon: "LAST", order: 7},
		{title: "43", icon: "jello", order: 17},
		{title: "tony", icon: "monster", order: 27},
	];
	it('getFieldMenuChildren', function() {
		expect(Util.getFieldMenuChildren(categories).length).toEqual(3);

	});	
	it('getFieldMenuChildren path', function() {
		expect(Util.getFieldMenuChildren(categories)[0].path[0]).toEqual('/project-management/field-report-detail/notes');

	});
	it('getFieldMenuChildren menu', function() {
		expect(Util.getFieldMenuChildren(categories)[0].data.menu.title).toEqual('Name');

	});
});
describe('Util convertCategoriesToFieldReportNoteHeader', function() {

	const categories = [
		{title: "Name", icon: "LAST", id: 7},
		{title: "43", icon: "jello", id: 17},
		{title: "tony", icon: "monster", id: 27},
	];
	it('convertCategoriesToFieldReportNoteHeader length', function() {
		expect(Util.convertCategoriesToFieldReportNoteHeader(categories).length).toEqual(3);

	});	
	it('convertCategoriesToFieldReportNoteHeader content lenght 0', function() {
		expect(Util.convertCategoriesToFieldReportNoteHeader(categories)[0].content.length).toEqual(0);

	});
	it('convertCategoriesToFieldReportNoteHeader description', function() {
		expect(Util.convertCategoriesToFieldReportNoteHeader(categories)[0].description).toEqual(7);

	});	
	it('convertCategoriesToFieldReportNoteHeader category', function() {
		expect(Util.convertCategoriesToFieldReportNoteHeader(categories)[0].category).toEqual('Name');

	});

});
describe('Util stringifyContent', function() {

	const fieldReport = {
  	"actionee": "584af775e808bcf75f0603b6 jbuhner@dexchadev.com",
  	"notes": [
		{
	  		"category": "weather",
	  		"description": "Weather",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.931",
	  		"lastUpdated": "2017-05-02T18:34:45.931",
	  		"fieldReportEntryId": "77a2998e-fa6f-49ef-a4ab-4d7d92e9450b",
	  		"rejection": null
		},
		{
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [{content: {12: {hello:'hi'}}}],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		},
		{
	  		"category": "visitor",
	  		"description": "Visitor",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "1ca906fd-bf4b-4905-ae23-cca8bef6c3ad",
	  		"rejection": null
		},
		{
	  		"category": "notes",
	  		"description": "Work Completed",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
	  		"rejection": null
		},
		{
	  		"category": "photo",
	  		"description": "Photo",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "103fb3c3-1331-4bc9-9189-69c06e5127ec",
	  		"rejection": null
		},
		{
	  		"category": "signature",
	  		"description": "Signature",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "af28c475-7eb1-43e5-99df-8865a2b4d9ec",
	  		"rejection": null
		}
  	],
  	"id": "0913a059-fff1-4ca5-895d-e5ef24a160e0",
  	"tenant": "mech-co",
  	"jobCode": "PLM_city",
  	"forDay": "2017-05-02",
  	"createdDay": "2017-05-02T18:34:45.935",
  	"originator": "jbuhner@dexchadev.com",
  	"status": "Open"
}						


	it('stringifyContent', function() {
		const obj = Util.stringifyContent(fieldReport);
		expect(obj.notes[1].content[0].content).toEqual('{"12":{"hello":"hi"}}');

	});
	it('parseContent', function() {
		let obj = Util.stringifyContent(fieldReport);
		obj = Util.parseContent(obj);
		expect(obj.notes[1].content[0].content).toEqual({12: {hello:'hi'}});

	});

});
describe('Util stringifyCategoryContent', function() {

	const category = {
		
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [{content: {12: {hello:'hi'}}}],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		}	


	it('stringifyCategoryContent', function() {
		const obj = Util.stringifyCategoryContent(category);
		expect(obj.content[0].content).toEqual('{"12":{"hello":"hi"}}');

	});
	it('parseContent', function() {
		let obj = Util.stringifyCategoryContent(category);
		obj = Util.parseCategoryContent(obj);
		expect(obj.content[0].content).toEqual({12: {hello:'hi'}});

	});

});
describe('Util formatReportDate', function() {

	it('formatReportDate mm-dd-yyy', function() {
		expect(Util.formatReportDate('mm-dd-yyyy', 'mm-dd-yyyy')).toEqual('yyyy-mm-dd');

	});	
	it('formatReportDate mm-dd-yyy', function() {
		expect(Util.formatReportDate('dd-mm-yyyy', 'dd-mm-yyyy')).toEqual('yyyy-mm-dd');

	});	
	it('formatReportDate default', function() {
		expect(Util.formatReportDate('aa-tt-uiyt', 'oiyoo-dokd-youyyy')).toEqual('oiyoo-dokd-youyyy');

	});	
	it('formatReportDate mm-dd-yyy sep', function() {
		expect(Util.formatReportDate('mm/dd/yyyy', 'mm/dd/yyyy', '/')).toEqual('yyyy-mm-dd');

	});	
	it('formatReportDate mm-dd-yyy sep', function() {
		expect(Util.formatReportDate('dd/mm/yyyy', 'dd/mm/yyyy','/')).toEqual('yyyy-mm-dd');

	});	
	it('formatReportDate default sep', function() {
		expect(Util.formatReportDate('aa/tt/uiyt', 'oiyoo-dokd-youyyy','/')).toEqual('oiyoo-dokd-youyyy');

	});		
});
describe('Util attributeCount', function() {

	const category = {
		
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [{content: {12: {hello:'hi'}}}],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": ''
		}	


	it('attributeCount', function() {
		const count = Util.attributeCount(category);
		expect(count).toEqual(6);

	});

});