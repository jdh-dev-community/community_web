import { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";

const ContentEditor = ({
  onEditContent,
}: {
  onEditContent: ({
    isEmpty,
    content,
  }: {
    isEmpty: boolean;
    content: string;
  }) => void;
}) => {
  const contents = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    contents.current = sunEditor;
  };

  const onChange = (content: string) => {
    const isEmpty = contents.current?.getText().trim().length === 0;

    onEditContent({ isEmpty, content });
  };

  return (
    <SunEditor
      setOptions={{
        buttonList: [
          [
            "fontSize",
            "bold",
            "underline",
            "italic",
            "strike",
            "fontColor",
            "hiliteColor",
          ],
        ],
      }}
      getSunEditorInstance={getSunEditorInstance}
      onChange={onChange}
    />
  );
};

export default ContentEditor;
