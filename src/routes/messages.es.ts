/* eslint-disable @typescript-eslint/naming-convention */
const messages = {
	'yes-button.text': (): string => '--oscuro-es--',
	'yes-button.unused': (): string => '--sinusar-es--',
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
