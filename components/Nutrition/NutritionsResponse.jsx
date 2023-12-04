export const NutritionsResponse = ({ nutritionsResponse }) => {
  const isHighlightKey = (key) => {
    return ['protein_g', 'calories', 'fat_total_g', 'cholesterol_mg'].includes(key.toLowerCase());
  };

  return (
    <>
      <div className="bg-[#1A1A1A] hover:bg-[#161616] shadow-md rounded-md p-4 mt-4 capitalize">
        <h2 className="text-lg font-bold mb-2 text-white ">
          {nutritionsResponse.name} Nutritional Information
        </h2>
        <div className="grid gap-1.5">
          {Object.entries(nutritionsResponse).map(([key, value]) => (
            <p key={key} className={`text-md font-bold ${isHighlightKey(key) ? 'text-yellow-400' : 'text-gray-300'}`}>
              {key.replace(/_/g, ' ')}: <span className="font-bold">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
