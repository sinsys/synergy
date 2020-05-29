// themes/supercell.js
import { createMuiTheme } from '@material-ui/core/styles'
import 'base.scss';

const supercell = createMuiTheme({
  typography: {
    body1: {
      fontFamily: 'sctitle'
    },
    body2: {
      fontFamily: 'sctitle'
    }
  },
  palette: {
    action: {
      selected: 'rgba(255,255,255,0.2)',
      hover: 'rgba(150,150,255,0.2)',
      disabled: '#9B9B9B'
    }
  },
  overrides: {
    MuiTableRow: {
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#004080'
        },
        '&:nth-of-type(even)': {
          backgroundColor: '#003366'
        },
        '&:hover, &:focus': {
          backgroundColor: '#333'
        }
      },
      hover: {}
    },
    MuiTableCell: {
      root: {
        '&$head': {
          background: '#333'
        },
        borderBottom: '0'
      },
      body: {
        color: '#FEFEFE'
      }
    },
    MuiTableSortLabel: {
      root: {
        color: '#FEFEFE',
        fontFamily: 'sctitle',
        '&$active, &:hover': {
          color: '#fff8c9'
        }
      },
      icon: {
        fill: '#CCC'
      }
    },
    MuiTablePagination: {
      root: {
        background: '#333',
        color: '#FEFEFE'
      }
    }
  }
});
export default supercell;