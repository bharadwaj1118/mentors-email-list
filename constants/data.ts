export interface timeZone {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const TIMEZONES: readonly timeZone[] = [
  { value: "-12:00", label: "(GMT -12:00) Eniwetok, Kwajalein" },
  { value: "-11:00", label: "(GMT -11:00) Midway Island, Samoa" },
  { value: "-10:00", label: "(GMT -10:00) Hawaii" },
  { value: "-09:50", label: "(GMT -9:30) Taiohae" },
  { value: "-09:00", label: "(GMT -9:00) Alaska" },
  { value: "-08:00", label: "(GMT -8:00) Pacific Time (US & Canada)" },
  { value: "-07:00", label: "(GMT -7:00) Mountain Time (US & Canada)" },
  {
    value: "-06:00",
    label: "(GMT -6:00) Central Time (US & Canada), Mexico City",
  },
  {
    value: "-05:00",
    label: "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima",
  },
  { value: "-04:50", label: "(GMT -4:30) Caracas" },
  {
    value: "-04:00",
    label: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
  },
  { value: "-03:50", label: "(GMT -3:30) Newfoundland" },
  { value: "-03:00", label: "(GMT -3:00) Brazil, Buenos Aires, Georgetown" },
  { value: "-02:00", label: "(GMT -2:00) Mid-Atlantic" },
  { value: "-01:00", label: "(GMT -1:00) Azores, Cape Verde Islands" },
  {
    value: "+00:00",
    label: "(GMT) Western Europe Time, London, Lisbon, Casablanca",
  },
  { value: "+01:00", label: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris" },
  { value: "+02:00", label: "(GMT +2:00) Kaliningrad, South Africa" },
  {
    value: "+03:00",
    label: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
  },
  { value: "+03:50", label: "(GMT +3:30) Tehran" },
  { value: "+04:00", label: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi" },
  { value: "+04:50", label: "(GMT +4:30) Kabul" },
  {
    value: "+05:00",
    label: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
  },
  { value: "+05:50", label: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi" },
  { value: "+05:75", label: "(GMT +5:45) Kathmandu, Pokhara" },
  { value: "+06:00", label: "(GMT +6:00) Almaty, Dhaka, Colombo" },
  { value: "+06:50", label: "(GMT +6:30) Yangon, Mandalay" },
  { value: "+07:00", label: "(GMT +7:00) Bangkok, Hanoi, Jakarta" },
  {
    value: "+08:00",
    label: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
  },
  { value: "+08:75", label: "(GMT +8:45) Eucla" },
  {
    value: "+09:00",
    label: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
  },
  { value: "+09:50", label: "(GMT +9:30) Adelaide, Darwin" },
  {
    value: "+10:00",
    label: "(GMT +10:00) Eastern Australia, Guam, Vladivostok",
  },
  { value: "+10:50", label: "(GMT +10:30) Lord Howe Island" },
  {
    value: "+11:00",
    label: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
  },
  { value: "+11:50", label: "(GMT +11:30) Norfolk Island" },
  {
    value: "+12:00",
    label: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
  },
  { value: "+12:75", label: "(GMT +12:45) Chatham Islands" },
  { value: "+13:00", label: "(GMT +13:00) Apia, Nukualofa" },
  { value: "+14:00", label: "(GMT +14:00) Line Islands, Tokelau" },
];

export interface language {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const LANGUAGES: readonly language[] = [
  { value: "Afrikaans", label: "Afrikaans" },
  { value: "Albanian", label: "Albanian" },
  { value: "Amharic", label: "Amharic" },
  { value: "Arabic", label: "Arabic" },
  { value: "Armenian", label: "Armenian" },
  { value: "Assamese", label: "Assamese" },
  { value: "Aymara", label: "Aymara" },
  { value: "Azerbaijani", label: "Azerbaijani" },
  { value: "Bambara", label: "Bambara" },
  { value: "Basque", label: "Basque" },
  { value: "be", label: "Belarusian" },
  { value: "bn", label: "Bengali" },
  { value: "bho", label: "Bhojpuri" },
  { value: "bs", label: "Bosnian" },
  { value: "bg", label: "Bulgarian" },
  { value: "ca", label: "Catalan" },
  { value: "ceb", label: "Cebuano" },
  { value: "zh", label: "Chinese (Simplified)" },
  { value: "zh-TW", label: "Chinese (Traditional)" },
  { value: "co", label: "Corsican" },
  { value: "hr", label: "Croatian" },
  { value: "cs", label: "Czech" },
  { value: "da", label: "Danish" },
  { value: "dv", label: "Dhivehi" },
  { value: "doi", label: "Dogri" },
  { value: "nl", label: "Dutch" },
  { value: "en", label: "English" },
  { value: "eo", label: "Esperanto" },
  { value: "et", label: "Estonian" },
  { value: "ee", label: "Ewe" },
  { value: "tl", label: "Filipino (Tagalog)" },
  { value: "fi", label: "Finnish" },
  { value: "fr", label: "French" },
  { value: "fy", label: "Frisian" },
  { value: "gl", label: "Galician" },
  { value: "ka", label: "Georgian" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "gn", label: "Guarani" },
  { value: "gu", label: "Gujarati" },
  { value: "ht", label: "Haitian Creole" },
  { value: "ha", label: "Hausa" },
  { value: "haw", label: "Hawaiian" },
  { value: "he", label: "Hebrew" },
  { value: "hi", label: "Hindi" },
  { value: "hmn", label: "Hmong" },
  { value: "hu", label: "Hungarian" },
  { value: "is", label: "Icelandic" },
  { value: "ig", label: "Igbo" },
  { value: "ilo", label: "Ilocano" },
  { value: "id", label: "Indonesian" },
  { value: "ga", label: "Irish" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "jv", label: "Javanese" },
  { value: "kn", label: "Kannada" },
  { value: "kk", label: "Kazakh" },
  { value: "km", label: "Khmer" },
  { value: "rw", label: "Kinyarwanda" },
  { value: "kok", label: "Konkani" },
  { value: "ko", label: "Korean" },
  { value: "kri", label: "Krio" },
  { value: "ku", label: "Kurdish" },
  { value: "ckb", label: "Kurdish (Sorani)" },
  { value: "ky", label: "Kyrgyz" },
  { value: "lo", label: "Lao" },
  { value: "la", label: "Latin" },
  { value: "lv", label: "Latvian" },
  { value: "ln", label: "Lingala" },
  { value: "lt", label: "Lithuanian" },
  { value: "lg", label: "Luganda" },
  { value: "lb", label: "Luxembourgish" },
  { value: "mk", label: "Macedonian" },
  { value: "mai", label: "Maithili" },
  { value: "mg", label: "Malagasy" },
  { value: "ms", label: "Malay" },
  { value: "ml", label: "Malayalam" },
  { value: "mt", label: "Maltese" },
  { value: "mi", label: "Maori" },
  { value: "mr", label: "Marathi" },
  { value: "mni", label: "Meiteilon (Manipuri)" },
  { value: "lus", label: "Mizo" },
  { value: "mn", label: "Mongolian" },
  { value: "my", label: "Myanmar (Burmese)" },
  { value: "ne", label: "Nepali" },
  { value: "no", label: "Norwegian" },
  { value: "ny", label: "Nyanja (Chichewa)" },
  { value: "or", label: "Odia (Oriya)" },
  { value: "om", label: "Oromo" },
  { value: "ps", label: "Pashto" },
  { value: "fa", label: "Persian" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese (Portugal, Brazil)" },
  { value: "pa", label: "Punjabi" },
  { value: "qu", label: "Quechua" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "sm", label: "Samoan" },
  { value: "sa", label: "Sanskrit" },
  { value: "gd", label: "Scots Gaelic" },
  { value: "nso", label: "Sepedi" },
  { value: "sr", label: "Serbian" },
  { value: "st", label: "Sesotho" },
  { value: "sn", label: "Shona" },
  { value: "sd", label: "Sindhi" },
  { value: "si", label: "Sinhala (Sinhalese)" },
  { value: "sk", label: "Slovak" },
  { value: "sl", label: "Slovenian" },
  { value: "so", label: "Somali" },
  { value: "es", label: "Spanish" },
  { value: "su", label: "Sundanese" },
  { value: "sw", label: "Swahili" },
  { value: "sv", label: "Swedish" },
  { value: "tl", label: "Tagalog (Filipino)" },
  { value: "tg", label: "Tajik" },
  { value: "ta", label: "Tamil" },
  { value: "tt", label: "Tatar" },
  { value: "te", label: "Telugu" },
  { value: "th", label: "Thai" },
  { value: "ti", label: "Tigrinya" },
  { value: "ts", label: "Tsonga" },
  { value: "tr", label: "Turkish" },
  { value: "tk", label: "Turkmen" },
  { value: "tw", label: "Twi (Akan)" },
  { value: "uk", label: "Ukrainian" },
  { value: "ur", label: "Urdu" },
  { value: "ug", label: "Uyghur" },
  { value: "uz", label: "Uzbek" },
  { value: "vi", label: "Vietnamese" },
  { value: "cy", label: "Welsh" },
  { value: "xh", label: "Xhosa" },
  { value: "yi", label: "Yiddish" },
  { value: "yo", label: "Yoruba" },
  { value: "zu", label: "Zulu" },
];

export interface country {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const COUNTRIES: readonly country[] = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bhutan", label: "Bhutan" },
  // ... and so on for all countries
];

export interface tool {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const TOOLS: readonly tool[] = [
  { value: "Zendesk", label: "Zendesk" },
  { value: "Freshdesk", label: "Freshdesk" },
  { value: "HelpScout", label: "HelpScout" },
  { value: "Gorgias", label: "Gorgias" },
  { value: "FrontApp", label: "Front App" },
  { value: "Intercom", label: "Intercom" },
  { value: "Kustomer", label: "Kustomer" },
  { value: "Acquire", label: "Acquire" },
  { value: "DevRev", label: "DevRev" },
  { value: "Dixa", label: "Dixa" },
  { value: "Gladly", label: "Gladly" },
  { value: "Helpshift", label: "Helpshift" },
  { value: "Hiver", label: "Hiver" },
  { value: "HubSpotServiceHub", label: "HubSpot Service Hub" },
  { value: "SalesforceServiceCloud", label: "Salesforce Service Cloud" },
  { value: "ServiceNow", label: "ServiceNow" },
  { value: "ZohoDesk", label: "ZohoDesk" },
  { value: "Kayako", label: "Kayako" },
  { value: "LiveChat", label: "LiveChat" },
  { value: "Siena", label: "Siena" },
  { value: "Ultimate", label: "Ultimate" },
  { value: "Ada", label: "Ada" },
  { value: "Chatbase", label: "Chatbase" },
  { value: "Guru", label: "Guru" },
  { value: "KnowledgeOwl", label: "KnowledgeOwl" },
  { value: "Confluence", label: "Confluence" },
  { value: "Capacity", label: "Capacity" },
  { value: "HelpJuice", label: "HelpJuice" },
  { value: "Docebo", label: "Docebo" },
  { value: "Workramp", label: "Workramp" },
  { value: "Lessonly", label: "Lessonly" },
  { value: "Kaizo", label: "Kaizo" },
  { value: "Evaluagent", label: "Evaluagent" },
  { value: "Happitu", label: "Happitu" },
  { value: "Klaus", label: "Klaus" },
  { value: "Waizen", label: "Waizen" },
  { value: "Loris", label: "Loris" },
  { value: "MaestroQA", label: "MaestroQA" },
  { value: "Assembled", label: "Assembled" },
  { value: "Soon", label: "Soon" },
  { value: "Idiomatic", label: "Idiomatic" },
  { value: "Salto", label: "Salto" },
  { value: "TheLoops", label: "TheLoops" },
  { value: "NiceReply", label: "NiceReply" },
  { value: "GenesisCloudCX", label: "Genesis Cloud CX" },
  { value: "NiceCXOne", label: "Nice CXOne" },
  { value: "ObserveAi", label: "Observe.ai" },
  { value: "Aircall", label: "Aircall" },
  { value: "AmazonConnect", label: "Amazon Connect" },
  { value: "Avaya", label: "Avaya" },
  { value: "8x8", label: "8x8" },
  { value: "Cisco", label: "Cisco" },
  { value: "Cordless", label: "Cordless" },
  { value: "OpenPhone", label: "OpenPhone" },
  { value: "Dialpad", label: "Dialpad" },
  { value: "RingCentral", label: "RingCentral" },
  { value: "Talkdesk", label: "Talkdesk" },
  { value: "Truco", label: "Truco" },
  { value: "FlipCX", label: "FlipCX" },
  { value: "Five9", label: "Five9" },
];

export interface expert {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const EXPERTISE: readonly expert[] = [
  { value: "Remote Work", label: "Remote Work" },
  { value: "Building a Team", label: "Building a Team" },
  { value: "Team Management", label: "Team Management" },
  { value: "Onboarding", label: "Onboarding" },
  { value: "Customer Journey Mapping", label: "Customer Journey Mapping" },
  {
    value: "User Experience (UX) Design",
    label: "User Experience (UX) Design",
  },
  {
    value: "Customer Service and Support",
    label: "Customer Service and Support",
  },
  { value: "Data Analysis and Insights", label: "Data Analysis and Insights" },
  {
    value: "Voice of the Customer (VoC) Programs",
    label: "Voice of the Customer (VoC) Programs",
  },
  {
    value: "Customer Feedback and Surveys",
    label: "Customer Feedback and Surveys",
  },
  {
    value: "Customer Loyalty and Retention",
    label: "Customer Loyalty and Retention",
  },
  {
    value: "Employee Training and Engagement",
    label: "Employee Training and Engagement",
  },
  { value: "Omni-channel Experience", label: "Omni-channel Experience" },
  { value: "Personalization", label: "Personalization" },
  {
    value: "Customer Success Management",
    label: "Customer Success Management",
  },
  { value: "Crisis Management", label: "Crisis Management" },
  { value: "Technology Integration", label: "Technology Integration" },
  { value: "Brand Experience", label: "Brand Experience" },
  { value: "Social Media Management", label: "Social Media Management" },
  { value: "Customer Advocacy", label: "Customer Advocacy" },
  { value: "Outsourcing", label: "Outsourcing" },
  { value: "Vendor Management", label: "Vendor Management" },
  { value: "Customer-led Growth", label: "Customer-led Growth" },
];

export interface industry {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const INDUSTRIES: readonly industry[] = [
  { value: "Industry1", label: "Industry1" },
  { value: "Industry2", label: "Industry2" },
  { value: "Industry3", label: "Industry3" },
  { value: "Industry4", label: "Industry4" },
  { value: "Industry5", label: "Industry5" },
];

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export interface FlavourOption {
  readonly value: string;
  readonly label: string;
  readonly rating: string;
}

export const flavourOptions: readonly FlavourOption[] = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
  { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
];

export interface StateOption {
  readonly value: string;
  readonly label: string;
}

export const stateOptions: readonly StateOption[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export const optionLength = [
  { value: 1, label: "general" },
  {
    value: 2,
    label:
      "Evil is the moment when I lack the strength to be true to the Good that compels me.",
  },
  {
    value: 3,
    label:
      "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
  },
];

export const dogOptions = [
  { id: 1, label: "Chihuahua" },
  { id: 2, label: "Bulldog" },
  { id: 3, label: "Dachshund" },
  { id: 4, label: "Akita" },
];

// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly ColourOption[] | readonly FlavourOption[];
}

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: "Colours",
    options: colourOptions,
  },
  {
    label: "Flavours",
    options: flavourOptions,
  },
];

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];
