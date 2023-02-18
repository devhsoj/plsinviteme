import { CharacterSummary, Rarity, RarityColors, Role } from '@/types/character';
import { CharacterAddRequest } from '@/pages/api/character/add';
import { RaiderIoData } from '../types/raider.io';
import { ApiResponse } from '../types/api';

export async function getRaiderIOSummary(character: CharacterAddRequest): Promise<ApiResponse<CharacterSummary>> {
    const res = await fetch(`https://raider.io/api/v1/characters/profile?region=${character.region}&realm=${character.realm}&name=${character.name}&fields=gear%2Cmythic_plus_scores%2Craid_progression`);

    if (res.status !== 200) {

        const data = await res.json();

        return {
            success: false,
            message: data?.message ? data.message : 'Failed to reach Raider.io!'
        };
    }

    const data = await res.json() as RaiderIoData;
    const ilvlColor = RarityColors[Object.values(data.gear.items)
        .map(item => item.item_quality)
        .sort((a,b) => a - b)[0] as Rarity];

    return {
        success: true,
        data: {
            role: data.active_spec_role.toLowerCase() as Role,
            list: character.list,
            timestamp: Date.now(),
            io: data.mythic_plus_scores.all,
            ilvl: data.gear.item_level_equipped,
            ilvlColor,
            raidSummary: Object.values(data.raid_progression)[0]?.summary ?? 'No Raid Data!',
            raiderIoUrl: data.profile_url,
            warcraftLogsUrl: `https://www.warcraftlogs.com/character/${character.region}/${character.realm}/${character.name}`.toLowerCase(),
            characterNameSummary: `(${character.region}) ${character.name}-${character.realm}`
        }
    };
}