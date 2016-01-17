describe ( "L.Marker.Pin.Interface tests - Warning : test order is important!", function ( ) {
	
	myInterface = L.marker.pin.interface ( );

	it ( "01 - myInterface must be defined", function ( ) {
		expect( myInterface ).not.toBeNull ( );
	} );

	/* get Release ( ) tests */
	
	it ( "02 - myInterface.Release return '1.1.0'", function ( ) {
		expect( myInterface.Release ).toBe ( '1.1.0' );
	} );

	/* get UserLanguage ( ) and set UserLanguage ( newUserLanguage ) tests */

	it ( "03 - myInterface.UserLanguage return 'fr'", function ( ) {
		expect( myInterface.UserLanguage ).toBe ( 'fr' );
	} );
	
	it ( "04 - myInterface.UserLanguage return 'nl' after running myInterface.UserLanguage = 'nl'", function ( ) {
		myInterface.UserLanguage = 'nl';
		expect( myInterface.UserLanguage ).toBe ( 'nl' );
	} );

	/* newPin ( ) tests */

	xit ( "05 - myInterface.newPin cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.newPin cannot be currently tested in the Unit tests");
	} );

	/* addDefaultCategories ( ) tests */
	
	it ( "06 - L.marker.pin.categories ( ).length return 0 before and 27 after running myInterface.addDefaultCategories ( )", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 0 );
		myInterface.addDefaultCategories ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 27 );
	} );

	/* addCategory ( ) tests */

	it ( "07 - L.marker.pin.categories ( ).length return 27 before and 28 after running myInterface.addCategory ( ) and  myInterface.addCategory ( ) return true", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 27 );

		expect (
			myInterface.addCategory ( 
				'28', 
				{ 'en' : 'House', 'fr' : 'Maison', 'nl' : 'Huis', },
				L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeTruthy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 28 );
	} );

	it ( "08 - L.marker.pin.categories ( ).length return 28 before and  after running twice myInterface.addCategory ( ) with same parameters and  myInterface.addCategory ( ) return false", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 28 );

		expect (
			myInterface.addCategory ( 
				'28', 
				{ 'en' : 'House', 'fr' : 'Maison', 'nl' : 'Huis', },
				L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeFalsy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 28 );
	} );
	
	/* addTranslation ( ) tests */

	it ( "09 - myInterface.addTranslation ( 'L.Marker.Pin.house', 'fr', 'Maison' ) return false", function ( ) {
		expect( myInterface.addTranslation ( 'L.Marker.Pin.house', 'fr', 'Maison' ) ).toBeFalsy ( );
	} );

	it ( "10 - myInterface.addTranslation ( 'L.Marker.Pin.Address', 'fr', 'Adresse' ) return false", function ( ) {
		expect( myInterface.addTranslation ( 'L.Marker.Pin.house', 'fr', 'Adresse' ) ).toBeFalsy ( );
	} );

	it ( "11 - myInterface.addTranslation ( 'L.Marker.Pin.Address', 'de', 'Anschrift' ) return true", function ( ) {
		expect( myInterface.addTranslation ( 'L.Marker.Pin.Address', 'de', 'Anschrift' ) ).toBeTruthy ( );

	} );

	it ( "12 - L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) return 'Anschrift' after test 11 and running L.marker.pin.translator ( ).UserLanguage = 'de'", function ( ) {
		myInterface.UserLanguage = 'de';
		expect( myInterface.UserLanguage ).toBe ( 'de' );
		expect( L.marker.pin.translator ( ).getText ( 'L.Marker.Pin.Address' ) ).toBe ( 'Anschrift' );
	} );
	
	xit ( "13 - myInterface.setCallbackFunction cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.setCallbackFunction cannot be currently tested in the Unit tests");
	} );

	xit ( "14 - myInterface.stringifyPins cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.stringifyPins cannot be currently tested in the Unit tests");
	} );

	xit ( "15 - myInterface.parsePins cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.parsePins cannot be currently tested in the Unit tests");
	} );
	
				
	
} );
