import React from 'react';
//components
import Layout from 'shared/Layout';
//styles
import styles from './styles.module.scss';
import CreatePersonForm from './components/CreatePersonForm';

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
