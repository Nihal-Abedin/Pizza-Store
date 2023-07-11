// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../apis/apiRestaurant';
import Button from '../../customComponents/Button';
import Input from '../../customComponents/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from '../../utils/Slices/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import store from '../../store/store';
import { fetchAddress } from '../../utils/Slices/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  console.log(position, address);
  const isLoadingAddress = addressStatus === 'pending';
  const navigation = useNavigation();

  // mostly used for any errors
  const formErrors = useActionData();

  const isSubmitting = navigation.state === 'submitting';
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priotity = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priotity;

  console.log(isLoadingAddress);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <Input
            type="text"
            name="customer"
            className="grow"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <Input type="tel" className="w-full" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <Input
              type="text"
              className=" w-full"
              disabled={isLoadingAddress}
              name="address"
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>

          {!position.latitude && (
            <div className="absolute bottom-[3px] right-[3px] z-10 sm:bottom-[5px] sm:right-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {isLoadingAddress ? 'Getting Position...' : 'Get Position'}
              </Button>
            </div>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type={'primary'} disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing Order'
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please provide a valid phone number!';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrfer = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrfer.id}`);
};

export default CreateOrder;
