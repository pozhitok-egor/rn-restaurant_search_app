/**
 * Attributes descring a place. Not all attributes will be available for all place types.
* @param {Array<AddressComponent>} address_components An array containing the separate components applicable to this address.

See {@link AddressComponent} for more information.
* @param {string} adr_address A representation of the place's address in the adr microformat.
* @param {string} business_status Indicates the operational status of the place, if it is a business. If no data exists, business_status is not returned.

The allowed values include: OPERATIONAL, CLOSED_TEMPORARILY, and CLOSED_PERMANENTLY
* @param {string} formatted_address A string containing the human-readable address of this place.
* @param {string} formatted_phone_number Contains the place's phone number in its local format
* @param {Geometry} geometry Contains the location and viewport for the location.

See {@link Geometry} for more information.
* @param {string} icon Contains the URL of a suggested icon which may be displayed to the user when indicating this result on a map.
* @param {string} icon_background_color
Contains the default HEX color code for the place's category.
* @param {string} icon_mask_base_uri
Contains the URL of a recommended icon, minus the .svg or .png file type extension.
* @param {string} international_phone_number Contains the place's phone number in international format. International format includes the country code, and is prefixed with the plus, +, sign. For example, the international_phone_number for Google's Sydney, Australia office is +61 2 9374 4000.
* @param {string} name Contains the human-readable name for the returned result. For establishment results, this is usually the canonicalized business name.
* @param {PlaceOpeningHours} opening_hours Contains hours of operation.

See {@link PlaceOpeningHours} for more information.
* @param {Array<PlacePhoto>} photos An array of photo objects, each containing a reference to an image.

See {@link PlacePhoto} for more information.
* @param {string} place_id A textual identifier that uniquely identifies a place. To retrieve information about the place, pass this identifier in the place_id field of a Places API request.
* @param {PlusCode} plus_code An encoded location reference, derived from latitude and longitude coordinates, that represents an area: 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator) or smaller. Plus codes can be used as a replacement for street addresses in places where they do not exist (where buildings are not numbered or streets are not named).

See {@link PlusCode} for more information.
* @param {number} price_level The price level of the place, on a scale of 0 to 4. The exact amount indicated by a specific value will vary from region to region. Price levels are interpreted as follows:

0 Free
1 Inexpensive
2 Moderate
3 Expensive
4 Very Expensive
* @param {number} rating Contains the place's rating, from 1.0 to 5.0, based on aggregated user reviews.
* @param {string} reference Deprecated
* @param {Array<PlaceReview>} reviews A JSON array of up to five reviews. If a language parameter was specified in the request, the service will bias the results to prefer reviews written in that language.

See {@link PlaceReview} for more information.
* @param {Array<string>} types Contains an array of feature {@link types} describing the given result.
* @param {string} url Contains the URL of the official Google page for this place.
* @param {number} user_ratings_total The total number of reviews, with or without text, for this place.
* @param {number} utc_offset Contains the number of minutes this place’s current timezone is offset from UTC.
* @param {string} vicinity A simplified address for the place, including the street name, street number, and locality, but not the province/state, postal code, or country.
* @param {string} website The authoritative website for this place, such as a business' homepage.
 */
export interface IPlace {
  address_components?: Array<AddressComponent>;
  adr_address?: string;
  business_status?: string;
  formatted_address?: string;
  formatted_phone_number?: string;
  geometry?: Geometry;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  international_phone_number?: string;
  name?: string;
  opening_hours?: PlaceOpeningHours;
  photos?: Array<PlacePhoto>;
  place_id: string;
  plus_code?: PlusCode;
  price_level?: number;
  rating?: number;
  reference?: string;
  reviews?: Array<PlaceReview>;
  types?: Array<types>;
  url?: string;
  user_ratings_total?: number;
  utc_offset?: number;
  vicinity?: string;
  website?: string;
}

/**
* @param long_name The full text description or name of the address component as returned by the Geocoder.
* @param short_name An abbreviated textual name for the address component, if available. For example, an address component for the state of Alaska may have a long_name of "Alaska" and a short_name of "AK" using the 2-letter postal abbreviation.
* @param types An array indicating the type of the address component
*/
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

/**
 * An object describing the location.
 */
interface Geometry {
  location: LatLngLiteral;
  viewport: Bounds;
}

/**
 * An object describing a specific location with Latitude and Longitude in decimal degrees.
 * @param lat Latitude in decimal degrees
 * @param lng Latitude in decimal degrees
*/
interface LatLngLiteral {
  lat: number;
  lng: number;
}

/**
 * A rectangle in geographical coordinates from points at the southwest and northeast corners.
*/
interface Bounds {
  northeast: LatLngLiteral;
  southwest: LatLngLiteral;
}

/**
 * An object describing the opening hours of a place.
 * @param open_now A boolean value indicating if the place is open at the current time.
 * @param periods An array of opening periods covering seven days, starting from Sunday, in chronological order.
 * @param weekday_text An array of string values with the text of weekdays.
*/
interface PlaceOpeningHours {
  open_now: boolean;
  periods?: Array<PlaceOpeningHoursPeriod>;
  weekday_text?: Array<string>;
}

/**
 * @param close May contain a pair of day and time objects describing when the place closes. If a place is always open, the close section will be missing from the response. Clients can rely on always-open being represented as an open period containing day with value 0 and time with value 0000, and no close.
 * @param open Contains a pair of day and time objects describing when the place opens.
 */
interface PlaceOpeningHoursPeriod {
  close: PlaceOpeningHoursPeriodDetail;
  open: PlaceOpeningHoursPeriodDetail;
}

/**
 * @param day A number from 0–6, corresponding to the days of the week, starting on Sunday. For example, 2 means Tuesday.
 * @param time May contain a time of day in 24-hour hhmm format. Values are in the range 0000–2359. The time will be reported in the place’s time zone.
 */
interface PlaceOpeningHoursPeriodDetail {
  day: number;
  time: string
}

/**
 * A photo of a Place. The photo can be accesed via the Place Photo API:
 * @param height The height of the photo.
 * @param html_attributions The HTML attributions for the photo.
 * @param photo_reference A string used to identify the photo when you perform a Photo request.
 * @param width The width of the photo.
 */
interface PlacePhoto {
  height: number;
  html_attributions: Array<string>;
  photo_reference: string;
  width: number;
}

/**
 * An encoded location reference, derived from latitude and longitude coordinates, that represents an area, 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator) or smaller. Plus codes can be used as a replacement for street addresses in places where they do not exist (where buildings are not numbered or streets are not named).
 * @param {string} compound_code The compound_code is a 6 character or longer local code with an explicit location (CWC8+R9, Mountain View, CA, USA).
 * @param {string} global_code The global_code is a 4 character area code and 6 character or longer local code (849VCWC8+R9).
*/
interface PlusCode {
  compound_code: string;
  global_code: string;
}

/**
 * A review of the place submitted by a user.
 * @param {string} author_name The name of the user who submitted the review. Anonymous reviews are attributed to "A Google user".
 * @param {string} language An IETF language code indicating the language used in the user's review. This field contains the main language tag only, and not the secondary tag indicating country or region. For example, all the English reviews are tagged as 'en', and not 'en-AU' or 'en-UK' and so on.
 * @param {number} rating The user's overall rating for this place. This is a whole number, ranging from 1 to 5.
 * @param {string} relative_time_description The time that the review was submitted in text, relative to the current time.
 * @param {number} time The time that the review was submitted, measured in the number of seconds since since midnight, January 1, 1970 UTC.
 * @param {string} author_url The URL to the user's Google Maps Local Guides profile, if available.
 * @param {string} profile_photo_url The URL to the user's profile photo, if available.
 * @param {string} text The user's review. When reviewing a location with Google Places, text reviews are considered optional. Therefore, this field may by empty. Note that this field may include simple HTML markup. For example, the entity reference &amp; may represent an ampersand character.
 */
export interface PlaceReview {
  author_name: string;
  language: string;
  rating: number;
  relative_time_description: string;
  time: number;
  author_url?: string;
  profile_photo_url?: string;
  text?: string;
}

type types =
  'accounting' | 'airport' | 'amusement_park' | 'aquarium' |
  'art_gallery' | 'atm' | 'bakery' | 'bank' |
  'bar' | 'beauty_salon' | 'bicycle_store' | 'book_store' |
  'bowling_alley' | 'bus_station' | 'cafe' | 'campground' |
  'car_dealer' | 'car_rental' | 'car_repair' | 'car_wash' |
  'casino' | 'cemetery' | 'church' | 'city_hall' |
  'clothing_store' | 'convenience_store' | 'courthouse' | 'dentist' |
  'department_store' | 'doctor' | 'drugstore' | 'electrician' |
  'electronics_store' | 'embassy' | 'fire_station' | 'florist' |
  'funeral_home' | 'furniture_store' | 'gas_station' | 'gym' |
  'hair_care' | 'hardware_store' | 'hindu_temple' | 'home_goods_store' |
  'hospital' | 'insurance_agency' | 'jewelry_store' | 'laundry' |
  'lawyer' | 'library' | 'light_rail_station' | 'liquor_store' |
  'local_government_office' | 'locksmith' | 'lodging' | 'meal_delivery' |
  'meal_takeaway' | 'mosque' | 'movie_rental' | 'movie_theater' |
  'moving_company' | 'museum' | 'night_club' | 'painter' |
  'park' | 'parking' | 'pet_store' | 'pharmacy' |
  'physiotherapist' | 'plumber' | 'police' | 'post_office' |
  'primary_school' | 'real_estate_agency' | 'restaurant' | 'roofing_contractor' |
  'rv_park' | 'school' | 'secondary_school' | 'shoe_store' |
  'shopping_mall' | 'spa' | 'stadium' | 'storage' |
  'store' | 'subway_station' | 'supermarket' | 'synagogue' |
  'taxi_stand' | 'tourist_attraction' | 'train_station' | 'transit_station' |
  'travel_agency' | 'university' | 'veterinary_care' | 'zoo';
