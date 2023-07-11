import { useFetcher } from 'react-router-dom';
import Button from '../../customComponents/Button';
import { updateOrder } from '../../apis/apiRestaurant';

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();
  console.log(order);
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button disabled={fetcher.state === 'loading'} type="primary">
        {fetcher.state === 'loading' ? 'Please wait...' : 'Make Priority'}
      </Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export async function action({ params }) {
  const data = { priority: true };

  await updateOrder(params.orderId, data);

  return null;
}
