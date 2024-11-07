import React, {useState} from 'react';
//utils
import {Form, Field} from 'react-final-form';
import cx from 'classnames';
import {DATE_MUSK, EMPTY_PHONE_MUSK, YNZR_MUSK} from 'utils/masks';
import {setRequiredLabel} from 'utils/components';
//components
import InputField from 'shared/InputField';
import {SelectField} from 'shared/SelectField';
import ToggleInputField from 'shared/ToggleInputField';
import PhoneNumberField from 'shared/PhoneNumberField';
//helpers
import {
	contactMethodOptions,
	documentTypeOptions,
	fieldName,
	formInitialValues,
	genderOptions,
	validate,
} from './helpers';
//styles
import styles from './CreatePersonForm.module.scss';
import TextAreaField from 'shared/TextAreaField';

const CreatePersonForm = () => {
	const [showResult, setShowResult] = useState(false);
	const [submittedData, setSubmittedData] = useState(null);

	const onSubmit = (values) => {
		const filteredValues = {
			...values,
			patronymic: values.patronymic.value,
			rnokpp: values.rnokpp.value,
		};

		setSubmittedData(filteredValues);
		setShowResult(true);
	};

	return (
		<div>
			<Form
				onSubmit={onSubmit}
				validate={validate}
				initialValues={formInitialValues}
				render={({handleSubmit}) => {
					return (
						<form onSubmit={handleSubmit} className={styles.form}>
							<h2 className={styles.sectionTitle}>Дані пацієнта</h2>

							<div className={styles.fieldsContainer}>
								<Field name={fieldName.lastName} component={InputField} label={setRequiredLabel('Прізвище')} />
								<Field name={fieldName.firstName} component={InputField} label={setRequiredLabel('Імʼя')} />
								<Field
									name={fieldName.patronymic}
									component={ToggleInputField}
									placeholderDisabled="Немає по батькові згідно документів"
									placeholderEnabled={setRequiredLabel('По батькові')}
								/>
							</div>

							<div className={styles.fieldsContainer}>
								<Field
									name={fieldName.rnokpp}
									component={ToggleInputField}
									placeholderDisabled="Немає ІПН за віком чи має відмітку у паспорті"
									placeholderEnabled={setRequiredLabel('РНОКПП (ІПН)')}
								/>
								<Field
									name={fieldName.dateOfBirth}
									component={InputField}
									label={setRequiredLabel('Дата народження')}
								/>
								<Field
									name={fieldName.gender}
									component={SelectField}
									label={setRequiredLabel('Стать')}
									options={genderOptions}
								/>
							</div>

							<div className={styles.fieldsContainer}>
								<Field
									name={fieldName.birthCountry}
									component={InputField}
									label={setRequiredLabel('Країна народження')}
								/>
								<Field name={fieldName.birthCity} component={InputField} label={setRequiredLabel('Місце народження')} />
							</div>

							<div className={styles.fieldsContainer}>
								<Field
									name={fieldName.contactMethod}
									component={SelectField}
									label="Бажаний спосіб зв’язку із пацієнтом"
									options={contactMethodOptions}
								/>
								<Field
									name={fieldName.secretWord}
									component={InputField}
									label={setRequiredLabel('Секретне слово (не менше 6 символів)')}
								/>
							</div>

							<div className={styles.fieldsContainer}>
								<Field
									name={fieldName.phoneNumber}
									component={PhoneNumberField}
									label="Контактний номер телефону"
									placeholder={EMPTY_PHONE_MUSK}
									showLabelAlways
								/>
								<Field
									name={fieldName.email}
									component={InputField}
									type="email"
									label="Адреса електронної пошти"
									placeholder="example@example.com"
									showLabelAndPlaceholder
								/>
							</div>

							<h2 className={styles.sectionTitle}>Документ, що посвідчує особу</h2>

							<div className={styles.fieldsContainer}>
								<Field
									name={fieldName.documentType}
									component={SelectField}
									label={setRequiredLabel('Тип документу')}
									options={documentTypeOptions}
								/>
								<Field
									name={fieldName.seriesNumber}
									component={InputField}
									label={setRequiredLabel('Серія (за наявності), номерє')}
								/>
							</div>

							<div className={styles.fieldsContainer}>
								<Field
									name={fieldName.issuedDate}
									component={InputField}
									label={setRequiredLabel('Коли видано')}
									placeholder={DATE_MUSK}
									showLabelAndPlaceholder
								/>
								<Field
									name={fieldName.expiresOn}
									component={InputField}
									label={setRequiredLabel('Діє до')}
									placeholder={DATE_MUSK}
									showLabelAndPlaceholder
								/>
							</div>

							<div className={styles.fieldsContainer}>
								<Field name={fieldName.issuedBy} component={TextAreaField} label={setRequiredLabel('Ким видано')} />
								<Field
									name={fieldName.recordNumber}
									component={InputField}
									label={setRequiredLabel('Запис № (УНЗР)')}
									placeholder={YNZR_MUSK}
									showLabelAndPlaceholder
								/>
							</div>

							<div className={styles.buttons}>
								<button type="submit" className={cx(styles.submitButton)}>
									Відправити
								</button>
								{showResult && (
									<button
										type="submit"
										className={cx(styles.submitButton)}
										onClick={() => setShowResult((prev) => !prev)}
									>
										Сховати JSON
									</button>
								)}
							</div>
						</form>
					);
				}}
			/>

			{showResult && (
				<div className={styles.resultContainer}>
					{showResult && submittedData && (
						<pre className={styles.jsonDisplay}>{JSON.stringify(submittedData, null, 2)}</pre>
					)}
				</div>
			)}
		</div>
	);
};

export default CreatePersonForm;
