import Home from './components/Home.jsx';
import Cart from './features/cart/Cart.jsx';
import Menu, { loader as menuLoader } from './features/menu/Menu.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateOrder, {
  action as createOrder,
} from './features/order/CreateOrder.jsx';
import Order, { loader as orderloader } from './features/order/Order.jsx';
import { action as updateOrderAction } from './features/order/UpdateOrder.jsx';
import MainLayout from './components/mainLayout/MainLayout.jsx';
import Error from './components/Error.jsx';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [],
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrder,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderloader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
