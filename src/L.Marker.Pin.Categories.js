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
