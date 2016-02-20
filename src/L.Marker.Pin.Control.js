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
	
	
	var _MinimizeIcon; // The icon for the minimize button
	var _MaximizeIcon; // The icon for the maximize button
	var _ReduceIcon; // The icon for the reduce button
	var _ExtendIcon; // The icon for the extend button
	
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
		while ( SelectedElement && ( SelectedElement.className !== 'PinControl-Pin' ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		if ( SelectedElement ) {
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
		while ( SelectedElement && ( SelectedElement.className !== 'PinControl-Pin' ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		if ( SelectedElement && ( SelectedElement.className === 'PinControl-Pin' ) ) {
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
		while ( SelectedElement && ( SelectedElement.className !== 'PinControl-Pin' ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		if ( SelectedElement ) {
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
		while ( SelectedElement && ( SelectedElement.className !== 'PinControl-Pin' ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		var DroppedPinRange;
		if (  SelectedElement && SelectedElement.className === 'PinControl-Pin' ) {
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
			MouseEvent.target.setAttribute ( 'src' , _MinimizeIcon );
			MouseEvent.target.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.MinimizeButton' ) );
			PinsElement.dataset.minimized = 'no';
		}
		else {
			PinsElement.setAttribute ( "style", "visibility : hidden; width: 0; min-width: 0; height: 0; margin: 0.5em;" );
			MouseEvent.target.setAttribute ( 'src' , _MaximizeIcon );
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

		var ZoomBoundsButton = L.DomUtil.create ( 'img', 'PinControl-Button', ButtonsDiv );
		ZoomBoundsButton.setAttribute ( 'src' , 'L.Marker.Pin.img/zoombounds.png' );
		ZoomBoundsButton.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.ZoomBoundsButton' ) );
		ZoomBoundsButton.id = 'PinControl-ZoomBoundsButton';
		L.DomEvent.on ( ZoomBoundsButton, 'click', _onClickZoomBounds );

		var MinMaxButton = L.DomUtil.create ( 'img', 'PinControl-Button', ButtonsDiv );
		MinMaxButton.setAttribute ( 'src' , IsMinimized ? _MaximizeIcon : _MinimizeIcon   );
		MinMaxButton.setAttribute ( 'title' , _Translator.getText ( IsMinimized ? 'L.Marker.Pin.Control.onAdd.MaximizeButton' : 'L.Marker.Pin.Control.onAdd.MinimizeButton' ) );
		MinMaxButton.id = 'PinControl-MinMaxButton';
		L.DomEvent.on ( MinMaxButton, 'click', _onClickMinMax );
		
		var ExtendButton = L.DomUtil.create ( 'img', 'PinControl-Button', ButtonsDiv );
		ExtendButton.setAttribute ( 'src' , _ExtendIcon );
		ExtendButton.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.ExtendButton' ) );
		ExtendButton.id = 'PinControl-ExtendButton';
		L.DomEvent.on ( ExtendButton, 'click', _onClickExtend );

		var ReduceButton = L.DomUtil.create ( 'img', 'PinControl-Button', ButtonsDiv );
		ReduceButton.setAttribute ( 'src' , _ReduceIcon );
		ReduceButton.setAttribute ( 'title' , _Translator.getText ( 'L.Marker.Pin.Control.onAdd.ReduceButton' ) );
		ReduceButton.id = 'PinControl-ReduceButton';
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
					_MinimizeIcon = 'L.Marker.Pin.img/ArrowTopLeft.png';
					_MaximizeIcon = 'L.Marker.Pin.img/ArrowBottomRight.png';
					_ReduceIcon = 'L.Marker.Pin.img/ArrowTop.png';
					_ExtendIcon = 'L.Marker.Pin.img/ArrowBottom.png';
					break;
					case 'topright':
					_MinimizeIcon = 'L.Marker.Pin.img/ArrowTopRight.png';
					_MaximizeIcon = 'L.Marker.Pin.img/ArrowBottomLeft.png';
					_ReduceIcon = 'L.Marker.Pin.img/ArrowTop.png';
					_ExtendIcon = 'L.Marker.Pin.img/ArrowBottom.png';
					break;
					case 'bottomright':
					_MinimizeIcon = 'L.Marker.Pin.img/ArrowBottomRight.png';
					_MaximizeIcon = 'L.Marker.Pin.img/ArrowTopLeft.png';
					_ReduceIcon = 'L.Marker.Pin.img/ArrowBottom.png';
					_ExtendIcon = 'L.Marker.Pin.img/ArrowTop.png';
					_ButtonsOnTop = false;
					break;
					default:
					_MinimizeIcon = 'L.Marker.Pin.img/ArrowBottomLeft.png';
					_MaximizeIcon = 'L.Marker.Pin.img/ArrowTopRight.png';
					_ReduceIcon = 'L.Marker.Pin.img/ArrowBottom.png';
					_ExtendIcon = 'L.Marker.Pin.img/ArrowTop.png';
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