type Product = {
  id: number;
  quantity: number;
};

type Order = {
  name: string;
  phone_number: string;
  order_products_attributes: Product[];
  restaurant_id: number;
};

export default async function createOrder(order: Order) {
  const response = await fetch(`${process.env}/api/orders`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order: order }),
  });

  return response;
}
