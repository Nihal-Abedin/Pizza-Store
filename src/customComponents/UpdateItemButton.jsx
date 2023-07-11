import { useDispatch } from 'react-redux';
import Button from './Button';
import {
  decreaseItemQuantity,
  icreaseItemQuantity,
} from '../utils/Slices/cartSlice';

const UpdateItemButton = ({ pizzaId, quantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <p className="text-sm font-semibold">{quantity}</p>
      <Button
        type="round"
        onClick={() => dispatch(icreaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};

export default UpdateItemButton;
