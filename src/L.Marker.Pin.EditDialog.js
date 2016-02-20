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