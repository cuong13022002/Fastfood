import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.jpg";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MyContext } from "../../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import GoogleImg from "../../assets/images/googleImg.png";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);
  const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
  const [formfields, setFormfields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    context.setisHeaderFooterShow(false);
    
    context.setEnableFilterTab(false);
  }, []);

  const onchangeInput = (e) => {
    setFormfields(() => ({
      ...formfields,
      [e.target.name]: e.target.value,
    }));
  };

  const register = (e) => {
    console.log(formfields);
    e.preventDefault();
    try {
      if (formfields.name === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng nhập họ tên!",
        });
        return false;
      }

      if (formfields.email === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng nhập email!",
        });
        return false;
      }

      if (formfields.phone === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng nhập số điện thoại!",
        });
        return false;
      }

      if (formfields.password === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng nhập mật khẩu!",
        });
        return false;
      }
      if (formfields.confirmPassword === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng xác nhận mật khẩu",
        });
        return false;
      }
      if (formfields.confirmPassword !== formfields.password) {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Mật khẩu không khớp",
        });
        return false;
      }

      setIsLoading(true);

      postData("/api/user/signup", formfields)
        .then((res) => {
          if (res.status !== 'FAILED') {
            context.setAlertBox({
              open: true,
              error: false,
              msg: res?.msg,
            });

            setTimeout(() => {
              setIsLoading(true);
              history("/signIn");
              //window.location.href="/signIn";
            }, 2000);
          } else {
            setIsLoading(false);
            context.setAlertBox({
              open: true,
              error: true,
              msg: res.msg,
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Lỗi dữ liệu: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
       
        const user = result.user;

        const fields = {
            name:user.providerData[0].displayName,
            email: user.providerData[0].email,
            password: null,
            images:user.providerData[0].photoURL,
            phone:user.providerData[0].phoneNumber
        };

        postData("/api/user/authWithGoogle", fields).then((res) => {
          try {
            if (res.error !== true) {
              localStorage.setItem("token", res.token);

              const user = {
                name: res.user?.name,
                email: res.user?.email,
                userId: res.user?.id,
              };

              localStorage.setItem("user", JSON.stringify(user));

              context.setAlertBox({
                open: true,
                error: false,
                msg: res.msg,
              });

              setTimeout(() => {
                history("/");
                  context.setIsLogin(true);
                  setIsLoading(false);
                  context.setisHeaderFooterShow(true);
              }, 2000);
            } else {
              context.setAlertBox({
                open: true,
                error: true,
                msg: res.msg,
              });
              setIsLoading(false);
            }
          } catch (error) {
            console.log(error);
            setIsLoading(false);
          }
        });

        context.setAlertBox({
          open: true,
          error: false,
          msg: "Xác thực người dùng thành công!",
        });

      
      })
      .catch((error) => {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        
        const email = error.customData.email;
      
        const credential = GoogleAuthProvider.credentialFromError(error);
        context.setAlertBox({
          open: true,
          error: true,
          msg: errorMessage,
        });
       
      });
  };

  return (
    <section className="section signInPage ">
      <div className="shape-bottom">
        {" "}
        <svg
          fill="#fff"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 1921 819.8"
          style={{ enableBackground: "new 0 0 1921 819.8" }}
        >
          {" "}
          <path
            class="st0"
            d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          ></path>{" "}
        </svg>
      </div>

      <div className="container">
        <div className="box card p-3 shadow border-0">
          <form className="mt-2" onSubmit={register}>
            <h2 className="mb-3">Đăng kí</h2>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    label="Họ và Tên"
                    name="name"
                    onChange={onchangeInput}
                    type="text"
                    variant="standard"
                    className="w-100"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    label="Số diện thoại"
                    name="phone"
                    onChange={onchangeInput}
                    type="number"
                    variant="standard"
                    className="w-100"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                name="email"
                onChange={onchangeInput}
                variant="standard"
                className="w-100"
              />
            </div>
            <div className="form-group position-relative ">
              <TextField
                id="standard-basic"
                label="Mật khẩu"
                name="password"
                onChange={onchangeInput}
                type={`${isShowPassword === true ? "text" : "password"}`}
                variant="standard"
                className="w-100"
              />
              <span
                className="toggleShowPassword"
                onClick={() => setisShowPassword(!isShowPassword)}
              >
                {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <div
              className='form-group position-relative'
            >
              <TextField
                id="standard-basic"
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                onChange={onchangeInput}
                type={`${isShowConfirmPassword === true ? "text" : "password"}`}
                variant="standard"
                className="w-100"
              />
              <span
                className="toggleShowPassword"
                onClick={() => setisShowConfirmPassword(!isShowConfirmPassword)}
              >
                {isShowConfirmPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>

            <a className="border-effect cursor txt">Quên mật khẩu?</a>

            <div className="d-flex align-items-center  mt-3 mb-3 ">
              <Button type="submit" className="btn-blue col btn-lg btn-big">
                {isLoading === true ? <CircularProgress /> : "Đăng kí"}
              </Button>
              &nbsp; &nbsp; &nbsp;
              <Link to="/">
                {" "}
                <Button
                  className="btn-lg btn-big col "
                  variant="outlined"
                  onClick={() => context.setisHeaderFooterShow(true)}
                >
                  Trang chủ
                </Button>
              </Link>
            </div>

            <p className="txt">
            Đã có tài khoản?{" "}
              <Link to="/signIn" className="border-effect">
               Đăng nhập
              </Link>
            </p>

            <h6 className="mt-4 text-center font-weight-bold">
              hoặc
            </h6>

            <Button
              className="loginWithGoogle mt-2"
              variant="outlined"
              onClick={signInWithGoogle}
            >
              <img src={GoogleImg} /> Đăng nhập bằng Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
