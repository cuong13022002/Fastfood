import { Button } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineMoreTime } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../../Components/Header/SearchBox";
import { FaFacebookF } from "react-icons/fa6";

const Blog = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const closeSearch = () => {
    setIsOpenSearch(false);
  };
  return (
    <div className="container">
      <h1 className="text-center">BLOG</h1>
      <p className="text-center">
        Đây là trang blog, nơi bạn có thể đọc về các bài viết mới nhất của chúng
        tôi.
      </p>
      <div className="row mt-4">
        <div className="col-sm-8">
          <div>
            <img
              className="w-100"
              src="https://file.hstatic.net/1000359458/article/gian-hang-nafoods-tai-hoi-thao-doanh-nhan-2024_f068535730fd4212bb60394d0bd8f04f.jpg"
              alt="Blog Post 2"
            />
            <div>
              <div>
                <div className="d-flex align-items-center ">
                  <Link to="#">
                    <div className="d-flex align-items-center ">
                      <MdOutlineMoreTime />
                      <p className="mt-3 ml-1">Tháng 12, 2024</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <h2 className="mt-3">
              Sản Phẩm Nafoods Trưng Bày Tại Diễn Đàn Chuyển Hóa Lãnh Đạo & Tổ
              Chức
            </h2>
            <p className="w-100">
              Nafoods trưng bày các sản phẩm chế biến từ nông sản Việt tại hội
              thảo Doanh nhân – diễn đàn chuyển hoá lãnh đạo và tổ chức. Các sản
              phẩm đã nhận được nhiều sự quan tâm của các doanh nhân trong nước
              và quốc tế.
            </p>
            <Button className="btn-big btn-blue">Xem thêm</Button>
          </div>
          <div className="mt-3">
            <img
              className="w-100"
              src="https://file.hstatic.net/1000359458/article/cac-loai-hat-dieu_fe338176c56e4f998c35a85c1342e664.jpg"
              alt="Blog Post 2"
            />
            <div>
              <div>
                <div className="d-flex align-items-center ">
                  <Link to="#">
                    <div className="d-flex align-items-center ">
                      <MdOutlineMoreTime />
                      <p className="mt-3 ml-1">Tháng 12, 2024</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <h2 className="mt-3">
              BHạt Điều Có Mấy Loại? Cách Phân Loại Hạt Điều Trên Thị Trường
              Hiện Nay?
            </h2>
            <p className="w-100">
              Hạt điều có rất nhiều loại nhưng bạn có biết hạt điều có những
              loại nào và cách phân loại chúng ra sao không? Cùng Nafoods
              Consumer tìm hiểu nhé!
            </p>
            <Button className="btn-big btn-blue">Xem thêm</Button>
          </div>
          <div className="mt-3">
            <img
              className="w-100"
              src="https://file.hstatic.net/1000359458/article/nafoods-tai-hoi-cho-du-lich-quoc-te-va-hoi-cho-qua-tang-qua-luu-niem_182547a3423842cdab1764b9791c3b90.png"
              alt="Blog Post 2"
            />
            <div>
              <div>
                <div className="d-flex align-items-center ">
                  <Link to="#">
                    <div className="d-flex align-items-center ">
                      <MdOutlineMoreTime />
                      <p className="mt-3 ml-1">Tháng 12, 2024</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <h2 className="mt-3">
              Nafoods Trưng Bày Sản Phẩm Tại Hội Chợ Du Lịch Quốc Tế & Hội Chợ
              Triển Lãm Quốc Tế Quà Tặng, Quà Lưu Niệm
            </h2>
            <p className="w-100">
              Hưởng ứng chủ đề “Du lịch bền vững - Kiến tạo tương lai” tại Hội
              chợ ITE HCMC 2024, với mục tiêu phát triển bền vững cùng ngành
              nông nghiệp Việt, Nafoods đã tham gia trưng bày các sản phẩm nông
              sản Việt tại hội chợ du lịch quốc tế.
            </p>
            <Button className="btn-big btn-blue">Xem thêm</Button>
          </div>
          <div className="d-flex justify-content-center mt-5 mb-5">
            <Pagination count={10} color="primary" />
          </div>
        </div>
        <div className="col-sm-4">
          <div
            className={`headerSearchWrapper w-100 ${
              isOpenSearch === true && "open"
            }`}
          >
            <div className="d-flex align-items-center ">
              <SearchBox closeSearch={closeSearch} />
            </div>
          </div>
          <h4 className="p-3">Bài đăng phổ biến</h4>
          <div className="p-3">
            <Link to="#">
              <div className="d-flex align-items-center mt-3 border">
                <img
                  className="w-50"
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/blog-1.jpg"
                  alt="Blog Post 1"
                />
                <div className="info px-3">
                  <h6 className="mb-0">
                    The Evolution of Bacola: A Journey Through Time
                  </h6>
                  <p className="text-muted">Tháng 12, 2024</p>
                </div>
              </div>
            </Link>
            <Link to="#">
              <div className="d-flex align-items-center mt-3 border">
                <img
                  className="w-50"
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/blog-1.jpg"
                  alt="Blog Post 1"
                />
                <div className="info px-3">
                  <h6 className="mb-0">
                    The Evolution of Bacola: A Journey Through Time
                  </h6>
                  <p className="text-muted">Tháng 12, 2024</p>
                </div>
              </div>
            </Link>
            <Link to="#">
              <div className="d-flex align-items-center mt-3 border">
                <img
                  className="w-50"
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/blog-1.jpg"
                  alt="Blog Post 1"
                />
                <div className="info px-3">
                  <h6 className="mb-0">
                    The Evolution of Bacola: A Journey Through Time
                  </h6>
                  <p className="text-muted">Tháng 12, 2024</p>
                </div>
              </div>
            </Link>
          </div>
          <h4 className="p-3">Truyền thông xã hội</h4>
          <div className="p-3">
            <Link to="#">
              <div className="d-flex align-items-center mt-3 border">
                <img
                  className="w-50"
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/blog-1.jpg"
                  alt="Blog Post 1"
                />
                <div className="info px-3">
                  <h6 className="mb-0">
                    The Evolution of Bacola: A Journey Through Time
                  </h6>
                  <p className="text-muted">Tháng 12, 2024</p>
                </div>
              </div>
            </Link>
          </div>
          <h4 className="p-3">Tiện ích</h4>
          <div className="p-3">
            <img
              src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif"
              className="w-100 cursor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
