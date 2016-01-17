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