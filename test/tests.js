module( "main function" );



test('Check if all necessary properties are functions', function(){
	ok( typeof i18n === 'function', 'i18n is not a function' );
	ok( typeof i18n._ === 'function', "i18n._ isn't a function" );
	ok( typeof _ === 'function', "_ isn't a function" );
	ok( typeof i18n.pluralize === 'function', "i18n.pluralize isn't a function" );
	ok( typeof pluralize === 'function', "pluralize isn't a function" );
});


test('Giving an object, it must create the i18n._ object', function(){
	
	i18n({
		'one' : 'first value',
		'two' : 'second value',
		'three' : 'third value'
	});

	ok( _.one === 'first value' );
	ok( _.two === 'second value' );
	ok( _.three === 'third value' );

});


test('Giving a second object, it must add the new properties and overwrite the old ones', function(){

	i18n({
		'one' : 'new first value',
		'two' : 'new second value',
		'three' : 'new third value',
		'four' : 'fourth value'
	});

	ok( _.one === 'new first value' );
	ok( _.two === 'new second value' );
	ok( _.three === 'new third value' );
	ok( _('four') === 'fourth value' );

});

test('Giving an array as value, it must store it', function(){

	i18n({
		'arr1' : ['Message one'],
		'arr2' : ['Message two', 'Message two plural'],
		'arr3' : ['Message three Empty', 'Message three single', 'Message three multiple']
	});

	deepEqual( _.arr1, ['Message one'] );
	deepEqual( _.arr2, ['Message two', 'Message two plural'] );
	deepEqual( _.arr3, ['Message three Empty', 'Message three single', 'Message three multiple'] );

});

test("Giving a non-object argument must do nothing", function(){

	//Must do nothing!
	i18n(null);
	i18n(NaN);
	i18n(undefined);
	i18n([]);

	throws(function(){
		i18n(function(){});
	}, 'Function cannot pass');

	throws(function(){
		i18n(['one']);
	}, 'Array cannot pass');	

	throws(function(){
		i18n(100);
	}, 'Number is not acceptable.');

	throws(function(){
		i18n('string should not pass!');
	}, 'String is not acceptable.');

});


module( 'i18n._ function' );


test('Testing with one argument', function(){

	equal( _('one'), 'new first value');
	equal( _('two'), 'new second value');
	equal( _('four'), 'fourth value');

});

test('Giving an inexistent key, it must return the given key', function(){

	var txt = 'my amazing key';

	equal( _(txt), txt );

});

test('Testing the pluralize', function(){

	var obj = {
		'0' : 'Nothing',
		'1' : 'One thing',
		'2' : 'Two things',
		'7' : 'Seven things',
		'one' : 'Someone is seeing',
		'other' : i18n.wildcard + ' things!'
	};

	equal( obj[0], pluralize( obj, 0 ) );
	equal( obj[1], pluralize( obj, 1 ) );
	equal( obj[2], pluralize( obj, 2 ) );
	equal( obj[7], pluralize( obj, 7 ) );

	//offset
	equal( obj[7], pluralize( obj, 9, 2 ) );
	equal( obj[2], pluralize( obj, 4, 2 ) );
	
	//One
	equal( obj['one'], pluralize( obj, 4, 3 ) );
	equal( obj['one'], pluralize( obj, 'one' ) );

	//others
	var txt = obj['other'].replace( i18n.wildcard, -1 );
	equal( txt, pluralize( obj, -1 ), '-1' );

	txt = obj['other'].replace( i18n.wildcard, 8 );
	equal( txt, pluralize( obj, 10, 2 ) );

	txt = obj['other'].replace( i18n.wildcard, 100 );
	equal( txt, pluralize( obj, 100 ) );

	//Not numbers will always return zero
	equal( obj[0], pluralize( obj, 'not number' ) );
	equal( obj[0], pluralize( obj, NaN ) );
	equal( obj[0], pluralize( obj, '' ) );
	equal( obj[0], pluralize( obj, false ) );
	equal( obj[0], pluralize( obj, true ) );
	equal( obj[0], pluralize( obj, Infinity ) );
	equal( obj[0], pluralize( obj, {} ) );

	//offset as a negative number
	throws( obj[7], pluralize( obj, 9, -2 ), 'Must throw an exception!' );

});