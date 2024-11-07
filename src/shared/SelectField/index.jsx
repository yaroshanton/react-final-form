import React from 'react';
//utils
import cx from 'classnames';
//styles
import styles from './SelectField.module.scss';

const SelectField = ({input, meta, label, options}) => {
	const hasError = meta.touched && meta.error;

	return (
		<div className={styles.container}>
			<select {...input} className={cx(styles.select, {[styles.selectError]: hasError})}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<label className={styles.label}>{label}</label>
			{hasError && <span className={styles.error}>{meta.error}</span>}
		</div>
	);
};

export default SelectField;
