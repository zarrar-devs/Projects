import { Input } from "../components/common/Input/Input";
import { Button } from "../components/common/Button/Button";
import { useState } from "react";
import { AuthService } from "../Appwrite/auth/auth";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const authentication = new AuthService();
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setError("Enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const sendLink = await authentication.resetPasswordRequest({ email });
      if (sendLink) {
        setSucess("Password reset link sent successfully. Please check your inbox.")
      }
    } catch (error) {
      switch (error.code) {
        case 400:
          setError("Please enter a valid email address.");
          break;

        case 404:
          setError("No account found with this email.");
          break;

        case 429:
          setError("Too many requests. Please try again later.");
          break;

        default:
          setError(error.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setEmail(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-full h-[100vh] bg-black"
    >
      <div className="flex flex-col items-center gap-12 justify-center w-100 p-10 text-[#09090b] border-[0.5px] border-[#25252a]">
        <div className="flex flex-col text-center items-center justify-center text-white">
          <h4 className="font-[Ubuntu] text-2xl">Reset your password</h4>
        </div>

        <div className=" flex flex-col gap-2 text-white font-[Inter] w-full">
          <Input
            type={"email"}
            label={"EMAIL"}
            placeholder="you@example.com"
            className="bg-[#171719] p-1.5 w-full text-[15px]"
            value={email}
            onChange={handleChange}
          />
          <p className="text-gray-400 text-[13px]">
            We'll send a reset link to your email address.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          {error && <p className="text-red-500 mb-3 font-[Inter] text-center">{error}</p>}
          {sucess && <p className="text-yellow-500 mb-3 font-[Inter] text-center">{sucess}</p>}
          <Button
            loadingText={loading && "Sending..." || sucess && 'Sent'}
            className="bg-white w-full cursor-pointer text-black font-[Ubuntu] p-1 hover:bg-[#acacb0]"
          >
            Send a link
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ResetPassword;
