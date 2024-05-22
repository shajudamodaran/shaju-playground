import { useState } from "react";
import { SvgIcons } from "../../../assets/svg-icons";
import styles from "../NavBar/Index.module.scss";
const MainNavOption = ({
  option,
}: {
  option: {
    name: string;
    subOptions?: {
      name: string;
    }[];
  };
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

  return (
    <>
      <div className={styles.optionBody} onClick={navClick}>
        <div className={styles.icon}>
          <SvgIcons.FolderIcon />
        </div>
        <div className={`${styles.optionName} ${styles.optionalItem}`}>
          {option.name}
        </div>
        <div
          className={`${styles.optionalItem} ${styles.expandIndicator} ${
            isExpanded ? styles.expandedIcon : ""
          }`}
          onClick={toggleExpand}
        >
          <SvgIcons.ArrowRightIcon />
        </div>
      </div>
      <div
        className={` ${getSubMenuContainerClass()} ${styles.optionalItem} ${
          styles.subMenuList
        }`}
      >
        {option?.subOptions?.map((subOption, index) => {
          return (
            <div key={index} className={styles.subOption}>
              <div className={styles.icon}>
                <SvgIcons.CalendarIcon />
              </div>
              <div className={styles.name}>{subOption.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MainNavOption;
