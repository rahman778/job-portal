import { XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";

const ModalWrapper = ({ open, setOpen, children }) => {
   const closeIcon = (
      <span className="rounded-full p-2  hover:bg-primary/20 dark:hover:bg-primary/20 hover-transition">
         <XMarkIcon className="w-5 h-5 stroke-[3px] text-gray-500" />
      </span>
   );
   return (
      <Modal
         open={open}
         onClose={() => setOpen(false)}
         center
         closeIcon={closeIcon}
         classNames={{
            closeButton: "!outline-none !top-2 !right-2",
            modal: "bg-white dark:bg-mediumGrey !max-w-7xl rounded-md",
         }}
      >
         {children}
      </Modal>
   );
};

export default ModalWrapper;
