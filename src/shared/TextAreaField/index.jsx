import React from 'react';
//utils
import cx from 'classnames';
//styles
import styles from './TextAreaField.module.scss';

const TextAreaField = ({input, meta, label, placeholder}) => {
	const hasError = meta.touched && meta.error;

	return (
		<div className={styles.container}>
			<textarea
				{...input}
				rows="2"
				placeholder={placeholder || ''}
				className={cx(styles.textArea, {[styles.textAreaError]: hasError})}
			/>
			<label className={styles.label}>{label}</label>
			{hasError && <span className={styles.error}>{meta.error}</span>}
		</div>
	);
};

export default TextAreaField;
