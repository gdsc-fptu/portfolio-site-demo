// @ts-ignore
import style from "./style.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralLayout from "../../components/Shared/GeneralLayout";
import AppButton from "../../components/Shared/Button";
import Spacer from "../../components/Shared/Spacer";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { IoAddOutline } from "react-icons/io5";
import { PRESERVE_KEYWORDS } from "../../utils/constant";
import { isASCII } from "../../utils/utils";
import { checkUserAvailability, createPortfolio } from "../../apis/user";

export default function CreateUserPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigator = useNavigate();

  function handleSetUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  async function handleCheckUnqiue(): Promise<boolean> {
    if (userName === "") {
      setError("User Name is required");
      return false;
    }
    if (userName.includes(" ")) {
      setError("User Name must not contain space");
      return false;
    }
    if (PRESERVE_KEYWORDS.includes(userName)) {
      setError(`User Name must not contain ${PRESERVE_KEYWORDS.join(", ")}`);
      return false;
    }
    if (!isASCII(userName)) {
      setError("User Name must not contain special character");
      return false;
    }
    if (!(await checkUserAvailability(userName))) {
      setError("User Name is already taken");
      return false;
    }
    setError("");
    return true;
  }

  function handleCreateUser() {
    setLoading(true);
    if (error === "" && userName !== "") {
      createPortfolio(userName).then(() => {
        setLoading(false);
        navigator(`/edit`);
      });
    }
  }

  return (
    <GeneralLayout>
      <h1 className={style.text}>Create User Portfolio</h1>
      <div className={style.input}>
        <TextField
          variant="standard"
          label="Enter your User Name"
          value={userName}
          onChange={handleSetUserName}
          onBlur={() => {
            setLoading(true);
            handleCheckUnqiue().then(() => setLoading(false));
          }}
          InputProps={{
            endAdornment: loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : null,
          }}
        />
        <div className={style.error}>{error}</div>
        <i className={style.notice}>
          The User Name must be unique and contain without space letter.
        </i>
        <Spacer h={20} />
        <AppButton
          onClick={handleCreateUser}
          disabled={loading || error !== ""}
        >
          <IoAddOutline />
          Create User
        </AppButton>
      </div>
    </GeneralLayout>
  );
}
