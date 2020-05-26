// themes/supercell.js
import { createMuiTheme } from '@material-ui/core/styles'

const supercell = createMuiTheme({
  typography: {
    body1: {
      fontFamily: 'sctitle'
    }
  },
  palette: {
    action: {
        selected: 'rgba(255,255,255,0.2)',
        hover: 'rgba(150,150,255,0.2)',
        disabled: '#9B9B9B'
    }
}
});

export default supercell;