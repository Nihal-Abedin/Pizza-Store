import { useDispatch } from 'react-redux';
import Button from '../../customComponents/Button';
import { deleteitem } from '../../utils/Slices/cartSlice';

const DeleteItem = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <Button type={'small'} onClick={() => dispatch(deleteitem(id))}>
      Delete
    </Button>
  );
};
export default DeleteItem;
