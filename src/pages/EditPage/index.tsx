// @ts-ignore
import style from "./style.module.scss";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNewCardButton from "../../components/EditPage/AddNewCard";
import HorizontalInputs from "../../components/EditPage/HorizontalInputs";
import InputCard from "../../components/EditPage/InputCard";
import InputField from "../../components/EditPage/InputField";
import InputZone from "../../components/EditPage/InputZone";
import ImageUploadButton from "../../components/EditPage/ImageUpload";
import Loader from "../../components/Shared/Loader";
import GeneralLayout from "../../components/Shared/GeneralLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { IoAddSharp } from "react-icons/io5";
import { mockResponse } from "../../utils/mock";
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
import { downloadImage } from "../../utils/utils";
import {
  deleteImage,
  getImage,
  removeBackground,
  uploadImage,
} from "../../apis/media";
import { getCurrentUser, loginWithGoogle } from "../../apis/user";
import { getPost } from "../../apis/read";
import { updatePost } from "../../apis/update";

export default function EditPage() {
  const [currentUser, setCurrentUser] = useState({} as any);
  const [form, setForm] = useState(mockResponse);
  const [isRembg, setRembg] = useState(true);
  const [previewImg, setPreviewImg] = useState("");
  const [isSaving, setSaving] = useState(false);
  const navigator = useNavigate();

  async function handleLoginToAnotherAccount() {
    await loginWithGoogle();
    window.location.reload();
  }

  function handleSetForm(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSetFormArray(key: string, index: number, value: any) {
    setForm((prev: any) => ({
      ...prev,
      [key]: prev[key].map((item: any, idx: number) =>
        idx === index ? value : item
      ),
    }));
  }

  function handleSetFormArrayPush(key: string, value: any) {
    setForm((prev: any) => ({
      ...prev,
      [key]: [...prev[key], value],
    }));
  }

  function handleSetFormArrayRemove(key: string, index: number) {
    setForm((prev: any) => ({
      ...prev,
      [key]: prev[key].filter((_: any, idx: number) => idx !== index),
    }));
  }

  async function handleUploadImage(file: File) {
    // Set state
    setSaving(true);
    // Resize image
    if (isRembg) {
      const data = await removeBackground(file);
      file = await downloadImage((data as any).image);
    }
    // Upload image
    const res = await uploadImage(file);
    handleSetForm("imageUrl", res.fullPath);
    // Update portfolio image
    const newForm = {
      ...form,
      imageUrl: res.fullPath,
    };
    updatePost(form.id, newForm).then((_) => {
      setSaving(false);
    });
    return res.imageUrl;
  }

  async function handleDeleteImage() {
    // Set state
    setSaving(true);
    // Delete image
    deleteImage(form.imageUrl as string);
    // Update portfolio image
    handleSetForm("imageUrl", "");
    // Update portfolio image
    const newForm = {
      ...form,
      imageUrl: "",
    };
    updatePost(form.id, newForm).then((_) => {
      setSaving(false);
    });
  }

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
    // Get current logged in user
    getCurrentUser().then((user) => {
      // If user is not logged in, redirect to login page
      if (!user) {
        navigator("/login");
      } else {
        // If user is new, redirect to creating page
        if ((user as any).userName === "") {
          navigator("/create");
        } else {
          // Fetch portfolio data
          getPost((user as any).userName, true, false).then((userData) => {
            // If portfolio data is not found, redirect to 404 page
            if (userData) {
              if (userData.imageUrl) {
                // Get image url
                getImage(userData.imageUrl).then((url) => {
                  // Set data to state
                  setPreviewImg(url as string);
                  setForm(userData);
                  setCurrentUser(user);
                });
              } else {
                setForm(userData);
                setCurrentUser(user);
              }
            } else {
              navigator("/404");
            }
          });
        }
      }
    });
  }, []);

  return Object.keys(currentUser).length !== 0 ? (
    <GeneralLayout
      isLoading={isSaving}
      color={getColorByRole(form.roles[0] ?? "black")}
    >
      <div className={style.accountContainer}>
        <div className={style.accountText}>
          <span>
            You are currently logged in as
            <code>
              <b> @{currentUser?.userName}</b>
            </code>
          </span>
          <h1>{currentUser?.name}</h1>
          <Button color="primary" onClick={handleLoginToAnotherAccount}>
            Login to another account
          </Button>
        </div>
        <div className={style.accountAvatar}>
          <img src={currentUser?.avatar} alt="Avatar" />
        </div>
      </div>
      <div className={style.form}>
        <InputZone title="Basic information">
          {/* FirstName, firstName */}
          <InputField desc="Enter your first name." example="Đinh Trần">
            <TextField
              variant="standard"
              label="First Name"
              defaultValue={form.firstName}
              onChange={(e) => handleSetForm("firstName", e.target.value)}
            />
          </InputField>

          {/* LastName, lastName */}
          <InputField desc="Enter your last name." example="Yến Vy">
            <TextField
              variant="standard"
              label="Last Name"
              defaultValue={form.lastName}
              onChange={(e) => handleSetForm("lastName", e.target.value)}
            />
          </InputField>

          {/* Bio, description */}
          <InputField desc="Enter your bio,">
            <TextField
              variant="standard"
              label="Bio"
              multiline
              maxRows={3}
              defaultValue={form.description}
              onChange={(e) => handleSetForm("description", e.target.value)}
            />
          </InputField>

          {/* Roles, roles */}
          <InputField desc="Select your roles in GDSC.">
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
          <InputField desc="Select your biological gender.">
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
            desc="Enter your Birthday & Zodiac"
            example="Format mm/dd/yyyy"
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
          <InputField
            desc="Enter your favorite quote."
            example="We are happy if you provided the author of the the quote."
          >
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

        <InputZone title="Image">
          <span>
            <Typography variant="button">Remove Background</Typography>
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

        <InputZone title="Contact information">
          {/* Email, email */}
          <InputField desc="Enter your email address.">
            <TextField
              variant="standard"
              label="Email"
              defaultValue={form.email}
              onChange={(e) => handleSetForm("email", e.target.value)}
            />
          </InputField>

          {/* Phone, phone */}
          <InputField desc="Enter your phone number.">
            <TextField
              variant="standard"
              label="Phone"
              defaultValue={form.phone}
              onChange={(e) => handleSetForm("phone", e.target.value)}
            />
          </InputField>

          {/* Facebook, facebook */}
          <InputField desc="Enter your Facebook URL.">
            <TextField
              variant="standard"
              label="Facebook"
              defaultValue={form.facebook}
              onChange={(e) => handleSetForm("facebook", e.target.value)}
            />
          </InputField>

          {/* Instagram, instagram */}
          <InputField desc="Enter your Instagram URL.">
            <TextField
              variant="standard"
              label="Instagram"
              defaultValue={form.instagram}
              onChange={(e) => handleSetForm("instagram", e.target.value)}
            />
          </InputField>

          {/* Linkedin, linkedin */}
          <InputField desc="Enter your LinkedIn URL.">
            <TextField
              variant="standard"
              label="LinkedIn"
              defaultValue={form.linkedin}
              onChange={(e) => handleSetForm("linkedin", e.target.value)}
            />
          </InputField>

          {/* Github, github */}
          <InputField desc="Enter your Github URL.">
            <TextField
              variant="standard"
              label="Github"
              defaultValue={form.github}
              onChange={(e) => handleSetForm("github", e.target.value)}
            />
          </InputField>
        </InputZone>

        <InputZone title="Skills">
          <HorizontalInputs
            button={
              <AddNewCardButton
                onClick={() =>
                  handleSetFormArrayPush("skills", SKILL_INITIALIZE)
                }
              >
                <IoAddSharp size={20} />
                <h3>Add new skills</h3>
              </AddNewCardButton>
            }
          >
            {form.skills?.map((skill, index) => (
              <Fragment key={index}>
                <InputCard
                  title={`Skill ${index + 1}`}
                  onDelete={() => handleSetFormArrayRemove("skills", index)}
                >
                  {/* Skill Name, skills, name */}
                  <InputField desc={`Enter your #${index + 1} skill name.`}>
                    <TextField
                      variant="standard"
                      label="Name"
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
                    desc={`Enter your #${index + 1} skill percentage.`}
                  >
                    <TextField
                      type="number"
                      variant="standard"
                      label="Percentage"
                      defaultValue={skill.percent}
                      onChange={(e) =>
                        handleSetFormArray(
                          "skills",
                          index,
                          Object.assign({}, skill, {
                            percent: e.target.value,
                          })
                        )
                      }
                    />
                  </InputField>

                  {/* Skill Description, skills, description */}
                  <InputField
                    desc={`Enter your #${index + 1} skill description.`}
                  >
                    <TextField
                      variant="standard"
                      label="Description"
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
        <InputZone title="Projects">
          <HorizontalInputs
            button={
              <AddNewCardButton
                onClick={() =>
                  handleSetFormArrayPush("projects", PROJECT_INITIALIZE)
                }
              >
                <IoAddSharp size={20} />
                <h3>Add new projects</h3>
              </AddNewCardButton>
            }
          >
            {form.projects?.map((project, index) => (
              <Fragment key={index}>
                <InputCard
                  title={`Project ${index + 1}`}
                  onDelete={() => handleSetFormArrayRemove("projects", index)}
                >
                  {/* Project Name, projects, name */}
                  <InputField desc={`Enter your #${index + 1} project name.`}>
                    <TextField
                      variant="standard"
                      label="Name"
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
                    desc={`Enter your #${index + 1} project description.`}
                  >
                    <TextField
                      variant="standard"
                      label="Description"
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
                    desc={`Select your #${index + 1} project start date.`}
                  >
                    <TextField
                      type="date"
                      variant="standard"
                      label="Start Date"
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
                    desc={`Select your #${index + 1} project end date.`}
                  >
                    <TextField
                      type="date"
                      variant="standard"
                      label="End Date"
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
                  <InputField desc={`Enter your #${index + 1} project roles.`}>
                    <TextField
                      variant="standard"
                      label="Roles"
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
                    desc={`Enter your #${index + 1} project technologies.`}
                  >
                    <TextField
                      variant="standard"
                      label="Technologies"
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
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          Save changed
        </Button>
      </div>
    </GeneralLayout>
  ) : (
    <Loader />
  );
}
