(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
	--- L.Marker.Pin.Categories object -------------------------------------------------------------------------------------
	
	This object is a collection of the pin's categories 

	Patterns : Closure and Singleton.
	
	Doc reviewed 20160102
	Tests done 20160110
	
	------------------------------------------------------------------------------------------------------------------------
	*/

	/* --- private properties outside of the constructor due to the singleton pattern --- */

	var _PinCategories = [];

	/* 
	--- getCategories ( ) function --- 
	
	This function gives a collection of the created categories
	
	*/

	L.Marker.Pin.getCategories = function ( ) {
		
		/* --- private properties --- */
		var _Translator;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Translator = require ('./L.Marker.Pin.Translator' );
		}
		else {
			_Translator = L.marker.pin.translator ( );
		}
					
		return {

			/* --- public methods --- */

			/* 
			--- sort ( ) method --- 
			
			This method sort the categories on the category name.
			The user language is used to select the correct name
			and taking account of the local settings for the sort
			
			*/
			
			sort : function ( ) {
				_PinCategories = _PinCategories.sort ( 
					function ( a, b ) {
						return a.CategoryName.localeCompare 
						( 
							b.CategoryName,
							_Translator.UserLanguage
						);
					} 
				);
			},

			/* 
			--- addCategory ( CategoryId, CategoryNames, CategoryIcon ) method --- 
			
			This method add a category to the collection
			
			Parameters :
			- CategoryId : a unique identifier for this category.
			- CategoryNames : the name of the category in the different languages. Must be an object like { 'en' : 'Airport', 'fr' : 'Aéroport', 'nl' : 'Luchthaven', }.
			- CategoryIcon : a L.Icon object used for all the pins linked to this category.
			
			Return :
			- true when the category is successfully added to the collection
			- false otherwise ( = when the CategoryId is already used or the Category cannot be created )
			
			*/
			
			addCategory : function ( CategoryId, CategoryNames, CategoryIcon ) {
				var NewCategory;
				if ( ! this.getCategory ( CategoryId ) ) {
					if ( typeof module !== 'undefined' && module.exports ) {
						NewCategory =  require ( './L.Marker.Pin.Category' ) ( CategoryId, CategoryNames, CategoryIcon );
					}
					else {
						NewCategory = L.marker.pin.category ( CategoryId, CategoryNames, CategoryIcon );
					}
					if ( ! NewCategory ) {
						return false;
					}
					else
					{
						_PinCategories.push ( NewCategory );
						this.sort ( );
						return true;
					}
				}
				else {
					console.log ( 'CategoryId ' + CategoryId + ' is already used' );
					return false;
				}
			},
			
			/* 
			--- getAt ( Position ) method --- 
			
			Parameters :
			- Position : the index of the category to search.
			Return :
			- The category at the given index.
			
			*/
			
			getAt : function ( Position ) { return _PinCategories [ Position ]; },
			
			/* 
			--- getCategory ( CategoryId ) method --- 
			
			This method returns the category with the given id or undefined when an bad CategoryId is given.
			Parameters :
			- CategoryId : the unique identifier of the category to search.
			Return :
			- The category at the given index.
			- undefined when the category is not found.
			*/
			
			getCategory : function ( CategoryId ) { 
				for ( var Counter = 0; Counter < _PinCategories.length; Counter++ )
				{
					if ( _PinCategories [ Counter].CategoryId === CategoryId )
					{
						return _PinCategories [ Counter];
					}
				}
				return undefined;
			},

			/* 
			--- addDefaultCategories ( ) method --- 
			
			This method creates the default categories
			
			*/
			addDefaultCategories : function ( )
			{
				this.addCategory ( '01', { 'en' : 'Airport', 'fr' : 'Aéroport', 'nl' : 'Luchthaven', }, L.icon ( { iconUrl: 'img/0001.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '02', { 'en' : 'Ascent', 'fr' : 'Montée', 'nl' : 'Helling', }, L.icon ( { iconUrl: 'img/0002.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '03', { 'en' : 'ATM', 'fr' : 'Distributeur de billets', 'nl' : 'Giromaat', }, L.icon ( { iconUrl: 'img/0003.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '04', { 'en' : 'Attention', 'fr' : 'Attention requise', 'nl' : 'Pas op', }, L.icon ( { iconUrl: 'img/0004.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '05', { 'en' : 'Bikes admitted', 'fr' : 'Vélos admis', 'nl' : 'Fiets welkom', }, L.icon ( { iconUrl: 'img/0005.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '06', { 'en' : 'Bus', 'fr' : 'Autobus', 'nl' : 'Bus', }, L.icon ( { iconUrl: 'img/0006.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '07', { 'en' : 'Picture', 'fr' : 'Photo', 'nl' : 'Foto', }, L.icon ( { iconUrl: 'img/0007.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '08', { 'en' : 'Camping', 'fr' : 'Camping', 'nl' : 'Camping', }, L.icon ( { iconUrl: 'img/0008.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '09', { 'en' : 'Ferry', 'fr' : 'Ferry', 'nl' : 'Veerboot', }, L.icon ( { iconUrl: 'img/0009.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '10', { 'en' : 'Youth hostel', 'fr' : 'Auberge de jeunesse', 'nl' : 'Jeugdherberg', }, L.icon ( { iconUrl: 'img/0010.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '11', { 'en' : 'Information point', 'fr' : 'Point d\'information', 'nl' : 'Informatiepunt', }, L.icon ( { iconUrl: 'img/0011.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '12', { 'en' : 'National park', 'fr' : 'Parc national', 'nl' : 'Nationaal park', }, L.icon ( { iconUrl: 'img/0012.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '13', { 'en' : 'Bike not authorized', 'fr' : 'Vélos mal vus', 'nl' : 'Fiets niet welkom', }, L.icon ( { iconUrl: 'img/0013.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '14', { 'en' : 'Regional park', 'fr' : 'Parc régional', 'nl' : 'Gewestelijk natuurpark', }, L.icon ( { iconUrl: 'img/0014.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '15', { 'en' : 'Repair', 'fr' : 'Entretien vélo', 'nl' : 'Rijwielhersteller', }, L.icon ( { iconUrl: 'img/0015.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '16', { 'en' : 'Shop', 'fr' : 'Magasin', 'nl' : 'Winkel', }, L.icon ( { iconUrl: 'img/0016.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '17', { 'en' : 'Help', 'fr' : 'Aide', 'nl' : 'Hulp', }, L.icon ( { iconUrl: 'img/0017.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '18', { 'en' : 'Stop', 'fr' : 'Stop', 'nl' : 'Stop', }, L.icon ( { iconUrl: 'img/0018.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '19', { 'en' : 'Table', 'fr' : 'Table', 'nl' : 'Tafel', }, L.icon ( { iconUrl: 'img/0019.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '20', { 'en' : 'Toilets', 'fr' : 'Toilettes', 'nl' :'Toilet', }, L.icon ( { iconUrl: 'img/0020.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '21', { 'en' : 'Railway station', 'fr' : 'Gare', 'nl' : 'Treinstation', }, L.icon ( { iconUrl: 'img/0021.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '22', { 'en' : 'Tunnel', 'fr' : 'Tunnel', 'nl' : 'Tunnel', }, L.icon ( { iconUrl: 'img/0022.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '23', { 'en' : 'Water point', 'fr' : 'Point d\'eau', 'nl' : 'Waterpunt', }, L.icon ( { iconUrl: 'img/0023.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '24', { 'en' : 'Bed and breakfast', 'fr' : 'Chambre d\'hotes', 'nl' : 'Bed and Breakfast', }, L.icon ( { iconUrl: 'img/0024.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '25', { 'en' : 'Coffe shop', 'fr' : 'Cafetaria ', 'nl' : 'Cafetaria ', }, L.icon ( { iconUrl: 'img/0025.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '26', { 'en' : 'Restaurant', 'fr' : 'Restaurant', 'nl' : 'Restaurant', }, L.icon ( { iconUrl: 'img/0026.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
				this.addCategory ( '27', { 'en' : 'Hostel', 'fr' : 'Hôtel', 'nl' : 'Hotel', }, L.icon ( { iconUrl: 'img/0027.png', iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] } ) );
			},
			
			/* --- public properties --- */
			
			/* 
			--- length  ---
			
			The number of categories in the collection - read only

			*/
			
			get length ( ) { return _PinCategories.length; },
			
		};
	};

	L.marker.pin.categories = function ( ) {
		return L.Marker.Pin.getCategories ( );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.categories ( );
	}
	
	/* --- End of L.Marker.Pin.Categories object --- */
	
} ) ( );

},{"./L.Marker.Pin.Category":2,"./L.Marker.Pin.Translator":7}],2:[function(require,module,exports){
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

},{"./L.Marker.Pin.Translator":7}],3:[function(require,module,exports){
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

(function ( ) {

	'use strict';

	/* 
	--- L.Marker.Pin.ContextMenu function -------------------------------------------------------------------------------------
	
	This function display the context menu when the user right click on a pin 

	Doc reviewed 20160111
	No automated unit tests for this function
	
	------------------------------------------------------------------------------------------------------------------------
	*/
	
	L.Marker.Pin.ContextMenu = function ( MouseEvent ) {
		// Variables creation
		var _Translator;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Translator = require ('./L.Marker.Pin.Translator' );
		}
		else {
			_Translator = L.marker.pin.translator ( );
		}

		var Pin = MouseEvent.target;
		var Map = Pin.options.map;
		var options = {
			text : Pin.options.text,
			phone : Pin.options.phone,
			url : Pin.options.url,
			address : Pin.options.address,
			pinCategory : Pin.options.pinCategory,
			exist : true,
			pinObject : Pin
		};
				
		// menu creation		
		var MainDiv = L.DomUtil.create ( 'div', 'PinMenu-MainDiv' );

		// Edition button
		var EditPinButton = L.DomUtil.create ( 'button', 'PinMenu-EditPinButton', MainDiv );
		EditPinButton.setAttribute ( 'type' , 'button' );
		EditPinButton.innerHTML = _Translator.getText ( 'L.Marker.Pin.ContextMenu.EditPin' );

		var EditDialog;
		if ( typeof module !== 'undefined' && module.exports ) {
			EditDialog = require ('./L.Marker.Pin.EditDialog' );
		}
		else {
			EditDialog = L.marker.pin.editdialog ;
		}

		L.DomEvent.on ( 
			EditPinButton, 
			'click', 
			function ( ) 
			{ 
				Map.closePopup(); 
				new EditDialog ( Map, Pin.getLatLng(), options ).show ( );
			}
		);

		// Delete button
		var DeletePinButton = L.DomUtil.create ( 'button', 'PinMenu-DeletePinButton', MainDiv );
		DeletePinButton.setAttribute ( 'type' , 'button' );
		DeletePinButton.innerHTML = _Translator.getText ( 'L.Marker.Pin.ContextMenu.DeletePin' );
		L.DomEvent.on ( 
			DeletePinButton, 
			'click', 
			function ( ) 
			{ 
				Map.closePopup ( ); 
				var Pins;
				if ( typeof module !== 'undefined' && module.exports ) {
					Pins = require ('./L.Marker.Pin.Pins' );
				}
				else {
					Pins = L.marker.pin.pins ( );
				}
				Pins.remove ( Pin );
				Map.removeLayer( Pin ); 
			} 
		);

		// Cancel button
		var CancelPinButton = L.DomUtil.create( 'button', 'PinMenu-CancelPinButton', MainDiv );
		CancelPinButton.setAttribute( 'type' , 'button' );
		CancelPinButton.innerHTML = _Translator.getText ( 'L.Marker.Pin.ContextMenu.CloseMenu' );	
		L.DomEvent.on ( 
			CancelPinButton, 
			'click', function ( )
			{ 
				Map.closePopup ( ); 
			} 
		);

		// The dialog is displayed
		L.popup (
			{
				keepInView : true,
				closeButton : true,
				maxWidth : 400,
				className : 'PinMenu'
			}
		).setContent ( MainDiv ).setLatLng( Pin.getLatLng ( ) ).openOn( Map );
	};

	L.marker.pin.contextmenu = function ( MouseEvent ) {
		return new L.Marker.Pin.ContextMenu ( MouseEvent );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.contextmenu;
	}
	
	/* --- End of L.Marker.Pin.ContextMenu object --- */
	
} ) ( );
},{"./L.Marker.Pin.EditDialog":4,"./L.Marker.Pin.Pins":6,"./L.Marker.Pin.Translator":7}],4:[function(require,module,exports){
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
	--- L.Marker.Pin.EditDialog object -------------------------------------------------------------------------------------
	
	Patterns : Closure

	Doc reviewed 20160114
	No automated unit tests for this function
	
	------------------------------------------------------------------------------------------------------------------------
	*/
	
	L.Marker.Pin.getEditDialog  = function ( Map, latlng, options ) {
		
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
			_Categories = require ( './L.Marker.Pin.Categories' );
		}
		else {
			_Categories = L.marker.pin.categories ( );
		}
		
		var _MainDiv;
		var _TextInput;
		var _AddressInput;
		var _PhoneInput;
		var _UrlInput;
		var _CategorySelect;

		/* --- private methods --- */

		/* 
		--- _createDiv ( Class , Container, InnerHtml ) method --- 
		
		Helper method for html 'div' creation

		*/
		
		var _createDiv = function ( Class , Container, InnerHtml ) {
			var Div = L.DomUtil.create ( 'div', Class, Container );
			Div.innerHTML = InnerHtml;
			
			return Div;
		};
		
		/* End of _createDiv method */

		/* 
		--- _createButton ( Class, Label, Container ) method --- 
		
		Helper method for html 'button' creation

		*/

		var _createButton = function ( Class, Label, Container ) {
			var Button = L.DomUtil.create( 'button', Class, Container );
			Button.setAttribute( 'type' , 'button' );
			Button.innerHTML = Label;
			
			return Button;
		};

		/* End of _createButton method */

		/* 
		--- _createInput ( Type, Value, PlaceHolder, Container ) method --- 
		
		Helper method for html 'input' creation

		*/

		var _createInput = function ( Type, Value, PlaceHolder, Container ) {
			var Input = L.DomUtil.create( 'input', 'InputClass', Container );
			Input.setAttribute( 'type' , Type );
			Input.setAttribute( 'value' , Value );
			Input.setAttribute( 'placeholder', PlaceHolder );
			
			return Input;
		};
		
		/* End of _createInput method */

		/* 
		--- _createSelect ( Container ) method --- 
		
		Helper method for html 'select' creation

		*/

		var _createSelect = function ( Container ) {
			var Select = L.DomUtil.create( 'select', 'SelectClass', Container );
			
			return Select;
		};

		/* End of _createSelect method */

		/* 
		--- _createOption ( Value, Container ) method --- 
		
		Helper method for html 'option' creation

		*/

		var _createOption = function ( Value, Container ) {
			var Option = L.DomUtil.create( 'option', '', Container );
			Option.innerHTML = Value;
			
			return Option;
		};

		/* End of _createOption method */

		/* 
		--- _addPinToMap ( ) method --- 
		
		This method creates the pin and add it to the map and the pins collection

		*/

		var _addPinToMap = function ( ) {

			Map.closePopup(); 

			// ... A new pin is created...
			var getPin;
			if ( typeof module !== 'undefined' && module.exports ) {
				getPin = require ('./L.Marker.Pin' );
			}
			else {
				getPin = L.marker.pin;
			}

			var Pin = getPin (
				latlng,
				{
					icon : _Categories.getAt ( _CategorySelect.selectedIndex ).CategoryIcon,
					draggable : true,
					className : 'Pin',
					title : _Categories.getAt ( _CategorySelect.selectedIndex ).CategoryName,
					phone : _PhoneInput.value,
					url : _UrlInput.value,
					text : _TextInput.value,
					address : _AddressInput.value,
					pinCategory : _Categories.getAt ( _CategorySelect.selectedIndex ),
					map : Map,
				}
			);

			// ... and added to the pin's collection ...
			var Pins;
			if ( typeof module !== 'undefined' && module.exports ) {
				Pins = require ('./L.Marker.Pin.Pins' );
			}
			else {
				Pins = L.marker.pin.pins ( );
			}
			Pins.push ( Pin );

			// ... a popup and events are added to the pin ...
			Pin.bindPopup ( Pin.getHtml ( ) ).addTo ( Map );
			
			var ContextMenu;
			if ( typeof module !== 'undefined' && module.exports ) {
				ContextMenu = require ('./L.Marker.Pin.ContextMenu' );
			}
			else {
				ContextMenu = L.marker.pin.contextmenu;
			}
			Pin.on ( 'contextmenu', ContextMenu ); 
			Pin.on ( 'dragend', Pins.CallbackFunction ); 

			if ( options.exist ) {
				// The dialog was open for edition. The old pin is 
				// removed from the map and from the pin's collection
				Pins.remove ( options.pinObject );
				Map.removeLayer( options.pinObject );
			}
		};

		/* End of _addPinToMap method */
		
		/* 
		--- _createDialog ( ) method --- 
		
		This method creates the dialog

		*/
		
		var _createDialog = function ( ) {
			//... main div ...
			_MainDiv = L.DomUtil.create ( 'div','PinEditDialog-MainDiv' );
			_MainDiv.innerHTML = options.exist ? _Translator.getText ('L.Marker.Pin.EditDialog.PinModification' ) : _Translator.getText ('L.Marker.Pin.EditDialog.NewPin' );
			
			// ... input...
			var TextDiv = _createDiv ( 'PinEditDialog-TextDiv', _MainDiv, _Translator.getText ('L.Marker.Pin.EditDialog.Text') + '&nbsp;:&nbsp;' );
			_TextInput = _createInput ( 'text', options.text, '', TextDiv );
					
			var AddressDiv = _createDiv ( 'PinEditDialog-AddressDiv', _MainDiv, _Translator.getText ('L.Marker.Pin.EditDialog.Address') + '&nbsp;:&nbsp;' );
			_AddressInput = _createInput ( 'text', options.address, 'Havée du Renard Hout-si-Plou', AddressDiv );	

			var PhoneDiv = _createDiv ( 'PinEditDialog-PhoneDiv', _MainDiv, _Translator.getText ('L.Marker.Pin.EditDialog.Phone') + '&nbsp;:&nbsp;' );
			_PhoneInput = _createInput ( 'tel', options.phone, '+32 12 13 15 14', PhoneDiv );

			var UrlDiv = _createDiv ( 'PinEditDialog-UrlDiv', _MainDiv, _Translator.getText ('L.Marker.Pin.EditDialog.Link') + '&nbsp;:&nbsp;' );
			_UrlInput = _createInput ( 'url', options.url, 'http://www.ouaie.be', UrlDiv );
			
			// ...select...
			var CategoryDiv = _createDiv ( 'PinEditDialog-CategoryDiv', _MainDiv, _Translator.getText ('L.Marker.Pin.EditDialog.Category') + '&nbsp:&nbsp;' );
			_CategorySelect = _createSelect ( CategoryDiv );
					
			for (var Counter = 0; Counter < _Categories.length; Counter++) {
				var Option = _createOption ( _Categories.getAt ( Counter ).CategoryName, _CategorySelect );
				if ( options.pinCategory && _Categories.getAt ( Counter ).CategoryId === options.pinCategory.CategoryId ) {
					Option.setAttribute ( 'selected', true );
				}
			}

			// ... and buttons
			var ButtonsDiv = L.DomUtil.create ( 'div', 'PinEditDialog-ButtonsDiv', _MainDiv );
			var	OkButton = _createButton ( 'PinEditDialog-OkButton', _Translator.getText ('L.Marker.Pin.EditDialog.Ok'), ButtonsDiv );
			
			// Event on the ok button...
			L.DomEvent.on ( 
				OkButton,
				'click',
				_addPinToMap
			);
			
			var	CancelButton = _createButton ( 'PinEditDialog-CancelButton', _Translator.getText ('L.Marker.Pin.EditDialog.Cancel'), ButtonsDiv );
			// Event on the cancel button
			L.DomEvent.on ( 
				CancelButton, 
				'click', 
				function ( ) { 
					Map.closePopup ( );
				}
			);	

			// Call to nominatim for the geocoding
			_NominatimCall ( );
		};

		/* End of _createDialog method */
		
		/*
		--- _NominatimCallback ( NominatimJsonResponse ) method --- 
		Callback function for the geocoding of the pin
		Because we use asynchronous http request to Nominatim,
		a callback function is needed to analyse the Nominatim response
		
		Parameters :
		- NominatimJsonResponse : the Nominatim response in the JSON format
		
		*/

		var _NominatimCallback = function ( NominatimJsonResponse ) {
			var Address = '';
			
			// The Nominatim response is parsed
			var NominatimResponse = JSON.parse( NominatimJsonResponse );
			
			// House number is added
			if ( undefined !== NominatimResponse.address.house_number ) {
				Address += NominatimResponse.address.house_number + ' ';
			}
			
			// Street name...
			if ( undefined !== NominatimResponse.address.road ) {
				Address += NominatimResponse.address.road + ' ';
			}
			// or pedestrian name is added
			else if ( undefined !== NominatimResponse.address.pedestrian ) {
				Address += NominatimResponse.address.pedestrian + ' ';
			}
			
			// Separator
			if ( 0 < Address.length ) {
				Address += '- ';
			}
			
			// City name. This can be 'village' or 'town' or 'city' in the Nomination response!
			if ( undefined !== NominatimResponse.address.village ) {
				Address += NominatimResponse.address.village;
			}
			else if ( undefined !== NominatimResponse.address.town ) {
				Address += NominatimResponse.address.town;
			}
			else if ( undefined !== NominatimResponse.address.city ) {
				Address += NominatimResponse.address.city;
			}
			
			// If nothing found previously, the country is added
			if ( 0 === Address.length ) {
				Address += NominatimResponse.address.country;
			}
			
			// Address is added to the dialog if found
			if ( 0 < Address.length ) {
				_AddressInput.value = Address;
			}
		};

		/* End of _NominatimCallback method */
		
		/* 
		--- _NominatimCall ( ) method --- 
		
		This method call the Nominatim web service

		*/

		var _NominatimCall = function ( ) {
			if ( ! options.exist ) {
				// http request to Nominatim to performs the Geocoding of the pin.
				// To avoid to much call to Nominatim with the same position,
				// the call is only performed when it's a new pin
				var NominatimUrl = 
					'http://nominatim.openstreetmap.org/reverse?format=json&lat=' +
					latlng.lat +
					'&lon=' +
					latlng.lng +
					'&zoom=' +
					Map.getZoom ( ) +
					'&addressdetails=1&accept-language=' +
					_Translator.UserLanguage +
					'&osm_type=W';
				var XmlHttpRequest = new XMLHttpRequest ( );
				XmlHttpRequest.onreadystatechange = function ( ) { 
					if ( XmlHttpRequest.readyState == 4 && XmlHttpRequest.status == 200 ) {
						_NominatimCallback ( XmlHttpRequest.responseText );
					}
				};  
				XmlHttpRequest.open ( "GET", NominatimUrl, true );
				XmlHttpRequest.send ( null );
			}
		};
		
		/* End of _NominatimCall function */
		
		return {	

			/* --- public methods --- */

			/* 
			--- show ( ) method --- 
			
			This method show the dialog on the map
			
			*/

			show : function ( ) {
				_createDialog ( );
				
				// The dialog is displayed
				L.popup (
					{
						keepInView : true,
						closeButton : true,
						maxWidth : 400,
						className : 'PinEditDialog'
					}
				).setContent ( _MainDiv ).setLatLng( latlng ).openOn( Map );
			}
		};
	};

	L.marker.pin.editdialog = function ( Map, latlng, options ) {
		return new L.Marker.Pin.getEditDialog ( Map, latlng, options );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.editdialog;
	}

	/* --- End of L.Marker.Pin.EditDialog object --- */
	
} ) ( );
},{"./L.Marker.Pin":8,"./L.Marker.Pin.Categories":1,"./L.Marker.Pin.ContextMenu":3,"./L.Marker.Pin.Pins":6,"./L.Marker.Pin.Translator":7}],5:[function(require,module,exports){
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
			get Release ( ) { return '1.1.0'; },

			/* 
			--- UserLanguage  ---
			
			The language used for the translations

			*/
			
			get UserLanguage ( ) { return _Translator.UserLanguage ; },
			set UserLanguage ( newUserLanguage ) { 
				_Translator.UserLanguage = newUserLanguage ;
				_Categories.sort ( );
			},
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

},{"./L.Marker.Pin":8,"./L.Marker.Pin.Categories":1,"./L.Marker.Pin.EditDialog":4,"./L.Marker.Pin.Pins":6,"./L.Marker.Pin.Translator":7}],6:[function(require,module,exports){
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
	--- L.Marker.Pin.Pins object -----------------------------------------------------------------------------------------------
	
	This object is a collection of all pins added to the map
	
	Patterns : Closure and Singleton.

	Doc reviewed 20160111
	No automated unit tests for this object
	
	------------------------------------------------------------------------------------------------------------------------
	*/

	/* --- private properties outside of the constructor due to the singleton pattern --- */

	var _Pins = []; // the pin's collection
	var _NextPinId = 0; // The next pin id to use
	var _CallbackFunction = function ( ) {console.log ( '_CallbackFunction ( )');};
	
	/* 
	--- getPins ( ) function --- 
	
	This function gives a collection of the created pins
	
	*/

	L.Marker.Pin.getPins = function () {
		return {
	
			/* --- public methods --- */
			
			/* 
			--- CallbackFunction ( ) method --- 
			
			This method do nothing but can be overriden in other code.
			The CallbackFunction is called each time a pin is added, deleted, edited or dragged
			*/

			CallbackFunction : function ( ) { _CallbackFunction ( ); },
			

			/* 
			--- setCallbackFunction ( ) method --- 
			
			This method is used to change the Callback function
			*/

			setCallbackFunction : function ( CallbackFunction ) { 
				_CallbackFunction = CallbackFunction;
			},

			/* 
			--- push ( Pin ) method --- 
			
			this method add a pin to the collection
			
			Parameters : 
			- Pin : the L.Marker.Pin object to add to the collection
			
			*/

			push : function ( Pin ) {
				Pin.options.pinId = _NextPinId++;
				_Pins.push ( Pin );
				this.CallbackFunction ( );
			},

			/* 
			--- remove ( Pin ) method --- 
			
			this method remove a pin from the collection
			
			Parameters : 
			- Pin : the L.Marker.Pin object to remove from the collection

			*/

			remove : function ( Pin ) {
				for ( var Counter = 0; Counter < _Pins.length ; Counter++ )
				{
					if ( _Pins [ Counter ].options.pinId === Pin.options.pinId ) {
						_Pins.splice ( Counter, 1 );
						this.CallbackFunction ( );
						break;
					}
				}
			},

			/* 
			--- stringify ( ) method --- 
			
			This method transforms the pin's collection into a JSON chain.
			Because this chain can be used in the URL, we try to have a short chain...
			
			Return :
			- A JSON string with all the pins present on the map
			
			*/

			stringify : function ( ) {
				var PinsData = [];
				for ( var Counter = 0; Counter < _Pins.length; Counter++ ) {
					var LatLng =
						_Pins [ Counter ].getLatLng ( ).lat.toLocaleString ( 'en', { minimumFractionDigits : 5, maximumFractionDigits : 5}) +
						',' +
						_Pins [ Counter ].getLatLng ( ).lng.toLocaleString ( 'en', { minimumFractionDigits : 5, maximumFractionDigits : 5});
					var PinData = {
						l : LatLng,
						/*pin*/c/*ategoryId*/ : _Pins [ Counter ].options.pinCategory.CategoryId,
					};
					if ( _Pins [ Counter ].options.text && 0 < _Pins [ Counter ].options.text.length  ) {
						PinData.t/*ext*/ = _Pins [ Counter ].options.text;
					}
					if ( _Pins [ Counter ].options.phone && 0 < _Pins [ Counter ].options.phone.length  ) {
						PinData.p/*hone*/ = _Pins [ Counter ].options.phone;
					}
					if ( _Pins [ Counter ].options.url && 0 < _Pins [ Counter ].options.url.length  ) {
						PinData.u/*rl*/ = _Pins [ Counter ].options.url;
					}
					if ( _Pins [ Counter ].options.address && 0 < _Pins [ Counter ].options.address.length  ) {
						PinData.a/*ddress*/ = _Pins [ Counter ].options.address;
					}
					
					PinsData.push ( PinData );
				}
				return JSON.stringify ( PinsData );
			},
			
			/* 
			--- parse ( JsonString, Map ) method --- 
			
			This method parse a JSON chain created by the stringify ( ) method,
			creates the corresponding pins and add it to the map.
			
			Parameters :
			- JsonString : the JSON string
			- Map : the L.Map object to witch the pins are added
			*/
			parse : function ( JsonString, Map ) {
				// the collection is emptied...
				_Pins = [];
				// The JSON string is parsed
				var PinsData = JSON.parse( JsonString );
				for ( var Counter = 0; Counter < PinsData.length ; Counter++) {
					// loop on the results
					var PinData = PinsData [ Counter ];
					
					// a L.LatLng object is created
					var StringLatLng = PinData.l.split ( ','); 
					
					// the category is searched in the categories collection
					var Category = L.marker.pin.categories ( ).getCategory ( PinData.c );
					if ( ! Category ) {
						continue;
					}
					// and the pin created
					var Pin = new L.Marker.Pin (
						L.latLng ( parseFloat (StringLatLng [ 0 ]), parseFloat (StringLatLng [ 1 ] ) ),
						{
							icon : Category.CategoryIcon,
							draggable : true,
							className : 'Pin',
							title : Category.CategoryName,
							phone : ( PinData.p ? PinData.p : '' ),
							url : ( PinData.u ? PinData.u : '' ),
							text : ( PinData.t ? PinData.t : '' ),
							address : ( PinData.a ? PinData.a : '' ),
							pinCategory : Category,
							map : Map,
							pinId : _NextPinId++
						}
					);
					_Pins.push ( Pin );
					Pin.bindPopup ( Pin.getHtml ( ) ).addTo ( Map );
					var ContextMenu;
					if ( typeof module !== 'undefined' && module.exports ) {
						ContextMenu = require ('./L.Marker.Pin.ContextMenu' );
					}
					else {
						ContextMenu = L.marker.pin.contextmenu;
					}
					Pin.on ( 'contextmenu', ContextMenu ); 
					Pin.on ( 'dragend', this.CallbackFunction ); 
				}
			},
		};
	};
	
	L.marker.pin.pins = function ( ) {
		return L.Marker.Pin.getPins ( );
	};
		
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.pins ( );
	}

	/* --- End of L.Marker.Pin.Pins object --- */

}) ( );	

},{"./L.Marker.Pin.ContextMenu":3}],7:[function(require,module,exports){
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

	if ( typeof module !== 'undefined' && module.exports ) require ( './L.Marker.Pin' );

	/*
	--- L.Marker.Pin.Translator object -------------------------------------------------------------------------------------

	This object is responsible for the translation of the messages
	
	Patterns : Closure and Singleton.
	
	Doc reviewed 20160103
	Tests done 20160103
	
	------------------------------------------------------------------------------------------------------------------------
	*/

	/* --- private properties outside of the constructor due to the singleton pattern --- */
	
	var _UserLanguage = 'fr';
	
	var _Translations  =
	{
		/* --- L.Marker.Pin object translation --- */
		'L.Marker.Pin.Address' : 
		{
			'fr' : 'Adresse',
			'en' : 'Address',
			'nl' : 'Adres',
		},
		'L.Marker.Pin.Phone' :  
		{
			'fr' : 'Téléphone',
			'en' : 'Phone',
			'nl' : 'Telefoon',
		},
		'L.Marker.Pin.Link' : 
		{
			'fr' : 'Lien',
			'en' : 'Link',
			'nl' : 'Link',
		},
		/* --- L.Marker.Pin.ContextMenu object translation --- */
		'L.Marker.Pin.ContextMenu.EditPin' : 
		{
			'fr' : 'Éditer cette épingle',
			'en' : 'Edit this pin',
			'nl' : 'Vlag veranderen',
		},
		'L.Marker.Pin.ContextMenu.DeletePin' :
		{
			'fr' : 'Supprimer cette épingle',
			'en' : 'Delete this pin',
			'nl' : 'Vlag wissen',
		},
		'L.Marker.Pin.ContextMenu.CloseMenu' : 
		{
			'fr' : 'Fermer ce menu',
			'en' : 'Close this menu',
			'nl' : 'Venster sluiten',
		},
		/* --- L.Marker.Pin.EditDialog object translation --- */
		'L.Marker.Pin.EditDialog.PinModification' : 
		{
			'fr' : 'Modification de l\'épingle',
			'en' : 'Pin\'s modification',
			'nl' : 'Vlag veranderen',
		},
		'L.Marker.Pin.EditDialog.NewPin' : 
		{
			'fr' : 'Nouvelle épingle',
			'en' : 'New Pin',
			'nl' : 'Nieuwe vlag',
		},
		'L.Marker.Pin.EditDialog.Text' : 
		{
			'fr' : 'Texte',
			'en' : 'Text',
			'nl' : 'Tekst',
		},
		'L.Marker.Pin.EditDialog.Address' : 
		{
			'fr' : 'Adresse',
			'en' : 'Address',
			'nl' : 'Adres'
		},
		'L.Marker.Pin.EditDialog.Phone' : 
		{
			'fr' : 'Tél.',
			'en' : 'Phone',
			'nl' : 'Telefoon',
		},
		'L.Marker.Pin.EditDialog.Link' : 
		{
			'fr' : 'Lien',
			'en' : 'Link',
			'nl' : 'Link',
		},
		'L.Marker.Pin.EditDialog.Category' : 
		{
			'fr' : 'Catégorie',
			'en' : 'Category',
			'nl' : 'Categorie'
		},
		'L.Marker.Pin.EditDialog.Ok' : 
		{
			'fr' : 'Terminer',
			'en' : 'Ok',
			'nl' : 'Aannemen'
		},
		'L.Marker.Pin.EditDialog.Cancel' : 
		{
			'fr' : 'Abandonner',
			'en' : 'Cancel',
			'nl' : 'Annuleren'
		},
	};

	L.Marker.Pin.getTranslator = function ( ) {

		return {

			/* --- public methods --- */
			
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
				if ( ! _Translations [ TextId ] ) {
					console.log ( 'Invalid TextId : \'' + TextId + '\'.');
					return '???';
				}
				var UserLanguageEn = 'en';
				if ( _Translations [ TextId ] [ _UserLanguage ] ) { 
					return _Translations [ TextId ] [ _UserLanguage ];
				}
				else if ( _Translations [ TextId ] [ UserLanguageEn ] ) {
					return _Translations [ TextId ] [ UserLanguageEn ];
				}
				else {
					return '???';
				}
			},
		
			/* 
			--- addTranslation ( TextId, UserLanguage, Translation ) method --- 
			
			This method add a translation for a text in a specific language.
			
			Parameters:
			- TextId : the unique identifier of the text
			- UserLanguage : the language to be used
			- Translation : the translated text 

			Return value:
			- returns true when the translation is added
			- returns false when the TextId is not found
			- returns false when the TextId is already translated in the specified language
			
			*/

			addTranslation : function ( TextId, UserLanguage, Translation ) {
				if ( ! _Translations [ TextId ] ) {
					console.log ( 'Invalid TextId : \'' + TextId + '\'.');
					return false;
				}
				if ( _Translations [ TextId ] [ UserLanguage ] ) {
					console.log ( 'The translation to \'' + UserLanguage + '\' exists already for the TextId \'' + TextId  + '\'.');
					return false;
				}
				_Translations [ TextId ] [ UserLanguage ] = Translation;
				return true;
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
				if ( _Translations [ TextId ] ) {
					console.log ( 'The TextId : \'' + TextId + '\' is already used.');
					return false;
				}
				_Translations [ TextId ] = Translations;
				return true;
			},
			
			/* --- public properties --- */
			
			/* 
			--- UserLanguage  ---
			
			The language used for the translations

			*/
			
			get UserLanguage ( ) { return _UserLanguage; },

			set UserLanguage ( newUserLanguage ) { _UserLanguage = newUserLanguage;	},


		};
		
	};
		
	L.marker.pin.translator = function ( ) {
		return L.Marker.Pin.getTranslator ( );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.translator ( );
	}

	/* --- End of L.Marker.Pin.Translator object --- */

}) ( );
},{"./L.Marker.Pin":8}],8:[function(require,module,exports){
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
	--- L.Marker.Pin object ------------------------------------------------------------------------------------------------
	
	This object extends the L.Marker object.

	Doc reviewed 20160105
	No automated unit tests for this object

	------------------------------------------------------------------------------------------------------------------------
	*/


	L.Marker.Pin = L.Marker.extend (
		{
			options : {
				text : '',
				phone : '',
				url : '',
				address : '',
				pinCategory : undefined,
				pinId : 0
			},

			
			/* --- Methods --- */
			
			/* 
			--- getHtml ( ) method --- 
			
			This method gives the text to display in the popup binded with the pin

			*/
		
			getHtml : function () {
				var _Translator;
				if ( typeof module !== 'undefined' && module.exports ) {
					_Translator = require ('./L.Marker.Pin.Translator' );
				}
				else {
					_Translator = L.marker.pin.translator ( );
				}
				var HtmlText = '';
				if ( this.options.text && 0 < this.options.text.length ) {
					HtmlText += this.options.text;
				}
				if ( this.options.address && 0 < this.options.address.length ) {
					if ( 0 < HtmlText.length ) {
						HtmlText += '<br />';
					}
					HtmlText += 
						_Translator.getText ( 'L.Marker.Pin.Address' ) +
						'&nbsp;: ' +
						this.options.address;
				}
				if ( this.options.phone && 0 < this.options.phone.length ) {
					if ( 0 < HtmlText.length ) {
						HtmlText += '<br />';
					}
					HtmlText += 
						_Translator.getText ( 'L.Marker.Pin.Phone' ) +
						'&nbsp;: ' +
						this.options.phone;
				}
				if ( this.options.url && 0 < this.options.url.length ) {
					if ( 0 < HtmlText.length ) {
						HtmlText += '<br />';
					}
					HtmlText += 
						_Translator.getText ( 'L.Marker.Pin.Link' ) +
						'&nbsp: <a href="' +
						this.options.url + '">' +
						this.options.url +'</a>';
				}
				return HtmlText;
			}
		}
	);
	
	L.marker.pin = function ( latlng, options ) 
	{
		return new L.Marker.Pin ( latlng, options );
	};		
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin;
	}
	
	/* --- End of L.Marker.Pin object --- */
	
} ) ( );
},{"./L.Marker.Pin.Translator":7}]},{},[5]);
