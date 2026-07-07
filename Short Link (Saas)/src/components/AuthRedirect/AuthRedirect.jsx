import { useSelector } from "react-redux"
import { Navigate } from "react-router"


export function AuthRedirect({ children }) {

    const loginStatus = useSelector((state) => state.authSlice.status);
    // const navigate = useNavigate()

    if (loginStatus) {
        return <Navigate to={'/'} replace></Navigate>
    }

    return children

}
