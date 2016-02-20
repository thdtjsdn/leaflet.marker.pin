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