import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLanguage } from "react-icons/fa6";
import logo1 from "../../assets/images/deliveryman.png";
import Button from "@mui/material/Button";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";

import { FaRegBell } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { IoShieldHalfSharp } from "react-icons/io5";
import Divider from "@mui/material/Divider";
import { MyContext } from "../../App";
import UserAvatarImgComponent from "../userAvatarImg";

import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpennotificationDrop);

  const [totalOrders, setTotalOrders] = useState();

  const context = useContext(MyContext);

  const history = useNavigate();

  useEffect(() => {
    fetchDataFromApi("/api/orders/get/count").then((res) => {
      setTotalOrders(res.orderCount);
    });
  }, []);
  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenotificationsDrop = () => {
    setisOpennotificationDrop(true);
  };

  const handleClosenotificationsDrop = () => {
    setisOpennotificationDrop(false);
  };

  const changeTheme = () => {
    if (context.theme === "dark") {
      context.setTheme("light");
    } else {
      context.setTheme("dark");
    }
  };

  const logout = () => {
    localStorage.clear();

    setAnchorEl(null);

    context.setAlertBox({
      open: true,
      error: false,
      msg: "Logout successfull",
    });

    setTimeout(() => {
      history("/login");
    }, 2000);
  };

  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100">
            {/* Logo Wraooer */}
            <div className="col-sm-2 part1 pr-0">
              <Link to={"/"} className="d-flex align-items-center logo">
                <img src={logo1} />
                <span className="ml-2">FASTFOOD</span>
              </Link>
            </div>

            {context.windowWidth > 992 && (
              <div className="col-sm-3 d-flex align-items-center part2">
                <Button
                  className="rounded-circle mr-3"
                  onClick={() =>
                    context.setIsToggleSidebar(!context.isToggleSidebar)
                  }
                >
                  {context.isToggleSidebar === false ? (
                    <MdMenuOpen />
                  ) : (
                    <MdOutlineMenu />
                  )}
                </Button>
              </div>
            )}

            <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
              <Button className="rounded-circle mr-3" onClick={changeTheme}>
                {context.theme === "light" ? (
                  <MdNightlightRound />
                ) : (
                  <MdOutlineLightMode />
                )}
              </Button>

              <div className="dropdownWrapper position-relative">
                <Button
                  className="rounded-circle mr-3"
                  onClick={handleOpenotificationsDrop}
                >
                  <FaRegBell />
                </Button>

                {context.windowWidth < 992 && (
                  <Button
                    className="rounded-circle mr-3"
                    onClick={() => context.openNav()}
                  >
                    <IoMenu />
                  </Button>
                )}

                <Menu
                  anchorEl={isOpennotificationDrop}
                  className="notifications dropdown_list"
                  id="notifications"
                  open={openNotifications}
                  onClose={handleClosenotificationsDrop}
                  onClick={handleClosenotificationsDrop}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <div className="head pl-3 pb-0">
                    <h4>Thông báo</h4>

                    
                  </div>

                  <Divider className="mb-1" />

                  <div className="scroll">
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                          <UserAvatarImgComponent
                            img={
                              "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/471313709_2597198994004301_197820122441168913_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFJDLTS3sqQXH0pwyrTRsAdVT_NYMMMNVJVP81gwww1UqTmluyby7aGhY_5lLWnOck9tQt6PGQsJRt_NF9MUzDz&_nc_ohc=uLpeaNjKwqgQ7kNvgHnNfz_&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AUz5qa64qT9t-meyEW-R1nd&oh=00_AYCkU--fYcT3THT5DmGkd9elzbDNSHJH7BsF2exXIIqRsw&oe=676FE286"
                            }
                          />
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Cường Nguyễn</b>
                              đã thêm vào giỏ hàng
                            </span>
                          </h4>
                          <p className="text-sky mb-0">33 phút trước</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/471313709_2597198994004301_197820122441168913_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFJDLTS3sqQXH0pwyrTRsAdVT_NYMMMNVJVP81gwww1UqTmluyby7aGhY_5lLWnOck9tQt6PGQsJRt_NF9MUzDz&_nc_ohc=uLpeaNjKwqgQ7kNvgHnNfz_&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AUz5qa64qT9t-meyEW-R1nd&oh=00_AYCkU--fYcT3THT5DmGkd9elzbDNSHJH7BsF2exXIIqRsw&oe=676FE286" />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Cường Nguyễn</b>
                              đã thêm vào giỏ hàng
                            </span>
                          </h4>
                          <p className="text-sky mb-0">33 phút trước</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/471313709_2597198994004301_197820122441168913_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFJDLTS3sqQXH0pwyrTRsAdVT_NYMMMNVJVP81gwww1UqTmluyby7aGhY_5lLWnOck9tQt6PGQsJRt_NF9MUzDz&_nc_ohc=uLpeaNjKwqgQ7kNvgHnNfz_&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AUz5qa64qT9t-meyEW-R1nd&oh=00_AYCkU--fYcT3THT5DmGkd9elzbDNSHJH7BsF2exXIIqRsw&oe=676FE286" />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Cường Nguyễn</b>
                              đã thêm vào giỏ hàng
                            </span>
                          </h4>
                          <p className="text-sky mb-0">33 phút trước</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/471313709_2597198994004301_197820122441168913_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFJDLTS3sqQXH0pwyrTRsAdVT_NYMMMNVJVP81gwww1UqTmluyby7aGhY_5lLWnOck9tQt6PGQsJRt_NF9MUzDz&_nc_ohc=uLpeaNjKwqgQ7kNvgHnNfz_&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AUz5qa64qT9t-meyEW-R1nd&oh=00_AYCkU--fYcT3THT5DmGkd9elzbDNSHJH7BsF2exXIIqRsw&oe=676FE286" />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Cường Nguyễn</b>
                              đã thêm vào giỏ hàng
                            </span>
                          </h4>
                          <p className="text-sky mb-0">33 phút trước</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/471313709_2597198994004301_197820122441168913_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFJDLTS3sqQXH0pwyrTRsAdVT_NYMMMNVJVP81gwww1UqTmluyby7aGhY_5lLWnOck9tQt6PGQsJRt_NF9MUzDz&_nc_ohc=uLpeaNjKwqgQ7kNvgHnNfz_&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AUz5qa64qT9t-meyEW-R1nd&oh=00_AYCkU--fYcT3THT5DmGkd9elzbDNSHJH7BsF2exXIIqRsw&oe=676FE286" />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Cường Nguyễn</b>
                              đã thêm vào giỏ hàng
                            </span>
                          </h4>
                          <p className="text-sky mb-0">33 phút trước</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/471313709_2597198994004301_197820122441168913_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFJDLTS3sqQXH0pwyrTRsAdVT_NYMMMNVJVP81gwww1UqTmluyby7aGhY_5lLWnOck9tQt6PGQsJRt_NF9MUzDz&_nc_ohc=uLpeaNjKwqgQ7kNvgHnNfz_&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AUz5qa64qT9t-meyEW-R1nd&oh=00_AYCkU--fYcT3THT5DmGkd9elzbDNSHJH7BsF2exXIIqRsw&oe=676FE286" />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Cường Nguyễn</b>
                              đã thêm vào giỏ hàng
                            </span>
                          </h4>
                          <p className="text-sky mb-0">33 phút trước</p>
                        </div>
                      </div>
                    </MenuItem>
                  </div>

                  <div className="pl-3 pr-3 w-100 pt-2 pb-1">
                    <Button className="btn-blue w-100">
                      Xem tất cả
                    </Button>
                  </div>
                </Menu>
              </div>

              <div className="dropdownWrapper position-relative">
                <Button
                  className="rounded-circle mr-3"
                >
                  <FaLanguage />
                </Button>

                {context.windowWidth < 992 && (
                  <Button
                    className="rounded-circle mr-3"
                    onClick={() => context.openNav()}
                  >
                    <IoMenu />
                  </Button>
                )}

              </div>

              {context.isLogin !== true ? (
                <Link to={"/login"}>
                  <Button className="btn-blue btn-lg btn-round">
                    Đăng nhập
                  </Button>
                </Link>
              ) : (
                <div className="myAccWrapper">
                  <Button
                    className="myAcc d-flex align-items-center"
                    onClick={handleOpenMyAccDrop}
                  >
                    <div className="userImg">
                      <span className="rounded-circle">
                        {context.user?.name?.charAt(0)}
                      </span>
                    </div>

                    <div className="userInfo res-hide">
                      <h4>{context.user?.name}</h4>
                      <p className="mb-0 text-lowercase">
                        {context.user?.email}
                      </p>
                    </div>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMyAcc}
                    onClose={handleCloseMyAccDrop}
                    onClick={handleCloseMyAccDrop}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <Link to="/my-account">
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Tài khoản của tôi
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <ListItemIcon>
                        <IoShieldHalfSharp />
                      </ListItemIcon>
                      Đặt lại mật khẩu
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
