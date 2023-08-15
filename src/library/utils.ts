import camelcaseKeys from '@cjs-exporter/camelcase-keys';

import { Dict, Nullable } from '@/types';

const parseDataMap: Dict<Nullable<boolean | undefined>> = {
	'--': null,
	'no': false,
	'yes': true
};

export const isNumeric = (data: any) => {
	return !isNaN(parseFloat(data)) && isFinite(data) && parseFloat(data) == data;
}

export const parseData = (data: Dict<any>, noParseKeys: string[] = []) => {
	for (const key in data) {
		const value = data[key];
		const parsedValue = parseDataMap[value];
		if (parsedValue !== undefined) {
			data[key] = parsedValue;
		} else if (value.constructor === Object) {
			parseData(data[key], noParseKeys);
		} else if (key.match(/iccid|imei|imsi/gi) === null && !noParseKeys.includes(key) && isNumeric(value)) {
			data[key] = parseFloat(value);
		}
	}
}

export const parseResultData = (data: Dict<any>, noParseKeys: string[] = []) => {
	const convertedData = camelcaseKeys(data, { deep: true });
	parseData(convertedData, noParseKeys);
	return sortDictKey(convertedData);
}

export const sortDictKey = (data: Dict<any>): Dict<any> => {
	const sorted = [];
	for (const key in data) sorted.push(key);
	sorted.sort();
	const tmpDict: Dict<any> = {};
	for (const key of sorted) tmpDict[key] = data[key];
	for (const key in tmpDict) if (tmpDict[key] && tmpDict[key].constructor === Object) tmpDict[key] = sortDictKey(tmpDict[key]);
	return tmpDict;
}
