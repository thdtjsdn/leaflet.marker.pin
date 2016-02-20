/*
Copyright - 2015 2016 - Christian Guyette - Contact: http//www.ouaie.be/

This  program is free software;
you can redistribute it and/or modify it under the terms of the 
GNU General Public License as published by the Free Software Foundation;
either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

	/*
	------------------------------------------------------------------------------------------------------------------------

	v1.2.0:
	- Added default category 'start'

	------------------------------------------------------------------------------------------------------------------------
	*/


describe ( "L.Marker.Pin.Categories tests - Warning : test order is important!", function ( ) {
	
	/* addCategory ( ) tests */

	it ( "01 - L.marker.pin.categories ( ).length return 0 before and 1 after running L.marker.pin.categories ( ).addCategory ( ) and  L.marker.pin.categories ( ).addCategory ( ) return true", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 0 );
		expect (
			L.marker.pin.categories ( ).addCategory ( 
				'TEST01', 
				{ 'en' : 'Abcdef', 'fr' : 'Bcdefg', 'nl' : 'Cdefgh', },
				L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeTruthy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 1 );
	} );
	
	it ( "02 - L.marker.pin.categories ( ).length return 1 before and 2 after running L.marker.pin.categories ( ).addCategory ( ) and  L.marker.pin.categories ( ).addCategory ( ) return true", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 1 );
		expect (
			L.marker.pin.categories ( ).addCategory ( 
				'TEST02', 
				{ 'en' : 'Bcdefg', 'fr' : 'Cdefgh', 'nl' : 'Abcdef', },
				L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeTruthy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 2 );
	} );

	it ( "03 - L.marker.pin.categories ( ).length return 2 before and 3 after running L.marker.pin.categories ( ).addCategory ( ) and  L.marker.pin.categories ( ).addCategory ( ) return true", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 2 );
		expect (
			L.marker.pin.categories ( ).addCategory ( 
				'TEST03', 
				{ 'en' : 'Cdefgh', 'fr' : 'Abcdef', 'nl' : 'Bcdefg', },
				L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeTruthy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 3 );
	} );

	it ( "04 - L.marker.pin.categories ( ).length return 3 before and after running twice myInterface.addCategory ( ) with same parameters and  myInterface.addCategory ( ) return false", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 3 );
		expect (
			L.marker.pin.categories ( ).addCategory ( 
				'TEST03', 
				{ 'en' : 'Cdefgh', 'fr' : 'Abcdef', 'nl' : 'Bcdefg', },
				L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } )
			) ).toBeFalsy ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 3 );
	} );

	/* sort ( ) and getAt ( ) tests */
	
	it ( "05 - L.marker.pin.categories ( ).getAt ( 0..2 ).CategoryId return 'TEST01', 'TEST02', 'TEST03' when L.marker.pin.translator ( ).UserLanguage = 'en' and adter running L.marker.pin.categories ( ).sort ( )", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'en';
		L.marker.pin.categories ( ).sort ( );
		expect ( L.marker.pin.categories ( ).getAt ( 0 ).CategoryId ).toBe ( 'TEST01' );
		expect ( L.marker.pin.categories ( ).getAt ( 1 ).CategoryId ).toBe ( 'TEST02' );
		expect ( L.marker.pin.categories ( ).getAt ( 2 ).CategoryId ).toBe ( 'TEST03' );
	} );
	
	it ( "06 - L.marker.pin.categories ( ).getAt ( 0..2 ).CategoryId return 'TEST03', 'TEST01', 'TEST02' when L.marker.pin.translator ( ).UserLanguage = 'fr' and adter running L.marker.pin.categories ( ).sort ( )", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'fr';
		L.marker.pin.categories ( ).sort ( );
		expect ( L.marker.pin.categories ( ).getAt ( 0 ).CategoryId ).toBe ( 'TEST03' );
		expect ( L.marker.pin.categories ( ).getAt ( 1 ).CategoryId ).toBe ( 'TEST01' );
		expect ( L.marker.pin.categories ( ).getAt ( 2 ).CategoryId ).toBe ( 'TEST02' );
	} );
	
	it ( "07 - L.marker.pin.categories ( ).getAt ( 0..2 ).CategoryId return 'TEST03', 'TEST01', 'TEST02' when L.marker.pin.translator ( ).UserLanguage = 'nl' and adter running L.marker.pin.categories ( ).sort ( )", function ( ) {
		L.marker.pin.translator ( ).UserLanguage = 'nl';
		L.marker.pin.categories ( ).sort ( );
		expect ( L.marker.pin.categories ( ).getAt ( 0 ).CategoryId ).toBe ( 'TEST02' );
		expect ( L.marker.pin.categories ( ).getAt ( 1 ).CategoryId ).toBe ( 'TEST03' );
		expect ( L.marker.pin.categories ( ).getAt ( 2 ).CategoryId ).toBe ( 'TEST01' );
	} );

	it ( "08 - L.marker.pin.categories ( ).getCategory ( ) tests", function ( ) {
		expect ( L.marker.pin.categories ( ).getCategory ( 'TEST01' ).CategoryId ).toBe ( 'TEST01' );
		expect ( L.marker.pin.categories ( ).getCategory ( 'TEST02' ).CategoryId ).toBe ( 'TEST02' );
		expect ( L.marker.pin.categories ( ).getCategory ( 'TEST03' ).CategoryId ).toBe ( 'TEST03' );
		expect ( L.marker.pin.categories ( ).getCategory ( 'TEST04' ) ).toBeUndefined ( );
	} );
	
	/* addDefaultCategories ( ) tests */
	
	it ( "09 - L.marker.pin.categories ( ).length return 3 before and 31 after running L.marker.pin.categories ( ).addDefaultCategories ( )", function ( ) {
		expect ( L.marker.pin.categories ( ).length ).toBe ( 3 );
		L.marker.pin.categories ( ).addDefaultCategories ( );
		expect ( L.marker.pin.categories ( ).length ).toBe ( 31 );
	} );

} );
