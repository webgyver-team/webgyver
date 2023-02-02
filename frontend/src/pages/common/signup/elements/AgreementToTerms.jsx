import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBox from '@mui/material/Checkbox';

export default function ScrollDialog({ updateData }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [useCheck, setUseCheck] = React.useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUseCheck = (value) => {
    setUseCheck(() => value);
    updateData({ useCheck: value });
    handleClose();
  };

  const changeUseCheck = (event) => {
    setUseCheck(() => event.target.checked);
    updateData({ useCheck: event.target.checked });
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>약관 동의</h2>
      <CheckBox checked={useCheck} onClick={changeUseCheck} />
      <Button variant="text" onClick={handleClickOpen('body')}>
        이용약관 (필수)
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">약관 상세</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(() => '개인정보보호 동의 약관 안내드립니다...')
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleUseCheck(true)}>동의</Button>
          <Button onClick={() => handleUseCheck(false)}>미동의</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
