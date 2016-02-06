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
		
		/* --- private properties --- */
		
		var _Translator;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Translator = require ('./L.Marker.Pin.Translator' );
		}
		else {
			_Translator = L.marker.pin.translator ( );
		}
		
		var _asHtmlElement = function ( options ) {

			if ( ! options.mainElement ) { options.mainElement = 'div'; }
			if ( ! options.pinElement ) { options.pinElement = 'div'; }
			if ( ! options.categoryElement ) { options.categoryElement = 'div'; }
			if ( ! options.textElement ) { options.textElement = 'div'; }
			if ( ! options.addressElement ) { options.addressElement = 'div'; }
			if ( ! options.phoneElement ) { options.phoneElement = 'div'; }
			if ( ! options.urlElement ) { options.urlElement = 'div'; }
			if ( ! options.urlCut ) { options.urlCut = 99999; }

			var MainElement = document.createElement ( options.mainElement );
			if ( options.mainClass ) {
				MainElement.className = options.mainClass;
			}
			
			for ( var Counter = 0; Counter < _Pins.length; Counter++ ) {
				var Pin = _Pins [ Counter ];

				var PinElement = document.createElement ( options.pinElement );
				if ( options.pinClass ) {
					PinElement.className = options.pinClass;
				}
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

				var CategoryImgElement = document.createElement ( 'img' );
				CategoryImgElement.setAttribute ( 'src', Pin.options.pinCategory.CategoryIcon.options.iconUrl );
				CategoryImgElement.draggable = false;
				if ( options.categoryImgClass ) {
					CategoryImgElement.className = options.categoryImgClass;
				}
				PinElement.appendChild ( CategoryImgElement );

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
					if ( urlText.length > options.urlCut ) {
						urlText = urlText.slice ( 0, options.urlCut ) + ' ...';
					}
						
					var UrlAnchorNode = document.createTextNode ( urlText );
					UrlAnchorElement.appendChild ( UrlAnchorNode );
					UrlAnchorElement.setAttribute ( 'href', Pin.options.url );
					UrlAnchorElement.setAttribute ( 'title', Pin.options.url );
					UrlElement.appendChild ( UrlAnchorElement );
					PinElement.appendChild ( UrlElement );
				}
				MainElement.appendChild ( PinElement );
			}

			return MainElement;
		};

		/* --- private methods --- */

		/* 
		--- _updateControl ( ) method --- 
		
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
							CategoryImgElement : "div",
							CategoryImgClass : "PinControl-Category-Img",
							textElement : 'div',
							textClass : "PinControl-Text" , 
							addressElement : 'div',
							addressClass : "PinControl-Address" , 
							phoneElement : 'div',
							phoneClass : "PinControl-Phone" , 
							urlElement : 'div',
							urlClass : "PinControl-Url" , 
							urlCut : 50
						}
					);
					NewPinsElement.id = 'PinControl-Pins';
					
					MaindivElement.replaceChild ( NewPinsElement, OldPinsElement );
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
			
			zoomTo : function ( PinRange ) {
				var Pin = _Pins [ PinRange ];
				Pin.options.map.setView ( Pin.getLatLng ( ), 17);
			},
			
			get LatLngBounds ( ) {
				var PinsLatLng = [];
				for ( var Counter = 0; Counter < _Pins.length; Counter++) {
					PinsLatLng.push ( _Pins [ Counter ].getLatLng ( ) );
					 
				}
				
				return L.latLngBounds(  PinsLatLng ); 
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
			asHtmlElement : function ( options ) {
				return _asHtmlElement ( options );
			}
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
