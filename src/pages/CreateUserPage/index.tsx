// @ts-ignore
import style from "./style.module.scss";

// Import React modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { IoAddOutline } from "react-icons/io5";

// Import custom components
import GeneralLayout from "../../components/Shared/GeneralLayout";
import AppButton from "../../components/Shared/Button";
import Spacer from "../../components/Shared/Spacer";
import { AppStrings } from "../../utils/strings";

// Import APIs
import useAppStore from "../../context/store";
import initializePage from "../../logic/CreatePage/initialize";
import handleCreatePortfolio from "../../logic/CreatePage/createPortfolio";
import checkUserNameAvailability from "../../logic/CreatePage/checkUserNameAvailability";

export default function CreateUserPage() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [userName, setUserName] = useState<String>("");
  const [error, setError] = useState<String | null>(null);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const navigator = useNavigate();

  function handleSetUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
    setError(null);
  }

  function isButtonDisabled() {
    if (loading) return true;
    if (userName === "") return true;
    return false;
  }

  async function handleCheckUnqiue() {
    return await checkUserNameAvailability(userName, (error) =>
      setError(error)
    );
  }

  async function handleCreateUser() {
    setLoading(true);
    if (!(await handleCheckUnqiue())) {
      setLoading(false);
      return;
    }
    if (!error && userName !== "") {
      handleCreatePortfolio(user, userName).then((user) => {
        setUser(user);
        setLoading(false);
        navigator("/edit");
      });
    }
  }

  useEffect(() => {
    initializePage(user, navigator).then((user) => setUser(user));
  }, []);

  return (
    <GeneralLayout isLoading={loading}>
      <h1 className={style.text}>{AppStrings.language.createPage.title}</h1>
      <div className={style.input}>
        <TextField
          variant="standard"
          label={AppStrings.language.createPage.placeholder}
          value={userName}
          onChange={handleSetUserName}
        />
        <div className={style.error}>{error}</div>
        <i className={style.notice}>
          {AppStrings.language.createPage.description}
        </i>
        <Spacer h={20} />
        <AppButton onClick={handleCreateUser} disabled={isButtonDisabled()}>
          <IoAddOutline />
          {AppStrings.language.createPage.submit}
        </AppButton>
      </div>
    </GeneralLayout>
  );
}
