import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

SectionsContentHeader.propTypes = {
  title: PropTypes.string,
};

export default function SectionsContentHeader({ title }) {
  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <Link to="/">
        <MdKeyboardArrowLeft size={25} />
        Voltar ao Menu Principal
      </Link>
    </div>
  );
}
