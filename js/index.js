let arrNhanVien = getLocalStorage(); //3 ==> đưa lên giao diện
renderArrNhanVien();

// getValueNhanVien
function getValueNhanVien() {
  // sử dụng querySelectorAll
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  // khởi tạo một đối tượng từ lớp đối tượng NhanVien
  let nhanVien = new NhanVien();
  let isValid = true;
  // Phép toán nhị phân true (1), false(0)
  // true & false ==> 1 & 0 ==> 0(false)
  // true & true ==> 1 & 1 ==> 1 (true)

  for (let field of arrField) {
    // destructuring
    let { value, id } = field; // tknv // name
    // thực hiện lấy data-attribute của input
    let dataValidation = field.getAttribute("data-validation");
    console.log(dataValidation);
    nhanVien[id] = value;

    // Thực hiện validation dữ liệu người dùng
    // Thực hiện từ lệnh DOM đang có tới các input và select,
    // sẽ sử dụng phương thức parentElement để DOM tới thẻ cha gần nhất
    let theCha = field.parentElement;
    let theSpanThongBao = document.querySelector("#tb" + id);
    // console.log(theCha.querySelector("span"));

    let isEmpty = checkEmptyValue(value, theSpanThongBao); // true false
    isValid &= isEmpty;
    // xử lí nếu dữ liệu rỗng thì sẽ không xử lí bất kỳ hành động nào bên dưới
    if (!isEmpty) {
      continue;
    }

    if (dataValidation == "doDai") {
      isValid &= checkMinMaxValue(value, theSpanThongBao, 4, 6);
    } else if (dataValidation == "email") {
      isValid &= checkEmailValue(value, theSpanThongBao);
    } else if (dataValidation == "password") {
      isValid &= checkPasswordValue(value, theSpanThongBao);
    } else if (dataValidation == "name") {
      isValid &= checkNameValue(value, theSpanThongBao);
      // } else if (dataValidation == "datepicker") {
      //   isValid &= checkDatepicker(value, theSpanThongBao);
      // } else if (dataValidation == "chucvu") {
      // isValid &= checkPositionValue(value, theSpanThongBao);
    } else if (dataValidation == "luongCB") {
      isValid &= checkMinMax(value, theSpanThongBao, 1000000, 20000000);
    } else if (dataValidation == "gioLam") {
      isValid &= checkMinMax(value, theSpanThongBao, 80, 200);
    }
  }

  // thực hiện kiểm tra nếu isValid mang giá trị false thì return và không trả về nhanVien
  if (!isValid) {
    return;
  }
  return nhanVien;
}

//Thêm Nhân Viên
let formQLNV = document.getElementById("formQLNV");

function resetAllSpan() {
  // Select all spans with class 'sp-thongbao' inside the form
  let thongbaoSpans = formQLNV.querySelectorAll(".sp-thongbao");

  // Iterate through each span and reset its content
  thongbaoSpans.forEach(function (span) {
    span.innerHTML = ""; // Reset the content
  });
}

formQLNV.onsubmit = function (event) {
  // ngăn reload lại trang khi chạy sự kiện onsubmit
  event.preventDefault();
  console.log("Tôi là submit");
  // // Sử dụng querySelectorAll
  // let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  // // console.log(arrField);
  // let nhanVien = new NhanVien();
  // for (let field of arrField) {
  //   // console.log(field.value);
  //   // console.log(field.id);

  //   //destructuring
  //   let { value, id } = field; //tknv
  //   nhanVien[id] = value;
  // }

  // thực hiện chạy getValueNhanVien để lấy dữ liệu từ form
  let nhanVien = getValueNhanVien();

  if (nhanVien !== undefined) {
    arrNhanVien.push(nhanVien);
    // lưu trữ mảng đã được thêm 1 phần tử mới vào localStorage
    saveLocalStorage();
    console.log(arrNhanVien);

    // Hiển thị dữ liệu từ mảng lên giao diện
    renderArrNhanVien(arrNhanVien);

    hienThiThongBao("Thêm nhân viên thành công", 3000, "bg-success");
  }

  hienThiThongBao("Thêm nhân viên thất bại", 3000, "bg-dark");
  // Phương thức reset
  formQLNV.reset();
};
// Hiển thị dữ liệu trong mảng lên giao diện
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    //nhanVien là object đang có dữ liệu và không có phương thức tính điểm trung bình(được cho)
    // newNhanVien được khởi tạo từ lớp đối tượng NhanVien có phương thức nhưng không có dữ liệu(được nhận)
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let { tknv, name, email, datepicker } = newNhanVien;
    let tongLuong = newNhanVien.tinhTongLuong();
    let xepLoai = newNhanVien.xepLoai();
    let chucvu = newNhanVien.mapChucvu();
    content += `
        <tr>
        <td>${tknv}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${datepicker}</td>
        <td>${chucvu}</td>
        <td>${tongLuong}</td>
        <td id="loai">${xepLoai}</td>
        <td>
        <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xóa</button>
        <button onclick=" getInfoNhanVien('${tknv}')" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Sửa</button>
        </td>
        </tr>
        `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

// Thực hiện lưu trữ localStrorage
//[]==>["a"]==>["a","b"]==>
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}
// thực hiện lấy dữ liệu từ localStrorage
function getLocalStorage(key = "arrNhanVien") {
  // lấy dữ liệu từ localStorage lên
  let dataLocal = localStorage.getItem(key);
  // convert từ chuỗi JSON về object
  let newDataLocal = JSON.parse(dataLocal);
  console.log(newDataLocal);
  //   if (newDataLocal) {
  //     return newDataLocal;
  //   } else {
  //       return [];
  //   }
  return newDataLocal ? newDataLocal : [];
}
getLocalStorage();

// Xóa nhân viên

function deleteNhanVien(tknv) {
  // findIndex ==>index ==>không tìm thấy trả về -1
  // find ==> item ==> không tìm thấy trả về undefind
  console.log(tknv);
  // Tìm kiếm vị trí index của phần tử cần xóa
  let index = arrNhanVien.findIndex((item, index) => {
    // ==> object
    return item.tknv == tknv;
  });
  if (index != -1) {
    // Sử dụng hàm splice để xóa phần tử khỏi mảng
    arrNhanVien.splice(index, 1);
    renderArrNhanVien();
    saveLocalStorage();
    hienThiThongBao("Xóa nhân viên thành công", 3000, "bg-danger");
  }
  console.log(arrNhanVien);
  // Sử dụng hàm splice để xóa phần tử khỏi mảng
}

// Lấy thông tin nhân viên
function getInfoNhanVien(tknv) {
  console.log(tknv);
  // let nhanVien ==> find
  // đưa dữ liệu lên các input của form
  let nhanVien = arrNhanVien.find((item = NhanVien, index) => {
    return item.tknv == tknv;
  });
  if (nhanVien) {
    // thao tác đưa dữ liệu lên giao diện
    let arrField = document.querySelectorAll(
      "#formQLNV input, #formQLNV select"
    );
    for (let item of arrField) {
      let { id } = item; // tknv
      item.value = nhanVien[id];
    }
    // dom tới input có id tknv và thực hiện ngăn chặn chỉnh sửa
    document.getElementById("tknv").readOnly = true;
  }
}

// Update Nhân Viên
// Thực hiện tạo một lệnh DOM tới button cập nhật và gắn hàm updateNhanVien
function updateNhanVien() {
  // thực hiện xử lí lấy dữ liệu từ form (coi lại xử lí thêm nhân viên)
  // ==> nhìn thử thêm nhân viên và update có gì giống nhau ? ==> có thể tách hàm không
  let nhanVien = getValueNhanVien();
  if (!nhanVien) {
    return;
  }
  // tìm kiếm vị trí của phần tử đang cần chỉnh sửa trong mảng ==> findIndex
  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == nhanVien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
  }
  // chạy lại render và động bộ dữ liệu với localStorage
  renderArrNhanVien();
  saveLocalStorage();
  hienThiThongBao("Cập nhật nhân viên thành công", 3000, "bg-warning");
  formQLNV.reset();
  document.getElementById("tknv").readOnly = false;
  // cho phép input tài khoản nhân viên được thực hiện nhập dữ liệu
}

document.getElementById("btnCapNhat").onclick = updateNhanVien;

// Xử lí thông báo
function hienThiThongBao(text, duration, className) {
  Toastify({
    text,
    className,
    duration,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    // style: {
    //   // background: "linear-gradient(to right, #00b09b, #96c93d)",
    //   background: "red",
    // },
    backgroundColor: "orange",
  }).showToast();
}
// Tìm kiếm nhân viên
document.getElementById("searchName").oninput = function (event) {
  // console.log(event.target.value); // â ==> a

  let newKeyWord = removeVietnameseTones(event.target.value)
    .trim()
    .toLowerCase();
  // console.log(newKeyWord);
  let arrFilter = arrNhanVien.filter((item, index) => {
    let newTenNV = removeVietnameseTones(item.name).trim().toLowerCase();
    console.log(item);
    return newTenNV.includes(newKeyWord);
  });
  console.log(arrFilter);
  renderArrNhanVien(arrFilter);
};
