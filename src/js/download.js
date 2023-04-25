(() => {
  const keyValue = sessionStorage.getItem("hh-key");
  if (keyValue !== "hogehogehoge") {
    window.location = "/";
  }
})();
