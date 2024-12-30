import React, { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import Dialog from "@mui/material/Dialog";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Rating from '@mui/material/Rating';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setproducts] = useState([]);
  const [value, setValue] = useState(2);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const context = useContext(MyContext);

  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/orders?userid=${user?.userId}`).then((res) => {
      setOrders(res);
    });

    context.setEnableFilterTab(false);
  }, []);

  const showProducts = (id) => {
    fetchDataFromApi(`/api/orders/${id}`).then((res) => {
      setIsOpenModal(true);
      setproducts(res.products);
    });
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h2 className="hd">Đơn hàng</h2>

          <div className="table-responsive orderTable">
            <table className="table table-striped table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Id đơn hàng</th>
                  <th>Sản phẩm</th>
                  <th>Họ tên</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Tổng số tiền</th>
                  <th>Email</th>
                  <th>Id người dùng</th>
                  <th>Trạng thái đơn hàng</th>
                  <th>Đánh giá</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>

              <tbody>
                {orders?.length !== 0 &&
                  orders?.map((order, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            <span className="text-blue fonmt-weight-bold">
                              {order?.id}
                            </span>
                          </td>

                          <td>
                            <span
                              className="text-blue fonmt-weight-bold cursor"
                              onClick={() => showProducts(order?._id)}
                            >
                              Xem chi tiết
                            </span>
                          </td>
                          <td>{order?.name}</td>
                          <td>{order?.phoneNumber}</td>
                          <td>{order?.address}</td>

                          <td>{order?.amount}</td>
                          <td>{order?.email}</td>
                          <td>{order?.userid}</td>
                          <td>
                            {order?.status === "pending" ? (
                              <span className="badge badge-danger">
                                {order?.status}
                              </span>
                            ) : (
                              <span className="badge badge-success">
                                {order?.status}
                              </span>
                            )}
                          </td>
                          <td>
                          <Rating name="read-only" value={value} readOnly />
                          </td>
                          <td>{order?.date?.split("T")[0]}</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModal} className="productModal">
        <Button className="close_" onClick={() => setIsOpenModal(false)}>
          <MdClose />
        </Button>
        <h4 class="mb-1 font-weight-bold pr-5 mb-4">Sản phẩm</h4>

        <div className="table-responsive orderTable">
          <table className="table table-striped table-bordered">
            <thead className="thead-light">
              <tr>
                <th> Id Sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng số tiền</th>
              </tr>
            </thead>

            <tbody>
              {products?.length !== 0 &&
                products?.map((item, index) => {
                  return (
                    <tr>
                      <td>{item?.productId}</td>
                      <td style={{ whiteSpace: "inherit" }}>
                        <span>{item?.productTitle?.substr(0, 30) + "..."}</span>
                      </td>
                      <td>
                        <div className="img">
                          <img src={item?.image} />
                        </div>
                      </td>
                      <td>{item?.quantity}</td>
                      <td>
                        {item?.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>
                        {item?.subTotal.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
          
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Dialog>
    </>
  );
};

export default Orders;
