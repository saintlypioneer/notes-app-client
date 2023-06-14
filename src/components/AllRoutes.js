import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Authenticate/Login";
import Signup from "./Authenticate/Signup";
import Cards from "./Dashboard/Cards";
import { useSelector } from "react-redux";
import SharedWithMe from "./Sharing/SharedWithMe";
import SharedWithOthers from "./Sharing/SharedWithOthers";


function AllRoutes({setCurrentNote, setUpdatingModalOpen}){

    const {isAuthenticated} = useSelector((state) => state.auth);

    const paths = [
        {
            path: "/",
            element: <>{isAuthenticated?<Cards setCurrentNote={setCurrentNote} setUpdatingModalOpen={setUpdatingModalOpen} />:<Navigate to="/login" />}</>
        },
        {
            path: "/signup",
            element: <>{!isAuthenticated?<Signup />:<Navigate to="/" />}</>
        },
        {
            path: "/login",
            element: <>{!isAuthenticated?<Login />:<Navigate to="/" />}</>
        },
        {
            path: "/shared/me",
            element: <>{isAuthenticated?<Cards setCurrentNote={setCurrentNote} setUpdatingModalOpen={setUpdatingModalOpen} dataFilter="shared-with-me" />:<Navigate to="/login" />}</>
        },
        {
            path: "/shared/others",
            element: <>{isAuthenticated?<Cards setCurrentNote={setCurrentNote} setUpdatingModalOpen={setUpdatingModalOpen} dataFilter="shared-with-others" />:<Navigate to="/login" />}</>
        }
    ];

    return (
        <Routes>
            {
                paths.map((path, index) => {
                    return <Route key={index} path={path.path} element={path.element} />
                })
            }
        </Routes>
    );
}

export default AllRoutes;