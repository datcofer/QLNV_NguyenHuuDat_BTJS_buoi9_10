// một thẻ chứa thông báo
// value dữ liệu người dùng nhập

// Kiểm tra xem người dùng đã nhập dữ liệu hay chưa (kiểm tra rỗng)
function checkEmptyValue(value, span) {
  if (value) {
    // xử lí khi dữ liệu được người dùng nhập vào
    // tham số span đại diện cho một câu lệnh DOM tới thẻ span thông báo
    span.innerHTML = "";
    return true;
  } else {
    // xử lí khi dữ liệu là chuỗi rỗng
    span.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  }
}

// Kiểm tra độ dài ký tự của dữ liệu nhập vào
// function xử lí kiểm tra độ dài tối thiểu và độ dài tối đa của dữ liệu nhập vào
//
function checkMinMaxValue(value, span, min, max) {
  let doDaiKyTu = value.length; // "cát tường" ==>9
  if (doDaiKyTu >= min && doDaiKyTu <= max) {
    // trường hợp đúng
    span.innerHTML = "";
    return true;
  } else {
    span.innerHTML = `Vui lòng nhập tối thiểu ${min} ký tự và tối đa ${max} ký tự`;
    return false;
  }
}

// Kiểm tra email người dùng
function checkEmailValue(value, span) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // let regexFacebookLink =
  //   /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/;

  // phương thức test ==> value ==> true | false
  let isValid = regexEmail.test(value);
  if (isValid) {
    // Đây là trường hợp khi dữ liệu người dùng là email và qua được phương thức test
    span.innerHTML = "";
    return true;
  } else {
    // Đây là trường hợp khi dữ liệu người dùng ko phải email
    span.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  }
}
// Kiểm tra mật khẩu người dùng
function checkPasswordValue(value, span) {
  let regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  // phương thức test ==> value ==> true | false
  let isValid = regexPass.test(value);
  if (isValid) {
    // Đây là trường hợp khi dữ liệu người dùng đúng yêu cầu các kí tự nhập vào và qua được phương thức test
    span.innerHTML = "";
    return true;
  } else {
    // Đây là trường hợp khi dữ liệu người dùng ko đúng yêu cầu
    span.innerHTML =
      "Vui lòng nhập mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  }
}
// Kiểm tra: Ngày làm không để trống, định dạng mm/dd/yyyy
function checkDatepicker(value, span) {
  let regexDatepicker = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  // phương thức test ==> value ==> true | false
  let isValid = regexDatepicker.test(value);
  if (isValid) {
    // Đây là trường hợp khi dữ liệu người dùng đúng định dạng mm/dd/yyyy và qua được phương thức test
    span.innerHTML = "";
    return true;
  } else {
    // Đây là trường hợp khi dữ liệu người dùng ko đúng định dạng
    span.innerHTML = "Vui lòng nhập đúng định dạng mm/dd/yyyy";
    return false;
  }
}
// Kiểm tra: Lương cơ bản 1 000 000 - 20 000 000, không để trống
// Kiểm tra: Số giờ làm trong tháng 80 - 200 giờ, không để trống
function checkMinMax(value, span, min, max) {
  let valueIn = value.trim(); // "cát tường" ==>9
  valueIn = parseInt(valueIn.replace(/\s/g, ""), 10);
  if (valueIn >= min && valueIn <= max) {
    // trường hợp đúng
    span.innerHTML = "";
    return true;
  } else {
    span.innerHTML = `Vui lòng nhập giá trị trong khoảng từ ${min} đến ${max}`;
    return false;
  }
}
// Kiểm tra: Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
function checkPositionValue(value, span) {
  let position = value.trim();
  if (
    position == "Giám đốc" ||
    position == "Trưởng phòng" ||
    position == "Nhân viên"
  ) {
    // trường hợp đúng
    span.innerHTML = "";
    return true;
  } else {
    span.innerHTML = `Vui lòng chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)`;
    return false;
  }
}

// Kiểm tra: Tên nhân viên phải là chữ, không để trống
function checkNameValue(value, span) {
  let regexName = /^[a-zA-Z\s]*$/;
  // phương thức test ==> value ==> true | false
  let isValid = regexName.test(value);
  if (isValid) {
    // Đây là trường hợp khi dữ liệu người dùng đúng định dạng là chữ và qua được phương thức test
    span.innerHTML = "";
    return true;
  } else {
    // Đây là trường hợp khi dữ liệu người dùng ko đúng định dạng
    span.innerHTML = "Vui lòng nhập đúng định dạng là chữ";
    return false;
  }
}
