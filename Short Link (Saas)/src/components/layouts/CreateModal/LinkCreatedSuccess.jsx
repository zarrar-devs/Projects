import { motion } from "framer-motion";
import { IoCheckmark, IoCopyOutline, IoOpenOutline, IoAddOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci"
import { TiTickOutline } from "react-icons/ti";
import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";


export function LinkCreatedSuccess({ link, onCreateAnother }) {

    const formattedDate = link.expires_at ? formatDate(link.expires_at) : null

    const [isLinkCopied, setIsLinkCopied] = useState(false)
    const shortLink = `${window.location.origin}/${link?.custom_alias}`

    const handleCopyLink = async (lnk) => {
        try {
            await navigator.clipboard.writeText(lnk)
            setIsLinkCopied(true)
            return setTimeout(() => {
                setIsLinkCopied(false)
            }, 2000);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="custom-scrollbar rounded-md border w-[280px] xs:w-[320px] sm:w-auto max-w-[800px] z-[10000000000000] max-h-[350px] overflow-y-auto border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
        >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                <IoCheckmark className="text-3xl text-green-400" />
            </div>

            <h2 className="mt-5 text-center font-[Manrope] text-2xl font-semibold text-white">
                Link Created Successfully
            </h2>

            <p className="mt-2 text-center text-sm font-[Manrope] text-zinc-400">
                Your short link is ready to share.
            </p>

            <div className="mt-7 rounded-md border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between gap-1">
                    <span className="truncate font-[Manrope] text-sm text-white">
                        {shortLink}
                    </span>
                    <button
                        onClick={() => handleCopyLink(shortLink)}
                        className="cursor-pointer text-zinc-400 transition hover:scale-110 transition-all duration-300"
                    >
                        {
                            isLinkCopied ? <TiTickOutline /> : (
                                <IoCopyOutline size={18} />
                            )
                        }
                    </button>
                </div>
            </div>

            <div className="mt-4 flex gap-3">
                <button
                    className="flex-1 cursor-pointer font-[Manrope] flex items-center justify-center gap-2 rounded-sm bg-white py-2 font-medium text-black transition hover:bg-zinc-200"
                >
                    <CiEdit size={20} />
                    <span>Edit</span>
                </button>

                <button
                    onClick={() => window.open(shortLink, '_blank')}
                    className="flex items-center cursor-pointer font-[Manrope] justify-center gap-2 rounded-sm border border-zinc-700 px-5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                    <IoOpenOutline />
                    Visit
                </button>
            </div>

            <div className="my-6 border-t border-zinc-800" />

            <div className="grid grid-cols-2 font-[Manrope] gap-x-6 gap-y-5 text-sm">
                <div>
                    <p className="text-zinc-500">Original URL</p>
                    <p className="mt-1 truncate text-white">
                        {link?.original_url}
                    </p>
                </div>

                <div>
                    <p className="text-zinc-500">Alias</p>
                    <p className="mt-1 text-white">
                        {link?.custom_alias || "Auto Generated"}
                    </p>
                </div>

                <div>
                    <p className="text-zinc-500">Visibility</p>
                    <p className="mt-1 text-white">
                        {link?.visibility ? "Public" : "Private"}
                    </p>
                </div>

                <div>
                    <p className="text-zinc-500">Expires</p>
                    <p className="mt-1 text-white">
                        {formattedDate ? formattedDate : 'Never'}
                    </p>
                </div>

                <div>
                    <p className="text-zinc-500">Click Limit</p>
                    <p className="mt-1 text-white">
                        {link.one_time_use ? link.click_limit : "Unlimited"}
                    </p>
                </div>
            </div>

            <button
                onClick={onCreateAnother}
                className="mt-8 flex w-full font-[Manrope] cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
                <IoAddOutline size={20} />
                Create Another Link
            </button>
        </motion.div>
    );
}