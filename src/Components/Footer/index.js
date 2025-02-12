import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { TbDiscount2 } from "react-icons/tb";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Coupon from "../../assets/images/coupon.png";
import Button from "@mui/material/Button";
import { IoMailOutline } from "react-icons/io5";
import Banners from "../banners/index";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";

const Footer = () => {

  return (
    <>
      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">
                Giảm giá 20% cho đơn hàng đầu tiên của bạn
              </p>
              <h3 className="text-white">
                Tham gia gian hàng của chúng tôi và nhận được...
              </h3>
              <p className="text-light">
                Hãy tham gia đăng ký email của chúng tôi ngay bây giờ để nhận
                thông tin cập nhật về
                <br />
                chương trình khuyến mãi và phiếu giảm giá.
              </p>

              <form className="mt-4">
                <IoMailOutline />
                <input type="text" placeholder="Email của bạn" />
                <Button>Gửi</Button>
              </form>
            </div>

            <div className="col-md-6 ">
              <img src={Coupon} className=""/>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="topInfo row">
            <div className="col d-flex align-items-center">
              <span>
                <LuShirt />
              </span>
              <span className="ml-2">Sản phẩm tươi ngon mỗi ngày</span>
            </div>

            <div className="col d-flex align-items-center">
              <span>
                <TbTruckDelivery />
              </span>
              <span className="ml-2">Giao hàng miễn phí </span>
            </div>

            <div className="col d-flex align-items-center">
              <span>
                <TbDiscount2 />
              </span>
              <span className="ml-2">Giảm giá lớn hàng ngày</span>
            </div>

            <div className="col d-flex align-items-center">
              <span>
                <CiBadgeDollar />
              </span>
              <span className="ml-2">Giá tốt nhất trên thị trường</span>
            </div>
          </div>

          <div className="row mt-5 linksWrap">
            <div className="col">
              <h5>TRÁI CÂY & RAU CỦ</h5>
              <ul>
                <li>
                  <Link to="#">Rau Tươi</Link>
                </li>
                <li>
                  <Link to="#">Thảo dược & Gia vị</Link>
                </li>
                <li>
                  <Link to="#">Trái cây tươi</Link>
                </li>

                <li>
                  <Link to="#">Trái cây & Rau lạ</Link>
                </li>
                <li>
                  <Link to="#">Sản phẩm đóng gói</Link>
                </li>
                <li>
                  <Link to="#">Khay tiệc</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>BỮA SÁNG & SỮA</h5>
              <ul>
                <li>
                  <Link to="#">Rau Tươi</Link>
                </li>
                <li>
                  <Link to="#">Thảo dược & Gia vị</Link>
                </li>
                <li>
                  <Link to="#">Trái cây tươi</Link>
                </li>

                <li>
                  <Link to="#">Trái cây & Rau lạ</Link>
                </li>
                <li>
                  <Link to="#">Sản phẩm đóng gói</Link>
                </li>
                <li>
                  <Link to="#">Khay tiệc</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>THỊT & HẢI SẢN</h5>
              <ul>
                <li>
                  <Link to="#">Rau Tươi</Link>
                </li>
                <li>
                  <Link to="#">Thảo dược & Gia vị</Link>
                </li>
                <li>
                  <Link to="#">Trái cây tươi</Link>
                </li>

                <li>
                  <Link to="#">Trái cây & Rau lạ</Link>
                </li>
                <li>
                  <Link to="#">Sản phẩm đóng gói</Link>
                </li>
                <li>
                  <Link to="#">Khay tiệc</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>ĐỒ UỐNG</h5>
              <ul>
                <li>
                  <Link to="#">Rau Tươi</Link>
                </li>
                <li>
                  <Link to="#">Thảo dược & Gia vị</Link>
                </li>
                <li>
                  <Link to="#">Trái cây tươi</Link>
                </li>

                <li>
                  <Link to="#">Trái cây & Rau lạ</Link>
                </li>
                <li>
                  <Link to="#">Sản phẩm đóng gói</Link>
                </li>
                <li>
                  <Link to="#">Khay tiệc</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>BÁNH MÌ </h5>
              <ul>
                <li>
                  <Link to="#">Rau Tươi</Link>
                </li>
                <li>
                  <Link to="#">Thảo dược & Gia vị</Link>
                </li>
                <li>
                  <Link to="#">Trái cây tươi</Link>
                </li>

                <li>
                  <Link to="#">Trái cây & Rau lạ</Link>
                </li>
                <li>
                  <Link to="#">Sản phẩm đóng gói</Link>
                </li>
                <li>
                  <Link to="#">Khay tiệc</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="copyright mt-3 pt-3 pb-3 d-flex">
            {/* <p className="mb-0">Copyright 2024. All rights reserved</p> */}
            <ul className="list list-inline ml-auto mb-0 socials">
              <li className="list-inline-item">
                <Link to="#">
                  <FaFacebookF />
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="#">
                  <FaTwitter />
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="#">
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
