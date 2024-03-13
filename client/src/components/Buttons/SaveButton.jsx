import { BookmarkIcon } from "@heroicons/react/24/outline";

const SaveButton = () => {
   return (
      <span className="group inline-flex items-center justify-center bg-emerald-600/15 hover:bg-primary rounded-sm p-1 shadow-sm hover-transition cursor-pointer">
         <BookmarkIcon className=" text-primary group-hover:text-white h-5 w-5 stroke-2" />
      </span>
   );
};

export default SaveButton;
