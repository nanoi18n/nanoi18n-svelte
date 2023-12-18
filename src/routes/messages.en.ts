/* eslint-disable @typescript-eslint/naming-convention */
const messages = {
	'app.text': (): string => 'Some text',
	'app.unused': (): string => 'Unused text',
	'app.hi-with-full-name': ({
		fullName,
	}: Readonly<{ fullName: string }>): string => `Hi ${fullName}!`,
	'app.hi-with-first-and-last-name': ({
		firstName,
		lastName,
	}: Readonly<{ firstName: string; lastName: string }>): string =>
		`Hi ${firstName} ${lastName}!`,
}

export default messages
