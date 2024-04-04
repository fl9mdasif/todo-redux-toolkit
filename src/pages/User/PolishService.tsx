/* eslint-disable @typescript-eslint/no-explicit-any */
// import { selectCurrentUser } from "../../redux/features/auth/authSlice";

import { Button } from "antd";
import PHInput from "../../components/form/PHInput";
import PHForm from "../../components/form/PhForm";
import { selectCurrentUser } from "../../redux/features/authApi/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import { useCreateShoePolishMutation } from "../../redux/features/todos/shoePolishApi";
import PHSelect from "../../components/form/PHSelect";

const PolishService = () => {
  const [createShoePolish] = useCreateShoePolishMutation();
  const user: any = useAppSelector(selectCurrentUser);

  const defaultValues = {
    userId: user._id,
  };

  const shineOptions = [
    {
      value: "matte",
      label: "matte",
    },
    {
      value: "gloss",
      label: "gloss",
    },
    {
      value: "high-gloss",
      label: "high-gloss",
    },
  ];
  const polishOptions = [
    {
      value: "wax",
      label: "wax",
    },
    {
      value: "cream",
      label: "cream",
    },
    {
      value: "liquid",
      label: "liquid",
    },
  ];

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Loading...");
    // console.log(data, toastId);
    try {
      const polishInfo: any = {
        userId: data.userId,
        shineLevel: data.shineLevel,
        polishType: data.polishType,
        instructions: data.instructions,
        status: "pending",
      };
      //   console.log("p", polishInfo);

      const res = await createShoePolish(polishInfo).unwrap();

      //   console.log("res", res);
      if (res) {
        toast.success("Sent polish request in successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      console.log("err: ", error);
    }
  };
  //   console.log(user);
  return (
    <div>
      <h1>Request for polish {user._id}</h1>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="UserId" />
        <PHSelect
          name="shineLevel"
          label=" Shine Level "
          options={shineOptions}
        />
        <PHSelect
          name="polishType"
          label=" Polish Type "
          options={polishOptions}
        />
        <PHInput type="text" name="instructions" label="instructions" />

        <Button htmlType="submit">Request for polish</Button>
      </PHForm>
    </div>
  );
};

export default PolishService;
