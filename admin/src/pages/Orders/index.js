import React, { useContext } from "react";
import { editData, fetchDataFromApi } from "../../utils/api";
import { useState } from "react";
import { useEffect } from "react";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import { MdOutlineDateRange } from "react-icons/md";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MyContext } from "../../App";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const columns = [
  { id: "orderId", label: "Id đơn hàng", minWidth: 150 },
  {
    id: "products",
    label: "Sản phẩm",
    minWidth: 150,
  },
  {
    id: "name",
    label: "Họ tên",
    minWidth: 170,
  },
  {
    id: "phoneNumber",
    label: "Số điện thoại",
    minWidth: 150,
  },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 200,
  },
  {
    id: "totalAmount",
    label: "Số tiền",
    minWidth: 120,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 150,
  },
  {
    id: "userId",
    label: "ID người dùng",
    minWidth: 150,
  },
  {
    id: "orderStatus",
    label: "Trạng thái đơn hàng",
    minWidth: 120,
  },
  {
    id: "printOrder",
    label: "In đơn hàng",
    minWidth: 140,
  },
  {
    id: "dateCreated",
    label: "Ngày tạo",
    minWidth: 140,
  },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setproducts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [singleOrder, setSingleOrder] = useState();
  const [statusVal, setstatusVal] = useState(null);

  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);

  const [page1, setPage1] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage1(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi(`/api/orders`).then((res) => {
      setOrders(res);
    });
  }, []);

  const showProducts = (id) => {
    fetchDataFromApi(`/api/orders/${id}`).then((res) => {
      setIsOpenModal(true);
      setproducts(res.products);
    });
  };

  const handleChangeStatus = (e, orderId) => {
    setstatusVal(e.target.value);
    setIsLoading(true);
    context.setProgress(40);
    fetchDataFromApi(`/api/orders/${orderId}`).then((res) => {
      const order = {
        name: res.name,
        phoneNumber: res.phoneNumber,
        address: res.address,
        amount: parseInt(res.amount),
        email: res.email,
        userid: res.userId,
        products: res.products,
        status: e.target.value,
      };

      editData(`/api/orders/${orderId}`, order).then((res) => {
        fetchDataFromApi(`/api/orders`).then((res) => {
          setOrders(res);
        });
        context.setProgress(100);
        setIsLoading(false);
      });

      setSingleOrder(res.products);
    });
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Danh sách đơn hàng</h5>

          <div className="ml-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />

              <StyledBreadcrumb
                label="Đơn hàng"
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders?.length !== 0 &&
                    orders
                      ?.slice(
                        page1 * rowsPerPage,
                        page1 * rowsPerPage + rowsPerPage
                      )
                      ?.reverse()
                      ?.map((order, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              <span className="text-blue fonmt-weight-bold">
                                {order?._id}
                              </span>
                            </TableCell>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              <span
                                className="text-blue fonmt-weight-bold cursor"
                                onClick={() => showProducts(order?._id)}
                              >
                                Xem chi tiết
                              </span>
                            </TableCell>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              {order?.name}
                            </TableCell>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              {order?.phoneNumber}
                            </TableCell>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              {order?.address}
                            </TableCell>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              {order?.amount?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </TableCell>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              {order?.email}
                            </TableCell>
                            <td>{order?.userid}</td>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              <Select
                                disabled={isLoading === true ? true : false}
                                value={
                                  order?.status !== null
                                    ? order?.status
                                    : statusVal
                                }
                                onChange={(e) =>
                                  handleChangeStatus(e, order?._id)
                                }
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                size="small"
                                className="w-100"
                              >
                                <MenuItem value={null}>
                                  <em value={null}>Không</em>
                                </MenuItem>

                                <MenuItem value="pending">
                                  Chưa xác nhận
                                </MenuItem>

                                <MenuItem value="confirm">Xác nhận</MenuItem>

                                <MenuItem value="delivered">
                                  Đã giao hàng
                                </MenuItem>
                              </Select>
                            </TableCell>
                           
                            <TableCell style={{ minWidth: columns.minWidth }}>
                            <Button variant="contained">FDF</Button>
                            </TableCell>
                            <TableCell style={{ minWidth: columns.minWidth }}>
                              <MdOutlineDateRange />{" "}
                              {order?.date?.split("T")[0]}
                            </TableCell>
          
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={orders?.length}
              rowsPerPage={rowsPerPage}
              page={page1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>

      <Dialog open={isOpenModal} className="productModal">
        <Button className="close_" onClick={() => setIsOpenModal(false)}>
          <MdClose />
        </Button>
        <h4 class="mb-1 font-weight-bold pr-5 mb-4">Sản phẩm</h4>

        <div className="table-responsive orderTable">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
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
