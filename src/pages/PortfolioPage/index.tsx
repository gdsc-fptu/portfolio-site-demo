// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../assets/brands/logo.png";

// Import React modules
import { useState, useCallback, useEffect, Fragment } from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { BiCake, BiLogoTiktok } from "react-icons/bi";
import {
  AiFillPhone,
  AiOutlineMail,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

// Import custom components
import RotationMarker from "../../components/Shared/RotationMarker";
import Background, {
  BackgroundStyle,
} from "../../components/Shared/Background";
import Badge from "../../components/Shared/Badges";
import FrostBadge from "../../components/PortfolioPage/FrostBadge";
import SubSection from "../../components/PortfolioPage/SubSection";
import Loader from "../../components/Shared/Loader";
import MovingBubble from "../../components/Shared/MovingBubble";
import UserCircle from "../../components/Shared/User";
import MUIConfigsWrapper from "../../components/Shared/GeneralLayout/MUIWraper";
import { getColorByRole, getFullNameByRole } from "../../utils/enum/roles";
import { getStringByGender, getIconByGender } from "../../utils/enum/gender";
import { getStringByZodiac, getIconByZodiac } from "../../utils/enum/zodiac";
import { Project, Skill } from "../../utils/interface";
import { SNACKBAR_TIMEOUT } from "../../utils/constant";

// Import utils
import {
  incEltNbr,
  copyToClipboard,
  mobileAndTabletCheck,
} from "../../utils/utils";
import { AppStrings } from "../../utils/strings";
import useAppStore from "../../context/store";
import initializePage from "../../logic/PortfolioPage/initialize";
import setDocumentTitle from "../../logic/setTitle";

export default function PortfolioPage() {
  const [snackbar, setSnackbar] = useState(false);
  const [data, setData] = useState({} as any);
  const location = useLocation();
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const navigator = useNavigate();

  const handleScrollActions = useCallback(() => {
    // Get the screen height
    const screenHeight = window.innerHeight;
    // Get the current scroll position
    const scrollPosition = window.scrollY;
    // Handle the grand image translate
    const grandImage = document.getElementById("GrandImg") as HTMLElement;
    if (scrollPosition < screenHeight && !mobileAndTabletCheck()) {
      // Calculate the translate value
      let translateValue = (scrollPosition * 25) / screenHeight;
      // Set the translate value
      grandImage.style.transform = "translateX(" + translateValue + "%)";
    }
    // Handle the lastname translate
    // const lastName = document.getElementById("Lastname") as HTMLElement;
    // if (scrollPosition < screenHeight / 2 - 100 && !mobileAndTabletCheck()) {
    //   lastName.style.zIndex = "1";
    // } else {
    //   lastName.style.zIndex = "1";
    // }
    // Handle increasing skill percent
    if (
      scrollPosition > screenHeight * 1.2 &&
      scrollPosition < screenHeight * 1.2 + 100 &&
      data.skills &&
      data.skills?.length !== 0 &&
      !mobileAndTabletCheck()
    ) {
      for (let skill of data.skills as Skill[]) {
        let elt = document.getElementById(skill.name as string) as HTMLElement;
        incEltNbr(elt as HTMLElement, skill.percent as number, 20);
      }
    }
  }, []);

  function handleCopyToClipboard(text: String) {
    copyToClipboard(text);
    setSnackbar(true);
  }

  function handleNavigateToHome() {
    navigator("/");
  }

  function handleNavigateToDepartment(role: String) {
    navigator(`/?role=${role}`);
  }

  function isProjectImageEmpty(project: Project) {
    return project.images?.length === 0;
  }

  function getFirstProjectImage(project: Project) {
    if (project.images) {
      return project.images[0] as string;
    }
    return "";
  }

  useEffect(() => {
    // Get the portfolio id
    let id = location.pathname.split("/")[1];
    initializePage(id, navigator, user).then(({ user, portfolio }) => {
      setData(portfolio);
      setUser(user);
      setDocumentTitle(portfolio?.firstName, portfolio?.lastName, id);
    });
    /**
     * Add scroll event listener
     */
    document.addEventListener("scroll", handleScrollActions);
    return () => {
      document.removeEventListener("scroll", handleScrollActions);
    };
  }, []);

  function getContactsUI(
    phone?: String,
    email?: String,
    facebook?: String,
    instagram?: String,
    linkedin?: String,
    github?: String
  ) {
    const contactUIs = [];
    if (phone) {
      contactUIs.push(
        <div
          key={0}
          className={style.contactItem}
          onClick={() => handleCopyToClipboard(phone as string)}
        >
          <AiFillPhone />
        </div>
      );
    }
    if (email) {
      contactUIs.push(
        <div
          key={1}
          className={style.contactItem}
          onClick={() => handleCopyToClipboard(email as string)}
        >
          <AiOutlineMail />
        </div>
      );
    }
    if (facebook) {
      contactUIs.push(
        <a
          key={2}
          className={style.contactItem}
          href={facebook as string}
          target="_blank"
        >
          <FaFacebook />
        </a>
      );
    }
    if (instagram) {
      contactUIs.push(
        <a
          key={3}
          className={style.contactItem}
          href={instagram as string}
          target="_blank"
        >
          <AiFillInstagram />
        </a>
      );
    }
    if (linkedin) {
      contactUIs.push(
        <a
          key={4}
          className={style.contactItem}
          href={linkedin as string}
          target="_blank"
        >
          <AiFillLinkedin />
        </a>
      );
    }
    if (github) {
      contactUIs.push(
        <a
          key={5}
          className={style.contactItem}
          href={github as string}
          target="_blank"
        >
          <FaGithub />
        </a>
      );
    }
    return contactUIs;
  }

  return Object.keys(data).length !== 0 ? (
    <Fragment>
      {user && (
        <div className={style.userContainer}>
          <UserCircle user={user} />
        </div>
      )}
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.headerLogo} onClick={handleNavigateToHome}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={style.headerName}>
            <div>{data.firstName.toUpperCase()}</div>
            <div
              className={clsx(
                style.lastname,
                style[getColorByRole(data.roles[0])]
              )}
              id="Lastname"
            >
              {data.lastName.toUpperCase()}
            </div>
          </div>
          <div className={style.headerRoles}>
            {data.roles.map((role: String, index: number) => (
              <Fragment key={index}>
                <Badge
                  color={getColorByRole(role)}
                  onClick={() => {
                    handleNavigateToDepartment(role);
                  }}
                >
                  {getFullNameByRole(role)}
                </Badge>
              </Fragment>
            ))}
          </div>
          <div className={style.headerMarker} onClick={handleNavigateToHome}>
            <RotationMarker color={getColorByRole(data.roles[0])} />
          </div>
          <div className={style.headerImag} id={"GrandImg"}>
            <img src={data.imageUrl as string} alt="" />
          </div>
        </div>
        <div className={style.info}>
          <div className={style.infoSection}>
            <div className={style.infoText}>
              <span
                className={clsx(
                  style.infoTextUsername,
                  style[getColorByRole(data.roles[0])]
                )}
              >
                @{data.userName}
              </span>
              {data.description}
            </div>
            <div className={style.infoProps}>
              {data.gender && (
                <FrostBadge
                  icon={getIconByGender(data.gender)}
                  text={getStringByGender(data.gender)}
                />
              )}
              {data.birthday && (
                <FrostBadge icon={<BiCake />} text={data.birthday} />
              )}
              {data.zodiac && (
                <FrostBadge
                  icon={getIconByZodiac(data.zodiac)}
                  text={getStringByZodiac(data.zodiac)}
                />
              )}
            </div>
            <div className={style.contacts}>
              {getContactsUI(
                data.phone,
                data.email,
                data.facebook,
                data.instagram,
                data.linkedin,
                data.github
              )}
            </div>
          </div>
          {data.quote && <div className={style.quote}>{data.quote}</div>}
        </div>
        {data.skills?.length !== 0 ? (
          <div className={style.skills}>
            <div className={style.skillsTitle}>
              {AppStrings.language.portfolioPage.skills}
            </div>
            <div className={style.skillsSection}>
              {data.skills?.map((skill: Skill, index: number) => (
                <div key={index} className={style.skill}>
                  <div
                    className={clsx(
                      style.skillPercent,
                      style[getColorByRole(data.roles[0])]
                    )}
                  >
                    <span id={skill.name as string}>
                      {skill.percent.toString()}
                    </span>
                    %
                  </div>
                  <div className={style.skillName}>{skill.name}</div>
                  <div className={style.skillDescription}>
                    {skill.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <Background
          style={BackgroundStyle.dotted}
          color={getColorByRole(data.roles[0])}
        />
        <MovingBubble color={getColorByRole(data.roles[0])} />
      </div>
      <SubSection>
        {data.projects?.length !== 0 ? (
          <div className={style.projects}>
            <div className={style.projectsHeading}>
              {AppStrings.language.portfolioPage.projects}
            </div>
            <div className={style.projectsGrid}>
              {data.projects?.map((project: Project, index: number) => (
                <div key={index} className={style.project}>
                  {!isProjectImageEmpty(project) && (
                    <div className={style.projectImage}>
                      <img src={getFirstProjectImage(project)} alt="" />
                    </div>
                  )}
                  <div
                    className={clsx(
                      style.projectContent,
                      !isProjectImageEmpty(project) ? style.animation : null
                    )}
                  >
                    <div className={style.projectName}>{project.name}</div>
                    <div className={style.projectDescription}>
                      {project.description}
                    </div>
                    {project.roles && (
                      <div className={style.projectRoles}>
                        {project.roles?.map((role: String, index: number) => (
                          <div key={index} className={style.projectRole}>
                            {role}
                          </div>
                        ))}
                      </div>
                    )}
                    {project.technologies && (
                      <div className={style.projectTechnologies}>
                        {project.technologies?.map(
                          (technology: String, index: number) => (
                            <div
                              key={index}
                              className={style.projectTechnology}
                            >
                              {technology}
                            </div>
                          )
                        )}
                      </div>
                    )}
                    <div className={style.projectDate}>
                      <div className={style.projectStartDate}>
                        {project.startDate}
                      </div>
                      <BsArrowRight />
                      <div className={style.projectEndDate}>
                        {project.endDate ? project.endDate : "Now"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className={style.footer}>
          <div className={style.footerBrand}>
            <div className={style.footerLogo}>
              <img src={logo} alt="Logo" />
            </div>
            <div className={style.footerHeading}>{AppStrings.footerBrand}</div>
            <div className={style.footerDescription}>
              Made with ❤️ by <b>GDSC FPT Da Nang</b> • 2023
            </div>
          </div>
          <div className={style.footerLinks}>
            <div
              className={style.footerLink}
              onClick={() => copyToClipboard(AppStrings.email)}
            >
              <AiOutlineMail />
            </div>
            <a
              className={style.footerLink}
              href={AppStrings.facebook}
              target="_blank"
            >
              <FaFacebook />
            </a>
            <a
              className={style.footerLink}
              href={AppStrings.instagram}
              target="_blank"
            >
              <AiFillInstagram />
            </a>
            <a
              className={style.footerLink}
              href={AppStrings.tiktok}
              target="_blank"
            >
              <BiLogoTiktok />
            </a>
          </div>
        </div>
      </SubSection>
      <div className="signature">
        Creator <code>@Ming-doan</code> ©2023-2024
      </div>
      <MUIConfigsWrapper>
        <Snackbar
          open={snackbar}
          onClose={() => setSnackbar(false)}
          autoHideDuration={SNACKBAR_TIMEOUT}
          message={AppStrings.language.portfolioPage.copyToClipboard}
        />
      </MUIConfigsWrapper>
    </Fragment>
  ) : (
    <Loader />
  );
}
