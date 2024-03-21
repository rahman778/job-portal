import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Draggable } from "react-beautiful-dnd";

const CandidateCard = ({ item, index, onClick }) => {
   return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
         {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               className={`border border-gray-300 dark:border-gray-700 rounded-md p-4 ${
                  snapshot.isDragging
                     ? "bg-emerald-600/10"
                     : "bg-white dark:bg-darkGrey"
               } mt-4`}
            >
               <div
                  className="flex flex-col justify-center items-start text-md"
                  onClick={onClick}
               >
                  <p className="font-medium">{item.Task}</p>
                  <div className="flex justify-between w-full text-sm  mt-2">
                     <span className="text-gray-700 dark:text-gray-300">
                        55 min ago
                     </span>
                     <span className="flex gap-x-1 items-center">
                        <span className="mr-1 mt-0.5 text-gray-700 dark:text-gray-300">
                           5
                        </span>
                        <ChatBubbleOvalLeftEllipsisIcon className="text-gray-700 dark:text-gray-300 h-4 w-4" />
                     </span>
                  </div>
               </div>
            </div>
         )}
      </Draggable>
   );
};

export default CandidateCard;
