import PropTypes from 'prop-types'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'


const ExportToExcel = ({ dataSet, className }) => {
  const fileType = 'xlsx'

  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSet)
    const wb = { Sheets: { data: worksheet }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, 'myfile' + '.xlsx')
  }

  return (
    <button onClick={exportCSV} className={className}>
      Download
    </button>
  )
}

export default ExportToExcel

ExportToExcel.propTypes = {
  dataSet: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired
}
