module( "main function" );



test('Check if all necessary properties are functions', function(){
	ok( typeof i18n === 'function', 'i18n is not a function' );
	ok( typeof i18n._ === 'function', "i18n._ isn't a function" );
	ok( typeof _ === 'function', "_ isn't a function" );
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

test('Testing with two arguments', function(){

	equal( _.arr1, _('arr1') );
	equal( _.arr1, _('arr1', 0) );
	equal( _.arr1, _('arr1', 1) );
	equal( _.arr1, _('arr1', 2) );
	equal( _.arr1, _('arr1', -1) );
	equal( _.arr1, _('arr1', NaN) );

});

test('Testing the plural', function(){

	equal( _.arr2[0], _('arr2') );
	equal( _.arr2[0], _('arr2', 0) );
	equal( _.arr2[0], _('arr2', -1) );
	equal( _.arr2[0], _('arr2', 1) );
	equal( _.arr2[1], _('arr2', 2) );
	equal( _.arr2[1], _('arr2', 3) );
	equal( _.arr2[1], _('arr2', 100) );

});

test('Testing the Empty, single and multiple form', function(){

	i18n({
		'arr1' : ['Message one'],
		'arr2' : ['Message two', 'Message two plural'],
		'arr3' : ['Message three Empty', 'Message three single', 'Message three multiple']
	});


	equal( _.arr3[0], _('arr3') );
	equal( _.arr3[0], _('arr3', 0) );
	equal( _.arr3[1], _('arr3', 1) );
	equal( _.arr3[2], _('arr3', 2) );
	equal( _.arr3[2], _('arr3', 100) );

	equal( _.arr3[0], _('arr3', -1) );


});

test('Testing an inexistent array', function(){

	var arr = ['empty value', 'single value', 'multiple value'];

	ok( typeof _(['Some text']) === 'string' );
	equal( _(['Some text']), 'Some text' );
	
	equal( _( arr, 0 ), 'empty value' );
	equal( _( arr, -1 ), 'empty value' );
	equal( _( arr, NaN ), 'empty value' );
	equal( _( arr, 'abc' ), 'empty value' );

	equal( _( arr, 1 ), 'single value' );

	equal( _( arr, 2 ), 'multiple value' );
	equal( _( arr, 100 ), 'multiple value' );

});