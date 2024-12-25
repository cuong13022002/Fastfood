import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleImg from "../../assets/images/googleImg.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import TextField from "@mui/material/TextField";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setisShowPassword] = useState(false);
  const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formfields, setFormfields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: true,
  });

  const history = useNavigate();

  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
    window.scrollTo(0, 0);
  }, []);

  const focusInput = (index) => {
    setInputIndex(index);
  };

  const onchangeInput = (e) => {
    setFormfields(() => ({
      ...formfields,
      [e.target.name]: e.target.value,
    }));
  };

  const signUp = (e) => {
    e.preventDefault();
    try {
      if (formfields.name === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng nhập họ tên",
        });
        return false;
      }

      if (formfields.email === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng nhập email",
        });
        return false;
      }

      if (formfields.phone === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Vui lòng nhập số điện thoại",
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
          console.log(res);

          if (res.status !== "FAILED") {
            context.setAlertBox({
              open: true,
              error: false,
              msg: res?.msg,
            });

            setTimeout(() => {
              setIsLoading(true);
              history("/login");
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
          console.error("Lỗi đăng dữ liệu:", error);
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
          name: user.providerData[0].displayName,
          email: user.providerData[0].email,
          password: null,
          images: user.providerData[0].photoURL,
          phone: user.providerData[0].phoneNumber,
          isAdmin: true,
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
                context.setIsLogin(true);
                history("/dashboard");
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
          msg: "Xác thực người dùng thành công!!",
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
    <section className="section signInPage signUpPage">
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
          <form className="mt-2" onSubmit={signUp}>
            <h2 className="mb-3">Đăng kí</h2>
            <div className="row">
              <div className="col-md-6">
                <div
                  className={`form-group position-relative ${
                    inputIndex === 0 && "focus"
                  }`}
                >
                  <TextField
                    label="Họ và Tên"
                    name="name"
                    onChange={onchangeInput}
                    type="text"
                    onFocus={() => focusInput(0)}
                    onBlur={() => setInputIndex(null)}
                    autoFocus
                    variant="standard"
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className={`form-group position-relative ${
                    inputIndex === 1 && "focus"
                  }`}
                >
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
              </div>
            </div>
            <div
              className={`form-group position-relative ${
                inputIndex === 2 && "focus"
              }`}
            >
              <TextField
                label="Số diện thoại"
                name="phone"
                onChange={onchangeInput}
                onFocus={() => focusInput(2)}
                onBlur={() => setInputIndex(null)}
                type="number"
                variant="standard"
                className="form-control"
              />
            </div>
            <div
              className={`form-group position-relative ${
                inputIndex === 3 && "focus"
              }`}
            >
              <TextField
                id="standard-basic"
                label="Mật khẩu"
                name="password"
                onChange={onchangeInput}
                onFocus={() => focusInput(3)}
                onBlur={() => setInputIndex(null)}
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
              className={`form-group position-relative ${
                inputIndex === 4 && "focus"
              }`}
            >
              <TextField
                id="standard-basic"
                label="Xác nhận mật khẩu"
                onFocus={() => focusInput(4)}
                onBlur={() => setInputIndex(null)}
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

            <div className=" mt-3 mb-3 w-100 ">
              <Button
                type="submit"
                disabled={isLoading === true ? true : false}
                className="btn-blue w-100 btn-lg btn-big"
              >
                {isLoading === true ? <CircularProgress /> : "Đăng kí"}
              </Button>
            </div>

            <p className="txt">
              Đã có tài khoản?{" "}
              <Link to="/login" className="border-effect">
                Đăng nhập
              </Link>
            </p>

            <h6 className=" text-center font-weight-bold">hoặc</h6>

            <Button
              className="loginWithGoogle mt-1"
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
