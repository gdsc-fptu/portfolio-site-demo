// @ts-ignore
import style from "./style.module.scss";

// Import React modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { IoAddOutline } from "react-icons/io5";

// Import custom components
import GeneralLayout from "../../components/Shared/GeneralLayout";
import AppButton from "../../components/Shared/Button";
import Spacer from "../../components/Shared/Spacer";
import { AppStrings } from "../../utils/strings";

// Import APIs
import { createPortfolio } from "../../apis/user";
import { checkUserNameAvailability } from "../../logic/checkUserNameAvailability";
import useAppStore from "../../context/store";

export default function CreateUserPage() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [checking, setChecking] = useState<Boolean>(false);
  const [userName, setUserName] = useState<String>("");
  const [error, setError] = useState<String | null>(null);
  const user = useAppStore((state) => state.user);
  const navigator = useNavigate();

  function handleSetUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function handleCheckUnqiue() {
    setChecking(true);
    checkUserNameAvailability(userName, (error) => setError(error)).then(() =>
      setChecking(false)
    );
  }

  function isButtonDisabled() {
    if (loading) return true;
    if (checking) return true;
    if (userName === "") return true;
    if (error) return true;
    return false;
  }

  function handleCreateUser() {
    setLoading(true);
    if (!error && userName !== "") {
      createPortfolio(userName).then(() => {
        navigator("/edit");
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    if (!user) {
      navigator("/login");
    }
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
          onBlur={handleCheckUnqiue}
          InputProps={{
            endAdornment: checking ? (
              <CircularProgress color="inherit" size={20} />
            ) : null,
          }}
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
