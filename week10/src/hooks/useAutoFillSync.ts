import { useEffect } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
// + zod 7.43 이상에서 업데이트 되어 watch()에서 autofill도 다 잡음
// 해당 훅은 커스텀 UI 인풋에서 활용 가능할 듯 or Shadow Input (비밀번호 자동완성)
// chrom의 autofill에 대한 html input sync 훅
export function useAutoFillSync<T extends FieldValues = FieldValues>(
  field: Path<T>,
  setValue: UseFormSetValue<T>
) {
  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>(
      `input[name="${field}"]`
    );
    if (!input) return;

    // RHF의 setValue로 동기화된 input.value를 Dirty, Validate: true로 만들어줌
    const sync = () => {
      const value = input.value;
      if (value) {
        setValue(field, value as PathValue<T, Path<T>>, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    };

    // autofill이 html input요소의 변경을 인식하기 위한 딜레이
    setTimeout(sync, 300);

    input.addEventListener("change", sync);
    return () => input.removeEventListener("change", sync);
  }, [field, setValue]);
}
