describe ( "L.Marker.Pin.Category tests", function ( ) {
	
	/* getCategory ( ) tests */

	it ( "01 - All tests", function ( ) {
		var myCategory = L.marker.pin.category ( 
			'TEST01', 
			{ 'en' : 'Abcdef', 'fr' : 'Bcdefg', 'nl' : 'Cdefgh', },
			L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
		);
		L.marker.pin.translator ( ).UserLanguage = 'en';
		expect ( myCategory.CategoryName ).toBe ( 'Abcdef' );
		L.marker.pin.translator ( ).UserLanguage = 'fr';
		expect ( myCategory.CategoryName ).toBe ( 'Bcdefg' );
		L.marker.pin.translator ( ).UserLanguage = 'nl';
		expect ( myCategory.CategoryName ).toBe ( 'Cdefgh' );

		expect ( myCategory.CategoryId ).toBe ( 'TEST01' );

		expect ( myCategory.CategoryIcon.options.iconUrl ).toBe ( 'img/0001.png' );
		
	} );

} );
