import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../../features/cart/CartOverview";
import Header from "../Header"
import Spinner from "../Spinner";

const MainLayout =() =>{
    const navigation = useNavigation();
    console.log(navigation)
    const isLoading = navigation.state === "loading";

    return <div className="layout">
        {isLoading && <Spinner/>}
        <Header/>
        <main>
            <Outlet/>
        </main>
        <CartOverview/>
    </div>
};

export default MainLayout;