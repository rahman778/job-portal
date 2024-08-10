import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Draggable } from "react-beautiful-dnd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentModal from "../Modals/CommentModal";
import { useState } from "react";
import { useGetCommentsQuery } from "../../services/commentService";

dayjs.extend(relativeTime);

const CandidateCard = ({ item, index }) => {
   const [commentModalOpen, setCommentModalpen] = useState(false);
   const { data: comments, refetch } = useGetCommentsQuery(item.id, { skip: !item.id });
   return (
      <>
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
                  onClick={() => setCommentModalpen(true)}
               >
                  <p className="font-medium">{item.name}</p>
                  <div className="flex justify-between w-full text-sm  mt-2">
                     <span className="text-gray-700 dark:text-gray-300">
                     {dayjs(item.applicationDate).fromNow()}
                     </span>
                     <span className="flex gap-x-1 items-center">
                        <span className="mr-1 mt-0.5 text-gray-700 dark:text-gray-300">
                              {comments?.length}
                        </span>
                        <ChatBubbleOvalLeftEllipsisIcon className="text-gray-700 dark:text-gray-300 h-4 w-4" />
                     </span>
                  </div>
               </div>
            </div>
         )}
      </Draggable>
      <CommentModal open={commentModalOpen} setOpen={setCommentModalpen} comments={comments} data={item} onSuccess={() => refetch()}/>
      </>
   );
};

export default CandidateCard;
