import { addCharacterToList, getCharacterListings, getStylingForSummary } from '@/lib/character';
import { CharacterSummary, Region } from '@/types/character';
import { ApiResponse } from '@/backend/types/api';
import { useEffect, useState } from 'react';
import { ListFilter } from '@/types/list';
import Modal from '@/components/Modal';
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
                            Click the {'\''}Advertise{'\''} button and enter your character information, then click the {'\''}Submit{'\''} button to add your character to the public list.
                        </span>
                    </p>
                    <button data-modal-target="advertise-modal" data-modal-toggle="advertise-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/8 m-auto mt-4" type="button">
                            Advertise
                    </button>
                </div>
                <div className="w-full text-center mt-4">
                    <Modal id="advertise-modal" onSubmit={addToList}>
                        <div className="grid grid-cols-1">
                            <div>
                                <div>
                                    <b>Category: </b>
                                </div>
                                <select
                                    className="dark text-white border border-white p-1 w-1/4"
                                    onChange={e => setListFilter(e.currentTarget.value as ListFilter)}
                                    defaultValue="M+"
                                >
                                    <option selected defaultValue="M+" value="M+">M+</option>
                                    <option defaultValue="Raiding" value="Raiding">Raiding</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <b>Region: </b>
                                </div>
                                <select
                                    className="dark text-white border border-white p-1 w-1/4"
                                    onChange={e => setCharacterRegion(e.currentTarget.value as Region)}
                                >
                                    <option selected>us</option>
                                    <option>eu</option>
                                    <option>tw</option>
                                    <option>kr</option>
                                    <option>cn</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div>
                                <div>
                                    <b>Character: </b>
                                </div>
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
                            </div>
                        </div>
                        <div>
                            {characterApiResponse ? (
                                <span className={characterApiResponse.success ? 'text-white' : 'text-red-500'}>
                                    <i>{characterApiResponse.message}</i>
                                </span>
                            ) : ''}
                        </div>
                    </Modal>
                    <div className="grid md:grid-cols-3 space-x-4 sm:grid-rows-1">
                        {
                            listings.map(listing => (
                                <div key={listing.name} className="p-4 overflow-auto">
                                    <div className="mb-1">
                                        <Image
                                            className="inline mr-2"
                                            src={getStylingForSummary(listing).specIconUri}
                                            alt={listing.spec}
                                            width={24}
                                            height={24}
                                        />
                                        <span
                                            className="hover hover:underline hover:cursor-pointer text-lg"
                                            style={{ color: getStylingForSummary(listing).classColor }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(listing.name + '-' + listing.realm);
                                            }}
                                        >

                                            {listing.name}-{listing.realm}
                                        </span>
                                    </div>
                                    <hr className="border border-slate-800 w-1/4 m-auto " />
                                    <div className="mb-1">
                                        <b>Item Level: </b>
                                        <span style={{ color: listing.ilvlColor }}>{listing.ilvl}</span>
                                    </div>
                                    <div className="mb-1">
                                        <b>Mythic+ Rating: </b>
                                        <span style={{ color: getStylingForSummary(listing).ioColor }}>{listing.io}</span>
                                    </div>
                                    <div className="mb-4">
                                        <b>Raid Experience: </b>
                                        <span>{listing.raidSummary}</span>
                                    </div>
                                    <div className="mb-1">
                                        <div className="font-bold">
                                            Raider.io Profile
                                        </div>
                                        <a className="underline text-blue-400" href={listing.raiderIoUrl}>{listing.raiderIoUrl}</a>
                                    </div>
                                    <div className="mb-1">
                                        <div className="font-bold">
                                            WarcraftLogs Profile
                                        </div>
                                        <a className="underline text-blue-400" href={listing.warcraftLogsUrl}>{listing.warcraftLogsUrl}</a>
                                    </div>
                                    <hr className="mt-4 border border-slate-600" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}