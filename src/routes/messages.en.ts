/* eslint-disable @typescript-eslint/naming-convention */
const messages = {
	'yes-button.text': (): string => '--oscuro-en--',
	'yes-button.unused': (): string => '--sinusar-en--',
	'yes-button.with-name': ({
		personName,
	}: Readonly<{ personName: string }>): string => `${personName}-en`,
	'yes-button.with-full-name': ({
		firstName,
		lastName,
	}: Readonly<{ firstName: string; lastName: string }>): string =>
		`${firstName} ${lastName}-en`,
}

export default messages
