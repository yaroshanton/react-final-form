import React from 'react';
//utils
import cx from 'classnames';
//styles
import styles from './ToggleInputField.module.scss';

const ToggleInputField = ({placeholderDisabled, placeholderEnabled, input, meta}) => {
	const {value, onChange} = input;
	const isActive = value.isActive;

	const toggleSwitch = () => onChange({value: '', isActive: !isActive});

	const handleInputChange = (e) => onChange({...value, value: e.target.value});

	const hasError = isActive && meta?.touched && meta?.error;

	return (
		<div className={styles.container}>
			<div className={styles.inputWrapper}>
				<input
					type="text"
					value={value.value}
					onChange={handleInputChange}
					placeholder=""
					disabled={!isActive}
					className={cx(styles.inputField, {[styles.disabled]: !isActive, [styles.inputError]: hasError})}
				/>
				{isActive && !hasError ? (
					<label className={styles.label}>{placeholderEnabled}</label>
				) : (
					<>
						<label className={styles.label}>{placeholderEnabled}</label>
						{!hasError && <label className={styles.labelPlaceholderDisabled}>{placeholderDisabled}</label>}
					</>
				)}
				<div className={cx(styles.toggle, {[styles.active]: isActive})} onClick={toggleSwitch}>
					<div className={styles.toggleCircle} />
				</div>
			</div>
			{hasError && <span className={styles.error}>{meta.error}</span>}
		</div>
	);
};

export default ToggleInputField;
