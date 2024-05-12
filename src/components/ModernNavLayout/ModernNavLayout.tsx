import styles from "./index.module.scss";
import NavBar from "./NavBar/NavBar";
const ModernNavLayout = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      {/* <div className={styles.contentContainer}>
        <div className={styles.header}></div>
        <div className={styles.content}></div>
      </div> */}
    </div>
  );
};

export default ModernNavLayout;
