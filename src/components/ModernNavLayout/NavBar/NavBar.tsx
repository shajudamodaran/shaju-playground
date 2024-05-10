/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { SvgIcons } from "../../../assets/svg-icons";
import { ModernNavBarOptions } from "../../../Utils/NavBarUtils";
import styles from "./index.module.scss";
import { Popover } from "antd";

const NavBar = () => {
  const [isSubOpen, setIsSubOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Mail");
  const [subSelectedOption, setSubSelectedOption] = useState("Inbox");

  const subMenus = useMemo(() => {
    if (selectedOption) {
      const option = ModernNavBarOptions.find(
        (option) => option.name === selectedOption
      );
      return option?.subItems || [];
    }
    return [];
  }, [selectedOption]);

  function handleSubOpen() {
    setIsSubOpen(!isSubOpen);
  }

  function handleNavClick(option: any) {
    setSelectedOption(option);
    const optionDetails = ModernNavBarOptions.find(
      (opt) => opt.name === option
    );

    if (optionDetails && optionDetails?.subItems?.length > 0) {
      setSubSelectedOption(optionDetails?.subItems[0]?.name);
    }

    if (optionDetails && optionDetails?.subItems?.length === 0) {
      setIsSubOpen(false);
    }
  }

  function handleSubNavClick(option: any) {
    setSubSelectedOption(option);
    const parentOption = ModernNavBarOptions.find((opt) =>
      opt.subItems?.find((subOpt) => subOpt.name === option)
    );

    if (parentOption?.name) {
      setSelectedOption(parentOption?.name);
      console.log("Selected Option", parentOption?.name);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.navBarContainer}>
        <div className={styles.hamburgerContainer} onClick={handleSubOpen}>
          <SvgIcons.HamburgerIcon />
        </div>

        <div className={styles.mainOptions}>
          <div className={styles.navOptionsContainer}>
            {ModernNavBarOptions.map((option, index) => (
              <Popover
                key={index}
                content={
                  !isSubOpen && option?.subItems?.length ? (
                    <SubMenuList
                      handleSubNavClick={handleSubNavClick}
                      subMenus={option?.subItems || []}
                      subSelectedOption={selectedOption}
                    />
                  ) : null
                }
                placement="rightTop"
                title={
                  !isSubOpen && option?.subItems?.length ? option?.name : null
                }
                trigger="hover"
              >
                <div
                  onClick={handleNavClick.bind(this, option?.name)}
                  className={`${styles.navOption} ${
                    selectedOption === option?.name
                      ? styles.activeNavOption
                      : ""
                  }`}
                >
                  <div className={styles.iconWrap}>{option.icon}</div>
                  <span>{option.name}</span>
                </div>
              </Popover>
            ))}
          </div>
        </div>
      </div>
      {subMenus?.length > 0 && (
        <div
          className={`${styles.subNavContainer} ${
            isSubOpen
              ? styles.subNavContainerOpen
              : styles.subNavContainerClosed
          }`}
        >
          <div className={styles.subNavOptionsContainer}>
            {subMenus.map((option, index) => (
              <div
                onClick={handleSubNavClick.bind(this, option?.name)}
                key={index}
                className={`${styles.subNavOption} ${
                  subSelectedOption === option?.name
                    ? styles.activeSubNavOption
                    : ""
                }`}
              >
                {option.icon}
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

const SubMenuList = ({
  subMenus,
  handleSubNavClick,
  subSelectedOption,
}: {
  subMenus: any[];
  handleSubNavClick: (option: any) => void;
  subSelectedOption: string;
}) => {
  return (
    <div className={styles.subNavOptionsContainer}>
      {subMenus.map((option, index) => (
        <div
          onClick={handleSubNavClick.bind(this, option?.name)}
          key={index}
          className={`${styles.subNavOption} ${
            subSelectedOption === option?.name ? styles.activeSubNavOption : ""
          }`}
        >
          {option.icon}
          <span>{option.name}</span>
        </div>
      ))}
    </div>
  );
};
