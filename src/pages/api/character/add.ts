import { getRaiderIOSummary } from '@/backend/lib/raider.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '@/backend/utils/redis';
import { Region } from '@/types/character';
import { ListFilter } from '@/types/list';

export type CharacterAddRequest = {
    region: Region,
    realm: string,
    name: string,
    list: ListFilter
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body as CharacterAddRequest;

    if (
        !body?.list
        || !['M+', 'Raiding'].includes(body?.list)
        || !body?.region
        || !body?.realm
        || !body?.name
    ) {
        return res.send({
            success: false,
            message: 'Invalid Submission'
        });
    }

    const summary = await getRaiderIOSummary(body);

    if (summary.success) {
        const listing = await redis.get(`${body.list}*${req.socket.remoteAddress}`);
        const char = await redis.get(`${body.list}-${body.region}-${body.name}-${body.realm}`);

        if (listing || char) {
            return res.send({
                success: false,
                message: 'You already have a character listed!'
            });
        }

        await redis.setex(
            `${body.list}*${req.socket.remoteAddress!}`,
            60 * 30, // 30m expiration
            JSON.stringify(summary.data!)
        );

        await redis.setex(
            `${body.list}-${body.region}-${body.name}-${body.realm}`,
            60 * 30, // 30m expiration
            ''
        );
    }

    return res.send(summary);
};