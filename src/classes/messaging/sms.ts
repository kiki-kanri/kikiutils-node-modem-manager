import { parseResultData } from '@/library/utils';
import Modem from '../modem';
import { SmsData } from './types';

export class Sms {
	modem: Modem;
	number: number;
	path: string;

	constructor(modem: Modem, path: string) {
		this.modem = modem;
		this.number = parseInt(path.split('/').pop()!);
		this.path = path;
	}

	async data() {
		const { sms: data } = await this.modem.mmcli(`-s ${this.number}`);
		return parseResultData(data, ['number', 'smsc']) as SmsData;
	}

	async delete() {
		const result = await this.modem.mmcli(`--messaging-delete-sms=${this.number}`, false) as string;
		return result.toLowerCase() === 'successfully deleted sms from modem';
	}
}

export default Sms;
