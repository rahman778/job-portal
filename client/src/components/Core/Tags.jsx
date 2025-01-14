const Tags = ({ name }) => {
   return (
      <span className="text-xs text-primary bg-emerald-600/10 px-3 py-1 rounded-xl hover-transition hover:bg-primary hover:text-white">
         {name}
      </span>
   );
};

export default Tags;
