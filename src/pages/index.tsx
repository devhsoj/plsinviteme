import { addCharacterToList, getCharacterListings, getStylingForSummary } from '@/lib/character';
import { CharacterSummary, Classes, Region } from '@/types/character';
import { ApiResponse } from '@/backend/types/api';
import { useEffect, useState } from 'react';
import { ListFilter } from '@/types/list';
import Modal from '@/components/Modal';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Icon = dynamic(() => import('@/components/Icon'), { ssr: false });

export default function Home() {

    const [ characterName, setCharacterName ] = useState('');
    const [ characterRealm, setCharacterRealm ] = useState('');
    const [ characterRegion, setCharacterRegion ] = useState<Region>('us');
    const [ listings, setListings ] = useState<CharacterSummary[]>([]);
    const [ filteredListings, setFilteredListings ] = useState<CharacterSummary[]>([]);
    const [ listFilter, setListFilter ] = useState<ListFilter>('M+');
    const [ classFilter, setClassFilter ] = useState('');

    const [ characterApiResponse, setCharacterApiResponse ] = useState<ApiResponse<any>>();

    useEffect(() => { reloadList(); }, [listFilter]);
    useEffect(() => { setFilteredListings(listings); }, [listings]);

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
                    <div>
                        <button data-modal-target="advertise-modal" data-modal-toggle="advertise-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-auto m-auto mt-4" type="button">
                            Advertise
                        </button>
                    </div>
                    <div className="mt-4">
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
                            onChange={e => setFilteredListings(listings.filter(listing => listing.role.includes(e.target.value)))}
                            defaultValue={0}
                        >
                            <option selected defaultValue="" value="">Role</option>
                            <option className="text-amber-500" defaultValue="tank" value="tank">
                                Tank
                            </option>
                            <option className="text-lime-500" defaultValue="heal" value="heal">
                                Healer
                            </option>
                            <option className="text-red-500" defaultValue="dps" value="dps">
                                DPS
                            </option>
                        </select>
                        <select
                            className="dark text-white border border-white p-1 mr-2"
                            onChange={e => {
                                setFilteredListings(listings.filter(listing => listing.class.includes(e.target.value)));
                                setClassFilter(e.target.value);
                            }}
                            defaultValue={0}
                        >
                            <option selected defaultValue="" value="">Class</option>
                            {
                                Object.keys(Classes).map((class_, i) => (
                                    <option
                                        key={class_}
                                        defaultValue={class_}
                                        value={class_}
                                        style={{ color: Object.values(Classes)[i].color }}
                                    >
                                        {class_}
                                    </option>
                                ))
                            }
                        </select>
                        {
                            classFilter ? (
                                <select
                                    className="dark text-white border border-white p-1 mr-2"
                                    onChange={e => {
                                        setFilteredListings(listings.filter(
                                            listing => listing.spec.includes(e.target.value) && listing.class.includes(classFilter)
                                        ));
                                    }}
                                    defaultValue={0}
                                >
                                    <option selected defaultValue="" value="">Specialization</option>
                                    {
                                        Classes[classFilter].specs.map(spec => (
                                            <option
                                                key={spec}
                                                defaultValue={spec}
                                                value={spec}
                                                style={{ color: Classes[classFilter]?.color ?? '#ffffff' }}
                                            >
                                                {spec}
                                            </option>
                                        ))
                                    }
                                </select>
                            ) : ''
                        }
                        <select
                            className="dark text-white border border-white p-1 mr-2"
                            onChange={e => setFilteredListings(listings.filter(listing => listing.ilvl > parseInt(e.target.value ?? '0')))}
                            defaultValue={0}
                        >
                            <option selected defaultValue={0} value={0}>Minimum iLvl</option>
                            <option style={{ color: '#a335ee' }} defaultValue={415} value={415}>415+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={410} value={410}>410+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={400} value={400}>400+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={395} value={395}>395+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={390} value={390}>390+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={385} value={385}>385+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={380} value={380}>380+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={375} value={375}>375+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={370} value={370}>370+</option>
                            <option style={{ color: '#a335ee' }} defaultValue={360} value={360}>360+</option>
                            <option style={{ color: '#1eff00' }} defaultValue={350} value={350}>350+</option>
                            <option style={{ color: '#1eff00' }} defaultValue={340} value={340}>340+</option>
                            <option style={{ color: '#ffffff' }} defaultValue={340} value={340}>330+</option>
                        </select>
                        <select
                            className="dark text-white border border-white p-1"
                            onChange={e => setFilteredListings(listings.filter(listing => listing.io > parseInt(e.target.value ?? '0')))}
                            defaultValue={0}
                        >
                            <option selected defaultValue={0} value={0}>Minimum Rating</option>
                            <option style={{ color: '#ff8000' }} defaultValue={3350} value={3350}>3350+</option>
                            <option style={{ color: '#f9763b' }} defaultValue={3190} value={3190}>3190+</option>
                            <option style={{ color: '#f36b5a' }} defaultValue={3070} value={3070}>3070+</option>
                            <option style={{ color: '#ea6175' }} defaultValue={2950} value={2950}>2950+</option>
                            <option style={{ color: '#e05790' }} defaultValue={2830} value={2830}>2830+</option>
                            <option style={{ color: '#d44daa' }} defaultValue={2710} value={2710}>2710+</option>
                            <option style={{ color: '#c543c4' }} defaultValue={2590} value={2590}>2590+</option>
                            <option style={{ color: '#b23ade' }} defaultValue={2470} value={2470}>2470+</option>
                            <option style={{ color: '#9a3fec' }} defaultValue={2330} value={2330}>2330+</option>
                            <option style={{ color: '#8252e8' }} defaultValue={2210} value={2210}>2210+</option>
                            <option style={{ color: '#6560e4' }} defaultValue={2090} value={2090}>2090+</option>
                            <option style={{ color: '#3d6be0' }} defaultValue={1970} value={1970}>1970+</option>
                            <option style={{ color: '#2576d7' }} defaultValue={1805} value={1805}>1805+</option>
                            <option style={{ color: '#4485c7' }} defaultValue={1685} value={1685}>1685+</option>
                            <option style={{ color: '#5395b6' }} defaultValue={1565} value={1565}>1565+</option>
                            <option style={{ color: '#5ca4a5' }} defaultValue={1445} value={1445}>1445+</option>
                            <option style={{ color: '#5fb494' }} defaultValue={1325} value={1325}>1325+</option>
                            <option style={{ color: '#5ec481' }} defaultValue={1205} value={1205}>1205+</option>
                            <option style={{ color: '#59d46c' }} defaultValue={1085} value={1085}>1085+</option>
                            <option style={{ color: '#4ee554' }} defaultValue={965} value={965}>965+</option>
                            <option style={{ color: '#38f532' }} defaultValue={845} value={845}>845+</option>
                            <option style={{ color: '#50ff36' }} defaultValue={725} value={725}>725+</option>
                            <option style={{ color: '#8dff70' }} defaultValue={600} value={600}>600+</option>
                            <option style={{ color: '#b7ff9f' }} defaultValue={475} value={475}>475+</option>
                            <option style={{ color: '#daffcb' }} defaultValue={350} value={350}>350+</option>
                            <option style={{ color: '#f9fff6' }} defaultValue={225} value={225}>225+</option>
                            <option style={{ color: '#ffffff' }} defaultValue={200} value={200}>200+</option>
                        </select>
                    </div>
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
                            filteredListings.map(listing => (
                                <div key={listing.name} className="p-4 overflow-auto">
                                    <div className="mb-1">
                                        <Icon
                                            className="inline mr-2"
                                            src={getStylingForSummary(listing).specIconUri}
                                            alt={listing.spec}
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
                                    <div className="text-gray-500 mt-2 mb-2 text-sm">
                                        {Math.floor((now - listing.timestamp) / 1000 / 60)} m ago
                                        (expires in {30 - Math.floor((now - listing.timestamp) / 1000 / 60)} m)
                                    </div>
                                    <hr className="mt-4 border border-slate-700" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}