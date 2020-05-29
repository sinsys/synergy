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
    MuiTableCell: {
      root: {
        '&$head': {
          background: '#333'
        }
      }
    },
    MuiTableSortLabel: {
      root: {
        color: '#0099ff',
        '&$active, &:hover': {
          color: '#fff8c9'
        }
      },
      icon: {
        fill: '#CCC'
      }
    }
  }
});
console.log(supercell);
export default supercell;