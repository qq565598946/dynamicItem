// 导入自己需要的组件
import { Button, Select,Table,Icon,TableColumn,DatePicker,Loading,Pagination,MessageBox,Notification,Breadcrumb,BreadcrumbItem,Dialog} from 'element-ui';
const element = {
  install: function (Vue) {
    Vue.use(Button)
    Vue.use(Select)
    Vue.use(Table)
    Vue.use(Icon)
    Vue.use(TableColumn)
    Vue.use(DatePicker)
    Vue.use(Loading)
    Vue.use(Pagination)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Dialog)
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
  }
}
export default element
