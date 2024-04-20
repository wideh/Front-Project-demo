export default [
  {
    path: '/',
    redirect: '/list',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'editCellTable',
    icon: 'table',
    path: '/editCellTable',
    component: './EditCellTable/EditCellTable'
  },
  {
    name: 'editableTable',
    icon: 'table',
    path: '/editableTable',
    component: './EditableTable/EditableTable'
  },
  {
    name: 'uploadAvatar',
    icon: 'CameraOutlined',
    path: '/uploadAvatar',
    component: './UpLoadAvatar/UpLoadAvatar'
  },
  {
    name: 'Qrcode',
    icon: 'BarcodeOutlined',
    path: '/Qrcode',
    component: './QRCode/Qrcode',
  },
  {
    name: 'HightlightText',
    icon: 'CameraOutlined',
    path: '/HightlightText',
    component: './HightlightText/HightlightText',
  },
  {
    name: 'DebounceFunction',
    icon: 'ShakeOutlined',
    path: '/DebounceFunction',
    component: './Debounce/debounce',
  },
  {
    name: 'passwordInput',
    icon: 'EyeOutlined',
    path: '/passwordInput',
    component: './PasswordInput/PasswordInput',
  },
  {
    name: 'simpleSirtualList',
    icon: 'table',
    path: '/simpleSirtualList',
    component: './virtualList/simpleSirtualList/simpleSirtualList',
  },
  {
    name: 'virtualList',
    icon: 'table',
    path: '/virtualList',
    component: './virtualList/virtualList/virtualList',
  },
  {
    name: 'virtualList1',
    icon: 'table',
    path: '/virtualList1',
    component: './virtualList/virtualList1/index',
  },
  {
    name: 'splitGroup',
    icon: 'table',
    path: '/splitGroup',
    component: './splitGroup/index',
  },
  {
    name: 'globalModal',
    icon: 'table',
    path: '/globalModal',
    component: './GloabalModal/index',
  },
  {
    name: 'dragDesignComponent',
    icon: 'table',
    path: '/dragDesignComponent',
    component: './DragDesignComponent/index',
  },
  {
    component: './404',
  },
];
