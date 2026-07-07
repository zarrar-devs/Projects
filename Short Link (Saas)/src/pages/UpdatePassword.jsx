import { useState } from "react"
import { Input } from "../components/common/Input/Input"
import { AuthService } from "../Appwrite/auth/auth"
import { Button } from "../components/common/Button/Button"
import { useSearchParams } from "react-router"
import { Link } from "react-router"



export function UpdatePassword() {


    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const authentication = new AuthService()
    const [searchParams] = useSearchParams()
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })



    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError('Password must be same.');
            setLoading(false)
            return
        }

        const secret = searchParams.get('secret')
        const userId = searchParams.get('userId')
        const { password } = formData;
        

        if (!secret || !userId) {
            setError('We can,t verify your link.')
            setLoading(false)
            return
        }

        try {
            const updPass = await authentication.resetPassword({ userId, secret, password })

            if (updPass) {
                setSuccess('Your password has been successfully changed.');
            }
        } catch (error) {
            switch (error.code) {
                case 400:
                    setError("Please enter a valid password.");
                    break;

                case 401:
                    setError("This reset link is invalid.");
                    break;

                case 404:
                    setError("Recovery request not found.");
                    break;

                case 429:
                    setError("Too many attempts, Try again later.");
                    break;

                default:
                    setError(error.message || "Something went wrong.");
            }
        } finally {
            setLoading(false)
        }

    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }


    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full h-[100vh] bg-black'>
            <div className='flex flex-col items-center gap-12 justify-center w-100 p-10 text-[#09090b] border-[0.5px] border-[#25252a]'>
                <div className="flex flex-col text-center items-center justify-center text-white">
                    <h4 className="font-[Ubuntu] text-2xl">Reset your password</h4>

                </div>


                <div className=" flex flex-col gap-2 text-white font-[Inter] w-full">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        label={'PASSWORD'}
                        placeholder="newpass#123"
                        className="bg-[#171719] p-1.5 w-full text-[15px]"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                    />
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        label={'CONFIRM PASSWORD'}
                        placeholder="newpass#123"
                        className="bg-[#171719] p-1.5 w-full text-[15px]"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className=" cursor-pointer text-xs text-gray-400"
                    >
                        {showPassword ? "Hide Password" : "Show Password"}
                    </button>

                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    {error && <p className="text-red-500 mb-3 font-[Inter]">{error}</p>}
                    {success && <p className="text-green-400 mb-3 font-[Inter] text-center">{success}</p>}
                    {
                        success ? (
                            <Link className="bg-white flex items-center justify-center w-full cursor-pointer text-black font-[Ubuntu] p-1 hover:bg-[#acacb0]" to={'/login'}>Back to Login</Link>
                        ) : (
                            <Button type="submit" loadingText={loading && 'Resetting...'} className="bg-white w-full cursor-pointer text-black font-[Ubuntu] p-1 hover:bg-[#acacb0]">Reset password</Button>
                        )
                    }

                </div>

            </div>

        </form>
    )
}

