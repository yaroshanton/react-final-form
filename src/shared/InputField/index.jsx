import React from 'react';
//utils
import cx from 'classnames';
//styles
import styles from './InputField.module.scss';

const InputField = ({input, meta, label, type, placeholder, showLabelAndPlaceholder = false}) => {
	const hasError = meta.touched && meta.error;

	return (
		<div className={styles.container}>
			{showLabelAndPlaceholder && <label className={cx(styles.label, styles.alwaysVisible)}>{label}</label>}
			<input
				{...input}
				type={type || 'text'}
				placeholder={showLabelAndPlaceholder ? placeholder : ''}
				className={cx(styles.input, {[styles.inputError]: hasError})}
			/>
			{!showLabelAndPlaceholder && <label className={styles.label}>{label}</label>}
			{hasError && <span className={styles.error}>{meta.error}</span>}
		</div>
	);
};

export default InputField;
