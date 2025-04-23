import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/item/${item._id}`)}
      className="cursor-pointer border rounded-md p-4 shadow-md hover:shadow-lg transition"
    >
      {item.images && item.images.length > 0 ? (
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-48 object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <h2 className="mt-2 font-semibold text-lg">{item.name}</h2>
      <p className="text-accentColor font-bold">₹ {item.price.toFixed(2)}</p>
    </div>
  );
}

export default ItemCard;
