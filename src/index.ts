import chalk from 'chalk'
import State from './Enums/Logger'
import { DateTime } from 'luxon'

class Logger {
	public async send(type: State, message: string, prod: boolean = true): Promise<void> {
		this.sendMessage(type, message)
	}

	private sendMessage(type: State, message: string): void {
		console.log(`${chalk.rgb(190, 190, 190)(this.date())} ${this.chooseColors(type)} : ${message}`)
	}

	private date() {
		const initial = DateTime.fromJSDate(new Date())
		const date = initial.toLocaleString(DateTime.DATE_SHORT)
		const time = initial.toLocaleString(DateTime.TIME_SIMPLE)

		return `[${date} - ${time}]`
	}

	private chooseColors(type: State): string {
		let sentence: string = ''
		switch (type) {
			case State.WARN:
				sentence = `${chalk.bold.yellow(type)}`
				break
			case State.INFO:
				sentence = `${chalk.bold.cyan(type)}`
				break
			case State.FATAL:
				sentence = `${chalk.bold.rgb(170, 0, 0).bold(type)}`
				break
			case State.ERROR:
				sentence = `${chalk.bold.rgb(255, 85, 85)(type)}`
				break
			case State.SUCCES:
				sentence = `${chalk.bold.greenBright(type)}`
				break
		}
		return sentence
	}
}
const logger = new Logger()

export { logger as Logger, State }
