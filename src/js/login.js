(() => {
  //疑似パスワード認証
  const login = async (password) => {
    const url = (await sha256(password)) + ".html";
    const message = document.getElementById("message");
    const input = document.getElementById("password");

    try {
      const res = await fetch(url, {
        mode: "cors",
      });
      console.log(res);
      switch (res.status) {
        case 200: {
          sessionStorage.setItem("hh-key", "hogehogehoge");
          window.location = url;
          break;
        }
        default: {
          message.innerHTML = "Wrong password! Try again.";
          input.value = "";
          break;
        }
      }
    } catch (e) {
      message.innerHTML = "システムエラー";
      input.value = "";
    }
  };

  //sha256ハッシュ関数
  const sha256 = async (str) => {
    // Convert string to ArrayBuffer
    const buff = new Uint8Array([].map.call(str, (c) => c.charCodeAt(0))).buffer;
    // Calculate digest
    const digest = await crypto.subtle.digest("SHA-256", buff);
    // Convert ArrayBuffer to hex string
    // (from: https://stackoverflow.com/a/40031979)
    return [].map.call(new Uint8Array(digest), (x) => ("00" + x.toString(16)).slice(-2)).join("");
  };

  const form = document.getElementById("form");

  form.onsubmit = (e) => {
    e.preventDefault();
    const password = form.password.value;
    login(password);
  };
})();
