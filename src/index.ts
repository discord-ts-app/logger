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
		switch (type) {
			case State.WARN:
				return `${chalk.bold.yellow(type)}`
			case State.INFO:
				return `${chalk.bold.cyan(type)}`
			case State.FATAL:
				return `${chalk.bold.rgb(170, 0, 0).bold(type)}`
			case State.ERROR:
				return `${chalk.bold.rgb(255, 85, 85)(type)}`
			case State.SUCCES:
				return `${chalk.bold.greenBright(type)}`
		}
	}
}
const logger = new Logger()

export { logger as Logger, State }
