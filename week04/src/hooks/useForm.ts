import { useEffect, useState, type ChangeEvent } from "react";

interface useFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: useFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [error, setError] = useState<Record<string, string>>();

  // 사용자가 입력값을 바꿀 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일, 패스워드 인풋 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    // values.name 으로 접근 (values.email, values.password)
    const value = values[name];

    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, e.target.value);
    };

    const onBlur = () => {
      handleBlur(name);
    };
    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setError(newErrors);
  }, [validate, values]);

  return { values, touched, error, getInputProps };
}

export default useForm;
