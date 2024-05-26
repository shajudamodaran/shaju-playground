import { useState } from "react";
import { SvgIcons } from "../../../assets/svg-icons";
import styles from "../NavBar/Index.module.scss";

const MainNavOption = ({
  option,
  activeItem,
  handleMenuItemClick,
}: {
  option: {
    name: string;
    subOptions?: {
      name: string;
    }[];
  };
  activeItem: string;
  handleMenuItemClick: (name: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const navClick = () => {
    toggleExpand();
  };

  const getSubMenuContainerClass = () => {
    return isExpanded ? styles.subOptionsOpen : styles.subOptionsClosed;
  };

  const getMenuItemClassBasedOnActive = (
    name: string,
    subMenuLength?: number
  ) => {
    if (subMenuLength) {
      const isSubOptionActive = option?.subOptions?.some(
        (subOption) => subOption.name === activeItem
      );

      return name === activeItem || isSubOptionActive
        ? styles.activeMainItem
        : "";
    } else {
      return name === activeItem ? styles.activeSubItem : "";
    }
  };

  return (
    <>
      <div
        className={`${styles.optionBody} ${getMenuItemClassBasedOnActive(
          option?.name,
          option?.subOptions?.length
        )}`}
        onClick={navClick}
      >
        <div className={styles.icon}>
          <SvgIcons.FolderIcon />
        </div>
        <div
          onClick={() => handleMenuItemClick(option?.name)}
          className={`${styles.optionName} ${styles.optionalItem} `}
        >
          {option.name}
        </div>
        {option?.subOptions?.length ? (
          <div
            className={`${styles.optionalItem} ${styles.expandIndicator} ${
              isExpanded ? styles.expandedIcon : ""
            }`}
            onClick={toggleExpand}
          >
            <SvgIcons.ArrowRightIcon />
          </div>
        ) : (
          ""
        )}
      </div>
      {option?.subOptions?.length ? (
        <div
          className={` ${getSubMenuContainerClass()} 
          ${styles.optionalItem} ${styles.subMenuList}`}
        >
          {option?.subOptions?.map((subOption, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleMenuItemClick(subOption?.name);
                }}
                className={`${styles.subOption} ${getMenuItemClassBasedOnActive(
                  subOption?.name
                )}`}
              >
                <div className={styles.icon}>
                  <SvgIcons.CalendarIcon />
                </div>
                <div className={styles.name}>{subOption.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MainNavOption;
