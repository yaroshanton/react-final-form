import React from 'react';
//utils
import InputMask from 'react-input-mask';
import cx from 'classnames';
import {PHONE_MUSK} from 'utils/masks';
//styles
import styles from './PhoneNumberField.module.scss';

const PhoneNumberField = ({input, meta, label, placeholder, showLabelAlways = false}) => {
	const hasError = meta.touched && meta.error;

	return (
		<div className={styles.container}>
			<label className={cx(styles.label, {[styles.alwaysVisible]: showLabelAlways})}>{label}</label>
			<InputMask
				{...input}
				mask={PHONE_MUSK}
				maskChar="_"
				className={cx(styles.input, {[styles.inputError]: hasError})}
			>
				{(inputProps) => <input {...inputProps} type="text" placeholder={showLabelAlways ? placeholder : label} />}
			</InputMask>
			{hasError && <span className={styles.error}>{meta.error}</span>}
		</div>
	);
};

export default PhoneNumberField;
