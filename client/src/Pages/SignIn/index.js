import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.jpg";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MyContext } from "../../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

import GoogleImg from "../../assets/images/googleImg.png";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    context.setisHeaderFooterShow(false);
    
    context.setEnableFilterTab(false);
  }, []);

  const [formfields, setFormfields] = useState({
    email: "",
    password: "",
  });

  const onchangeInput = (e) => {
    setFormfields(() => ({
      ...formfields,
      [e.target.name]: e.target.value,
    }));
  };

  const login = (e) => {
    e.preventDefault();

    if (formfields.email === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng nhập Email",
      });
      return false;
    }

    if (formfields.password === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng nhập mật khẩu",
      });
      return false;
    }

    setIsLoading(true);
    postData("/api/user/signin", formfields).then((res) => {
      try {
        if (res.error !== true) {
          localStorage.setItem("token", res.token);

          const user = {
            name: res.user?.name,
            email: res.user?.email,
            userId: res.user?.id,
            image:res?.user?.images[0]
          }

          localStorage.setItem("user", JSON.stringify(user));
          context.setUser(JSON.stringify(user))

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
            //window.location.href = "/";
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
  };

  const signInWithGoogle = () => {
    
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        const fields={
            name:user.providerData[0].displayName,
            email: user.providerData[0].email,
            password: null,
            images:user.providerData[0].photoURL,
            phone:user.providerData[0].phoneNumber
        }

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
                  //window.location.href = "/";
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
          msg: "User authentication Successfully!",
        });

       // window.location.href = "/";
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        context.setAlertBox({
          open: true,
          error: true,
          msg: errorMessage,
        });
        // ...
      });
  };

  return (
    <section className="section signInPage">
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
        <div className="box card p-2 shadow border-0">

          <form className="mt-3" onSubmit={login}>
            <h2 className="mb-4">Đăng nhập</h2>

            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                required
                variant="standard"
                className="w-100"
                name="email"
                onChange={onchangeInput}
              />
            </div>
            <div className="form-group position-relative">
              <TextField
                id="standard-basic"
                label="Mật khẩu"
                type={`${isShowPassword === true ? "text" : "password"}`}
                required
                variant="standard"
                className="w-100 form-control"
                name="password"
                onChange={onchangeInput}
              />
               <span
                  className="toggleShowPassword"
                  onClick={() => setisShowPassword(!isShowPassword)}
                >
                  {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
            </div>

            <a className="border-effect cursor txt">Quên mật khẩu?</a>

            <div className="d-flex align-items-center  mt-3 mb-3 ">
              <Button type="submit" className="btn-blue col btn-lg btn-big">
                {isLoading === true ? <CircularProgress /> : "Đăng nhập"}
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
              Chưa có tài khoản?{" "}
              <Link to="/signUp" className="border-effect">
               Đăng kí
              </Link>
            </p>

            <h6 className="mt-4 text-center font-weight-bold">
            hoặc
            </h6>

            <Button
              className="loginWithGoogle mt-2 text-capitalize"
              variant="outlined"
              onClick={signInWithGoogle}
            >
              <img src={GoogleImg} className="text-capitalize"/> Đăng nhập bằng Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
