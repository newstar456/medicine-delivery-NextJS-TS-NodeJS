'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrugstores } from '@/store/slices/drugstoresSlice';
import { RootState, AppDispatch } from '@/store/store';

export default function DrugstoresPage() {
  
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.drugstores);

  useEffect(() => {
    dispatch(fetchDrugstores());
  }, [dispatch]);

  if (loading) return <p>Loading drugstores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drugstores</h1>
      <ul>
        {items.map((store) => (
          <li key={store.id} className="mb-2 p-2 border rounded">
            <h2 className="font-semibold">{store.name}</h2>
            <p>{store.address}</p>
            <ul className="ml-4 mt-1">
              {store.medicines.map((med) => (
                <li key={med.id}>
                  {med.name} - ${med.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

