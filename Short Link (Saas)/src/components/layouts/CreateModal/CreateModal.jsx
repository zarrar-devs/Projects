import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { TagInput } from "../../common/TagInput/TagInput";
import { SettingToggle } from "../../common/SettingToggle/SettingToggle";
import { TbLockPassword, TbClockPlay, TbClick } from "react-icons/tb";
import { PiCursorClickDuotone } from "react-icons/pi";
import { HelpHover } from "../../common/HelpHover/HelpHover";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { LinkService } from "../../../Appwrite/links/links";
import { useSelector } from "react-redux";
import { LinkCreatedSuccess } from "./LinkCreatedSuccess";
import { isValidUrl } from "../../../utils/urlValidation";
import { formatDate } from "../../../utils/formatDate";
import { Loading } from "../../common/Loading/Loading";
import { FaWandMagicSparkles } from "react-icons/fa6";















function CreateModal({ setShowCreateModal }) {


  const initialForm = {
    title: '',
    customAlias: '',
    visibility: true,
    url: '',
    tags: [],
    password: '',
    passwordProtected: false,
    clickLimitEnabled: false,
    clicks: 1,
    isActive: true,
    expiresAt: '',
  }

  const [inputFields, setInputFields] = useState({
    title: '',
    customAlias: '',
    visibility: true,
    url: '',
    tags: [],
    password: '',
    passwordProtected: false,
    clickLimitEnabled: false,
    clicks: 1,
    isActive: true,
    expiresAt: '',
  })

  const [urlError, setUrlError] = useState(null)

  const [step, setStep] = useState(1)
  const [passwordError, setPasswordError] = useState(null)
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  const [isClickLimitSet, setIsClickLimitSet] = useState(false);
  const [clickLimitError, setClickLimitError] = useState(null)

  const [isExpirySet, setIsExpirySet] = useState(false)
  const [expiryDateError, setExpiryDateError] = useState(false)
  const today = new Date().toISOString().split('T')[0]
  const [formattedExpiryDate, setFormattedExpiryDate] = useState("");

  const dbCallId = useRef(null)
  const [aliasStatus, setAliasStatus] = useState({
    status: 'idle',
    message: '',
  })

  const [LinkCreationError, setLinkError] = useState(null)
  const [createdLink, setCreatedLink] = useState(null);
  const [LinkCreationLoading, setLinkLoading] = useState(false)
  const linkService = new LinkService()

  const userInfo = useSelector(state => state.authSlice.userInfo);



  const STEPS = {
    1: {
      title: "Create New Link",
      description:
        "Enter the destination URL and customize your short link.",
    },

    2: {
      title: "Advanced Settings",
      description:
        "Secure and control your link with passwords, expiration rules, and usage limits.",
    },

    3: {
      title: "Review & Create",
      description:
        "Review all settings and create your link.",
    },
  };


  const handleSetPassword = () => {
    if (!inputFields.password.trim()) {
      return setPasswordError('Please enter a valid password.')
    }

    if (!inputFields.password) return setPasswordError('Please enter a password.')

    if (inputFields.password.includes(" ")) {
      return setPasswordError("Password cannot contain spaces.");
    }

    if (inputFields.password.length > 20) {
      return setPasswordError("Password is too long.");
    }

    setIsPasswordSet(true)


  }

  const handleSetClickLimit = () => {
    if (inputFields.clicks <= 0) {
      return setClickLimitError('The minimum click limit is 1. Turn this option off for unlimited access.')
    }

    setIsClickLimitSet(true)

  }


  function handleSetExpiryDate() {
    if (!inputFields.expiresAt) return setExpiryDateError('Please set an expiry date.')

    const formattedDate = formatDate(inputFields.expiresAt)

    setFormattedExpiryDate(formattedDate)
    setIsExpirySet(true)
  }

  function onCreateAnother() {
    setCreatedLink(null)
    setShowCreateModal(true)
  }


  async function handleCreateLink() {
    if (!inputFields.title) return setLinkError('Please add a title before continuing.')
    if (inputFields.passwordProtected && !inputFields.password) return setLinkError('Password protection is enabled, but no password has been provided.')
    if (inputFields.clickLimitEnabled && inputFields.clicks <= 0) return setLinkError('Click limit is enabled, but it must have a valid value greater than 0.')
    setLinkLoading(true)

    const formattedUrl = inputFields.url.startsWith("http://") || inputFields.url.startsWith("https://")
      ? inputFields.url
      : `https://${inputFields.url}`;


    const tagNames = inputFields.tags?.map(t => t.tag)
    const expiresAtMiliSeconds = inputFields.expiresAt ?
      new Date(inputFields.expiresAt).getTime() : null;


    try {
      const link = await linkService.createLink({
        title: inputFields.title,
        userId: userInfo.$id,
        customAlias: inputFields.customAlias,
        isActive: inputFields.isActive,
        url: formattedUrl,
        clickLimitEnabled: inputFields.clickLimitEnabled,
        clicks: inputFields.clicks,
        expiresAt: expiresAtMiliSeconds,
        passwordProtected: inputFields.passwordProtected,
        password: inputFields.password,
        visibility: inputFields.visibility,
        tags: tagNames,
      })

      if (link) {
        setStep(1)
        setInputFields(initialForm)
        setLinkError(null)
        return setCreatedLink(link)
      }



    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 400:
          setLinkError("The information you entered is invalid.");
          break;

        case 401:
          setLinkError("Please log in to create a link.");
          break;

        case 403:
          setLinkError("You don't have permission to create links.");
          break;

        case 404:
          setLinkError("Database or table not found.");
          break;

        case 409:
          setLinkError("This custom alias is already taken.");
          break;

        case 429:
          setLinkError("Too many requests. Please try again in a moment.");
          break;

        case 500:
          setLinkError("Something went wrong on the server. Please try again.");
          break;

        default:
          setLinkError("An unexpected error occurred.");
      }
    } finally {
      setLinkLoading(false)
    }
  }

  function handleNextStep() {
    if (!isValidUrl(inputFields.url)) return setUrlError('Invalid URL.')
    if (aliasStatus.status === 'taken' || aliasStatus.status === 'error') return;

    setStep(2)
  }

  function handleSuggestAlias() {
    if (!inputFields.customAlias) return;

    const random = Math.floor(Math.random() * 9999)

    const suggestion = inputFields.customAlias + random

    setInputFields(prev => ({
      ...prev,
      customAlias: suggestion,
    }))
  }

  useEffect(() => {
    const aliasRegex = /^[a-zA-Z0-9_-]+$/;
    if (!inputFields.customAlias) {
      clearTimeout(dbCallId.current)
      return setAliasStatus({
        status: 'idle',
        message: '',
      })
    }

    if (!inputFields.customAlias) return setAliasStatus({
      status: 'idle',
      message: '',
    })
    if (!aliasRegex.test(inputFields.customAlias)) {
      return setAliasStatus({
        status: 'error',
        message: 'Only letters, numbers & hyphens.',
      })
    }
    setAliasStatus({
      status: 'checking',
      message: 'Checking alias availability...',
    })

    if (dbCallId.current) clearTimeout(dbCallId.current)

    dbCallId.current = setTimeout(() => {
      (async function () {
        try {
          const res = await linkService.searchAlias({ alias: inputFields.customAlias })

          if (res?.total === 0) {
            setAliasStatus({
              status: 'available',
              message: 'This alias is available.',
            })
          } else {
            setAliasStatus({
              status: 'taken',
              message: 'This alias is already taken.',
            })
          }

        } catch (error) {
          setAliasStatus({
            status: 'error',
            message: 'Unable to proceed.'
          })
        }

      })()
    }, 500)

    return () => clearTimeout(dbCallId)

  }, [inputFields.customAlias])



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0, }}
        transition={{ duration: 0.25, ease: "easeOut", }}
        className="fixed inset-0 z-[10000000000] flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xl"
          onClick={() => setShowCreateModal(false)}
        />

        {
          createdLink ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.25 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.25 }}
              transition={{ duration: 0.25, ease: "easeOut", }}
              className="z-[100000000]"
            >
              <LinkCreatedSuccess
                link={createdLink}
                onCreateAnother={onCreateAnother}
              />
            </motion.div>

          ) : (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="custom-scrollbar relative flex flex-col gap-8 w-[924px] h-[90%] sm:h-[480px] bg-zinc-950 border border-zinc-800 p-8 shadow-2xl overflow-auto"
            >
              <AnimatePresence mode="wait">
                <div className="flex justify-center items-start w-full relative">

                  {
                    step > 1 && (
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        exit={{
                          scale: 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                        }}
                        className="absolute z-[1000] left-[-6%] sm:left-0 top-2">
                        <IoArrowBackCircleOutline
                          onClick={() => setStep(p => p - 1)}
                          className="text-white text-[20px] sm:text-2xl cursor-pointer hover:text-zinc-300 hover:scale-110 transition-all duration-200"
                        />
                      </motion.div>
                    )
                  }

                  <motion.div
                    key={step}
                    initial={{
                      opacity: 0,
                      filter: "blur(8px)",
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(8px)",
                      y: -5,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {STEPS[step].title}
                    </h2>

                    <p className="mt-2 text-[12px] sm:text-sm text-zinc-400">
                      {STEPS[step].description}
                    </p>
                  </motion.div>
                </div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {
                  step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut", }}
                    >
                      <div className="flex flex-col gap-6">
                        <Input
                          className="w-[90%] sm:w-[80%] m-auto justify-start text-[14px] h-9  sm:text-[16px] sm:h-10 px-3 rounded-sm font-[Inter] bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 outline-none focus:border-zinc-600 transition-all duration-200"
                          label="Destination URL"
                          value={inputFields.url}
                          onChange={e => {
                            setInputFields(prev => ({
                              ...prev,
                              url: e.target.value
                            }))
                            setUrlError(null)
                          }}
                          labelClasses="font-[Inter] text-[12px] sm:text-[16px]"
                          type="url"
                          placeholder="https://your-long-example-url.com"
                        />

                        {urlError && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="m-[-10px] flex justify-center items-center gap-1 text-xs font-medium text-red-400"
                          >
                            {urlError}
                          </motion.p>
                        )}

                        <div className="flex items-center w-[90%] sm:w-[80%] m-auto overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900">

                          <input
                            type="url"
                            value={`${window.location.origin}/`}
                            readOnly
                            className="w-[150px] md:w-[180px] hidden xs:block h-10 px-3 bg-zinc-950 text-zinc-400 border-r border-zinc-800 outline-none cursor-default"
                          />

                          <Input
                            className="w-full h-9 text-[14px] sm:text-[16px] sm:h-10 px-3 bg-transparent border-none text-white placeholder:text-zinc-500 outline-none focus:ring-0"
                            type="text"
                            value={inputFields.customAlias}
                            onChange={(e) => {
                              if (e.target.value.length >= 15) return
                              setInputFields(prev => ({
                                ...prev,
                                customAlias: e.target.value
                              }))
                            }}
                            placeholder="my-business (optional)"
                          />
                        </div>

                        <div className="relative w-[80%] my-[5px] mt-[-10px] mx-auto">
                          <AnimatePresence>
                            {
                              aliasStatus.status !== 'idle' && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute left-0 top-0 flex items-center gap-2"
                                >
                                  <div className="flex items-center gap-2 text-sm font-[Manrope]">

                                    <p
                                      className={`text-[12px] sm:text-[14px] font-[Inter] font-medium tracking-wide transition-colors duration-200 ${aliasStatus.status === "checking"
                                        ? "text-amber-400"
                                        : aliasStatus.status === "available"
                                          ? "text-emerald-400"
                                          : aliasStatus.status === "taken" || aliasStatus.status === "error"
                                            ? "text-red-400"
                                            : "text-zinc-500"
                                        }`}
                                    >
                                      {aliasStatus.message}
                                    </p>

                                    {
                                      aliasStatus.status === 'taken' &&
                                      <button
                                        onClick={handleSuggestAlias}
                                        className="group flex cursor-pointer items-center justify-center text-amber-400 transition-all duration-200 hover:scale-105  active:scale-95"
                                      >
                                        <FaWandMagicSparkles
                                          size={16}
                                          color="yellow"
                                          className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                                        />
                                      </button>
                                    }

                                    {
                                      aliasStatus.status === 'checking' &&
                                      <Loading color="#22c55e" size="14px" />
                                    }


                                  </div>
                                </motion.div>
                              )
                            }
                          </AnimatePresence>
                        </div>

                      </div>


                      <div className="border-t border-zinc-800 mt-5 pt-6">
                        <h3 className="text-sm font-medium text-white">
                          Link Visibility
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                          Choose whether your link can appear in public discovery pages.
                        </p>

                        <div className="mt-4 flex justify-center gap-8">
                          <label className="flex text-[13px] sm:text-[16px] items-center gap-2 cursor-pointer text-zinc-300 font-[Inter]">
                            <Input
                              type="radio"
                              name="visibility"
                              id="public"
                              value={true}
                              checked={inputFields.visibility === true}
                              onChange={() => setInputFields(prev => ({
                                ...prev,
                                visibility: true,
                              }))}
                              className="accent-red-500"
                            />
                            PUBLIC
                          </label>

                          <label className="flex text-[13px] sm:text-[16px] items-center gap-2 cursor-pointer text-zinc-300 font-[Inter]">
                            <Input
                              type="radio"
                              name="visibility"
                              value={false}
                              checked={inputFields.visibility === false}
                              onChange={() => setInputFields(prev => ({
                                ...prev,
                                visibility: false,
                              }))}
                              id="private"
                              className="accent-red-500"
                            />
                            PRIVATE
                          </label>
                        </div>
                        <div className="flex items-center justify-end p-2 ">
                          <Button
                            onClick={handleNextStep}
                            disabled={
                              aliasStatus.status === "checking" ||
                              aliasStatus.status === "taken" ||
                              aliasStatus.status === "error"
                            }
                            className="p-1.5 sm:p-2 w-[80px] sm:w-[90px] md:mt-0 mt-8 rounded-lg font-[Montserrat] bg-white text-black font-semibold text-sm transition-all duration-200 hover:scale-[0.98] hover:bg-zinc-200 active:scale-95 cursor-pointer shadow-lg"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                }

                {
                  step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex flex-col gap-5">
                        <Input
                          label="Link Title"
                          value={inputFields.title}
                          onChange={(e) => {
                            const value = e.target.value.length
                            if (value > 20) return
                            setLinkError(null)
                            setInputFields(prev => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }}
                          placeholder="e.g. Company Website"
                          className="w-[90%] sm:w-[80%] mx-auto h-10 sm:h-11 text-[14px] sm:text-[16px] px-4 rounded-sm bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 outline-none focus:border-red-500 transition-all duration-200"
                          labelClasses="w-[80%] text-[14px] sm:text-[16px] mx-auto font-[Manrope] font-semibold text-zinc-200 "
                        />

                        <TagInput tags={inputFields.tags} setTags={setInputFields} />

                      </div>

                      <div className="w-full sm:w-[80%] mx-auto mt-6 space-y-4">

                        {/* Password Protection */}

                        <SettingToggle
                          title={'Password Protection'}
                          description={'Require a password before accessing the link'}
                          value={inputFields.passwordProtected}
                          onToggle={() => setInputFields(prev => ({
                            ...prev,
                            passwordProtected: !prev.passwordProtected,
                          }))}
                        >
                          <div className="flex gap-2">
                            {
                              isPasswordSet ? (
                                <div className="flex items-center justify-between gap-5 rounded-sm border border-green-500/20 bg-green-500/5 px-1 sm:px-3 py-2">
                                  <div className="flex items-center justify-center gap-2">
                                    <AiOutlineFileProtect className="text-green-400 text-sm sm:text-lg" />

                                    <span className="text-[9px] xs:text-[10px] sm:text-sm text-zinc-200">
                                      Your link is now password protected.
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => setIsPasswordSet(false)}
                                    className="font-medium text-[14px] sm:text-[16px] cursor-pointer text-zinc-400 transition-colors hover:text-white"
                                  >
                                    <FaEdit />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col w-full">
                                  <div className="flex w-full gap-2">
                                    <Input
                                      type="text"
                                      mainClasses="w-[80%]"
                                      value={inputFields.password}
                                      onChange={e => {
                                        setPasswordError(null)
                                        setInputFields(prev => ({
                                          ...prev,
                                          password: e.target.value,
                                        }))
                                      }}
                                      placeholder="Create a password required to access this link..."
                                      className="flex h-7 px-2 xs:h-9 xs:px-3 sm:h-11 sm:px-4 rounded-sm border font-[Inter] text-[11px] sm:text-[13px] border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
                                    >
                                    </Input>

                                    <button
                                      onClick={handleSetPassword}
                                      className="h-7 xs:h-9 sm:h-11 w-9 xs:w-11 shrink-0 cursor-pointer flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-zinc-200"
                                    >
                                      <TbLockPassword className="text-sm sm:text-lg" />
                                    </button>
                                  </div>

                                  {passwordError && (
                                    <p className="mt-2 text-[10px] sm:text-xs font-[Inter] text-red-400">
                                      {passwordError}
                                    </p>
                                  )}

                                </div>
                              )
                            }

                          </div>
                        </SettingToggle>

                        {/* One Time Use */}

                        <SettingToggle
                          title={'One-Time Use'}
                          onToggle={() => setInputFields(prev => ({
                            ...prev,
                            clickLimitEnabled: !prev.clickLimitEnabled,
                          }))}
                          value={inputFields.clickLimitEnabled}
                          description={'Disable the link after its first visit'}
                        >
                          <div className="flex gap-2">
                            {
                              isClickLimitSet ? (
                                <div className="flex items-center justify-between gap-5 rounded-sm border border-green-500/20 bg-green-500/5 px-3 py-2">
                                  <div className="flex items-center gap-2">
                                    <TbClick className="text-green-400 text-lg" />

                                    <span className="text-[9px] xs:text-[10px] sm:text-sm text-zinc-200">
                                      Your link can be used {inputFields.clicks} time{inputFields.clicks > 1 ? "s" : ""}.                              </span>
                                  </div>

                                  <button
                                    onClick={() => setIsClickLimitSet(false)}
                                    className="font-medium text-[14px] sm:text-[16px] cursor-pointer text-zinc-400 transition-colors hover:text-white"
                                  >
                                    <FaEdit />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col w-full">
                                  <div className="flex w-full gap-2">
                                    <Input
                                      type="number"
                                      value={inputFields.clicks}
                                      mainClasses="w-[80%]"
                                      onChange={e => {
                                        console.log(e);

                                        setInputFields(prev => ({
                                          ...prev,
                                          clicks: e.target.valueAsNumber,
                                        }))
                                        setClickLimitError(null)
                                      }}
                                      placeholder="Choose how many times your link can be accessed..."
                                      className="flex h-7 px-2 xs:h-9 xs:px-3 sm:h-11 sm:px-4 rounded-sm border font-[Inter] text-[11px] sm:text-[13px] border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
                                    >
                                    </Input>

                                    <button
                                      onClick={handleSetClickLimit}
                                      className="h-7 xs:h-9 sm:h-11 w-9 xs:w-11 shrink-0 cursor-pointer flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-zinc-200"
                                    >
                                      <PiCursorClickDuotone className="text-sm sm:text-lg" />
                                    </button>
                                  </div>

                                  {clickLimitError && (
                                    <p className="mt-2 text-xs font-[Inter] text-red-400">
                                      {clickLimitError}
                                    </p>
                                  )}
                                </div>
                              )
                            }

                          </div>
                        </SettingToggle>

                        {/* Active Status */}

                        <SettingToggle
                          title={'Active Link'}
                          description={'Enable or disable this link'}
                          onToggle={() => setInputFields(prev => ({
                            ...prev,
                            isActive: !prev.isActive,
                          }))}
                          value={inputFields.isActive}
                        >
                          <div className="justify-self-start mb-2 flex items-center justify-center gap-2">
                            <p className="text-xs text-zinc-400">
                              When should this link stop working?
                            </p>
                            <HelpHover
                              size={16}
                              Info={'Set an expiry date for your link. Leave this field blank if you want the link to remain active indefinitely.'}
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <div className="flex w-full gap-2">
                              {
                                isExpirySet ? (
                                  <div className="flex items-center justify-between gap-5 rounded-sm border border-green-500/20 bg-green-500/5 px-3 py-2">
                                    <div className="flex items-center gap-2">
                                      <BsCalendar2Date size={15} className="text-green-400 text-lg" />

                                      <span className="text-[9px] xs:text-[10px] sm:text-sm text-zinc-200">
                                        Your link will expire on {' '}
                                        <span className="underline">{formattedExpiryDate}.</span>
                                      </span>
                                    </div>

                                    <button
                                      onClick={() => setIsExpirySet(false)}
                                      className="font-medium text-[14px] sm:text-[16px] cursor-pointer text-zinc-400 transition-colors hover:text-white"
                                    >
                                      <FaEdit />
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <Input
                                      type="date"
                                      mainClasses="w-[80%]"
                                      min={today}
                                      value={inputFields.expiresAt}
                                      onChange={(e) => {
                                        setInputFields(prev => ({
                                          ...prev,
                                          expiresAt: e.target.value,
                                        }))
                                        setExpiryDateError(null)
                                      }}
                                      placeholder="Choose how many times your link can be accessed..."
                                      className="flex h-7 px-2 xs:h-9 xs:px-3 sm:h-11 sm:px-4 rounded-sm border font-[Inter] text-[11px] sm:text-[13px] border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
                                    >
                                    </Input>

                                    <button
                                      onClick={handleSetExpiryDate}
                                      className="h-7 xs:h-9 sm:h-11 w-9 xs:w-11 shrink-0 cursor-pointer flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-zinc-200"
                                    >
                                      <TbClockPlay className="text-sm sm:text-lg"></TbClockPlay>
                                    </button>
                                  </>
                                )
                              }

                            </div>

                            {expiryDateError && (
                              <p className="mt-2 text-xs font-[Inter] text-red-400">
                                {expiryDateError}
                              </p>
                            )}

                          </div>
                        </SettingToggle>
                      </div>

                      {
                        LinkCreationError && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 text-[10px] sm:text-sm font-[Inter] text-red-400">{LinkCreationError}
                          </motion.p>
                        )
                      }

                      <div className="flex items-center justify-end w-full mt-5">
                        <Button
                          onClick={handleCreateLink}
                          loadingText={LinkCreationLoading && 'Creating your Link...'}
                          className="h-10 px-3 sm:h-11 sm:px-6 rounded-lg text-[12px] sm:text-[16px] bg-white text-black font-medium tracking-wide transition-all duration-200 hover:bg-zinc-100 active:scale-[0.98]"
                        >
                          CREATE YOUR LINK
                        </Button>
                      </div>
                    </motion.div>
                  )
                }
              </AnimatePresence >

            </motion.div >

          )
        }
      </motion.div >
    </AnimatePresence>
  );
}


export default CreateModal