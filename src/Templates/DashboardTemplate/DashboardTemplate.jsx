import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/DashboardSidebar/DashboardSiderbar';
import styles from './styles.module.css';

const DashboardTemplate = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};
export default DashboardTemplate;
