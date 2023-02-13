/* eslint-disable */

//날짜 유효성 체크 (윤달 포함)
export default function _fnisDate(vDate) {
	var vValue = vDate;
	var vValue_Num = vValue.replace(/[^0-9]/g, ""); //숫자를 제외한 나머지는 예외처리 합니다.
	
  //_fnToNull 함수는 아래 따로 적어두겠습니다. 
	// if (_fnToNull(vValue_Num) == "") {
	// 	alert("날짜를 입력 해 주세요.");
	// 	return false;
	// }

	//8자리가 아닌 경우 false
	// if (vValue_Num.length != 8) {
	// 	alert("날짜를 20200101 or 2020-01-01 형식으로 입력 해 주세요.");
	// 	return false;
	// }
	
  //8자리의 yyyymmdd를 원본 , 4자리 , 2자리 , 2자리로 변경해 주기 위한 패턴생성을 합니다.
	var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/;
	var dtArray = vValue_Num.match(rxDatePattern);

	if (dtArray == null) {
		return false;
	}

	//0번째는 원본 , 1번째는 yyyy(년) , 2번재는 mm(월) , 3번재는 dd(일) 입니다.
	var dtYear = dtArray[1];
	var dtMonth = dtArray[2];
	var dtDay = dtArray[3];

	//yyyymmdd 체크
	if (dtMonth < 1 || dtMonth > 12) {
		// alert("존재하지 않은 월을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if (dtDay < 1 || dtDay > 31) {
		// alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
		// alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if (dtMonth == 2) {
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay > 29 || (dtDay == 29 && !isleap)) {
			// alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
			return false;
		}
	}

	return true;
}