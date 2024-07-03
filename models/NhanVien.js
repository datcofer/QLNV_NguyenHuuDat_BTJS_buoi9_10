class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = 0;
  chucvu = "";
  gioLam = "";
  // Phương thức
  // Tính Tổng Lương
  tinhTongLuong = function () {
    const multipliers = {
      GD: 3,
      TP: 2,
      NV: 1,
    };

    return this.luongCB * (multipliers[this.chucvu] || 0);
  };

  mapChucvu = function () {
    const mapChucvu = {
      GD: "Giám đốc",
      TP: "Trưởng phòng",
      NV: "Nhân viên",
    };

    return mapChucvu[this.chucvu];
  };

  // Phương Thúc Xếp Loại
  xepLoai = function () {
    let gioLam = this.gioLam;
    let xepLoai = "";
    if (gioLam >= 192) {
      xepLoai = "NV Xuất Sắc";
    } else if (gioLam >= 176 && gioLam < 192) {
      xepLoai = "NV Giỏi";
    } else if (gioLam >= 160 && gioLam < 176) {
      xepLoai = "NV Khá";
    } else {
      xepLoai = "NV Trung Bình";
    }
    return xepLoai;
  };
}
