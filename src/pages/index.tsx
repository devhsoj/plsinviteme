import { addCharacterToList, getCharacterListings, getStylingForSummary } from '@/lib/character';
import { CharacterSummary, Region } from '@/types/character';
import { ApiResponse } from '@/backend/types/api';
import { useEffect, useState } from 'react';
import { ListFilter } from '@/types/list';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {

    const [ characterName, setCharacterName ] = useState('');
    const [ characterRealm, setCharacterRealm ] = useState('');
    const [ characterRegion, setCharacterRegion ] = useState<Region>('us');
    const [ listings, setListings ] = useState<CharacterSummary[]>([]);
    const [ listFilter, setListFilter ] = useState<ListFilter>('M+');

    const [ characterApiResponse, setCharacterApiResponse ] = useState<ApiResponse<any>>();

    useEffect(() => { reloadList(); }, [listFilter]);
    useEffect(() => {

        const interval = setInterval(() => reloadList(), 5000);

        return () => clearInterval(interval);

    }, []);

    async function reloadList() {
        getCharacterListings(listFilter)
            .then(result => {
                if (!result.success) {
                    return setCharacterApiResponse(result);
                }

                setListings(result.data!);
            })
            .catch(err => console.error(err));
    }

    async function addToList() {
        setCharacterApiResponse({ success: true });

        const response = await addCharacterToList(characterRegion, characterRealm, characterName, listFilter);

        setCharacterApiResponse(response);
        reloadList();
    }

    const now = Date.now();

    return (
        <>
            <Head>
                <title>pls invite me!</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="dark w-auto h-auto m-auto p-4">
                <div className="text-center">
                    <h1 className="text-3xl">pls invite me!</h1>
                    <hr className="border border-white w-64 m-auto mt-2 mb-2" />
                    <p>
                        An <i>actual</i> place to find people to play with on World of Warcraft.<br />
                        No login, no stale data, no bullshit, just quickly find players to invite and play with!<br />
                        <span className="text-xs text-gray-500">
                            Enter your character information below and click the {'\''}Add{'\''} button to add yourself<br />
                            to the public list for people to find you.
                        </span>
                    </p>
                </div>
                <div className="w-full text-center mt-4">
                    <div className="grid content-center p-1">
                        <div>
                            <div className="mr-2">
                                <div>
                                    <select
                                        className="dark text-white border border-white p-1 mr-2"
                                        onChange={e => setListFilter(e.currentTarget.value as ListFilter)}
                                        defaultValue="M+"
                                    >
                                        <option selected defaultValue="M+" value="M+">M+</option>
                                        <option defaultValue="Raiding" value="Raiding">Raiding</option>
                                    </select>
                                    <select
                                        className="dark text-white border border-white p-1 mr-2"
                                        onChange={e => setCharacterRegion(e.currentTarget.value as Region)}
                                    >
                                        <option selected>us</option>
                                        <option>eu</option>
                                        <option>tw</option>
                                        <option>kr</option>
                                        <option>cn</option>
                                    </select>
                                    <input
                                        className="bg-black color-white border border-white p-2 h-8 mr-2 w-20"
                                        placeholder="Name"
                                        value={characterName}
                                        defaultValue={characterName}
                                        onChange={e => setCharacterName(e.currentTarget.value)}
                                    />
                                    <input
                                        className="bg-black color-white border border-white p-2 h-8 mr-2 w-32"
                                        placeholder="Realm"
                                        value={characterRealm}
                                        defaultValue={characterRealm}
                                        onChange={e => setCharacterRealm(e.currentTarget.value)}
                                    />
                                    <button
                                        className="w-16 bg-black color-white border border-white h-8"
                                        onClick={addToList}
                                    >
                                    Add
                                    </button>
                                </div>
                                <div>
                                    {characterApiResponse ? (
                                        <span className={characterApiResponse.success ? 'text-white' : 'text-red-500'}>
                                            <i>{characterApiResponse.message}</i>
                                        </span>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                        <table className="mt-4">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Item Level</th>
                                    <th>Mythic+ Rating</th>
                                    <th>Raid Experience</th>
                                    <th>Character</th>
                                    <th>Raider.io Profile</th>
                                    <th>Warcraft Logs Profile</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listings.map(listing => (
                                        <tr key={listing.name}>
                                            <th>
                                                <Image
                                                    src={getStylingForSummary(listing).specIconUri}
                                                    alt={listing.spec}
                                                    width={24}
                                                    height={24}
                                                />
                                            </th>
                                            <td style={{ color: listing.ilvlColor }}>{listing.ilvl}</td>
                                            <td style={{ color: getStylingForSummary(listing).ioColor }}>{listing.io}</td>
                                            <td>{listing.raidSummary}</td>
                                            <td className="grid place-items-center">
                                                <span
                                                    className="hover hover:underline hover:cursor-pointer"
                                                    style={{ color: getStylingForSummary(listing).classColor }}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(listing.name + '-' + listing.realm);
                                                    }}
                                                >
                                                    {listing.name}-{listing.realm}
                                                </span>
                                            </td>
                                            <td><a className="underline text-blue-400" href={listing.raiderIoUrl}>{listing.raiderIoUrl}</a></td>
                                            <td><a className="underline text-blue-400" href={listing.warcraftLogsUrl}>{listing.warcraftLogsUrl}</a></td>
                                            <td className="text-gray-500">
                                                {Math.floor((now - listing.timestamp) / 1000 / 60)} m ago
                                                (expires in {30 - Math.floor((now - listing.timestamp) / 1000 / 60)} m)
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}