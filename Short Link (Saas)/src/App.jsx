import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { AuthService } from "./Appwrite/auth/auth";
import { login, logout } from "./store/authSlice";
import { MainLoading } from "./components/layouts/Loading/MainLoading";
import { useMemo } from "react";
import { DatabaseService } from "./Appwrite/config/databaseService/database";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const database = useMemo(() => new DatabaseService(), [])
  const authentication = useMemo(() => new AuthService(), [])
  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {

    const startTime = Date.now()

    async function fetchUser() {
      try {
        const authInfo = await authentication.getUserData();

        if (!authInfo) return

        const userInfo = await database.getUser({ userId: authInfo.$id })

        if (userInfo) {

          dispatch(
            login({
              $id: userInfo.$id,
              name: userInfo.full_name,
              bio: userInfo.bio,
              email: userInfo.email,
              location: userInfo.location,
              avatar_file_id: userInfo.avatar_file_id,
              plan: userInfo.plan,
              is_verified: userInfo.is_verified,
              role: userInfo.role,
              total_links: userInfo.total_links,
            }),
          );
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error(error)
      } finally {
        const time = Date.now() - startTime
        const remaining = Math.max(10 - time, 0);

        setTimeout(() => {
          setLoading(false)
        }, remaining)
      }
    };
    fetchUser()
  }, []);


  useEffect(() => {
  const timer = setTimeout(() => {
    setShowPopUp(true);
  }, 10000); 

  return () => clearTimeout(timer);
}, []);



  return (
    <div>
      {
        loading ? <MainLoading></MainLoading> : <Outlet></Outlet>
      }
      {
       !loading && showPopUp && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white">
                Project Notice
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                I am currently building this project using <span className="font-medium text-white">Appwrite (BaaS)</span>.
                Due to some backend limitations, I have temporarily postponed its
                development. I plan to rebuild and complete it using my own backend
                after learning <span className="font-medium text-white">Node.js</span> and{" "}
                <span className="font-medium text-white">MongoDB</span>.
              </p>

              <div className="mt-5">
                <p className="text-sm text-zinc-400">GitHub</p>

                <a
                  href="https://github.com/zarrar-devs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block break-all text-blue-400 transition hover:text-blue-300 hover:underline"
                >
                  https://github.com/zarrar-devs
                </a>
              </div>

              <button
                onClick={() => setShowPopUp(false)}
                className="mt-6 w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-zinc-200"
              >
                Understood
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
