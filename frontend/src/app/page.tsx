'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrugstores, DrugStore } from '@/store/slices/drugstoresSlice';
import { fetchMedicines} from '@/store/slices/medicinesSlice';
import { RootState, AppDispatch } from '@/store/store';
import { addToCart } from "@/store/slices/cartSlice";


export default function DrugstoresPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const { items: drugstores, loading, error } = useSelector(
    (state: RootState) => state.drugstores
  );
  const { medicines } = useSelector((state: RootState) => state.medicines);
  const filteredMedicines = medicines
  .filter(m => (selected ? m.drugStoreId === selected : true))
  .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => {
    switch (sortBy) {
      case "name-asc": return a.name.localeCompare(b.name);
      case "name-desc": return b.name.localeCompare(a.name);
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      default: return 0;
    }
  });

  useEffect(() => {
    dispatch(fetchDrugstores());
    dispatch(fetchMedicines());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading drugstores...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="flex gap-6">
      <aside className="md:w-1/3 w-full min-w-[220px] bg-white rounded-md shadow p-4">
        <ul className="space-y-2">
          {drugstores.map((ds) => (
            <li
              key={ds.id}
              onClick={() => setSelected(ds.id)}
              className={`cursor-pointer p-2 rounded transition-colors text-cyan-950 ${
                selected === ds.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <p className="font-semibold">{ds.name}</p>
              <p className="text-sm">{ds.address}</p>
            </li>
          ))}
        </ul>
      </aside>
      <main className="md:flex-1 w-full bg-white rounded-md shadow p-4">
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <button className="bg-gray-200 px-3 py-1 rounded">Select All</button>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="name-asc">Name ↑</option>
            <option value="name-desc">Name ↓</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {filteredMedicines.map(med => (
            <li key={med.id} className="border rounded p-3 flex justify-between items-center">
              <div>
                <p className="font-semibold">{med.name}</p>
                <p className="text-sm text-gray-600">${med.price.toFixed(2)}</p>
                <p className="text-xs text-gray-400">{med.drugStore?.name}</p>
              </div>
              <button
                onClick={() => dispatch(addToCart({ id: med.id, name: med.name, price: med.price, quantity: 1 }))}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}