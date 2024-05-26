import { useState } from "react";
import { SvgIcons } from "../../../assets/svg-icons";
import { MateroNavBarOptions } from "../../../Utils/MaterioNavBarUtils";
import MainNavOption from "../MainNavOption/Index";
import styles from "./Index.module.scss";
import { Radio } from "antd";

interface MaterioNavBarProps {
  isPositionAbsolute: boolean;
  handleNavPositionChange: (isPositionAbsolute: boolean) => void;
}

const MaterioNavBar = ({
  isPositionAbsolute,
  handleNavPositionChange,
}: MaterioNavBarProps) => {
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");

  const getContainerClass = () => {
    return isPositionAbsolute ? styles.containerOpen : styles.containerCloses;
  };

  const handleClick = () => {
    handleNavPositionChange(!isPositionAbsolute);
  };

  const handleMenuItemClick = (name: string) => {
    setActiveNavItem(name);
  };

  return (
    <div className={`${styles.container} ${getContainerClass()}`}>
      <div className={styles.header}>
        <div className={styles.branding}>
          <SvgIcons.MaterioIcon />
        </div>
        <div className={styles.optionalItem}>
          <span>MATERIO</span>
          <Radio checked={isPositionAbsolute} onClick={handleClick} />
        </div>
      </div>

      <div className={styles.body}>
        {MateroNavBarOptions.map((group, index) => {
          return (
            <div key={index} className={styles.group}>
              {group.groupName && <GroupHeader groupName={group.groupName} />}
              <div className={styles.options}>
                {group.options.map((option, index) => {
                  return (
                    <div key={index} className={styles.option}>
                      <MainNavOption
                        handleMenuItemClick={handleMenuItemClick}
                        activeItem={activeNavItem}
                        option={option}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterioNavBar;

const GroupHeader = ({ groupName }: { groupName: string }) => {
  return (
    <div className={styles.groupNameContainer}>
      <div className={styles.groupName}>{groupName}</div>
      <div className={styles.line}>&nbsp;</div>
    </div>
  );
};
