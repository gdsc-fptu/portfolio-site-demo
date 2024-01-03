function setStorage(token: string) {
  localStorage.setItem("token", token);
}

function getStorage(isRemove: boolean = true) {
  const token = localStorage.getItem("token");
  console.log("token", token);
  // Remove the token from the local storage
  if (token && isRemove) {
    localStorage.removeItem("token");
  }
  return token;
}

async function receiveMessage(event: any) {
  const data = JSON.parse(event.data);
  if (data.type === "google-login") {
    const token = data.token;
    setStorage(token);
    return token;
  }
  return null;
}

export default async function googleLoginWithPopup(
  popupApi: string,
  verifyApi?: string,
  saveCookie: boolean = true
) {
  const popupWindow = window.open(popupApi, "_blank", "width=600,height=600");

  // Add event listener to receive message from the popup
  window.addEventListener("message", receiveMessage);

  // Check if the popup is closed
  const intervalPromise = new Promise((resolve) => {
    const checkPopupClosed = setInterval(() => {
      if (popupWindow?.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener("message", receiveMessage);
        resolve(true);
      }
    }, 1000);
  });

  await intervalPromise;

  // Set the cookie for user token
  if (saveCookie && verifyApi) {
    await fetch(verifyApi, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getStorage(),
      },
    });
  }

  return getStorage();
}
