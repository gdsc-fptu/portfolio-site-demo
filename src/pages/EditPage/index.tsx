// @ts-ignore
import style from "./style.module.scss";

// Import React modules
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { IoAddSharp } from "react-icons/io5";

// Import custom components
import AddNewCardButton from "../../components/EditPage/AddNewCard";
import HorizontalInputs from "../../components/EditPage/HorizontalInputs";
import InputCard from "../../components/EditPage/InputCard";
import InputField from "../../components/EditPage/InputField";
import InputZone from "../../components/EditPage/InputZone";
import ImageUploadButton from "../../components/EditPage/ImageUpload";
import Loader from "../../components/Shared/Loader";
import GeneralLayout from "../../components/Shared/GeneralLayout";
import { getHexByColor } from "../../utils/enum/color";
import {
  RolesList,
  getColorByRole,
  getFullNameByRole,
} from "../../utils/enum/roles";
import { GenderList, getStringByGender } from "../../utils/enum/gender";
import {
  ZodiacList,
  getStringByZodiac,
  getZodiacByBirthday,
} from "../../utils/enum/zodiac";
import { PROJECT_INITIALIZE, SKILL_INITIALIZE } from "../../utils/constant";
import { AccountUser, User } from "../../utils/interface";
import { AppStrings } from "../../utils/strings";

// Import custom hooks & context
import useAppStore from "../../context/store";
import { GoogleLoginButton, GoogleResponse } from "../../utils/googleAuth";
import { deleteImage } from "../../apis/media";
import { verifyGoogleAccount } from "../../apis/user";
import { updatePost } from "../../apis/update";
import { fetchPortfolioData } from "../../logic/getPortfolio";
import { processUploadImage } from "../../logic/uploadImage";
import { processGetUser } from "../../logic/getAccountUser";
import {
  formatPercentInput,
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/utils";

export default function EditPage() {
  /**
   * States
   */
  const [saving, setSaving] = useState<Boolean>(false);
  const [form, setForm] = useState<User>({} as User);
  const [previewImg, setPreviewImg] = useState<String>("");
  const [isRembg, setRembg] = useState<Boolean>(true);
  // Account User Global state
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const navigator = useNavigate();

  function handleSetPageDataAfterLogin(
    user: AccountUser,
    data: User | null,
    imageUrl: String | null
  ) {
    // Set data to state
    if (data) {
      setForm(() => data);
    }
    if (imageUrl) {
      setPreviewImg(imageUrl);
    }
    setUser(user);
  }

  async function handleLoginToAnotherAccount(response: GoogleResponse) {
    const userData = await verifyGoogleAccount(response.access_token);
    const { data, imageUrl } = await fetchPortfolioData(userData.userName);
    setToLocalStorage("form", data);
    handleSetPageDataAfterLogin(userData, data, imageUrl);
    // Refresh page
    window.location.reload();
  }

  /**
   * Form State Handlers
   */
  function handleSetForm(key: string, value: any) {
    const newForm = { ...form, [key]: value };
    setForm((_) => newForm);
    setToLocalStorage("form", newForm);
  }
  function handleSetFormArray(key: string, index: number, value: any) {
    const newForm = {
      ...form,
      [key]: (form as any)[key].map((item: any, idx: number) =>
        idx === index ? value : item
      ),
    };
    setForm((_) => newForm);
    setToLocalStorage("form", newForm);
  }
  function handleSetFormArrayPush(key: string, value: any) {
    const newForm = {
      ...form,
      [key]: [...(form as any)[key], value],
    };
    setForm((_) => newForm);
    setToLocalStorage("form", newForm);
  }
  function handleSetFormArrayRemove(key: string, index: number) {
    const newForm = {
      ...form,
      [key]: (form as any)[key].filter((_: any, idx: number) => idx !== index),
    };
    setForm((_) => newForm);
    setToLocalStorage("form", newForm);
  }

  /**
   * Image Handlers
   */
  async function handleUploadImage(file: File) {
    setSaving(true);
    const { imagePath, imageUrl } = await processUploadImage(file, isRembg);
    console.log("Image", imagePath, imageUrl);
    handleSetForm("imageUrl", imagePath);
    updatePost(form.id, {
      ...form,
      imageUrl: imagePath,
    } as User).then(() => setSaving(false));
    return imageUrl;
  }
  async function handleDeleteImage() {
    setSaving(true);
    await deleteImage(form.imageUrl as string);
    handleSetForm("imageUrl", "");
    updatePost(form.id, {
      ...form,
      imageUrl: "",
    } as User).then(() => setSaving(false));
  }

  /**
   * Form Handlers
   */
  function handleSubmit() {
    setSaving(true);
    updatePost(form.id, form).then((_) => {
      setSaving(false);
      navigator(`/${form.userName}`);
    });
  }
  function handleCancel() {
    navigator(`/${form.userName}`);
  }

  useEffect(() => {
    // Get from local storage
    const localForm = getFromLocalStorage("form");
    const onNotLoggedIn = () => {
      navigator("/login");
    };
    const onNewUser = () => {
      navigator("/create");
    };
    const onNotFound = () => {
      navigator("/404");
    };
    const onGetUser = (data: User | null, imageUrl: String | null) => {
      setToLocalStorage("form", data);
      handleSetPageDataAfterLogin(user as AccountUser, data, imageUrl);
    };
    processGetUser(
      user,
      localForm,
      onNotLoggedIn,
      onNewUser,
      onGetUser,
      onNotFound
    ).then((responseUser) => {
      setUser(responseUser as AccountUser);
      // handleSetForm("email", responseUser?.email);
    });
  }, []);

  return Object.keys(form).length !== 0 ? (
    <GeneralLayout
      isLoading={saving}
      color={getColorByRole(form.roles[0] ?? "black")}
    >
      <div className={style.accountContainer}>
        <div className={style.accountText}>
          <span>
            {AppStrings.language.editPage.accountDescription}
            <code>
              <b> @{user?.userName}</b>
            </code>
          </span>
          <h1>{user?.name}</h1>
          <GoogleLoginButton
            onSuccess={(response) => {
              setSaving(true);
              handleLoginToAnotherAccount(response).then(() => {
                setSaving(false);
              });
            }}
          >
            <Button color="primary">
              {AppStrings.language.editPage.reloginBtn}
            </Button>
          </GoogleLoginButton>
        </div>
        <div className={style.accountAvatar}>
          <img src={user?.avatar as string} alt="Avatar" />
        </div>
      </div>
      <div className={style.form}>
        <InputZone title={AppStrings.language.editPage.basicInfo.title}>
          {/* FirstName, firstName */}
          <InputField
            desc={AppStrings.language.editPage.basicInfo.firstNameDesc}
            example="Đinh Trần"
          >
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.basicInfo.firstName}
              defaultValue={form.firstName}
              onChange={(e) => handleSetForm("firstName", e.target.value)}
            />
          </InputField>

          {/* LastName, lastName */}
          <InputField
            desc={AppStrings.language.editPage.basicInfo.lastNameDesc}
            example="Yến Vy"
          >
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.basicInfo.lastName}
              defaultValue={form.lastName}
              onChange={(e) => handleSetForm("lastName", e.target.value)}
            />
          </InputField>

          {/* Bio, description */}
          <InputField desc={AppStrings.language.editPage.basicInfo.bio}>
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.basicInfo.bio}
              multiline
              maxRows={3}
              defaultValue={form.description}
              onChange={(e) => handleSetForm("description", e.target.value)}
            />
          </InputField>

          {/* Roles, roles */}
          <InputField desc={AppStrings.language.editPage.basicInfo.rolesDesc}>
            <Select
              labelId="select-roles"
              id="select-roles"
              variant="standard"
              multiple
              value={form.roles}
              onChange={(e: any) => handleSetForm("roles", e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip
                      key={value}
                      label={getFullNameByRole(value)}
                      size="small"
                      style={{
                        color: "white",
                        backgroundColor: `#${getHexByColor(
                          getColorByRole(value)
                        )}`,
                      }}
                    />
                  ))}
                </Box>
              )}
            >
              {RolesList.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {getFullNameByRole(role)}
                </MenuItem>
              ))}
            </Select>
          </InputField>

          {/* Gender, gender */}
          <InputField desc={AppStrings.language.editPage.basicInfo.genderDesc}>
            <Select
              variant="standard"
              value={form.gender}
              onChange={(e: any) => handleSetForm("gender", e.target.value)}
            >
              {GenderList.map((gender, index) => (
                <MenuItem key={index} value={gender}>
                  {getStringByGender(gender)}
                </MenuItem>
              ))}
            </Select>
          </InputField>

          {/* Birthday, birthday, Zodiac, zodiac */}
          <InputField
            desc={AppStrings.language.editPage.basicInfo.birthdayAndZodicDesc}
            example="mm/dd/yyyy"
          >
            <TextField
              variant="standard"
              type="date"
              defaultValue={form.birthday}
              onChange={(e) => {
                handleSetForm("birthday", e.target.value);
                handleSetForm("zodiac", getZodiacByBirthday(e.target.value));
              }}
            />
            <Select
              variant="standard"
              value={form.zodiac}
              onChange={(e: any) => handleSetForm("zodiac", e.target.value)}
            >
              {ZodiacList.map((zodiac, index) => (
                <MenuItem key={index} value={zodiac}>
                  {getStringByZodiac(zodiac)}
                </MenuItem>
              ))}
            </Select>
          </InputField>

          {/* Quote, quote */}
          <InputField desc={AppStrings.language.editPage.basicInfo.quoteDesc}>
            <TextField
              variant="standard"
              label="Favorite Quote"
              multiline
              maxRows={3}
              defaultValue={form.quote}
              onChange={(e) => handleSetForm("quote", e.target.value)}
            />
          </InputField>
        </InputZone>

        <InputZone title={AppStrings.language.editPage.image.title}>
          <span>
            <Typography variant="button">
              {AppStrings.language.editPage.image.removeBackground}
            </Typography>
            <Switch
              size="small"
              defaultChecked
              value={isRembg}
              onChange={() => setRembg(!isRembg)}
            />
          </span>
          <ImageUploadButton
            image={previewImg}
            onUpload={handleUploadImage}
            onDelete={handleDeleteImage}
          />
        </InputZone>

        <InputZone title={AppStrings.language.editPage.contact.title}>
          {/* Email, email */}
          <InputField desc={AppStrings.language.editPage.contact.emailDesc}>
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.contact.email}
              defaultValue={form.email}
              onChange={(e) => handleSetForm("email", e.target.value)}
            />
          </InputField>

          {/* Phone, phone */}
          <InputField desc={AppStrings.language.editPage.contact.phoneDesc}>
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.contact.phone}
              defaultValue={form.phone}
              onChange={(e) => handleSetForm("phone", e.target.value)}
            />
          </InputField>

          {/* Facebook, facebook */}
          <InputField desc={AppStrings.language.editPage.contact.facebookDesc}>
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.contact.facebook}
              defaultValue={form.facebook}
              onChange={(e) => handleSetForm("facebook", e.target.value)}
            />
          </InputField>

          {/* Instagram, instagram */}
          <InputField desc={AppStrings.language.editPage.contact.instagramDesc}>
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.contact.instagram}
              defaultValue={form.instagram}
              onChange={(e) => handleSetForm("instagram", e.target.value)}
            />
          </InputField>

          {/* Linkedin, linkedin */}
          <InputField desc={AppStrings.language.editPage.contact.linkedinDesc}>
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.contact.linkedin}
              defaultValue={form.linkedin}
              onChange={(e) => handleSetForm("linkedin", e.target.value)}
            />
          </InputField>

          {/* Github, github */}
          <InputField desc={AppStrings.language.editPage.contact.githubDesc}>
            <TextField
              variant="standard"
              label={AppStrings.language.editPage.contact.github}
              defaultValue={form.github}
              onChange={(e) => handleSetForm("github", e.target.value)}
            />
          </InputField>
        </InputZone>

        <InputZone title={AppStrings.language.editPage.skill.title}>
          <HorizontalInputs
            button={
              <AddNewCardButton
                onClick={() =>
                  handleSetFormArrayPush("skills", SKILL_INITIALIZE)
                }
              >
                <IoAddSharp size={20} />
                <h3>{AppStrings.language.editPage.skill.addBtn}</h3>
              </AddNewCardButton>
            }
          >
            {form.skills?.map((skill, index) => (
              <Fragment key={index}>
                <InputCard
                  title={`${AppStrings.language.editPage.skill.title} ${
                    index + 1
                  }`}
                  onDelete={() => handleSetFormArrayRemove("skills", index)}
                >
                  {/* Skill Name, skills, name */}
                  <InputField
                    desc={AppStrings.language.editPage.skill.nameDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      variant="standard"
                      label={AppStrings.language.editPage.skill.name}
                      defaultValue={skill.name}
                      onChange={(e) =>
                        handleSetFormArray(
                          "skills",
                          index,
                          Object.assign({}, skill, {
                            name: e.target.value,
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Skill Percentage, skills, percent */}
                  <InputField
                    desc={AppStrings.language.editPage.skill.percentDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      type="number"
                      variant="standard"
                      label={AppStrings.language.editPage.skill.percent}
                      defaultValue={`${skill.percent}`}
                      onChange={(e) =>
                        handleSetFormArray(
                          "skills",
                          index,
                          Object.assign({}, skill, {
                            percent: formatPercentInput(e.target.value),
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Skill Description, skills, description */}
                  <InputField
                    desc={AppStrings.language.editPage.skill.descDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      variant="standard"
                      label={AppStrings.language.editPage.skill.desc}
                      multiline
                      maxRows={3}
                      defaultValue={skill.description}
                      onChange={(e) =>
                        handleSetFormArray(
                          "skills",
                          index,
                          Object.assign({}, skill, {
                            description: e.target.value,
                          })
                        )
                      }
                    />
                  </InputField>
                </InputCard>
              </Fragment>
            ))}
          </HorizontalInputs>
        </InputZone>
        <InputZone title={AppStrings.language.editPage.project.title}>
          <HorizontalInputs
            button={
              <AddNewCardButton
                onClick={() =>
                  handleSetFormArrayPush("projects", PROJECT_INITIALIZE)
                }
              >
                <IoAddSharp size={20} />
                <h3>{AppStrings.language.editPage.project.addBtn}</h3>
              </AddNewCardButton>
            }
          >
            {form.projects?.map((project, index) => (
              <Fragment key={index}>
                <InputCard
                  title={`${AppStrings.language.editPage.project.title} ${
                    index + 1
                  }`}
                  onDelete={() => handleSetFormArrayRemove("projects", index)}
                >
                  {/* Project Name, projects, name */}
                  <InputField
                    desc={AppStrings.language.editPage.project.nameDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      variant="standard"
                      label={AppStrings.language.editPage.project.name}
                      defaultValue={project.name}
                      onChange={(e) =>
                        handleSetFormArray(
                          "projects",
                          index,
                          Object.assign({}, project, {
                            name: e.target.value,
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Project Description, porjects, description */}
                  <InputField
                    desc={AppStrings.language.editPage.project.descDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      variant="standard"
                      label={AppStrings.language.editPage.project.desc}
                      multiline
                      maxRows={3}
                      defaultValue={project.description}
                      onChange={(e) =>
                        handleSetFormArray(
                          "projects",
                          index,
                          Object.assign({}, project, {
                            description: e.target.value,
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Project Start Date, projects, startDate */}
                  <InputField
                    desc={AppStrings.language.editPage.project.startDateDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      type="date"
                      variant="standard"
                      label={AppStrings.language.editPage.project.startDate}
                      defaultValue={project.startDate}
                      onChange={(e) =>
                        handleSetFormArray(
                          "projects",
                          index,
                          Object.assign({}, project, {
                            startDate: e.target.value,
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Project End Date, projects, endDate */}
                  <InputField
                    desc={AppStrings.language.editPage.project.endDateDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      type="date"
                      variant="standard"
                      label={AppStrings.language.editPage.project.endDate}
                      defaultValue={project.endDate}
                      onChange={(e) =>
                        handleSetFormArray(
                          "projects",
                          index,
                          Object.assign({}, project, {
                            endDate: e.target.value,
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Project Roles, projects, roles */}
                  <InputField
                    desc={AppStrings.language.editPage.project.rolesDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      variant="standard"
                      label={AppStrings.language.editPage.project.roles}
                      defaultValue={project.roles?.join(", ")}
                      onChange={(e) =>
                        handleSetFormArray(
                          "projects",
                          index,
                          Object.assign({}, project, {
                            roles: e.target.value
                              .split(",")
                              .map((item) => item.trim()),
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Project Technologies, projects, technologies */}
                  <InputField
                    desc={AppStrings.language.editPage.project.technologiesDesc(
                      index + 1
                    )}
                  >
                    <TextField
                      variant="standard"
                      label={AppStrings.language.editPage.project.technologies}
                      defaultValue={project.technologies?.join(", ")}
                      onChange={(e) =>
                        handleSetFormArray(
                          "projects",
                          index,
                          Object.assign({}, project, {
                            technologies: e.target.value
                              .split(",")
                              .map((item) => item.trim()),
                          })
                        )
                      }
                    />
                  </InputField>
                </InputCard>
              </Fragment>
            ))}
          </HorizontalInputs>
        </InputZone>
      </div>
      <div className={style.submit}>
        <Button
          variant="text"
          color="primary"
          onClick={handleCancel}
          disabled={saving as boolean}
        >
          {AppStrings.language.editPage.cancelBtn}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={saving as boolean}
        >
          {AppStrings.language.editPage.submitBtn}
        </Button>
      </div>
    </GeneralLayout>
  ) : (
    <Loader />
  );
}
