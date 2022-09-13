import styles from "./index.module.css";
function Footer() {
  return (
    <span className={styles.footer}>
      <a href="https://github.com/SantiTeran">
        {"<"}Developed by Santiago Terán/{">"}
      </a>
    </span>
  );
}

export default Footer;
