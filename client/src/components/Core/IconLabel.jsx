const IconLabel = ({ label, value }) => {
   return (
      <div className="flex items-center space-x-4">
         <slot></slot>
         <div>
            <div className="text-md">{label}</div>
            <div className="text-sm text-primary">{value}</div>
         </div>
      </div>
   );
};

export default IconLabel;
