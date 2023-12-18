/* eslint-disable @typescript-eslint/naming-convention */
const messages = {
	'app.text': (): string => 'Algún texto',
	'app.unused': (): string => 'Texto sin usar',
	'app.hi-with-full-name': ({
		fullName,
	}: Readonly<{ fullName: string }>): string => `¡Hola ${fullName}!`,
	'app.hi-with-first-and-last-name': ({
		firstName,
		lastName,
	}: Readonly<{ firstName: string; lastName: string }>): string =>
		`¡Hola ${firstName} ${lastName}!`,
}

export default messages
