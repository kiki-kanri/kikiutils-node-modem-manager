import { parseResultData } from '@/library/utils';
import Modem from '../modem';
import { SimInfo } from './types';

export default class SimCard {
	modem: Modem;
	number: number;
	path: string;

	constructor(modem: Modem, path: string) {
		this.modem = modem;
		this.number = parseInt(path.split('/').pop()!);
		this.path = path;
	}

	async info() {
		const { sim: data } = await this.mmcli();
		return parseResultData(data) as SimInfo;
	}

	async mmcli(command: string = '', parse = true) {
		const result = await this.modem.exec(`sudo mmcli -J -i ${this.number} ${command}`);
		if (parse) return JSON.parse(result);
		return result;
	}
}
