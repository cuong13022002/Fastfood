import { Button } from "@mui/material";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
  return (
    <div className="container">
      <h2 className="text-center">LIÊN HỆ</h2>
      <p className="text-center">
        Chúng tôi luôn cung cấp sản phẩm tốt nhất và chính xác nhất cho bạn. Hãy
        liên hệ với chúng tôi để đặt hàng hoặc thắc mắc gì đó.
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="shadow p-3 ">
            <h4>Thông tin liên hệ</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <CiLocationOn className="me-2" />
                Quốc Oai , Hà Nội
              </li>
              <li className="list-group-item">
              <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Vui lòng nhập email"
                />
              </li>
              <li className="list-group-item">
              <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Vui lòng nhập số điện thoại"
                />
              </li>
            </ul>
          </div>
          <div className="mt-2 shadow p-3 ">
            <form>
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Tiêu đề</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Nội dung</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  
                ></textarea>
              </div>
              <Button type="submit" className="btn-big btn-blue mb-5 ">
                Gửi
              </Button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5674191431162!2d105.59001812599743!3d20.969880139796818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345a9dbc6a8b05%3A0xfff76db6eda8311a!2zTGnDqm4gVHJpLCBRdeG7kWMgT2FpLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1732169107280!5m2!1svi!2s"
            width="600"
            height="730"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="text-center mt-5">


        
      </div>
    </div>
  );
};

export default Contact;
