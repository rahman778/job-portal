const FilterLabel = ({ label, children }) => {
   return (
      <div>
         <label htmlFor="" className="font-medium text-base mb-3">
            {label}
         </label>
         <div className="block mt-3 space-y-2.5">{children}</div>
      </div>
   );
};

export default FilterLabel;
