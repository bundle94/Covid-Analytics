const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var clientBaseUrl = getRootUrl();

var countries = [{
  "name": "Faroe Islands",
  "hc-key": "fo"
}, {
  "name": "United States Minor Outlying Islands",
  "hc-key": "um"
}, {
  "name": "United States of America",
  "hc-key": "us"
}, {
  "name": "Japan",
  "hc-key": "jp"
}, {
  "name": "Seychelles",
  "hc-key": "sc"
}, {
  "name": "India",
  "hc-key": "in"
}, {
  "name": "France",
  "hc-key": "fr"
}, {
  "name": "Federated States of Micronesia",
  "hc-key": "fm"
}, {
  "name": "China",
  "hc-key": "cn"
}, {
  "name": "Serranilla Bank",
  "hc-key": "sw"
}, {
  "name": "Scarborough Reef",
  "hc-key": "sh"
}, {
  "name": "Brazil",
  "hc-key": "br"
}, {
  "name": "Ecuador",
  "hc-key": "ec"
}, {
  "name": "Australia",
  "hc-key": "au"
}, {
  "name": "Kiribati",
  "hc-key": "ki"
}, {
  "name": "Philippines",
  "hc-key": "ph"
}, {
  "name": "Mexico",
  "hc-key": "mx"
}, {
  "name": "Spain",
  "hc-key": "es"
}, {
  "name": "Bajo Nuevo Bank (Petrel Is.)",
  "hc-key": "bu"
}, {
  "name": "Maldives",
  "hc-key": "mv"
}, {
  "name": "Spratly Islands",
  "hc-key": "sp"
}, {
  "name": "United Kingdom",
  "hc-key": "gb"
}, {
  "name": "Greece",
  "hc-key": "gr"
}, {
  "name": "American Samoa",
  "hc-key": "as"
}, {
  "name": "Denmark",
  "hc-key": "dk"
}, {
  "name": "Greenland",
  "hc-key": "gl"
}, {
  "name": "Guam",
  "hc-key": "gu"
}, {
  "name": "Northern Mariana Islands",
  "hc-key": "mp"
}, {
  "name": "Puerto Rico",
  "hc-key": "pr"
}, {
  "name": "United States Virgin Islands",
  "hc-key": "vi"
}, {
  "name": "Canada",
  "hc-key": "ca"
}, {
  "name": "Sao Tome and Principe",
  "hc-key": "st"
}, {
  "name": "Cape Verde",
  "hc-key": "cv"
}, {
  "name": "Dominica",
  "hc-key": "dm"
}, {
  "name": "Netherlands",
  "hc-key": "nl"
}, {
  "name": "Yemen",
  "hc-key": "ye"
}, {
  "name": "Jamaica",
  "hc-key": "jm"
}, {
  "name": "Samoa",
  "hc-key": "ws"
}, {
  "name": "Oman",
  "hc-key": "om"
}, {
  "name": "Saint Vincent and the Grenadines",
  "hc-key": "vc"
}, {
  "name": "Turkey",
  "hc-key": "tr"
}, {
  "name": "Bangladesh",
  "hc-key": "bd"
}, {
  "name": "Solomon Islands",
  "hc-key": "sb"
}, {
  "name": "Saint Lucia",
  "hc-key": "lc"
}, {
  "name": "Nauru",
  "hc-key": "nr"
}, {
  "name": "Norway",
  "hc-key": "no"
}, {
  "name": "Saint Kitts and Nevis",
  "hc-key": "kn"
}, {
  "name": "Bahrain",
  "hc-key": "bh"
}, {
  "name": "Tonga",
  "hc-key": "to"
}, {
  "name": "Finland",
  "hc-key": "fi"
}, {
  "name": "Indonesia",
  "hc-key": "id"
}, {
  "name": "Mauritius",
  "hc-key": "mu"
}, {
  "name": "Sweden",
  "hc-key": "se"
}, {
  "name": "Trinidad and Tobago",
  "hc-key": "tt"
}, {
  "name": "Malaysia",
  "hc-key": "my"
}, {
  "name": "The Bahamas",
  "hc-key": "bs"
}, {
  "name": "Palau",
  "hc-key": "pw"
}, {
  "name": "Tuvalu",
  "hc-key": "tv"
}, {
  "name": "Marshall Islands",
  "hc-key": "mh"
}, {
  "name": "Chile",
  "hc-key": "cl"
}, {
  "name": "Thailand",
  "hc-key": "th"
}, {
  "name": "Grenada",
  "hc-key": "gd"
}, {
  "name": "Estonia",
  "hc-key": "ee"
}, {
  "name": "Antigua and Barbuda",
  "hc-key": "ag"
}, {
  "name": "Taiwan",
  "hc-key": "tw"
}, {
  "name": "Barbados",
  "hc-key": "bb"
}, {
  "name": "Italy",
  "hc-key": "it"
}, {
  "name": "Malta",
  "hc-key": "mt"
}, {
  "name": "Papua New Guinea",
  "hc-key": "pg"
}, {
  "name": "Vanuatu",
  "hc-key": "vu"
}, {
  "name": "Singapore",
  "hc-key": "sg"
}, {
  "name": "Cyprus",
  "hc-key": "cy"
}, {
  "name": "Comoros",
  "hc-key": "km"
}, {
  "name": "Fiji",
  "hc-key": "fj"
}, {
  "name": "Russia",
  "hc-key": "ru"
}, {
  "name": "Vatican",
  "hc-key": "va"
}, {
  "name": "San Marino",
  "hc-key": "sm"
}, {
  "name": "Kazakhstan",
  "hc-key": "kz"
}, {
  "name": "Azerbaijan",
  "hc-key": "az"
}, {
  "name": "Armenia",
  "hc-key": "am"
}, {
  "name": "Tajikistan",
  "hc-key": "tj"
}, {
  "name": "Lesotho",
  "hc-key": "ls"
}, {
  "name": "Uzbekistan",
  "hc-key": "uz"
}, {
  "name": "Portugal",
  "hc-key": "pt"
}, {
  "name": "Morocco",
  "hc-key": "ma"
}, {
  "name": "Colombia",
  "hc-key": "co"
}, {
  "name": "East Timor",
  "hc-key": "tl"
}, {
  "name": "United Republic of Tanzania",
  "hc-key": "tz"
}, {
  "name": "Cambodia",
  "hc-key": "kh"
}, {
  "name": "Argentina",
  "hc-key": "ar"
}, {
  "name": "Saudi Arabia",
  "hc-key": "sa"
}, {
  "name": "Pakistan",
  "hc-key": "pk"
}, {
  "name": "United Arab Emirates",
  "hc-key": "ae"
}, {
  "name": "Kenya",
  "hc-key": "ke"
}, {
  "name": "Peru",
  "hc-key": "pe"
}, {
  "name": "Dominican Republic",
  "hc-key": "do"
}, {
  "name": "Haiti",
  "hc-key": "ht"
}, {
  "name": "Angola",
  "hc-key": "ao"
}, {
  "name": "Mozambique",
  "hc-key": "mz"
}, {
  "name": "Panama",
  "hc-key": "pa"
}, {
  "name": "Costa Rica",
  "hc-key": "cr"
}, {
  "name": "Iran",
  "hc-key": "ir"
}, {
  "name": "El Salvador",
  "hc-key": "sv"
}, {
  "name": "Guinea Bissau",
  "hc-key": "gw"
}, {
  "name": "Croatia",
  "hc-key": "hr"
}, {
  "name": "Belize",
  "hc-key": "bz"
}, {
  "name": "South Africa",
  "hc-key": "za"
}, {
  "name": "Namibia",
  "hc-key": "na"
}, {
  "name": "Central African Republic",
  "hc-key": "cf"
}, {
  "name": "Sudan",
  "hc-key": "sd"
}, {
  "name": "Libya",
  "hc-key": "ly"
}, {
  "name": "Democratic Republic of the Congo",
  "hc-key": "cd"
}, {
  "name": "Kuwait",
  "hc-key": "kw"
}, {
  "name": "Germany",
  "hc-key": "de"
}, {
  "name": "Ireland",
  "hc-key": "ie"
}, {
  "name": "North Korea",
  "hc-key": "kp"
}, {
  "name": "South Korea",
  "hc-key": "kr"
}, {
  "name": "Guyana",
  "hc-key": "gy"
}, {
  "name": "Honduras",
  "hc-key": "hn"
}, {
  "name": "Myanmar",
  "hc-key": "mm"
}, {
  "name": "Gabon",
  "hc-key": "ga"
}, {
  "name": "Equatorial Guinea",
  "hc-key": "gq"
}, {
  "name": "Nicaragua",
  "hc-key": "ni"
}, {
  "name": "Uganda",
  "hc-key": "ug"
}, {
  "name": "Malawi",
  "hc-key": "mw"
}, {
  "name": "Turkmenistan",
  "hc-key": "tm"
}, {
  "name": "Somaliland",
  "hc-key": "sx"
}, {
  "name": "Zambia",
  "hc-key": "zm"
}, {
  "name": "Northern Cyprus",
  "hc-key": "nc"
}, {
  "name": "Mauritania",
  "hc-key": "mr"
}, {
  "name": "Algeria",
  "hc-key": "dz"
}, {
  "name": "Lithuania",
  "hc-key": "lt"
}, {
  "name": "Ethiopia",
  "hc-key": "et"
}, {
  "name": "Eritrea",
  "hc-key": "er"
}, {
  "name": "Ghana",
  "hc-key": "gh"
}, {
  "name": "Slovenia",
  "hc-key": "si"
}, {
  "name": "Guatemala",
  "hc-key": "gt"
}, {
  "name": "Bosnia and Herzegovina",
  "hc-key": "ba"
}, {
  "name": "Jordan",
  "hc-key": "jo"
}, {
  "name": "Syria",
  "hc-key": "sy"
}, {
  "name": "Monaco",
  "hc-key": "mc"
}, {
  "name": "Albania",
  "hc-key": "al"
}, {
  "name": "Uruguay",
  "hc-key": "uy"
}, {
  "name": "Cyprus No Mans Area",
  "hc-key": "cnm"
}, {
  "name": "Mongolia",
  "hc-key": "mn"
}, {
  "name": "Rwanda",
  "hc-key": "rw"
}, {
  "name": "Somalia",
  "hc-key": "so"
}, {
  "name": "Bolivia",
  "hc-key": "bo"
}, {
  "name": "Cameroon",
  "hc-key": "cm"
}, {
  "name": "Republic of Congo",
  "hc-key": "cg"
}, {
  "name": "Western Sahara",
  "hc-key": "eh"
}, {
  "name": "Republic of Serbia",
  "hc-key": "rs"
}, {
  "name": "Montenegro",
  "hc-key": "me"
}, {
  "name": "Benin",
  "hc-key": "bj"
}, {
  "name": "Nigeria",
  "hc-key": "ng"
}, {
  "name": "Togo",
  "hc-key": "tg"
}, {
  "name": "Laos",
  "hc-key": "la"
}, {
  "name": "Afghanistan",
  "hc-key": "af"
}, {
  "name": "Ukraine",
  "hc-key": "ua"
}, {
  "name": "Slovakia",
  "hc-key": "sk"
}, {
  "name": "Siachen Glacier",
  "hc-key": "jk"
}, {
  "name": "Bulgaria",
  "hc-key": "bg"
}, {
  "name": "Qatar",
  "hc-key": "qa"
}, {
  "name": "Liechtenstein",
  "hc-key": "li"
}, {
  "name": "Austria",
  "hc-key": "at"
}, {
  "name": "Swaziland",
  "hc-key": "sz"
}, {
  "name": "Hungary",
  "hc-key": "hu"
}, {
  "name": "Romania",
  "hc-key": "ro"
}, {
  "name": "Luxembourg",
  "hc-key": "lu"
}, {
  "name": "Andorra",
  "hc-key": "ad"
}, {
  "name": "Ivory Coast",
  "hc-key": "ci"
}, {
  "name": "Liberia",
  "hc-key": "lr"
}, {
  "name": "Brunei",
  "hc-key": "bn"
}, {
  "name": "Belgium",
  "hc-key": "be"
}, {
  "name": "Iraq",
  "hc-key": "iq"
}, {
  "name": "Georgia",
  "hc-key": "ge"
}, {
  "name": "Gambia",
  "hc-key": "gm"
}, {
  "name": "Switzerland",
  "hc-key": "ch"
}, {
  "name": "Chad",
  "hc-key": "td"
}, {
  "name": "Kosovo",
  "hc-key": "kv"
}, {
  "name": "Lebanon",
  "hc-key": "lb"
}, {
  "name": "Djibouti",
  "hc-key": "dj"
}, {
  "name": "Burundi",
  "hc-key": "bi"
}, {
  "name": "Suriname",
  "hc-key": "sr"
}, {
  "name": "Israel",
  "hc-key": "il"
}, {
  "name": "Mali",
  "hc-key": "ml"
}, {
  "name": "Senegal",
  "hc-key": "sn"
}, {
  "name": "Guinea",
  "hc-key": "gn"
}, {
  "name": "Zimbabwe",
  "hc-key": "zw"
}, {
  "name": "Poland",
  "hc-key": "pl"
}, {
  "name": "Macedonia",
  "hc-key": "mk"
}, {
  "name": "Paraguay",
  "hc-key": "py"
}, {
  "name": "Belarus",
  "hc-key": "by"
}, {
  "name": "Latvia",
  "hc-key": "lv"
}, {
  "name": "Burkina Faso",
  "hc-key": "bf"
}, {
  "name": "Niger",
  "hc-key": "ne"
}, {
  "name": "Tunisia",
  "hc-key": "tn"
}, {
  "name": "Bhutan",
  "hc-key": "bt"
}, {
  "name": "Moldova",
  "hc-key": "md"
}, {
  "name": "South Sudan",
  "hc-key": "ss"
}, {
  "name": "Botswana",
  "hc-key": "bw"
}, {
  "name": "New Zealand",
  "hc-key": "nz"
}, {
  "name": "Cuba",
  "hc-key": "cu"
}, {
  "name": "Venezuela",
  "hc-key": "ve"
}, {
  "name": "Vietnam",
  "hc-key": "vn"
}, {
  "name": "Sierra Leone",
  "hc-key": "sl"
}, {
  "name": "Madagascar",
  "hc-key": "mg"
}, {
  "name": "Iceland",
  "hc-key": "is"
}, {
  "name": "Egypt",
  "hc-key": "eg"
}, {
  "name": "Sri Lanka",
  "hc-key": "lk"
}, {
  "name": "Czech Republic",
  "hc-key": "cz"
}, {
  "name": "Kyrgyzstan",
  "hc-key": "kg"
}, {
  "name": "Nepal",
  "hc-key": "np"
}];

function getRootUrl() {
  return window.location.origin
      ? window.location.origin + '/'
      : window.location.protocol + '/' + window.location.host + '/';
}
