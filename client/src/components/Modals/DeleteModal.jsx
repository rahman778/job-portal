import ModalWrapper from "./ModalWrapper";

function DeleteModal({ open, setOpen, onDelete }) {
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <h2 className="text-lg font-medium mb-2 mt-6">
        Are sure you want to delete?
      </h2>
      <div className="mt-4 flex justify-center gap-x-6">
        <button
          type="submit"
          className="button primary-outline-btn py-2.5 px-6"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="button bg-red-500 py-2.5 px-6"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </ModalWrapper>
  );
}

export default DeleteModal;
