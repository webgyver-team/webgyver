import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBox from '@mui/material/Checkbox';
import styled from 'styled-components';

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
      <AgreementTitle>약관 동의</AgreementTitle>
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
            <span>
              안녕하세요. 저희는 SSAFY 8기 대전 1반 B101 Webgyver 팀입니다. 저희
              서비스가 드리는 여러분과의 약속입니다.
            </span>
            <br />
            <br />
            <span>
              1. 개인정보의 처리 목적(‘http://webgyver.site/’ 이하 ‘Webgyver’)
              은(는) 자체 컨텐츠 제공의 목적을 위하여 개인정보를 처리하고
              있으며, 그 외의 용도로는 이용하지 않습니다. 2. 정보주체와
              법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써
              다음과 같은 권리를 행사할 수 있습니다. 정보주체는 Webgyver에 대해
              언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
              있습니다. (1) 개인정보 열람요구 (2) 오류 등이 있을 경우 정정 요구
              (3) 삭제요구 (4) 처리정지 요구
            </span>
            <br />
            <br />
            <span>
              3. 처리하는 개인정보의 항목 작성 Webgyver는 다음의 개인정보 항목을
              처리하고 있습니다. - 필수항목: 이름, 주민등록번호 앞 7자리,
              전화번호, 카드정보
            </span>
            <br />
            <br />
            <span>
              4. 개인정보의 파기는 원칙적으로 개인정보 처리목적이 달성된
              경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차 및
              방법은 다음과 같습니다. 이용자가 입력한 정보는 목적 달성 후 별도의
              DB에 옮겨져 (종이의 경우 별도의 서류) 내부 방침 및 기타 관련
              법령에 따라 일정 기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로
              옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로
              이용되지 않습니다.
            </span>
            <br />
            <br />
            <span>
              5. 개인정보 보호책임자 작성 Webgyver는 개인정보 처리에 관한 업무를
              총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
              피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
              있습니다. ▶ 개인정보 보호책임자성명: OOO 연락처: OOO @ OOO.com
              정보주체께서는 Webgyver의 서비스(또는 사업)을 이용하시면서 발생한
              모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
              개인정보 보호 책임자에 문의하실 수 있습니다.
            </span>
            <br />
            <br />
            <span>
              Webgyver는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴
              것입니다.
            </span>
            <br />
            <br />
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

const AgreementTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`;
