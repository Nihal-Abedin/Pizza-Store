import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../apis/apiRestaurant';
import MenuItem from './MenuItem';

const Menu = () => {
  const menu = useLoaderData();
  // console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
};

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};
export default Menu;
