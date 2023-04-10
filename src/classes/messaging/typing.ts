import { NullableNumber, NullableString } from '../../typing';

export interface MessagingStatus {
	messaging: {
		defaultStorages: string;
		supportedStorages: string;
	}
}

export interface SmsData {
	content: {
		data: any;
		number: string;
		text: string;
	}

	dbusPath: string;
	properties: {
		class: any;
		deliveryReport: any;
		deliveryState: any;
		dischargeTimestamp: NullableString;
		messageReference: any;
		pduType: string,
		serviceCategory: NullableString;
		smsc: string;
		state: string;
		storage: string;
		teleserviceId: NullableNumber;
		timestamp: string;
		validity: any;
	}
}
