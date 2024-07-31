import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CandidateCard from "../../components/Cards/CandidateDnDCard";
import {
   MagnifyingGlassIcon,
   PencilSquareIcon,
   PlusIcon,
   TrashIcon,
} from "@heroicons/react/24/outline";
import Tags from "../../components/Core/Tags";
import CommentModal from "../../components/Modals/CommentModal";
import BackButton from "../../components/Buttons/BackButton";

function JobManagePage() {
   const [columns, setColumns] = useState(columnsFromBackend);
   const [isMounted, setIsMounted] = useState(false);
   const [commentModalOpen, setCommentModalpen] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   const onDragEnd = (result) => {
      if (!result.destination) return;
      const { source, destination } = result;
      if (source.droppableId !== destination.droppableId) {
         const sourceColumn = columns[source.droppableId];
         const destColumn = columns[destination.droppableId];
         const sourceItems = [...sourceColumn.items];
         const destItems = [...destColumn.items];
         const [removed] = sourceItems.splice(source.index, 1);
         destItems.splice(destination.index, 0, removed);
         setColumns({
            ...columns,
            [source.droppableId]: {
               ...sourceColumn,
               items: sourceItems,
            },
            [destination.droppableId]: {
               ...destColumn,
               items: destItems,
            },
         });
      } else {
         const column = columns[source.droppableId];
         const copiedItems = [...column.items];
         const [removed] = copiedItems.splice(source.index, 1);
         copiedItems.splice(destination.index, 0, removed);
         setColumns({
            ...columns,
            [source.droppableId]: {
               ...column,
               items: copiedItems,
            },
         });
      }
   };
   return (
      <>
         <section className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-5 mb-10">
            <BackButton />
            <div className="flex flex-wrap items-center justify-between mt-2">
               <div className="flex flex-wrap items-center gap-x-4">
                  <h2 className="font-medium text-xl mb-0">
                     Senior Sofware Engineer
                  </h2>
                  <span>Active</span>
                  <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300  flex-shrink-0"></span>
                  <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
                     Full-Time
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300  flex-shrink-0"></span>
                  <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
                     Remote
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 flex-shrink-0"></span>
                  <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
                     $3,900 - $5,300 a month
                  </span>
               </div>
               <div className="flex gap-x-3">
                  <PencilSquareIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 click-transition" />
                  <TrashIcon className="w-6 h-6 text-red-600 click-transition" />
               </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 mt-4">
               <Tags name="React" />
               <Tags name="Javascript" />
               <Tags name="Laravel" />
            </div>
            <hr className="my-5 dark:border-gray-600" />
            <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between">
               <h2 className="mb-0 font-medium text-lg">30 Candidates</h2>
               <div className="relative lg:w-1/3 mt-3 lg:mt-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                     <MagnifyingGlassIcon className="text-gray-500 h-5 w-5" />
                  </span>
                  <input
                     className="input pl-10 py-2 w-full"
                     type="text"
                     placeholder="Search candidate"
                  />
               </div>
               <div className="mt-4 lg:mt-0">
                  <button className="button secondary-btn flex items-center justify-center gap-x-2 click-transition">
                     <span>Add Candidate</span>
                     <PlusIcon className="w-4 h-4 stroke-2" />
                  </button>
               </div>
            </div>
            <div className="container mt-10">
               <DragDropContext onDragEnd={onDragEnd}>
                  <div className="flex gap-x-5 w-[92vw] overflow-x-auto custom-scrollbar">
                     {Object.entries(columns).map(([columnId, column]) => {
                        return isMounted ? (
                           <div
                              className="flex flex-col min-w-[290px] pb-6"
                              key={columnId}
                           >
                              <span
                                 style={{ borderTopColor: column.color }}
                                 className="bg-transparent font-medium shadow-sm py-2.5 px-4 rounded-sm mb-3 border-t-2 shadow-gray-300 dark:shadow-gray-700 text-md"
                              >
                                 {column.title}
                              </span>
                              <Droppable key={columnId} droppableId={columnId}>
                                 {(provided) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.droppableProps}
                                    >
                                       <div className="h-[80vh] overflow-y-auto bg-gray-100 dark:bg-mediumGrey rounded-md p-4 custom-scrollbar">
                                          {column.items.map((item, index) => (
                                             <CandidateCard
                                                key={item.id}
                                                item={item}
                                                index={index}
                                                onClick={() =>
                                                   setCommentModalpen(true)
                                                }
                                             />
                                          ))}
                                          {provided.placeholder}
                                       </div>
                                    </div>
                                 )}
                              </Droppable>
                           </div>
                        ) : null;
                     })}
                  </div>
               </DragDropContext>
            </div>
         </section>
         <CommentModal open={commentModalOpen} setOpen={setCommentModalpen} />
      </>
   );
}

export default JobManagePage;

const data = [
   {
      id: "1",
      Task: "John Doe",
      Due_Date: "25-May-2021",
   },
   {
      id: "2",
      Task: "Steve Smith",
      Due_Date: "26-May-2021",
   },
   {
      id: "3",
      Task: "Joe Root",
      Due_Date: "27-May-2021",
   },
   {
      id: "4",
      Task: "Johny Smith",
      Due_Date: "23-Aug-2021",
   },
];

const columnsFromBackend = {
   123: {
      title: "Applied",
      items: data,
      color: "#656f7d",
   },
   456: {
      title: "Interview",
      items: [],
      color: "#0891b2",
   },
   789: {
      title: "Selected",
      items: [],
      color: "#7c3aed",
   },
   1000: {
      title: "Rejected",
      items: [],
      color: "#0d9488",
   },
};
