// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import logo from "../../assets/brands/logo.png";
// @ts-ignore
import clsx from "clsx";
import { useCallback, useEffect } from "react";
import RotationMarker from "../../components/Shared/RotationMarker";
import Background, {
  BackgroundStyle,
} from "../../components/Shared/Background";
import Badge from "../../components/Shared/Badges";
import FrostBadge from "../../components/PortfolioPage/FrostBadge";
import SubSection from "../../components/PortfolioPage/SubSection";
import { getColorByRole, getFullNameByRole } from "../../utils/enum/roles";
import { getStringByGender, getIconByGender } from "../../utils/enum/gender";
import { getStringByZodiac, getIconByZodiac } from "../../utils/enum/zodiac";
import { mockResponse } from "../../utils/mock";
import { Project, Skill } from "../../utils/interface";
import { incEltNbr, copyToClipboard } from "../../utils/utils";
import { AppStrings } from "../../utils/strings";
import { BiCake, BiLogoTiktok } from "react-icons/bi";
import {
  AiFillPhone,
  AiOutlineMail,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

export default function PortfolioPage() {
  const handleScrollActions = useCallback(() => {
    // Get the screen height
    const screenHeight = window.innerHeight;
    // Get the current scroll position
    const scrollPosition = window.scrollY;
    // Handle the grand image translate
    const grandImage = document.getElementById("GrandImg") as HTMLElement;
    if (scrollPosition < screenHeight) {
      // Calculate the translate value
      let translateValue = (scrollPosition * 25) / screenHeight;
      // Set the translate value
      grandImage.style.transform = "translateX(" + translateValue + "%)";
    }
    // Handle the lastname translate
    const lastName = document.getElementById("Lastname") as HTMLElement;
    if (scrollPosition < screenHeight / 2 - 100) {
      lastName.style.zIndex = "2";
    } else {
      lastName.style.zIndex = "1";
    }
    // Handle increasing skill percent
    if (
      scrollPosition > screenHeight * 1.2 &&
      scrollPosition < screenHeight * 1.2 + 100
    ) {
      for (let skill of mockResponse.skills as Skill[]) {
        let elt = document.getElementById(skill.id as string) as HTMLElement;
        incEltNbr(elt as HTMLElement, skill.percent as number, 20);
      }
    }
  }, []);

  const handleBubbleTranslate = useCallback((event: any) => {
    let bubble = document.getElementById("Bubble") as HTMLElement;
    // Get the current mouse position
    let mousePositionX = event.clientX;
    let mousePositionY = event.clientY;
    // Translate the bubble
    bubble.style.inset = `calc(${mousePositionY}px - 22.5rem) auto auto calc(${mousePositionX}px - 22.5rem)`;
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScrollActions);
    document.addEventListener("mousemove", handleBubbleTranslate);
    return () => {
      document.removeEventListener("scroll", handleScrollActions);
      document.removeEventListener("mousemove", handleBubbleTranslate);
    };
  }, []);

  function getContactsUI(
    phone?: String,
    email?: String,
    facebook?: String,
    instagram?: String,
    tiktok?: String,
    linkedin?: String,
    github?: String
  ) {
    const contactUIs = [];
    if (phone) {
      contactUIs.push(
        <div
          className={style.contactItem}
          onClick={() => copyToClipboard(phone as string)}
        >
          <AiFillPhone />
        </div>
      );
    }
    if (email) {
      contactUIs.push(
        <div
          className={style.contactItem}
          onClick={() => copyToClipboard(email as string)}
        >
          <AiOutlineMail />
        </div>
      );
    }
    if (facebook) {
      contactUIs.push(
        <a
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
          className={style.contactItem}
          href={instagram as string}
          target="_blank"
        >
          <AiFillInstagram />
        </a>
      );
    }
    if (tiktok) {
      contactUIs.push(
        <a
          className={style.contactItem}
          href={tiktok as string}
          target="_blank"
        >
          <BiLogoTiktok />
        </a>
      );
    }
    if (linkedin) {
      contactUIs.push(
        <a
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

  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.headerLogo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={style.headerName}>
            <div>{mockResponse.lastName.toUpperCase()}</div>
            <div
              className={clsx(
                style.lastname,
                style[getColorByRole(mockResponse.roles[0])]
              )}
              id="Lastname"
            >
              {mockResponse.firstName.toUpperCase()}
            </div>
          </div>
          <div className={style.headerRoles}>
            {mockResponse.roles.map((role: String, index: number) => (
              <Badge key={index} color={getColorByRole(role)}>
                {getFullNameByRole(role)}
              </Badge>
            ))}
          </div>
          <div className={style.headerMarker}>
            <RotationMarker color={getColorByRole(mockResponse.roles[0])} />
          </div>
          <div className={style.headerImag} id={"GrandImg"}>
            <img src={mockResponse.imageUrl as string} alt="" />
          </div>
        </div>
        <div className={style.info}>
          <div className={style.infoSection}>
            <div className={style.infoText}>
              <span
                className={clsx(
                  style.infoTextUsername,
                  style[getColorByRole(mockResponse.roles[0])]
                )}
              >
                @{mockResponse.userName}
              </span>
              {mockResponse.descriptions}
            </div>
            <div className={style.infoProps}>
              {mockResponse.gender && (
                <FrostBadge
                  icon={getIconByGender(mockResponse.gender)}
                  text={getStringByGender(mockResponse.gender)}
                />
              )}
              {mockResponse.birthday && (
                <FrostBadge icon={<BiCake />} text={mockResponse.birthday} />
              )}
              {mockResponse.zodiac && (
                <FrostBadge
                  icon={getIconByZodiac(mockResponse.zodiac)}
                  text={getStringByZodiac(mockResponse.zodiac)}
                />
              )}
            </div>
            <div className={style.contacts}>
              {getContactsUI(
                mockResponse.phone,
                mockResponse.email,
                mockResponse.facebook,
                mockResponse.instagram,
                mockResponse.tiktok,
                mockResponse.linkedin,
                mockResponse.github
              )}
            </div>
          </div>
          {mockResponse.quote && (
            <div className={style.quote}>{mockResponse.quote}</div>
          )}
        </div>
        {mockResponse.skills?.length !== 0 ? (
          <div className={style.skills}>
            <div className={style.skillsTitle}>{AppStrings.skills}</div>
            <div className={style.skillsSection}>
              {mockResponse.skills?.map((skill: Skill, index: number) => (
                <div key={index} className={style.skill}>
                  <div
                    className={clsx(
                      style.skillPercent,
                      style[getColorByRole(mockResponse.roles[0])]
                    )}
                  >
                    <span id={skill.id as string}>
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
          color={getColorByRole(mockResponse.roles[0])}
        />
        <div
          className={clsx(
            style.movingBubble,
            style[getColorByRole(mockResponse.roles[0])]
          )}
          id="Bubble"
        ></div>
      </div>
      <SubSection>
        {mockResponse.projects?.length !== 0 ? (
          <div className={style.projects}>
            <div className={style.projectsHeading}>{AppStrings.projects}</div>
            <div className={style.projectsGrid}>
              {mockResponse.projects?.map((project: Project, index: number) => (
                <div key={index} className={style.project}>
                  {project.imageUrl && (
                    <div className={style.projectImage}>
                      <img src={project.imageUrl as string} alt="" />
                    </div>
                  )}
                  <div
                    className={clsx(
                      style.projectContent,
                      project.imageUrl ? style.animation : null
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
        Creator <code>@Ming-doan</code> ©2023
      </div>
    </>
  );
}
