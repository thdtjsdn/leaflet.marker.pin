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

( function ( ){
	
	'use strict';
	
	if ( typeof module !== 'undefined' && module.exports ) {
		require ('./L.Marker.Pin' );
	}

	/* 
	--- L.Marker.Pin.Interface object --------------------------------------------------------------------------------------
	
	This object contains all you need to use pins :-)
	
	Patterns : Closure

	Doc reviewed 20160105
	Tests done 20160104
	
	------------------------------------------------------------------------------------------------------------------------
	*/

	L.Marker.Pin.getInterface = function ( ) {

		/* --- private properties --- */
		
		var _Translator;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Translator = require ('./L.Marker.Pin.Translator' );
		}
		else {
			_Translator = L.marker.pin.translator ( );
		}
		
		var _Categories;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Categories = require ('./L.Marker.Pin.Categories' );
		}
		else {
			_Categories = L.marker.pin.categories ( );
		}
		
		var _Pins;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Pins = require ('./L.Marker.Pin.Pins' );
		}
		else {
			_Pins = L.marker.pin.pins ( );
		}

		return {


			/* --- public methods --- */

			addControl : function ( Map, options ) {
				if ( typeof module !== 'undefined' && module.exports ) {
					Map.addControl ( require ('./L.Marker.Pin.Control' ) ( options ) );
				}
				else {
					Map.addControl ( L.marker.pin.control ( options ) );
				}
			},
			
		
			/* 
			--- newPin ( Map, latlng ) method --- 
			
			This method show the new pin dialog on the screen and add a new pin to the map at the given position.
			
			Parameters : 
			
			- Map : the L.Map object to witch the pin must be added
			
			- latlng : a L.LatLng object with the position of the pin on the map

			*/

			newPin : function ( Map, latlng ) {
				var EditDialog;
				if ( typeof module !== 'undefined' && module.exports ) {
					EditDialog = require ('./L.Marker.Pin.EditDialog' );
				}
				else {
					EditDialog = L.marker.pin.editdialog ;
				}
				
				new EditDialog ( 
					Map, 
					latlng,
					{
						text : '',
						phone : '',
						url : '',
						address : '',
						exist : false,
					}
				).show ( );
			},
			
			/*
			--- addDefaultCategories ( ) method --- 
			
			This method add the default categories

			*/

			addDefaultCategories : function ( ) {
				_Categories.addDefaultCategories ( );
			},
		
			/* 
			--- addCategory ( CategoryId, CategoryNames, CategoryIcon ) method --- 
			
			See the documentation of the L.Marker.Pin.Categories.addCategory ( ) method in the file L.Marker.Pin.Categories.js

			*/

			addCategory : function ( CategoryId, CategoryNames, CategoryIcon ) {
				return _Categories.addCategory ( CategoryId, CategoryNames, CategoryIcon );
			},

			/* 
			--- addTranslation ( TextId, UserLanguage, Translation ) method --- 
			
			See the documentation of the L.Marker.Pin.Translator.addTranslation ( ) method in the file L.Marker.Pin.Translator.js

			Sample of translation to a new language
				
				// ...for the popup ...
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.Address',  'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.Phone', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.Link', 'de', 'Lorem ipsum...' );
				// ... for the context menu ...
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.ContextMenu.EditPin', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.ContextMenu.DeletePin', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.ContextMenu.CloseMenu', 'de', 'Lorem ipsum...' );
				// ... for the edit pin dialog ...
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.PinModification', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.NewPin', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.Text', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.Address', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.Phone', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.Link', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.Category', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.Ok', 'de', 'Lorem ipsum...' );
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.EditDialog.Cancel', 'de', 'Lorem ipsum...' );	
				// ...for the default categories from 01 ...
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.Category.01', 'de', 'Lorem ipsum...' );	
				// ... to 27...
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.Category.27', 'de', 'Lorem ipsum...' );	

			*/	
			
			addTranslation : function ( TextId, UserLanguage, Translation ) {
				return _Translator.addTranslation ( TextId, UserLanguage, Translation );
			},

			/* 
			--- addTranslations ( TextId, Translations ) method --- 
			
			This method add a translation for a text in multiple languages.
			
			Parameters:
			- TextId : the unique identifier of the text.
			- Translations : the translated text. Must be an object like  { 'fr' : 'Rue', 'nl' : 'Straat', 'en' : 'Street' }.

			Return value:
			- returns true when the text is added.
			- returns false when the TextId is already used.
			
			*/

			addTranslations : function ( TextId, Translations ) {
				return _Translator.addTranslations ( TextId, Translations );
			},
			/* 
			--- getText ( TextId ) method --- 
			
			This method gives the text identified by TextId in the current user language.
			
			Parameters : 
			- TextId : a unique identifier for the asked text
			
			Return :
			- the text identified by TextId in the current user language when found
			- the text identified by TextId in 'en' when not found in the current user language
			- '???' when the text identified by TextId when not found in the current user language or 'en'
			- '???' when TextId is not found
			*/

			getText : function ( TextId ) {
				return _Translator.getText ( TextId );
			},

			/* 
			--- setCallbackFunction ( CallbackFunction ) method --- 
			
			See the documentation of the L.Marker.Pin.Pins.setCallbackFunction ( ) method in the file L.Marker.Pin.Pins.js

			*/

			setCallbackFunction : function ( CallbackFunction )	{
				_Pins.setCallbackFunction ( CallbackFunction );
			},

			/* 
			--- stringifyPins ( ) method --- 
			
			See the documentation of the L.Marker.Pin.Pins.stringify ( ) method in the file L.Marker.Pin.Pins.js
			
			*/

			stringifyPins : function ( ) {
				return _Pins.stringify ( );
			},

			/* 
			--- parsePins ( PinsJsonString, Map ) method --- 
			
			See the documentation of the L.Marker.Pin.Pins.parse ( ) method in the file L.Marker.Pin.Pins.js
			
			*/
		
			parsePins : function ( PinsJsonString, Map ) {
				_Pins.parse ( PinsJsonString, Map );
			},
	
			/* --- public properties --- */
			
			/* 
			--- Release  ---
			
			The relase number - read only

			*/
			get Release ( ) { return '1.2.0'; },

			/* 
			--- UserLanguage  ---
			
			The language used for the translations

			*/
			
			get UserLanguage ( ) { return _Translator.UserLanguage ; },
			set UserLanguage ( newUserLanguage ) { 
				_Translator.UserLanguage = newUserLanguage ;
				_Categories.sort ( );
			},
			
			get PinsHtmlElement ( ) {
				return _Pins.asHtmlElement (
					{ 
						mainElement : 'div',
						mainClass : "Pin-Print-Main" , 
						pinElement : 'div',
						pinClass : "Pin-Print-Pin" , 
						categoryElement : 'div',
						categoryClass : "Pin-Print-Category" , 
						textElement : 'div',
						textClass : "Pin-Print-Text" , 
						addressElement : 'div',
						addressClass : "Pin-Print-Address" , 
						phoneElement : 'div',
						phoneClass : "Pin-Print-Phone" , 
						urlElement : 'div',
						urlClass : "Pin-Print-Url" , 
					}
				);
			}
		};
	};

	L.marker.pin.interface = function ( ) {
		return L.Marker.Pin.getInterface ( );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.interface;
	}
	
	/* --- End of L.Marker.Pin.Interface object --- */		

}());
