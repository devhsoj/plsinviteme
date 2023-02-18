export type RaiderIoData = {
    name:               string;
    race:               string;
    class:              string;
    active_spec_name:   string;
    active_spec_role:   string;
    gender:             string;
    faction:            string;
    achievement_points: number;
    honorable_kills:    number;
    thumbnail_url:      string;
    region:             string;
    realm:              string;
    last_crawled_at:    Date;
    profile_url:        string;
    profile_banner:     string;
    mythic_plus_scores: MythicPlusScores;
    gear:               Gear;
    raid_progression:   RaidProgression;
}

export type Gear = {
    updated_at:          Date;
    item_level_equipped: number;
    item_level_total:    number;
    artifact_traits:     number;
    corruption:          GearCorruption;
    items:               { [key: string]: Item };
}

export type GearCorruption = {
    added:     number;
    resisted:  number;
    total:     number;
    cloakRank: number;
    spells:    any[];
}

export type Item = {
    item_id:           number;
    item_level:        number;
    enchant?:          number;
    icon:              string;
    name:              string;
    item_quality:      number;
    is_legendary:      boolean;
    is_azerite_armor:  boolean;
    azerite_powers:    Array<AzeritePower | null>;
    corruption:        ItemCorruption;
    domination_shards: any[];
    gems:              number[];
    bonuses:           number[];
    tier?:             string;
}

export type AzeritePower = {
    id:    number;
    spell: Spell;
    tier:  number;
}

export type Spell = {
    id:     number;
    school: number;
    icon:   Icon;
    name:   Name;
    rank:   null;
}

export type Icon = string;

export type Name = string;

export type ItemCorruption = {
    added:    number;
    resisted: number;
    total:    number;
}

export type MythicPlusScores = {
    all:    number;
    dps:    number;
    healer: number;
    tank:   number;
    spec_0: number;
    spec_1: number;
    spec_2: number;
    spec_3: number;
}

export type RaidProgression = {
    [key: string]: RaidProgressionSummary;
}

export type RaidProgressionSummary = {
    summary:              string;
    total_bosses:         number;
    normal_bosses_killed: number;
    heroic_bosses_killed: number;
    mythic_bosses_killed: number;
}