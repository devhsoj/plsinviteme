import { ListFilter } from './list';

export type Region = 'us' | 'eu' | 'tw' | 'kr' | 'cn';
export type Role = 'tank' | 'healer' | 'dps';

export type Rarity = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const RarityColors: Record<Rarity, string> = {
    0: '#9d9d9d',
    1: '#ffffff',
    2: '#1eff00',
    3: '#0070dd',
    4: '#a335ee',
    5: '#ff8000',
    6: '#e6cc80'
};

export const IOColors = {
    [Infinity]: '#ff8000',
    3350: '#ff8000',
    3285: '#fe7e15',
    3265: '#fd7c21',
    3240: '#fc7a2b',
    3215: '#fb7833',
    3190: '#f9763b',
    3165: '#f87441',
    3145: '#f77248',
    3120: '#f5704e',
    3095: '#f46e54',
    3070: '#f36b5a',
    3045: '#f16960',
    3025: '#ef6765',
    3000: '#ee656b',
    2975: '#ec6370',
    2950: '#ea6175',
    2925: '#e95f7b',
    2905: '#e75d80',
    2880: '#e55b85',
    2855: '#e3598b',
    2830: '#e05790',
    2805: '#de5595',
    2785: '#dc539a',
    2760: '#d9519f',
    2735: '#d74fa5',
    2710: '#d44daa',
    2685: '#d24baf',
    2665: '#cf49b4',
    2640: '#cc47b9',
    2615: '#c845bf',
    2590: '#c543c4',
    2565: '#c241c9',
    2545: '#be3fce',
    2520: '#ba3ed4',
    2495: '#b63cd9',
    2470: '#b23ade',
    2445: '#ad38e3',
    2425: '#a837e9',
    2400: '#a335ee',
    2355: '#9f3aed',
    2330: '#9a3fec',
    2305: '#9544eb',
    2285: '#9148eb',
    2260: '#8c4bea',
    2235: '#874fe9',
    2210: '#8252e8',
    2185: '#7c55e7',
    2165: '#7758e6',
    2140: '#715be5',
    2115: '#6b5de5',
    2090: '#6560e4',
    2065: '#5e62e3',
    2045: '#5764e2',
    2020: '#4f67e1',
    1995: '#4769e0',
    1970: '#3d6be0',
    1945: '#316cdf',
    1925: '#216ede',
    1900: '#0070dd',
    1830: '#1973da',
    1805: '#2576d7',
    1780: '#2e79d3',
    1760: '#357cd0',
    1735: '#3b7fcd',
    1710: '#4082ca',
    1685: '#4485c7',
    1660: '#4888c3',
    1640: '#4b8bc0',
    1615: '#4e8ebd',
    1590: '#5192b9',
    1565: '#5395b6',
    1540: '#5698b3',
    1520: '#579baf',
    1495: '#599eac',
    1470: '#5ba1a9',
    1445: '#5ca4a5',
    1420: '#5da8a2',
    1400: '#5eab9e',
    1375: '#5eae9b',
    1350: '#5fb197',
    1325: '#5fb494',
    1300: '#5fb790',
    1280: '#5fbb8c',
    1255: '#5fbe89',
    1230: '#5fc185',
    1205: '#5ec481',
    1180: '#5ec77d',
    1160: '#5dcb79',
    1135: '#5cce75',
    1110: '#5ad171',
    1085: '#59d46c',
    1060: '#57d868',
    1040: '#55db63',
    1015: '#53de5e',
    990: '#50e159',
    965: '#4ee554',
    940: '#4ae84e',
    920: '#47eb48',
    895: '#43ee42',
    870: '#3ef23a',
    845: '#38f532',
    820: '#32f828',
    800: '#29fc1a',
    775: '#1eff00',
    750: '#3dff24',
    725: '#50ff36',
    700: '#5fff44',
    675: '#6dff51',
    650: '#78ff5c',
    625: '#83ff66',
    600: '#8dff70',
    575: '#96ff7a',
    550: '#9fff84',
    525: '#a7ff8d',
    500: '#afff96',
    475: '#b7ff9f',
    450: '#beffa8',
    425: '#c5ffb1',
    400: '#ccffba',
    375: '#d3ffc2',
    350: '#daffcb',
    325: '#e0ffd4',
    300: '#e7ffdc',
    275: '#edffe5',
    250: '#f3ffee',
    225: '#f9fff6',
    200: '#ffffff',
    0: '#ffffff'
};

export const Classes: Record<string, { color: string, specs: string[] }> = {
    'Death Knight': {
        color: '#c41e3a',
        specs: [
            'Unholy',
            'Frost',
            'Blood'
        ]
    },
    'Demon Hunter': {
        color: '#a330c9',
        specs: [
            'Havoc',
            'Vengeance'
        ]
    },
    Druid: {
        color:'#ff7c0a',
        specs: [
            'Balance',
            'Feral',
            'Restoration',
            'Guardian'
        ]
    },
    Evoker: {
        color: '#33937f',
        specs: [
            'Devastation',
            'Preservation'
        ]
    },
    Hunter: {
        color: '#aad372',
        specs: [
            'Marksmanship',
            'Beast Mastery',
            'Survival'
        ]
    },
    Mage: {
        color: '#3fc7eb',
        specs: [
            'Arcane',
            'Frost',
            'Fire'
        ]
    },
    Monk: {
        color: '#00ff98',
        specs: [
            'Brewmaster',
            'Mistweaver',
            'Windwalker'
        ]
    },
    Paladin: {
        color: '#f48cba',
        specs: [
            'Retribution',
            'Holy',
            'Protection'
        ]
    },
    Priest: {
        color: '#ffffff',
        specs: [
            'Shadow',
            'Holy',
            'Disicipline'
        ]
    },
    Rogue: {
        color: '#fff468',
        specs: [
            'Outlaw',
            'Subletly',
            'Assassination'
        ]
    },
    Shaman: {
        color: '#0070d',
        specs: [
            'Enhancement',
            'Elemental',
            'Restoration'
        ]
    },
    Warlock: {
        color: '#8788ee',
        specs: [
            'Destruction',
            'Demonology',
            'Affliction'
        ]
    },
    Warrior: {
        color: '#c69b6d',
        specs: [
            'Arms',
            'Fury',
            'Protection'
        ]
    }
};

export type CharacterSummary = {
    name: string,
    realm: string,
    region: string,
    role: Role,
    class: string,
    spec: string,
    list: ListFilter,
    timestamp: number,
    io: number,
    ilvl: number,
    ilvlColor: string,
    raidSummary: string,
    raiderIoUrl: string,
    warcraftLogsUrl: string
}