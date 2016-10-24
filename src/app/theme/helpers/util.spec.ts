import Util from './util';
import Consts from './consts';

describe('binary search', function() {
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
describe('remove Element', function() {
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
describe('clamp', function() {
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

describe('insertIntoUniqueSortedArray', function() {
	let arr = [];
	it('should insert into an array', function() {
		Util.insertIntoUniqueSortedArray(arr, 6);  
		expect(arr.toString()).toEqual('6');
	});
	it('should insert into an array before the last element added', function() {
		Util.insertIntoUniqueSortedArray(arr, 2);  
		expect(arr.toString()).toEqual('2,6');
	});
	it('should insert into an array after the last element', function() {
		Util.insertIntoUniqueSortedArray(arr, 12);  
		expect(arr.toString()).toEqual('2,6,12');
	});
	it('should not insert into an array a duplicate', function() {
		Util.insertIntoUniqueSortedArray(arr, 12);  
		expect(arr.toString()).toEqual('2,6,12');
	});
});

describe('insertIntoSortedArray', function() {      
	let arr = [];
	it('should insert into an array', function() {
		Util.insertIntoSortedArray(arr, 6);  
		expect(arr.toString()).toEqual('6');
	});
	it('should insert into an array before the last element added', function() {
		Util.insertIntoSortedArray(arr, 2);  
		expect(arr.toString()).toEqual('2,6');
	});
	it('should insert into an array after the last element', function() {
		Util.insertIntoSortedArray(arr, 12);  
		expect(arr.toString()).toEqual('2,6,12');
	});
	it('should insert into an array a duplicate', function() {
		Util.insertIntoSortedArray(arr, 12);  
		expect(arr.toString()).toEqual('2,6,12,12');
	});
});  
describe('getFromSortedArray', function() {
	let blockIdList = [1,2,15,54];

	it('should getFromSortedArray', function() {
		let found = Util.getFromSortedArray(blockIdList, 15);  
		expect(found).toEqual(15);
	});
	it('should not find in removeFromSortedArray', function() {
		let found = Util.getFromSortedArray(blockIdList, 46);  
		expect(found).toEqual(undefined);
	});
});  

describe('removeFromSortedArray', function() {
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


describe('removeFromUnsortedArray', function() {
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

describe('list of users - no duplicates', function() {
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

describe('list of users - remove duplicates', function() {
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
describe('list of users - no duplicates', function() {
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

describe('list of users and boozers - remove duplicates', function() {
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
describe('array as map', function() {
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
describe('object As Map', function() {
	let layoutVersionData = 
		{
		  'V1': ['M1','M2','M3','M4','M5'],
		  'V2': ['M6','M7','M8','M9','M10']
		};
	let am = new Map();

	beforeEach(function() {
		am = Util.objectAsMap(layoutVersionData);
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
describe('camelize', function() {
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
describe('jenkinsHash', function() {
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
describe('evaluateTemplateStringAgainstDictionary', function() {
	it('evaluateTemplateStringAgainstDictionary code: 123, name: Apparel', function() {
		const str = Util.evaluateTemplateStringAgainstDictionary("${code} - ${name}", { code: '123', name: 'Apparel' });
		expect(str).toEqual('123 - Apparel');
	});
	it('evaluateTemplateStringAgainstDictionary code: 123, name: Apparel', function() {
		const str = Util.evaluateTemplateStringAgainstDictionary("*${code}*-*${name}*", { code: '123', name: 'Apparel' });
		expect(str).toEqual('*123*-*Apparel*');
	});
});
describe('itemMask', function() {
	it('itemMask  123.14 should equal 123', function() {
		const str = Util.itemMask("123.14");
		expect(str).toEqual('123');
	});
	it('itemMask  123.Apparel should equal 123', function() {
		const str = Util.itemMask("123.Apparel");
		expect(str).toEqual('123');
	});
});
describe('isDoubleEqual', function() {
	it('isDoubleEqual  123.14 should not equal 123', function() {
		const bool = Util.isDoubleEqual(123.14, 123);
		expect(bool).toEqual(false);
	});
	it('isDoubleEqual  123 should equal 123', function() {
		const bool = Util.isDoubleEqual(123, 123);
		expect(bool).toEqual(true);
	});
});
describe('isString', function() {
	it('isString  123.14 should be number', function() {
		const bool = Util.isString(123.14);
		expect(bool).toEqual(false);
	});
	it('isString  123Advance should not equal number', function() {
		const bool = Util.isString('123advance');
		expect(bool).toEqual(true);
	});
});
describe('isNumber', function() {
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
describe('areObjectsEqual', function() {
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
describe('isDefined', function() {
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
describe('isObjectEmpty', function() {
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
describe('isEmail', function() {
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
describe('isObject', function() {
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
describe('dynamic sort', function() {

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