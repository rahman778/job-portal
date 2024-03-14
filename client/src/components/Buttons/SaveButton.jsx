import { BookmarkIcon } from "@heroicons/react/24/outline";

const SaveButton = ({ size = "h-5 w-5" }) => {
   return (
      <span className="group inline-flex items-center justify-center bg-emerald-600/15 hover:bg-primary rounded-sm p-1 shadow-sm hover-transition cursor-pointer">
         <BookmarkIcon
            className={`text-primary group-hover:text-white ${size} stroke-2`}
         />
      </span>
   );
};

export default SaveButton;
