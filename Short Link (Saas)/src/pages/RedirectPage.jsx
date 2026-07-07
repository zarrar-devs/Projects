import { useParams } from "react-router"
import { LinkService } from "../Appwrite/links/links";
import { useEffect, useState } from "react";
import { Loading } from "../components/common/Loading/Loading";
import { Input } from "../components/common/Input/Input";
import { FcLock, FcCancel, FcExpired } from "react-icons/fc";

export function RedirectPage() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [passwordRequired, setPassRequired] = useState(false)
    const [passwordError, setPasswordError] = useState(null)


    const [isLinkExpired, setLinkExpiry] = useState(false)
    const [isLinkActive, setIsLinkActive] = useState(true)
    const [password, setPassword] = useState('')
    const [linkData, setLinkData] = useState(null)

    const { alias } = useParams()
    const linkService = new LinkService();


    function isLinkRedirectable(lnk) {
        if (!lnk.is_active) {
            setIsLinkActive(false)
            return false
        }

        if (lnk.one_time_use) {
            if (lnk.current_clicks >= lnk.click_limit) {
                setLinkExpiry(true)
                return false
            }
        }

        if (lnk.expires_at) {
            if (lnk.expires_at <= Date.now()) {
                setLinkExpiry(true)
                return false
            }
        }

        if (lnk.password_protected) {
            setPassRequired(true)
            return false
        }

        return true
    }

    async function redirectToLink(lnk) {
        try {
            const data = {
                current_clicks: lnk.current_clicks + 1,
            };

            await linkService.updateLink(lnk.$id, data);
            window.location.replace(lnk.original_url);

        } catch (err) {
            console.log(err);
            setError("Unable to access this link.");
        }
    }

    async function handleAccess() {
        if (password !== linkData.password_hash) {
            return setPasswordError("Invalid Password.");
        }

        redirectToLink(linkData)

    }

    useEffect(() => {
        setLoading(true);

        (async function () {
            try {
                const linkStatus = await linkService.searchAlias({ alias })
                const linkObj = linkStatus.rows[0]
                setLinkData(linkObj)

                if (linkStatus.total === 0) {
                    return setError('This link is not created yet.')
                }



                const canRedirect = isLinkRedirectable(linkObj)
                if (!canRedirect) return

                redirectToLink(linkData)

            } catch {
                setError('An error occured.')
            } finally {
                setLoading(false);
            }

        })()

    }, [alias])

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">

            {loading && (
                <div className="flex flex-col items-center gap-5 rounded-xl border border-zinc-800 bg-zinc-900 px-10 py-8 shadow-2xl">
                    <Loading color="#fff" size="24px" />
                    <p className="font-[Manrope] text-zinc-300">
                        Redirecting...
                    </p>
                </div>
            )}


            {error && (
                <div className="w-full max-w-md rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-center">
                    <h2 className="font-[Manrope] text-xl font-semibold text-red-400">
                        Something went wrong
                    </h2>

                    <p className="mt-3 font-[Inter] text-sm text-zinc-400">
                        {error}
                    </p>
                </div>
            )}


            {passwordRequired && (
                <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
                        <FcLock size={20} />
                    </div>

                    <h2 className="text-center font-[Manrope] text-2xl font-semibold text-white">
                        Password Protected
                    </h2>

                    <p className="mt-2 text-center font-[Inter] text-sm text-zinc-400">
                        This link is protected. Enter the password to continue.
                    </p>

                    <div className="mt-7">
                        <Input
                            type="password"
                            value={password}
                            label="Password"
                            labelClasses="text-zinc-300 font-[Inter]"
                            className="w-full h-11 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-white outline-none transition focus:border-zinc-500"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(null);
                            }}
                        />
                    </div>

                    {passwordError && (
                        <p className="mt-3 text-sm font-[Inter] text-red-400">
                            {passwordError}
                        </p>
                    )}

                    <button
                        onClick={handleAccess}
                        className="mt-6 w-full cursor-pointer rounded-md bg-white py-3 font-[Manrope] font-semibold text-black transition hover:bg-zinc-200"
                    >
                        Access Link
                    </button>
                </div>
            )}

            {!isLinkActive && (
                <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                        <FcCancel size={20} />
                    </div>

                    <h2 className="font-[Manrope] text-2xl font-semibold text-white">
                        Link Disabled
                    </h2>

                    <p className="mt-3 font-[Inter] text-sm text-zinc-400">
                        This link has been disabled by its owner.
                    </p>

                    <button
                        onClick={() => history.back()}
                        className="mt-6 rounded-md border border-zinc-700 px-6 py-3 font-[Manrope] text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                        Go Back
                    </button>

                </div>
            )}


            {isLinkExpired && (
                <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
                        <FcExpired size={20} />
                    </div>

                    <h2 className="font-[Manrope] text-2xl font-semibold text-white">
                        Link Expired
                    </h2>

                    <p className="mt-3 font-[Inter] text-sm text-zinc-400">
                        This link has expired or reached its click limit.
                    </p>

                    <button
                        onClick={() => history.back()}
                        className="mt-6 rounded-md border border-zinc-700 px-6 py-3 font-[Manrope] text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                        Go Back
                    </button>

                </div>
            )}

        </div>
    )
}
