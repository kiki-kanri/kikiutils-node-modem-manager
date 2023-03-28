import { NullableString } from '@/typing';

export interface SimInfo {
	dbusPath: string;
	properties: {
		active: boolean;
		eid: NullableString;
		emergencyNumbers: number | number[];
		esimStatus: NullableString;
		gid1: string;
		gid2: string;
		iccid: string;
		imsi: string;
		operatorCode: number;
		operatorName: string;
		preferredNetworks: string[];
		removability: NullableString;
		simType: NullableString;
	}
}
