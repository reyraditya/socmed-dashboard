import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.scss';

const options = {
    timeout: 3000,
  };

export default function Layout(props) {
    const { children } = props;
    return (
        <div className={styles.container}>
            <div className={styles.innerWrapper}>
                <div className={styles.contentWrapper}>
                    <div className={styles.sidebarWrapper}>
                        <Sidebar />
                    </div>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <main className={styles.content}>
                            {children}
                        </main>
                    </AlertProvider>
                </div>
            </div>
        </div>
    );
};