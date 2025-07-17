import { useContext, useState } from "react";
import { ToastContext } from "../../Shared/Toast/context/ToastContext";
import { Button } from "../../Shared/Button";
import { Input } from "../../Shared/Input";
import { SelectBox } from "../../Shared/SelectBox";
import { Textarea } from "../../Shared/Textarea";
import { MultiValueInput } from "../../Shared/MultiValueInput";

export const Signin = () => {
  const { addToast } = useContext(ToastContext);
  const [tags, setTags] = useState([]);

  const dummyFunc = () => {
    addToast({
      type: "success",
      title: "Success!",
      description: "res.data.message",
    });
  };

  return (
    <div>
      <Input name="hello" />
      <MultiValueInput
        value={tags}
        onChange={setTags}
        placeholder="Type and press Enter or comma"
      />
      <SelectBox
        placeholder="Choose option"
        options={[
          { label: "One", value: "one" },
          { label: "Two", value: "two" },
        ]}
        id={"hello_select"}
      />
      <Textarea placeholder="test" id={"hello_textarea"} />
      <Button>Click Me</Button>
      <span onClick={() => dummyFunc()}>Signin</span>
    </div>
  );
};
