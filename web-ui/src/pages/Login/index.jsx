import style from "./index.module.scss";
import { Input } from "components/CustomInput/CustomInput";
import { useLogin } from "apis";

export default function Login() {
  const { mutate } = useLogin();
  function onSubmit(form) {
    form.preventDefault();
    mutate({
      username: form.target.username.value,
      password: form.target.username.value,
    });
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
              <Input
                placeholder="Username"
                type="text"
                name="username"
                autoComplete="off"
                required={true}
                defaultValue="admin"
              />
              <div className={style["form-label"]}>Password</div>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="off"
                required={true}
                defaultValue="admin"
              />
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
