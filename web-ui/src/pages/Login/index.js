import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./index.module.scss";
import clsx from "clsx";
import { useLogin } from "hooks/api";
export default function Login() {
  const [inputs, setInputs] = useState([0, 0]);
  const { mutate } = useLogin(loginSuccess);
  const nevigate = useNavigate();
  function onSubmit(form) {
    form.preventDefault();
    mutate({
      username: form.target.username.value,
      password: form.target.username.value,
    });
  }
  function loginSuccess() {
    nevigate("/home");
  }
  return (
    <div className={style.container}>
      <header className={style.header}></header>
      <div className={style.body}>
        <div className={style["login-form"]}>
          <h3 className={style["login-header"]}>Welcome back</h3>
          <div className={style["login-quote"]}>
            Enter your username and password to log in
          </div>
          <div className={style["form"]}>
            <form onSubmit={onSubmit}>
              <div className={style["form-label"]}>Username</div>
              <div
                className={clsx([
                  style["form-input"],
                  inputs[0] === 1 && style["form-input-active"],
                  inputs[0] === 2 && style["form-input-error"],
                ])}
              >
                <input
                  placeholder="Username"
                  type="text"
                  name="username"
                  autoComplete="off"
                  required={true}
                  onFocus={() => {
                    setInputs((inputs) => {
                      let temp = [...inputs];
                      temp[0] = 1;
                      return temp;
                    });
                  }}
                  onBlur={() => {
                    setInputs((inputs) => {
                      let temp = [...inputs];
                      temp[0] = 0;
                      return temp;
                    });
                  }}
                />
              </div>
              <div className={style["form-label"]}>Password</div>
              <div
                className={clsx([
                  style["form-input"],
                  inputs[1] === 1 && style["form-input-active"],
                  inputs[1] === 2 && style["form-input-error"],
                ])}
              >
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  required={true}
                  onFocus={() => {
                    setInputs((inputs) => {
                      let temp = [...inputs];
                      temp[1] = 1;
                      return temp;
                    });
                  }}
                  onBlur={() => {
                    setInputs((inputs) => {
                      let temp = [...inputs];
                      temp[1] = 0;
                      return temp;
                    });
                  }}
                />
              </div>
              <div>
                <input type="submit" className={style.submit} value="Log In" />
              </div>
            </form>
          </div>
        </div>
        <div className={style["login-logo"]}>
          <div className={style["logo-clip"]}>
            <div className={style["logo-image"]} />
          </div>
        </div>
      </div>
      <footer className={style.footer}>
        <div className={style["about"]}>
          <div>About Us</div>
          <div>Product</div>
          <div>Pricing</div>
          <div>Contact</div>
        </div>
        <div className={style["copyright"]}>
          Copyright © 2022 by Tran Uy Son.
        </div>
      </footer>
    </div>
  );
}
