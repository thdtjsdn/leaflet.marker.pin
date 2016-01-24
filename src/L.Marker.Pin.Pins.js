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
