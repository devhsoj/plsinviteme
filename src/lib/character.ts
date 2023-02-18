import { CharacterSummary, Classes, IOColors, Region } from '@/types/character';
import { ApiResponse } from '@/backend/types/api';
import { ListFilter } from '@/types/list';

export async function addCharacterToList(
    characterRegion: Region,
    characterRealm: string,
    characterName: string,
    list: ListFilter,
): Promise<ApiResponse<null>> {
    const res = await fetch('/api/character/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            region: characterRegion,
            realm: characterRealm,
            name: characterName,
            list
        })
    });

    const data = await res.json() as ApiResponse<null>;

    return data;
}

export async function getCharacterListings(list: ListFilter) {
    const res = await fetch(`/api/character/list?type=${encodeURIComponent(list)}`);
    const data = await res.json() as ApiResponse<CharacterSummary[]>;

    return data;
}

export function getStylingForSummary(summary: CharacterSummary) {

    const ioEntries = Object.entries(IOColors);

    const classColor = Classes[summary.class]?.color ?? '#ffffff';
    const specIconUri = `/static/images/${summary.spec.toLowerCase()}-${summary.class.replaceAll(' ', '-').toLowerCase()}.webp`;

    let ioColor = '#ffffff';

    for (let i = 0; i < ioEntries.length; i++) {

        if (summary.io > parseInt(ioEntries[i][0]) && summary.io < parseInt(ioEntries[i + 1][0])) {
            ioColor = ioEntries[i][1];
        }

    }

    return {
        ioColor,
        classColor,
        specIconUri
    };

}