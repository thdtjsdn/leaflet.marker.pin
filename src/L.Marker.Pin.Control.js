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
	
	This object extends ...

	Doc not reviewed
	No automated unit tests for this object

	------------------------------------------------------------------------------------------------------------------------
	*/

	var _DraggedPinRange = '0';

	var _Pins;
	if ( typeof module !== 'undefined' && module.exports ) {
		_Pins = require ('./L.Marker.Pin.Pins' );
	}
	else {
		_Pins = L.marker.pin.pins ( );
	}
	
	var _Map;
	
	var _onClick = function ( Event ) 
	{ 
		Event.stopPropagation ( );
	};

	var _onDblClick = function ( Event ) 
	{ 
		var SelectedElement = Event.target;
		while ( SelectedElement && ( SelectedElement.className !== 'PinControl-Pin' ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		if ( SelectedElement ) {
			var Pin = _Pins.zoomTo ( SelectedElement.dataset.pinRange );
		}
		Event.stopPropagation ( );
	};

	var _onDragStart = function ( Event ) 
	{ 
		try {
			Event.dataTransfer.setData ( 'PinRange', Event.target.dataset.pinRange );
		}
		catch ( e ) {
		}
		_DraggedPinRange = Event.target.dataset.pinRange;
		Event.stopPropagation ( );
	};

	var _onDragEnd = function ( Event ) 
	{ 
		Event.stopPropagation ( );
	};
	
	var _onMouseDown = function ( Event ) 
	{ 
		Event.stopPropagation ( );
	};
	
	var _onDrop = function ( Event ) 
	{ 
		var SelectedElement = Event.target;
		while ( SelectedElement && ( SelectedElement.className !== 'PinControl-Pin' ) ) {
			SelectedElement = SelectedElement.parentNode;
		}
		var DroppedPinRange;
		if (  SelectedElement && SelectedElement.className === 'PinControl-Pin' ) {
			DroppedPinRange =  SelectedElement.dataset.pinRange;
			if (  ( Event.clientY - SelectedElement.getBoundingClientRect().top ) < ( SelectedElement.getBoundingClientRect().bottom - Event.clientY ) ) {
				_Pins.order ( _DraggedPinRange, DroppedPinRange, false );
			}
			else {
				_Pins.order ( _DraggedPinRange, DroppedPinRange, true );
			}
		}
		Event.stopPropagation ( );
	};
	
	var _onClickZoomBounds = function ( Event ) 
	{ 
		var ZoomBounds = _Pins.LatLngBounds;
		if ( ZoomBounds.isValid ( ) ) {
			_Map.fitBounds ( ZoomBounds );
		}
		Event.stopPropagation ( );
	};

	var _onClickMinMax = function ( Event ) 
	{ 
		var PinsElement = document.getElementById ( 'PinControl-Pins' );
		if ( PinsElement.style.visibility === "hidden" ) {
			PinsElement.setAttribute("style", "visibility : visible; width: auto; min-width: 20em; height: auto; margin: 0.5em;" );
			Event.target.setAttribute ( 'src' , 'L.Marker.Pin.img/minimize.png' );
		}
		else {
			PinsElement.setAttribute("style", "visibility : hidden; width: 0; min-width: 0; height: 0; margin: 0;" );
			Event.target.setAttribute ( 'src' , 'L.Marker.Pin.img/maximize.png' );
		}
		Event.stopPropagation ( );
	};
	
	L.Marker.Pin.Control = L.Control.extend ( {
			options : {
				position: 'topright'
			},
		initialize: function ( options ) {
				L.Util.setOptions( this, options );
			},
		onAdd : function ( Map ) {
				_Map = Map;
				
				var MainDiv = L.DomUtil.create ( 'div', 'PinControl-MainDiv' );
				MainDiv.id = 'PinControl-MainDiv';

				var PinsDiv = L.DomUtil.create ( 'div', 'PinControl-Pins', MainDiv );
				PinsDiv.id = 'PinControl-Pins';

				L.DomEvent.on ( MainDiv, 'click', _onClick );
				L.DomEvent.on ( MainDiv, 'dblclick', _onDblClick );
				L.DomEvent.on ( MainDiv, 'dragstart', _onDragStart );
				L.DomEvent.on (	MainDiv, 'dragend', _onDragEnd );
				L.DomEvent.on ( MainDiv, 'mousedown', _onMouseDown );
				L.DomEvent.on ( MainDiv, 'drop', _onDrop );
				
				var ButtonsDiv = L.DomUtil.create ( 'div', 'PinControl-Buttons', MainDiv );

				var ZoomBoundsButton = L.DomUtil.create ( 'img', 'PinControl-Button', ButtonsDiv );
				ZoomBoundsButton.setAttribute ( 'src' , 'L.Marker.Pin.img/zoombounds.png' );
				ZoomBoundsButton.id = 'PinControl-ZoomBoundsButton';
				L.DomEvent.on ( ZoomBoundsButton, 'click', _onClickZoomBounds );

				var MinMaxButton = L.DomUtil.create ( 'img', 'PinControl-Button', ButtonsDiv );
				MinMaxButton.setAttribute ( 'src' , 'L.Marker.Pin.img/minimize.png' );
				MinMaxButton.id = 'PinControl-MinMaxButton';
				L.DomEvent.on ( MinMaxButton, 'click', _onClickMinMax );
								
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