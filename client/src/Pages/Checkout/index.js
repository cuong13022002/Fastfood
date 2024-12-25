import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";

import { MyContext } from "../../App";
import { fetchDataFromApi, postData, deleteData } from "../../utils/api";

import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [formFields, setFormFields] = useState({
    fullName: "",
    streetAddressLine: "",
    phoneNumber: "",
    email: "",
  });

  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setEnableFilterTab(false);
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res);

      setTotalAmount(
        res.length !== 0 &&
          res
            .map((item) => parseInt(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
      );
    });
  }, []);

  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const context = useContext(MyContext);
  const history = useNavigate();

  const checkout = (e) => {
    e.preventDefault();

    console.log(cartData);

    console.log(formFields);
    if (formFields.fullName === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng nhập họ tên ",
      });
      return false;
    }

    if (formFields.streetAddressLine1 === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng nhập địa chỉ",
      });
      return false;
    }

    if (formFields.phoneNumber === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng nhập số điện thoại ",
      });
      return false;
    }

    if (formFields.email === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng nhập email",
      });
      return false;
    }

    const addressInfo = {
      name: formFields.fullName,
      phoneNumber: formFields.phoneNumber,
      address: formFields.streetAddressLine,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    const user = JSON.parse(localStorage.getItem("user"));

    const payLoad = {
      name: addressInfo.name,
      phoneNumber: formFields.phoneNumber,
      address: addressInfo.address,
      amount: parseInt(totalAmount),
      email: user.email,
      userid: user.userId,
      products: cartData,
      date: addressInfo?.date,
    };

    postData(`/api/orders/create`, payLoad).then((res) => {
      fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
        res?.length !== 0 &&
          res?.map((item) => {
            deleteData(`/api/cart/${item?.id}`).then((res) => {});
          });
        setTimeout(() => {
          context.getCartData();
        }, 1000);
        history("/orders");
      });
    });
  };

  return (
    <section className="section">
      <div className="container">
        <form className="checkoutForm" onSubmit={checkout}>
          <div className="row">
            <div className="col-md-8">
              <h2 className="hd">chi tiết thanh toán</h2>

              <div className=" mt-3">
                <div className="form-group">
                  <TextField
                    label="Họ tên *"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="fullName"
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <TextField
                      label="Địa chỉ"
                      variant="outlined"
                      className="w-100"
                      size="small"
                      name="streetAddressLine"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label="Số điện thoại"
                      variant="outlined"
                      className="w-100"
                      size="small"
                      name="phoneNumber"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label="Email"
                      variant="outlined"
                      className="w-100"
                      size="small"
                      name="email"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card orderInfo">
                <h4 className="hd">Thanh toán</h4>
                <div className="table-responsive mt-3">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartData?.length !== 0 &&
                        cartData?.map((item, index) => {
                          return (
                            <tr>
                              <td>
                                {item?.productTitle?.substr(0, 20) + "..."}{" "}
                                <b>× {item?.quantity}</b>
                              </td>

                              <td>
                                {item?.subTotal?.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </td>
                            </tr>
                          );
                        })}

                      <tr>
                        <td>Tổng tiền </td>

                        <td>
                          {(cartData?.length !== 0
                            ? cartData
                                ?.map(
                                  (item) => parseInt(item.price) * item.quantity
                                )
                                .reduce((total, value) => total + value, 0)
                            : 0
                          )?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button
                  type="submit"
                  className="btn-blue bg-red btn-lg btn-big"
                >
                  <IoBagCheckOutline /> &nbsp; Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
