import React from 'react';
//components
import Layout from 'shared/Layout';
import CreatePersonForm from './components/CreatePersonForm';
//styles
import styles from './styles.module.scss';

const Main = () => {
	return (
		<Layout>
			<div className={styles.wrapper}>
				<CreatePersonForm />
			</div>
		</Layout>
	);
};

export default Main;
