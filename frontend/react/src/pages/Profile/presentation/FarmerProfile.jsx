import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemsByFarmer } from '../application/shop';
import ItemCard from '../../../components/ItemCard';

function FarmerProfile() {
  const { id: farmerId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFarmerItems() {
      setLoading(true);
      try {
        const farmerItems = await getItemsByFarmer(farmerId);
        setItems(farmerItems);
      } catch (error) {
        console.error('Failed to load farmer items', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFarmerItems();
  }, [farmerId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-10 py-8">
      <h1 className="text-3xl font-bold mb-6">Farmer's Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FarmerProfile;
