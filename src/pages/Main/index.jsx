import React from 'react';
//components
import Layout from 'shared/Layout';
//styles
import styles from './styles.module.scss';

const Main = () => {
	return (
		<Layout>
			<div className={styles.wrapper}>
				<div className={styles.title}> Main </div>
			</div>
		</Layout>
	);
};

export default Main;
