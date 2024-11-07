import React from 'react';
//components
import Header from 'shared/Header';
//styles
import styles from './styles.module.scss';

const Layout = ({children}) => {
	return (
		<div className={styles.wrapper}>
			<Header />

			{children}
		</div>
	);
};

export default Layout;
