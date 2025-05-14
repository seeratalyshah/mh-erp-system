import { useRef } from "react";
import { useFormContext } from "react-hook-form";

interface RHFFileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  [key: string]: any;
}

export function RHFFileUpload({
  name,
  label = "Upload File",
  accept,
  required = false,
  disabled,
  placeholder,
  ...rest
}: RHFFileUploadProps) {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  /* ✅ typed ref so .click() is allowed */
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const file: File | undefined = watch(name);
  const error = errors[name as keyof typeof errors];

  return (
    <div className="space-y-2" {...rest}>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="rounded bg-[#0488a6] hover:bg-[#0488a6]/80 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </button>

      {file && (
        <div className="space-y-1">
          {file.name && (
            <span className="text-sm font-medium">{file.name}</span>
          )}
          <span className="ml-2 text-xs text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </span>
        </div>
      )}

      <input
        placeholder={placeholder}
        disabled={disabled}
        type="file"
        accept={accept}
        {...register(name)}
        ref={fileInputRef}
        onChange={(e) => {
          const selected = e.target.files?.[0] ?? null;
          setValue(name, selected);
          trigger(name);
        }}
        className="hidden"
      />

      {/* ✅ only the message string is rendered */}
      {error?.message && (
        <p className="text-sm text-red-500">{error.message as string}</p>
      )}
    </div>
  );
}
