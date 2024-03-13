const Checkbox = (props) => {
   const { checked, label, name, onchange } = props;
   return (
      <div className="w-full flex items-center gap-x-3">
         <input
            type="checkbox"
            name={name}
            id={name}
            onChange={onchange}
            checked={checked}
            className="bg-slate-100 dark:bg-mediumGrey text-primary h-4 w-4 border-1 rounded-xs focus:outline-none focus:ring-offset-0 focus:border-primary focus:ring-1 focus:ring-primary/90 dark:checked:bg-primary checked:bg-priborder-primary focus:border-transparent"
         />
         <label className="text-md" htmlFor={name}>
            {label}
         </label>
      </div>
   );
};

export default Checkbox;
