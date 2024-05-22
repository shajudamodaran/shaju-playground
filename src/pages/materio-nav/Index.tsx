import { useState } from "react";
import MaterioNavBar from "../../components/MaterioNavComponents/NavBar/Index";
import styles from "./index.module.scss";

const MaterioNav = () => {
  const [isPositionAbsolute, setIsPositionAbsolute] = useState(false);

  const handleNavPosition = () => {
    setIsPositionAbsolute(!isPositionAbsolute);
  };

  const getNavContainerClass = () => {
    return isPositionAbsolute ? styles.containerOpen : styles.containerCloses;
  };

  return (
    <div className={styles.container}>
      <MaterioNavBar
        handleNavPositionChange={handleNavPosition}
        isPositionAbsolute={isPositionAbsolute}
      />
      <div className={`${styles.navContent} ${getNavContainerClass()}`}>
        NavbarContent
      </div>
    </div>
  );
};

export default MaterioNav;
