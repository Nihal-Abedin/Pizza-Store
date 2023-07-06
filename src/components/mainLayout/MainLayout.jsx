import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../../features/cart/CartOverview';
import Header from '../Header';
import Spinner from '../Spinner';

const MainLayout = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Spinner />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default MainLayout;
