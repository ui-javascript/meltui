import { CommonRequestProps } from "./ICrudOptions"

export interface IFormSchema extends CommonWidgetProps<IFormSchema> {
  parse: (schema?: {}) => IFormSchema

  enabled: (enabled?: boolean) => IFormSchema
  disabled: (disabled?: boolean) => IFormSchema
  visible: (visible?: boolean) => IFormSchema
  editable: (editable?: boolean) => IFormSchema

  bind: (keys: []) => IFormSchema

  // https://github.com/colinhacks/zod
  string: () => IFormSchema
  number: () => IFormSchema
  // bigint: () => FormSchema // 就是string

  boolean: () => IFormSchema

  widget: (widgetName?: string) => IFormSchema

  /**
   * form里是label, table里是表头标题
   */
  title: (title: string) => TitleProps & IFormSchema
  extra: (extraText: string) => IFormSchema
  help: (helpText: string) => IFormSchema

  ellipsis: () => EllipsisProps & IFormSchema

  validate: () => ValidateProps & IFormSchema


  fixed: () => FixedProps & IFormSchema
  sort: () => SortProps & IFormSchema
  filter: () => FilterProps & IFormSchema

  search: () => SearchProps<IFormSchema>
    & CommonWidgetProps<IFormSchema & SearchProps<IFormSchema>>
    & IFormSchema
}

type CommonWidgetProps<T>  = {
  input: () => InputProps<T> & T
  numberInput: () => NumberInputProps<T> & T
  textArea: () => TextAreaProps<T> & T
  select: () => CommonRequestProps<T> & SelectProps & T
  datePicker: () => DatePickerProps<T> & T
  uploader: () => CommonRequestProps<T & UploadProps<T>> & UploadProps<T> & T

  // @todo
  tagInput: () => InputProps<T> & T
  radio: () => InputProps<T> & T
  colorPicker: () => InputProps<T> & T

  // tagPicker: () => CommonRequestProps<T> & SelectProps & T
  cascader: () => CommonRequestProps<T> & SelectProps & T
  checkbox: () => CommonRequestProps<T> & SelectProps & T
  slider: () => CommonRequestProps<T> & SelectProps & T
  switch: () => CommonRequestProps<T> & SelectProps & T
  rate: () => CommonRequestProps<T> & SelectProps & T
  progress: () => CommonRequestProps<T> & SelectProps & T

  // 这两个可以通过指定 HH:ss的格式来确定, 或许不需要
  // timePicker: () => DatePickerProps<T> & T
  // dateTimePicker: () => DatePickerProps<T> & T

}

type ValidateRuleProps = {
  message?: string
}


type ValidateProps = {
  required: (message?: string | ValidateRuleProps) => ValidateProps & IFormSchema

  max: (length: number, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  min: (length: number, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  length: (length: number, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  equal: (eq: number | string, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  eq: (eq: number | string, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema

  email: (message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  url: (message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  regex: (regex: string, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema

  // startsWith: (startsWith: string, message?: ValidatableMessageProps) => ValidatableProps & FormSchema
  // endsWith: (endsWith: string, message?: ValidatableMessageProps) => ValidatableProps & FormSchema

  nonempty: (message?: string | ValidateRuleProps) => ValidateProps & IFormSchema

  gt: (num: number, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  gte: (num: number, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  lt: (num: number, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema
  lte: (num: number, message?: string | ValidateRuleProps) => ValidateProps & IFormSchema

  rules: (rules: any[]) => ValidateProps & IFormSchema
}


type InputProps<T> = {
  readonly: () => InputProps<T> & T
  clearable: () => InputProps<T> & T
  copyable: () => InputProps<T> & T
  placeholder: (placeholder: string) => InputProps<T> & T
}

type TextAreaProps<T> = {
  readonly: () => InputProps<T> & T
  autoSize: () => TextAreaProps<T> & T
}

type NumberInputProps<T> = {
  readonly: () => NumberInputProps<T> & T
  clearable: () => NumberInputProps<T> & T
}

type DatePickerProps<T> = {
  readonly: () => DatePickerProps<T> & T

  range: () => DatePickerProps<T> & T
  format: (fmt: string) => DatePickerProps<T> & T
  yyyy: () => DatePickerProps<T> & T
  yyyyMMdd: () => DatePickerProps<T> & T
}


type TitleProps = {
  width: (width: number) => TitleProps & IFormSchema
  upperFirst: () => TitleProps & IFormSchema
}

type EllipsisProps = {
  width: (width: number) => EllipsisProps & IFormSchema
  tooltip: () => EllipsisProps & IFormSchema
  left: () => EllipsisProps & IFormSchema
  right: () => EllipsisProps & IFormSchema
  top: () => EllipsisProps & IFormSchema
  bottom: () => EllipsisProps & IFormSchema
  auto: () => EllipsisProps & IFormSchema
}


type SortProps = {
  asc: () => SortProps & IFormSchema
  desc: () => SortProps & IFormSchema
}


type FilterProps = {
  asc: () => FilterProps & IFormSchema
  desc: () => FilterProps & IFormSchema

  eq: (eq: number | string) => FilterProps & IFormSchema
  gt: (num: number) => FilterProps & IFormSchema
  gte: (num: number) => FilterProps & IFormSchema
  lt: (num: number) => FilterProps & IFormSchema
  lte: (num: number) => FilterProps & IFormSchema
}


type FixedProps = {
  left: () => FixedProps & IFormSchema
  right: () => FixedProps & IFormSchema
  width: (width: number) => FixedProps & IFormSchema
}

type SelectProps = {
  options: (options: []) => SelectProps & IFormSchema
}

type UploadProps<T> = {
  uploadEmit: (eventName: string) => CommonRequestProps<T> & UploadProps<T> & T
  pictureCard: () => CommonRequestProps<T> & UploadProps<T>  & IFormSchema
  withFileParam: (fileParam: string) => CommonRequestProps<T> & UploadProps<T>  & IFormSchema
  withFileResult: (fileParam: string) => CommonRequestProps<T> & UploadProps<T>  & IFormSchema
}


type SearchProps<T> = {
  idx: (idx: number) => SearchProps<T> & T
  advancedOnly: () => SearchProps<T> & T
}
