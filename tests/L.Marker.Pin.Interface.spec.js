describe ( "L.Marker.Pin.Interface tests - Warning : test order is important!", function ( ) {
	
	myInterface = L.marker.pin.interface ( );

	it ( "01 - myInterface must be defined", function ( ) {
		expect( myInterface ).not.toBeNull ( );
	} );

	/* get Release ( ) tests */
	
	it ( "02 - myInterface.Release return '1.2.0'", function ( ) {
		expect( myInterface.Release ).toBe ( '1.2.0' );
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
	
	it ( "06 - L.marker.pin.categories ( ).length return 0 before and 28 after running myInterface.addDefaultCategories ( )", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 0 );
		myInterface.addDefaultCategories ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 28 );
	} );

	/* addCategory ( ) tests */

	it ( "07 - L.marker.pin.categories ( ).length return 28 before and 29 after running myInterface.addCategory ( ) and  myInterface.addCategory ( ) return true", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 28 );
		expect (
			myInterface.addCategory ( 
				'29', 
				{ 'en' : 'House', 'fr' : 'Maison', 'nl' : 'Huis', },
				L.icon ( { iconUrl: 'L.Marker.Pin.img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeTruthy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 29 );
	} );

	it ( "08 - L.marker.pin.categories ( ).length return 28 before and  after running twice myInterface.addCategory ( ) with same parameters and  myInterface.addCategory ( ) return false", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 29 );

		expect (
			myInterface.addCategory ( 
				'28', 
				{ 'en' : 'House', 'fr' : 'Maison', 'nl' : 'Huis', },
				L.icon ( { iconUrl: 'L.Marker.Pin.img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeFalsy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 29 );
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
	
	/* getText and addTranslations tests */
	
	it ( "13 - myInterface.getText ( 'myTree' ) return '???'", function ( ) {
		expect( myInterface.getText ( 'myTree' ) ).toBe (  '???' );
	} );
	it ( "14 - myInterface.addTranslations ( 'myTree', {'fr' : 'Arbre', 'en' : 'Tree', 'nl' : 'Boom'} ) ) return true", function ( ) {
		expect ( myInterface.addTranslations ( 'myTree', {'fr' : 'Arbre', 'en' : 'Tree', 'nl' :'Boom'} ) ).toBeTruthy ( );
	} );
	it ( "15 - myInterface.addTranslations ( 'myTree', {'fr' : 'Arbre', 'en' : 'Tree', 'nl' : 'Boom'} ) ) return false when executed twice", function ( ) {
		expect ( myInterface.addTranslations ( 'myTree', {'fr' : 'Arbre', 'en' : 'Tree', 'nl' :'Boom'} ) ).toBeFalsy ( );
	} );
	it ( "16 - myInterface.getText ( 'myTree' ) return 'Arbre' after running myInterface.UserLanguage = 'fr'", function ( ) {
		myInterface.UserLanguage = 'fr';
		expect( myInterface.getText ( 'myTree' ) ).toBe (  'Arbre' );
	} );
	it ( "17 - myInterface.getText ( 'myTree' ) return 'Boom' after running myInterface.UserLanguage = 'nl'", function ( ) {
		myInterface.UserLanguage = 'nl';
		expect( myInterface.getText ( 'myTree' ) ).toBe (  'Boom' );
	} );
	it ( "18 - myInterface.getText ( 'myTree' ) return 'Tree' after running myInterface.UserLanguage = 'en'", function ( ) {
		myInterface.UserLanguage = 'en';
		expect( myInterface.getText ( 'myTree' ) ).toBe (  'Tree' );
	} );
	it ( "19 - myInterface.getText ( 'myTree' ) return 'Tree' after running myInterface.UserLanguage = 'de'", function ( ) {
		myInterface.UserLanguage = 'de';
		expect( myInterface.getText ( 'myTree' ) ).toBe (  'Tree' );
	} );
	
	xit ( "20 - myInterface.setCallbackFunction cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.setCallbackFunction cannot be currently tested in the Unit tests");
	} );

	xit ( "21 - myInterface.stringifyPins cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.stringifyPins cannot be currently tested in the Unit tests");
	} );

	xit ( "22 - myInterface.parsePins cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.parsePins cannot be currently tested in the Unit tests");
	} );

	/* PinsHtlmlOptions tests */

	it ( "23 - myInterface.PinsHtlmlOptions.mainElement return 'div'", function ( ) {
		expect( myInterface.PinsHtlmlOptions.mainElement ).toBe (  'div' );
		console.log ( myInterface.PinsHtlmlOptions );
	} );

	it ( "24 - myInterface.PinsHtlmlOptions.mainElement return 'h1' after running myInterface.PinsHtlmlOptions = { mainElement : 'h1'}", function ( ) {
		myInterface.PinsHtlmlOptions = { mainElement : 'h1'};
		expect( myInterface.PinsHtlmlOptions.mainElement ).toBe (  'h1' );
	} );
	
	xit ( "25 - myInterface.PinsHtmlElement cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.PinsHtmlElement cannot be currently tested in the Unit tests");
	} );

	xit ( "26 - myInterface.addControl cannot be currently tested in the Unit tests", function ( ) {
		fail("myInterface.addControl cannot be currently tested in the Unit tests");
	} );
	
} );
