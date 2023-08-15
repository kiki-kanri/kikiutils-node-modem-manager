import { parseResultData } from '@/library/utils';
import Modem from '../modem';
import { BearerInfo } from './types';

export default class Bearer {
	modem: Modem;
	number: number;
	path: string;

	constructor(modem: Modem, path: string) {
		this.modem = modem;
		this.number = parseInt(path.split('/').pop()!);
		this.path = path;
	}

	/**
	 * Connect to a given bearer.
	 */
	async connect() {
		const result = await this.mmcli('-c', false);
		return result === 'successfully connected the bearer';
	}

	/**
	 * Disconnect from a given bearer.
	 */
	async disconnect() {
		const result = await this.mmcli('-x ', false);
		return result === 'successfully disconnected the bearer';
	}

	/**
	 * Get the bearer info.
	 */
	async info() {
		const { bearer: data } = await this.mmcli();
		return parseResultData(data) as BearerInfo;
	}

	async mmcli(command: string = '', parse = true) {
		const result = await this.modem.exec(`sudo mmcli -J -m ${this.modem.number} -b ${this.number} ${command}`);
		if (parse) return JSON.parse(result);
		return result;
	}
}
