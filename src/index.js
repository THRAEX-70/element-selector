import CardBox from '~/card-box'
import DialogBox from '~/dialog-box'
import InputCarrier from '~/input-carrier'
import ListSelector from '~/list-selector'
import Pagination from '~/pagination'
import PaginationSelection from '~/pagination-selection'
import PaginationTable from '~/pagination-table'
import Table from '~/table'
import TreeSelection from '~/tree-selection'
import TreeSelector from '~/tree-selector'

const components = [
  CardBox,
  DialogBox,
  InputCarrier,
  ListSelector,
  Pagination,
  PaginationSelection,
  PaginationTable,
  Table,
  TreeSelection,
  TreeSelector
]

const install = Vue =>  components.forEach(c => Vue.component(c.name, c))

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  CardBox,
  DialogBox,
  InputCarrier,
  ListSelector,
  Pagination,
  PaginationSelection,
  PaginationTable,
  Table,
  TreeSelection,
  TreeSelector
}

export default { install }
