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

( function ( ) {

	'use strict';

	/* 
	--- L.Marker.Pin.Category object ---------------------------------------------------------------------------------------
	
	Patterns : Closure

	Doc reviewed 20160110
	Tests done 20160110

	------------------------------------------------------------------------------------------------------------------------
	*/
	
	/* 
	--- getCategory ( CategoryId, CategoryNames, CategoryIcon ) function --- 
	
	This function creates a new category.

	Parameters :
	- CategoryId : a unique identifier for this category.
	- CategoryNames : the name of the category in the different languages. Must be an object like { 'en' : 'Airport', 'fr' : 'Aéroport', 'nl' : 'Luchthaven', }.
	- CategoryIcon : a L.Icon object used for all the pins linked to this category.

	Return : 
	- the new category
	
	*/
		

	L.Marker.Pin.getCategory = function ( CategoryId, CategoryNames, CategoryIcon ) {
		
		/* --- private properties --- */
		var _Translator;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Translator = require ('./L.Marker.Pin.Translator' );
		}
		else {
			_Translator = L.marker.pin.translator ( );
		}

		if ( ! _Translator.addTranslations ( 'L.Marker.Pin.Category.' + CategoryId , CategoryNames ) ) {
			return false;
		}

		var _CategoryId = CategoryId; // The category id. Must be unique!

		var _CategoryIcon = CategoryIcon; // the icon used for this category. See the Leaflet documentation.

		return {

			/* --- public properties --- */
			
			/* 
			--- CategoryName  --- 
			
			The category name in the user language - read only.
			See also the L.Marker.Pin.Translator.js documentation
			
			*/
		
			get CategoryName ( ) { return _Translator.getText ( 'L.Marker.Pin.Category.' + _CategoryId );},

			/* 
			--- CategoryId  --- 
			
			The unique identifier for this category - read only
			
			*/

			get CategoryId ( ) { return _CategoryId; },

			/* 
			--- CategoryIcon --- 
			
			The L.Icon object used for this category  - read only
			
			*/

			get CategoryIcon ( ) { return _CategoryIcon;},
		};
	};

	L.marker.pin.category = function ( CategoryId, CategoryNames, CategoryIcon ) {
		return L.Marker.Pin.getCategory ( CategoryId, CategoryNames, CategoryIcon );
	};

	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.category;
	}

	/* --- End of L.Marker.Pin.Category object --- */
		
} ) ( );
