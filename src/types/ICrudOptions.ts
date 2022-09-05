import { RuleItem } from 'async-validator';

// @form https://github.com/alibaba/x-render/blob/master/packages/form-render/src/schema.d.ts
export default interface ICrudOptions {
  parse: (options: {}) => ICrudOptions

  rowKey: (rowKey: string) => ICrudOptions

  fetchList: () => FetchListProps & ICrudOptions
  fetchItem: () => FetchListProps & ICrudOptions

  operaton: (btnText?: string) => AllOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  updateItemOperation: (btnText?: string) => NormalOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  saveItemOperation: (btnText?: string) => NormalOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  updateBatchOperation: (btnText?: string) => NormalOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  saveBatchOperation: (btnText?: string) => NormalOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  viewItemOperation: (btnText?: string) => NormalOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  removeItemOperation: (btnText?: string) => NormalOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  removeBatchOperation: (btnText?: string) => NormalOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>
  customOperation: (btnText?: string) => AllOperationProps<CommonRequestProps<ICrudOptions> & ICrudOptions>


  validate: () => ValidateProps & ICrudOptions

  size: () => SizeProps & ICrudOptions

  layout: () => LayoutProps & ICrudOptions
  column: () => ColumnProps & ICrudOptions
  row: () => RowProps & ICrudOptions
  header: (visible?: boolean | string) => HeaderProps & ICrudOptions
  body: () => BodyProps & ICrudOptions
  span: () => SpanProps & ICrudOptions
  selection: () => SelectionProps & ICrudOptions

  loading: () => LoadingProps & ICrudOptions
  lazyload: () => CommonRequestProps<ICrudOptions> & ICrudOptions

  virtualList: () => VirtualListProps & ICrudOptions
  scroll: () => ScrollProps & ICrudOptions
  expand: () => ExpandProps & ICrudOptions
  drag: () => DragProps & ICrudOptions
  edit: (enabled?: boolean) => EditProps & ICrudOptions
}

// type INormalOperationWithoutCustomType<T> = Omit<INormalOperation<ICrudOptions>, 'customType'>

type EditProps = {
  enabled: (enabled?: boolean) => EditProps & ICrudOptions
  disabledKey: (disabledKey: string) => EditProps & ICrudOptions
  rowClick: () => EditProps & ICrudOptions
  cellClick: () => EditProps & ICrudOptions
  inlineMode: () => EditProps & ICrudOptions
  saveProtect: () => EditProps & ICrudOptions
  saveInstant: () => EditProps & ICrudOptions
  saveLater: () => EditProps & ICrudOptions
}

export type CommonRequestProps<T> = {
  // getUrl: (url: string) => CommonRequestProps<T> & T
  // postUrl: (url: string) => CommonRequestProps<T> & T
  url: (url: string) => CommonRequestProps<T> & T
  get: (url: string) => CommonRequestProps<T> & T
  post: (url: string) => CommonRequestProps<T> & T
  delete: (url: string) => CommonRequestProps<T> & T
  put: (url: string) => CommonRequestProps<T> & T
  method: (method: string) => CommonRequestProps<T> & T
  headerMapping: (params: {}) => CommonRequestProps<T> & T
  paramsMapping: (params: {}) => CommonRequestProps<T> & T
  withFileParam: (fileName: string) => CommonRequestProps<T> & T
  withFileResult: (fileName: string) => CommonRequestProps<T> & T
  /**
   * 只需要映射一个参数(data | list | value)时可以直接写字符串
   */
  resultMapping: (params: {} | string) => CommonRequestProps<T> & T
  successMsg: (msg: string) => CommonRequestProps<T> & T
  errorMsg: (msg: string) => CommonRequestProps<T> & T

  throttle: (wait: number) => CommonRequestProps<T> & T
  debounce: (wait: number) => CommonRequestProps<T> & T

  // pictureCard: () => CommonRequestProps<T> & T
}

type OperationButtonProps<T> = {
  idx: (index: number | string) => NormalOperationProps<T>
  primaryBtn: (btnText?: string) => NormalOperationProps<T>
  secondaryBtn: (btnText?: string) => NormalOperationProps<T>
  dashedBtn: (btnText?: string) => NormalOperationProps<T>
  outlineBtn: (btnText?: string) => NormalOperationProps<T>
  textBtn: (btnText?: string) => NormalOperationProps<T>
  text: (btnText: string) => NormalOperationProps<T>
  success: () => NormalOperationProps<T>
  warning: () => NormalOperationProps<T>
  danger: () => NormalOperationProps<T>
  icon: (icon: string) => NormalOperationProps<T>
}

type CommonOperationProps<T> = {
  saveBatch: () => NormalOperationProps<T>

  modalMode: () => NormalOperationProps<T>
  drawerMode: () => NormalOperationProps<T>
  // expandMode: () =>  INormalOperation<T>

  localData: () => NormalOperationProps<T>
  remoteData: () => NormalOperationProps<T>

  /**
   * 是否需要关闭按钮
   */
  needClose: (closable?: boolean) => NormalOperationProps<T>
  /**
   * 是否需要加载按钮
   */
  needLoading: (loading?: boolean) => NormalOperationProps<T>
  /**
   * 是否需要取消按钮
   */
  needCancel: (allowCancel?: boolean) => NormalOperationProps<T>

  needConfirm: (needConfirm?: boolean) => NormalOperationProps<T>
  confirmText: (text: string) => NormalOperationProps<T>

  /**
   * 是否需要充值按钮
   */
  needReset: (allowReset?: boolean) => NormalOperationProps<T>


  customType: () => AllOperationProps<T>

  inOperation: (inOperation?: boolean | string) => AllOperationProps<T>
  inToolbar: (inToolbar?: boolean | string) => ToolbarPositionProps<T> & AllOperationProps<T>
  inSearchbar: (inSearchbar?: boolean | string) => AllOperationProps<T>

  reloadEmit: () => AllOperationProps<T>
  clickEmit: (eventName: string) => AllOperationProps<T>
}

type ToolbarPositionProps<T> = {
  left: () => AllOperationProps<T>
  right: () => AllOperationProps<T>
}

type CustomOperationProps<T> = {
  slot: (content: string | []) => AllOperationProps<T>
}

type NormalOperationProps<T> = CommonOperationProps<T>
  & OperationButtonProps<T>
  & T


type AllOperationProps<T> = CommonOperationProps<T>
  & CustomOperationProps<T>
  & OperationButtonProps<T>
  & T

interface FetchListProps extends CommonRequestProps<FetchListProps & ICrudOptions> {

}


type ValidateProps = {
  colon: (content?: boolean | string) => ValidateProps & ICrudOptions
  asterisk: (enabled?: boolean) => ValidateProps & ICrudOptions
}


type LayoutProps = {
  vertical: () => LayoutProps & ICrudOptions
  horizontal: () => LayoutProps & ICrudOptions

  auto: () => LayoutProps & ICrudOptions
  fix: () => LayoutProps & ICrudOptions

  xs: (col: number) => LayoutProps & ICrudOptions
  sm: (col: number) => LayoutProps & ICrudOptions
  md: (col: number) => LayoutProps & ICrudOptions
  lg: (col: number) => LayoutProps & ICrudOptions
  xl: (col: number) => LayoutProps & ICrudOptions
  xxl: (col: number) => LayoutProps & ICrudOptions
}


type SizeProps = {
  xs: () => ICrudOptions
  sm: () => ICrudOptions
  md: () => ICrudOptions
  lg: () => ICrudOptions
  xl: () => ICrudOptions
  xxl: () => ICrudOptions
}


type ColumnProps = {
  alignRight: () => ColumnProps & ICrudOptions
  alignLeft: () => ColumnProps & ICrudOptions
  highlight: () => ColumnProps & ICrudOptions
  resizable: () => ColumnProps & ICrudOptions
}


type RowProps = {
  key: (rowKey: string) => RowProps & ICrudOptions
  border: () => RowProps & ICrudOptions
  hover: () => RowProps & ICrudOptions
  stripe: () => RowProps & ICrudOptions
  highlight: () => RowProps & ICrudOptions
}

type HeaderProps = {
  visible: (visible: boolean | string) => HeaderProps & ICrudOptions
  sticky: () => HeaderProps & ICrudOptions
  top: (top: number) => HeaderProps & ICrudOptions
  group: (groupHeader: any[]) => HeaderProps & ICrudOptions
  groupFlattern: (groupHeader: any[], idx: string[]) => HeaderProps & ICrudOptions
  groupSemantic: (groupHeader: any[], idx: string[]) => HeaderProps & ICrudOptions
}


type BodyProps = {
  height: (height: number) => HeaderProps & ICrudOptions
  maxHeight: (maxHeight: number) => HeaderProps & ICrudOptions
}

type SpanProps = {
  merge: (mergeCondition: []) => SpanProps & ICrudOptions
}


type SelectionProps = {
  radioMode: () => SelectionProps & ICrudOptions
  checkboxMode: () => SelectionProps & SelectionCheckboxProps & ICrudOptions
  disabledKey: (disabledKey: string) => SelectionProps & ICrudOptions
}

type SelectionCheckboxProps = {
  strictly: () => SelectionProps & SelectionCheckboxProps & ICrudOptions
  currentOnly: () => SelectionProps & SelectionCheckboxProps & ICrudOptions
  checkAll: () => SelectionProps & SelectionCheckboxProps & ICrudOptions
}

type VirtualListProps = {
  height: (height: number) => VirtualListProps & ICrudOptions
}


type ScrollProps = {
  x: (x: number) => ScrollProps & ICrudOptions
  y: (y: number) => ScrollProps & ICrudOptions
}

type ExpandProps = {
  title: (title: string) => ExpandProps & ICrudOptions
  width: (width: number) => ExpandProps & ICrudOptions
  expandAll: (expandAll: boolean) => ExpandProps & ICrudOptions
  renderIf: (renderConditon: {}) => ExpandProps & ICrudOptions
}

type DragProps = {
  rowType: () => DragProps & ICrudOptions
  handleType: () => DragProps & ICrudOptions
  wdith: (width: number) => DragProps & ICrudOptions
}


type LoadingProps = {
  text: (text: string) => LoadingProps & ICrudOptions
  emptyText: (text: string) => LoadingProps & ICrudOptions
}
