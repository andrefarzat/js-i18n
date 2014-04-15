describe("main function", function(){

    it('Check if all necessary properties are functions', function(){
        expect(typeof i18n).toBe('function');
        expect(typeof i18n._).toBe('function');
        expect(typeof i18n.pluralize).toBe('function');
    });


    it('Giving an object, it must create the i18n._ object', function(){
        
        i18n({
            'one' : 'first value',
            'two' : 'second value',
            'three' : 'third value'
        });

        expect( i18n._.one ).toBe( 'first value' );
        expect( i18n._.two ).toBe( 'second value' );
        expect( i18n._.three ).toBe( 'third value' );

    });


    it('Giving a second object, it must add the new properties and overwrite the old ones', function(){

        i18n({
            'one' : 'new first value',
            'two' : 'new second value',
            'three' : 'new third value',
            'four' : 'fourth value'
        });

        expect( i18n._.one ).toBe( 'new first value' );
        expect( i18n._.two ).toBe( 'new second value' );
        expect( i18n._.three ).toBe( 'new third value' );
        expect( i18n._('four') ).toBe( 'fourth value' );

    });

    it('Giving an array as value, it must store it', function(){

        i18n({
            'arr1' : ['Message one'],
            'arr2' : ['Message two', 'Message two plural'],
            'arr3' : ['Message three Empty', 'Message three single', 'Message three multiple']
        });

        expect( i18n._.arr1).toEqual( ['Message one'] );
        expect( i18n._.arr2).toEqual( ['Message two', 'Message two plural'] );
        expect( i18n._.arr3).toEqual( ['Message three Empty', 'Message three single', 'Message three multiple'] );

    });

    it("Giving a non-object argument must do nothing", function(){

        //Must do nothing!
        i18n(null);
        i18n(NaN);
        i18n(undefined);
        i18n([]);

        expect(function(){
            i18n(function(){});
        }).toThrow();

        expect(function(){
            i18n(['one']);
        }).toThrow();

        expect(function(){
            i18n(100);
        }).toThrow();

        expect(function(){
            i18n('string should not pass!');
        }).toThrow();

    });


    describe('i18n._ function', function(){

        it('Testing with one argument', function(){

            expect( i18n._('one') ).toEqual( 'new first value' );
            expect( i18n._('two') ).toEqual( 'new second value' );
            expect( i18n._('four') ).toEqual( 'fourth value' );

        });

        it('Giving an inexistent key, it must return the given key', function(){

            var txt = 'my amazing key';

            expect( i18n._(txt) ).toEqual( txt );

        });

        it('Testing the pluralize', function(){

            var obj = {
                '0' : 'Nothing',
                '1' : 'One thing',
                '2' : 'Two things',
                '7' : 'Seven things',
                'one' : 'Someone is seeing',
                'other' : i18n.wildcard + ' things!'
            };

            expect( obj[0] ).toEqual( i18n.pluralize( obj, 0 ) );
            expect( obj[1] ).toEqual( i18n.pluralize( obj, 1 ) );
            expect( obj[2] ).toEqual( i18n.pluralize( obj, 2 ) );
            expect( obj[7] ).toEqual( i18n.pluralize( obj, 7 ) );

            //offset
            expect( obj[7] ).toEqual( i18n.pluralize( obj, 9, 2 ) );
            expect( obj[2] ).toEqual( i18n.pluralize( obj, 4, 2 ) );
            
            //One
            expect( obj['one'] ).toEqual( i18n.pluralize( obj, 4, 3 ) );
            expect( obj['one'] ).toEqual( i18n.pluralize( obj, 'one' ) );

            //others
            var txt = obj['other'].replace( i18n.wildcard, -1 );
            expect( txt ).toEqual( i18n.pluralize( obj, -1 ), '-1' );

            txt = obj['other'].replace( i18n.wildcard, 8 );
            expect( txt ).toEqual( i18n.pluralize( obj, 10, 2 ) );

            txt = obj['other'].replace( i18n.wildcard, 100 );
            expect( txt ).toEqual( i18n.pluralize( obj, 100 ) );

            //Not numbers will always return zero
            expect( obj[0]).toEqual( i18n.pluralize( obj, 'not number' ) );
            expect( obj[0]).toEqual( i18n.pluralize( obj, NaN ) );
            expect( obj[0]).toEqual( i18n.pluralize( obj, '' ) );
            expect( obj[0]).toEqual( i18n.pluralize( obj, false ) );
            expect( obj[0]).toEqual( i18n.pluralize( obj, true ) );
            expect( obj[0]).toEqual( i18n.pluralize( obj, Infinity ) );
            expect( obj[0]).toEqual( i18n.pluralize( obj, {} ) );
        });

    });

});