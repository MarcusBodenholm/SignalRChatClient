import {Navigate, Route, Routes} from "react-router-dom";
import useUserContext from "../contexts/useUserContest";
import pagesData from "./pagesData";
import { useLocation } from "react-router-dom";


const Router = () => {
    const {user} = useUserContext();
    const pageRoutes = pagesData.map(({path, title, element}) => {
        return <Route key={title} path={`/${path}`} element={element} />;
    })
    const location = useLocation();
    const pathCheck = (location.pathname !== "/login" && location.pathname !== "/register")
    console.log(user)
    if (pathCheck && user.username === "") {
        return <Navigate to="/login"/>
    }
    return <><Routes>{pageRoutes}</Routes></>
}

export default Router;