describe ( "L.Marker.Pin.Translator tests - Warning : test order is important!", function ( ) {

	it ( "01 - window._UserLanguage is null or undefined", function ( ) {
		expect ( window._UserLanguage ).not.toEqual( jasmine.anything ( ) );
	} );

	it ( "02 - window._Translations is null or undefined", function ( ) {
		expect ( window._Translations ).not.toEqual( jasmine.anything ( ) );
	} );
	
	/* get UserLanguage ( ) and set UserLanguage ( newUserLanguage ) tests */

	it ( "03 - L.marker.pin.translator ( ).UserLanguage return 'fr'", function ( ) {
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'fr' );
	} );
	
	it ( "04 - L.marker.pin.translator ( ).UserLanguage return 'nl' after running L.marker.pin.translator ( ).UserLanguage = 'nl'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'nl';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'nl' );
	} );

	/* getText ( ) tests */

	it ( "05 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Add' ) return '???'", function ( ) {
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Add' ) ).toBe ( '???' );
	} );

	it ( "06 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) return 'Adresse' after running L.marker.pin.translator ( ).UserLanguage = 'fr'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'fr';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'fr' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) ).toBe ( 'Adresse' );
	} );

	it ( "07 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) return 'Adres' after running L.marker.pin.translator ( ).UserLanguage = 'nl'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'nl';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'nl' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) ).toBe ( 'Adres' );
	} );

	it ( "08 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) return 'Address' after running L.marker.pin.translator ( ).UserLanguage = 'en'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'en';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'en' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) ).toBe ( 'Address' );
	} );

	it ( "09 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) return 'Address' after running L.marker.pin.translator ( ).UserLanguage = 'de'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'de';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'de' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) ).toBe ( 'Address' );
	} );
	
	/* addTranslation ( ) tests */

	it ( "10 - L.marker.pin.translator ( ).addTranslation ( 'L.Marker.Pin.house', 'fr', 'Maison' ) return false", function ( ) {
		expect ( L.marker.pin.translator ( ).addTranslation ( 'L.Marker.Pin.house', 'fr', 'Maison' ) ).toBeFalsy ( );
	} );

	it ( "11 - L.marker.pin.translator ( ).addTranslation ( 'L.Marker.Pin.Address', 'fr', 'Adresse' ) return false", function ( ) {
		expect ( L.marker.pin.translator ( ).addTranslation ( 'L.Marker.Pin.house', 'fr', 'Adresse' ) ).toBeFalsy ( );
	} );

	it ( "12 - L.marker.pin.translator ( ).addTranslation ( 'L.Marker.Pin.Address', 'de', 'Anschrift' ) return true", function ( ) {
		expect ( L.marker.pin.translator ( ).addTranslation ( 'L.Marker.Pin.Address', 'de', 'Anschrift' ) ).toBeTruthy ( );

	} );

	it ( "13 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) return 'Anschrift' after test 12 and running L.marker.pin.translator ( ).UserLanguage = 'de'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'de';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'de' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) ).toBe ( 'Anschrift' );
	} );
	
	/* addTranslations ( ) tests */

	it ( "14 - L.marker.pin.translator ( ).addTranslations ( 'L.Marker.Pin.Street', { 'fr' : 'Rue', 'nl' : 'Straat', 'en' : 'Street' } )') return true", function ( ) {
		expect ( L.marker.pin.translator ( ).addTranslations ( 'L.Marker.Pin.Street', { 'fr' : 'Rue', 'nl' : 'Straat', 'en' : 'Street' } ) ).toBeTruthy ( );
	} );

	it ( "15 - L.marker.pin.translator ( ).addTranslations ( 'L.Marker.Pin.Street', { 'fr' : 'Rue', 'nl' : 'Straat', 'en' : 'Street' } )') return false when running twice", function ( ) {
		expect ( L.marker.pin.translator ( ).addTranslations ( 'L.Marker.Pin.Street', { 'fr' : 'Rue', 'nl' : 'Straat', 'en' : 'Street' } ) ).toBeFalsy ( );
	} );

	it ( "16 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Street' ) return 'Rue' after running L.marker.pin.translator ( ).UserLanguage = 'fr'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'fr';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'fr' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Street' ) ).toBe ( 'Rue' );
	} );
	
	it ( "17 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Street' ) return 'Straat' after running L.marker.pin.translator ( ).UserLanguage = 'nl'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'nl';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'nl' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Street' ) ).toBe ( 'Straat' );
	} );
	
	it ( "18 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Street' ) return 'Street' after running L.marker.pin.translator ( ).UserLanguage = 'en'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'en';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'en' );
		expect ( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Street' ) ).toBe ( 'Street' );
	} );

	it ( "19 - L.marker.pin.translator ( ).UserLanguage return 'fr' after running L.marker.pin.translator ( ).UserLanguage = 'fr'", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'fr';
		expect ( L.marker.pin.translator ( ).UserLanguage ).toBe ( 'fr' );
	} );
} );
