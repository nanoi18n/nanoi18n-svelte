/* eslint-disable @typescript-eslint/naming-convention */
const messages = {
	'yes-button.text': '--oscuro-es--',
	'yes-button.unused': '--sinusar-es--',
	'yes-button.with-name': ({
		personName,
	}: Readonly<{ personName: string }>): string => `${personName}-es`,
	'yes-button.with-full-name': ({
		firstName,
		lastName,
	}: Readonly<{ firstName: string; lastName: string }>): string =>
		`${firstName} ${lastName}-es`,
}

export default messages
