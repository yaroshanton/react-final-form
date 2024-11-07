//utils
import moment from 'moment';
import * as yup from 'yup';

const ukraineTextSchema = yup
	.string()
	.matches(/^[А-ЯЄІЇа-яєії']{3,}$/, 'Має містити не менше 3 символів на українській мові')
	.required('Це поле обов’язкове');

const isValidDate = (value) => moment(value, 'DD.MM.YYYY', true).isValid();

const validationSchema = yup.object().shape({
	firstName: ukraineTextSchema,
	lastName: ukraineTextSchema,
	dateOfBirth: yup
		.string()
		.test('is-valid-date', 'Дата повинна бути у форматі ДД.ММ.РРРР та бути валідною', isValidDate)
		.required('Дата народження обов’язкова для заповнення'),
	gender: yup
		.string()
		.required('Поле обов’язковий для заповнення')
		.oneOf(['male', 'female'], 'Оберіть коректний варіант'),
	patronymic: yup
		.object()
		.shape({
			isActive: yup.boolean(),
			value: yup.string(),
		})
		.test(
			'patronymic-required',
			'По батькові обовʼязкове і має містити не менше 3 символів на українській мові',
			function (value) {
				const {isActive, value: patronymicValue} = value || {};
				if (isActive) {
					return /^[А-ЯЄІЇа-яєії']{3,}$/.test(patronymicValue);
				}
				return true;
			}
		),
	rnokpp: yup
		.object()
		.shape({
			isActive: yup.boolean(),
			value: yup.string(),
		})
		.test('rnokpp-required', 'ІПН обовʼязкове і має містити 10 чисел', function (value) {
			const {isActive, value: rnoKppValue} = value || {};
			if (isActive) {
				return /^\d{10}$/.test(rnoKppValue);
			}
			return true;
		}),
	birthCountry: ukraineTextSchema,
	birthCity: ukraineTextSchema,
	contactMethod: yup.string().notRequired(),
	secretWord: yup
		.string()
		.required('Поле обов’язковий для заповнення')
		.matches(/^[А-ЯЄІЇа-яєії']{6,}$/, 'Має містити не менше 6 символів на українській мові'),
	phoneNumber: yup.string().test('valid-phone', 'Невірний формат номера', function (value) {
		if (value && !/^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
			return this.createError({message: 'Невірний формат номера'});
		}
		return true;
	}),
	email: yup.string().email('Невірний формат електронної пошти'),
	documentType: yup.string().required('Тип документу обов’язковий'),
	issuedDate: yup
		.string()
		.test('is-valid-date', 'Дата повинна бути у форматі ДД.ММ.РРРР та бути валідною', isValidDate)
		.required('Дата видачі обов’язкова'),
	issuedBy: ukraineTextSchema,
	seriesNumber: yup
		.string()
		.matches(/^[А-ЯЄІЇа-яєії]{2}-\d{5}$/, 'Серія та номер документа повинні бути у форматі: АВ-12345')
		.required('Серія та номер документа обовʼязкові'),
	expiresOn: yup
		.string()
		.test('is-valid-date', 'Дата повинна бути у форматі ДД.ММ.РРРР та бути валідною', isValidDate)
		.required('Дата закінчення дії обов’язкова'),
	recordNumber: yup
		.string()
		.matches(
			/^[А-ЯЄІЇа-яєії]{4}[А-ЯЄІЇа-яєії]{2}[А-ЯЄІЇа-яєії]{2}-\d{5}$/,
			'Невірний формат номера запису. Формат повинен бути: PPPPMMДД-ХХХХХ, де X — цифри.'
		)
		.required('Номер запису обовʼязковий'),
});

export const validate = (values) => {
	try {
		validationSchema.validateSync(values, {abortEarly: false});
		return {};
	} catch (err) {
		return err.inner?.reduce((errors, error) => {
			errors[error.path] = error.message;
			return errors;
		}, {});
	}
};

export const fieldName = {
	lastName: 'lastName',
	firstName: 'firstName',
	patronymic: 'patronymic',
	rnokpp: 'rnokpp',
	dateOfBirth: 'dateOfBirth',
	gender: 'gender',
	birthCountry: 'birthCountry',
	birthCity: 'birthCity',
	contactMethod: 'contactMethod',
	secretWord: 'secretWord',
	phoneNumber: 'phoneNumber',
	email: 'email',
	documentType: 'documentType',
	seriesNumber: 'seriesNumber',
	issuedDate: 'issuedDate',
	expiresOn: 'expiresOn',
	issuedBy: 'issuedBy',
	recordNumber: 'recordNumber',
};

export const formInitialValues = {
	[fieldName.firstName]: '',
	[fieldName.lastName]: '',
	[fieldName.dateOfBirth]: '',
	[fieldName.gender]: '',
	[fieldName.patronymic]: {isActive: false, value: ''},
	[fieldName.rnokpp]: {isActive: false, value: ''},
	[fieldName.birthCountry]: '',
	[fieldName.birthCity]: '',
	[fieldName.contactMethod]: '',
	[fieldName.secretWord]: '',
	[fieldName.phoneNumber]: '',
	[fieldName.email]: '',
	[fieldName.documentType]: '',
	[fieldName.issuedDate]: '',
	[fieldName.issuedBy]: '',
	[fieldName.seriesNumber]: '',
	[fieldName.expiresOn]: '',
	[fieldName.recordNumber]: '',
};

export const genderOptions = [
	{value: '', label: '-- Вибрати --'},
	{value: 'male', label: 'Чоловіча'},
	{value: 'female', label: 'Жіноча'},
];

export const contactMethodOptions = [
	{value: '', label: '-- Вибрати --'},
	{value: 'phone', label: 'Телефон'},
	{value: 'email', label: 'Електронна пошта'},
];

export const documentTypeOptions = [
	{value: '', label: '-- Вибрати --'},
	{value: 'additional_protection', label: 'Посвідчення особи, яка потребує додаткового захисту'},
	{value: 'passport', label: 'Паспорт (книжечка)'},
	{value: 'id_card', label: 'ID-картка'},
	{value: 'permanent_residence', label: 'Посвідка на постійне проживання в Україні'},
	{value: 'refugee', label: 'Посвідчення біженця'},
	{value: 'temporary_residence', label: 'Посвідка на тимчасове проживання в Україні'},
];
