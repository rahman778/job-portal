import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Controller } from "react-hook-form";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyEditor = ({
   editorState,
   setEditorState,
   control,
   name,
   defaultValue,
   labelText,
   error,
   helperText,
   requiredMarker,
   ...rest
}) => {
   // useEffect(() => {
   //    if (defaultValue) {
   //       setEditorState(defaultValue);
   //    }
   // }, [defaultValue]);

   return (
      <>
         {labelText && (
            <label
               htmlFor="email"
               className={`label inline-block mb-1 ${
                  requiredMarker ? "required-marker" : ""
               }`}
            >
               {labelText}
            </label>
         )}
         <div className="relative">
            <Controller
               name={name}
               control={control}
               defaultValue={defaultValue ? editorState : ""}
               {...rest}
               render={({ field }) => (
                  <Editor
                     editorState={editorState}
                     wrapperClassName={`border  rounded-sm ${
                        error
                           ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
                           : "border-gray-600"
                     } `}
                     editorClassName="px-4 min-h-[150px]"
                     toolbarClassName="py-2 border-b border-b-gray-600 dark:bg-darkGrey"
                     onEditorStateChange={(newState) => {
                        setEditorState(newState);
                        field.onChange(
                           draftToHtml(
                              convertToRaw(
                                 editorState.getCurrentContent(newState)
                              )
                           )
                        );
                     }}
                     toolbar={{
                        options: ["inline", "list", "textAlign", "history"],
                     }}
                  />
               )}
            />
            <span
               className={`absolute top-full left-0 mt-0.5 text-xs text-red-600 ${
                  error ? "visible" : "invisible"
               }`}
            >
               {helperText || " "}
            </span>
         </div>
      </>
   );
};

export default MyEditor;
