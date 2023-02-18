import { CharacterSummary, Region } from '@/types/character';
import { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '@/backend/utils/redis';
import { ListFilter } from '@/types/list';

export type CharacterAddRequest = {
    region: Region,
    realm: string,
    name: string,
    list: ListFilter
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const list = req.query.list as string;

    if (!['M+', 'Raiding'].includes(list)) {
        return res.send({
            success: false,
            message: 'Invalid List'
        });
    }

    const keys = await redis.keys(list + '*');
    const listings = [] as CharacterSummary[];

    for (const key of keys) {
        const listing = await redis.get(key);

        if (!listing) continue;

        listings.push(JSON.parse(listing) as CharacterSummary);
    }

    return res.send({
        success: true,
        data: listings
    });
};