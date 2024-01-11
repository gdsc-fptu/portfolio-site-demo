const AppLanguageVi = {
  homePage: {
    viewPortfolio: "Xem Portfolio",
  },
  portfolioPage: {
    skills: "Kỹ năng",
    projects: "Dự án",
    copyToClipboard: "Đã sao chép link",
  },
  loginPage: {
    title: "Bạn cần đăng nhập để tiếp tục",
    loginBtn: "Đăng nhập với Google",
  },
  createPage: {
    title: "Tạo Portfolio",
    placeholder: "Nhập tên người dùng của bạn",
    description:
      "Tên của bạn sẽ được sử dụng để tạo link portfolio của bạn. *Tên người dùng phải là duy nhất.",
    submit: "Tạo Portfolio",
  },
  notFoundPage: {
    title: "404 - Không tìm thấy trang",
    back: "Quay lại trang chủ",
  },
  editPage: {
    accountDescription: "Bạn đang đăng nhập với tài khoản: ",
    reloginBtn: "Đăng nhập với tài khoản khác",
    example: "Ví dụ: ",
    basicInfo: {
      title: "Thông tin cơ bản",
      firstName: "Họ",
      firstNameDesc: "Nhập họ của bạn.",
      lastName: "Tên",
      lastNameDesc: "Nhập tên của bạn.",
      bio: "Tiểu sử",
      bioDesc: "Nhập tiểu sử của bạn.",
      rolesDesc: "Nhập vai trò của bạn trong GDSC.",
      genderDesc: "Nhập giới tính của bạn",
      birthdayAndZodicDesc: "Ngày sinh và Cung hoàng đạo",
      quote: "Câu nói yêu thích",
      quoteDesc:
        "Nhập câu nói yêu thích của bạn. Chúng tôi rất vui nếu bạn cung cấp tên tác giả của câu nói.",
    },
    image: {
      title: "Hình ảnh",
      removeBackground: "Xóa nền",
      uploadBtn: "Tải ảnh lên",
    },
    contact: {
      title: "Liên hệ",
      email: "Email",
      emailDesc: "Nhập email của bạn.",
      phone: "Số điện thoại",
      phoneDesc: "Nhập số điện thoại của bạn.",
      facebook: "Facebook",
      facebookDesc: "Nhập URL Facebook của bạn.",
      instagram: "Instagram",
      instagramDesc: "Nhập URL Instagram của bạn.",
      linkedin: "Linkedin",
      linkedinDesc: "Nhập URL Linkedin của bạn.",
      github: "Github",
      githubDesc: "Nhập URL Github của bạn.",
    },
    skill: {
      title: "Kỹ năng",
      addBtn: "Thêm Kỹ năng",
      name: "Tên Kỹ năng",
      nameDesc: (id: number) => `Nhập tên kỹ năng #${id} của bạn.`,
      percent: "Phần trăm Kỹ năng",
      percentDesc: (id: number) => `Nhập phần trăm kỹ năng #${id} của bạn.`,
      desc: "Mô tả Kỹ năng",
      descDesc: (id: number) => `Nhập mô tả kỹ năng #${id} của bạn.`,
    },
    project: {
      title: "Dự án",
      addBtn: "Thêm Dự án",
      name: "Tên Dự án",
      nameDesc: (id: number) => `Nhập tên dự án #${id} của bạn.`,
      desc: "Mô tả Dự án",
      descDesc: (id: number) => `Nhập mô tả dự án #${id} của bạn.`,
      startDate: "Ngày bắt đầu",
      startDateDesc: (id: number) => `Nhập ngày bắt đầu dự án #${id} của bạn.`,
      endDate: "Ngày kết thúc",
      endDateDesc: (id: number) => `Nhập ngày kết thúc dự án #${id} của bạn.`,
      roles: "Vai trò",
      rolesDesc: (id: number) => `Nhập vai trò dự án #${id} của bạn.`,
      technologies: "Công nghệ",
      technologiesDesc: (id: number) => `Nhập công nghệ dự án #${id} của bạn.`,
    },
    cancelBtn: "Hủy",
    submitBtn: "Lưu thay đổi",
  },
  errors: {
    userNameRequired: "Tên không được để trống",
    userNameNotContainSpecialChar: "Tên không được chứa ký tự đặc biệt",
    userNameContainSpace: "Tên không được chứa khoảng trắng",
    userNameNotContain: (message: string) => `Tên không được chứa ${message}`,
    userNameNotAvailable: "Tên đã được sử dụng",
  },
  components: {
    editPortfolio: "Chỉnh sửa Portfolio",
    logout: "Đăng xuất",
  },
};

const AppLanguageEn = {
  homePage: {
    viewPortfolio: "View Portfolio",
  },
  portfolioPage: {
    skills: "Skills",
    projects: "Projects",
    copyToClipboard: "Copied to clipboard",
  },
  loginPage: {
    title: "You must login to continue",
    loginBtn: "Login with Google",
  },
  createPage: {
    title: "Create Portfolio",
    placeholder: "Enter your username",
    description:
      "Your username will be used to create your portfolio link. *The username must be unique.",
    submit: "Create Portfolio",
  },
  notFoundPage: {
    title: "404 - Page Not Found",
    back: "Back to home",
  },
  editPage: {
    accountDescription: "You are logged in as: ",
    reloginBtn: "Login with another account",
    example: "Example: ",
    basicInfo: {
      title: "Basic Information",
      firstName: "First Name",
      firstNameDesc: "Enter your first name.",
      lastName: "Last Name",
      lastNameDesc: "Enter your last name.",
      bio: "Bio",
      bioDesc: "Enter your bio.",
      rolesDesc: "Enter your roles in GDSC.",
      genderDesc: "Enter your biological gender",
      birthdayAndZodicDesc: "Birthday and Zodiac",
      quote: "Favourite Quote",
      quoteDesc:
        "Enter your favourite Quote. We are happy if you provided the author of the the quote.",
    },
    image: {
      title: "Images",
      removeBackground: "Remove background",
      uploadBtn: "Upload Image",
    },
    contact: {
      title: "Contact",
      email: "Email",
      emailDesc: "Enter your email.",
      phone: "Phone",
      phoneDesc: "Enter your phone number.",
      facebook: "Facebook",
      facebookDesc: "Enter your Facebook URL.",
      instagram: "Instagram",
      instagramDesc: "Enter your Instagram URL.",
      linkedin: "Linkedin",
      linkedinDesc: "Enter your Linkedin URL.",
      github: "Github",
      githubDesc: "Enter your Github URL.",
    },
    skill: {
      title: "Skills",
      addBtn: "Add NewSkill",
      name: "Skill Name",
      nameDesc: (id: number) => `Enter your #${id} skill name.`,
      percent: "Skill Percent",
      percentDesc: (id: number) => `Enter your #${id} skill percent.`,
      desc: "Skill Description",
      descDesc: (id: number) => `Enter your #${id} skill description.`,
    },
    project: {
      title: "Projects",
      addBtn: "Add New Project",
      name: "Project Name",
      nameDesc: (id: number) => `Enter your #${id} project name.`,
      desc: "Project Description",
      descDesc: (id: number) => `Enter your #${id} project description.`,
      startDate: "Start Date",
      startDateDesc: (id: number) => `Enter your #${id} project start date.`,
      endDate: "End Date",
      endDateDesc: (id: number) => `Enter your #${id} project end date.`,
      roles: "Roles",
      rolesDesc: (id: number) => `Enter your #${id} project roles.`,
      technologies: "Technologies",
      technologiesDesc: (id: number) =>
        `Enter your #${id} project technologies.`,
    },
    cancelBtn: "Cancel",
    submitBtn: "Save Changes",
  },
  errors: {
    userNameRequired: "UserName is required",
    userNameNotContainSpecialChar: "UserName cannot contain special characters",
    userNameContainSpace: "UserName cannot contain space",
    userNameNotContain: (message: string) =>
      `UserName cannot contain ${message}`,
    userNameNotAvailable: "UserName is not available",
  },
  components: {
    editPortfolio: "Edit Portfolio",
    logout: "Logout",
  },
};

export const AppStrings = {
  // Marker
  marker: "Google Developer Student Clubs • FPT University Da Nang • ",
  // Heading
  skills: "Skills",
  projects: "Projects",
  // Footer
  footerBrand: "GDSC Portfolio",
  // Social links
  email: "gdsc.fptudn@gmail.com",
  facebook: "https://www.facebook.com/gdsc.fptudn",
  instagram: "https://www.instagram.com/gdsc.fptu_/",
  tiktok: "https://www.tiktok.com/@gdsc.fptu_",
  // Language
  language:
    window.navigator.language === "vi-VN" ? AppLanguageVi : AppLanguageEn,
};
