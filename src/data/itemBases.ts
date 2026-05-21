export interface WikiItemBase {
  id: string;
  name: string;
  category: string;
  tier: 'Normal' | 'Exceptional' | 'Elite' | 'Any';
  stats: Record<string, string>;
  sockets?: string;
  qlvl?: string;
}

export const wikiItemBases: WikiItemBase[] = [
  {
    "id": "hand_axe",
    "name": "Hand Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "3",
      "damageMax": "6",
      "damageAvg": "4.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "56"
    },
    "sockets": "2",
    "qlvl": "3"
  },
  {
    "id": "hatchet",
    "name": "Hatchet",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "25",
      "damageMin": "15",
      "damageMax": "30",
      "damageAvg": "22.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "56",
      "requiredLevel": "19"
    },
    "sockets": "3",
    "qlvl": "31"
  },
  {
    "id": "tomahawk",
    "name": "Tomahawk",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "125",
      "requiredDexterity": "67",
      "damageMin": "44",
      "damageMax": "75",
      "damageAvg": "59.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "84",
      "requiredLevel": "40"
    },
    "sockets": "3",
    "qlvl": "54"
  },
  {
    "id": "axe",
    "name": "Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "32",
      "damageMin": "4",
      "damageMax": "11",
      "damageAvg": "7.5",
      "speed": "10",
      "meleeRange": "2",
      "durability": "48"
    },
    "sockets": "4",
    "qlvl": "7"
  },
  {
    "id": "cleaver",
    "name": "Cleaver",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "68",
      "damageMin": "14",
      "damageMax": "47",
      "damageAvg": "30.5",
      "speed": "10",
      "meleeRange": "2",
      "durability": "48",
      "requiredLevel": "22"
    },
    "sockets": "4",
    "qlvl": "34"
  },
  {
    "id": "small_crescent",
    "name": "Small Crescent",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "115",
      "requiredDexterity": "83",
      "damageMin": "47",
      "damageMax": "75",
      "damageAvg": "60",
      "speed": "10",
      "meleeRange": "2",
      "durability": "72",
      "requiredLevel": "45"
    },
    "sockets": "4",
    "qlvl": "61"
  },
  {
    "id": "double_axe",
    "name": "Double Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "43",
      "damageMin": "5",
      "damageMax": "13",
      "damageAvg": "9",
      "speed": "10",
      "meleeRange": "2",
      "durability": "48"
    },
    "sockets": "4/5/5",
    "qlvl": "13"
  },
  {
    "id": "twin_axe",
    "name": "Twin Axe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "85",
      "damageMin": "18",
      "damageMax": "54",
      "damageAvg": "36",
      "speed": "10",
      "meleeRange": "2",
      "durability": "48",
      "requiredLevel": "25"
    },
    "sockets": "4/5/5",
    "qlvl": "39"
  },
  {
    "id": "ettin_axe",
    "name": "Ettin Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "145",
      "requiredDexterity": "45",
      "damageMin": "41",
      "damageMax": "83",
      "damageAvg": "62",
      "speed": "10",
      "meleeRange": "2",
      "durability": "72",
      "requiredLevel": "52"
    },
    "sockets": "4/5/5",
    "qlvl": "70"
  },
  {
    "id": "military_pick",
    "name": "Military Pick",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "49",
      "requiredDexterity": "33",
      "damageMin": "7",
      "damageMax": "11",
      "damageAvg": "9",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "52"
    },
    "sockets": "4/5/6",
    "qlvl": "19"
  },
  {
    "id": "crowbill",
    "name": "Crowbill",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "94",
      "requiredDexterity": "70",
      "damageMin": "21",
      "damageMax": "48",
      "damageAvg": "34.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "52",
      "requiredLevel": "25"
    },
    "sockets": "4/5/6",
    "qlvl": "43"
  },
  {
    "id": "war_spike",
    "name": "War Spike",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "133",
      "requiredDexterity": "54",
      "damageMin": "38",
      "damageMax": "60",
      "damageAvg": "49",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "78",
      "requiredLevel": "59"
    },
    "sockets": "4/5/6",
    "qlvl": "79"
  },
  {
    "id": "war_axe",
    "name": "War Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "67",
      "damageMin": "12",
      "damageMax": "20",
      "damageAvg": "16",
      "speed": "0",
      "meleeRange": "2",
      "durability": "52"
    },
    "sockets": "4/5/6",
    "qlvl": "25"
  },
  {
    "id": "naga",
    "name": "Naga",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "121",
      "damageMin": "23",
      "damageMax": "64",
      "damageAvg": "43.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "52",
      "requiredLevel": "25"
    },
    "sockets": "4/5/6",
    "qlvl": "48"
  },
  {
    "id": "berserker_axe",
    "name": "Berserker Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "138",
      "requiredDexterity": "59",
      "damageMin": "30",
      "damageMax": "89",
      "damageAvg": "59.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "78",
      "requiredLevel": "64"
    },
    "sockets": "4/5/6",
    "qlvl": "85"
  },
  {
    "id": "large_axe",
    "name": "Large Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "35",
      "damageMin": "6",
      "damageMax": "13",
      "damageAvg": "9.5",
      "speed": "-10",
      "meleeRange": "3",
      "durability": "60"
    },
    "sockets": "4",
    "qlvl": "6"
  },
  {
    "id": "military_axe",
    "name": "Military Axe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "73",
      "damageMin": "21",
      "damageMax": "61",
      "damageAvg": "41",
      "speed": "-10",
      "meleeRange": "3",
      "durability": "60",
      "requiredLevel": "22"
    },
    "sockets": "4/5/5",
    "qlvl": "34"
  },
  {
    "id": "feral_axe",
    "name": "Feral Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "196",
      "damageMin": "31",
      "damageMax": "154",
      "damageAvg": "92.5",
      "speed": "-15",
      "meleeRange": "3",
      "durability": "90",
      "requiredLevel": "42"
    },
    "sockets": "4/5/5",
    "qlvl": "57"
  },
  {
    "id": "broad_axe",
    "name": "Broad Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "48",
      "damageMin": "10",
      "damageMax": "18",
      "damageAvg": "14",
      "speed": "0",
      "meleeRange": "3",
      "durability": "70"
    },
    "sockets": "4/5/5",
    "qlvl": "12"
  },
  {
    "id": "bearded_axe",
    "name": "Bearded Axe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "92",
      "damageMin": "30",
      "damageMax": "70",
      "damageAvg": "50",
      "speed": "0",
      "meleeRange": "3",
      "durability": "70",
      "requiredLevel": "25"
    },
    "sockets": "4/5/5",
    "qlvl": "38"
  },
  {
    "id": "silver_edged_axe",
    "name": "Silver-edged Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "166",
      "requiredDexterity": "65",
      "damageMin": "78",
      "damageMax": "138",
      "damageAvg": "108",
      "speed": "0",
      "meleeRange": "3",
      "durability": "105",
      "requiredLevel": "48"
    },
    "sockets": "4/5/5",
    "qlvl": "65"
  },
  {
    "id": "battle_axe",
    "name": "Battle Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "54",
      "damageMin": "12",
      "damageMax": "32",
      "damageAvg": "22",
      "speed": "10",
      "meleeRange": "3",
      "durability": "80"
    },
    "sockets": "4/5/5",
    "qlvl": "17"
  },
  {
    "id": "tabar",
    "name": "Tabar",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "101",
      "damageMin": "35",
      "damageMax": "99",
      "damageAvg": "67",
      "speed": "10",
      "meleeRange": "3",
      "durability": "80",
      "requiredLevel": "25"
    },
    "sockets": "4/5/5",
    "qlvl": "42"
  },
  {
    "id": "decapitator",
    "name": "Decapitator",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "189",
      "requiredDexterity": "33",
      "damageMin": "61",
      "damageMax": "171",
      "damageAvg": "116",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "54"
    },
    "sockets": "4/5/5",
    "qlvl": "73"
  },
  {
    "id": "great_axe",
    "name": "Great Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "63",
      "requiredDexterity": "39",
      "damageMin": "9",
      "damageMax": "30",
      "damageAvg": "19.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "100"
    },
    "sockets": "4/5/6",
    "qlvl": "23"
  },
  {
    "id": "gothic_axe",
    "name": "Gothic Axe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "115",
      "requiredDexterity": "79",
      "damageMin": "23",
      "damageMax": "100",
      "damageAvg": "61.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "4/5/6",
    "qlvl": "46"
  },
  {
    "id": "champion_axe",
    "name": "Champion Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "167",
      "requiredDexterity": "59",
      "damageMin": "74",
      "damageMax": "118",
      "damageAvg": "96",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "120",
      "requiredLevel": "61"
    },
    "sockets": "4/5/6",
    "qlvl": "82"
  },
  {
    "id": "giant_axe",
    "name": "Giant Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "70",
      "damageMin": "22",
      "damageMax": "45",
      "damageAvg": "63.5",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100"
    },
    "sockets": "4/5/6",
    "qlvl": "27"
  },
  {
    "id": "ancient_axe",
    "name": "Ancient Axe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "125",
      "damageMin": "62",
      "damageMax": "122",
      "damageAvg": "92",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "4/5/6",
    "qlvl": "51"
  },
  {
    "id": "glorious_axe",
    "name": "Glorious Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "164",
      "requiredDexterity": "55",
      "damageMin": "75",
      "damageMax": "155",
      "damageAvg": "115",
      "speed": "10",
      "meleeRange": "3",
      "durability": "120",
      "requiredLevel": "66"
    },
    "sockets": "4/5/6",
    "qlvl": "85"
  },
  {
    "id": "club",
    "name": "Club",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "1",
      "damageMax": "6",
      "damageAvg": "3.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "48"
    },
    "sockets": "2",
    "qlvl": "1"
  },
  {
    "id": "cudgel",
    "name": "Cudgel",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "10",
      "damageMax": "30",
      "damageAvg": "20",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "48",
      "requiredLevel": "18"
    },
    "sockets": "3",
    "qlvl": "30"
  },
  {
    "id": "truncheon",
    "name": "Truncheon",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "88",
      "requiredDexterity": "43",
      "damageMin": "44",
      "damageMax": "54",
      "damageAvg": "49",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "110",
      "requiredLevel": "39"
    },
    "sockets": "3",
    "qlvl": "52"
  },
  {
    "id": "spiked_club",
    "name": "Spiked Club",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "5",
      "damageMax": "8",
      "damageAvg": "6.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "72"
    },
    "sockets": "2",
    "qlvl": "4"
  },
  {
    "id": "barbed_club",
    "name": "Barbed Club",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "30",
      "damageMin": "18",
      "damageMax": "36",
      "damageAvg": "27",
      "speed": "0",
      "meleeRange": "2",
      "durability": "72",
      "requiredLevel": "20"
    },
    "sockets": "3",
    "qlvl": "32"
  },
  {
    "id": "tyrant_club",
    "name": "Tyrant Club",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "133",
      "damageMin": "43",
      "damageMax": "75",
      "damageAvg": "59",
      "speed": "0",
      "meleeRange": "2",
      "durability": "130",
      "requiredLevel": "42"
    },
    "sockets": "3",
    "qlvl": "57"
  },
  {
    "id": "mace",
    "name": "Mace",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "27",
      "damageMin": "3",
      "damageMax": "10",
      "damageAvg": "6.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "120"
    },
    "sockets": "2",
    "qlvl": "8"
  },
  {
    "id": "flanged_mace",
    "name": "Flanged Mace",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "61",
      "damageMin": "22",
      "damageMax": "33",
      "damageAvg": "27.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "120",
      "requiredLevel": "23"
    },
    "sockets": "3",
    "qlvl": "35"
  },
  {
    "id": "reinforced_mace",
    "name": "Reinforced Mace",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "145",
      "requiredDexterity": "46",
      "damageMin": "56",
      "damageMax": "66",
      "damageAvg": "61",
      "speed": "0",
      "meleeRange": "2",
      "durability": "120",
      "requiredLevel": "47"
    },
    "sockets": "3",
    "qlvl": "63"
  },
  {
    "id": "morning_star",
    "name": "Morning Star",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "36",
      "damageMin": "7",
      "damageMax": "16",
      "damageAvg": "11.5",
      "speed": "10",
      "meleeRange": "2",
      "durability": "144"
    },
    "sockets": "3",
    "qlvl": "13"
  },
  {
    "id": "jagged_star",
    "name": "Jagged Star",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "74",
      "damageMin": "29",
      "damageMax": "45",
      "damageAvg": "37",
      "speed": "10",
      "meleeRange": "2",
      "durability": "144",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "39"
  },
  {
    "id": "devil_star",
    "name": "Devil Star",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "153",
      "requiredDexterity": "44",
      "damageMin": "56",
      "damageMax": "69",
      "damageAvg": "62.5",
      "speed": "10",
      "meleeRange": "2",
      "durability": "144",
      "requiredLevel": "52"
    },
    "sockets": "3",
    "qlvl": "70"
  },
  {
    "id": "flail",
    "name": "Flail",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "41",
      "requiredDexterity": "35",
      "damageMin": "1",
      "damageMax": "24",
      "damageAvg": "12.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "60"
    },
    "sockets": "3/4/5",
    "qlvl": "19"
  },
  {
    "id": "knout",
    "name": "Knout",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "82",
      "requiredDexterity": "73",
      "damageMin": "18",
      "damageMax": "50",
      "damageAvg": "34",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "60",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "43"
  },
  {
    "id": "scourge",
    "name": "Scourge",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "125",
      "requiredDexterity": "77",
      "damageMin": "14",
      "damageMax": "100",
      "damageAvg": "57",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "130",
      "requiredLevel": "57"
    },
    "sockets": "3/4/5",
    "qlvl": "76"
  },
  {
    "id": "war_hammer",
    "name": "War Hammer",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "53",
      "damageMin": "22",
      "damageMax": "32",
      "damageAvg": "27",
      "speed": "20",
      "meleeRange": "2",
      "durability": "110"
    },
    "sockets": "3/4/4",
    "qlvl": "25"
  },
  {
    "id": "battle_hammer",
    "name": "Battle Hammer",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "100",
      "damageMin": "39",
      "damageMax": "60",
      "damageAvg": "49.5",
      "speed": "20",
      "meleeRange": "2",
      "durability": "110",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "48"
  },
  {
    "id": "legendary_mallet",
    "name": "Legendary Mallet",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "189",
      "damageMin": "63",
      "damageMax": "76",
      "damageAvg": "69.5",
      "speed": "20",
      "meleeRange": "2",
      "durability": "130",
      "requiredLevel": "61"
    },
    "sockets": "3/4/4",
    "qlvl": "82"
  },
  {
    "id": "maul",
    "name": "Maul",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "69",
      "damageMin": "30",
      "damageMax": "43",
      "damageAvg": "36.5",
      "speed": "10",
      "meleeRange": "4",
      "durability": "120"
    },
    "sockets": "3/4/6",
    "qlvl": "21"
  },
  {
    "id": "war_club",
    "name": "War Club",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "124",
      "damageMin": "69",
      "damageMax": "113",
      "damageAvg": "91",
      "speed": "10",
      "meleeRange": "4",
      "durability": "120",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "45"
  },
  {
    "id": "ogre_maul",
    "name": "Ogre Maul",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "225",
      "damageMin": "96",
      "damageMax": "132",
      "damageAvg": "114",
      "speed": "10",
      "meleeRange": "4",
      "durability": "120",
      "requiredLevel": "51"
    },
    "sockets": "3/4/6",
    "qlvl": "69"
  },
  {
    "id": "great_maul",
    "name": "Great Maul",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "99",
      "damageMin": "38",
      "damageMax": "58",
      "damageAvg": "48",
      "speed": "20",
      "meleeRange": "3",
      "durability": "120"
    },
    "sockets": "3/4/6",
    "qlvl": "32"
  },
  {
    "id": "martel_de_fer",
    "name": "Martel de Fer",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "169",
      "damageMin": "76",
      "damageMax": "131",
      "damageAvg": "103.5",
      "speed": "20",
      "meleeRange": "3",
      "durability": "120",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "53"
  },
  {
    "id": "thunder_maul",
    "name": "Thunder Maul",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "253",
      "damageMin": "41",
      "damageMax": "225",
      "damageAvg": "133",
      "speed": "20",
      "meleeRange": "3",
      "durability": "120",
      "requiredLevel": "65"
    },
    "sockets": "3/4/6",
    "qlvl": "85"
  },
  {
    "id": "short_sword",
    "name": "Short Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "2",
      "damageMax": "7",
      "damageAvg": "4.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "48"
    },
    "sockets": "2",
    "qlvl": "1"
  },
  {
    "id": "gladius",
    "name": "Gladius",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "12",
      "damageMax": "32",
      "damageAvg": "22",
      "speed": "0",
      "meleeRange": "2",
      "durability": "48",
      "requiredLevel": "18"
    },
    "sockets": "3",
    "qlvl": "30"
  },
  {
    "id": "falcata",
    "name": "Falcata",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "150",
      "requiredDexterity": "88",
      "damageMin": "39",
      "damageMax": "74",
      "damageAvg": "56.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "68",
      "requiredLevel": "42"
    },
    "sockets": "3",
    "qlvl": "56"
  },
  {
    "id": "scimitar",
    "name": "Scimitar",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "21",
      "damageMin": "2",
      "damageMax": "6",
      "damageAvg": "4",
      "speed": "-20",
      "meleeRange": "2",
      "durability": "44"
    },
    "sockets": "2",
    "qlvl": "5"
  },
  {
    "id": "cutlass",
    "name": "Cutlass",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "52",
      "damageMin": "12",
      "damageMax": "30",
      "damageAvg": "21",
      "speed": "-30",
      "meleeRange": "2",
      "durability": "44",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "43"
  },
  {
    "id": "ataghan",
    "name": "Ataghan",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "138",
      "requiredDexterity": "95",
      "damageMin": "33",
      "damageMax": "58",
      "damageAvg": "45.5",
      "speed": "-20",
      "meleeRange": "2",
      "durability": "64",
      "requiredLevel": "45"
    },
    "sockets": "3",
    "qlvl": "61"
  },
  {
    "id": "sabre",
    "name": "Sabre",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "25",
      "damageMin": "3",
      "damageMax": "8",
      "damageAvg": "5.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "64"
    },
    "sockets": "2",
    "qlvl": "8"
  },
  {
    "id": "shamshir",
    "name": "Shamshir",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "58",
      "requiredDexterity": "58",
      "damageMin": "14",
      "damageMax": "35",
      "damageAvg": "24.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "64",
      "requiredLevel": "23"
    },
    "sockets": "3",
    "qlvl": "35"
  },
  {
    "id": "elegant_blade",
    "name": "Elegant Blade",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "109",
      "requiredDexterity": "122",
      "damageMin": "41",
      "damageMax": "56",
      "damageAvg": "48.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "84",
      "requiredLevel": "47"
    },
    "sockets": "3",
    "qlvl": "63"
  },
  {
    "id": "falchion",
    "name": "Falchion",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "33",
      "damageMin": "9",
      "damageMax": "17",
      "damageAvg": "13",
      "speed": "20",
      "meleeRange": "2",
      "durability": "64"
    },
    "sockets": "2",
    "qlvl": "11"
  },
  {
    "id": "tulwar",
    "name": "Tulwar",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "70",
      "requiredDexterity": "42",
      "damageMin": "23",
      "damageMax": "50",
      "damageAvg": "36.5",
      "speed": "20",
      "meleeRange": "2",
      "durability": "64",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "37"
  },
  {
    "id": "hydra_edge",
    "name": "Hydra Edge",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "142",
      "requiredDexterity": "105",
      "damageMin": "35",
      "damageMax": "85",
      "damageAvg": "60",
      "speed": "10",
      "meleeRange": "2",
      "durability": "84",
      "requiredLevel": "51"
    },
    "sockets": "3",
    "qlvl": "69"
  },
  {
    "id": "crystal_sword",
    "name": "Crystal Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "43",
      "damageMin": "5",
      "damageMax": "15",
      "damageAvg": "10",
      "speed": "0",
      "meleeRange": "2",
      "durability": "40"
    },
    "sockets": "3/4/6",
    "qlvl": "11"
  },
  {
    "id": "dimensional_blade",
    "name": "Dimensional Blade",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "85",
      "requiredDexterity": "60",
      "damageMin": "18",
      "damageMax": "51",
      "damageAvg": "34.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "40",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "37"
  },
  {
    "id": "phase_blade",
    "name": "Phase Blade",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "136",
      "damageMin": "39",
      "damageMax": "44",
      "damageAvg": "41.5",
      "speed": "-30",
      "meleeRange": "2",
      "durability": "-",
      "requiredLevel": "54"
    },
    "sockets": "3/4/6",
    "qlvl": "73"
  },
  {
    "id": "broad_sword",
    "name": "Broad Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "48",
      "damageMin": "7",
      "damageMax": "14",
      "damageAvg": "10.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "64"
    },
    "sockets": "3/4/4",
    "qlvl": "15"
  },
  {
    "id": "battle_sword",
    "name": "Battle Sword",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "92",
      "requiredDexterity": "43",
      "damageMin": "23",
      "damageMax": "48",
      "damageAvg": "35.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "64",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "40"
  },
  {
    "id": "conquest_sword",
    "name": "Conquest Sword",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "142",
      "requiredDexterity": "112",
      "damageMin": "46",
      "damageMax": "66",
      "damageAvg": "56",
      "speed": "0",
      "meleeRange": "2",
      "durability": "84",
      "requiredLevel": "58"
    },
    "sockets": "3/4/4",
    "qlvl": "78"
  },
  {
    "id": "long_sword",
    "name": "Long Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "55",
      "requiredDexterity": "39",
      "damageMin": "3",
      "damageMax": "19",
      "damageAvg": "11",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "88"
    },
    "sockets": "3/4/4",
    "qlvl": "20"
  },
  {
    "id": "rune_sword",
    "name": "Rune Sword",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "103",
      "requiredDexterity": "79",
      "damageMin": "14",
      "damageMax": "60",
      "damageAvg": "37",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "88",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "44"
  },
  {
    "id": "cryptic_sword",
    "name": "Cryptic Sword",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "99",
      "requiredDexterity": "109",
      "damageMin": "6",
      "damageMax": "96",
      "damageAvg": "51",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "88",
      "requiredLevel": "61"
    },
    "sockets": "3/4/5",
    "qlvl": "82"
  },
  {
    "id": "war_sword",
    "name": "War Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "71",
      "requiredDexterity": "45",
      "damageMin": "8",
      "damageMax": "20",
      "damageAvg": "14",
      "speed": "0",
      "meleeRange": "2",
      "durability": "88"
    },
    "sockets": "3",
    "qlvl": "27"
  },
  {
    "id": "ancient_sword",
    "name": "Ancient Sword",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "127",
      "requiredDexterity": "88",
      "damageMin": "25",
      "damageMax": "55",
      "damageAvg": "40",
      "speed": "0",
      "meleeRange": "2",
      "durability": "88",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "49"
  },
  {
    "id": "mythical_sword",
    "name": "Mythical Sword",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "147",
      "requiredDexterity": "124",
      "damageMin": "50",
      "damageMax": "63",
      "damageAvg": "56.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "88",
      "requiredLevel": "66"
    },
    "sockets": "3",
    "qlvl": "85"
  },
  {
    "id": "two_handed_sword",
    "name": "Two-handed Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "35",
      "requiredDexterity": "27",
      "damageAvg": "12.55.5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "88"
    },
    "sockets": "3",
    "qlvl": "10"
  },
  {
    "id": "espandon",
    "name": "Espandon",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "73",
      "requiredDexterity": "61",
      "damageAvg": "4524.5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "88",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "37"
  },
  {
    "id": "legend_sword",
    "name": "Legend Sword",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "175",
      "requiredDexterity": "100",
      "damageAvg": "90.549",
      "speed": "-15",
      "meleeRange": "3",
      "durability": "88",
      "requiredLevel": "44"
    },
    "sockets": "3",
    "qlvl": "59"
  },
  {
    "id": "claymore",
    "name": "Claymore",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "47",
      "damageAvg": "21.58.5",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100"
    },
    "sockets": "3/4/4",
    "qlvl": "17"
  },
  {
    "id": "dacian_falx",
    "name": "Dacian Falx",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "91",
      "requiredDexterity": "20",
      "damageAvg": "62.530.5",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "42"
  },
  {
    "id": "highland_blade",
    "name": "Highland Blade",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "171",
      "requiredDexterity": "104",
      "damageAvg": "10253",
      "speed": "-5",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "49"
    },
    "sockets": "3/4/4",
    "qlvl": "66"
  },
  {
    "id": "giant_sword",
    "name": "Giant Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "56",
      "requiredDexterity": "34",
      "damageAvg": "18.59.5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "100"
    },
    "sockets": "3/4/4",
    "qlvl": "21"
  },
  {
    "id": "tusk_sword",
    "name": "Tusk Sword",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "104",
      "requiredDexterity": "71",
      "damageAvg": "55.533.5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "45"
  },
  {
    "id": "balrog_blade",
    "name": "Balrog Blade",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "185",
      "requiredDexterity": "87",
      "damageAvg": "10956.5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "53"
    },
    "sockets": "3/4/4",
    "qlvl": "71"
  },
  {
    "id": "bastard_sword",
    "name": "Bastard Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "62",
      "damageAvg": "2413",
      "speed": "10",
      "meleeRange": "3",
      "durability": "80"
    },
    "sockets": "3/4/4",
    "qlvl": "24"
  },
  {
    "id": "gothic_sword",
    "name": "Gothic Sword",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "113",
      "requiredDexterity": "20",
      "damageAvg": "7240",
      "speed": "10",
      "meleeRange": "3",
      "durability": "80",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "48"
  },
  {
    "id": "champion_sword",
    "name": "Champion Sword",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "163",
      "requiredDexterity": "103",
      "damageAvg": "96.549",
      "speed": "-10",
      "meleeRange": "3",
      "durability": "80",
      "requiredLevel": "57"
    },
    "sockets": "3/4/4",
    "qlvl": "77"
  },
  {
    "id": "flamberge",
    "name": "Flamberge",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "70",
      "requiredDexterity": "49",
      "damageAvg": "19.512",
      "speed": "-10",
      "meleeRange": "3",
      "durability": "100"
    },
    "sockets": "3/4/5",
    "qlvl": "27"
  },
  {
    "id": "zweihander",
    "name": "Zweihander",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "125",
      "requiredDexterity": "94",
      "damageAvg": "5939.5",
      "speed": "-10",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "49"
  },
  {
    "id": "colossus_sword",
    "name": "Colossus Sword",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "182",
      "requiredDexterity": "95",
      "damageAvg": "113.560.5",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "60"
    },
    "sockets": "3/4/5",
    "qlvl": "80"
  },
  {
    "id": "great_sword",
    "name": "Great Sword",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "100",
      "requiredDexterity": "60",
      "damageAvg": "33.516",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100"
    },
    "sockets": "3/4/6",
    "qlvl": "33"
  },
  {
    "id": "executioner_sword",
    "name": "Executioner Sword",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "170",
      "requiredDexterity": "110",
      "damageAvg": "91.543",
      "speed": "10",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "54"
  },
  {
    "id": "colossus_blade",
    "name": "Colossus Blade",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "189",
      "requiredDexterity": "110",
      "damageAvg": "108.556",
      "speed": "5",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "63"
    },
    "sockets": "3/4/6",
    "qlvl": "85"
  },
  {
    "id": "dagger",
    "name": "Dagger",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "1",
      "damageMax": "4",
      "damageAvg": "2.5",
      "speed": "-20",
      "meleeRange": "1",
      "durability": "32"
    },
    "sockets": "1",
    "qlvl": "3"
  },
  {
    "id": "poignard",
    "name": "Poignard",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "9",
      "damageMax": "26",
      "damageAvg": "17.5",
      "speed": "-20",
      "meleeRange": "1",
      "durability": "32",
      "requiredLevel": "19"
    },
    "sockets": "2",
    "qlvl": "31"
  },
  {
    "id": "bone_knife",
    "name": "Bone Knife",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "38",
      "requiredDexterity": "75",
      "damageMin": "28",
      "damageMax": "56",
      "damageAvg": "42",
      "speed": "-20",
      "meleeRange": "1",
      "durability": "72",
      "requiredLevel": "43"
    },
    "sockets": "2",
    "qlvl": "58"
  },
  {
    "id": "dirk",
    "name": "Dirk",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "25",
      "damageMin": "3",
      "damageMax": "9",
      "damageAvg": "6",
      "speed": "0",
      "meleeRange": "1",
      "durability": "40"
    },
    "sockets": "1",
    "qlvl": "9"
  },
  {
    "id": "rondel",
    "name": "Rondel",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "58",
      "damageMin": "14",
      "damageMax": "38",
      "damageAvg": "26",
      "speed": "0",
      "meleeRange": "1",
      "durability": "40",
      "requiredLevel": "24"
    },
    "sockets": "2",
    "qlvl": "36"
  },
  {
    "id": "mithril_point",
    "name": "Mithril Point",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "55",
      "requiredDexterity": "98",
      "damageMin": "43",
      "damageMax": "61",
      "damageAvg": "52",
      "speed": "0",
      "meleeRange": "1",
      "durability": "110",
      "requiredLevel": "52"
    },
    "sockets": "2",
    "qlvl": "70"
  },
  {
    "id": "kris",
    "name": "Kris",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "45",
      "damageMin": "2",
      "damageMax": "11",
      "damageAvg": "6.5",
      "speed": "-20",
      "meleeRange": "1",
      "durability": "48"
    },
    "sockets": "2/3/3",
    "qlvl": "17"
  },
  {
    "id": "cinquedeas",
    "name": "Cinquedeas",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "88",
      "damageMin": "17",
      "damageMax": "45",
      "damageAvg": "31",
      "speed": "-20",
      "meleeRange": "1",
      "durability": "48",
      "requiredLevel": "25"
    },
    "sockets": "2/3/3",
    "qlvl": "42"
  },
  {
    "id": "fanged_knife",
    "name": "Fanged Knife",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "42",
      "requiredDexterity": "86",
      "damageMin": "19",
      "damageMax": "65",
      "damageAvg": "42",
      "speed": "-20",
      "meleeRange": "1",
      "durability": "72",
      "requiredLevel": "62"
    },
    "sockets": "2/3/3",
    "qlvl": "83"
  },
  {
    "id": "blade",
    "name": "Blade",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "35",
      "requiredDexterity": "51",
      "damageMin": "4",
      "damageMax": "15",
      "damageAvg": "9.5",
      "speed": "-10",
      "meleeRange": "1",
      "durability": "48"
    },
    "sockets": "2",
    "qlvl": "23"
  },
  {
    "id": "stiletto",
    "name": "Stiletto",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "47",
      "requiredDexterity": "97",
      "damageMin": "28",
      "damageMax": "52",
      "damageAvg": "40",
      "speed": "-10",
      "meleeRange": "1",
      "durability": "48",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "46"
  },
  {
    "id": "legend_spike",
    "name": "Legend Spike",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "65",
      "requiredDexterity": "67",
      "damageMin": "36",
      "damageMax": "64",
      "damageAvg": "50",
      "speed": "-10",
      "meleeRange": "1",
      "durability": "94",
      "requiredLevel": "66"
    },
    "sockets": "2",
    "qlvl": "85"
  },
  {
    "id": "throwing_knife",
    "name": "Throwing Knife",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "21",
      "damageAvg": "4.52.5",
      "speed": "0",
      "meleeRange": "1"
    },
    "sockets": "1",
    "qlvl": "2"
  },
  {
    "id": "battle_dart",
    "name": "Battle Dart",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "52",
      "damageAvg": "2216",
      "speed": "0",
      "meleeRange": "1",
      "requiredLevel": "19"
    },
    "sockets": "2",
    "qlvl": "31"
  },
  {
    "id": "flying_knife",
    "name": "Flying Knife",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "48",
      "requiredDexterity": "141",
      "damageAvg": "38.538.5",
      "speed": "0",
      "meleeRange": "1",
      "requiredLevel": "48"
    },
    "sockets": "2",
    "qlvl": "64"
  },
  {
    "id": "throwing_axe",
    "name": "Throwing Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "40",
      "damageAvg": "7.55.5",
      "speed": "10",
      "meleeRange": "1"
    },
    "sockets": "1",
    "qlvl": "7"
  },
  {
    "id": "francisca",
    "name": "Francisca",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "80",
      "damageAvg": "31.520",
      "speed": "10",
      "meleeRange": "1",
      "requiredLevel": "22"
    },
    "sockets": "2",
    "qlvl": "34"
  },
  {
    "id": "flying_axe",
    "name": "Flying Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "88",
      "requiredDexterity": "108",
      "damageAvg": "40.541",
      "speed": "10",
      "meleeRange": "1",
      "requiredLevel": "42"
    },
    "sockets": "2",
    "qlvl": "56"
  },
  {
    "id": "balanced_knife",
    "name": "Balanced Knife",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "51",
      "damageAvg": "8.54.5",
      "speed": "-20",
      "meleeRange": "1"
    },
    "sockets": "2",
    "qlvl": "13"
  },
  {
    "id": "war_dart",
    "name": "War Dart",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "97",
      "damageAvg": "25.519",
      "speed": "-20",
      "meleeRange": "1",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "39"
  },
  {
    "id": "winged_knife",
    "name": "Winged Knife",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "45",
      "requiredDexterity": "142",
      "damageAvg": "3131",
      "speed": "-20",
      "meleeRange": "1",
      "requiredLevel": "57"
    },
    "sockets": "2",
    "qlvl": "77"
  },
  {
    "id": "balanced_axe",
    "name": "Balanced Axe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "57",
      "damageAvg": "13.57.5",
      "speed": "-10",
      "meleeRange": "1"
    },
    "sockets": "2/3/3",
    "qlvl": "16"
  },
  {
    "id": "hurlbat",
    "name": "Hurlbat",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "106",
      "damageAvg": "2926.5",
      "speed": "-10",
      "meleeRange": "1",
      "requiredLevel": "25"
    },
    "sockets": "2/3/3",
    "qlvl": "41"
  },
  {
    "id": "winged_axe",
    "name": "Winged Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "96",
      "requiredDexterity": "122",
      "damageAvg": "33.533.5",
      "speed": "-10",
      "meleeRange": "1",
      "requiredLevel": "60"
    },
    "sockets": "2/3/3",
    "qlvl": "80"
  },
  {
    "id": "javelin",
    "name": "Javelin",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageAvg": "83",
      "speed": "-10",
      "meleeRange": "3"
    },
    "sockets": "1",
    "qlvl": "1"
  },
  {
    "id": "war_javelin",
    "name": "War Javelin",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "25",
      "damageAvg": "2915.5",
      "speed": "-10",
      "meleeRange": "3",
      "requiredLevel": "18"
    },
    "sockets": "2",
    "qlvl": "30"
  },
  {
    "id": "hyperion_javelin",
    "name": "Hyperion Javelin",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "98",
      "requiredDexterity": "123",
      "damageAvg": "41.539",
      "speed": "-10",
      "meleeRange": "3",
      "requiredLevel": "40"
    },
    "sockets": "2",
    "qlvl": "54"
  },
  {
    "id": "pilum",
    "name": "Pilum",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "45",
      "damageAvg": "13.56.5",
      "speed": "0",
      "meleeRange": "3"
    },
    "sockets": "2",
    "qlvl": "10"
  },
  {
    "id": "great_pilum",
    "name": "Great Pilum",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "88",
      "damageAvg": "34.523",
      "speed": "0",
      "meleeRange": "3",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "37"
  },
  {
    "id": "stygian_pilum",
    "name": "Stygian Pilum",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "118",
      "requiredDexterity": "112",
      "damageAvg": "4839",
      "speed": "0",
      "meleeRange": "3",
      "requiredLevel": "46"
    },
    "sockets": "2",
    "qlvl": "62"
  },
  {
    "id": "short_spear",
    "name": "Short Spear",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "40",
      "requiredDexterity": "40",
      "damageAvg": "167.5",
      "speed": "10",
      "meleeRange": "3"
    },
    "sockets": "2",
    "qlvl": "15"
  },
  {
    "id": "simbilan",
    "name": "Simbilan",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "80",
      "requiredDexterity": "80",
      "damageAvg": "4625",
      "speed": "10",
      "meleeRange": "3",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "40"
  },
  {
    "id": "balrog_spear",
    "name": "Balrog Spear",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "127",
      "requiredDexterity": "95",
      "damageAvg": "5148",
      "speed": "10",
      "meleeRange": "3",
      "requiredLevel": "53"
    },
    "sockets": "2",
    "qlvl": "71"
  },
  {
    "id": "glaive",
    "name": "Glaive",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "52",
      "requiredDexterity": "35",
      "damageAvg": "1911",
      "speed": "20",
      "meleeRange": "3"
    },
    "sockets": "2/3/3",
    "qlvl": "23"
  },
  {
    "id": "spiculum",
    "name": "Spiculum",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "98",
      "requiredDexterity": "73",
      "damageAvg": "48.532",
      "speed": "20",
      "meleeRange": "3",
      "requiredLevel": "25"
    },
    "sockets": "2/3/3",
    "qlvl": "46"
  },
  {
    "id": "ghost_glaive",
    "name": "Ghost Glaive",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "89",
      "requiredDexterity": "137",
      "damageAvg": "5439.5",
      "speed": "20",
      "meleeRange": "3",
      "requiredLevel": "59"
    },
    "sockets": "2/3/3",
    "qlvl": "79"
  },
  {
    "id": "throwing_spear",
    "name": "Throwing Spear",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "65",
      "damageAvg": "2110",
      "speed": "-10",
      "meleeRange": "3"
    },
    "sockets": "2/3/3",
    "qlvl": "29"
  },
  {
    "id": "harpoon",
    "name": "Harpoon",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "118",
      "damageAvg": "4130",
      "speed": "-10",
      "meleeRange": "3",
      "requiredLevel": "25"
    },
    "sockets": "2/3/3",
    "qlvl": "51"
  },
  {
    "id": "winged_harpoon",
    "name": "Winged Harpoon",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "76",
      "requiredDexterity": "145",
      "damageAvg": "4431",
      "speed": "-10",
      "meleeRange": "3",
      "requiredLevel": "65"
    },
    "sockets": "2/3/3",
    "qlvl": "85"
  },
  {
    "id": "spear",
    "name": "Spear",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "20",
      "damageMin": "3",
      "damageMax": "15",
      "damageAvg": "9",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "60"
    },
    "sockets": "3",
    "qlvl": "5"
  },
  {
    "id": "war_spear",
    "name": "War Spear",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "25",
      "damageMin": "15",
      "damageMax": "54",
      "damageAvg": "34.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "60",
      "requiredLevel": "21"
    },
    "sockets": "3/4/4",
    "qlvl": "33"
  },
  {
    "id": "hyperion_spear",
    "name": "Hyperion Spear",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "155",
      "requiredDexterity": "120",
      "damageMin": "44",
      "damageMax": "149",
      "damageAvg": "96.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "90",
      "requiredLevel": "43"
    },
    "sockets": "3/4/6",
    "qlvl": "58"
  },
  {
    "id": "trident",
    "name": "Trident",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "38",
      "requiredDexterity": "24",
      "damageMin": "9",
      "damageMax": "15",
      "damageAvg": "12",
      "speed": "0",
      "meleeRange": "4",
      "durability": "70"
    },
    "sockets": "3/4/4",
    "qlvl": "9"
  },
  {
    "id": "fuscina",
    "name": "Fuscina",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "77",
      "requiredDexterity": "25",
      "damageMin": "24",
      "damageMax": "53",
      "damageAvg": "38.5",
      "speed": "0",
      "meleeRange": "4",
      "durability": "70",
      "requiredLevel": "24"
    },
    "sockets": "3/4/4",
    "qlvl": "36"
  },
  {
    "id": "stygian_pike",
    "name": "Stygian Pike",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "168",
      "requiredDexterity": "97",
      "damageMin": "36",
      "damageMax": "180",
      "damageAvg": "108",
      "speed": "0",
      "meleeRange": "4",
      "durability": "105",
      "requiredLevel": "49"
    },
    "sockets": "3/4/4",
    "qlvl": "66"
  },
  {
    "id": "brandistock",
    "name": "Brandistock",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "40",
      "requiredDexterity": "50",
      "damageMin": "7",
      "damageMax": "17",
      "damageAvg": "12",
      "speed": "-20",
      "meleeRange": "4",
      "durability": "56"
    },
    "sockets": "3/4/5",
    "qlvl": "16"
  },
  {
    "id": "war_fork",
    "name": "War Fork",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "80",
      "requiredDexterity": "95",
      "damageMin": "23",
      "damageMax": "58",
      "damageAvg": "40.5",
      "speed": "-20",
      "meleeRange": "4",
      "durability": "56",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "41"
  },
  {
    "id": "mancatcher",
    "name": "Mancatcher",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "132",
      "requiredDexterity": "134",
      "damageMin": "52",
      "damageMax": "115",
      "damageAvg": "83.5",
      "speed": "-20",
      "meleeRange": "4",
      "durability": "84",
      "requiredLevel": "55"
    },
    "sockets": "3/4/5",
    "qlvl": "74"
  },
  {
    "id": "spetum",
    "name": "Spetum",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "54",
      "requiredDexterity": "35",
      "damageMin": "15",
      "damageMax": "23",
      "damageAvg": "19",
      "speed": "0",
      "meleeRange": "4",
      "durability": "56"
    },
    "sockets": "3/4/6",
    "qlvl": "20"
  },
  {
    "id": "yari",
    "name": "Yari",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "101",
      "damageMin": "41",
      "damageMax": "85",
      "damageAvg": "63",
      "speed": "0",
      "meleeRange": "4",
      "durability": "56",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "44"
  },
  {
    "id": "ghost_spear",
    "name": "Ghost Spear",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "122",
      "requiredDexterity": "163",
      "damageMin": "23",
      "damageMax": "194",
      "damageAvg": "108.5",
      "speed": "0",
      "meleeRange": "4",
      "durability": "84",
      "requiredLevel": "62"
    },
    "sockets": "3/4/6",
    "qlvl": "83"
  },
  {
    "id": "pike",
    "name": "Pike",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "60",
      "requiredDexterity": "45",
      "damageMin": "14",
      "damageMax": "63",
      "damageAvg": "38.5",
      "speed": "20",
      "meleeRange": "4",
      "durability": "50"
    },
    "sockets": "3/4/6",
    "qlvl": "24"
  },
  {
    "id": "lance",
    "name": "Lance",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "110",
      "requiredDexterity": "88",
      "damageMin": "33",
      "damageMax": "163",
      "damageAvg": "98",
      "speed": "20",
      "meleeRange": "4",
      "durability": "50",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "47"
  },
  {
    "id": "war_pike",
    "name": "War Pike",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "165",
      "requiredDexterity": "106",
      "damageMin": "41",
      "damageMax": "223",
      "damageAvg": "132",
      "speed": "20",
      "meleeRange": "4",
      "durability": "75",
      "requiredLevel": "66"
    },
    "sockets": "3/4/6",
    "qlvl": "85"
  },
  {
    "id": "bardiche",
    "name": "Bardiche",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "40",
      "damageMin": "1",
      "damageMax": "27",
      "damageAvg": "14",
      "speed": "10",
      "meleeRange": "4",
      "durability": "100"
    },
    "sockets": "3",
    "qlvl": "5"
  },
  {
    "id": "lochaber_axe",
    "name": "Lochaber Axe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "80",
      "damageMin": "9",
      "damageMax": "83",
      "damageAvg": "46",
      "speed": "10",
      "meleeRange": "4",
      "durability": "100",
      "requiredLevel": "21"
    },
    "sockets": "3/4/4",
    "qlvl": "33"
  },
  {
    "id": "ogre_axe",
    "name": "Ogre Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "195",
      "requiredDexterity": "75",
      "damageMin": "35",
      "damageMax": "181",
      "damageAvg": "108",
      "speed": "0",
      "meleeRange": "4",
      "durability": "100",
      "requiredLevel": "45"
    },
    "sockets": "3/4/4",
    "qlvl": "60"
  },
  {
    "id": "voulge",
    "name": "Voulge",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "50",
      "damageMin": "6",
      "damageMax": "21",
      "damageAvg": "13.5",
      "speed": "0",
      "meleeRange": "4",
      "durability": "100"
    },
    "sockets": "3/4/4",
    "qlvl": "11"
  },
  {
    "id": "bill",
    "name": "Bill",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "95",
      "damageMin": "20",
      "damageMax": "76",
      "damageAvg": "48",
      "speed": "0",
      "meleeRange": "4",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "37"
  },
  {
    "id": "colossus_voulge",
    "name": "Colossus Voulge",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "210",
      "requiredDexterity": "55",
      "damageMin": "21",
      "damageMax": "206",
      "damageAvg": "113.5",
      "speed": "10",
      "meleeRange": "4",
      "durability": "100",
      "requiredLevel": "48"
    },
    "sockets": "3/4/4",
    "qlvl": "64"
  },
  {
    "id": "scythe",
    "name": "Scythe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "41",
      "requiredDexterity": "41",
      "damageMin": "8",
      "damageMax": "20",
      "damageAvg": "14",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "130"
    },
    "sockets": "3/4/5",
    "qlvl": "15"
  },
  {
    "id": "battle_scythe",
    "name": "Battle Scythe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "82",
      "requiredDexterity": "82",
      "damageMin": "25",
      "damageMax": "64",
      "damageAvg": "44.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "130",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "40"
  },
  {
    "id": "thresher",
    "name": "Thresher",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "152",
      "requiredDexterity": "118",
      "damageMin": "15",
      "damageMax": "176",
      "damageAvg": "95.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "130",
      "requiredLevel": "53"
    },
    "sockets": "3/4/5",
    "qlvl": "71"
  },
  {
    "id": "poleaxe",
    "name": "Poleaxe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "62",
      "damageMin": "18",
      "damageMax": "39",
      "damageAvg": "28.5",
      "speed": "10",
      "meleeRange": "4",
      "durability": "130"
    },
    "sockets": "3/4/5",
    "qlvl": "21"
  },
  {
    "id": "partizan",
    "name": "Partizan",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "113",
      "requiredDexterity": "67",
      "damageMin": "49",
      "damageMax": "108",
      "damageAvg": "78.5",
      "speed": "10",
      "meleeRange": "4",
      "durability": "130",
      "requiredLevel": "23"
    },
    "sockets": "3/4/5",
    "qlvl": "35"
  },
  {
    "id": "cryptic_axe",
    "name": "Cryptic Axe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "165",
      "requiredDexterity": "103",
      "damageMin": "41",
      "damageMax": "188",
      "damageAvg": "114.5",
      "speed": "10",
      "meleeRange": "4",
      "durability": "130",
      "requiredLevel": "59"
    },
    "sockets": "3/4/5",
    "qlvl": "79"
  },
  {
    "id": "halberd",
    "name": "Halberd",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "75",
      "requiredDexterity": "47",
      "damageMin": "12",
      "damageMax": "45",
      "damageAvg": "28.5",
      "speed": "0",
      "meleeRange": "4",
      "durability": "110"
    },
    "sockets": "3/4/6",
    "qlvl": "29"
  },
  {
    "id": "bec_de_corbin",
    "name": "Bec-de-Corbin",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "133",
      "requiredDexterity": "91",
      "damageMin": "18",
      "damageMax": "122",
      "damageAvg": "70",
      "speed": "0",
      "meleeRange": "4",
      "durability": "110",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "51"
  },
  {
    "id": "great_poleaxe",
    "name": "Great Poleaxe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "179",
      "requiredDexterity": "99",
      "damageMin": "58",
      "damageMax": "159",
      "damageAvg": "108.5",
      "speed": "0",
      "meleeRange": "4",
      "durability": "110",
      "requiredLevel": "63"
    },
    "sockets": "3/4/6",
    "qlvl": "84"
  },
  {
    "id": "war_scythe",
    "name": "War Scythe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "80",
      "requiredDexterity": "80",
      "damageMin": "15",
      "damageMax": "36",
      "damageAvg": "25.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "110"
    },
    "sockets": "3/4/6",
    "qlvl": "34"
  },
  {
    "id": "grim_scythe",
    "name": "Grim Scythe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "140",
      "requiredDexterity": "140",
      "damageMin": "44",
      "damageMax": "100",
      "damageAvg": "72",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "110",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "55"
  },
  {
    "id": "giant_thresher",
    "name": "Giant Thresher",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "188",
      "requiredDexterity": "140",
      "damageMin": "50",
      "damageMax": "142",
      "damageAvg": "96",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "110",
      "requiredLevel": "66"
    },
    "sockets": "3/4/6",
    "qlvl": "85"
  },
  {
    "id": "short_bow",
    "name": "Short Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "1",
      "damageMax": "4",
      "damageAvg": "2.5",
      "speed": "5"
    },
    "sockets": "3",
    "qlvl": "1"
  },
  {
    "id": "edge_bow",
    "name": "Edge Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "43",
      "damageMin": "8",
      "damageMax": "25",
      "damageAvg": "16.5",
      "speed": "5",
      "requiredLevel": "18"
    },
    "sockets": "3/4/4",
    "qlvl": "30"
  },
  {
    "id": "spider_bow",
    "name": "Spider Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "64",
      "requiredDexterity": "143",
      "damageMin": "34",
      "damageMax": "73",
      "damageAvg": "53,5",
      "speed": "5",
      "requiredLevel": "41"
    },
    "sockets": "3/4/4",
    "qlvl": "55"
  },
  {
    "id": "hunter_s_bow",
    "name": "Hunter’s Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "2",
      "damageMax": "6",
      "damageAvg": "4",
      "speed": "-10"
    },
    "sockets": "3/4/4",
    "qlvl": "5"
  },
  {
    "id": "razor_bow",
    "name": "Razor Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "62",
      "damageMin": "11",
      "damageMax": "29",
      "damageAvg": "20",
      "speed": "-10",
      "requiredLevel": "21"
    },
    "sockets": "3/4/4",
    "qlvl": "33"
  },
  {
    "id": "blade_bow",
    "name": "Blade Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "76",
      "requiredDexterity": "119",
      "damageMin": "30",
      "damageMax": "60",
      "damageAvg": "45",
      "speed": "-10",
      "requiredLevel": "45"
    },
    "sockets": "3/4/4",
    "qlvl": "60"
  },
  {
    "id": "long_bow",
    "name": "Long Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "22",
      "damageMin": "5",
      "damageMax": "10",
      "damageAvg": "7.5",
      "speed": "0"
    },
    "sockets": "3/4/5",
    "qlvl": "8"
  },
  {
    "id": "cedar_bow",
    "name": "Cedar Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "53",
      "requiredDexterity": "49",
      "damageMin": "13",
      "damageMax": "38",
      "damageAvg": "25.5",
      "speed": "0",
      "requiredLevel": "23"
    },
    "sockets": "3/4/5",
    "qlvl": "35"
  },
  {
    "id": "shadow_bow",
    "name": "Shadow Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "52",
      "requiredDexterity": "188",
      "damageMin": "22",
      "damageMax": "86",
      "damageAvg": "54",
      "speed": "0",
      "requiredLevel": "47"
    },
    "sockets": "3/4/6",
    "qlvl": "63"
  },
  {
    "id": "composite_bow",
    "name": "Composite Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "25",
      "damageMin": "5",
      "damageMax": "9",
      "damageAvg": "7",
      "speed": "-10"
    },
    "sockets": "3/4/4",
    "qlvl": "12"
  },
  {
    "id": "double_bow",
    "name": "Double Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "58",
      "requiredDexterity": "73",
      "damageMin": "14",
      "damageMax": "35",
      "damageAvg": "24.5",
      "speed": "-10",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "39"
  },
  {
    "id": "great_bow",
    "name": "Great Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "121",
      "requiredDexterity": "107",
      "damageMin": "17",
      "damageMax": "76",
      "damageAvg": "46,5",
      "speed": "-10",
      "requiredLevel": "51"
    },
    "sockets": "3/4/4",
    "qlvl": "68"
  },
  {
    "id": "short_battle_bow",
    "name": "Short Battle Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "30",
      "damageMin": "6",
      "damageMax": "12",
      "damageAvg": "9",
      "speed": "0"
    },
    "sockets": "3/4/5",
    "qlvl": "18"
  },
  {
    "id": "short_siege_bow",
    "name": "Short Siege Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "65",
      "requiredDexterity": "80",
      "damageMin": "17",
      "damageMax": "40",
      "damageAvg": "28.5",
      "speed": "0",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "43"
  },
  {
    "id": "diamond_bow",
    "name": "Diamond Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "89",
      "requiredDexterity": "132",
      "damageMin": "48",
      "damageMax": "58",
      "damageAvg": "53",
      "speed": "0",
      "requiredLevel": "54"
    },
    "sockets": "3/4/5",
    "qlvl": "72"
  },
  {
    "id": "long_battle_bow",
    "name": "Long Battle Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "40",
      "damageMin": "7",
      "damageMax": "18",
      "damageAvg": "12.5",
      "speed": "10"
    },
    "sockets": "3/4/6",
    "qlvl": "23"
  },
  {
    "id": "large_siege_bow",
    "name": "Large Siege Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "80",
      "requiredDexterity": "95",
      "damageMin": "13",
      "damageMax": "56",
      "damageAvg": "34.5",
      "speed": "10",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "46"
  },
  {
    "id": "crusader_bow",
    "name": "Crusader Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "97",
      "requiredDexterity": "121",
      "damageMin": "23",
      "damageMax": "91",
      "damageAvg": "57",
      "speed": "10",
      "requiredLevel": "57"
    },
    "sockets": "3/4/6",
    "qlvl": "77"
  },
  {
    "id": "short_war_bow",
    "name": "Short War Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "35",
      "damageMin": "6",
      "damageMax": "14",
      "damageAvg": "10",
      "speed": "0"
    },
    "sockets": "3/4/5",
    "qlvl": "27"
  },
  {
    "id": "rune_bow",
    "name": "Rune Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "73",
      "requiredDexterity": "103",
      "damageMin": "19",
      "damageMax": "46",
      "damageAvg": "32.5",
      "speed": "0",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "49"
  },
  {
    "id": "ward_bow",
    "name": "Ward Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "72",
      "requiredDexterity": "146",
      "damageMin": "29",
      "damageMax": "77",
      "damageAvg": "53",
      "speed": "0",
      "requiredLevel": "60"
    },
    "sockets": "3/4/5",
    "qlvl": "80"
  },
  {
    "id": "long_war_bow",
    "name": "Long War Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredDexterity": "50",
      "damageMin": "3",
      "damageMax": "23",
      "damageAvg": "13",
      "speed": "10"
    },
    "sockets": "3/4/6",
    "qlvl": "31"
  },
  {
    "id": "gothic_bow",
    "name": "Gothic Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "95",
      "requiredDexterity": "118",
      "damageMin": "8",
      "damageMax": "63",
      "damageAvg": "35.5",
      "speed": "10",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "52"
  },
  {
    "id": "hydra_bow",
    "name": "Hydra Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "134",
      "requiredDexterity": "167",
      "damageMin": "14",
      "damageMax": "100",
      "damageAvg": "57",
      "speed": "10",
      "requiredLevel": "63"
    },
    "sockets": "3/4/6",
    "qlvl": "85"
  },
  {
    "id": "light_crossbow",
    "name": "Light Crossbow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "21",
      "requiredDexterity": "27",
      "damageMin": "8",
      "damageMax": "11",
      "damageAvg": "9.5",
      "speed": "-10"
    },
    "sockets": "3",
    "qlvl": "6"
  },
  {
    "id": "arbalest",
    "name": "Arbalest",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "52",
      "requiredDexterity": "61",
      "damageMin": "20",
      "damageMax": "38",
      "damageAvg": "29",
      "speed": "-10",
      "requiredLevel": "22"
    },
    "sockets": "3/4/4",
    "qlvl": "34"
  },
  {
    "id": "pellet_bow",
    "name": "Pellet Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "83",
      "requiredDexterity": "155",
      "damageMin": "40",
      "damageMax": "99",
      "damageAvg": "69.5",
      "speed": "-10",
      "requiredLevel": "42"
    },
    "sockets": "3/4/4",
    "qlvl": "57"
  },
  {
    "id": "crossbow",
    "name": "Crossbow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "40",
      "requiredDexterity": "33",
      "damageMin": "11",
      "damageMax": "19",
      "damageAvg": "15",
      "speed": "0"
    },
    "sockets": "3/4/4",
    "qlvl": "15"
  },
  {
    "id": "siege_crossbow",
    "name": "Siege Crossbow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "80",
      "requiredDexterity": "70",
      "damageMin": "28",
      "damageMax": "60",
      "damageAvg": "44",
      "speed": "0",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "40"
  },
  {
    "id": "gorgon_crossbow",
    "name": "Gorgon Crossbow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "117",
      "requiredDexterity": "105",
      "damageMin": "39",
      "damageMax": "120",
      "damageAvg": "79.5",
      "speed": "0",
      "requiredLevel": "50"
    },
    "sockets": "3/4/4",
    "qlvl": "67"
  },
  {
    "id": "heavy_crossbow",
    "name": "Heavy Crossbow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "60",
      "requiredDexterity": "40",
      "damageMin": "20",
      "damageMax": "33",
      "damageAvg": "26.5",
      "speed": "10"
    },
    "sockets": "3/4/6",
    "qlvl": "24"
  },
  {
    "id": "ballista",
    "name": "Ballista",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "110",
      "requiredDexterity": "80",
      "damageMin": "47",
      "damageMax": "78",
      "damageAvg": "62.5",
      "speed": "10",
      "requiredLevel": "25"
    },
    "sockets": "3/4/6",
    "qlvl": "47"
  },
  {
    "id": "colossus_crossbow",
    "name": "Colossus Crossbow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "163",
      "requiredDexterity": "77",
      "damageMin": "47",
      "damageMax": "125",
      "damageAvg": "86",
      "speed": "10",
      "requiredLevel": "56"
    },
    "sockets": "3/4/6",
    "qlvl": "75"
  },
  {
    "id": "repeating_crossbow",
    "name": "Repeating Crossbow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "40",
      "requiredDexterity": "50",
      "damageMin": "9",
      "damageMax": "18",
      "damageAvg": "13.5",
      "speed": "-40"
    },
    "sockets": "3/4/5",
    "qlvl": "33"
  },
  {
    "id": "chu_ko_nu",
    "name": "Chu-Ko-Nu",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "80",
      "requiredDexterity": "95",
      "damageMin": "22",
      "damageMax": "50",
      "damageAvg": "36",
      "speed": "-60",
      "requiredLevel": "25"
    },
    "sockets": "3/4/5",
    "qlvl": "54"
  },
  {
    "id": "demon_crossbow",
    "name": "Demon Crossbow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "141",
      "requiredDexterity": "98",
      "damageMin": "43",
      "damageMax": "66",
      "damageAvg": "54.5",
      "speed": "-60",
      "requiredLevel": "63"
    },
    "sockets": "3/4/5",
    "qlvl": "84"
  },
  {
    "id": "short_staff",
    "name": "Short Staff",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "1",
      "damageMax": "5",
      "damageAvg": "3",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "40"
    },
    "sockets": "2",
    "qlvl": "1"
  },
  {
    "id": "jo_staff",
    "name": "Jo Staff",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "9",
      "damageMax": "30",
      "damageAvg": "19.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "40",
      "requiredLevel": "18"
    },
    "sockets": "3",
    "qlvl": "30"
  },
  {
    "id": "walking_stick",
    "name": "Walking Stick",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "86",
      "damageMax": "106",
      "damageAvg": "96",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "80",
      "requiredLevel": "43"
    },
    "sockets": "3",
    "qlvl": "58"
  },
  {
    "id": "long_staff",
    "name": "Long Staff",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "2",
      "damageMax": "8",
      "damageAvg": "5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "60"
    },
    "sockets": "3",
    "qlvl": "8"
  },
  {
    "id": "quarterstaff",
    "name": "Quarterstaff",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "12",
      "damageMax": "38",
      "damageAvg": "25",
      "speed": "0",
      "meleeRange": "3",
      "durability": "60",
      "requiredLevel": "23"
    },
    "sockets": "3",
    "qlvl": "35"
  },
  {
    "id": "stalagmite",
    "name": "Stalagmite",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "63",
      "requiredDexterity": "35",
      "damageMin": "94",
      "damageMax": "134",
      "damageAvg": "114",
      "speed": "10",
      "meleeRange": "3",
      "durability": "90",
      "requiredLevel": "49"
    },
    "sockets": "4",
    "qlvl": "66"
  },
  {
    "id": "gnarled_staff",
    "name": "Gnarled Staff",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "4",
      "damageMax": "12",
      "damageAvg": "8",
      "speed": "10",
      "meleeRange": "3",
      "durability": "70"
    },
    "sockets": "4",
    "qlvl": "12"
  },
  {
    "id": "cedar_staff",
    "name": "Cedar Staff",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "15",
      "damageMax": "46",
      "damageAvg": "30.5",
      "speed": "10",
      "meleeRange": "3",
      "durability": "70",
      "requiredLevel": "25"
    },
    "sockets": "4",
    "qlvl": "38"
  },
  {
    "id": "elder_staff",
    "name": "Elder Staff",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "44",
      "requiredDexterity": "37",
      "damageMin": "100",
      "damageMax": "116",
      "damageAvg": "108",
      "speed": "0",
      "meleeRange": "3",
      "durability": "105",
      "requiredLevel": "55"
    },
    "sockets": "4",
    "qlvl": "74"
  },
  {
    "id": "battle_staff",
    "name": "Battle Staff",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "6",
      "damageMax": "13",
      "damageAvg": "9.5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "80"
    },
    "sockets": "4",
    "qlvl": "17"
  },
  {
    "id": "gothic_staff",
    "name": "Gothic Staff",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "21",
      "damageMax": "48",
      "damageAvg": "34.5",
      "speed": "0",
      "meleeRange": "3",
      "durability": "80",
      "requiredLevel": "25"
    },
    "sockets": "4",
    "qlvl": "42"
  },
  {
    "id": "shillelagh",
    "name": "Shillelagh",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "52",
      "requiredDexterity": "27",
      "damageMin": "81",
      "damageMax": "135",
      "damageAvg": "106",
      "speed": "0",
      "meleeRange": "3",
      "durability": "120",
      "requiredLevel": "62"
    },
    "sockets": "4",
    "qlvl": "83"
  },
  {
    "id": "war_staff",
    "name": "War Staff",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "12",
      "damageMax": "28",
      "damageAvg": "20",
      "speed": "20",
      "meleeRange": "3",
      "durability": "100"
    },
    "sockets": "5/6/6",
    "qlvl": "24"
  },
  {
    "id": "rune_staff",
    "name": "Rune Staff",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "35",
      "damageMax": "84",
      "damageAvg": "59.5",
      "speed": "20",
      "meleeRange": "3",
      "durability": "100",
      "requiredLevel": "25"
    },
    "sockets": "5/6/6",
    "qlvl": "47"
  },
  {
    "id": "archon_staff",
    "name": "Archon Staff",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "34",
      "damageMin": "104",
      "damageMax": "124",
      "damageAvg": "114",
      "speed": "10",
      "meleeRange": "3",
      "durability": "78",
      "requiredLevel": "66"
    },
    "sockets": "5/6/6",
    "qlvl": "85"
  },
  {
    "id": "wand",
    "name": "Wand",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {},
    "sockets": "1",
    "qlvl": "2"
  },
  {
    "id": "burnt_wand",
    "name": "Burnt Wand",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "19"
    },
    "sockets": "1",
    "qlvl": "31"
  },
  {
    "id": "polished_wand",
    "name": "Polished Wand",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "41"
    },
    "sockets": "2",
    "qlvl": "55"
  },
  {
    "id": "yew_wand",
    "name": "Yew Wand",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {},
    "sockets": "1",
    "qlvl": "12"
  },
  {
    "id": "petrified_wand",
    "name": "Petrified Wand",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "38"
  },
  {
    "id": "ghost_wand",
    "name": "Ghost Wand",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "48"
    },
    "sockets": "2",
    "qlvl": "65"
  },
  {
    "id": "bone_wand",
    "name": "Bone Wand",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {},
    "sockets": "2",
    "qlvl": "18"
  },
  {
    "id": "tomb_wand",
    "name": "Tomb Wand",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "43"
  },
  {
    "id": "lich_wand",
    "name": "Lich Wand",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "56"
    },
    "sockets": "2",
    "qlvl": "75"
  },
  {
    "id": "grim_wand",
    "name": "Grim Wand",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {},
    "sockets": "2",
    "qlvl": "26"
  },
  {
    "id": "grave_wand",
    "name": "Grave Wand",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "49"
  },
  {
    "id": "unearthed_wand",
    "name": "Unearthed Wand",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "25",
      "requiredLevel": "64"
    },
    "sockets": "2",
    "qlvl": "86"
  },
  {
    "id": "scepter",
    "name": "Scepter",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "25",
      "damageMin": "6",
      "damageMax": "11",
      "damageAvg": "8.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "100"
    },
    "sockets": "2",
    "qlvl": "3"
  },
  {
    "id": "rune_scepter",
    "name": "Rune Scepter",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "58",
      "damageMin": "18",
      "damageMax": "35",
      "damageAvg": "26.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "100",
      "requiredLevel": "19"
    },
    "sockets": "3",
    "qlvl": "31"
  },
  {
    "id": "mighty_scepter",
    "name": "Mighty Scepter",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "125",
      "requiredDexterity": "65",
      "damageMin": "50",
      "damageMax": "65",
      "damageAvg": "57.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "100",
      "requiredLevel": "46"
    },
    "sockets": "3",
    "qlvl": "62"
  },
  {
    "id": "grand_scepter",
    "name": "Grand Scepter",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "37",
      "damageMin": "8",
      "damageMax": "18",
      "damageAvg": "13",
      "speed": "10",
      "meleeRange": "2",
      "durability": "120"
    },
    "sockets": "3",
    "qlvl": "15"
  },
  {
    "id": "holy_water_sprinkler",
    "name": "Holy Water Sprinkler",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "76",
      "damageMin": "20",
      "damageMax": "52",
      "damageAvg": "36",
      "speed": "10",
      "meleeRange": "2",
      "durability": "120",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "40"
  },
  {
    "id": "seraph_rod",
    "name": "Seraph Rod",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "108",
      "requiredDexterity": "69",
      "damageMin": "56",
      "damageMax": "68",
      "damageAvg": "62",
      "speed": "10",
      "meleeRange": "2",
      "durability": "120",
      "requiredLevel": "57"
    },
    "sockets": "3",
    "qlvl": "76"
  },
  {
    "id": "war_scepter",
    "name": "War Scepter",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "55",
      "damageMin": "12",
      "damageMax": "19",
      "damageAvg": "15.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "140"
    },
    "sockets": "3/5/5",
    "qlvl": "21"
  },
  {
    "id": "divine_scepter",
    "name": "Divine Scepter",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "103",
      "damageMin": "24",
      "damageMax": "46",
      "damageAvg": "35",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "140",
      "requiredLevel": "25"
    },
    "sockets": "3/5/5",
    "qlvl": "45"
  },
  {
    "id": "caduceus",
    "name": "Caduceus",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "97",
      "requiredDexterity": "70",
      "damageMin": "46",
      "damageMax": "54",
      "damageAvg": "50",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "140",
      "requiredLevel": "66"
    },
    "sockets": "3/5/5",
    "qlvl": "85"
  },
  {
    "id": "katar",
    "name": "Katar",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "20",
      "requiredDexterity": "20",
      "damageMin": "5",
      "damageMax": "8",
      "damageAvg": "6.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "96"
    },
    "sockets": "2",
    "qlvl": "1"
  },
  {
    "id": "quhab",
    "name": "Quhab",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "57",
      "requiredDexterity": "57",
      "damageMin": "15",
      "damageMax": "35",
      "damageAvg": "25",
      "speed": "0",
      "meleeRange": "2",
      "durability": "96",
      "requiredLevel": "21"
    },
    "sockets": "2/3/3",
    "qlvl": "28"
  },
  {
    "id": "suwayyah",
    "name": "Suwayyah",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "99",
      "requiredDexterity": "99",
      "damageMin": "54",
      "damageMax": "71",
      "damageAvg": "62.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "96",
      "requiredLevel": "44"
    },
    "sockets": "2/3/3",
    "qlvl": "59"
  },
  {
    "id": "wrist_blade",
    "name": "Wrist Blade",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "33",
      "requiredDexterity": "33",
      "damageMin": "6",
      "damageMax": "10",
      "damageAvg": "8",
      "speed": "0",
      "meleeRange": "2",
      "durability": "104"
    },
    "sockets": "2",
    "qlvl": "9"
  },
  {
    "id": "wrist_spike",
    "name": "Wrist Spike",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "66",
      "requiredDexterity": "66",
      "damageMin": "20",
      "damageMax": "46",
      "damageAvg": "33",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "112",
      "requiredLevel": "24"
    },
    "sockets": "2/3/3",
    "qlvl": "32"
  },
  {
    "id": "wrist_sword",
    "name": "Wrist Sword",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "105",
      "requiredDexterity": "105",
      "damageMin": "46",
      "damageMax": "63",
      "damageAvg": "54.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "112",
      "requiredLevel": "46"
    },
    "sockets": "2/3/3",
    "qlvl": "62"
  },
  {
    "id": "hatchet_hands",
    "name": "Hatchet Hands",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "37",
      "requiredDexterity": "37",
      "damageMin": "3",
      "damageMax": "17",
      "damageAvg": "10",
      "speed": "10",
      "meleeRange": "2",
      "durability": "112"
    },
    "sockets": "2",
    "qlvl": "12"
  },
  {
    "id": "fascia",
    "name": "Fascia",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "69",
      "requiredDexterity": "69",
      "damageMin": "12",
      "damageMax": "53",
      "damageAvg": "32.5",
      "speed": "10",
      "meleeRange": "2",
      "durability": "128",
      "requiredLevel": "27"
    },
    "sockets": "2/3/3",
    "qlvl": "36"
  },
  {
    "id": "war_fist",
    "name": "War Fist",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "108",
      "requiredDexterity": "108",
      "damageMin": "60",
      "damageMax": "73",
      "damageAvg": "66.5",
      "speed": "10",
      "meleeRange": "2",
      "durability": "128",
      "requiredLevel": "51"
    },
    "sockets": "2/3/3",
    "qlvl": "68"
  },
  {
    "id": "cestus",
    "name": "Cestus",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "42",
      "requiredDexterity": "42",
      "damageMin": "8",
      "damageMax": "17",
      "damageAvg": "12.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "144"
    },
    "sockets": "2",
    "qlvl": "15"
  },
  {
    "id": "hand_scythe",
    "name": "Hand Scythe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "73",
      "requiredDexterity": "73",
      "damageMin": "23",
      "damageMax": "46",
      "damageAvg": "34.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "144",
      "requiredLevel": "30"
    },
    "sockets": "2/3/3",
    "qlvl": "41"
  },
  {
    "id": "battle_cestus",
    "name": "Battle Cestus",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "110",
      "requiredDexterity": "110",
      "damageMin": "45",
      "damageMax": "53",
      "damageAvg": "49",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "144",
      "requiredLevel": "54"
    },
    "sockets": "2/3/3",
    "qlvl": "73"
  },
  {
    "id": "claws",
    "name": "Claws",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "46",
      "requiredDexterity": "46",
      "damageMin": "9",
      "damageMax": "16",
      "damageAvg": "12.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "128"
    },
    "sockets": "2/3/3",
    "qlvl": "18"
  },
  {
    "id": "greater_claws",
    "name": "Greater Claws",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "76",
      "requiredDexterity": "76",
      "damageMin": "23",
      "damageMax": "53",
      "damageAvg": "38.5",
      "speed": "-20",
      "meleeRange": "2",
      "durability": "104",
      "requiredLevel": "33"
    },
    "sockets": "2/3/3",
    "qlvl": "45"
  },
  {
    "id": "feral_claws",
    "name": "Feral Claws",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "113",
      "requiredDexterity": "113",
      "damageMin": "30",
      "damageMax": "73",
      "damageAvg": "51.5",
      "speed": "-20",
      "meleeRange": "2",
      "durability": "104",
      "requiredLevel": "58"
    },
    "sockets": "2/3/3",
    "qlvl": "78"
  },
  {
    "id": "blade_talons",
    "name": "Blade Talons",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "50",
      "requiredDexterity": "50",
      "damageMin": "11",
      "damageMax": "15",
      "damageAvg": "13",
      "speed": "-20",
      "meleeRange": "2",
      "durability": "138"
    },
    "sockets": "2/3/3",
    "qlvl": "21"
  },
  {
    "id": "greater_talons",
    "name": "Greater Talons",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "79",
      "requiredDexterity": "79",
      "damageMin": "25",
      "damageMax": "45",
      "damageAvg": "35",
      "speed": "-30",
      "meleeRange": "2",
      "durability": "138",
      "requiredLevel": "37"
    },
    "sockets": "2/3/3",
    "qlvl": "50"
  },
  {
    "id": "runic_talons",
    "name": "Runic Talons",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "115",
      "requiredDexterity": "115",
      "damageMin": "33",
      "damageMax": "60",
      "damageAvg": "46.5",
      "speed": "-30",
      "meleeRange": "2",
      "durability": "138",
      "requiredLevel": "60"
    },
    "sockets": "2/3/3",
    "qlvl": "81"
  },
  {
    "id": "scissors_katar",
    "name": "Scissors Katar",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "55",
      "requiredDexterity": "55",
      "damageMin": "10",
      "damageMax": "19",
      "damageAvg": "14.5",
      "speed": "-10",
      "meleeRange": "2",
      "durability": "136"
    },
    "sockets": "2/3/3",
    "qlvl": "24"
  },
  {
    "id": "scissors_quhab",
    "name": "Scissors Quhab",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "82",
      "requiredDexterity": "82",
      "damageMin": "28",
      "damageMax": "58",
      "damageAvg": "43",
      "speed": "0",
      "meleeRange": "2",
      "durability": "136",
      "requiredLevel": "40"
    },
    "sockets": "2/3/3",
    "qlvl": "54"
  },
  {
    "id": "scissors_suwayyah",
    "name": "Scissors Suwayyah",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "118",
      "requiredDexterity": "118",
      "damageMin": "55",
      "damageMax": "70",
      "damageAvg": "62.5",
      "speed": "0",
      "meleeRange": "2",
      "durability": "136",
      "requiredLevel": "64"
    },
    "sockets": "2/3/3",
    "qlvl": "85"
  },
  {
    "id": "eagle_orb",
    "name": "Eagle Orb",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {},
    "sockets": "2",
    "qlvl": "1"
  },
  {
    "id": "glowing_orb",
    "name": "Glowing Orb",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredLevel": "24"
    },
    "sockets": "2",
    "qlvl": "32"
  },
  {
    "id": "heavenly_stone",
    "name": "Heavenly Stone",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredLevel": "44"
    },
    "sockets": "2",
    "qlvl": "59"
  },
  {
    "id": "sacred_globe",
    "name": "Sacred Globe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {},
    "sockets": "2",
    "qlvl": "8"
  },
  {
    "id": "crystalline_globe",
    "name": "Crystalline Globe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredLevel": "27"
    },
    "sockets": "2",
    "qlvl": "37"
  },
  {
    "id": "eldritch_orb",
    "name": "Eldritch Orb",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredLevel": "50"
    },
    "sockets": "2",
    "qlvl": "67"
  },
  {
    "id": "smoked_sphere",
    "name": "Smoked Sphere",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredLevel": "8"
    },
    "sockets": "2",
    "qlvl": "12"
  },
  {
    "id": "cloudy_sphere",
    "name": "Cloudy Sphere",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredLevel": "30"
    },
    "sockets": "2",
    "qlvl": "41"
  },
  {
    "id": "demon_heart",
    "name": "Demon Heart",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredLevel": "56"
    },
    "sockets": "2",
    "qlvl": "75"
  },
  {
    "id": "clasped_orb",
    "name": "Clasped Orb",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredLevel": "13"
    },
    "sockets": "2",
    "qlvl": "17"
  },
  {
    "id": "sparkling_ball",
    "name": "Sparkling Ball",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredLevel": "34"
    },
    "sockets": "2",
    "qlvl": "46"
  },
  {
    "id": "vortex_orb",
    "name": "Vortex Orb",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredLevel": "63"
    },
    "sockets": "2",
    "qlvl": "84"
  },
  {
    "id": "jared_s_stone",
    "name": "Jared's Stone",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredLevel": "18"
    },
    "sockets": "2/3/3",
    "qlvl": "24"
  },
  {
    "id": "swirling_crystal",
    "name": "Swirling Crystal",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredLevel": "37"
    },
    "sockets": "2/3/3",
    "qlvl": "50"
  },
  {
    "id": "dimensional_shard",
    "name": "Dimensional Shard",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredLevel": "66"
    },
    "sockets": "2/3/3",
    "qlvl": "85"
  },
  {
    "id": "stag_bow",
    "name": "Stag Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "30",
      "requiredDexterity": "45",
      "damageMin": "8",
      "damageMax": "14",
      "damageAvg": "11",
      "speed": "0",
      "requiredLevel": "14"
    },
    "sockets": "3/4/5",
    "qlvl": "18"
  },
  {
    "id": "ashwood_bow",
    "name": "Ashwood Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "56",
      "requiredDexterity": "77",
      "damageMin": "19",
      "damageMax": "38",
      "damageAvg": "28.5",
      "speed": "0",
      "requiredLevel": "29"
    },
    "sockets": "3/4/5",
    "qlvl": "39"
  },
  {
    "id": "matriarchal_bow",
    "name": "Matriarchal Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "87",
      "requiredDexterity": "187",
      "damageMin": "31",
      "damageMax": "74",
      "damageAvg": "52.5",
      "speed": "-10",
      "requiredLevel": "39"
    },
    "sockets": "3/4/5",
    "qlvl": "53"
  },
  {
    "id": "reflex_bow",
    "name": "Reflex Bow",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "35",
      "requiredDexterity": "60",
      "damageMin": "10",
      "damageMax": "21",
      "damageAvg": "15.5",
      "speed": "10",
      "requiredLevel": "20"
    },
    "sockets": "3/4/5",
    "qlvl": "27"
  },
  {
    "id": "ceremonial_bow",
    "name": "Ceremonial Bow",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "73",
      "requiredDexterity": "110",
      "damageMin": "22",
      "damageMax": "53",
      "damageAvg": "37.5",
      "speed": "10",
      "requiredLevel": "35"
    },
    "sockets": "3/4/5",
    "qlvl": "47"
  },
  {
    "id": "grand_matron_bow",
    "name": "Grand Matron Bow",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "108",
      "requiredDexterity": "152",
      "damageMin": "20",
      "damageMax": "104",
      "damageAvg": "62",
      "speed": "10",
      "requiredLevel": "58"
    },
    "sockets": "3/4/5",
    "qlvl": "78"
  },
  {
    "id": "maiden_spear",
    "name": "Maiden Spear",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "54",
      "requiredDexterity": "40",
      "damageMin": "20",
      "damageMax": "26",
      "damageAvg": "23",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "56",
      "requiredLevel": "14"
    },
    "sockets": "3/4/6",
    "qlvl": "18"
  },
  {
    "id": "ceremonial_spear",
    "name": "Ceremonial Spear",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "101",
      "requiredDexterity": "80",
      "damageMin": "49",
      "damageMax": "74",
      "damageAvg": "61.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "56",
      "requiredLevel": "32"
    },
    "sockets": "3/4/6",
    "qlvl": "43"
  },
  {
    "id": "matriarchal_spear",
    "name": "Matriarchal Spear",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "114",
      "requiredDexterity": "142",
      "damageMin": "79",
      "damageMax": "116",
      "damageAvg": "97.5",
      "speed": "-10",
      "meleeRange": "4",
      "durability": "56",
      "requiredLevel": "45"
    },
    "sockets": "3/4/6",
    "qlvl": "61"
  },
  {
    "id": "maiden_pike",
    "name": "Maiden Pike",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "63",
      "requiredDexterity": "52",
      "damageMin": "25",
      "damageMax": "60",
      "damageAvg": "42.5",
      "speed": "0",
      "meleeRange": "4",
      "durability": "50",
      "requiredLevel": "20"
    },
    "sockets": "3/4/6",
    "qlvl": "27"
  },
  {
    "id": "ceremonial_pike",
    "name": "Ceremonial Pike",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "115",
      "requiredDexterity": "98",
      "damageMin": "60",
      "damageMax": "140",
      "damageAvg": "100",
      "speed": "10",
      "meleeRange": "4",
      "durability": "50",
      "requiredLevel": "38"
    },
    "sockets": "3/4/6",
    "qlvl": "51"
  },
  {
    "id": "matriarchal_pike",
    "name": "Matriarchal Pike",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "132",
      "requiredDexterity": "149",
      "damageMin": "44",
      "damageMax": "185",
      "damageAvg": "114.5",
      "speed": "10",
      "meleeRange": "4",
      "durability": "50",
      "requiredLevel": "60"
    },
    "sockets": "3/4/6",
    "qlvl": "81"
  },
  {
    "id": "maiden_javelin",
    "name": "Maiden Javelin",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "requiredStrength": "33",
      "requiredDexterity": "47",
      "damageAvg": "1411",
      "speed": "-10",
      "meleeRange": "3",
      "requiredLevel": "17"
    },
    "sockets": "2",
    "qlvl": "23"
  },
  {
    "id": "ceremonial_javelin",
    "name": "Ceremonial Javelin",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "requiredStrength": "25",
      "requiredDexterity": "109",
      "damageAvg": "4738.5",
      "speed": "-10",
      "meleeRange": "3",
      "requiredLevel": "26"
    },
    "sockets": "2",
    "qlvl": "35"
  },
  {
    "id": "matriarchal_javelin",
    "name": "Matriarchal Javelin",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "requiredStrength": "107",
      "requiredDexterity": "151",
      "damageAvg": "63.553",
      "speed": "-10",
      "meleeRange": "3",
      "requiredLevel": "48"
    },
    "sockets": "2",
    "qlvl": "65"
  },
  {
    "id": "boots",
    "name": "Boots",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "3",
      "damageMax": "8",
      "damageAvg": "5.5",
      "defenseMin": "2",
      "defenseMax": "3",
      "requiredStrength": "0",
      "durability": "12"
    },
    "qlvl": "3"
  },
  {
    "id": "demonhide_boots",
    "name": "Demonhide Boots",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "30",
      "damageMax": "64",
      "damageAvg": "47",
      "defenseMin": "28",
      "defenseMax": "35",
      "requiredStrength": "20",
      "durability": "12",
      "requiredLevel": "24"
    },
    "qlvl": "36"
  },
  {
    "id": "wyrmhide_boots",
    "name": "Wyrmhide Boots",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "75",
      "damageMax": "100",
      "damageAvg": "87.5",
      "defenseMin": "54",
      "defenseMax": "62",
      "requiredStrength": "50",
      "durability": "12",
      "requiredLevel": "45"
    },
    "qlvl": "60"
  },
  {
    "id": "heavy_boots",
    "name": "Heavy Boots",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "4",
      "damageMax": "12",
      "damageAvg": "8",
      "defenseMin": "5",
      "defenseMax": "6",
      "requiredStrength": "18",
      "durability": "14"
    },
    "qlvl": "7"
  },
  {
    "id": "sharkskin_boots",
    "name": "Sharkskin Boots",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "32",
      "damageMax": "72",
      "damageAvg": "52",
      "defenseMin": "33",
      "defenseMax": "39",
      "requiredStrength": "47",
      "durability": "14",
      "requiredLevel": "25"
    },
    "qlvl": "39"
  },
  {
    "id": "scarabshell_boots",
    "name": "Scarabshell Boots",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "70",
      "damageMax": "110",
      "damageAvg": "90",
      "defenseMin": "56",
      "defenseMax": "65",
      "requiredStrength": "91",
      "durability": "14",
      "requiredLevel": "49"
    },
    "qlvl": "66"
  },
  {
    "id": "chain_boots",
    "name": "Chain Boots",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "6",
      "damageMax": "14",
      "damageAvg": "10",
      "defenseMin": "8",
      "defenseMax": "9",
      "requiredStrength": "30",
      "durability": "16"
    },
    "qlvl": "12"
  },
  {
    "id": "mesh_boots",
    "name": "Mesh Boots",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "35",
      "damageMax": "78",
      "damageAvg": "56.5",
      "defenseMin": "37",
      "defenseMax": "44",
      "requiredStrength": "65",
      "durability": "16",
      "requiredLevel": "25"
    },
    "qlvl": "43"
  },
  {
    "id": "boneweave_boots",
    "name": "Boneweave Boots",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "80",
      "damageMax": "125",
      "damageAvg": "102.5",
      "defenseMin": "59",
      "defenseMax": "67",
      "requiredStrength": "118",
      "durability": "16",
      "requiredLevel": "54"
    },
    "qlvl": "72"
  },
  {
    "id": "light_plated_boots",
    "name": "Light Plated Boots",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "8",
      "damageMax": "18",
      "damageAvg": "13",
      "defenseMin": "9",
      "defenseMax": "11",
      "requiredStrength": "50",
      "durability": "18"
    },
    "qlvl": "20"
  },
  {
    "id": "battle_boots",
    "name": "Battle Boots",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "42",
      "damageMax": "84",
      "damageAvg": "63",
      "defenseMin": "39",
      "defenseMax": "47",
      "requiredStrength": "95",
      "durability": "18",
      "requiredLevel": "25"
    },
    "qlvl": "49"
  },
  {
    "id": "mirrored_boots",
    "name": "Mirrored Boots",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "69",
      "damageMax": "147",
      "damageAvg": "108",
      "defenseMin": "59",
      "defenseMax": "68",
      "requiredStrength": "163",
      "durability": "18",
      "requiredLevel": "60"
    },
    "qlvl": "81"
  },
  {
    "id": "greaves",
    "name": "Greaves",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "10",
      "damageMax": "20",
      "damageAvg": "15",
      "defenseMin": "12",
      "defenseMax": "15",
      "requiredStrength": "70",
      "durability": "24"
    },
    "qlvl": "27"
  },
  {
    "id": "war_boots",
    "name": "War Boots",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "45",
      "damageMax": "90",
      "damageAvg": "67.5",
      "defenseMin": "43",
      "defenseMax": "53",
      "requiredStrength": "125",
      "durability": "24",
      "requiredLevel": "25"
    },
    "qlvl": "54"
  },
  {
    "id": "myrmidon_greaves",
    "name": "Myrmidon Greaves",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "83",
      "damageMax": "155",
      "damageAvg": "119",
      "defenseMin": "62",
      "defenseMax": "71",
      "requiredStrength": "208",
      "durability": "24",
      "requiredLevel": "65"
    },
    "qlvl": "85"
  },
  {
    "id": "buckler",
    "name": "Buckler",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "1",
      "damageMax": "3",
      "damageAvg": "2",
      "defenseMin": "4",
      "defenseMax": "6",
      "requiredStrength": "12",
      "blockChance": "0",
      "durability": "12"
    },
    "sockets": "1",
    "qlvl": "1"
  },
  {
    "id": "defender",
    "name": "Defender",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "10",
      "damageMax": "15",
      "damageAvg": "12.5",
      "defenseMin": "41",
      "defenseMax": "49",
      "requiredStrength": "38",
      "blockChance": "10",
      "durability": "68",
      "requiredLevel": "22"
    },
    "sockets": "1",
    "qlvl": "34"
  },
  {
    "id": "heater",
    "name": "Heater",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "29",
      "damageMax": "54",
      "damageAvg": "41.5",
      "defenseMin": "95",
      "defenseMax": "110",
      "requiredStrength": "77",
      "blockChance": "22",
      "durability": "88",
      "requiredLevel": "43"
    },
    "sockets": "2",
    "qlvl": "58"
  },
  {
    "id": "small_shield",
    "name": "Small Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "2",
      "damageMax": "3",
      "damageAvg": "2.5",
      "defenseMin": "8",
      "defenseMax": "10",
      "requiredStrength": "22",
      "blockChance": "5",
      "durability": "16"
    },
    "sockets": "2",
    "qlvl": "5"
  },
  {
    "id": "round_shield",
    "name": "Round Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "11",
      "damageMax": "23",
      "damageAvg": "17",
      "defenseMin": "47",
      "defenseMax": "55",
      "requiredStrength": "53",
      "blockChance": "12",
      "durability": "64",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "37"
  },
  {
    "id": "luna",
    "name": "Luna",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "31",
      "damageMax": "53",
      "damageAvg": "42",
      "defenseMin": "108",
      "defenseMax": "123",
      "requiredStrength": "100",
      "blockChance": "20",
      "durability": "84",
      "requiredLevel": "45"
    },
    "sockets": "2",
    "qlvl": "61"
  },
  {
    "id": "large_shield",
    "name": "Large Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "3",
      "damageMax": "6",
      "damageAvg": "4.5",
      "defenseMin": "12",
      "defenseMax": "14",
      "requiredStrength": "34",
      "blockChance": "12",
      "durability": "24"
    },
    "sockets": "3",
    "qlvl": "11"
  },
  {
    "id": "scutum",
    "name": "Scutum",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "16",
      "damageMax": "22",
      "damageAvg": "19",
      "defenseMin": "53",
      "defenseMax": "61",
      "requiredStrength": "71",
      "blockChance": "14",
      "durability": "62",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "42"
  },
  {
    "id": "hyperion",
    "name": "Hyperion",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "26",
      "damageMax": "59",
      "damageAvg": "42.5",
      "defenseMin": "119",
      "defenseMax": "135",
      "requiredStrength": "127",
      "blockChance": "24",
      "durability": "82",
      "requiredLevel": "48"
    },
    "sockets": "3",
    "qlvl": "64"
  },
  {
    "id": "spiked_shield",
    "name": "Spiked Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "9",
      "damageMax": "16",
      "damageAvg": "12.5",
      "defenseMin": "15",
      "defenseMax": "25",
      "requiredStrength": "30",
      "blockChance": "8",
      "durability": "40"
    },
    "sockets": "3",
    "qlvl": "11"
  },
  {
    "id": "barbed_shield",
    "name": "Barbed Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "18",
      "damageMax": "35",
      "damageAvg": "26.5",
      "defenseMin": "58",
      "defenseMax": "78",
      "requiredStrength": "65",
      "blockChance": "15",
      "durability": "55",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "42"
  },
  {
    "id": "blade_barrier",
    "name": "Blade Barrier",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "40",
      "damageMax": "60",
      "damageAvg": "50",
      "defenseMin": "147",
      "defenseMax": "163",
      "requiredStrength": "118",
      "blockChance": "18",
      "durability": "83",
      "requiredLevel": "51"
    },
    "sockets": "3",
    "qlvl": "68"
  },
  {
    "id": "kite_shield",
    "name": "Kite Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "4",
      "damageMax": "11",
      "damageAvg": "7.5",
      "defenseMin": "16",
      "defenseMax": "18",
      "requiredStrength": "47",
      "blockChance": "8",
      "durability": "30"
    },
    "sockets": "3",
    "qlvl": "15"
  },
  {
    "id": "dragon_shield",
    "name": "Dragon Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "17",
      "damageMax": "28",
      "damageAvg": "22.5",
      "defenseMin": "59",
      "defenseMax": "67",
      "requiredStrength": "91",
      "blockChance": "18",
      "durability": "76",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "45"
  },
  {
    "id": "monarch",
    "name": "Monarch",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "22",
      "damageMax": "63",
      "damageAvg": "42.5",
      "defenseMin": "133",
      "defenseMax": "148",
      "requiredStrength": "156",
      "blockChance": "22",
      "durability": "86",
      "requiredLevel": "54"
    },
    "sockets": "3/3/4",
    "qlvl": "72"
  },
  {
    "id": "bone_shield",
    "name": "Bone Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "5",
      "damageMax": "10",
      "damageAvg": "7.5",
      "defenseMin": "10",
      "defenseMax": "30",
      "requiredStrength": "25",
      "blockChance": "16",
      "durability": "40"
    },
    "sockets": "2",
    "qlvl": "19"
  },
  {
    "id": "grim_shield",
    "name": "Grim Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "19",
      "damageMax": "28",
      "damageAvg": "23.5",
      "defenseMin": "50",
      "defenseMax": "150",
      "requiredStrength": "58",
      "blockChance": "16",
      "durability": "70",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "48"
  },
  {
    "id": "troll_nest",
    "name": "Troll Nest",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "35",
      "damageMax": "55",
      "damageAvg": "45",
      "defenseMin": "158",
      "defenseMax": "173",
      "requiredStrength": "106",
      "blockChance": "17",
      "durability": "74",
      "requiredLevel": "57"
    },
    "sockets": "3",
    "qlvl": "76"
  },
  {
    "id": "tower_shield",
    "name": "Tower Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "5",
      "damageMax": "23",
      "damageAvg": "14",
      "defenseMin": "22",
      "defenseMax": "25",
      "requiredStrength": "75",
      "blockChance": "24",
      "durability": "60"
    },
    "sockets": "3",
    "qlvl": "22"
  },
  {
    "id": "pavise",
    "name": "Pavise",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "24",
      "damageMax": "32",
      "damageAvg": "28",
      "defenseMin": "68",
      "defenseMax": "78",
      "requiredStrength": "133",
      "blockChance": "24",
      "durability": "72",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "50"
  },
  {
    "id": "aegis",
    "name": "Aegis",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "37",
      "damageMax": "57",
      "damageAvg": "47",
      "defenseMin": "215",
      "defenseMax": "241",
      "defensePct": "50%",
      "requiredStrength": "219",
      "blockChance": "46",
      "durability": "92",
      "requiredLevel": "59"
    },
    "sockets": "3/3/4",
    "qlvl": "79"
  },
  {
    "id": "gothic_shield",
    "name": "Gothic Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "4",
      "damageMax": "11",
      "damageAvg": "7.5",
      "defenseMin": "30",
      "defenseMax": "35",
      "requiredStrength": "60",
      "blockChance": "20",
      "durability": "40"
    },
    "sockets": "3",
    "qlvl": "30"
  },
  {
    "id": "ancient_shield",
    "name": "Ancient Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "18",
      "damageMax": "30",
      "damageAvg": "24",
      "defenseMin": "80",
      "defenseMax": "93",
      "requiredStrength": "110",
      "blockChance": "20",
      "durability": "80",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "56"
  },
  {
    "id": "ward",
    "name": "Ward",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "21",
      "damageMax": "68",
      "damageAvg": "44.5",
      "defenseMin": "183",
      "defenseMax": "207",
      "defensePct": "22%",
      "requiredStrength": "185",
      "blockChance": "32",
      "durability": "100",
      "requiredLevel": "63"
    },
    "sockets": "3/3/4",
    "qlvl": "84"
  },
  {
    "id": "targe",
    "name": "Targe",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "2",
      "damageMax": "6",
      "damageAvg": "4",
      "defenseMin": "8",
      "defenseMax": "12",
      "requiredStrength": "16",
      "blockChance": "10",
      "durability": "20",
      "requiredLevel": "3"
    },
    "sockets": "3/4/4",
    "qlvl": "4"
  },
  {
    "id": "akaran_targe",
    "name": "Akaran Targe",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "13",
      "damageMax": "17",
      "damageAvg": "15",
      "defenseMin": "101",
      "defenseMax": "125",
      "requiredStrength": "44",
      "blockChance": "10",
      "durability": "20",
      "requiredLevel": "26"
    },
    "sockets": "3/4/4",
    "qlvl": "35"
  },
  {
    "id": "sacred_targe",
    "name": "Sacred Targe",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "22",
      "damageMax": "70",
      "damageAvg": "46",
      "defenseMin": "109",
      "defenseMax": "136",
      "requiredStrength": "86",
      "blockChance": "25",
      "durability": "45",
      "requiredLevel": "47"
    },
    "sockets": "3/4/4",
    "qlvl": "63"
  },
  {
    "id": "rondache",
    "name": "Rondache",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "3",
      "damageMax": "9",
      "damageAvg": "6",
      "defenseMin": "10",
      "defenseMax": "18",
      "requiredStrength": "26",
      "blockChance": "15",
      "durability": "30",
      "requiredLevel": "6"
    },
    "sockets": "3/4/4",
    "qlvl": "8"
  },
  {
    "id": "akaran_rondache",
    "name": "Akaran Rondache",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "17",
      "damageMax": "22",
      "damageAvg": "19.5",
      "defenseMin": "113",
      "defenseMax": "137",
      "requiredStrength": "59",
      "blockChance": "15",
      "durability": "30",
      "requiredLevel": "30"
    },
    "sockets": "3/4/4",
    "qlvl": "40"
  },
  {
    "id": "sacred_rondache",
    "name": "Sacred Rondache",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "35",
      "damageMax": "58",
      "damageAvg": "46.5",
      "defenseMin": "130",
      "defenseMax": "155",
      "requiredStrength": "109",
      "blockChance": "27",
      "durability": "68",
      "requiredLevel": "52"
    },
    "sockets": "3/4/4",
    "qlvl": "70"
  },
  {
    "id": "heraldic_shield",
    "name": "Heraldic Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "4",
      "damageMax": "14",
      "damageAvg": "9",
      "defenseMin": "16",
      "defenseMax": "26",
      "requiredStrength": "40",
      "blockChance": "20",
      "durability": "40",
      "requiredLevel": "12"
    },
    "sockets": "3/4/4",
    "qlvl": "16"
  },
  {
    "id": "protector_shield",
    "name": "Protector Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "20",
      "damageMax": "26",
      "damageAvg": "23",
      "defenseMin": "129",
      "defenseMax": "153",
      "requiredStrength": "69",
      "blockChance": "20",
      "durability": "40",
      "requiredLevel": "34"
    },
    "sockets": "3/4/4",
    "qlvl": "46"
  },
  {
    "id": "kurast_shield",
    "name": "Kurast Shield",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "10",
      "damageMax": "82",
      "damageAvg": "46",
      "defenseMin": "166",
      "defenseMax": "185",
      "requiredStrength": "124",
      "blockChance": "29",
      "durability": "55",
      "requiredLevel": "55"
    },
    "sockets": "3/4/4",
    "qlvl": "74"
  },
  {
    "id": "aerin_shield",
    "name": "Aerin Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "7",
      "damageMax": "16",
      "damageAvg": "11.5",
      "defenseMin": "26",
      "defenseMax": "36",
      "requiredStrength": "50",
      "blockChance": "22",
      "durability": "50",
      "requiredLevel": "15"
    },
    "sockets": "3/4/4",
    "qlvl": "20"
  },
  {
    "id": "gilded_shield",
    "name": "Gilded Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "21",
      "damageMax": "30",
      "damageAvg": "25.5",
      "defenseMin": "144",
      "defenseMax": "168",
      "requiredStrength": "89",
      "blockChance": "22",
      "durability": "50",
      "requiredLevel": "38"
    },
    "sockets": "3/4/4",
    "qlvl": "51"
  },
  {
    "id": "zakarum_shield",
    "name": "Zakarum Shield",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "46",
      "damageMax": "46",
      "damageAvg": "46",
      "defenseMin": "185",
      "defenseMax": "214",
      "requiredStrength": "142",
      "blockChance": "31",
      "durability": "65",
      "requiredLevel": "61"
    },
    "sockets": "3/4/4",
    "qlvl": "82"
  },
  {
    "id": "crown_shield",
    "name": "Crown Shield",
    "category": "Weapon",
    "tier": "Normal",
    "stats": {
      "damageMin": "7",
      "damageMax": "20",
      "damageAvg": "13.5",
      "defenseMin": "30",
      "defenseMax": "40",
      "requiredStrength": "65",
      "blockChance": "25",
      "durability": "60",
      "requiredLevel": "18"
    },
    "sockets": "3/4/4",
    "qlvl": "24"
  },
  {
    "id": "royal_shield",
    "name": "Royal Shield",
    "category": "Weapon",
    "tier": "Exceptional",
    "stats": {
      "damageMin": "24",
      "damageMax": "32",
      "damageAvg": "28",
      "defenseMin": "156",
      "defenseMax": "181",
      "requiredStrength": "114",
      "blockChance": "23",
      "durability": "60",
      "requiredLevel": "41"
    },
    "sockets": "3/4/4",
    "qlvl": "55"
  },
  {
    "id": "vortex_shield",
    "name": "Vortex Shield",
    "category": "Weapon",
    "tier": "Elite",
    "stats": {
      "damageMin": "5",
      "damageMax": "87",
      "damageAvg": "46",
      "defenseMin": "205",
      "defenseMax": "243",
      "requiredStrength": "148",
      "blockChance": "32",
      "durability": "90",
      "requiredLevel": "66"
    },
    "sockets": "3/4/4",
    "qlvl": "85"
  },
  {
    "id": "cap",
    "name": "Cap",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "3",
      "defenseMax": "5",
      "requiredStrength": "0",
      "durability": "12"
    },
    "sockets": "2",
    "qlvl": "1"
  },
  {
    "id": "war_hat",
    "name": "War Hat",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "45",
      "defenseMax": "53",
      "requiredStrength": "20",
      "durability": "12",
      "requiredLevel": "22"
    },
    "sockets": "2",
    "qlvl": "34"
  },
  {
    "id": "shako",
    "name": "Shako",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "98",
      "defenseMax": "141",
      "requiredStrength": "50",
      "durability": "12",
      "requiredLevel": "43"
    },
    "sockets": "2",
    "qlvl": "58"
  },
  {
    "id": "skull_cap",
    "name": "Skull Cap",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "8",
      "defenseMax": "11",
      "requiredStrength": "15",
      "durability": "18"
    },
    "sockets": "2",
    "qlvl": "5"
  },
  {
    "id": "sallet",
    "name": "Sallet",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "52",
      "defenseMax": "62",
      "requiredStrength": "43",
      "durability": "18",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "37"
  },
  {
    "id": "hydraskull",
    "name": "Hydraskull",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "101",
      "defenseMax": "145",
      "requiredStrength": "84",
      "durability": "18",
      "requiredLevel": "47"
    },
    "sockets": "2",
    "qlvl": "63"
  },
  {
    "id": "helm",
    "name": "Helm",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "15",
      "defenseMax": "18",
      "requiredStrength": "26",
      "durability": "24"
    },
    "sockets": "2",
    "qlvl": "11"
  },
  {
    "id": "casque",
    "name": "Casque",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "63",
      "defenseMax": "72",
      "requiredStrength": "59",
      "durability": "24",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "42"
  },
  {
    "id": "armet",
    "name": "Armet",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "105",
      "defenseMax": "149",
      "requiredStrength": "109",
      "durability": "24",
      "requiredLevel": "51"
    },
    "sockets": "2",
    "qlvl": "68"
  },
  {
    "id": "full_helm",
    "name": "Full Helm",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "23",
      "defenseMax": "26",
      "requiredStrength": "41",
      "durability": "30"
    },
    "sockets": "2",
    "qlvl": "15"
  },
  {
    "id": "basinet",
    "name": "Basinet",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "75",
      "defenseMax": "84",
      "requiredStrength": "82",
      "durability": "30",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "45"
  },
  {
    "id": "giant_conch",
    "name": "Giant Conch",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "110",
      "defenseMax": "154",
      "requiredStrength": "142",
      "durability": "30",
      "requiredLevel": "40"
    },
    "sockets": "2",
    "qlvl": "54"
  },
  {
    "id": "mask",
    "name": "Mask",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "9",
      "defenseMax": "27",
      "requiredStrength": "23",
      "durability": "20"
    },
    "sockets": "2/2/3",
    "qlvl": "19"
  },
  {
    "id": "death_mask",
    "name": "Death Mask",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "54",
      "defenseMax": "86",
      "requiredStrength": "55",
      "durability": "20",
      "requiredLevel": "25"
    },
    "sockets": "2/2/3",
    "qlvl": "48"
  },
  {
    "id": "demonhead",
    "name": "Demonhead",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "101",
      "defenseMax": "154",
      "requiredStrength": "102",
      "durability": "20",
      "requiredLevel": "55"
    },
    "sockets": "2/2/3",
    "qlvl": "74"
  },
  {
    "id": "bone_helm",
    "name": "Bone Helm",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "33",
      "defenseMax": "36",
      "requiredStrength": "25",
      "durability": "40"
    },
    "sockets": "2",
    "qlvl": "22"
  },
  {
    "id": "grim_helm",
    "name": "Grim Helm",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "60",
      "defenseMax": "125",
      "requiredStrength": "58",
      "durability": "40",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "50"
  },
  {
    "id": "bone_visage",
    "name": "Bone Visage",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "100",
      "defenseMax": "157",
      "requiredStrength": "106",
      "durability": "40",
      "requiredLevel": "63"
    },
    "sockets": "2/2/3",
    "qlvl": "84"
  },
  {
    "id": "great_helm",
    "name": "Great Helm",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "30",
      "defenseMax": "35",
      "requiredStrength": "63",
      "durability": "40"
    },
    "sockets": "2/2/3",
    "qlvl": "23"
  },
  {
    "id": "winged_helm",
    "name": "Winged Helm",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "85",
      "defenseMax": "98",
      "requiredStrength": "115",
      "durability": "40",
      "requiredLevel": "25"
    },
    "sockets": "2/2/3",
    "qlvl": "51"
  },
  {
    "id": "spired_helm",
    "name": "Spired Helm",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "114",
      "defenseMax": "159",
      "requiredStrength": "192",
      "durability": "40",
      "requiredLevel": "59"
    },
    "sockets": "2/2/3",
    "qlvl": "79"
  },
  {
    "id": "crown",
    "name": "Crown",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "25",
      "defenseMax": "45",
      "requiredStrength": "55",
      "durability": "50"
    },
    "sockets": "2/2/3",
    "qlvl": "29"
  },
  {
    "id": "grand_crown",
    "name": "Grand Crown",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "78",
      "defenseMax": "113",
      "requiredStrength": "103",
      "durability": "50",
      "requiredLevel": "25"
    },
    "sockets": "2/2/3",
    "qlvl": "55"
  },
  {
    "id": "corona",
    "name": "Corona",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "111",
      "defenseMax": "165",
      "requiredStrength": "174",
      "durability": "50",
      "requiredLevel": "66"
    },
    "sockets": "2/2/3",
    "qlvl": "85"
  },
  {
    "id": "quilted_armor",
    "name": "Quilted Armor",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "9",
      "defenseMax": "11",
      "defensePct": "0%",
      "requiredStrength": "12",
      "durability": "20"
    },
    "sockets": "2",
    "qlvl": "1"
  },
  {
    "id": "ghost_armor",
    "name": "Ghost Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "106",
      "defenseMax": "112",
      "defensePct": "-4%",
      "requiredStrength": "38",
      "durability": "20",
      "requiredLevel": "22"
    },
    "sockets": "2",
    "qlvl": "34"
  },
  {
    "id": "dusk_shroud",
    "name": "Dusk Shroud",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "270",
      "defenseMax": "302",
      "defensePct": "-35%",
      "requiredStrength": "77",
      "durability": "20",
      "requiredLevel": "49"
    },
    "sockets": "3/4/4",
    "qlvl": "65"
  },
  {
    "id": "leather_armor",
    "name": "Leather Armor",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "15",
      "defenseMax": "17",
      "defensePct": "0%",
      "requiredStrength": "15",
      "durability": "24"
    },
    "sockets": "2",
    "qlvl": "3"
  },
  {
    "id": "serpentskin_armor",
    "name": "Serpentskin Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "116",
      "defenseMax": "122",
      "defensePct": "-3%",
      "requiredStrength": "43",
      "durability": "24",
      "requiredLevel": "24"
    },
    "sockets": "2",
    "qlvl": "36"
  },
  {
    "id": "wyrmhide",
    "name": "Wyrmhide",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "287",
      "defenseMax": "322",
      "defensePct": "-31%",
      "requiredStrength": "84",
      "durability": "24",
      "requiredLevel": "50"
    },
    "sockets": "3/4/4",
    "qlvl": "67"
  },
  {
    "id": "hard_leather_armor",
    "name": "Hard Leather Armor",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "23",
      "defenseMax": "25",
      "defensePct": "4%",
      "requiredStrength": "20",
      "durability": "28"
    },
    "sockets": "2",
    "qlvl": "5"
  },
  {
    "id": "demonhide_armor",
    "name": "Demonhide Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "128",
      "defenseMax": "134",
      "defensePct": "-1%",
      "requiredStrength": "50",
      "durability": "28",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "37"
  },
  {
    "id": "scarab_husk",
    "name": "Scarab Husk",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "309",
      "defenseMax": "349",
      "defensePct": "-26%",
      "requiredStrength": "95",
      "durability": "28",
      "requiredLevel": "51"
    },
    "sockets": "3/4/4",
    "qlvl": "68"
  },
  {
    "id": "studded_leather",
    "name": "Studded Leather",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "35",
      "defenseMax": "37",
      "defensePct": "6%",
      "requiredStrength": "27",
      "durability": "32"
    },
    "sockets": "2",
    "qlvl": "8"
  },
  {
    "id": "trellised_armor",
    "name": "Trellised Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "148",
      "defenseMax": "156",
      "defensePct": "2%",
      "requiredStrength": "61",
      "durability": "32",
      "requiredLevel": "25"
    },
    "sockets": "2",
    "qlvl": "40"
  },
  {
    "id": "wire_fleece",
    "name": "Wire Fleece",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "343",
      "defenseMax": "391",
      "defensePct": "-19%",
      "requiredStrength": "111",
      "durability": "32",
      "requiredLevel": "53"
    },
    "sockets": "3/4/4",
    "qlvl": "70"
  },
  {
    "id": "ring_mail",
    "name": "Ring Mail",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "49",
      "defenseMax": "51",
      "defensePct": "6%",
      "requiredStrength": "36",
      "durability": "26"
    },
    "sockets": "3",
    "qlvl": "11"
  },
  {
    "id": "linked_mail",
    "name": "Linked Mail",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "172",
      "defenseMax": "180",
      "defensePct": "5%",
      "requiredStrength": "74",
      "durability": "26",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "42"
  },
  {
    "id": "diamond_mail",
    "name": "Diamond Mail",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "388",
      "defenseMax": "445",
      "defensePct": "-9%",
      "requiredStrength": "131",
      "durability": "26",
      "requiredLevel": "54"
    },
    "sockets": "3/4/4",
    "qlvl": "72"
  },
  {
    "id": "scale_mail",
    "name": "Scale Mail",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "61",
      "defenseMax": "63",
      "defensePct": "5%",
      "requiredStrength": "44",
      "durability": "36"
    },
    "sockets": "2",
    "qlvl": "13"
  },
  {
    "id": "tigulated_mail",
    "name": "Tigulated Mail",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "193",
      "defenseMax": "202",
      "defensePct": "6%",
      "requiredStrength": "86",
      "durability": "36",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "43"
  },
  {
    "id": "loricated_mail",
    "name": "Loricated Mail",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "429",
      "defenseMax": "495",
      "defensePct": "-1%",
      "requiredStrength": "149",
      "durability": "36",
      "requiredLevel": "55"
    },
    "sockets": "3/4/4",
    "qlvl": "73"
  },
  {
    "id": "chain_mail",
    "name": "Chain Mail",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "70",
      "defenseMax": "71",
      "defensePct": "-5%",
      "requiredStrength": "48",
      "durability": "45"
    },
    "sockets": "2",
    "qlvl": "15"
  },
  {
    "id": "mesh_armor",
    "name": "Mesh Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "207",
      "defenseMax": "216",
      "defensePct": "1%",
      "requiredStrength": "92",
      "durability": "45",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "45"
  },
  {
    "id": "boneweave",
    "name": "Boneweave",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "419",
      "defenseMax": "489",
      "defensePct": "-3%",
      "requiredStrength": "158",
      "durability": "45",
      "requiredLevel": "47"
    },
    "sockets": "3/4/4",
    "qlvl": "62"
  },
  {
    "id": "breast_plate",
    "name": "Breast Plate",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "56",
      "defenseMax": "58",
      "defensePct": "-15%",
      "requiredStrength": "30",
      "durability": "50"
    },
    "sockets": "3",
    "qlvl": "18"
  },
  {
    "id": "cuirass",
    "name": "Cuirass",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "170",
      "defenseMax": "176",
      "defensePct": "-13%",
      "requiredStrength": "65",
      "durability": "50",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "47"
  },
  {
    "id": "great_hauberk",
    "name": "Great Hauberk",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "371",
      "defenseMax": "420",
      "defensePct": "-16%",
      "requiredStrength": "118",
      "durability": "50",
      "requiredLevel": "56"
    },
    "sockets": "3/4/4",
    "qlvl": "75"
  },
  {
    "id": "splint_mail",
    "name": "Splint Mail",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "81",
      "defenseMax": "84",
      "defensePct": "-12%",
      "requiredStrength": "51",
      "durability": "30"
    },
    "sockets": "2",
    "qlvl": "20"
  },
  {
    "id": "russet_armor",
    "name": "Russet Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "223",
      "defenseMax": "233",
      "defensePct": "-4%",
      "requiredStrength": "97",
      "durability": "30",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "49"
  },
  {
    "id": "balrog_skin",
    "name": "Balrog Skin",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "469",
      "defenseMax": "541",
      "defensePct": "5%",
      "requiredStrength": "165",
      "durability": "30",
      "requiredLevel": "57"
    },
    "sockets": "3/4/4",
    "qlvl": "76"
  },
  {
    "id": "plate_mail",
    "name": "Plate Mail",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "103",
      "defenseMax": "108",
      "defensePct": "-7%",
      "requiredStrength": "65",
      "durability": "60"
    },
    "sockets": "2",
    "qlvl": "24"
  },
  {
    "id": "templar_coat",
    "name": "Templar Coat",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "264",
      "defenseMax": "278",
      "defensePct": "1%",
      "requiredStrength": "118",
      "durability": "60",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "52"
  },
  {
    "id": "hellforge_plate",
    "name": "Hellforge Plate",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "536",
      "defenseMax": "625",
      "defensePct": "18%",
      "requiredStrength": "196",
      "durability": "60",
      "requiredLevel": "59"
    },
    "sockets": "3/4/4",
    "qlvl": "78"
  },
  {
    "id": "field_plate",
    "name": "Field Plate",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "100",
      "defenseMax": "102",
      "defensePct": "-3%",
      "requiredStrength": "55",
      "durability": "48"
    },
    "sockets": "2",
    "qlvl": "28"
  },
  {
    "id": "sharktooth_armor",
    "name": "Sharktooth Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "246",
      "defenseMax": "255",
      "defensePct": "-1%",
      "requiredStrength": "103",
      "durability": "48",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "55"
  },
  {
    "id": "kraken_shell",
    "name": "Kraken Shell",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "501",
      "defenseMax": "576",
      "defensePct": "10%",
      "requiredStrength": "174",
      "durability": "48",
      "requiredLevel": "61"
    },
    "sockets": "3/4/4",
    "qlvl": "81"
  },
  {
    "id": "gothic_plate",
    "name": "Gothic Plate",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "124",
      "defenseMax": "128",
      "defensePct": "-5%",
      "requiredStrength": "70",
      "durability": "55"
    },
    "sockets": "3/4/4",
    "qlvl": "32"
  },
  {
    "id": "embossed_plate",
    "name": "Embossed Plate",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "291",
      "defenseMax": "304",
      "defensePct": "1%",
      "requiredStrength": "125",
      "durability": "55",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "58"
  },
  {
    "id": "lacquered_plate",
    "name": "Lacquered Plate",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "573",
      "defenseMax": "664",
      "defensePct": "23%",
      "requiredStrength": "208",
      "durability": "55",
      "requiredLevel": "62"
    },
    "sockets": "3/4/4",
    "qlvl": "82"
  },
  {
    "id": "light_plate",
    "name": "Light Plate",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "93",
      "defenseMax": "99",
      "defensePct": "-7%",
      "requiredStrength": "41",
      "durability": "60"
    },
    "sockets": "3",
    "qlvl": "35"
  },
  {
    "id": "mage_plate",
    "name": "Mage Plate",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "178",
      "defenseMax": "187",
      "defensePct": "-28%",
      "requiredStrength": "55",
      "durability": "60",
      "requiredLevel": "25"
    },
    "sockets": "3",
    "qlvl": "60"
  },
  {
    "id": "archon_plate",
    "name": "Archon Plate",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "364",
      "defenseMax": "407",
      "defensePct": "-22%",
      "requiredStrength": "103",
      "durability": "60",
      "requiredLevel": "63"
    },
    "sockets": "3/4/4",
    "qlvl": "84"
  },
  {
    "id": "full_plate_mail",
    "name": "Full Plate Mail",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "145",
      "defenseMax": "150",
      "defensePct": "-7%",
      "requiredStrength": "80",
      "durability": "70"
    },
    "sockets": "3/4/4",
    "qlvl": "37"
  },
  {
    "id": "chaos_armor",
    "name": "Chaos Armor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "323",
      "defenseMax": "340",
      "defensePct": "-1%",
      "requiredStrength": "140",
      "durability": "70",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "61"
  },
  {
    "id": "shadow_plate",
    "name": "Shadow Plate",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "599",
      "defenseMax": "696",
      "defensePct": "25%",
      "requiredStrength": "220",
      "durability": "70",
      "requiredLevel": "64"
    },
    "sockets": "3/4/4",
    "qlvl": "83"
  },
  {
    "id": "ancient_armor",
    "name": "Ancient Armor",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "178",
      "defenseMax": "185",
      "defensePct": "-21%",
      "requiredStrength": "100",
      "durability": "60"
    },
    "sockets": "3/4/4",
    "qlvl": "40"
  },
  {
    "id": "ornate_plate",
    "name": "Ornate Plate",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "393",
      "defenseMax": "414",
      "defensePct": "-1%",
      "requiredStrength": "170",
      "durability": "60",
      "requiredLevel": "25"
    },
    "sockets": "3/4/4",
    "qlvl": "64"
  },
  {
    "id": "sacred_armor",
    "name": "Sacred Armor",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "633",
      "defenseMax": "730",
      "defensePct": "22%",
      "requiredStrength": "232",
      "durability": "60",
      "requiredLevel": "66"
    },
    "sockets": "3/4/4",
    "qlvl": "85"
  },
  {
    "id": "leather_gloves",
    "name": "Leather Gloves",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "2",
      "defenseMax": "3",
      "requiredStrength": "0",
      "durability": "12"
    },
    "qlvl": "3"
  },
  {
    "id": "demonhide_gloves",
    "name": "Demonhide Gloves",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "28",
      "defenseMax": "35",
      "requiredStrength": "20",
      "durability": "12",
      "requiredLevel": "21"
    },
    "qlvl": "33"
  },
  {
    "id": "bramble_mitts",
    "name": "Bramble Mitts",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "54",
      "defenseMax": "62",
      "requiredStrength": "50",
      "durability": "12",
      "requiredLevel": "42"
    },
    "qlvl": "57"
  },
  {
    "id": "heavy_gloves",
    "name": "Heavy Gloves",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "5",
      "defenseMax": "6",
      "requiredStrength": "0",
      "durability": "14"
    },
    "qlvl": "7"
  },
  {
    "id": "sharkskin_gloves",
    "name": "Sharkskin Gloves",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "33",
      "defenseMax": "39",
      "requiredStrength": "20",
      "durability": "14",
      "requiredLevel": "25"
    },
    "qlvl": "39"
  },
  {
    "id": "vampirebone_gloves",
    "name": "Vampirebone Gloves",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "56",
      "defenseMax": "65",
      "requiredStrength": "50",
      "durability": "14",
      "requiredLevel": "47"
    },
    "qlvl": "63"
  },
  {
    "id": "chain_gloves",
    "name": "Chain Gloves",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "8",
      "defenseMax": "9",
      "requiredStrength": "25",
      "durability": "16"
    },
    "qlvl": "12"
  },
  {
    "id": "heavy_bracers",
    "name": "Heavy Bracers",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "37",
      "defenseMax": "44",
      "requiredStrength": "58",
      "durability": "16",
      "requiredLevel": "25"
    },
    "qlvl": "43"
  },
  {
    "id": "vambraces",
    "name": "Vambraces",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "59",
      "defenseMax": "67",
      "requiredStrength": "106",
      "durability": "16",
      "requiredLevel": "51"
    },
    "qlvl": "69"
  },
  {
    "id": "light_gauntlets",
    "name": "Light Gauntlets",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "9",
      "defenseMax": "11",
      "requiredStrength": "45",
      "durability": "18"
    },
    "qlvl": "20"
  },
  {
    "id": "battle_gauntlets",
    "name": "Battle Gauntlets",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "39",
      "defenseMax": "47",
      "requiredStrength": "88",
      "durability": "18",
      "requiredLevel": "25"
    },
    "qlvl": "49"
  },
  {
    "id": "crusader_gauntlets",
    "name": "Crusader Gauntlets",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "59",
      "defenseMax": "68",
      "requiredStrength": "151",
      "durability": "18",
      "requiredLevel": "57"
    },
    "qlvl": "76"
  },
  {
    "id": "gauntlets",
    "name": "Gauntlets",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "12",
      "defenseMax": "15",
      "requiredStrength": "60",
      "durability": "24"
    },
    "qlvl": "27"
  },
  {
    "id": "war_gauntlets",
    "name": "War Gauntlets",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "43",
      "defenseMax": "53",
      "requiredStrength": "110",
      "durability": "24",
      "requiredLevel": "25"
    },
    "qlvl": "54"
  },
  {
    "id": "ogre_gauntlets",
    "name": "Ogre Gauntlets",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "62",
      "defenseMax": "71",
      "requiredStrength": "185",
      "durability": "24",
      "requiredLevel": "64"
    },
    "qlvl": "85"
  },
  {
    "id": "sash",
    "name": "Sash",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "2",
      "defenseMax": "2",
      "requiredStrength": "0",
      "durability": "12"
    },
    "qlvl": "3"
  },
  {
    "id": "demonhide_sash",
    "name": "Demonhide Sash",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "29",
      "defenseMax": "34",
      "requiredStrength": "20",
      "durability": "12",
      "requiredLevel": "24"
    },
    "qlvl": "36"
  },
  {
    "id": "spiderweb_sash",
    "name": "Spiderweb Sash",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "55",
      "defenseMax": "62",
      "requiredStrength": "50",
      "durability": "12",
      "requiredLevel": "46"
    },
    "qlvl": "61"
  },
  {
    "id": "light_belt",
    "name": "Light Belt",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "3",
      "defenseMax": "3",
      "requiredStrength": "0",
      "durability": "14"
    },
    "qlvl": "7"
  },
  {
    "id": "sharkskin_belt",
    "name": "Sharkskin Belt",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "31",
      "defenseMax": "36",
      "requiredStrength": "20",
      "durability": "14",
      "requiredLevel": "25"
    },
    "qlvl": "39"
  },
  {
    "id": "vampirefang_belt",
    "name": "Vampirefang Belt",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "56",
      "defenseMax": "63",
      "requiredStrength": "50",
      "durability": "14",
      "requiredLevel": "51"
    },
    "qlvl": "68"
  },
  {
    "id": "belt",
    "name": "Belt",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "5",
      "defenseMax": "5",
      "requiredStrength": "25",
      "durability": "16"
    },
    "qlvl": "12"
  },
  {
    "id": "mesh_belt",
    "name": "Mesh Belt",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "35",
      "defenseMax": "40",
      "requiredStrength": "58",
      "durability": "16",
      "requiredLevel": "25"
    },
    "qlvl": "43"
  },
  {
    "id": "mithril_coil",
    "name": "Mithril Coil",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "58",
      "defenseMax": "65",
      "requiredStrength": "106",
      "durability": "16",
      "requiredLevel": "56"
    },
    "qlvl": "75"
  },
  {
    "id": "heavy_belt",
    "name": "Heavy Belt",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "6",
      "defenseMax": "6",
      "requiredStrength": "45",
      "durability": "18"
    },
    "qlvl": "20"
  },
  {
    "id": "battle_belt",
    "name": "Battle Belt",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "37",
      "defenseMax": "42",
      "requiredStrength": "88",
      "durability": "18",
      "requiredLevel": "25"
    },
    "qlvl": "49"
  },
  {
    "id": "troll_belt",
    "name": "Troll Belt",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "59",
      "defenseMax": "66",
      "requiredStrength": "151",
      "durability": "18",
      "requiredLevel": "62"
    },
    "qlvl": "82"
  },
  {
    "id": "plated_belt",
    "name": "Plated Belt",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "8",
      "defenseMax": "11",
      "requiredStrength": "60",
      "durability": "24"
    },
    "qlvl": "27"
  },
  {
    "id": "war_belt",
    "name": "War Belt",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "41",
      "defenseMax": "52",
      "requiredStrength": "110",
      "durability": "24",
      "requiredLevel": "25"
    },
    "qlvl": "54"
  },
  {
    "id": "colossus_girdle",
    "name": "Colossus Girdle",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "61",
      "defenseMax": "71",
      "requiredStrength": "185",
      "durability": "24",
      "requiredLevel": "67"
    },
    "qlvl": "85"
  },
  {
    "id": "circlet",
    "name": "Circlet",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "20",
      "defenseMax": "30",
      "requiredStrength": "0",
      "durability": "35",
      "requiredLevel": "16"
    },
    "sockets": "1/2/2",
    "qlvl": "24"
  },
  {
    "id": "tiara",
    "name": "Tiara",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "40",
      "defenseMax": "50",
      "requiredStrength": "0",
      "durability": "25",
      "requiredLevel": "52"
    },
    "sockets": "1/2/3",
    "qlvl": "70"
  },
  {
    "id": "diadem",
    "name": "Diadem",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "50",
      "defenseMax": "60",
      "requiredStrength": "0",
      "durability": "20",
      "requiredLevel": "64"
    },
    "sockets": "1/2/3",
    "qlvl": "85"
  },
  {
    "id": "coronet",
    "name": "Coronet",
    "category": "Armor",
    "tier": "Any",
    "stats": {
      "defenseMin": "30",
      "defenseMax": "40",
      "requiredStrength": "0",
      "durability": "30",
      "requiredLevel": "39"
    },
    "sockets": "1/2/2",
    "qlvl": "52"
  },
  {
    "id": "wolf_head",
    "name": "Wolf Head",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "8",
      "defenseMax": "11",
      "requiredStrength": "16",
      "durability": "20",
      "requiredLevel": "3"
    },
    "sockets": "2/3/3",
    "qlvl": "4"
  },
  {
    "id": "alpha_helm",
    "name": "Alpha Helm",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "52",
      "defenseMax": "62",
      "requiredStrength": "44",
      "durability": "20",
      "requiredLevel": "26"
    },
    "sockets": "2/3/3",
    "qlvl": "35"
  },
  {
    "id": "blood_spirit",
    "name": "Blood Spirit",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "101",
      "defenseMax": "145",
      "requiredStrength": "86",
      "durability": "20",
      "requiredLevel": "46"
    },
    "sockets": "2/3/3",
    "qlvl": "62"
  },
  {
    "id": "hawk_helm",
    "name": "Hawk Helm",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "4",
      "defenseMax": "15",
      "requiredStrength": "20",
      "durability": "20",
      "requiredLevel": "6"
    },
    "sockets": "2/3/3",
    "qlvl": "8"
  },
  {
    "id": "griffon_headress",
    "name": "Griffon Headress",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "46",
      "defenseMax": "68",
      "requiredStrength": "50",
      "durability": "20",
      "requiredLevel": "30"
    },
    "sockets": "2/3/3",
    "qlvl": "40"
  },
  {
    "id": "sun_spirit",
    "name": "Sun Spirit",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "98",
      "defenseMax": "147",
      "requiredStrength": "95",
      "durability": "20",
      "requiredLevel": "51"
    },
    "sockets": "2/3/3",
    "qlvl": "69"
  },
  {
    "id": "antlers",
    "name": "Antlers",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "18",
      "defenseMax": "24",
      "requiredStrength": "24",
      "durability": "20",
      "requiredLevel": "12"
    },
    "sockets": "2/3/3",
    "qlvl": "16"
  },
  {
    "id": "hunter_s_guise",
    "name": "Hunter's Guise",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "67",
      "defenseMax": "81",
      "requiredStrength": "56",
      "durability": "20",
      "requiredLevel": "29"
    },
    "sockets": "2/3/3",
    "qlvl": "46"
  },
  {
    "id": "earth_spirit",
    "name": "Earth Spirit",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "107",
      "defenseMax": "152",
      "requiredStrength": "104",
      "durability": "20",
      "requiredLevel": "57"
    },
    "sockets": "2/3/3",
    "qlvl": "76"
  },
  {
    "id": "falcon_mask",
    "name": "Falcon Mask",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "12",
      "defenseMax": "28",
      "requiredStrength": "28",
      "durability": "20",
      "requiredLevel": "15"
    },
    "sockets": "2/3/3",
    "qlvl": "20"
  },
  {
    "id": "sacred_feathers",
    "name": "Sacred Feathers",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "58",
      "defenseMax": "87",
      "requiredStrength": "62",
      "durability": "20",
      "requiredLevel": "32"
    },
    "sockets": "2/3/3",
    "qlvl": "50"
  },
  {
    "id": "sky_spirit",
    "name": "Sky Spirit",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "103",
      "defenseMax": "155",
      "requiredStrength": "113",
      "durability": "20",
      "requiredLevel": "62"
    },
    "sockets": "2/3/3",
    "qlvl": "83"
  },
  {
    "id": "spirit_mask",
    "name": "Spirit Mask",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "22",
      "defenseMax": "35",
      "requiredStrength": "30",
      "durability": "20",
      "requiredLevel": "18"
    },
    "sockets": "2/3/3",
    "qlvl": "24"
  },
  {
    "id": "totemic_mask",
    "name": "Totemic Mask",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "73",
      "defenseMax": "98",
      "requiredStrength": "65",
      "durability": "20",
      "requiredLevel": "41"
    },
    "sockets": "2/3/3",
    "qlvl": "55"
  },
  {
    "id": "dream_spirit",
    "name": "Dream Spirit",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "109",
      "defenseMax": "159",
      "requiredStrength": "118",
      "durability": "20",
      "requiredLevel": "66"
    },
    "sockets": "2/3/3",
    "qlvl": "85"
  },
  {
    "id": "jawbone_cap",
    "name": "Jawbone Cap",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "10",
      "defenseMax": "15",
      "requiredStrength": "25",
      "durability": "25",
      "requiredLevel": "3"
    },
    "sockets": "2/3/3",
    "qlvl": "4"
  },
  {
    "id": "jawbone_visor",
    "name": "Jawbone Visor",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "55",
      "defenseMax": "68",
      "requiredStrength": "58",
      "durability": "25",
      "requiredLevel": "25"
    },
    "sockets": "2/3/3",
    "qlvl": "33"
  },
  {
    "id": "carnage_helm",
    "name": "Carnage Helm",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "102",
      "defenseMax": "147",
      "requiredStrength": "106",
      "durability": "25",
      "requiredLevel": "45"
    },
    "sockets": "2/3/3",
    "qlvl": "60"
  },
  {
    "id": "fanged_helm",
    "name": "Fanged Helm",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "15",
      "defenseMax": "20",
      "requiredStrength": "35",
      "durability": "35",
      "requiredLevel": "6"
    },
    "sockets": "2/3/3",
    "qlvl": "8"
  },
  {
    "id": "lion_helm",
    "name": "Lion Helm",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "63",
      "defenseMax": "75",
      "requiredStrength": "73",
      "durability": "35",
      "requiredLevel": "29"
    },
    "sockets": "2/3/3",
    "qlvl": "38"
  },
  {
    "id": "fury_visor",
    "name": "Fury Visor",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "105",
      "defenseMax": "150",
      "requiredStrength": "129",
      "durability": "35",
      "requiredLevel": "49"
    },
    "sockets": "2/3/3",
    "qlvl": "66"
  },
  {
    "id": "horned_helm",
    "name": "Horned Helm",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "25",
      "defenseMax": "30",
      "requiredStrength": "45",
      "durability": "45",
      "requiredLevel": "12"
    },
    "sockets": "2/3/3",
    "qlvl": "16"
  },
  {
    "id": "rage_mask",
    "name": "Rage Mask",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "78",
      "defenseMax": "90",
      "requiredStrength": "88",
      "durability": "45",
      "requiredLevel": "29"
    },
    "sockets": "2/3/3",
    "qlvl": "44"
  },
  {
    "id": "destroyer_helm",
    "name": "Destroyer Helm",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "111",
      "defenseMax": "156",
      "requiredStrength": "151",
      "durability": "45",
      "requiredLevel": "54"
    },
    "sockets": "2/3/3",
    "qlvl": "73"
  },
  {
    "id": "assault_helmet",
    "name": "Assault Helmet",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "30",
      "defenseMax": "35",
      "requiredStrength": "55",
      "durability": "50",
      "requiredLevel": "15"
    },
    "sockets": "2/3/3",
    "qlvl": "20"
  },
  {
    "id": "savage_helmet",
    "name": "Savage Helmet",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "85",
      "defenseMax": "98",
      "requiredStrength": "103",
      "durability": "50",
      "requiredLevel": "32"
    },
    "sockets": "2/3/3",
    "qlvl": "49"
  },
  {
    "id": "conqueror_crown",
    "name": "Conqueror Crown",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "114",
      "defenseMax": "159",
      "requiredStrength": "174",
      "durability": "50",
      "requiredLevel": "60"
    },
    "sockets": "2/3/3",
    "qlvl": "80"
  },
  {
    "id": "avenger_guard",
    "name": "Avenger Guard",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "35",
      "defenseMax": "50",
      "requiredStrength": "65",
      "durability": "55",
      "requiredLevel": "18"
    },
    "sockets": "2/3/3",
    "qlvl": "24"
  },
  {
    "id": "slayer_guard",
    "name": "Slayer Guard",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "93",
      "defenseMax": "120",
      "requiredStrength": "118",
      "durability": "55",
      "requiredLevel": "40"
    },
    "sockets": "2/3/3",
    "qlvl": "54"
  },
  {
    "id": "guardian_crown",
    "name": "Guardian Crown",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "117",
      "defenseMax": "168",
      "requiredStrength": "196",
      "durability": "55",
      "requiredLevel": "65"
    },
    "sockets": "2/3/3",
    "qlvl": "85"
  },
  {
    "id": "preserved_head",
    "name": "Preserved Head",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "2",
      "defenseMax": "5",
      "requiredStrength": "12",
      "blockChance": "3",
      "durability": "20",
      "requiredLevel": "3"
    },
    "sockets": "2",
    "qlvl": "4"
  },
  {
    "id": "mummified_trophy",
    "name": "Mummified Trophy",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "38",
      "defenseMax": "48",
      "requiredStrength": "38",
      "blockChance": "3",
      "durability": "20",
      "requiredLevel": "24"
    },
    "sockets": "2/3/3",
    "qlvl": "33"
  },
  {
    "id": "minion_skull",
    "name": "Minion Skull",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "95",
      "defenseMax": "139",
      "requiredStrength": "77",
      "blockChance": "3",
      "durability": "20",
      "requiredLevel": "44"
    },
    "sockets": "2/3/3",
    "qlvl": "59"
  },
  {
    "id": "zombie_head",
    "name": "Zombie Head",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "4",
      "defenseMax": "8",
      "requiredStrength": "14",
      "blockChance": "5",
      "durability": "20",
      "requiredLevel": "6"
    },
    "sockets": "2",
    "qlvl": "8"
  },
  {
    "id": "fetish_trophy",
    "name": "Fetish Trophy",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "41",
      "defenseMax": "52",
      "requiredStrength": "41",
      "blockChance": "5",
      "durability": "20",
      "requiredLevel": "29"
    },
    "sockets": "2/3/3",
    "qlvl": "39"
  },
  {
    "id": "hellspawn_skull",
    "name": "Hellspawn Skull",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "96",
      "defenseMax": "141",
      "requiredStrength": "82",
      "blockChance": "5",
      "durability": "20",
      "requiredLevel": "50"
    },
    "sockets": "2/3/3",
    "qlvl": "67"
  },
  {
    "id": "unraveller_head",
    "name": "Unraveller Head",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "6",
      "defenseMax": "10",
      "requiredStrength": "18",
      "blockChance": "8",
      "durability": "20",
      "requiredLevel": "12"
    },
    "sockets": "2",
    "qlvl": "16"
  },
  {
    "id": "sexton_trophy",
    "name": "Sexton Trophy",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "44",
      "defenseMax": "55",
      "requiredStrength": "47",
      "blockChance": "8",
      "durability": "20",
      "requiredLevel": "33"
    },
    "sockets": "2/3/3",
    "qlvl": "45"
  },
  {
    "id": "overseer_skull",
    "name": "Overseer Skull",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "98",
      "defenseMax": "142",
      "requiredStrength": "91",
      "blockChance": "8",
      "durability": "20",
      "requiredLevel": "49"
    },
    "sockets": "2/3/3",
    "qlvl": "66"
  },
  {
    "id": "gargoyle_head",
    "name": "Gargoyle Head",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "10",
      "defenseMax": "16",
      "requiredStrength": "20",
      "blockChance": "10",
      "durability": "20",
      "requiredLevel": "15"
    },
    "sockets": "2",
    "qlvl": "20"
  },
  {
    "id": "cantor_trophy",
    "name": "Cantor Trophy",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "50",
      "defenseMax": "64",
      "requiredStrength": "50",
      "blockChance": "10",
      "durability": "20",
      "requiredLevel": "36"
    },
    "sockets": "2/3/3",
    "qlvl": "49"
  },
  {
    "id": "succubus_skull",
    "name": "Succubus Skull",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "100",
      "defenseMax": "146",
      "requiredStrength": "95",
      "blockChance": "10",
      "durability": "20",
      "requiredLevel": "60"
    },
    "sockets": "2/3/3",
    "qlvl": "81"
  },
  {
    "id": "demon_head",
    "name": "Demon Head",
    "category": "Armor",
    "tier": "Normal",
    "stats": {
      "defenseMin": "15",
      "defenseMax": "20",
      "requiredStrength": "25",
      "blockChance": "12",
      "durability": "20",
      "requiredLevel": "18"
    },
    "sockets": "2",
    "qlvl": "24"
  },
  {
    "id": "hierophant_trophy",
    "name": "Hierophant Trophy",
    "category": "Armor",
    "tier": "Exceptional",
    "stats": {
      "defenseMin": "58",
      "defenseMax": "70",
      "requiredStrength": "58",
      "blockChance": "12",
      "durability": "20",
      "requiredLevel": "40"
    },
    "sockets": "2/3/3",
    "qlvl": "54"
  },
  {
    "id": "bloodlord_skull",
    "name": "Bloodlord Skull",
    "category": "Armor",
    "tier": "Elite",
    "stats": {
      "defenseMin": "103",
      "defenseMax": "148",
      "requiredStrength": "106",
      "blockChance": "12",
      "durability": "20",
      "requiredLevel": "65"
    },
    "sockets": "2/3/3",
    "qlvl": "85"
  },
  {
    "id": "blunt_arrows",
    "name": "Blunt Arrows",
    "category": "Quiver",
    "tier": "Normal",
    "stats": {},
    "sockets": "1"
  },
  {
    "id": "sharp_arrows",
    "name": "Sharp Arrows",
    "category": "Quiver",
    "tier": "Exceptional",
    "stats": {
      "requiredLevel": "25"
    },
    "sockets": "2"
  },
  {
    "id": "razor_arrows",
    "name": "Razor Arrows",
    "category": "Quiver",
    "tier": "Elite",
    "stats": {
      "requiredLevel": "45"
    },
    "sockets": "2"
  },
  {
    "id": "light_bolts",
    "name": "Light Bolts",
    "category": "Quiver",
    "tier": "Normal",
    "stats": {},
    "sockets": "1"
  },
  {
    "id": "heavy_bolts",
    "name": "Heavy Bolts",
    "category": "Quiver",
    "tier": "Exceptional",
    "stats": {
      "requiredLevel": "25"
    },
    "sockets": "2"
  },
  {
    "id": "war_bolts",
    "name": "War Bolts",
    "category": "Quiver",
    "tier": "Elite",
    "stats": {
      "requiredLevel": "45"
    },
    "sockets": "2"
  }
];
