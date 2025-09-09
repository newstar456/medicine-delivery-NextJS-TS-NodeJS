'use client';
import { useDispatch, useSelector } from "react-redux";
import { fetchDrugstores } from "@/store/slices/drugstoresSlice";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart } from "@/store/slices/cartSlice";
import { useEffect } from "react";

export default function DrugstoresPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.drugstores);

  useEffect(() => {
    dispatch(fetchDrugstores());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Drugstores</h1>
      {items.map((store) => (
        <div key={store.id} className="border p-4 mb-4">
          <h2 className="font-semibold">{store.name}</h2>
          <p>{store.address}</p>
          <ul>
            {store.medicines.map((med) => (
              <li key={med.id} className="flex justify-between items-center my-2">
                <span>{med.name} - ${med.price.toFixed(2)}</span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    dispatch(addToCart({ medicineId: med.id, name: med.name, price: med.price, quantity: 1 }))
                  }
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
