import { NullableNumber, NullableString } from '@/types';

export interface MessagingStatus {
	messaging: {
		defaultStorages: string;
		supportedStorages: string;
	}
}

export interface SmsData {
	content: {
		data: NullableString;
		number: string;
		text: NullableString;
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
		smsc: NullableString;
		state: string;
		storage: string;
		teleserviceId: NullableNumber;
		timestamp: string;
		validity: any;
	}
}
