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
	
	v1.2.0:
	- Added default category 'start'
	- Doc reviewed 20160208
	- Tests done 20160208
	
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
				this.addCategory ( 
					'01',
					{ 'en' : 'Airport', 'fr' : 'Aéroport', 'nl' : 'Luchthaven', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0001"></div>'}) );
				this.addCategory ( 
					'02',
					{ 'en' : 'Ascent', 'fr' : 'Montée', 'nl' : 'Helling', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0002"></div>'}) );
				this.addCategory ( 
					'03',
					{ 'en' : 'ATM', 'fr' : 'Distributeur de billets', 'nl' : 'Giromaat', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0003"></div>'}) );
				this.addCategory ( 
					'04', 
					{ 'en' : 'Attention', 'fr' : 'Attention requise', 'nl' : 'Pas op', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0004"></div>'}) );
				this.addCategory ( 
					'05', 
					{ 'en' : 'Bikes admitted', 'fr' : 'Vélos admis', 'nl' : 'Fiets welkom', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0005"></div>'}) );
				this.addCategory ( 
					'06', 
					{ 'en' : 'Bus', 'fr' : 'Autobus', 'nl' : 'Bus', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0006"></div>'}) );
				this.addCategory ( 
					'07', 
					{ 'en' : 'Picture', 'fr' : 'Photo', 'nl' : 'Foto', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0007"></div>'}) );
				this.addCategory ( 
					'08', 
					{ 'en' : 'Camping', 'fr' : 'Camping', 'nl' : 'Camping', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0008"></div>'}) );
				this.addCategory ( 
					'09', 
					{ 'en' : 'Ferry', 'fr' : 'Ferry', 'nl' : 'Veerboot', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0009"></div>'}) );
				this.addCategory ( 
					'10', 
					{ 'en' : 'Youth hostel', 'fr' : 'Auberge de jeunesse', 'nl' : 'Jeugdherberg', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0010"></div>'}) );
				this.addCategory ( 
					'11', 
					{ 'en' : 'Information point', 'fr' : 'Point d\'information', 'nl' : 'Informatiepunt', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0011"></div>'}) );
				this.addCategory ( 
					'12', 
					{ 'en' : 'National park', 'fr' : 'Parc national', 'nl' : 'Nationaal park', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0012"></div>'}) );
				this.addCategory ( 
					'13', 
					{ 'en' : 'Bike not authorized', 'fr' : 'Vélos mal vus', 'nl' : 'Fiets niet welkom', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0013"></div>'}) );
				this.addCategory ( 
					'14', 
					{ 'en' : 'Regional park', 'fr' : 'Parc régional', 'nl' : 'Gewestelijk natuurpark', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0014"></div>'}) );
				this.addCategory ( 
					'15', 
					{ 'en' : 'Repair', 'fr' : 'Entretien vélo', 'nl' : 'Rijwielhersteller', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0015"></div>'}) );
				this.addCategory ( 
					'16', 
					{ 'en' : 'Shop', 'fr' : 'Magasin', 'nl' : 'Winkel', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0016"></div>'}) );
				this.addCategory ( 
					'17', 
					{ 'en' : 'Help', 'fr' : 'Aide', 'nl' : 'Hulp', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0017"></div>'}) );
				this.addCategory ( 
					'18', 
					{ 'en' : 'Stop', 'fr' : 'Stop', 'nl' : 'Stop', },
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0018"></div>'}) );
				this.addCategory ( 
					'19', 
					{ 'en' : 'Table', 'fr' : 'Table', 'nl' : 'Tafel', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0019"></div>'}) );
				this.addCategory ( 
					'20', 
					{ 'en' : 'Toilets', 'fr' : 'Toilettes', 'nl' :'Toilet', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0020"></div>'}) );
				this.addCategory ( 
					'21', 
					{ 'en' : 'Railway station', 'fr' : 'Gare', 'nl' : 'Treinstation', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0021"></div>'}) );
				this.addCategory ( 
					'22', 
					{ 'en' : 'Tunnel', 'fr' : 'Tunnel', 'nl' : 'Tunnel', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0022"></div>'}) );
				this.addCategory ( 
					'23', 
					{ 'en' : 'Water point', 'fr' : 'Point d\'eau', 'nl' : 'Waterpunt', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0023"></div>'}) );
				this.addCategory ( 
					'24', 
					{ 'en' : 'Bed and breakfast', 'fr' : 'Chambre d\'hotes', 'nl' : 'Bed and Breakfast', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0024"></div>'}) );
				this.addCategory ( 
					'25', 
					{ 'en' : 'Coffe shop', 'fr' : 'Cafetaria ', 'nl' : 'Cafetaria ', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0025"></div>'}) );
				this.addCategory ( 
					'26', 
					{ 'en' : 'Restaurant', 'fr' : 'Restaurant', 'nl' : 'Restaurant', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0026"></div>'}) );
				this.addCategory ( 
					'27', 
					{ 'en' : 'Hostel', 'fr' : 'Hôtel', 'nl' : 'Hotel', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0027"></div>'}) );
				this.addCategory ( 
					'28', 
					{ 'en' : 'Start', 'fr' : 'Départ', 'nl' : 'Start', }, 
					L.divIcon ( { iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20], html : '<div class="Pin-Icon Pin-Category-0028"></div>'}) );
			},
			
			/* --- public properties --- */
			
			/* 
			--- length  ---
			
			The number of categories in the collection - read only

			*/
			
			get length ( ) { return _PinCategories.length; }
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

},{"./L.Marker.Pin.Category":2,"./L.Marker.Pin.Translator":8}],2:[function(require,module,exports){
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

	-v1.2.0:
	- no changes
	- Doc reviewed 20160110
	- Tests done 20160110

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

},{"./L.Marker.Pin.Translator":8}],3:[function(require,module,exports){
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

	-v1.2.0:
	- no changes
	- Doc reviewed 20160110
	- No automated unit tests for this function
	
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

		L.DomEvent.on ( 
			MainDiv,
			'keyup',
			function ( KeyBoardEvent ) { 
				if ( 'Escape' === KeyBoardEvent.key || 'Esc' === KeyBoardEvent.key ) {
					Map.closePopup ( );
				}
			}
		);
		
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
		CancelPinButton.id = 'CancelPinButton';
		
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
		document.getElementById ( 'CancelPinButton' ).focus ( );
	};

	L.marker.pin.contextmenu = function ( MouseEvent ) {
		return new L.Marker.Pin.ContextMenu ( MouseEvent );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.contextmenu;
	}
	
	/* --- End of L.Marker.Pin.ContextMenu object --- */
	
} ) ( );
},{"./L.Marker.Pin.EditDialog":5,"./L.Marker.Pin.Pins":7,"./L.Marker.Pin.Translator":8}],4:[function(require,module,exports){
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
	--- L.Marker.Pin.Control object ----------------------------------------------------------------------------------------
	
	This object extends the L.Control object

	v1.2.0:
	- new in v1.2.0.
	- Doc reviewed 20160219
	- No automated unit tests for this object

	------------------------------------------------------------------------------------------------------------------------
	*/

	/* --- private properties --- */
	
	var _Pins;
	if ( typeof module !== 'undefined' && module.exports ) {
		_Pins = require ('./L.Marker.Pin.Pins' );
	}
	else {
		_Pins = L.marker.pin.pins ( );
	}
	
	var _Translator;
	if ( typeof module !== 'undefined' && module.exports ) {
		_Translator = require ('./L.Marker.Pin.Translator' );
	}
	else {
		_Translator = L.marker.pin.translator ( );
	}

	var _DraggedPinRange = '0';
	
	var _MinimizeButtonId; // The icon for the minimize button
	var _MaximizeButtonId; // The icon for the maximize button
	var _ReduceButtonId; // The icon for the reduce button
	var _ExtendButtonId; // The icon for the extend button

	var _MaxHeight = 400; // the max-height CSS property of the control 

	var _ButtonsOnTop = true; // variable to store the buttons position in the control
	
	var _Map; // A reference to the map
	
	/* Event handlers */
	
	/* 
	
	--- _onClick( MouseEvent ) ---
	
	onclick event handler for the pins
	
	This event zoom to the selected pin 
	
	*/
	
	var _onClick = function ( MouseEvent ) { 
		var SelectedElement = MouseEvent.target;
		while ( SelectedElement && SelectedElement.className && ( -1 === SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		if ( SelectedElement && SelectedElement.className && ( -1 !== SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			_Pins.zoomTo ( SelectedElement.dataset.pinRange );
		}
		MouseEvent.stopPropagation ( );
	};

	/* 
	
	--- _onDblClick( MouseEvent ) ---
	
	ondblclick event handler for the pins
	
	This event zoom to the selected pin and display the L.Marker.Pin.EditDialog for this pin
	
	*/

	var _onDblClick = function ( MouseEvent ) { 
		var SelectedElement = MouseEvent.target;
		while ( SelectedElement && SelectedElement.className && ( -1 === SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		if ( SelectedElement && SelectedElement.className && ( -1 !== SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			var Pin = _Pins.zoomTo ( SelectedElement.dataset.pinRange );
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
			var EditDialog;
			if ( typeof module !== 'undefined' && module.exports ) {
				EditDialog = require ('./L.Marker.Pin.EditDialog' );
			}
			else {
				EditDialog = L.marker.pin.editdialog ;
			}
			
			new EditDialog ( Map, Pin.getLatLng(), options ).show ( );
		}
		MouseEvent.stopPropagation ( );
	};
	
	/* 
	
	--- _onContextMenu( MouseEvent ) ---
	
	contextmenu event handler
	
	This event zoom to the selected pin
	
	*/

	var _onContextMenu = function ( MouseEvent ) { 
		MouseEvent.preventDefault();

		var SelectedElement = MouseEvent.target;
		while ( SelectedElement && SelectedElement.className && ( -1 === SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		if ( SelectedElement && SelectedElement.className && ( -1 !== SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			_Pins.zoomTo ( SelectedElement.dataset.pinRange );
		}
		MouseEvent.stopPropagation ( );
	};

	/* 
	
	--- _onMouseDown( MouseEvent ) ---
	
	mousedown event handler
	
	*/

	var _onMouseDown = function ( MouseEvent ) { 
		MouseEvent.stopPropagation ( );
	};
	
	/* 
	
	--- _onWheel( WheelEvent ) ---
	
	wheel event handler
	
	*/
	var _onWheel = function ( WheelEvent ) { 
		var PinsElement = document.getElementById ( 'PinControl-Pins' );
		if ( WheelEvent.deltaY ) {
			PinsElement.scrollTop = PinsElement.scrollTop + WheelEvent.deltaY * 10 ;
		}
		WheelEvent.stopPropagation ( );
	};
	
	/* 
	
	--- _onDragStart( DragEvent ) ---
	
	dragstart event handler
	
	This event store the pin position ... it's needed for the ondrop event 
	
	*/

	var _onDragStart = function ( DragEvent ) { 
		// dataTransfer.setData is mandatory for FF but is not known by IE -> try catch...
		try {
			DragEvent.dataTransfer.setData ( 'PinRange', DragEvent.target.dataset.pinRange );
		}
		catch ( e ) {
		}
		_DraggedPinRange = DragEvent.target.dataset.pinRange;
		DragEvent.stopPropagation ( );
	};

	/* 
	
	--- _onDragOver( DragEvent ) ---
	
	dragover event handler
	
	This event scroll the control when the mouse is near the top or bottom border
	
	*/

	var _onDragOver = function ( DragEvent ) { 
		var PinControlPins = document.getElementById ( 'PinControl-Pins' );
		if ( 30 > DragEvent.clientY - document.getElementById ( 'PinControl-Pins' ).getBoundingClientRect().top ) {
			PinControlPins.scrollTop = PinControlPins.scrollTop - 30;
		}
		else if ( 30 > document.getElementById ( 'PinControl-Pins' ).getBoundingClientRect().bottom - DragEvent.clientY ) {
			PinControlPins.scrollTop = PinControlPins.scrollTop + 30;
		}
	};
	
	/* 
	
	--- _onDragEnd( DragEvent ) ---
	
	dragend event handler
	
	*/
	
	var _onDragEnd = function ( DragEvent ) { 
		DragEvent.stopPropagation ( );
	};
		
	/* 
	
	--- _onDrop( DragEvent ) ---
	
	drop event handler
	
	This event reorder the pins collection when the user drop a pin
	
	*/

	var _onDrop = function ( DragEvent ) { 
		var SelectedElement = DragEvent.target;
		while ( SelectedElement && SelectedElement.className && ( -1 === SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		var DroppedPinRange;
		if ( SelectedElement && SelectedElement.className && ( -1 !== SelectedElement.className.indexOf ('PinControl-Pin' ) ) ) {
			DroppedPinRange =  SelectedElement.dataset.pinRange;
			if (  ( DragEvent.clientY - SelectedElement.getBoundingClientRect().top ) < ( SelectedElement.getBoundingClientRect().bottom - DragEvent.clientY ) ) {
				_Pins.order ( _DraggedPinRange, DroppedPinRange, false );
			}
			else {
				_Pins.order ( _DraggedPinRange, DroppedPinRange, true );
			}
		}
		DragEvent.stopPropagation ( );
	};

	/* 
	
	--- _onClickZoomBounds( MouseEvent ) ---
	
	onclick event handler for the zoom to the pins button
	
	This event zoom to pins collection
	
	*/
	
	var _onClickZoomBounds = function ( MouseEvent ) { 
		var ZoomBounds = _Pins.LatLngBounds;
		if ( ZoomBounds.isValid ( ) ) {
			_Map.fitBounds ( ZoomBounds );
		}
		MouseEvent.stopPropagation ( );
	};

	/* 
	
	--- _onClickMinMax( MouseEvent ) ---
	
	onclick event handler for the MinMax button
	
	This event maximize / minimize the pins control
	
	*/

	var _onClickMinMax = function ( MouseEvent ) { 
		var PinsElement = document.getElementById ( 'PinControl-Pins' );
		if ( PinsElement.style.visibility === "hidden" ) {
			PinsElement.setAttribute ( "style", "visibility : visible; width: auto; min-width: 20em; height: auto; margin: 0.5em; max-height: "+ _MaxHeight +"px" );
			MouseEvent.target.id = _MinimizeButtonId;
			MouseEvent.target.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.MinimizeButton' ) );
			PinsElement.dataset.minimized = 'no';
		}
		else {
			PinsElement.setAttribute ( "style", "visibility : hidden; width: 0; min-width: 0; height: 0; margin: 0.5em;" );
			MouseEvent.target.id = _MaximizeButtonId;
			MouseEvent.target.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.MaximizeButton' ) );
			PinsElement.dataset.minimized = 'yes';
		}
		MouseEvent.stopPropagation ( );
	};
	
	/* 
	
	--- _onClickExtend( MouseEvent ) ---
	
	onclick event handler for the Extend button
	
	This event extend the pins control
	
	*/
	
	var _onClickExtend = function ( MouseEvent ) {
		var PinsElement = document.getElementById ( 'PinControl-Pins' );
		if ( PinsElement.style.visibility !== "hidden" ) {
			_MaxHeight += 100;
			PinsElement.setAttribute("style", "max-height: " + _MaxHeight + "px" );
		}
		MouseEvent.stopPropagation ( );
	};
	
	/* 
	
	--- _onClickReduce( MouseEvent ) ---
	
	onclick event handler for the Reduce button
	
	This event reduce the pins control
	
	*/

	var _onClickReduce = function ( MouseEvent ) {
		var PinsElement = document.getElementById ( 'PinControl-Pins' );
		if ( PinsElement.style.visibility !== "hidden" && _MaxHeight > 200 ) {
			_MaxHeight -= 100;
			PinsElement.setAttribute("style", "max-height: " + _MaxHeight + "px" );
		}
		MouseEvent.stopPropagation ( );
	};

	/* --- private methods --- */

	/* 
	
	--- _createPinsDiv ( MainDiv ) method --- 
	
	this method creates the pins div in the control and all the associated events.
	
	parameter :
	- MainDiv : the main div of the control
	
	return : 
	- the div where the pins will be added

	*/
		
	var _createPinsDiv = function ( MainDiv ) {
		var PinsDiv = L.DomUtil.create ( 'div', 'PinControl-Pins', MainDiv );
		PinsDiv.id = 'PinControl-Pins';

		L.DomEvent.on ( MainDiv, 'click', _onClick );
		L.DomEvent.on ( MainDiv, 'dblclick', _onDblClick );
		L.DomEvent.on ( MainDiv, 'contextmenu', _onContextMenu );
		L.DomEvent.on ( MainDiv, 'dragstart', _onDragStart );
		L.DomEvent.on ( MainDiv, 'dragover', _onDragOver );
		L.DomEvent.on (	MainDiv, 'dragend', _onDragEnd );
		L.DomEvent.on ( MainDiv, 'mousedown', _onMouseDown );
		L.DomEvent.on ( MainDiv, 'drop', _onDrop );
		L.DomEvent.on ( MainDiv, 'mousewheel', _onWheel, false );
		L.DomEvent.on ( MainDiv, 'wheel', _onWheel, false );

		PinsDiv.dataset.minimized = 'no';
		
		return PinsDiv;
	};

	/* 
	
	--- _createButtonsDiv ( MainDiv ) method --- 
	
	this method creates the buttons div in the control and all the associated events.
	
	parameter :
	- MainDiv : the main div of the control
	
	return : 
	- the div whith the buttons

	*/

	var _createButtonsDiv = function ( MainDiv, IsMinimized ) {
		var ButtonsDiv = L.DomUtil.create ( 'div', 'PinControl-Buttons', MainDiv );

		var ZoomBoundsButton = L.DomUtil.create ( 'div', 'PinControl-Button', ButtonsDiv );
		ZoomBoundsButton.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.ZoomBoundsButton' ) );
		ZoomBoundsButton.id = 'PinControl-ZoomBoundsButton';
		L.DomEvent.on ( ZoomBoundsButton, 'click', _onClickZoomBounds );

		var MinMaxButton = L.DomUtil.create ( 'div', 'PinControl-Button', ButtonsDiv );
		MinMaxButton.setAttribute ( 'title' , _Translator.getText ( IsMinimized ? 'L.Marker.Pin.Control.onAdd.MaximizeButton' : 'L.Marker.Pin.Control.onAdd.MinimizeButton' ) );
		MinMaxButton.id = IsMinimized ? _MaximizeButtonId : _MinimizeButtonId;
		L.DomEvent.on ( MinMaxButton, 'click', _onClickMinMax );
		
		var ExtendButton = L.DomUtil.create ( 'div', 'PinControl-Button', ButtonsDiv );
		ExtendButton.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.ExtendButton' ) );
		ExtendButton.id = _ExtendButtonId;
		L.DomEvent.on ( ExtendButton, 'click', _onClickExtend );

		var ReduceButton = L.DomUtil.create ( 'div', 'PinControl-Button', ButtonsDiv );
		ReduceButton.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.ReduceButton' ) );
		ReduceButton.id = _ReduceButtonId;
		L.DomEvent.on ( ReduceButton, 'click', _onClickReduce );

		return ButtonsDiv;
	};

	L.Marker.Pin.Control = L.Control.extend ( {
			options : {
				position: 'topright'
			},
		
		/*
		
		--- initialize ( options ) method --- 
		
		*/
		
		initialize: function ( options ) {
				L.Util.setOptions( this, options );
				switch ( options.position ) {
					case 'topleft':
					_MinimizeButtonId = 'PinControl-ArrowTopLeftButton';
					_MaximizeButtonId = 'PinControl-ArrowBottomRightButton';
					_ReduceButtonId = 'PinControl-ArrowTopButton';
					_ExtendButtonId = 'PinControl-ArrowBottomButton';
					break;
					case 'topright':
					_MinimizeButtonId = 'PinControl-ArrowTopRightButton';
					_MaximizeButtonId = 'PinControl-ArrowBottomLeftButton';
					_ReduceButtonId = 'PinControl-ArrowTopButton';
					_ExtendButtonId = 'PinControl-ArrowBottomButton';
					break;
					case 'bottomright':
					_MinimizeButtonId = 'PinControl-ArrowBottomRightButton';
					_MaximizeButtonId = 'PinControl-ArrowTopLeftButton';
					_ReduceButtonId = 'PinControl-ArrowBottomButton';
					_ExtendButtonId = 'PinControl-ArrowTopButton';
					_ButtonsOnTop = false;
					break;
					default:
					_MinimizeButtonId = 'PinControl-ArrowBottomLeftButton';
					_MaximizeButtonId = 'PinControl-ArrowTopRightButton';
					_ReduceButtonId = 'PinControl-ArrowBottomButton';
					_ExtendButtonId = 'PinControl-ArrowTopButton';
					_ButtonsOnTop = false;
					break;
				}
			},
		
		/*
		
		--- initialize ( options ) method --- 
		
		*/

		onAdd : function ( Map ) {
				_Map = Map;
				
				var MainDiv = L.DomUtil.create ( 'div', 'PinControl-MainDiv' );
				MainDiv.id = 'PinControl-MainDiv';
				var PinsDiv;
				
				if ( _ButtonsOnTop ){
					_createButtonsDiv ( MainDiv, 0 === _Pins.length );
					PinsDiv = _createPinsDiv ( MainDiv );
				}
				else{
					PinsDiv = _createPinsDiv ( MainDiv );
					_createButtonsDiv ( MainDiv, 0 === _Pins.length );
				}

				if ( 0 === _Pins.length  ) {
					PinsDiv.setAttribute("style", "visibility : hidden; width: 0; min-width: 0; height: 0; margin: 0.5em;" );
					PinsDiv.dataset.minimized = 'yes';
				}
				
				return MainDiv;
			}
		}
	);
	
	L.marker.pin.control = function ( options ) 
	{
		return new L.Marker.Pin.Control ( options );
	};		
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.control;
	}

	/* --- End of L.Marker.Pin.Control object --- */
	
} ) ( );
},{"./L.Marker.Pin.EditDialog":5,"./L.Marker.Pin.Pins":7,"./L.Marker.Pin.Translator":8}],5:[function(require,module,exports){
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

	v1.2.0:
	- small changes to avoid order change after pin edition
	Doc reviewed 20160208
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
			var OldPos = Pins.push ( Pin );

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
				var NewPos = Pins.remove ( options.pinObject );
				Map.removeLayer( options.pinObject );
				Pins.order ( OldPos - 1, NewPos, false );
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
			L.DomEvent.on ( 
				_MainDiv,
				'keyup',
				function ( KeyBoardEvent ) { 
					if ( 'Escape' === KeyBoardEvent.key || 'Esc' === KeyBoardEvent.key) {
						Map.closePopup ( );
					}
				}
			);
			
			// ... input...
			var TextDiv = _createDiv ( 'PinEditDialog-TextDiv', _MainDiv, _Translator.getText ('L.Marker.Pin.EditDialog.Text') + '&nbsp;:&nbsp;' );
			_TextInput = _createInput ( 'text', options.text, '', TextDiv );
			_TextInput.id = 'TextInput';
					
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
				document.getElementById ( 'TextInput' ).focus ( );
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
},{"./L.Marker.Pin":9,"./L.Marker.Pin.Categories":1,"./L.Marker.Pin.ContextMenu":3,"./L.Marker.Pin.Pins":7,"./L.Marker.Pin.Translator":8}],6:[function(require,module,exports){
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
	
	v1.2.0:
	- added the _PinsHtmlOptions private property
	- added the addControl ( ) method
	- added the addTranslations ( ) method
	- added the PinsHtmlElement read only property
	-added the PinsHtlmlOptions property
	Doc reviewed 20160211
	Tests done 20160211
	
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

		var _PinsHtmlOptions = { 
			mainElement : 'div',
			mainClass : "Pin-Print-Main" , 
			pinElement : 'div',
			pinClass : "Pin-Print-Pin" , 
			categoryImgClass : "Pin-Print-CategoryImg",
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
			urlLength : 9999
		};
		
		return {


			/* --- public methods --- */
			
			/* addControl ( Map, options ) method --- 
			
			This method add the pin control to the map.
			
			Parameters :
			
			- Map : the L.Map object to witch the control must be added

			- options the control options. See the leaflet control documentation
			for more
			
			*/

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
				// ... to 28...
				L.marker.pin.interface ( ).addTranslation ( 'L.Marker.Pin.Category.28', 'de', 'Lorem ipsum...' );	

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
			
			/* 
			
			--- PinsHtlmlOptions  ---
			
			The options used for the PinsHtmlElement property

			Default values:
			
			mainElement : 'div',
			mainClass : "Pin-Print-Main" , 
			pinElement : 'div',
			pinClass : "Pin-Print-Pin" , 
			categoryImgClass : "Pin-Print-CategoryImg",
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
			urlLength : 9999
			
			<div class ="Pin-Print-Main">
				<div class="Pin-Print-Pin">
					<img class="Pin-Print-CategoryImg">
					</img>
					<div class="Pin-Print-Category">
					</div>
					<div class="Pin-Print-Text">
					</div>
					<div class="Pin-Print-Address">
					</div>
					<div class="Pin-Print-Phone">
					</div>
					<div class="Pin-Print-Url">
					</div>
				</div>
				... next pin...
			</div>
			
			*/

			get PinsHtlmlOptions ( ) { return _PinsHtmlOptions; },
			
			set PinsHtlmlOptions ( options ) { 
				for ( var PinsHtmlOption in _PinsHtmlOptions ) {
					if ( options [ PinsHtmlOption ] )
					{
						_PinsHtmlOptions [ PinsHtmlOption ] = options [ PinsHtmlOption ];
					}
				}
			},
			
			/* 
			--- PinsHtmlElement  ---
			
			An HTLMElement with the pin's data

			*/

			get PinsHtmlElement ( ) { return _Pins.asHtmlElement ( _PinsHtmlOptions ); }
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

},{"./L.Marker.Pin":9,"./L.Marker.Pin.Categories":1,"./L.Marker.Pin.Control":4,"./L.Marker.Pin.EditDialog":5,"./L.Marker.Pin.Pins":7,"./L.Marker.Pin.Translator":8}],7:[function(require,module,exports){
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

 	v1.2.0:
	- Added _asHtmlElement ( ) private method
	- Added _updateControl ( ) private method
	- push ( ) and remove ( ) methods returns a value
	- Added order ( ) public method
	- Added zoomTo ( ) public method
	- Added LatLngBounds public read only property
	- Added asHtmlElement ( ) public method
	- Doc reviewed 20160216
	- No automated unit tests for this object
	
	------------------------------------------------------------------------------------------------------------------------
	*/

	/* --- private properties outside of the constructor due to the singleton pattern --- */

	var _Pins = []; // the pin's collection
	var _NextPinId = 0; // The next pin id to use
	var _PageLoad = true;
	var _CallbackFunction = function ( ) {console.log ( '_CallbackFunction ( )');};
	
	/* 
	--- getPins ( ) function --- 
	
	This function gives a collection of the created pins
	
	*/

	L.Marker.Pin.getPins = function () {
		
		/* --- private properties --- */
		
		var _Translator;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Translator = require ('./L.Marker.Pin.Translator' );
		}
		else {
			_Translator = L.marker.pin.translator ( );
		}

		/* --- private methods --- */

		/* 
		--- _asHtmlElement ( options ) method --- 
		
		this method returns an HTMLElement with the pin's data
		
		See the L.Marker.Pin.Interface.PinsHtlmlOptions property for the options values
		
		*/
				
		var _asHtmlElement = function ( options ) {

			if ( ! options.mainElement ) { options.mainElement = 'div'; }
			if ( ! options.pinElement ) { options.pinElement = 'div'; }
			if ( ! options.categoryElement ) { options.categoryElement = 'div'; }
			if ( ! options.textElement ) { options.textElement = 'div'; }
			if ( ! options.addressElement ) { options.addressElement = 'div'; }
			if ( ! options.phoneElement ) { options.phoneElement = 'div'; }
			if ( ! options.urlElement ) { options.urlElement = 'div'; }
			if ( ! options.urlLength ) { options.urlLength = 9999; }

			var MainElement = document.createElement ( options.mainElement );
			if ( options.mainClass ) {
				MainElement.className = options.mainClass;
			}
			
			for ( var Counter = 0; Counter < _Pins.length; Counter++ ) {
				var Pin = _Pins [ Counter ];

				var PinElement = document.createElement ( options.pinElement );
				var ClassName = 'Pin-CategoryId-' + Pin.options.pinCategory.CategoryId;
				if ( options.pinClass ) {
					ClassName = ClassName + ' ' + options.pinClass;
				}
				PinElement.className = ClassName;
				PinElement.draggable = true;
				PinElement.dataset.pinRange = Counter.toString ( );
				L.DomEvent.on ( 
					PinElement, 
					'dragover', 
					function ( Event ) 
					{ 
						Event.preventDefault ( );
					}
				);
				var CategoryImgElement;
				if ( Pin.options.pinCategory.CategoryIcon.options.html ) {
					CategoryImgElement = document.createElement ( 'div' );
					PinElement.appendChild ( CategoryImgElement );
					CategoryImgElement.outerHTML = Pin.options.pinCategory.CategoryIcon.options.html;
				}
				else {
					CategoryImgElement = document.createElement ( 'img' );
					CategoryImgElement.setAttribute ( 'src', Pin.options.pinCategory.CategoryIcon.options.iconUrl );
					CategoryImgElement.draggable = false;
					if ( options.categoryImgClass ) {
						CategoryImgElement.className = options.categoryImgClass;
					}
					PinElement.appendChild ( CategoryImgElement );
				}
				
				var CategoryElement = document.createElement ( options.categoryElement );
				if ( options.categoryClass ) {
					CategoryElement.className = options.categoryClass;
				}
				
				var CategoryNode = document.createTextNode ( Pin.options.pinCategory.CategoryName );
				
				CategoryElement.appendChild ( CategoryNode );
				PinElement.appendChild ( CategoryElement );
				
				if ( Pin.options.text && 0 < Pin.options.text.length )
				{
					var TextElement = document.createElement ( options.textElement );
					if ( options.textClass ) {
						TextElement.className = options.textClass;
					}
					var TextNode = document.createTextNode ( Pin.options.text );
					TextElement.appendChild ( TextNode );
					PinElement.appendChild ( TextElement );
				}

				if ( Pin.options.address && 0 < Pin.options.address.length )
				{
					var AddressElement = document.createElement ( options.addressElement );
					if ( options.addressClass ) {
						AddressElement.className = options.addressClass;
					}
					var AddressNode = document.createTextNode ( _Translator.getText ( 'L.Marker.Pin.Pins.asHtmlElement.Address' ) + Pin.options.address );
					AddressElement.appendChild ( AddressNode );
					PinElement.appendChild ( AddressElement );
				}

				if ( Pin.options.phone && 0 < Pin.options.phone.length )
				{
					var PhoneElement = document.createElement ( options.phoneElement );
					if ( options.phoneClass ) {
						PhoneElement.className = options.phoneClass;
					}
					var PhoneNode = document.createTextNode ( _Translator.getText ( 'L.Marker.Pin.Pins.asHtmlElement.Phone' ) + Pin.options.phone );
					PhoneElement.appendChild ( PhoneNode );
					PinElement.appendChild ( PhoneElement );
				}

				if ( Pin.options.url && 0 < Pin.options.url.length )
				{
					var UrlElement = document.createElement ( options.urlElement );
					if ( options.urlClass ) {
						UrlElement.className = options.urlClass;
					}
					var UrlNode = document.createTextNode ( _Translator.getText ( 'L.Marker.Pin.Pins.asHtmlElement.Url' ) );
					UrlElement.appendChild ( UrlNode );
					var UrlAnchorElement = document.createElement ( 'a' );
					var urlText = Pin.options.url;
					if ( urlText.length > options.urlLength ) {
						urlText = urlText.slice ( 0, options.urlLength ) + ' ...';
					}
						
					var UrlAnchorNode = document.createTextNode ( urlText );
					UrlAnchorElement.appendChild ( UrlAnchorNode );
					UrlAnchorElement.setAttribute ( 'href', Pin.options.url );
					UrlAnchorElement.setAttribute ( 'title', Pin.options.url );
					UrlAnchorElement.setAttribute ( 'target', '_blank' );
					UrlElement.appendChild ( UrlAnchorElement );
					PinElement.appendChild ( UrlElement );
				}
				MainElement.appendChild ( PinElement );
			}

			return MainElement;
		};

		/* 
		--- _updateControl ( ) method --- 
		
		This method update the pins control
		
		*/
		
		var _updateControl = function ( ) {
			if ( document.getElementById ) {
				var MaindivElement = document.getElementById ( 'PinControl-MainDiv' );
				var OldPinsElement = document.getElementById ( 'PinControl-Pins' );
				if ( MaindivElement && OldPinsElement )
				{
					var NewPinsElement = _asHtmlElement ( 
						{ 
							mainElement : 'div',
							mainClass : "PinControl-Pins" , 
							pinElement : 'div',
							pinClass : "PinControl-Pin" , 
							categoryElement : 'div',
							categoryClass : "PinControl-Category" , 
							CategoryImgClass : "PinControl-Category-Img",
							textElement : 'div',
							textClass : "PinControl-Text" , 
							addressElement : 'div',
							addressClass : "PinControl-Address" , 
							phoneElement : 'div',
							phoneClass : "PinControl-Phone" , 
							urlElement : 'div',
							urlClass : "PinControl-Url" , 
							urlLength : 50
						}
					);
					NewPinsElement.id = 'PinControl-Pins';
					var OldStyle = OldPinsElement.style;
					var OldComputedStyle = window.getComputedStyle ( OldPinsElement, null );
					var OldMaxHeight;
					try
					{
						OldMaxHeight = OldComputedStyle.maxHeight;
					}
					catch ( e )
					{
						OldMaxHeight = '400px';
					}

					NewPinsElement.dataset.minimized = OldPinsElement.dataset.minimized;
					if ( 'yes' === NewPinsElement.dataset.minimized  ) {
						NewPinsElement.setAttribute ( "style", "visibility : hidden; width: 0; min-width: 0; height: 0; margin: 0.5em;" );
					}
					else {
						NewPinsElement.setAttribute ( "style", "visibility : visible; width: auto; min-width: 20em; height: auto; margin: 0.5em; max-height: "+ OldMaxHeight );
					}

					var ScrollTop = OldPinsElement.scrollTop;
					MaindivElement.replaceChild ( NewPinsElement, OldPinsElement );
					document.getElementById ( 'PinControl-Pins' ).scrollTop = ScrollTop;
				}
			}
		};
		
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
			
			Return :
			- the position of the new pin in the pins collection (first position = 0)
			
			*/

			push : function ( Pin ) {
				Pin.options.pinId = _NextPinId++;
				_Pins.push ( Pin );
				this.CallbackFunction ( );
				_updateControl ( );
				
				return _Pins.length - 1;
			},

			/* 
			--- remove ( Pin ) method --- 
			
			this method remove a pin from the collection
			
			Parameters : 
			- Pin : the L.Marker.Pin object to remove from the collection
			
			Return :
			- the position of the removed pin in the pins collection (first position = 0)

			*/

			remove : function ( Pin ) {
				for ( var Counter = 0; Counter < _Pins.length ; Counter++ )
				{
					if ( _Pins [ Counter ].options.pinId === Pin.options.pinId ) {
						_Pins.splice ( Counter, 1 );
						this.CallbackFunction ( );
						_updateControl ( );
						
						return Counter;
					}
				}
				
				return -1;
			},

			/* 
			--- order ( OldPos, NewPos, AfterNewPos ) method --- 

			This method changes the position of a pin in the pins collection

			Parameters :
			- OldPos : the old position of the pin in the collection
			- NewPos : the new position of the pin in the collection
			- AfterNewPos : a boolean indicates if the pin position must be
			after the pin at the new position ( true ) or before ( false )
			
			*/

			order : function ( OldPos, NewPos, AfterNewPos ) {
				OldPos = parseInt ( OldPos );
				NewPos = parseInt ( NewPos );
				if ( AfterNewPos ) {
					NewPos = NewPos + 1;
				}
				if ( OldPos > _Pins.length - 1 ) {
					return;
				}
				if ( NewPos > _Pins.length ) {
					return;
				}
				if ( OldPos === NewPos ) {
					return;
				}
				var CurrentPos = 0;
				var NewPins = [];
				for ( var Counter = 0; Counter < _Pins.length; Counter++ ) {
					if ( Counter === OldPos ) {
					}
					else if ( Counter === NewPos ) {
						NewPins [ CurrentPos ] = _Pins [ OldPos ];
						CurrentPos++;
						NewPins [ CurrentPos ] = _Pins [ Counter ];
						CurrentPos++;
					}
					else {
						NewPins [ CurrentPos ] = _Pins [ Counter ];
						CurrentPos++;
					}
				}
				if ( NewPos === _Pins.length ) {
					NewPins [ _Pins.length - 1 ] = _Pins [ OldPos ];
				}
				_Pins = NewPins;
				this.CallbackFunction ( );
				_updateControl ( );
			},
			
			/* 
			--- zoomTo ( PinRange ) method --- 
			
			This method zoom to a pin 
			
			Parameter :
			PinRange : the position in the pins collection
			
			return: a reference to the pin
			
			*/
			
			zoomTo : function ( PinRange ) {
				var Pin = _Pins [ PinRange ];
				Pin.options.map.setView ( Pin.getLatLng ( ), 17);
				
				return Pin;
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
				_updateControl ( );
			},
			
			/*
			
			--- asHtmlElement( options ) method ---
			
			See the _asHtmlElement method and the 
			L.Marker.Pin.Interface.PinsHtlmlOptions property
			
			*/
			
			asHtmlElement : function ( options ) {
				return _asHtmlElement ( options );
			},
		
			/* --- public properties --- */

			/* 
			
			--- LatLngBounds ---
			
			The pins LatLngBounds object ( see leaflet documentation )
			
			*/
			
			get LatLngBounds ( ) {
				var PinsLatLng = [];
				for ( var Counter = 0; Counter < _Pins.length; Counter++) {
					PinsLatLng.push ( _Pins [ Counter ].getLatLng ( ) );
					 
				}
				
				return L.latLngBounds(  PinsLatLng ); 
			},

			/* 
			
			--- length ---
			
			The size of the pins collection
			
			*/
			
			get length ( ) {return _Pins.length; }
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

},{"./L.Marker.Pin.ContextMenu":3,"./L.Marker.Pin.Translator":8}],8:[function(require,module,exports){
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
	
	v1.2.0:
	- added messages for L.Marker.Pin.Control and L.Maker.Pin.Pins.asHtmlElement
	Doc reviewed 20160211
	Tests done 20160211
	
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
		'L.Marker.Pin.Pins.asHtmlElement.Address' :
		{
			'fr' : 'Adresse: ',
			'en' : 'Address: ',
			'nl' : 'Adres: ',
		},
		'L.Marker.Pin.Pins.asHtmlElement.Phone' :
		{
			'fr' : 'Téléphone: ',
			'en' : 'Phone: ',
			'nl' : 'Telefoon: ',
		},
		'L.Marker.Pin.Pins.asHtmlElement.Url' :
		{
			'fr' : 'Lien: ',
			'en' : 'Link: ',
			'nl' : 'Link: ',
		},
		'L.Marker.Pin.Control.onAdd.ZoomBoundsButton' :
		{
			'fr' : 'Zoom sur les épingles',
			'en' : 'Zoom on pins',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.MinimizeButton' :
		{
			'fr' : 'Réduire la fenêtre',
			'en' : 'Minimize the window',
			'nl' : '',
		},		
		'L.Marker.Pin.Control.onAdd.MaximizeButton' :
		{
			'fr' : 'Agrandir la fenêtre',
			'en' : 'Maximize the window',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.ExtendButton' :
		{
			'fr' : 'Augmenter la hauteur de la fenêtre',
			'en' : 'Extend the window height',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.ReduceButton' :
		{
			'fr' : 'Réduire la hauteur de la fenêtre',
			'en' : 'Reduce the window height',
			'nl' : '',
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
			- '???' when the text identified by TextId is not found in the current user language or 'en'
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
},{"./L.Marker.Pin":9}],9:[function(require,module,exports){
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
	
	v1.2.0:
	- Text part of the url is limited to 50 characters and the link open
	in a new window.
	- Doc reviewed 20160208
	- No automated unit tests for this object

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
		
			getHtml : function ( ) {
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
						this.options.url + '" target="_blank">' +
						this.options.url.slice ( 0, 50 ) +'</a>';
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
},{"./L.Marker.Pin.Translator":8}]},{},[6]);
