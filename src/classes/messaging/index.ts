import { parseResultData } from '../../library/utils';
import Modem from '../modem';
import Sms from './sms';
import { MessagingStatus } from './typing';

export default class Messaging {
	modem: Modem;

	constructor(modem: Modem) {
		this.modem = modem;
	}

	async listSms() {
		const { 'modem.messaging.sms': smsPaths }: { 'modem.messaging.sms': string[] } = await this.modem.mmcli('--messaging-list-sms');
		return smsPaths.map((path) => new Sms(this.modem, path));
	}

	async status() {
		const { modem: data } = await this.modem.mmcli('--messaging-status');
		return parseResultData(data) as MessagingStatus;
	}
}
