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
          backgroundColor: '#131313',
          transition: 'all 0.2s ease',
          '& > td.MuiTableCell-root': {
            color: '#0099ff'
          }
        }
      },
      hover: {}
    },
    MuiTableCell: {
      root: {
        '&$head': {
          background: '#3b679e',
          background: '-moz-linear-gradient(top,  #3b679e 0%, #2b88d9 50%, #207cca 51%, #7db9e8 100%)',
          background: '-webkit-linear-gradient(top,  #3b679e 0%,#2b88d9 50%,#207cca 51%,#7db9e8 100%)',
          background: 'linear-gradient(to bottom,  #3b679e 0%,#2b88d9 50%,#207cca 51%,#7db9e8 100%)',
          filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#3b679e', endColorstr='#7db9e8',GradientType=0 )`,
          boxShadow: '0.1rem 0.1rem 0.25rem rgba(0,0,0,0.75)',
          borderTop: '1px solid rgba(0,0,0,0.5)'
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
        background: '#3b679e',
        background: '-moz-linear-gradient(top,  #3b679e 0%, #2b88d9 50%, #207cca 51%, #7db9e8 100%)',
        background: '-webkit-linear-gradient(top,  #3b679e 0%,#2b88d9 50%,#207cca 51%,#7db9e8 100%)',
        background: 'linear-gradient(to bottom,  #3b679e 0%,#2b88d9 50%,#207cca 51%,#7db9e8 100%)',
        filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#3b679e', endColorstr='#7db9e8',GradientType=0 )`,
        boxShadow: '0.1rem 0.1rem 0.25rem rgba(0,0,0,0.5)',
        borderTop: '1px solid rgba(0,0,0,0.5)',
        color: '#FEFEFE'
      }
    },
    MuiDivider: {
      root: {
        height: '0.25rem',
        backgroundColor: '#666'
      }
    }
  }
});
export default supercell;