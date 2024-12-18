import  { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary Range",
    array: ["0-40k", "42k-1L", "1L-5L"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    industry: '',
    salary: '',
  });

  const dispatch = useDispatch();

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    // Combine all selected filters into a single search query string
    const query = Object.values(selectedFilters)
      .filter(Boolean) // Remove empty values
      .join(' ');
    dispatch(setSearchedQuery(query));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h1 className="font-bold text-xl mb-4">Filter Jobs</h1>
      <hr className="mb-6" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-bold text-lg mb-3">{data.filterType}</h2>
          <RadioGroup
            value={selectedFilters[data.filterType.toLowerCase().replace(' ', '')]}
            onValueChange={(value) => handleFilterChange(data.filterType.toLowerCase().replace(' ', ''), value)}
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
