// themes/supercell.js
import { createMuiTheme } from '@material-ui/core/styles'
import scmagic from 'assets/fonts/scmagic.ttf';

const supercell = createMuiTheme({
  typography: {
    body1: {
      fontFamily: scmagic,
      fontWeight: 400,
      fontSize: 16,
      color: "red"
    }
  }
});

export default supercell;