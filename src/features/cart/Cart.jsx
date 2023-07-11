import { Link } from 'react-router-dom';
import Button from '../../customComponents/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from '../../utils/Slices/cartSlice';
import EmptyCart from './EmptyCart';

//
function Cart() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className=" px-4 py-3">
      <Link
        to="/menu"
        className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 flex flex-col space-x-2 space-y-2 text-center sm:inline-block">
        <Button to="/order/new" type={'primary'}>
          Order pizzas
        </Button>
        <Button type={'secondary'} onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
