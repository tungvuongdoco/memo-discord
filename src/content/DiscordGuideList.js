import React from 'react';

function DiscordGuideList() {
  return (
    <div>
      <h2>Hướng dẫn thêm bot Discord</h2>
      <p>Dưới đây là danh sách các bước để thêm bot vào server Discord của bạn:</p>
      <ol>
        <li>Đăng nhập vào tài khoản Discord</li>
        <li>Chọn server mà bạn muốn thêm bot vào</li>
        <li>Đi đến trang web của bot và sao chép token của bot</li>
        <li>Mở Discord và chọn server mà bạn muốn thêm bot vào</li>
        <li>Chọn biểu tượng "Settings" trên thanh menu bên phải</li>
        <li>Chọn "Members" từ thanh menu bên trái</li>
        <li>Chọn "Add Bot" và dán token của bot vào ô cung cấp</li>
        <li>Lưu lại các thay đổi và bot của bạn đã được thêm vào server</li>
      </ol>
    </div>
  );
}

export default DiscordGuideList;