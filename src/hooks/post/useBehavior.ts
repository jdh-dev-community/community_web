import { useEffect, useRef, useState } from "react";
import { useDevice } from "../useDevice";

type FormValues = { [key: string]: string };

export const useBehavior = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({});

  const { isMobile } = useDevice();

  const changedFormValues = useRef({});

  useEffect(() => {
    setFormValues(changedFormValues.current);
  }, [isMobile]);

  useEffect(() => {
    if (!openForm) {
      changedFormValues.current = {};
      setFormValues({});
    }
  }, [openForm]);

  const onChangeForm = (e: any) => {
    if (e.target !== null) {
      changedFormValues.current = {
        ...changedFormValues.current,
        [e.target.name]: e.target.value,
      };
    }
  };

  return {
    isMobile,
    formValues,
    openForm,
    onChangeForm,
    setOpenForm,
  };
};
